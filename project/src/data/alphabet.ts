import { HebrewLetter } from '../types/lesson';

export const hebrewAlphabet: HebrewLetter[] = [
  {
    letter: 'א',
    name: 'Alef',
    pronunciation: 'Silent',
    examples: [
      {
        word: 'אבא',
        translation: 'Father',
        transliteration: 'Abba'
      },
      {
        word: 'אמא',
        translation: 'Mother',
        transliteration: 'Ima'
      }
    ]
  },
  {
    letter: 'ב',
    name: 'Bet',
    pronunciation: 'b/v',
    examples: [
      {
        word: 'בית',
        translation: 'House',
        transliteration: 'Bayit'
      },
      {
        word: 'בוקר',
        translation: 'Morning',
        transliteration: 'Boker'
      }
    ]
  },
  // Add more letters as needed
];