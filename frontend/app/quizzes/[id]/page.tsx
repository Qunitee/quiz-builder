'use client';

import { useParams } from 'next/navigation';

export default function QuizDetailsPage() {
  const { id } = useParams<{ id: string }>();

  // TODO: fetch GET /quizzes/:id (useEffect + apiRequest), render questions read-only
  return <h1 className="text-2xl font-semibold">Quiz {id}</h1>;
}
