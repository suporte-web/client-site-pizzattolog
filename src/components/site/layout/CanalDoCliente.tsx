'use client';

import { Button } from '@mui/material';

export function CanalDoCliente() {
  return (
    <Button
      component="a"
      href="/canal-do-cliente"
      sx={{
        justifyContent: 'flex-start',
        color: 'rgba(255,255,255,0.68)',
        minHeight: 28,
        px: 0,
        '&:hover': { color: 'white', bgcolor: 'transparent' },
      }}
    >
      Canal do Cliente
    </Button>
  );
}
