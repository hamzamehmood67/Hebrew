import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  try {
    const stories = await prisma.story.findMany({
      include: {
        questions: true,
        vocabulary: true,
      },
    });
    console.log('Stories:', JSON.stringify(stories, null, 2));
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
