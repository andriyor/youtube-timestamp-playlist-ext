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

import { SortableSection } from './sortableSection';
import { usePlaylistStore } from '../../store/usePlaylistStore';
import { useViewStore } from '../../store/useView';

export const SectionListComponent = () => {
  const { playlists, playlistSectionsChange, deleteSection } = usePlaylistStore((state) => state);
  const { selectedPlaylistIndex } = useViewStore((state) => state);
  const selectedPlaylist = playlists[selectedPlaylistIndex];

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    const newSections = selectedPlaylist.sections;

    if (active.id !== over.id) {
      const oldIndex = newSections.findIndex((section) => section.id === active.id);
      const newIndex = newSections.findIndex((section) => section.id === over.id);
      const changedSections = arrayMove(newSections, oldIndex, newIndex);
      playlistSectionsChange(selectedPlaylistIndex, changedSections);
    }
  };

  const handleSectionDelete = (sectionIndex: number) => {
    deleteSection(selectedPlaylistIndex, sectionIndex);
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
          <SortableContext items={selectedPlaylist.sections} strategy={verticalListSortingStrategy}>
            <List>
              {selectedPlaylist.sections.map((section, sectionIndex) => (
                <SortableSection
                  key={section.id}
                  section={section}
                  onSectionDelete={() => handleSectionDelete(sectionIndex)}
                />
              ))}
            </List>
          </SortableContext>
        </DndContext>
      </CardContent>
    </Card>
  );
};
