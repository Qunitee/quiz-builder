'use client';

import type { ReactNode } from 'react';
import type { QuizOption } from '@/entities/quiz/models/quiz.model';
import { UiBadge } from '@/shared/ui/ui-badge/ui-badge';
import { UiCheckbox } from '@/shared/ui/ui-checkbox/ui-checkbox';
import { UiInput } from '@/shared/ui/ui-input/input';
import {
  UiRadioGroup,
  UiRadioGroupItem,
} from '@/shared/ui/ui-radio-group/ui-radio-group';

export interface AnswerViewProps {
  options: QuizOption[];
}

interface AnswerOptionProps {
  option: QuizOption;
  children: ReactNode;
}

function AnswerOption({ option, children }: AnswerOptionProps) {
  return (
    <div className="flex items-center gap-2">
      {children}
      <label htmlFor={option.id} className="min-w-0 wrap-anywhere">
        {option.text}
      </label>
      {option.isCorrect && (
        <UiBadge variant="success-soft" size="xs">
          Correct
        </UiBadge>
      )}
    </div>
  );
}

export function BooleanAnswerView({ options }: AnswerViewProps) {
  const correctOption = options.find((option) => option.isCorrect);

  return (
    <UiRadioGroup value={correctOption?.text} disabled aria-label="Answer">
      {options.map((option) => (
        <AnswerOption key={option.id} option={option}>
          <UiRadioGroupItem id={option.id} value={option.text} />
        </AnswerOption>
      ))}
    </UiRadioGroup>
  );
}

export function InputAnswerView({ options }: AnswerViewProps) {
  return (
    <div className="flex flex-col gap-2">
      {options.map((option) => (
        <UiInput
          key={option.id}
          value={option.text}
          aria-label="Accepted answer"
          size="sm"
          readOnly
        />
      ))}
    </div>
  );
}

export function CheckboxAnswerView({ options }: AnswerViewProps) {
  return (
    <div className="flex flex-col gap-3">
      {options.map((option) => (
        <AnswerOption key={option.id} option={option}>
          <UiCheckbox id={option.id} checked={option.isCorrect} disabled />
        </AnswerOption>
      ))}
    </div>
  );
}
