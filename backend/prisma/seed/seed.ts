import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../../src/generated/prisma/client';

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL! }),
});

const SAMPLE_QUIZ_ID = '7b3e4f2a-1c5d-4e8f-9a6b-2d1c0e9f8a7b';

async function main() {
  await prisma.$transaction(async (tx) => {
    await tx.quiz.deleteMany({ where: { id: SAMPLE_QUIZ_ID } });

    await tx.quiz.create({
      data: {
        id: SAMPLE_QUIZ_ID,
        title: 'JavaScript basics',
        questions: {
          create: [
            {
              order: 0,
              answerType: 'BOOLEAN',
              text: 'JavaScript is a statically typed language.',
              options: {
                create: [
                  { order: 0, text: 'True', isCorrect: false },
                  { order: 1, text: 'False', isCorrect: true },
                ],
              },
            },
            {
              order: 1,
              answerType: 'INPUT',
              text: 'Which keyword declares a block-scoped constant?',
              options: {
                create: [{ order: 0, text: 'const', isCorrect: true }],
              },
            },
            {
              order: 2,
              answerType: 'CHECKBOX',
              text: 'Which of these are primitive types in JavaScript?',
              options: {
                create: [
                  { order: 0, text: 'string', isCorrect: true },
                  { order: 1, text: 'number', isCorrect: true },
                  { order: 2, text: 'array', isCorrect: false },
                  { order: 3, text: 'object', isCorrect: false },
                ],
              },
            },
          ],
        },
      },
    });
  });

  console.log('Seeded sample quiz');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
