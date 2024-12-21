import { motion } from 'framer-motion';
import { Book, Clock, Target, Award } from 'lucide-react';

interface StoryProgress {
  id: string;
  title: string;
  lastAttempt: Date;
  bestScore: number;
  attempts: number;
  averageTime: number;
  completed: boolean;
  achievements: string[];
}

interface ProgressDetailsProps {
  stories: StoryProgress[];
}

export function ProgressDetails({ stories }: ProgressDetailsProps) {
  return (
    <div className="space-y-6">
      {stories.map((story, index) => (
        <motion.div
          key={story.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-white rounded-xl shadow-lg p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <Book className="h-6 w-6 text-brand-600 mr-3" />
              <div>
                <h3 className="font-semibold">{story.title}</h3>
                <p className="text-sm text-gray-500">
                  Last attempt: {new Date(story.lastAttempt).toLocaleDateString()}
                </p>
              </div>
            </div>
            {story.completed && (
              <div className="bg-green-50 text-green-600 px-3 py-1 rounded-full text-sm">
                Completed
              </div>
            )}
          </div>

          <div className="grid grid-cols-3 gap-4 mb-4">
            <div className="flex items-center">
              <Target className="h-5 w-5 text-gray-400 mr-2" />
              <div>
                <p className="text-sm text-gray-500">Best Score</p>
                <p className="font-semibold">{story.bestScore}%</p>
              </div>
            </div>

            <div className="flex items-center">
              <Clock className="h-5 w-5 text-gray-400 mr-2" />
              <div>
                <p className="text-sm text-gray-500">Avg. Time</p>
                <p className="font-semibold">{story.averageTime}m</p>
              </div>
            </div>

            <div className="flex items-center">
              <Book className="h-5 w-5 text-gray-400 mr-2" />
              <div>
                <p className="text-sm text-gray-500">Attempts</p>
                <p className="font-semibold">{story.attempts}</p>
              </div>
            </div>
          </div>

          {story.achievements.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {story.achievements.map((achievement) => (
                <div
                  key={achievement}
                  className="flex items-center bg-brand-50 text-brand-600 px-3 py-1 rounded-full text-sm"
                >
                  <Award className="h-4 w-4 mr-1" />
                  {achievement}
                </div>
              ))}
            </div>
          )}
        </motion.div>
      ))}
    </div>
  );
}