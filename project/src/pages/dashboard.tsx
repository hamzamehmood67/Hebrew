import { motion } from 'framer-motion';
import { ScoreDisplay } from '@/components/game/ScoreDisplay';
import { Leaderboard } from '@/components/game/Leaderboard';
import { WeeklyChallenges } from '@/components/game/WeeklyChallenges';

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900">Your Progress</h1>
          <p className="mt-2 text-gray-600">Track your Hebrew learning journey</p>
        </motion.div>

        <div className="space-y-8">
          <ScoreDisplay />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <WeeklyChallenges />
            <Leaderboard />
          </div>
        </div>
      </div>
    </div>
  );
}