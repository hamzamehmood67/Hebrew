import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Volume2, BookOpen } from 'lucide-react';
import type { Story } from '@/types/reading';
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use';

interface StoryReaderProps {
  story: Story;
  onBack?: () => void;
  onComplete: (score: number) => void;
}

export function StoryReader({ story, onBack, onComplete }: StoryReaderProps) {
  const { width, height } = useWindowSize();
  const [showTranslation, setShowTranslation] = useState(false);
  const [showTransliteration, setShowTransliteration] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [score, setScore] = useState(0);

  const handleStartQuiz = () => {
    setCurrentQuestionIndex(0);
  };

  const handleSubmitAnswer = () => {
    if (currentQuestionIndex === null || !story.questions[currentQuestionIndex]) return;

    const currentQuestion = story.questions[currentQuestionIndex];
    
    if (selectedAnswer === null || !currentQuestion.options) return;
    
    const isCorrect = currentQuestion.options.find(option => option.text === selectedAnswer)?.isCorrect;
    
    if (isCorrect) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex === null) return;
    
    if (currentQuestionIndex < (story.questions?.length ?? 0) - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
    } else {
      // Calculate final score
      const finalScore = (score / (story.questions?.length ?? 1)) * 100;
      onComplete(finalScore);
    }
  };

  const playAudio = () => {
    if (!story.content) return;
    const utterance = new SpeechSynthesisUtterance(story.content);
    utterance.lang = 'he-IL';
    window.speechSynthesis.speak(utterance);
  };

  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswer(answer);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 p-4">
      {showConfetti && <Confetti width={width} height={height} />}
      
      <div className="max-w-4xl mx-auto w-full">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center space-x-2">
            <BookOpen className="h-8 w-8 text-primary" />
            <h2 className="text-3xl font-bold">Reading Practice</h2>
          </div>
          {onBack && (
            <Button variant="secondary" onClick={onBack}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
          )}
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <div className="flex justify-between items-start mb-6">
            <h3 className="text-2xl font-bold">{story.title}</h3>
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <Button
                variant="primary"
                onClick={() => setShowTransliteration(!showTransliteration)}
              >
                {showTransliteration ? 'Hide' : 'Show'} Transliteration
              </Button>
              <Button
                variant="primary"
                onClick={() => setShowTranslation(!showTranslation)}
              >
                {showTranslation ? 'Hide' : 'Show'} Translation
              </Button>
            </div>
          </div>

          <div className="space-y-8">
            <div
              className="text-right text-xl leading-relaxed"
              dir="rtl"
            >
              {story.content?.split('\n').map((line, index) => (
                <p key={index} className="mb-4">
                  {line}
                </p>
              ))}
            </div>

            {showTransliteration && story.transliteration && (
              <div
                className="text-gray-600 italic"
              >
                {story.transliteration}
              </div>
            )}

            {showTranslation && story.translation && (
              <div
                className="text-left text-lg text-muted-foreground leading-relaxed"
              >
                {story.translation.split('\n').map((line, index) => (
                  <p key={index} className="mb-4">
                    {line}
                  </p>
                ))}
              </div>
            )}
          </div>
        </div>

        {currentQuestionIndex === null ? (
          <div className="flex justify-center space-x-4">
            <Button
              variant="primary"
              onClick={handleStartQuiz}
            >
              Start Questions
            </Button>

            <Button
              variant="primary"
              onClick={playAudio}
            >
              <Volume2 className="mr-2 h-4 w-4" />
              Play Audio
            </Button>
          </div>
        ) : (
          <div className="space-y-8">
            {story.questions && story.questions[currentQuestionIndex] && (
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">
                  Question {currentQuestionIndex + 1} of {story.questions.length}
                </h3>
                
                <div className="mb-6">
                  <h3 className="text-xl font-bold mb-4">
                    {story.questions[currentQuestionIndex].question}
                  </h3>
                </div>

                <div className="space-y-3">
                  {story.questions[currentQuestionIndex].options.map((option) => (
                    <Button
                      key={option.text}
                      onClick={() => handleAnswerSelect(option.text)}
                      className="w-full justify-start text-left"
                      variant={
                        selectedAnswer === option.text
                          ? option.isCorrect
                            ? "primary"
                            : "destructive"
                          : "outline"
                      }
                      disabled={selectedAnswer !== null}
                    >
                      {option.text}
                    </Button>
                  ))}
                </div>

                <div className="flex justify-end space-x-4 mt-8">
                  <Button
                    variant="primary"
                    onClick={handleSubmitAnswer}
                    disabled={selectedAnswer === null}
                  >
                    Submit
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={handleNext}
                  >
                    Next Question
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}