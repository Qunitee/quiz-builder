'use client';

import type { ReactNode } from 'react';
import { UiButton } from '@/shared/ui/ui-button/ui-button';
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  UiDialog,
} from '@/shared/ui/ui-dialog/ui-dialog';
import { FieldError } from '@/shared/ui/ui-field/field';

interface ConfirmDialogProps {
  open: boolean;
  trigger: ReactNode;
  title: string;
  description: ReactNode;
  confirmLabel: string;
  isPending?: boolean;
  errorMessage?: string;
  onConfirm: () => void;
  onOpenChange: (open: boolean) => void;
}

export function ConfirmDialog({
  open,
  trigger,
  title,
  description,
  confirmLabel,
  isPending = false,
  errorMessage,
  onConfirm,
  onOpenChange,
}: ConfirmDialogProps) {
  return (
    <UiDialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription className="wrap-anywhere">
            {description}
          </DialogDescription>
        </DialogHeader>
        <FieldError>{errorMessage}</FieldError>
        <DialogFooter>
          <DialogClose asChild>
            <UiButton
              type="button"
              variant="outline"
              size="sm"
              disabled={isPending}
            >
              Cancel
            </UiButton>
          </DialogClose>
          <UiButton
            type="button"
            variant="destructive"
            size="sm"
            disabled={isPending}
            onClick={onConfirm}
          >
            {confirmLabel}
          </UiButton>
        </DialogFooter>
      </DialogContent>
    </UiDialog>
  );
}
