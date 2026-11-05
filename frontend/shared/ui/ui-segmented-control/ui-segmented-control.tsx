'use client';

import * as React from 'react';
import { RadioGroup as RadioGroupPrimitive } from 'radix-ui';
import { UiIcon, type IconName } from '@/shared/ui/ui-icon/ui-icon';
import { cn } from '@/shared/utils/utils';
import './styles/ui-segmented-control.scss';

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
      className={cn('segmented-control', className)}
      {...props}
    >
      {options.map((option) => (
        <RadioGroupPrimitive.Item
          key={option.value}
          value={option.value}
          data-slot="segmented-control-item"
          className="segmented-control-item"
        >
          {option.icon && <UiIcon name={option.icon} aria-hidden />}
          <span className="max-w-full truncate">{option.label}</span>
        </RadioGroupPrimitive.Item>
      ))}
    </RadioGroupPrimitive.Root>
  );
}
