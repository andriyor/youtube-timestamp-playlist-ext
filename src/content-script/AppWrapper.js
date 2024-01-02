import React from 'react';
import { createTheme, ThemeProvider, Typography } from '@mui/material';
import { App } from './App';

export const AppWrapper = () => {
  const theme = createTheme({
    typography: {
      fontSize: 22,
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  );
};
