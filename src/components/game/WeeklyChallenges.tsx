import { useState } from 'react';
import { Button } from '../ui/button';
import { Trophy, Star, ChevronLeft } from 'lucide-react';
import { motion } from 'framer-motion';

interface WeeklyChallengesProps {
  onBack?: () => void;
}

interface Challenge {
  id: number;
  title: string;
  description: string;
  points: number;
  completed: boolean;
  deadline: string;
}

const sampleChallenges: Challenge[] = [
  {
    id: 1,
    title: 'Daily Conversation Master',
    description: 'Complete 5 conversation practice sessions',
    points: 100,
    completed: false,
    deadline: '2024-02-01'
  },
  {
    id: 2,
    title: 'Vocabulary Champion',
    description: 'Learn 20 new words this week',
    points: 150,
    completed: false,
    deadline: '2024-02-01'
  },
  {
    id: 3,
    title: 'Perfect Pronunciation',
    description: 'Record and submit 10 pronunciation exercises',
    points: 200,
    completed: false,
    deadline: '2024-02-01'
  }
];

export const WeeklyChallenges: React.FC<WeeklyChallengesProps> = ({ onBack }) => {
  const [challenges] = useState<Challenge[]>(sampleChallenges);

  return (
    <div className="flex flex-col min-h-screen bg-background p-4">
      <div className="max-w-4xl mx-auto w-full">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center space-x-2">
            <Trophy className="h-8 w-8 text-yellow-500" />
            <h2 className="text-3xl font-bold">Weekly Challenges</h2>
          </div>
          {onBack && (
            <Button variant="secondary" onClick={onBack}>
              <ChevronLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
          )}
        </div>

        <div className="grid gap-6">
          {challenges.map((challenge) => (
            <motion.div
              key={challenge.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-card rounded-lg shadow-lg p-6"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-semibold mb-2">{challenge.title}</h3>
                  <p className="text-muted-foreground mb-4">{challenge.description}</p>
                  <div className="flex items-center space-x-4">
                    <span className="flex items-center text-yellow-500">
                      <Star className="h-4 w-4 mr-1" />
                      {challenge.points} points
                    </span>
                    <span className="text-muted-foreground">
                      Deadline: {new Date(challenge.deadline).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                <Button
                  variant={challenge.completed ? 'outline' : 'primary'}
                  disabled={challenge.completed}
                >
                  {challenge.completed ? 'Completed' : 'Start Challenge'}
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};