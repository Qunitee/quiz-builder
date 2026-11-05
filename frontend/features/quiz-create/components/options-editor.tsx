'use client';

import { useFieldArray, useFormContext, type Path } from 'react-hook-form';
import { QuizLimits } from '@/entities/quiz/constants/quiz-limits.constant';
import type { CreateQuizDto } from '@/entities/quiz/schemas/create-quiz.schema';
import { ControlledCheckbox } from '@/shared/components/controlled-checkbox/controlled-checkbox';
import { ControlledInput } from '@/shared/components/controlled-input/controlled-input';
import { FormArrayError } from '@/shared/components/form-array-error/form-array-error';
import { UiButton } from '@/shared/ui/ui-button/ui-button';
import { FieldDescription } from '@/shared/ui/ui-field/field';
import { UiIcon } from '@/shared/ui/ui-icon/ui-icon';
import { UiIconButton } from '@/shared/ui/ui-icon-button/ui-icon-button';

interface OptionsEditorProps {
  questionIndex: number;
  minOptions: number;
  hint: string;
  optionLabel: string;
  addLabel: string;
  canMarkCorrect?: boolean;
}

export function OptionsEditor({
  questionIndex,
  minOptions,
  hint,
  optionLabel,
  addLabel,
  canMarkCorrect = false,
}: OptionsEditorProps) {
  const { control } = useFormContext<CreateQuizDto>();
  const name = `questions.${questionIndex}.options` as const;
  const { fields, append, remove } = useFieldArray({ control, name });

  const addOption = () =>
    append(
      { text: '', isCorrect: !canMarkCorrect },
      { focusName: `${name}.${fields.length}.text` },
    );

  return (
    <div className="flex flex-col gap-2">
      <FieldDescription>{hint}</FieldDescription>

      {fields.map((field, index) => {
        const label = `${optionLabel} ${index + 1}`;
        const textName = `${name}.${index}.text` as const;
        const deps = [`${name}.root`, textName] as Path<CreateQuizDto>[];

        return (
          <div key={field.id} className="flex items-start gap-2">
            {canMarkCorrect && (
              <ControlledCheckbox
                control={control}
                name={`${name}.${index}.isCorrect`}
                deps={deps}
                aria-label={`Mark ${label.toLowerCase()} as correct`}
                className="mt-3"
              />
            )}
            <div className="min-w-0 flex-1">
              <ControlledInput
                control={control}
                name={textName}
                deps={deps}
                placeholder={label}
                aria-label={label}
              />
            </div>
            <UiIconButton
              name="X"
              label={`Remove ${label.toLowerCase()}`}
              disabled={fields.length <= minOptions}
              onClick={() => remove(index)}
            />
          </div>
        );
      })}

      <FormArrayError control={control} name={name} />

      <UiButton
        type="button"
        variant="ghost"
        size="sm"
        className="self-start"
        disabled={fields.length >= QuizLimits.maxOptions}
        onClick={addOption}
      >
        <UiIcon name="Plus" aria-hidden />
        {addLabel}
      </UiButton>
    </div>
  );
}
