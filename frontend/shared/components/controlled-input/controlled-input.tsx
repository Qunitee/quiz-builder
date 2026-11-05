'use client';

import type { FieldValues } from 'react-hook-form';
import { ControlledField } from '@/shared/components/controlled-field/controlled-field';
import type { ControlledFieldProps } from '@/shared/components/controlled-field/controlled-field-props';
import { UiInput } from '@/shared/ui/ui-input/input';
import type { UiInputProps } from '@/shared/ui/ui-input/ui-input-props';

export function ControlledInput<T extends FieldValues>(
  props: Omit<ControlledFieldProps<T, UiInputProps>, 'component'>,
) {
  return <ControlledField {...props} component={UiInput} />;
}
