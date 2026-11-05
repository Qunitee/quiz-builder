'use client';

import { useState } from 'react';
import { useDeleteQuiz } from '@/entities/quiz/quiz.hook';
import type { QuizSummary } from '@/entities/quiz/models/quiz.model';
import { ConfirmDialog } from '@/shared/components/confirm-dialog/confirm-dialog';
import { UiIconButton } from '@/shared/ui/ui-icon-button/ui-icon-button';
import { getErrorMessage } from '@/shared/utils/get-error-message.util';

interface DeleteQuizButtonProps {
  quiz: QuizSummary;
}

export function DeleteQuizButton({ quiz }: DeleteQuizButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const deleteQuiz = useDeleteQuiz();

  const handleOpenChange = (open: boolean) => {
    if (deleteQuiz.isPending) return;
    deleteQuiz.reset();
    setIsOpen(open);
  };

  return (
    <ConfirmDialog
      open={isOpen}
      trigger={
        <UiIconButton
          name="Trash"
          label={`Delete quiz "${quiz.title}"`}
          variant="destructive-soft"
          size="sm"
        />
      }
      title="Delete quiz?"
      description={`"${quiz.title}" and all its questions will be permanently deleted.`}
      confirmLabel={deleteQuiz.isPending ? 'Deleting…' : 'Delete'}
      isPending={deleteQuiz.isPending}
      errorMessage={
        deleteQuiz.isError ? getErrorMessage(deleteQuiz.error) : undefined
      }
      onConfirm={() => deleteQuiz.mutate(quiz.id)}
      onOpenChange={handleOpenChange}
    />
  );
}
