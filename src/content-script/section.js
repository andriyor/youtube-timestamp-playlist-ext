import React from 'react';
import { format } from 'date-fns/format';
import {
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

import { SectionForm } from './sectionForm';

export const Section = ({ playlist, onAddSection }) => {
  return (
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
                primary={`${section.title} ${format(
                  section.start * 1000,
                  'mm:ss',
                )} - ${format(section.start * 1000, 'mm:ss')}`}
              />
            </ListItemButton>
          </ListItem>
        );
      })}
      <SectionForm onAddSection={onAddSection} />
    </List>
  );
};
