'use client';

import { useId } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import type { CreateQuizDto } from '@/entities/quiz/schemas/create-quiz.schema';
import { FormArrayError } from '@/shared/components/form-array-error/form-array-error';
import {
  UiRadioGroup,
  UiRadioGroupItem,
} from '@/shared/ui/ui-radio-group/ui-radio-group';
import { UiLabel } from '@/shared/ui/ui-label/ui-label';

interface BooleanAnswerEditorProps {
  questionIndex: number;
}

export function BooleanAnswerEditor({
  questionIndex,
}: BooleanAnswerEditorProps) {
  const { control, setValue, clearErrors } = useFormContext<CreateQuizDto>();
  const groupId = useId();
  const name = `questions.${questionIndex}.options` as const;
  const options = useWatch({ control, name });

  const selectAnswer = (text: string) => {
    setValue(
      name,
      options.map((option) => ({ ...option, isCorrect: option.text === text })),
    );
    clearErrors(name);
  };

  return (
    <div className="flex flex-col gap-2">
      <span id={groupId} className="text-sm font-medium">
        Correct answer
      </span>
      <UiRadioGroup
        aria-labelledby={groupId}
        className="flex gap-6"
        value={options.find((option) => option.isCorrect)?.text ?? ''}
        onValueChange={selectAnswer}
      >
        {options.map((option) => {
          const itemId = `${groupId}-${option.text}`;

          return (
            <div key={option.text} className="flex items-center gap-2">
              <UiRadioGroupItem id={itemId} value={option.text} />
              <UiLabel htmlFor={itemId}>{option.text}</UiLabel>
            </div>
          );
        })}
      </UiRadioGroup>
      <FormArrayError control={control} name={name} />
    </div>
  );
}
