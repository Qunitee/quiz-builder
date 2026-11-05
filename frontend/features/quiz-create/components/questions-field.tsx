'use client';

import { useFieldArray, useFormContext } from 'react-hook-form';
import { QuizLimits } from '@/entities/quiz/constants/quiz-limits.constant';
import { AnswerType } from '@/entities/quiz/models/quiz.model';
import type { CreateQuizDto } from '@/entities/quiz/schemas/create-quiz.schema';
import { createQuestion } from '@/entities/quiz/utils/create-question.util';
import { QuestionCard } from '@/features/quiz-create/components/question-card';
import { FormArrayError } from '@/shared/components/form-array-error/form-array-error';
import { UiButton } from '@/shared/ui/ui-button/ui-button';
import { UiIcon } from '@/shared/ui/ui-icon/ui-icon';

export function QuestionsField() {
  const { control } = useFormContext<CreateQuizDto>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'questions',
  });

  const addQuestion = () =>
    append(createQuestion(AnswerType.Boolean), {
      focusName: `questions.${fields.length}.text`,
    });

  return (
    <div className="flex flex-col gap-4">
      {fields.map((field, index) => (
        <QuestionCard
          key={field.id}
          index={index}
          canRemove={fields.length > 1}
          onRemove={() => remove(index)}
        />
      ))}

      <FormArrayError control={control} name="questions" />

      <UiButton
        type="button"
        variant="outline"
        size="sm"
        disabled={fields.length >= QuizLimits.maxQuestions}
        onClick={addQuestion}
      >
        <UiIcon name="Plus" aria-hidden />
        Add question
      </UiButton>
    </div>
  );
}
