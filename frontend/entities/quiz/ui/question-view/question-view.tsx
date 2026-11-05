'use client';

import type { ComponentType } from 'react';
import { QuestionTypeLabels } from '@/entities/quiz/constants/question-types.constant';
import {
  AnswerType,
  type QuizQuestion,
} from '@/entities/quiz/models/quiz.model';
import {
  BooleanAnswerView,
  CheckboxAnswerView,
  InputAnswerView,
  type AnswerViewProps,
} from '@/entities/quiz/ui/question-view/answer-views';
import { UiBadge } from '@/shared/ui/ui-badge/ui-badge';
import {
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
  UiCard,
} from '@/shared/ui/ui-card/ui-card';

const AnswerViews: Record<AnswerType, ComponentType<AnswerViewProps>> = {
  [AnswerType.Boolean]: BooleanAnswerView,
  [AnswerType.Input]: InputAnswerView,
  [AnswerType.Checkbox]: CheckboxAnswerView,
};

interface QuestionViewProps {
  question: QuizQuestion;
  position: number;
}

export function QuestionView({ question, position }: QuestionViewProps) {
  const AnswerView = AnswerViews[question.answerType];

  return (
    <UiCard>
      <CardHeader>
        <CardTitle className="wrap-anywhere">
          {position}. {question.text}
        </CardTitle>
        <CardAction>
          <UiBadge variant="accent-soft" size="xs">
            {QuestionTypeLabels[question.answerType]}
          </UiBadge>
        </CardAction>
      </CardHeader>
      <CardContent>
        <AnswerView options={question.options} />
      </CardContent>
    </UiCard>
  );
}
