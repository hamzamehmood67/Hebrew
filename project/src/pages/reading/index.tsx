import { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, Trophy, Book, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { stories, readingLevels } from '@/data/stories';

// Mock user data (normally this would come from your auth store)
const mockUser = {
  level: 1,
  xp: 75,
  completedStories: ['beginner-1'],
  achievements: [
    {
      id: 'first-story',
      name: 'First Steps',
      description: 'Complete your first story',
      unlockedAt: new Date()
    }
  ]
};

export default function ReadingPage() {
  const [selectedStory, setSelectedStory] = useState(null);
  
  // Calculate XP progress to next level
  const currentLevel = readingLevels[mockUser.level - 1];
  const nextLevel = readingLevels[mockUser.level];
  const progressToNext = (mockUser.xp / nextLevel.xpRequired) * 100;

  const availableStories = stories.filter(story => 
    !mockUser.completedStories.includes(story.id)
  );

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Level Progress Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-lg p-6 mb-8"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-brand-50 rounded-lg">
                <Trophy className="h-6 w-6 text-brand-600" />
              </div>
              <div>
                <h2 className="text-xl font-bold">Level {mockUser.level}</h2>
                <p className="text-sm text-gray-600">{currentLevel.name}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">XP to Next Level</p>
              <p className="font-bold">{mockUser.xp} / {nextLevel.xpRequired}</p>
            </div>
          </div>
          
          <Progress value={progressToNext} className="h-2 mb-4" />
          
          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>{currentLevel.name}</span>
            <span>{nextLevel.name}</span>
          </div>
        </motion.div>

        {/* Available Stories */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {availableStories.map((story) => (
            <motion.div
              key={story.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="p-2 bg-brand-50 rounded-lg">
                  <Book className="h-6 w-6 text-brand-600" />
                </div>
                <div>
                  <h3 className="font-semibold">{story.title}</h3>
                  <p className="text-sm text-gray-600">{story.level}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Estimated time:</span>
                  <span>{story.estimatedTime}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Points:</span>
                  <span className="font-semibold text-brand-600">+{story.points} XP</span>
                </div>
                {story.bonusChallenge && (
                  <div className="flex items-center gap-2 text-sm text-yellow-600">
                    <Award className="h-4 w-4" />
                    <span>Bonus challenge available</span>
                  </div>
                )}
                <Button className="w-full" onClick={() => setSelectedStory(story)}>
                  Start Reading
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Completed Stories */}
        {mockUser.completedStories.length > 0 && (
          <div className="mt-12">
            <h3 className="text-xl font-bold mb-6">Completed Stories</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {stories
                .filter(story => mockUser.completedStories.includes(story.id))
                .map((story) => (
                  <motion.div
                    key={story.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-gray-50 rounded-xl p-6"
                  >
                    <div className="flex items-center gap-4">
                      <Star className="h-6 w-6 text-yellow-400" />
                      <div>
                        <h4 className="font-semibold">{story.title}</h4>
                        <p className="text-sm text-gray-600">Completed</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}