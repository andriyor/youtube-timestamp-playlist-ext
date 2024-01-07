import React from 'react';
import { Box, Button, Card, CardContent } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

import { SectionForm } from './sectionForm';
import { Playlist, Section } from '../../types/playlist';
import { SectionListComponent } from './sectionListComponent';

type SectionComponentProps = {
  playlist: Playlist;
  onAddSection: (section: Section) => void;
  onSectionsChange: (sections: Section[]) => void;
  onBackToPlaylist: () => void;
};

export const SectionComponent = ({
  playlist,
  onAddSection,
  onBackToPlaylist,
  onSectionsChange,
}: SectionComponentProps) => {
  return (
    <div>
      <Box sx={{ mb: 2 }}>
        <Button onClick={onBackToPlaylist} variant="outlined" startIcon={<ArrowBackIosIcon />}>
          Back to playlist
        </Button>
      </Box>

      <Box sx={{ mb: 2 }}>
        <SectionListComponent playlist={playlist} onSectionsChange={onSectionsChange} />
      </Box>

      <Card>
        <CardContent>
          <SectionForm onAddSection={onAddSection} />
        </CardContent>
      </Card>
    </div>
  );
};
