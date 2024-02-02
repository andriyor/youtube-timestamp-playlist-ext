import React, { useState } from 'react';

import { Box, IconButton, ListItem, ListItemButton, ListItemText } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';

import { CSS } from '@dnd-kit/utilities';
import { useSortable } from '@dnd-kit/sortable';

import { Section } from '../../types/playlist';
import { formatSeconds } from '../../helpers';
import { SectionForm } from './sectionForm';

type SortableSectionProps = {
  section: Section;
  onSectionDelete: () => void;
  onEditSection: (form: Section) => void;
};

export const SortableSection = ({
  section,
  onSectionDelete,
  onEditSection,
}: SortableSectionProps) => {
  const [isViewMode, setIsViewMode] = useState(true);
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: section.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleEdit = () => {
    setIsViewMode(false);
  };

  const handleEditSection = (form: Section) => {
    setIsViewMode(true);
    onEditSection(form);
  };

  const handleSectionClick = () => {
    window.location.href = `https://www.youtube.com/watch?v=${section.videoId}&t=${section.startSecond}`;
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes}>
      <ListItem disablePadding>
        <Box sx={{ display: 'flex', flex: 1 }}>
          {isViewMode ? (
            <ListItemButton onClick={handleSectionClick}>
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
          ) : (
            <Box sx={{ flex: 1 }}>
              <SectionForm onEditSection={handleEditSection} section={section} />
            </Box>
          )}

          <Box sx={{ display: 'flex', ml: 'auto' }}>
            <Box sx={{ mr: 2 }}>
              <IconButton edge="end" aria-label="delete" onClick={onSectionDelete}>
                <DeleteIcon />
              </IconButton>
            </Box>
            <Box sx={{ mr: 2 }}>
              {isViewMode && (
                <IconButton edge="end" aria-label="delete" onClick={handleEdit}>
                  <EditIcon />
                </IconButton>
              )}
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
