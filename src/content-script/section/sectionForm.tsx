import React, { useEffect, useRef, useState } from 'react';
import { nanoid } from 'nanoid';
import { Box, Button, Grid, TextField } from '@mui/material';

import { Section } from '../../types/playlist';
import { formatSeconds, parseTimeStampToSeconds } from '../../helpers';
import { usePlaylistStore } from '../../store/usePlaylistStore';
import { useViewStore } from '../../store/useView';

type SectionFormProps = {
  section?: Section;
  onEditSection?: (form: Section) => void;
};

export const SectionForm = ({ section, onEditSection }: SectionFormProps) => {
  const { addSectionToPlaylist } = usePlaylistStore((state) => state);
  const { selectedPlaylistIndex } = useViewStore((state) => state);
  const params = new URL(document.location.href).searchParams;
  const videoId = params.get('v') ?? '';
  const videoRef = useRef<null | HTMLVideoElement>(null);

  useEffect(() => {
    videoRef.current = document.querySelector('video');
  }, []);

  const [form, setForm] = useState<Section>({
    id: '',
    videoId: videoId,
    title: '',
    startSecond: 0,
    endSecond: 0,
  });

  useEffect(() => {
    if (section) {
      setForm(section);
    }
  }, [section]);

  const setCurrentPositionAsStart = () => {
    if (videoRef.current) {
      setForm({
        ...form,
        startSecond: Math.round(videoRef.current.currentTime),
      });
    }
  };

  const setCurrentPositionAsEnd = () => {
    if (videoRef.current) {
      setForm({
        ...form,
        endSecond: Math.round(videoRef.current.currentTime),
      });
    }
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      title: e.target.value,
    });
  };

  const handleAddSection = () => {
    addSectionToPlaylist(selectedPlaylistIndex, {
      ...form,
      id: nanoid(),
    });
  };

  const handleUpdateSection = () => {
    onEditSection && onEditSection(form);
  };

  const setCurrentTitle = () => {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    const titleHtml = document.querySelector('h1.ytd-watch-metadata') as HTMLHeadElement | null;
    const title: string = titleHtml ? titleHtml.innerText : '';
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

  const isValidTimestamp = form.endSecond - form.startSecond > 0;

  return (
    <Box sx={{ flex: 1 }}>
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
            error={!isValidTimestamp}
            {...(!isValidTimestamp && { helperText: 'End time should be after start time' })}
          />
        </Box>
        <Box>
          <Button variant="contained" onClick={setCurrentPositionAsEnd}>
            Current position
          </Button>
        </Box>
      </Box>

      {section ? (
        <Button disabled={!isValidTimestamp} variant="contained" onClick={handleUpdateSection}>
          Update section
        </Button>
      ) : (
        <Button disabled={!isValidTimestamp} variant="contained" onClick={handleAddSection}>
          Add section
        </Button>
      )}
    </Box>
  );
};
