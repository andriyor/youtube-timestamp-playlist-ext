import React, { useState } from 'react';
import { Box, Button, TextField } from '@mui/material';

import { Section } from '../../types/playlist';
import { formatSeconds } from '../../helpers';

type SectionFormProps = {
  onAddSection: (section: Section) => void;
};

export const SectionForm = ({ onAddSection }: SectionFormProps) => {
  const params = new URL(document.location.href).searchParams;
  const videoId = params.get('v');

  const [form, setForm] = useState<Section>({
    videoId: videoId,
    title: '',
    startSecond: 0,
    endSecond: 0,
  });

  const setCurrentPositionAsStart = () => {
    const video = document.querySelector('video');
    setForm({
      ...form,
      startSecond: Math.round(video.currentTime),
    });
  };

  const setCurrentPositionAsEnd = () => {
    const video = document.querySelector('video');
    setForm({
      ...form,
      endSecond: Math.round(video.currentTime),
    });
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      title: e.target.value,
    });
  };

  const handleAddSection = () => {
    onAddSection(form);
  };

  return (
    <div>
      <Box sx={{ mb: 2 }}>
        <TextField
          label="Section title"
          variant="outlined"
          size="small"
          onChange={handleTitleChange}
        />
      </Box>

      <Box sx={{ mb: 2, display: 'flex' }}>
        <Box sx={{ mr: 2 }}>
          <TextField
            label="Start"
            variant="outlined"
            size="small"
            onChange={() => {}}
            value={formatSeconds(form.startSecond)}
          />
        </Box>
        <Button variant="contained" onClick={setCurrentPositionAsStart}>
          Current position
        </Button>
      </Box>

      <Box sx={{ mb: 2, display: 'flex' }}>
        <Box sx={{ mr: 2 }}>
          <TextField
            label="End"
            variant="outlined"
            size="small"
            onChange={() => {}}
            value={formatSeconds(form.endSecond)}
          />
        </Box>
        <Button variant="contained" onClick={setCurrentPositionAsEnd}>
          Current position
        </Button>
      </Box>

      <Button variant="contained" onClick={handleAddSection}>
        Add section
      </Button>
    </div>
  );
};
