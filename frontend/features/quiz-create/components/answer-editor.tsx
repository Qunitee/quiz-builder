'use client';

import { QuizLimits } from '@/entities/quiz/constants/quiz-limits.constant';
import { AnswerType } from '@/entities/quiz/models/quiz.model';
import { BooleanAnswerEditor } from '@/features/quiz-create/components/boolean-answer-editor';
import { OptionsEditor } from '@/features/quiz-create/components/options-editor';

interface AnswerEditorProps {
  answerType: AnswerType;
  questionIndex: number;
}

export function AnswerEditor({ answerType, questionIndex }: AnswerEditorProps) {
  switch (answerType) {
    case AnswerType.Boolean:
      return <BooleanAnswerEditor questionIndex={questionIndex} />;
    case AnswerType.Input:
      return (
        <OptionsEditor
          questionIndex={questionIndex}
          minOptions={QuizLimits.minInputOptions}
          hint="Each answer listed here is accepted as correct."
          optionLabel="Answer"
          addLabel="Add accepted answer"
        />
      );
    case AnswerType.Checkbox:
      return (
        <OptionsEditor
          questionIndex={questionIndex}
          minOptions={QuizLimits.minCheckboxOptions}
          hint="Tick every option that is correct."
          optionLabel="Option"
          addLabel="Add option"
          canMarkCorrect
        />
      );
  }
}
