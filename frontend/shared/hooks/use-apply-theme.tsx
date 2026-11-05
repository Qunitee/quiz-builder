'use client';

import { useEffect } from 'react';
import { useThemeStore } from '@/shared/store/theme-store/theme-store';
import { localStorageService } from '@/shared/services/local-storage-service/local-storage.service';
import type { Theme } from '@/shared/models/theme-type';
import { ThemeKey } from '@/shared/constants/local-storage-constants';

export function useApplyTheme() {
  const theme = useThemeStore((s) => s.theme);
  const setThemeSilent = useThemeStore((s) => s.setThemeSilent);

  useEffect(() => {
    const stored = localStorageService.getItem<Theme>(ThemeKey);
    if (stored) setThemeSilent(stored);
  }, [setThemeSilent]);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  useEffect(() => {
    return localStorageService.subscribe<Theme>(ThemeKey, (value) => {
      if (value) setThemeSilent(value);
    });
  }, [setThemeSilent]);
}
