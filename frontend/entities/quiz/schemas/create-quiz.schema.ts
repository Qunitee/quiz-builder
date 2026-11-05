import { z } from 'zod';
import { QuizLimits } from '@/entities/quiz/constants/quiz-limits.constant';
import { AnswerType } from '@/entities/quiz/models/quiz.model';

export const BooleanAnswers = ['True', 'False'] as const;

type OptionValues = { text: string; isCorrect: boolean };

const countCorrect = (options: OptionValues[]) =>
  options.filter((option) => option.isCorrect).length;

const hasUniqueTexts = (options: OptionValues[]) => {
  const texts = options
    .map((option) => option.text.toLowerCase())
    .filter(Boolean);
  return new Set(texts).size === texts.length;
};

const optionSchema = z.object({
  text: z
    .string()
    .trim()
    .min(1, 'Option text is required')
    .max(
      QuizLimits.maxTextLength,
      `Option text is too long (max ${QuizLimits.maxTextLength})`,
    ),
  isCorrect: z.boolean(),
});

const optionListSchema = z
  .array(optionSchema)
  .max(
    QuizLimits.maxOptions,
    `Too many options (max ${QuizLimits.maxOptions})`,
  );

const questionTextSchema = z
  .string()
  .trim()
  .min(1, 'Question text is required')
  .max(
    QuizLimits.maxTextLength,
    `Question text is too long (max ${QuizLimits.maxTextLength})`,
  );

const booleanQuestionSchema = z.object({
  text: questionTextSchema,
  answerType: z.literal(AnswerType.Boolean),
  options: z
    .array(optionSchema.extend({ text: z.enum(BooleanAnswers) }))
    .length(BooleanAnswers.length)
    .refine((options) => countCorrect(options) === 1, {
      message: 'Select the correct answer',
    }),
});

const inputQuestionSchema = z.object({
  text: questionTextSchema,
  answerType: z.literal(AnswerType.Input),
  options: optionListSchema
    .min(QuizLimits.minInputOptions, 'Add at least one accepted answer')
    .refine(hasUniqueTexts, { message: 'Answers must be unique' })
    .refine((options) => options.every((option) => option.isCorrect), {
      message: 'All answers must be correct',
    }),
});

const checkboxQuestionSchema = z.object({
  text: questionTextSchema,
  answerType: z.literal(AnswerType.Checkbox),
  options: optionListSchema
    .min(
      QuizLimits.minCheckboxOptions,
      `Add at least ${QuizLimits.minCheckboxOptions} options`,
    )
    .refine(hasUniqueTexts, { message: 'Options must be unique' })
    .refine((options) => countCorrect(options) >= 1, {
      message: 'Mark at least one option as correct',
    }),
});

const questionSchema = z.discriminatedUnion('answerType', [
  booleanQuestionSchema,
  inputQuestionSchema,
  checkboxQuestionSchema,
]);

export const createQuizSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, 'Quiz title is required')
    .max(
      QuizLimits.maxTitleLength,
      `Quiz title is too long (max ${QuizLimits.maxTitleLength})`,
    ),
  questions: z
    .array(questionSchema)
    .min(1, 'Add at least one question')
    .max(
      QuizLimits.maxQuestions,
      `Too many questions (max ${QuizLimits.maxQuestions})`,
    ),
});

export type CreateQuizDto = z.infer<typeof createQuizSchema>;
export type CreateQuestionDto = CreateQuizDto['questions'][number];
