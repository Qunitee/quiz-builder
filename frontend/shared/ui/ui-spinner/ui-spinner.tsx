'use client';

import { UiIcon } from '@/shared/ui/ui-icon/ui-icon';
import type { DefaultComponentProps } from '@/shared/models/default-components-props';
import { cn } from '@/shared/utils/utils';

export function UiSpinner({ className, size = 'xl' }: DefaultComponentProps) {
  return (
    <UiIcon
      name="LoaderCircle"
      size={size}
      role="status"
      aria-label="Loading"
      className={cn('animate-spin text-muted-foreground', className)}
    />
  );
}
