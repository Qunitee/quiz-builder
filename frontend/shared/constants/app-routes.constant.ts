export const AppRoutes = {
  Quizzes: '/quizzes',
  CreateQuiz: '/create',
  QuizDetails: (id: string) => `/quizzes/${id}`,
} as const;
