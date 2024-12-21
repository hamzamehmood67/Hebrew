import { useState, useRef, useEffect } from 'react';
import { Button } from '../ui/button';
import { ArrowLeft, Mic, MicOff, Play, Square, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useWindowSize } from 'react-use';
import Confetti from 'react-confetti';
import WaveSurfer from 'wavesurfer.js';

interface SpeakingPracticeProps {
  onBack: () => void;
}

interface Phrase {
  id: string;
  hebrew: string;
  transliteration: string;
  english: string;
  audioUrl?: string;
}

const phrases: Phrase[] = [
  {
    id: '1',
    hebrew: 'שָׁלוֹם! מַה שְׁלוֹמְךָ?',
    transliteration: 'Shalom! Ma shlomcha?',
    english: 'Hello! How are you?'
  },
  {
    id: '2',
    hebrew: 'נָעִים מְאוֹד לְהַכִּיר אוֹתְךָ',
    transliteration: 'Na\'im me\'od lehakir otcha',
    english: 'Very nice to meet you'
  }
];

export function SpeakingPractice({ onBack }: SpeakingPracticeProps) {
  const { width, height } = useWindowSize();
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [currentPhrase] = useState<Phrase>(phrases[0]);
  const [isComplete, setIsComplete] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [notification, setNotification] = useState<{
    type: 'success' | 'error';
    message: string;
  } | null>(null);
  const waveformRef = useRef<HTMLDivElement>(null);
  const wavesurferRef = useRef<WaveSurfer | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        setNotification(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  useEffect(() => {
    if (waveformRef.current && audioBlob) {
      wavesurferRef.current = WaveSurfer.create({
        container: waveformRef.current,
        waveColor: 'violet',
        progressColor: 'purple',
        cursorWidth: 1,
        height: 50,
        normalize: true
      });

      wavesurferRef.current.loadBlob(audioBlob);

      return () => {
        wavesurferRef.current?.destroy();
      };
    }
  }, [audioBlob]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      const chunks: BlobPart[] = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunks.push(e.data);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'audio/webm' });
        setAudioBlob(blob);
      };

      mediaRecorderRef.current = mediaRecorder;
      mediaRecorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error('Failed to start recording:', error);
      setNotification({
        type: 'error',
        message: 'Failed to access microphone. Please check your permissions.'
      });
    }
  };

  const stopRecording = () => {
    mediaRecorderRef.current?.stop();
    setIsRecording(false);
  };

  const togglePlayback = () => {
    if (wavesurferRef.current) {
      if (isPlaying) {
        wavesurferRef.current.pause();
      } else {
        wavesurferRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleComplete = async () => {
    if (!audioBlob) {
      setNotification({
        type: 'error',
        message: 'Please record yourself speaking before completing.'
      });
      return;
    }

    try {
      setIsSubmitting(true);
      // Here you would typically send the audio to your backend
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      
      setNotification({
        type: 'success',
        message: 'Great speaking practice! Keep it up!'
      });
      setIsComplete(true);
    } catch (error) {
      console.error('Failed to submit speaking practice:', error);
      setNotification({
        type: 'error',
        message: 'Failed to save your progress. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isComplete) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col items-center justify-center min-h-[400px] p-8"
      >
        <Confetti
          width={width}
          height={height}
          recycle={false}
          numberOfPieces={500}
        />
        <h2 className="text-2xl font-bold mb-4">Practice Complete!</h2>
        <Button onClick={onBack}>Return to Practice Menu</Button>
      </motion.div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="container mx-auto px-4 py-8"
    >
      {notification && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`fixed top-4 right-4 p-4 rounded-lg shadow-lg ${
            notification.type === 'success' ? 'bg-green-500' : 'bg-red-500'
          } text-white`}
        >
          {notification.message}
        </motion.div>
      )}

      <Button 
        variant="outline" 
        className="mb-4"
        onClick={onBack}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Practice
      </Button>

      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-4">Speaking Practice</h2>
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded-lg space-y-2">
            <p className="text-lg font-hebrew">{currentPhrase.hebrew}</p>
            <p className="text-sm text-gray-600">{currentPhrase.transliteration}</p>
            <p className="text-sm text-gray-600">{currentPhrase.english}</p>
          </div>
          
          <div className="flex justify-center space-x-4">
            <Button
              size="lg"
              variant={isRecording ? "secondary" : "primary"}
              onClick={isRecording ? stopRecording : startRecording}
            >
              {isRecording ? (
                <>
                  <MicOff className="mr-2 h-5 w-5" />
                  Stop Recording
                </>
              ) : (
                <>
                  <Mic className="mr-2 h-5 w-5" />
                  Start Recording
                </>
              )}
            </Button>

            {audioBlob && (
              <Button
                size="lg"
                variant="outline"
                onClick={togglePlayback}
              >
                {isPlaying ? (
                  <>
                    <Square className="mr-2 h-5 w-5" />
                    Stop
                  </>
                ) : (
                  <>
                    <Play className="mr-2 h-5 w-5" />
                    Play
                  </>
                )}
              </Button>
            )}
          </div>

          {audioBlob && (
            <div className="mt-4">
              <div ref={waveformRef} />
            </div>
          )}

          <Button 
            className="w-full"
            onClick={handleComplete}
            disabled={isSubmitting || !audioBlob}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              'Complete Practice'
            )}
          </Button>
        </div>
      </div>
    </motion.div>
  );
}