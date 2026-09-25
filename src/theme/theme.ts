'use client';

import { createTheme } from '@mui/material/styles';

export interface SiteAppearance {
  primary: string;
  primaryDark: string;
  secondary: string;
  success: string;
  background: string;
  paper: string;
  textPrimary: string;
  textSecondary: string;
}

export const appearanceStorageKey = 'pizzattolog-admin-aparencia';

export const defaultAppearance: SiteAppearance = {
  primary: '#17456B',
  primaryDark: '#092B43',
  secondary: '#FF6319',
  success: '#2E7D61',
  background: '#F4F7F7',
  paper: '#FFFFFF',
  textPrimary: '#17212B',
  textSecondary: '#596673',
};

export function createAppTheme(appearance: Partial<SiteAppearance> = {}) {
  const colors = { ...defaultAppearance, ...appearance };

  return createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: colors.primary,
      dark: colors.primaryDark,
      light: '#3D789A',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: colors.secondary,
      dark: '#D94F10',
      light: '#FF8C5A',
      contrastText: '#FFFFFF',
    },
    success: {
      main: colors.success,
    },
    warning: {
      main: '#DCA11D',
    },
    info: {
      main: '#4D7899',
    },
    background: {
      default: colors.background,
      paper: colors.paper,
    },
    text: {
      primary: colors.textPrimary,
      secondary: colors.textSecondary,
    },
  },
  typography: {
    fontFamily:
      'Roboto, Arial, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    fontSize: 16,
    h1: { fontWeight: 850, letterSpacing: 0 },
    h2: { fontWeight: 820, letterSpacing: 0 },
    h3: { fontWeight: 700 },
    body1: { fontSize: 16 },
    body2: { fontSize: 14 },
    button: { textTransform: 'none', fontWeight: 700 },
  },
  shape: {
    borderRadius: 4,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        html: {
          scrollBehavior: 'smooth',
        },
        body: {
          minWidth: 320,
          fontFamily:
            'Roboto, Arial, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
          fontSize: 16,
        },
        a: {
          color: 'inherit',
          textDecoration: 'none',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          minHeight: 44,
          borderRadius: 8,
          boxShadow: 'none',
          paddingInline: 20,
          transition: 'background-color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease',
          '&:hover': {
            boxShadow: '0 10px 22px rgba(23, 69, 107, 0.16)',
            transform: 'translateY(-1px)',
          },
        },
      },
      variants: [
        {
          props: { variant: 'contained', color: 'secondary' },
          style: {
            color: '#FFFFFF',
            backgroundColor: '#FF6319',
            padding: '15px 25px',
            boxShadow: 'none',
            '&:hover': {
              backgroundColor: '#D94F10',
              boxShadow: '0 12px 24px rgba(255, 99, 25, 0.34)',
            },
          },
        },
      ],
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          border: '1px solid rgba(15, 23, 42, 0.06)',
          boxShadow: '0 18px 46px rgba(19, 39, 57, 0.08)',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          fontWeight: 700,
        },
      },
    },
  },
});
}

export const theme = createAppTheme();
