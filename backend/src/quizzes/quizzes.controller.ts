import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { QuizzesService } from './quizzes.service';
import { CreateQuizSchema } from './dto/create-quiz.schema';

@Controller('quizzes')
export class QuizzesController {
  constructor(private readonly quizzesService: QuizzesService) {}

  @Post()
  create(@Body() createQuizDto: CreateQuizSchema) {
    return this.quizzesService.create(createQuizDto);
  }

  @Get()
  findAll() {
    return this.quizzesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.quizzesService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.quizzesService.remove(+id);
  }
}
