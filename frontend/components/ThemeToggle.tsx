'use client';

import { useThemeStore } from '@/shared/store/theme-store/theme-store';
import { UiIconButton } from '@/shared/ui/ui-icon-button/ui-icon-button';

export function ThemeToggle() {
  const theme = useThemeStore((s) => s.theme);
  const toggleTheme = useThemeStore((s) => s.toggleTheme);
  const isDark = theme === 'dark';

  return (
    <UiIconButton
      name={isDark ? 'Sun' : 'Moon'}
      label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      size="sm"
      onClick={toggleTheme}
    />
  );
}
