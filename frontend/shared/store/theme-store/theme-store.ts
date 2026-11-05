import { create } from 'zustand/react';
import { Theme } from '@/shared/models/theme-type';
import { localStorageService } from '@/shared/services/local-storage-service/local-storage.service';
import { ThemeKey } from '@/shared/constants/local-storage-constants';

interface ThemeState {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  setThemeSilent: (theme: Theme) => void;
  toggleTheme: () => void;
}

// Start with the light theme on both server and client to keep hydration
// consistent; the stored theme is applied after mount in useApplyTheme.
export const useThemeStore = create<ThemeState>((set, get) => ({
  theme: Theme.Light,
  setTheme: (theme) => {
    localStorageService.setItem(ThemeKey, theme);
    set({ theme });
  },
  setThemeSilent: (theme) => set({ theme }),
  toggleTheme: () => {
    const next = get().theme === Theme.Light ? Theme.Dark : Theme.Light;
    localStorageService.setItem(ThemeKey, next);
    set({ theme: next });
  },
}));
