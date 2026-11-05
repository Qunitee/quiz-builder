'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FormProvider, useForm, type Path } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AnswerType } from '@/entities/quiz/models/quiz.model';
import { useCreateQuiz } from '@/entities/quiz/quiz.hook';
import {
  createQuizSchema,
  type CreateQuizDto,
} from '@/entities/quiz/schemas/create-quiz.schema';
import { createQuestion } from '@/entities/quiz/utils/create-question.util';
import { QuestionsField } from '@/features/quiz-create/components/questions-field';
import { ControlledInput } from '@/shared/components/controlled-input/controlled-input';
import { AppRoutes } from '@/shared/constants/app-routes.constant';
import { ApiError } from '@/shared/services/api-client/api-client';
import { UiButton } from '@/shared/ui/ui-button/ui-button';
import { CardContent, UiCard } from '@/shared/ui/ui-card/ui-card';
import { FieldError } from '@/shared/ui/ui-field/field';
import { focusFirstError } from '@/shared/utils/focus-first-error.util';
import { getErrorMessage } from '@/shared/utils/get-error-message.util';

const DefaultValues: CreateQuizDto = {
  title: '',
  questions: [createQuestion(AnswerType.Boolean)],
};

export function QuizForm() {
  const router = useRouter();
  const createQuiz = useCreateQuiz();
  const form = useForm<CreateQuizDto>({
    resolver: zodResolver(createQuizSchema),
    defaultValues: DefaultValues,
    shouldFocusError: false,
  });

  const showServerErrors = (error: Error) => {
    if (!(error instanceof ApiError)) return;
    error.fieldErrors.forEach(({ path, message }) =>
      form.setError(path as Path<CreateQuizDto>, { type: 'server', message }),
    );
    focusFirstError();
  };

  const handleValidSubmit = (dto: CreateQuizDto) =>
    createQuiz.mutate(dto, {
      onSuccess: (quiz) => router.push(AppRoutes.QuizDetails(quiz.id)),
      onError: showServerErrors,
    });

  const isSaving = createQuiz.isPending || createQuiz.isSuccess;

  return (
    <FormProvider {...form}>
      <form
        noValidate
        className="flex flex-col gap-4"
        onSubmit={form.handleSubmit(handleValidSubmit, focusFirstError)}
      >
        <UiCard>
          <CardContent>
            <ControlledInput
              control={form.control}
              name="title"
              label="Quiz title"
              placeholder="e.g. JavaScript basics"
            />
          </CardContent>
        </UiCard>

        <QuestionsField />

        <FieldError>
          {createQuiz.isError ? getErrorMessage(createQuiz.error) : undefined}
        </FieldError>

        <div className="flex justify-end gap-2">
          <UiButton asChild variant="ghost" size="sm">
            <Link href={AppRoutes.Quizzes}>Cancel</Link>
          </UiButton>
          <UiButton
            type="submit"
            variant="primary"
            size="sm"
            disabled={isSaving}
          >
            {isSaving ? 'Creating…' : 'Create quiz'}
          </UiButton>
        </div>
      </form>
    </FormProvider>
  );
}
