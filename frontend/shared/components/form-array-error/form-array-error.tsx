'use client';

import {
  get,
  useFormState,
  type Control,
  type FieldValues,
  type Path,
} from 'react-hook-form';
import { FieldError } from '@/shared/ui/ui-field/field';

interface FormArrayErrorProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
}

interface ArrayError {
  message?: string;
  root?: { message?: string };
}

export function FormArrayError<T extends FieldValues>({
  name,
  control,
}: FormArrayErrorProps<T>) {
  const { errors } = useFormState({ control, name });
  const error = get(errors, name) as ArrayError | undefined;

  return <FieldError>{error?.root?.message ?? error?.message}</FieldError>;
}
