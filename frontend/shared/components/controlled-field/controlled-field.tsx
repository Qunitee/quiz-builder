'use client';

import { Controller, type FieldValues } from 'react-hook-form';
import { FieldError } from '@/shared/ui/ui-field/field';
import { UiLabel } from '@/shared/ui/ui-label/ui-label';
import type {
  ControlledFieldProps,
  FieldComponentProps,
} from '@/shared/components/controlled-field/controlled-field-props';

export function ControlledField<
  T extends FieldValues,
  P extends FieldComponentProps,
>({
  name,
  control,
  label,
  deps,
  component: Component,
  ...rest
}: ControlledFieldProps<T, P>) {
  return (
    <Controller
      control={control}
      name={name}
      rules={{ deps }}
      render={({ field, fieldState }) => (
        <div className="flex flex-col gap-1.5">
          {label && <UiLabel htmlFor={name}>{label}</UiLabel>}
          <Component
            {...(rest as unknown as P)}
            ref={field.ref}
            id={name}
            value={field.value ?? ''}
            onChange={field.onChange}
            onBlur={field.onBlur}
            aria-invalid={!!fieldState.error}
          />
          <FieldError>{fieldState.error?.message}</FieldError>
        </div>
      )}
    />
  );
}
