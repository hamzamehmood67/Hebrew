import express from 'express';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';
import { checkAchievements } from './achievements.js';

const router = express.Router();
const prisma = new PrismaClient();

// Submit practice result
const submitResultSchema = z.object({
  type: z.enum(['speaking', 'writing', 'reading', 'conversation']),
  score: z.number().min(0).max(100),
  timeSpent: z.number().min(0),
  mistakes: z.array(z.string()),
  feedback: z.string().optional()
});

router.post('/submit', async (req, res) => {
  try {
    const data = submitResultSchema.parse(req.body);

    // Save practice result
    const result = await prisma.practiceResult.create({
      data: {
        ...data,
        userId: req.user.userId
      }
    });

    // Calculate XP reward
    let xpReward = Math.round(data.score * 0.5); // Base XP from score
    
    // Bonus XP for longer practice sessions
    if (data.timeSpent > 300) { // More than 5 minutes
      xpReward += 25;
    }

    // Update user XP and check for level up
    const user = await prisma.user.update({
      where: { id: req.user.userId },
      data: {
        xp: {
          increment: xpReward
        }
      }
    });

    // Check for new level
    const newLevel = calculateNewLevel(user.xp);
    if (newLevel !== user.level) {
      await prisma.user.update({
        where: { id: req.user.userId },
        data: { level: newLevel }
      });
    }

    // Check for achievements
    const newAchievements = await checkAchievements(req.user.userId);

    res.json({
      result,
      xpEarned: xpReward,
      levelUp: newLevel !== user.level ? newLevel : null,
      newAchievements
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get practice history
router.get('/history', async (req, res) => {
  try {
    const history = await prisma.practiceResult.findMany({
      where: {
        userId: req.user.userId
      },
      orderBy: {
        createdAt: 'desc'
      },
      take: 20
    });

    // Calculate trends
    const trends = calculateTrends(history);

    res.json({
      history,
      trends
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Helper functions
function calculateNewLevel(xp) {
  if (xp >= 5000) return 'expert';
  if (xp >= 2500) return 'advanced';
  if (xp >= 1000) return 'intermediate';
  return 'beginner';
}

function calculateTrends(history) {
  const recentResults = history.slice(0, 10);
  const olderResults = history.slice(10, 20);

  const recentAvg = recentResults.reduce((acc, r) => acc + r.score, 0) / recentResults.length;
  const olderAvg = olderResults.reduce((acc, r) => acc + r.score, 0) / olderResults.length;

  return {
    scoreImprovement: recentAvg - olderAvg,
    averageScore: recentAvg,
    totalPracticeTime: history.reduce((acc, r) => acc + r.timeSpent, 0),
    commonMistakes: analyzeCommonMistakes(history)
  };
}

function analyzeCommonMistakes(history) {
  const mistakes = history.flatMap(r => r.mistakes);
  return Object.entries(
    mistakes.reduce((acc, m) => ({
      ...acc,
      [m]: (acc[m] || 0) + 1
    }), {})
  )
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5)
    .map(([mistake, count]) => ({ mistake, count }));
}

export default router;