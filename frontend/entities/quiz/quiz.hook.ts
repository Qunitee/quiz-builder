import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { quizService } from '@/entities/quiz/quiz.service';
import type { QuizSummary } from '@/entities/quiz/models/quiz.model';
import type { CreateQuizDto } from '@/entities/quiz/schemas/create-quiz.schema';

const QuizKeys = {
  list: ['quizzes', 'list'] as const,
  details: (id: string) => ['quizzes', 'details', id] as const,
};

export function useQuizzes() {
  return useQuery({
    queryKey: QuizKeys.list,
    queryFn: () => quizService.getItems(),
  });
}

export function useQuiz(id: string) {
  return useQuery({
    queryKey: QuizKeys.details(id),
    queryFn: () => quizService.getItemById(id),
  });
}

export function useCreateQuiz() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (dto: CreateQuizDto) => quizService.createItem(dto),
    onSuccess: (quiz) => {
      queryClient.setQueryData(QuizKeys.details(quiz.id), quiz);
      return queryClient.invalidateQueries({ queryKey: QuizKeys.list });
    },
  });
}

export function useDeleteQuiz() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => quizService.deleteItem(id),
    onSuccess: (_, id) => {
      queryClient.setQueryData<QuizSummary[]>(QuizKeys.list, (quizzes) =>
        quizzes?.filter((quiz) => quiz.id !== id),
      );
      queryClient.removeQueries({ queryKey: QuizKeys.details(id) });
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: QuizKeys.list }),
  });
}
