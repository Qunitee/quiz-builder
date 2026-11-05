import { QuizLimits } from '@/entities/quiz/constants/quiz-limits.constant';
import { AnswerType } from '@/entities/quiz/models/quiz.model';
import {
  BooleanAnswers,
  type CreateQuestionDto,
} from '@/entities/quiz/schemas/create-quiz.schema';

function createBlankOptions(count: number, isCorrect: boolean) {
  return Array.from({ length: count }, () => ({ text: '', isCorrect }));
}

export function createQuestion(
  answerType: AnswerType,
  text = '',
): CreateQuestionDto {
  switch (answerType) {
    case AnswerType.Boolean:
      return {
        answerType,
        text,
        options: BooleanAnswers.map((answer) => ({
          text: answer,
          isCorrect: false,
        })),
      };
    case AnswerType.Input:
      return {
        answerType,
        text,
        options: createBlankOptions(QuizLimits.minInputOptions, true),
      };
    case AnswerType.Checkbox:
      return {
        answerType,
        text,
        options: createBlankOptions(QuizLimits.minCheckboxOptions, false),
      };
  }
}
