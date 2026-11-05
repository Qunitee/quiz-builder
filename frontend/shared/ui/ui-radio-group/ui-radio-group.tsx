'use client';

import * as React from 'react';
import { RadioGroup as RadioGroupPrimitive } from 'radix-ui';
import { cn } from '@/shared/utils/utils';
import './styles/ui-radio-group.scss';

function UiRadioGroup({
  className,
  ...props
}: React.ComponentProps<typeof RadioGroupPrimitive.Root>) {
  return (
    <RadioGroupPrimitive.Root
      data-slot="radio-group"
      className={cn('grid gap-3', className)}
      {...props}
    />
  );
}

function UiRadioGroupItem({
  className,
  ...props
}: React.ComponentProps<typeof RadioGroupPrimitive.Item>) {
  return (
    <RadioGroupPrimitive.Item
      data-slot="radio-group-item"
      className={cn('peer radio-group-item', className)}
      {...props}
    >
      <RadioGroupPrimitive.Indicator
        data-slot="radio-group-indicator"
        className="flex items-center justify-center"
      >
        <span className="size-2 rounded-full bg-primary" />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  );
}

export { UiRadioGroup, UiRadioGroupItem };
