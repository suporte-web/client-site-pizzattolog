import type { SxProps, Theme } from '@mui/material';
import type { ReactNode } from 'react';

interface SectionLabelProps {
  children: ReactNode;
  sx?: SxProps<Theme>;
}

// Page and section headings already identify their content.
export function SectionLabel(_props: SectionLabelProps) {
  return null;
}
