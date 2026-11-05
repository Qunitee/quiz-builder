'use client';

import type { ReactNode } from 'react';
import Link from 'next/link';
import type { QuizSummary } from '@/entities/quiz/models/quiz.model';
import { formatQuestionCount } from '@/entities/quiz/utils/format-question-count.util';
import { AppRoutes } from '@/shared/constants/app-routes.constant';
import { CardContent, UiCard } from '@/shared/ui/ui-card/ui-card';

interface QuizCardProps {
  quiz: QuizSummary;
  action?: ReactNode;
}

export function QuizCard({ quiz, action }: QuizCardProps) {
  return (
    <UiCard className="relative transition-shadow hover:ring-primary/50">
      <CardContent className="flex items-center gap-3">
        <div className="flex min-w-0 flex-1 flex-col gap-1">
          <Link
            href={AppRoutes.QuizDetails(quiz.id)}
            className="truncate text-base font-medium outline-none after:absolute after:inset-0 focus-visible:after:ring-3 focus-visible:after:ring-ring/50 focus-visible:after:ring-inset"
          >
            {quiz.title}
          </Link>
          <p className="text-muted-foreground">
            {formatQuestionCount(quiz.questionCount)}
          </p>
        </div>
        {action && <div className="relative z-10">{action}</div>}
      </CardContent>
    </UiCard>
  );
}
