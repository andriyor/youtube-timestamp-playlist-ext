import React, { useState } from 'react';
import { nanoid } from 'nanoid';
import { Box, Button, Grid, TextField } from '@mui/material';

import { Section } from '../../types/playlist';
import { formatSeconds, parseTimeStampToSeconds } from '../../helpers';

type SectionFormProps = {
  onAddSection: (section: Section) => void;
};

export const SectionForm = ({ onAddSection }: SectionFormProps) => {
  const params = new URL(document.location.href).searchParams;
  const videoId = params.get('v');

  const [form, setForm] = useState<Section>({
    id: '',
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
    onAddSection({
      ...form,
      id: nanoid(),
    });
  };

  const setCurrentTitle = () => {
    const title = (document.querySelector('h1.ytd-watch-metadata') as HTMLTitleElement).innerText;
    setForm({
      ...form,
      title,
    });
  };

  const handleStartChange = (timestamp: string) => {
    const startSecond = parseTimeStampToSeconds(timestamp);
    setForm({
      ...form,
      startSecond,
    });
  };

  const handleEndChange = (timestamp: string) => {
    const endSecond = parseTimeStampToSeconds(timestamp);
    setForm({
      ...form,
      endSecond,
    });
  };

  return (
    <div>
      <Box sx={{ mb: 2 }}>
        <Grid container spacing={2}>
          <Grid xs={8} item>
            <TextField
              fullWidth
              label="Section title"
              variant="outlined"
              size="small"
              value={form.title}
              onChange={handleTitleChange}
            />
          </Grid>
          <Grid xs={4} item>
            <Button variant="contained" onClick={setCurrentTitle}>
              Current title
            </Button>
          </Grid>
        </Grid>
      </Box>

      <Box sx={{ mb: 2, display: 'flex' }}>
        <Box sx={{ mr: 2 }}>
          <TextField
            label="Start"
            variant="outlined"
            size="small"
            onChange={(e) => handleStartChange(e.target.value)}
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
            onChange={(e) => handleEndChange(e.target.value)}
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
