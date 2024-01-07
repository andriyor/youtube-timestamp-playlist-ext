import React from 'react';

import { Box, IconButton, ListItem, ListItemButton, ListItemText } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';

import { CSS } from '@dnd-kit/utilities';
import { useSortable } from '@dnd-kit/sortable';

import { Section } from '../../types/playlist';
import { formatSeconds } from '../../helpers';

type SortableSectionProps = {
  section: Section;
};

export const SortableSection = ({ section }: SortableSectionProps) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: section.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes}>
      <ListItem disablePadding>
        <Box sx={{ display: 'flex', flex: 1 }}>
          <ListItemButton>
            <ListItemText
              primary={
                <Box sx={{ display: 'flex' }}>
                  <Box>{section.title}</Box>
                  <Box sx={{ ml: 'auto' }}>
                    {`${formatSeconds(section.startSecond)} - ${formatSeconds(section.endSecond)}`}
                  </Box>
                </Box>
              }
            />
          </ListItemButton>

          <Box sx={{ display: 'flex', ml: 'auto' }}>
            <Box sx={{ mr: 2 }}>
              <IconButton edge="end" aria-label="delete">
                <DeleteIcon />
              </IconButton>
            </Box>
            <Box>
              <div
                style={{
                  cursor: 'grab',
                }}
                {...listeners}
              >
                <IconButton edge="end">
                  <DragIndicatorIcon />
                </IconButton>
              </div>
            </Box>
          </Box>
        </Box>
      </ListItem>
    </div>
  );
};
