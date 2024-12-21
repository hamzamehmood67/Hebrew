```typescript
import { motion } from 'framer-motion';
import { Button } from '../ui/button';
import { ArrowLeft, Gamepad2, Trophy, Star } from 'lucide-react';
import { useState } from 'react';
import { useWindowSize } from 'react-use';
import Confetti from 'react-confetti';

// ... rest of the imports

export function GameCenter({ onBack }: Props) {
  const { width, height } = useWindowSize();
  // ... other state declarations

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {showConfetti && <Confetti width={width} height={height} />}
      
      {/* Rest of the component remains the same */}
    </div>
  );
}
```