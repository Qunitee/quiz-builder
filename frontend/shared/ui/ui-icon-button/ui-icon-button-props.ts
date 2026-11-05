import type * as React from 'react';
import type { DefaultComponentProps } from '@/shared/models/default-components-props';
import type { UiVariant } from '@/shared/models/ui-variant.model';
import type { IconName } from '@/shared/ui/ui-icon/ui-icon';

export interface IconButtonProps
  extends
    Omit<React.ComponentProps<'button'>, 'children'>,
    DefaultComponentProps {
  name: IconName;
  variant?: UiVariant;
  asChild?: boolean;
  /** Accessible name, since the button has no visible text */
  label: string;
}
