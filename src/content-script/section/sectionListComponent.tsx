import React from 'react';
import { Box, Card, CardContent, List, Typography } from '@mui/material';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import {
  closestCenter,
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';

import { Playlist, Section } from '../../types/playlist';
import { SortableSection } from './sortableSection';

type SectionListComponentProps = {
  playlist: Playlist;
  onSectionsChange: (sections: Section[]) => void;
};

export const SectionListComponent = ({ playlist, onSectionsChange }: SectionListComponentProps) => {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    const newSections = playlist.sections;

    if (active.id !== over.id) {
      const oldIndex = newSections.findIndex((section) => section.id === active.id);
      const newIndex = newSections.findIndex((section) => section.id === over.id);
      const changedSections = arrayMove(newSections, oldIndex, newIndex);
      onSectionsChange(changedSections);
    }
  };

  return (
    <Card>
      <CardContent>
        <Box sx={{ ml: 2 }}>
          <Typography variant="h5" gutterBottom>
            Sections:
          </Typography>
        </Box>

        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={playlist.sections} strategy={verticalListSortingStrategy}>
            <List>
              {playlist.sections.map((section) => (
                <SortableSection key={section.id} section={section} />
              ))}
            </List>
          </SortableContext>
        </DndContext>
      </CardContent>
    </Card>
  );
};
