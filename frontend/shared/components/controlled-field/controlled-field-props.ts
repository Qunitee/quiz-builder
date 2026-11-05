import type { Control, FieldValues, Path } from 'react-hook-form';
import type {
  AriaAttributes,
  ComponentType,
  FocusEventHandler,
  Ref,
} from 'react';

export interface FieldComponentProps {
  value: string;
  onChange?: (value: string) => void;
  onBlur?: FocusEventHandler<HTMLInputElement>;
  ref?: Ref<HTMLInputElement>;
  'aria-invalid'?: AriaAttributes['aria-invalid'];
  id?: string;
}

export type ControlledFieldProps<
  T extends FieldValues,
  P extends FieldComponentProps,
> = {
  name: Path<T>;
  control: Control<T>;
  label?: string;
  deps?: Path<T>[];
  component: ComponentType<P>;
} & Omit<P, keyof FieldComponentProps>;
