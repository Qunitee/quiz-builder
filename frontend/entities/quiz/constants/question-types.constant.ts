import { AnswerType } from '@/entities/quiz/models/quiz.model';
import type { UiSegmentedOption } from '@/shared/ui/ui-segmented-control/ui-segmented-control';

export const QuestionTypeOptions = [
  { value: AnswerType.Boolean, label: 'True / False', icon: 'ToggleLeft' },
  { value: AnswerType.Input, label: 'Short text', icon: 'TextCursorInput' },
  { value: AnswerType.Checkbox, label: 'Multiple choice', icon: 'ListChecks' },
] as const satisfies readonly UiSegmentedOption<AnswerType>[];

export const QuestionTypeLabels = Object.fromEntries(
  QuestionTypeOptions.map(({ value, label }) => [value, label]),
) as Record<AnswerType, string>;
