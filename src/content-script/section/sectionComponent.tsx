import React from 'react';
import { Box, Button, Card, CardContent } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

import { SectionForm } from './sectionForm';
import { SectionListComponent } from './sectionListComponent';
import { useViewStore } from '../../store/useView';

export const SectionComponent = () => {
  const { setView } = useViewStore((state) => state);

  const handleBackToPlaylist = () => setView('playlist');

  return (
    <div>
      <Box sx={{ mb: 2 }}>
        <Button onClick={handleBackToPlaylist} variant="outlined" startIcon={<ArrowBackIosIcon />}>
          Back to playlists
        </Button>
      </Box>

      <Box sx={{ mb: 2 }}>
        <SectionListComponent />
      </Box>

      <Card>
        <CardContent>
          <SectionForm />
        </CardContent>
      </Card>
    </div>
  );
};
