import { Box } from '@mui/material';

export function NumbersBackground() {
  return (
    <Box
      aria-hidden="true"
      sx={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        opacity: 0.9,
        backgroundImage:
          'linear-gradient(135deg, transparent 0 22%, rgba(242,63,53,0.65) 22.2%, transparent 22.6%), linear-gradient(35deg, transparent 0 55%, rgba(222,27,48,0.5) 55.2%, transparent 55.8%)',
        backgroundSize: '420px 260px, 520px 340px',
        animation: 'numbersBackground 24s linear infinite',
        '@keyframes numbersBackground': {
          from: { backgroundPosition: '0 0, 0 0' },
          to: { backgroundPosition: '420px 260px, -520px 340px' },
        },
        '@media (prefers-reduced-motion: reduce)': { animation: 'none' },
      }}
    />
  );
}
