import { QuizForm } from '@/features/quiz-create/components/quiz-form';
import { PageHeader } from '@/shared/components/page-header/page-header';

export function QuizCreateScreen() {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Create quiz"
        description="Add a title and at least one question"
      />
      <QuizForm />
    </div>
  );
}
