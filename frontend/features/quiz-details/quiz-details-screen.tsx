'use client';

import Link from 'next/link';
import { useQuiz } from '@/entities/quiz/quiz.hook';
import { QuestionView } from '@/entities/quiz/ui/question-view/question-view';
import { formatQuestionCount } from '@/entities/quiz/utils/format-question-count.util';
import { PageHeader } from '@/shared/components/page-header/page-header';
import { QueryStateHandler } from '@/shared/components/query-state-handler/query-state-handler';
import { StateMessage } from '@/shared/components/state-message/state-message';
import { AppRoutes } from '@/shared/constants/app-routes.constant';
import { ApiError } from '@/shared/services/api-client/api-client';
import { UiButton } from '@/shared/ui/ui-button/ui-button';
import { UiIcon } from '@/shared/ui/ui-icon/ui-icon';

const MissingQuizStatuses = [400, 404];

function isMissingQuiz(error: unknown) {
  return (
    error instanceof ApiError && MissingQuizStatuses.includes(error.status)
  );
}

export function QuizDetailsScreen({ id }: { id: string }) {
  const quizQuery = useQuiz(id);

  return (
    <div className="flex flex-col gap-6">
      <UiButton asChild variant="link" size="sm" className="self-start">
        <Link href={AppRoutes.Quizzes}>
          <UiIcon name="ArrowLeft" aria-hidden />
          All quizzes
        </Link>
      </UiButton>

      {isMissingQuiz(quizQuery.error) ? (
        <StateMessage
          icon="SearchX"
          title="Quiz not found"
          description="It may have been deleted, or the link is incorrect."
        />
      ) : (
        <QueryStateHandler query={quizQuery}>
          {(quiz) => (
            <>
              <PageHeader
                title={quiz.title}
                description={formatQuestionCount(quiz.questions.length)}
              />
              <ol className="flex flex-col gap-3">
                {quiz.questions.map((question, index) => (
                  <li key={question.id}>
                    <QuestionView question={question} position={index + 1} />
                  </li>
                ))}
              </ol>
            </>
          )}
        </QueryStateHandler>
      )}
    </div>
  );
}
