import express from 'express';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();

// Get user's achievements
router.get('/', async (req, res) => {
  try {
    const achievements = await prisma.achievement.findMany({
      where: {
        userId: req.user.userId
      },
      orderBy: {
        unlockedAt: 'desc'
      }
    });

    res.json(achievements);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Check and award achievements
export async function checkAchievements(userId) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        storyProgress: true,
        practiceResults: true,
        achievements: true
      }
    });

    const newAchievements = [];

    // Check streak achievement
    if (user.streak >= 7 && !user.achievements.find(a => a.type === 'week_streak')) {
      newAchievements.push({
        type: 'week_streak',
        name: 'Week Warrior',
        description: 'Maintained a 7-day learning streak',
        xpReward: 100
      });
    }

    // Check stories completed achievement
    const completedStories = user.storyProgress.filter(p => p.completed).length;
    if (completedStories >= 10 && !user.achievements.find(a => a.type === 'stories_10')) {
      newAchievements.push({
        type: 'stories_10',
        name: 'Story Master',
        description: 'Completed 10 stories',
        xpReward: 200
      });
    }

    // Check perfect score achievement
    const perfectScores = user.storyProgress.filter(p => p.score === 100).length;
    if (perfectScores >= 5 && !user.achievements.find(a => a.type === 'perfect_5')) {
      newAchievements.push({
        type: 'perfect_5',
        name: 'Perfectionist',
        description: 'Achieved perfect score in 5 stories',
        xpReward: 300
      });
    }

    // Award new achievements
    for (const achievement of newAchievements) {
      await prisma.achievement.create({
        data: {
          ...achievement,
          userId
        }
      });

      // Add XP reward
      await prisma.user.update({
        where: { id: userId },
        data: {
          xp: {
            increment: achievement.xpReward
          }
        }
      });
    }

    return newAchievements;
  } catch (error) {
    console.error('Error checking achievements:', error);
    return [];
  }
}

export default router;