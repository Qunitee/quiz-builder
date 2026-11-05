import { z } from 'zod';
import { AnswerType } from '../../generated/prisma/enums';

const LIMITS = {
  title: 200,
  text: 500,
  questions: 50,
  options: 10,
} as const;

const optionSchema = z.object({
  text: z
    .string()
    .trim()
    .min(1, 'Option text is required')
    .max(LIMITS.text, `Option text is too long (max ${LIMITS.text})`),
  isCorrect: z.boolean(),
});

const booleanOptionSchema = optionSchema.extend({
  text: z.enum(['True', 'False']),
});

const countCorrect = (opts: { isCorrect: boolean }[]) =>
  opts.filter((o) => o.isCorrect).length;

// сравнение без учёта регистра: "Cat" и "cat" считаем дубликатами
const hasUniqueTexts = (opts: { text: string }[]) =>
  new Set(opts.map((o) => o.text.toLowerCase())).size === opts.length;

const questionText = z
  .string()
  .trim()
  .min(1, 'Question text is required')
  .max(LIMITS.text, `Question text is too long (max ${LIMITS.text})`);

const booleanQuestion = z.object({
  text: questionText,
  answerType: z.literal(AnswerType.BOOLEAN),
  options: z
    .array(booleanOptionSchema)
    .length(2, 'BOOLEAN question must have exactly 2 options')
    .refine(hasUniqueTexts, { message: 'BOOLEAN options must be different' })
    .refine((opts) => countCorrect(opts) === 1, {
      message: 'BOOLEAN question must have exactly one correct option',
    }),
});

const inputQuestion = z.object({
  text: questionText,
  answerType: z.literal(AnswerType.INPUT),
  options: z
    .array(optionSchema)
    .min(1, 'INPUT question needs at least 1 option')
    .max(LIMITS.options, `Too many options (max ${LIMITS.options})`)
    .refine(hasUniqueTexts, { message: 'Options must be unique' })
    .refine((opts) => opts.every((o) => o.isCorrect), {
      message: 'All INPUT options must be correct',
    }),
});

const checkboxQuestion = z.object({
  text: questionText,
  answerType: z.literal(AnswerType.CHECKBOX),
  options: z
    .array(optionSchema)
    .min(2, 'CHECKBOX question needs at least 2 options')
    .max(LIMITS.options, `Too many options (max ${LIMITS.options})`)
    .refine(hasUniqueTexts, { message: 'Options must be unique' })
    .refine((opts) => countCorrect(opts) >= 1, {
      message: 'CHECKBOX question needs at least one correct option',
    }),
});

const questionSchema = z.discriminatedUnion('answerType', [
  booleanQuestion,
  inputQuestion,
  checkboxQuestion,
]);

export const createQuizSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, 'Title is required')
    .max(LIMITS.title, `Title is too long (max ${LIMITS.title})`),
  questions: z
    .array(questionSchema)
    .min(1, 'At least one question is required')
    .max(LIMITS.questions, `Too many questions (max ${LIMITS.questions})`),
});

export type CreateQuizDto = z.infer<typeof createQuizSchema>;
