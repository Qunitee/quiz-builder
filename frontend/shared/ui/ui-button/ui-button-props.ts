import type { UiVariant } from '@/shared/models/ui-variant.model';
import type { DefaultComponentProps } from '@/shared/models/default-components-props';

export interface UiButtonProps
  extends React.ComponentProps<'button'>, DefaultComponentProps {
  variant?: UiVariant;
  asChild?: boolean;
  disabled?: boolean;
  isRoundedFull?: boolean;
}
