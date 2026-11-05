'use client';

import * as React from 'react';
import { RadioGroup as RadioGroupPrimitive } from 'radix-ui';
import { UiIcon, type IconName } from '@/shared/ui/ui-icon/ui-icon';
import { cn } from '@/shared/utils/utils';

export interface UiSegmentedOption<T extends string> {
  value: T;
  label: string;
  icon?: IconName;
}

interface UiSegmentedControlProps<T extends string> extends Omit<
  React.ComponentProps<typeof RadioGroupPrimitive.Root>,
  'value' | 'defaultValue' | 'onValueChange' | 'children'
> {
  value: T;
  options: readonly UiSegmentedOption<T>[];
  onValueChange: (value: T) => void;
}

export function UiSegmentedControl<T extends string>({
  value,
  options,
  onValueChange,
  className,
  ...props
}: UiSegmentedControlProps<T>) {
  return (
    <RadioGroupPrimitive.Root
      data-slot="segmented-control"
      value={value}
      onValueChange={(next) => onValueChange(next as T)}
      className={cn(
        'grid auto-cols-fr grid-flow-col gap-1 rounded-lg bg-muted p-1',
        className,
      )}
      {...props}
    >
      {options.map((option) => (
        <RadioGroupPrimitive.Item
          key={option.value}
          value={option.value}
          data-slot="segmented-control-item"
          className={cn(
            'flex min-w-0 flex-col items-center justify-center gap-1 rounded-md px-1 py-1.5 text-xs font-medium sm:flex-row sm:gap-2 sm:px-2 sm:text-sm',
            'cursor-pointer text-muted-foreground outline-none transition-colors hover:text-foreground',
            'focus-visible:ring-3 focus-visible:ring-ring/50',
            'data-[state=checked]:bg-card data-[state=checked]:text-foreground data-[state=checked]:shadow-sm',
          )}
        >
          {option.icon && <UiIcon name={option.icon} aria-hidden />}
          <span className="max-w-full truncate">{option.label}</span>
        </RadioGroupPrimitive.Item>
      ))}
    </RadioGroupPrimitive.Root>
  );
}
