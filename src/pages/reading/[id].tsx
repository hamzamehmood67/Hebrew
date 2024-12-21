import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/store/authStore';

const sampleStories = {
  '1': {
    title: 'First Day in Israel',
    content: 'שלום! קוראים לי דן. היום הגעתי לישראל. אני גר בתל אביב. העיר יפה מאוד.',
    translation: 'Hello! My name is Dan. Today I arrived in Israel. I live in Tel Aviv. The city is very beautiful.',
    vocabulary: [
      { word: 'שלום', translation: 'Hello', transliteration: 'Shalom' },
      { word: 'קוראים לי', translation: 'My name is', transliteration: 'Korim li' },
      { word: 'היום', translation: 'Today', transliteration: 'Hayom' }
    ]
  }
};

export default function StoryPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);
  const [showTranslation, setShowTranslation] = useState(false);
  const story = sampleStories[id as keyof typeof sampleStories];

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  if (!story) {
    return <div>Story not found</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-lg p-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-6">{story.title}</h1>
          
          <div className="mb-8">
            <p className="text-xl mb-4 leading-relaxed">{story.content}</p>
            <Button
              variant="outline"
              onClick={() => setShowTranslation(!showTranslation)}
              className="mb-4"
            >
              {showTranslation ? 'Hide' : 'Show'} Translation
            </Button>
            {showTranslation && (
              <p className="text-gray-600 italic">{story.translation}</p>
            )}
          </div>

          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4">Vocabulary:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {story.vocabulary.map((word, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-4">
                  <p className="text-lg font-bold">{word.word}</p>
                  <p className="text-gray-600">{word.transliteration}</p>
                  <p className="text-gray-500">{word.translation}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-between">
            <Button variant="outline" onClick={() => navigate('/reading')}>
              Back to Stories
            </Button>
            <Button>Mark as Complete</Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}