'use client';

import { CssBaseline, ThemeProvider } from '@mui/material';
import type { ReactNode } from 'react';
import { useEffect, useMemo, useState } from 'react';
import {
  appearanceStorageKey,
  createAppTheme,
  type SiteAppearance,
} from '@/theme/theme';

export function Providers({ children }: { children: ReactNode }) {
  const [appearance, setAppearance] = useState<Partial<SiteAppearance>>({});
  const theme = useMemo(() => createAppTheme(appearance), [appearance]);

  useEffect(() => {
    function loadAppearance() {
      const storedAppearance = window.localStorage.getItem(appearanceStorageKey);
      if (!storedAppearance) {
        setAppearance({});
        return;
      }

      try {
        setAppearance(JSON.parse(storedAppearance) as Partial<SiteAppearance>);
      } catch {
        setAppearance({});
      }
    }

    loadAppearance();
    window.addEventListener('storage', loadAppearance);
    window.addEventListener('pizzattolog-theme-updated', loadAppearance);

    return () => {
      window.removeEventListener('storage', loadAppearance);
      window.removeEventListener('pizzattolog-theme-updated', loadAppearance);
    };
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
