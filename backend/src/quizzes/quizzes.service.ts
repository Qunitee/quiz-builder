import { Injectable } from '@nestjs/common';
import { CreateQuizSchema } from './dto/create-quiz.schema';

@Injectable()
export class QuizzesService {
  create(createQuizDto: CreateQuizSchema) {
    return 'This action adds a new quiz';
  }

  findAll() {
    return `This action returns all quizzes`;
  }

  findOne(id: number) {
    return `This action returns a #${id} quiz`;
  }

  remove(id: number) {
    return `This action removes a #${id} quiz`;
  }
}
