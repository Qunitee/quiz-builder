'use client';

import type { ComponentProps } from 'react';
import {
  useController,
  type Control,
  type FieldValues,
  type Path,
} from 'react-hook-form';
import { UiCheckbox } from '@/shared/ui/ui-checkbox/ui-checkbox';

interface ControlledCheckboxProps<T extends FieldValues> extends Omit<
  ComponentProps<typeof UiCheckbox>,
  'name' | 'checked' | 'onCheckedChange'
> {
  name: Path<T>;
  control: Control<T>;
  deps?: Path<T>[];
}

export function ControlledCheckbox<T extends FieldValues>({
  name,
  control,
  deps,
  ...props
}: ControlledCheckboxProps<T>) {
  const {
    field: { ref, value, onChange, onBlur },
    fieldState,
  } = useController({ name, control, rules: { deps } });

  return (
    <UiCheckbox
      {...props}
      ref={ref}
      id={name}
      checked={!!value}
      onCheckedChange={(checked) => onChange(checked === true)}
      onBlur={onBlur}
      aria-invalid={fieldState.invalid}
    />
  );
}
