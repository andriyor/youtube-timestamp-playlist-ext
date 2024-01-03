import React from 'react';
import {
  Box,
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

import { formatSeconds } from '../../helpers';
import { Playlist } from '../../types/playlist';

type SectionListComponentProps = {
  playlist: Playlist;
};

export const SectionListComponent = ({ playlist }: SectionListComponentProps) => {
  return (
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
  );
};
