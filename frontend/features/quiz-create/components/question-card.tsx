'use client';

import { useFormContext, useWatch } from 'react-hook-form';
import { QuestionTypeOptions } from '@/entities/quiz/constants/question-types.constant';
import type { AnswerType } from '@/entities/quiz/models/quiz.model';
import type { CreateQuizDto } from '@/entities/quiz/schemas/create-quiz.schema';
import { createQuestion } from '@/entities/quiz/utils/create-question.util';
import { AnswerEditor } from '@/features/quiz-create/components/answer-editor';
import { ControlledInput } from '@/shared/components/controlled-input/controlled-input';
import {
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
  UiCard,
} from '@/shared/ui/ui-card/ui-card';
import { UiIconButton } from '@/shared/ui/ui-icon-button/ui-icon-button';
import { UiSegmentedControl } from '@/shared/ui/ui-segmented-control/ui-segmented-control';

interface QuestionCardProps {
  index: number;
  canRemove: boolean;
  onRemove: () => void;
}

export function QuestionCard({
  index,
  canRemove,
  onRemove,
}: QuestionCardProps) {
  const { control, getValues, setValue, clearErrors } =
    useFormContext<CreateQuizDto>();
  const name = `questions.${index}` as const;
  const answerType = useWatch({ control, name: `${name}.answerType` });

  const changeAnswerType = (nextType: AnswerType) => {
    setValue(name, createQuestion(nextType, getValues(`${name}.text`)));
    clearErrors(`${name}.options`);
  };

  return (
    <UiCard>
      <CardHeader className="items-center">
        <CardTitle>Question {index + 1}</CardTitle>
        <CardAction className="self-center">
          <UiIconButton
            name="Trash"
            label={`Remove question ${index + 1}`}
            size="sm"
            disabled={!canRemove}
            onClick={onRemove}
          />
        </CardAction>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <UiSegmentedControl
          aria-label={`Question ${index + 1} type`}
          value={answerType}
          options={QuestionTypeOptions}
          onValueChange={changeAnswerType}
        />
        <ControlledInput
          control={control}
          name={`${name}.text`}
          label="Question"
          placeholder="What would you like to ask?"
        />
        <AnswerEditor
          key={answerType}
          answerType={answerType}
          questionIndex={index}
        />
      </CardContent>
    </UiCard>
  );
}
