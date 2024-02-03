import React from 'react';
import { Box, Card, CardContent, createTheme, ThemeProvider } from '@mui/material';

import { App } from './App';

export const AppWrapper = () => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  const isDarkTheme = [...document.querySelector('ytd-playlist-panel-renderer').attributes]
    .map((node: Attr) => node.name)
    .includes('is-dark-theme');

  const theme = createTheme({
    palette: {
      mode: isDarkTheme ? 'dark' : 'light',
    },
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
