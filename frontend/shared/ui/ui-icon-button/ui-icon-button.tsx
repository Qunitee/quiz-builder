'use client';

import { Slot } from 'radix-ui';
import { cn } from '@/shared/utils/utils';
import { UiIcon } from '@/shared/ui/ui-icon/ui-icon';
import type { IconButtonProps } from '@/shared/ui/ui-icon-button/ui-icon-button-props';
import '@/shared/ui/ui-button/styles/ui-button.scss';

export function UiIconButton({
  name,
  label,
  size = 'default',
  variant = 'ghost',
  className,
  asChild = false,
  type,
  ...props
}: IconButtonProps) {
  const Comp = asChild ? Slot.Root : 'button';

  return (
    <Comp
      type={asChild ? undefined : (type ?? 'button')}
      aria-label={label}
      title={label}
      data-slot="icon-button"
      data-variant={variant}
      data-size={size}
      className={cn(
        'button',
        `button--${variant}`,
        `button--size-${size}`,
        'aspect-square px-0',
        className,
      )}
      {...props}
    >
      <UiIcon aria-hidden name={name} size={size} />
    </Comp>
  );
}
