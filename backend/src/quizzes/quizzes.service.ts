import { Injectable } from '@nestjs/common';
import { Prisma } from '../generated/prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import type { CreateQuizDto } from './dto/create-quiz.schema';

const quizWithQuestions = {
  questions: {
    orderBy: { order: 'asc' },
    include: { options: { orderBy: { order: 'asc' } } },
  },
} satisfies Prisma.QuizInclude;

@Injectable()
export class QuizzesService {
  constructor(private readonly prisma: PrismaService) {}

  create(dto: CreateQuizDto) {
    return this.prisma.quiz.create({
      data: {
        title: dto.title,
        questions: {
          create: dto.questions.map((q, qIndex) => ({
            order: qIndex,
            answerType: q.answerType,
            text: q.text,
            options: {
              create: q.options.map((o, oIndex) => ({
                order: oIndex,
                text: o.text,
                isCorrect: o.isCorrect,
              })),
            },
          })),
        },
      },
      include: quizWithQuestions,
    });
  }

  findOne(id: string) {
    return this.prisma.quiz.findUniqueOrThrow({
      where: { id },
      include: quizWithQuestions,
    });
  }

  findAll() {
    return this.prisma.quiz.findMany({
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        title: true,
        createdAt: true,
        _count: { select: { questions: true } },
      },
    });
  }

  async remove(id: string) {
    await this.prisma.quiz.delete({ where: { id } });
  }
}
