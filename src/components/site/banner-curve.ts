const wave = encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 100" preserveAspectRatio="none"><path fill="white" d="M0 78C180 68 275 0 535 0S1010 100 1210 100H1440V100H0Z"/></svg>',
);

export const bannerCurveSx = {
  position: 'relative',
  // Keep content above the highest point of the decorative wave.
  '& > .MuiContainer-root': {
    marginBottom: { xs: '66px', sm: '88px', md: '114px' },
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    left: 0,
    bottom: -1,
    width: '100%',
    height: { xs: 42, sm: 64, md: 90 },
    backgroundImage: `url("data:image/svg+xml,${wave}")`,
    backgroundSize: '100% 100%',
    backgroundRepeat: 'no-repeat',
    pointerEvents: 'none',
    zIndex: 3,
  },
} as const;
