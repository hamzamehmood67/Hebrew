import express from 'express';
import { PrismaClient } from '@prisma/client';
import { checkAchievements } from './achievements.js';

const router = express.Router();
const prisma = new PrismaClient();

// Get user's overall progress
router.get('/overview', async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.userId },
      include: {
        storyProgress: {
          include: {
            story: true
          }
        },
        practiceResults: true,
        achievements: true,
        goals: {
          where: {
            endDate: {
              gte: new Date()
            }
          }
        }
      }
    });

    // Calculate statistics
    const stats = {
      totalXP: user.xp,
      streak: user.streak,
      storiesCompleted: user.storyProgress.filter(p => p.completed).length,
      averageScore: Math.round(
        user.storyProgress.reduce((acc, p) => acc + (p.score || 0), 0) / 
        user.storyProgress.length || 0
      ),
      practiceTime: user.practiceResults.reduce((acc, p) => acc + p.timeSpent, 0),
      achievements: user.achievements.length,
      activeGoals: user.goals.length,
      levelProgress: {
        current: user.level,
        xp: user.xp,
        nextLevel: getNextLevel(user.level),
        progress: calculateLevelProgress(user.xp, user.level)
      }
    };

    // Get recent activity
    const recentActivity = await prisma.storyProgress.findMany({
      where: {
        userId: req.user.userId
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
      recentActivity
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update daily streak
router.post('/streak', async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.userId }
    });

    const lastActivity = user.lastActivity ? new Date(user.lastActivity) : null;
    const today = new Date();
    
    // Check if streak should be updated
    if (!lastActivity || 
        lastActivity.toDateString() !== today.toDateString()) {
      const streakBroken = lastActivity && 
        (today.getTime() - lastActivity.getTime()) > (24 * 60 * 60 * 1000);

      await prisma.user.update({
        where: { id: req.user.userId },
        data: {
          streak: streakBroken ? 1 : user.streak + 1,
          lastActivity: today
        }
      });

      // Check for streak-related achievements
      await checkAchievements(req.user.userId);
    }

    res.json({ success: true });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Helper functions
function getNextLevel(currentLevel) {
  const levels = ['beginner', 'intermediate', 'advanced', 'expert'];
  const currentIndex = levels.indexOf(currentLevel);
  return currentIndex < levels.length - 1 ? levels[currentIndex + 1] : null;
}

function calculateLevelProgress(xp, level) {
  const levelThresholds = {
    beginner: { min: 0, max: 1000 },
    intermediate: { min: 1000, max: 2500 },
    advanced: { min: 2500, max: 5000 },
    expert: { min: 5000, max: null }
  };

  const threshold = levelThresholds[level];
  if (!threshold.max) return 100;

  return Math.min(100, Math.round(
    ((xp - threshold.min) / (threshold.max - threshold.min)) * 100
  ));
}

export default router;