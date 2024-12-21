import express from 'express';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';

const router = express.Router();
const prisma = new PrismaClient();

/**
 * @swagger
 * components:
 *   schemas:
 *     Story:
 *       type: object
 *       required:
 *         - title
 *         - content
 *         - translation
 *         - level
 *       properties:
 *         id:
 *           type: string
 *           description: Auto-generated unique identifier
 *         title:
 *           type: string
 *           description: Story title in Hebrew
 *         content:
 *           type: string
 *           description: Story content in Hebrew
 *         translation:
 *           type: string
 *           description: English translation of the story
 *         level:
 *           type: string
 *           enum: [beginner, intermediate, advanced]
 *           description: Difficulty level of the story
 *         points:
 *           type: integer
 *           description: Points awarded for completing the story
 *         vocabulary:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Vocabulary'
 *         questions:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Question'
 *     Vocabulary:
 *       type: object
 *       properties:
 *         word:
 *           type: string
 *           description: Hebrew word
 *         translation:
 *           type: string
 *           description: English translation
 *         transliteration:
 *           type: string
 *           description: Pronunciation guide
 *     Question:
 *       type: object
 *       properties:
 *         text:
 *           type: string
 *           description: Question text in Hebrew
 *         translation:
 *           type: string
 *           description: English translation of the question
 *         options:
 *           type: array
 *           items:
 *             type: string
 *           description: Multiple choice options
 *         correctAnswer:
 *           type: integer
 *           description: Index of the correct answer (0-based)
 */

/**
 * @swagger
 * /api/stories:
 *   get:
 *     summary: Get all stories
 *     description: Retrieve all stories with optional filtering by level
 *     tags: [Stories]
 *     parameters:
 *       - in: query
 *         name: level
 *         schema:
 *           type: string
 *           enum: [beginner, intermediate, advanced]
 *         description: Filter stories by difficulty level
 *     responses:
 *       200:
 *         description: List of stories
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Story'
 *       500:
 *         description: Server error
 */
// Get stories based on user's level with pagination
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const { level } = req.query;
    const stories = await prisma.story.findMany({
      where: level ? { level } : undefined,
      include: {
        vocabulary: true
      },
      skip,
      take: limit,
      orderBy: { createdAt: 'desc' }
    });

    const total = await prisma.story.count({
      where: level ? { level } : undefined
    });

    res.json({
      stories,
      pagination: {
        total,
        pages: Math.ceil(total / limit),
        current: page,
        perPage: limit
      }
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

/**
 * @swagger
 * /api/stories/{id}:
 *   get:
 *     summary: Get a story by ID
 *     description: Retrieve a specific story by its ID
 *     tags: [Stories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Story ID
 *     responses:
 *       200:
 *         description: Story details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Story'
 *       404:
 *         description: Story not found
 *       500:
 *         description: Server error
 */
// Get story details with user's progress
router.get('/:id', async (req, res) => {
  try {
    const story = await prisma.story.findUnique({
      where: { id: req.params.id },
      include: {
        vocabulary: true,
        quiz: {
          include: {
            questions: true
          }
        }
      }
    });

    if (!story) {
      return res.status(404).json({ message: 'Story not found' });
    }

    res.json(story);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

/**
 * @swagger
 * /api/stories/{id}/submit:
 *   post:
 *     summary: Submit story progress and quiz answers
 *     description: Update a user's progress for a specific story and submit quiz answers
 *     tags: [Stories]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Story ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               answers:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     questionId:
 *                       type: string
 *                     answer:
 *                       type: string
 *               timeSpent:
 *                 type: number
 *     responses:
 *       200:
 *         description: Progress updated successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Story not found
 *       500:
 *         description: Server error
 */
const submitProgressSchema = z.object({
  answers: z.array(z.object({
    questionId: z.string(),
    answer: z.string()
  })),
  timeSpent: z.number()
});

router.post('/:id/submit', async (req, res) => {
  try {
    const { answers, timeSpent } = submitProgressSchema.parse(req.body);
    
    const story = await prisma.story.findUnique({
      where: { id: req.params.id },
      include: {
        quiz: {
          include: {
            questions: true
          }
        }
      }
    });

    if (!story) {
      return res.status(404).json({ message: 'Story not found' });
    }

    // Calculate score
    let correctAnswers = 0;
    answers.forEach(answer => {
      const question = story.quiz.questions.find(q => q.id === answer.questionId);
      if (question && question.answer === answer.answer) {
        correctAnswers++;
      }
    });

    const score = Math.round((correctAnswers / answers.length) * 100);

    // Update progress
    const progress = await prisma.storyProgress.upsert({
      where: {
        userId_storyId: {
          userId: null,
          storyId: story.id
        }
      },
      update: {
        completed: true,
        score,
        timeSpent,
        attempts: {
          increment: 1
        }
      },
      create: {
        userId: null,
        storyId: story.id,
        completed: true,
        score,
        timeSpent,
        attempts: 1
      }
    });

    res.json({
      progress,
      score
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

/**
 * @swagger
 * /api/stories/stats/overview:
 *   get:
 *     summary: Get user's story statistics
 *     description: Retrieve a user's story statistics
 *     tags: [Stories]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User's story statistics
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
// Get user's story statistics
router.get('/stats/overview', async (req, res) => {
  try {
    const stats = await prisma.storyProgress.aggregate({
      where: {
        userId: null,
        completed: true
      },
      _count: true,
      _avg: {
        score: true,
        timeSpent: true
      },
      _sum: {
        attempts: true
      }
    });

    const recentProgress = await prisma.storyProgress.findMany({
      where: {
        userId: null,
        completed: true
      },
      include: {
        story: true
      },
      orderBy: {
        updatedAt: 'desc'
      },
      take: 5
    });

    res.json({
      stats,
      recentProgress
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router;