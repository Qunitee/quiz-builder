import { QuizDetailsScreen } from '@/features/quiz-details/quiz-details-screen';

export default async function QuizDetailsPage({
  params,
}: PageProps<'/quizzes/[id]'>) {
  const { id } = await params;

  return <QuizDetailsScreen id={id} />;
}
