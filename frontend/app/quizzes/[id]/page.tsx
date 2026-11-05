export default async function QuizDetailsPage({
  params,
}: PageProps<'/quizzes/[id]'>) {
  const { id } = await params;

  // TODO: fetch GET /quizzes/:id, render questions read-only
  return <h1 className="text-2xl font-semibold">Quiz {id}</h1>;
}
