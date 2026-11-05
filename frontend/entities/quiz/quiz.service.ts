import type { Quiz, QuizSummary } from '@/entities/quiz/models/quiz.model';
import type { CreateQuizDto } from '@/entities/quiz/schemas/create-quiz.schema';
import { apiRequest } from '@/shared/services/api-client/api-client';
import { CrudApiService } from '@/shared/services/crud-service/crud-api.service';

interface QuizListItemResponse {
  id: string;
  title: string;
  _count: { questions: number };
}

class QuizService extends CrudApiService<QuizSummary, Quiz, CreateQuizDto> {
  constructor() {
    super('/quizzes');
  }

  override async getItems(): Promise<QuizSummary[]> {
    const quizzes = await apiRequest<QuizListItemResponse[]>(this.endpoint);

    return quizzes.map(({ id, title, _count }) => ({
      id,
      title,
      questionCount: _count.questions,
    }));
  }
}

export const quizService = new QuizService();
