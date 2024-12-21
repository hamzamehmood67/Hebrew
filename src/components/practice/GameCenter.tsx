import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ChevronLeft, Gamepad2, Trophy, Star } from 'lucide-react';
import { useState } from 'react';
import { useWindowSize } from 'react-use';
import Confetti from 'react-confetti';

interface Props {
  onBack: () => void;
}

interface Game {
  id: string;
  title: string;
  description: string;
  icon: JSX.Element;
  comingSoon?: boolean;
}

const games: Game[] = [
  {
    id: 'word-match',
    title: 'Word Match',
    description: 'Match Hebrew words with their English translations',
    icon: <Gamepad2 className="h-8 w-8 text-brand-600" />
  },
  {
    id: 'sentence-builder',
    title: 'Sentence Builder',
    description: 'Build correct Hebrew sentences from word blocks',
    icon: <Star className="h-8 w-8 text-brand-600" />
  },
  {
    id: 'word-search',
    title: 'Word Search',
    description: 'Find Hebrew words hidden in a letter grid',
    icon: <Trophy className="h-8 w-8 text-brand-600" />,
    comingSoon: true
  }
];

export function GameCenter({ onBack }: Props) {
  const { width, height } = useWindowSize();
  const [showConfetti, setShowConfetti] = useState(false);

  const handleGameSelect = (gameId: string) => {
    const game = games.find(g => g.id === gameId);
    if (game?.comingSoon) return;
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 3000);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {showConfetti && <Confetti width={width} height={height} />}
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Button
          variant="outline"
          onClick={onBack}
          className="mb-8"
        >
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back to Practice
        </Button>

        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900">Game Center</h1>
          <p className="mt-4 text-xl text-gray-600">
            Learn Hebrew through fun and interactive games
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {games.map((game) => (
            <motion.div
              key={game.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`bg-white rounded-xl shadow-lg p-8 cursor-pointer 
                ${game.comingSoon ? 'opacity-60' : 'hover:shadow-xl'} 
                transition-all`}
              onClick={() => handleGameSelect(game.id)}
            >
              <div className="flex flex-col items-center text-center">
                <div className="p-4 bg-brand-50 rounded-full mb-4">
                  {game.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {game.title}
                  {game.comingSoon && (
                    <span className="ml-2 text-sm font-normal text-brand-600">
                      Coming Soon
                    </span>
                  )}
                </h3>
                <p className="text-gray-600">{game.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}