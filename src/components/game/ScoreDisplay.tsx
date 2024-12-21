import { useGameStore } from '@/store/gameStore';
import { Star, Zap } from 'lucide-react';

export function ScoreDisplay() {
  const { weeklyXP: score, streak } = useGameStore();

  return (
    <div className="flex items-center space-x-6">
      <div className="flex items-center">
        <Star className="w-5 h-5 text-yellow-400 mr-2" />
        <span className="font-semibold">{score} XP</span>
      </div>
      <div className="flex items-center">
        <Zap className="w-5 h-5 text-orange-400 mr-2" />
        <span className="font-semibold">{streak} day streak</span>
      </div>
    </div>
  );
}