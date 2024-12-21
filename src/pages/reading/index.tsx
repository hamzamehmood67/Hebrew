import { useState } from 'react';
import { motion } from 'framer-motion';
import { StoryReader } from '@/components/reading/StoryReader';
import { useReadingStore } from '@/store/readingStore';
import { readingLevels } from '@/data/reading-content';
import type { Story } from '@/types/reading';

export default function ReadingPage() {
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);
  const { getProgress } = useReadingStore();

  const handleStoryComplete = () => {
    setSelectedStory(null);
  };

  return (
    <div className="container mx-auto py-12">
      {selectedStory ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <StoryReader story={selectedStory} onComplete={handleStoryComplete} />
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-12"
        >
          {readingLevels.map((level) => (
            <div key={level.id} className="space-y-6">
              <h2 className="text-2xl font-bold">{level.title}</h2>
              <p className="text-gray-600">{level.description}</p>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {level.stories.map((story) => {
                  const progress = getProgress(story.id);
                  const isCompleted = progress.completedAt !== '';

                  return (
                    <motion.div
                      key={story.id}
                      whileHover={{ scale: 1.02 }}
                      className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer"
                      onClick={() => setSelectedStory(story)}
                    >
                      <div className="p-6">
                        <h3 className="text-xl font-bold mb-2">{story.title}</h3>
                        <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                          <span>~{story.estimatedTime} min</span>
                          <span>{story.points} XP</span>
                        </div>

                        {isCompleted ? (
                          <div className="flex items-center text-green-600">
                            <span className="mr-2">✓</span>
                            <span>Completed</span>
                          </div>
                        ) : (
                          <div className="text-brand-600">Start Reading</div>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          ))}
        </motion.div>
      )}
    </div>
  );
}