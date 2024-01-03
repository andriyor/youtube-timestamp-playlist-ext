import React from 'react';
import { Box, Card, CardContent, createTheme, ThemeProvider } from '@mui/material';

import { App } from './App';

export const AppWrapper = () => {
  const theme = createTheme({
    typography: {
      fontSize: 22,
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ mt: 2 }}>
        <Card>
          <CardContent>
            <App />
          </CardContent>
        </Card>
      </Box>
    </ThemeProvider>
  );
};
