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
        <Card>
          <CardContent>
            <Box sx={{ ml: 2 }}>
              <Typography variant="h5" gutterBottom>
                Sections:
              </Typography>
            </Box>

            <List>
              {playlist?.sections?.map((section) => {
                return (
                  <ListItem
                    disablePadding
                    key={section.title}
                    secondaryAction={
                      <IconButton edge="end" aria-label="delete">
                        <DeleteIcon />
                      </IconButton>
                    }
                  >
                    <ListItemButton>
                      <ListItemText
                        primary={
                          <Box sx={{ display: 'flex' }}>
                            <Box>{section.title}</Box>
                            <Box sx={{ ml: 'auto' }}>
                              {`${formatSeconds(section.startSecond)} - ${formatSeconds(
                                section.endSecond,
                              )}`}
                            </Box>
                          </Box>
                        }
                      />
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </List>
          </CardContent>
        </Card>
      </Box>

      <Card>
        <CardContent>
          <SectionForm onAddSection={onAddSection} />
        </CardContent>
      </Card>
    </div>
  );
};
