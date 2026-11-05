'use client';

import Link from 'next/link';
import { useQuizzes } from '@/entities/quiz/quiz.hook';
import { QuizCard } from '@/entities/quiz/ui/quiz-card';
import { DeleteQuizButton } from '@/features/quiz-list/components/delete-quiz-button';
import { PageHeader } from '@/shared/components/page-header/page-header';
import { QueryStateHandler } from '@/shared/components/query-state-handler/query-state-handler';
import { StateMessage } from '@/shared/components/state-message/state-message';
import { AppRoutes } from '@/shared/constants/app-routes.constant';
import { UiButton } from '@/shared/ui/ui-button/ui-button';
import { UiIcon } from '@/shared/ui/ui-icon/ui-icon';

export function QuizListScreen() {
  const quizzesQuery = useQuizzes();

  return (
    <div className="flex flex-col gap-6">
      <PageHeader title="Quizzes" description="All quizzes you have created" />

      <QueryStateHandler
        query={quizzesQuery}
        isEmpty={(quizzes) => quizzes.length === 0}
        emptyState={
          <StateMessage
            icon="ClipboardList"
            title="No quizzes yet"
            description="Create your first quiz and it will show up here."
          >
            <UiButton asChild variant="primary" size="sm">
              <Link href={AppRoutes.CreateQuiz}>
                <UiIcon name="Plus" aria-hidden />
                Create quiz
              </Link>
            </UiButton>
          </StateMessage>
        }
      >
        {(quizzes) => (
          <ul className="flex flex-col gap-3">
            {quizzes.map((quiz) => (
              <li key={quiz.id}>
                <QuizCard
                  quiz={quiz}
                  action={<DeleteQuizButton quiz={quiz} />}
                />
              </li>
            ))}
          </ul>
        )}
      </QueryStateHandler>
    </div>
  );
}
