/*
  Warnings:

  - You are about to drop the column `createdAt` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `level` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `xp` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `ConversationPractice` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `GrammarExercise` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `LearningGame` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ListeningPractice` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Progress` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ReadingComprehension` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SpeakingPractice` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Story` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Vocabulary` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `VocabularyFlashcards` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `WritingExercise` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ConversationPractice" DROP CONSTRAINT "ConversationPractice_partnerId_fkey";

-- DropForeignKey
ALTER TABLE "ConversationPractice" DROP CONSTRAINT "ConversationPractice_userId_fkey";

-- DropForeignKey
ALTER TABLE "GrammarExercise" DROP CONSTRAINT "GrammarExercise_userId_fkey";

-- DropForeignKey
ALTER TABLE "LearningGame" DROP CONSTRAINT "LearningGame_userId_fkey";

-- DropForeignKey
ALTER TABLE "ListeningPractice" DROP CONSTRAINT "ListeningPractice_userId_fkey";

-- DropForeignKey
ALTER TABLE "Progress" DROP CONSTRAINT "Progress_storyId_fkey";

-- DropForeignKey
ALTER TABLE "Progress" DROP CONSTRAINT "Progress_userId_fkey";

-- DropForeignKey
ALTER TABLE "ReadingComprehension" DROP CONSTRAINT "ReadingComprehension_userId_fkey";

-- DropForeignKey
ALTER TABLE "SpeakingPractice" DROP CONSTRAINT "SpeakingPractice_userId_fkey";

-- DropForeignKey
ALTER TABLE "Vocabulary" DROP CONSTRAINT "Vocabulary_storyId_fkey";

-- DropForeignKey
ALTER TABLE "VocabularyFlashcards" DROP CONSTRAINT "VocabularyFlashcards_userId_fkey";

-- DropForeignKey
ALTER TABLE "WritingExercise" DROP CONSTRAINT "WritingExercise_userId_fkey";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "createdAt",
DROP COLUMN "level",
DROP COLUMN "updatedAt",
DROP COLUMN "xp";

-- DropTable
DROP TABLE "ConversationPractice";

-- DropTable
DROP TABLE "GrammarExercise";

-- DropTable
DROP TABLE "LearningGame";

-- DropTable
DROP TABLE "ListeningPractice";

-- DropTable
DROP TABLE "Progress";

-- DropTable
DROP TABLE "ReadingComprehension";

-- DropTable
DROP TABLE "SpeakingPractice";

-- DropTable
DROP TABLE "Story";

-- DropTable
DROP TABLE "Vocabulary";

-- DropTable
DROP TABLE "VocabularyFlashcards";

-- DropTable
DROP TABLE "WritingExercise";
