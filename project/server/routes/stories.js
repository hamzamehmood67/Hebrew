import express from 'express';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';

const router = express.Router();
const prisma = new PrismaClient();

// Get stories based on user's level with pagination
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const user = await prisma.user.findUnique({
      where: { id: req.user.userId }
    });

    const [stories, total] = await Promise.all([
      prisma.story.findMany({
        where: { 
          OR: [
            { level: user.level },
            { level: 'all' }
          ]
        },
        include: {
          vocabulary: true,
          quiz: {
            include: {
              questions: {
                select: {
                  id: true,
                  question: true,
                  options: true
                }
              }
            }
          },
          _count: {
            select: { progress: true }
          }
        },
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' }
      }),
      prisma.story.count({
        where: {
          OR: [
            { level: user.level },
            { level: 'all' }
          ]
        }
      })
    ]);

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
        },
        progress: {
          where: { userId: req.user.userId }
        }
      }
    });

    if (!story) {
      return res.status(404).json({ message: 'Story not found' });
    }

    const userProgress = await prisma.storyProgress.findUnique({
      where: {
        userId_storyId: {
          userId: req.user.userId,
          storyId: story.id
        }
      }
    });

    res.json({
      ...story,
      userProgress: userProgress || { completed: false, score: 0 }
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Submit story progress and quiz answers
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
          userId: req.user.userId,
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
        userId: req.user.userId,
        storyId: story.id,
        completed: true,
        score,
        timeSpent,
        attempts: 1
      }
    });

    // Update user XP
    const xpGained = Math.round(score * (story.points / 100));
    await prisma.user.update({
      where: { id: req.user.userId },
      data: {
        xp: { increment: xpGained }
      }
    });

    // Check for level up
    const user = await prisma.user.findUnique({
      where: { id: req.user.userId }
    });

    let newLevel = user.level;
    if (user.xp >= 1000 && user.level === 'beginner') {
      newLevel = 'intermediate';
    } else if (user.xp >= 2500 && user.level === 'intermediate') {
      newLevel = 'advanced';
    }

    if (newLevel !== user.level) {
      await prisma.user.update({
        where: { id: req.user.userId },
        data: { level: newLevel }
      });
    }

    res.json({
      progress,
      xpGained,
      levelUp: newLevel !== user.level ? newLevel : null
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get user's story statistics
router.get('/stats/overview', async (req, res) => {
  try {
    const stats = await prisma.storyProgress.aggregate({
      where: {
        userId: req.user.userId,
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
        userId: req.user.userId,
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