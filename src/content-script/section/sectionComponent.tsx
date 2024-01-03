import React from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

import { SectionForm } from './sectionForm';
import { Playlist, Section } from '../../types/playlist';
import { formatSeconds } from '../../helpers';
import { SectionListComponent } from './sectionListComponent';

type SectionComponentProps = {
  playlist: Playlist;
  onAddSection: (section: Section) => void;
  onBackToPlaylist: () => void;
};

export const SectionComponent = ({
  playlist,
  onAddSection,
  onBackToPlaylist,
}: SectionComponentProps) => {
  return (
    <div>
      <Box sx={{ mb: 2 }}>
        <Button onClick={onBackToPlaylist} variant="outlined" startIcon={<ArrowBackIosIcon />}>
          Back to playlist
        </Button>
      </Box>

      <Box sx={{ mb: 2 }}>
        <SectionListComponent playlist={playlist} />
      </Box>

      <Card>
        <CardContent>
          <SectionForm onAddSection={onAddSection} />
        </CardContent>
      </Card>
    </div>
  );
};
