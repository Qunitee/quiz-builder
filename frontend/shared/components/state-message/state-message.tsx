'use client';

import type { ReactNode } from 'react';
import { type IconName, UiIcon } from '@/shared/ui/ui-icon/ui-icon';

interface StateMessageProps {
  icon: IconName;
  title: string;
  description?: string;
  children?: ReactNode;
}

export function StateMessage({
  icon,
  title,
  description,
  children,
}: StateMessageProps) {
  return (
    <div className="flex flex-col items-center gap-3 px-4 py-16 text-center">
      <span className="flex size-14 items-center justify-center rounded-full bg-accent-soft text-accent-soft-fg">
        <UiIcon name={icon} size="xl" aria-hidden />
      </span>
      <div className="flex flex-col gap-1">
        <h2 className="text-lg font-medium">{title}</h2>
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
      </div>
      {children}
    </div>
  );
}
