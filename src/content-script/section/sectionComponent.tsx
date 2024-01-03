import React from 'react';
import { IconButton, List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

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
      <button onClick={onBackToPlaylist}>Back to playlist</button>
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
                  primary={`${section.title} ${formatSeconds(
                    section.startSecond,
                  )} - ${formatSeconds(section.endSecond)}`}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
      <SectionForm onAddSection={onAddSection} />
    </div>
  );
};
