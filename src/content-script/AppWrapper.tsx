import React from 'react';
import { Card, CardContent, createTheme, ThemeProvider } from '@mui/material';

import { App } from './App';

export const AppWrapper = () => {
  const theme = createTheme({
    typography: {
      fontSize: 22,
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Card>
        <CardContent>
          <App />
        </CardContent>
      </Card>
    </ThemeProvider>
  );
};
