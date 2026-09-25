import { Typography, type SxProps, type Theme } from '@mui/material';
import type { ReactNode } from 'react';

interface SectionLabelProps {
  children: ReactNode;
  sx?: SxProps<Theme>;
}

export function SectionLabel({ children, sx }: SectionLabelProps) {
  return (
    <Typography
      component="span"
      sx={{
        display: 'inline-flex',
        width: 'fit-content',
        color: '#ff5805',
        fontSize: { xs: 14, md: 16 },
        fontWeight: 900,
        letterSpacing: 0,
        lineHeight: 1.2,
        textTransform: 'uppercase',
        ...sx,
      }}
    >
      {children}
    </Typography>
  );
}
