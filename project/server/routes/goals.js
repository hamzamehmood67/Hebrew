import express from 'express';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';

const router = express.Router();
const prisma = new PrismaClient();

// Get user's active goals
router.get('/', async (req, res) => {
  try {
    const goals = await prisma.goal.findMany({
      where: {
        userId: req.user.userId,
        endDate: {
          gte: new Date()
        }
      }
    });

    res.json(goals);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Create new goal
const createGoalSchema = z.object({
  type: z.enum(['daily_xp', 'stories_completed', 'practice_time']),
  target: z.number().min(1),
  endDate: z.string().datetime()
});

router.post('/', async (req, res) => {
  try {
    const { type, target, endDate } = createGoalSchema.parse(req.body);

    const goal = await prisma.goal.create({
      data: {
        userId: req.user.userId,
        type,
        target,
        endDate: new Date(endDate)
      }
    });

    res.json(goal);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update goal progress
router.patch('/:id/progress', async (req, res) => {
  try {
    const { progress } = req.body;
    const goalId = req.params.id;

    const goal = await prisma.goal.findUnique({
      where: { id: goalId }
    });

    if (!goal) {
      return res.status(404).json({ message: 'Goal not found' });
    }

    if (goal.userId !== req.user.userId) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    const updatedGoal = await prisma.goal.update({
      where: { id: goalId },
      data: {
        progress,
        completed: progress >= goal.target
      }
    });

    // If goal completed, award XP
    if (updatedGoal.completed && !goal.completed) {
      await prisma.user.update({
        where: { id: req.user.userId },
        data: {
          xp: {
            increment: 100 // XP reward for completing a goal
          }
        }
      });
    }

    res.json(updatedGoal);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router;