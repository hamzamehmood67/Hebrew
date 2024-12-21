import { motion } from 'framer-motion';
import { useLessonStore } from '@/store/lessonStore';
import { Button } from '../ui/button';

export function AlphabetLesson() {
  const { getCurrentLetter, getNextLetter, markLetterComplete, setCurrentLetter } = useLessonStore();
  const currentLetter = getCurrentLetter();

  if (!currentLetter) return null;

  const handleComplete = () => {
    markLetterComplete(currentLetter.letter);
    const nextLetter = getNextLetter();
    if (nextLetter) {
      setCurrentLetter(useLessonStore.getState().currentLetterIndex + 1);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-lg shadow-lg p-8"
      >
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">{currentLetter.name}</h2>
          <p className="text-gray-600">Pronunciation: {currentLetter.pronunciation}</p>
        </div>

        <div className="flex justify-center mb-12">
          <div className="text-9xl font-bold text-blue-600">{currentLetter.letter}</div>
        </div>

        <div className="space-y-6">
          <h3 className="text-xl font-semibold">Example Words:</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {currentLetter.examples.map((example, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-4">
                <p className="text-2xl font-bold text-gray-900">{example.word}</p>
                <p className="text-gray-600">{example.transliteration}</p>
                <p className="text-gray-500">{example.translation}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 flex justify-center">
          <Button onClick={handleComplete} size="lg">
            Next Letter
          </Button>
        </div>
      </motion.div>
    </div>
  );
}