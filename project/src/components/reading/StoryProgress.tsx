```typescript
import { motion } from 'framer-motion';
import { Trophy, Star, Clock, Award } from 'lucide-react';

interface StoryProgressProps {
  score: number;
  timeSpent: number;
  xpEarned: number;
  achievements: string[];
  bonusCompleted?: boolean;
}

export function StoryProgress({
  score,
  timeSpent,
  xpEarned,
  achievements,
  bonusCompleted
}: StoryProgressProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-lg p-6"
    >
      <h3 className="text-xl font-bold mb-4">Reading Progress</h3>
      
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="flex items-center">
          <Star className="h-5 w-5 text-yellow-400 mr-2" />
          <div>
            <p className="text-sm text-gray-600">Score</p>
            <p className="font-bold">{score}%</p>
          </div>
        </div>
        
        <div className="flex items-center">
          <Clock className="h-5 w-5 text-brand-600 mr-2" />
          <div>
            <p className="text-sm text-gray-600">Time</p>
            <p className="font-bold">{Math.round(timeSpent / 60)} minutes</p>
          </div>
        </div>
        
        <div className="flex items-center">
          <Trophy className="h-5 w-5 text-purple-600 mr-2" />
          <div>
            <p className="text-sm text-gray-600">XP Earned</p>
            <p className="font-bold">+{xpEarned} XP</p>
          </div>
        </div>
        
        {bonusCompleted && (
          <div className="flex items-center">
            <Award className="h-5 w-5 text-green-600 mr-2" />
            <div>
              <p className="text-sm text-gray-600">Bonus</p>
              <p className="font-bold text-green-600">Completed!</p>
            </div>
          </div>
        )}
      </div>

      {achievements.length > 0 && (
        <div className="border-t pt-4">
          <h4 className="font-semibold mb-2">Achievements Unlocked!</h4>
          <div className="space-y-2">
            {achievements.map((achievement, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center bg-brand-50 p-2 rounded-lg"
              >
                <Award className="h-4 w-4 text-brand-600 mr-2" />
                <span className="text-sm text-brand-700">{achievement}</span>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
}
```