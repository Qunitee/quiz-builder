import type { UiVariant } from '@/shared/models/ui-variant.model';
import type { DefaultComponentProps } from '@/shared/models/default-components-props';

export interface UiBadgeProps extends DefaultComponentProps {
  variant?: UiVariant;
  children?: React.ReactNode;
}
