import React, { useState } from 'react';
import { Typography } from '@mui/material';

import { Section } from '../types/playlist';
import { formatSeconds } from '../helpers';

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
      <Typography gutterBottom>Section title</Typography>
      <input type="text" onChange={handleTitleChange} />
      <div style={{ display: 'flex' }}>
        <Typography gutterBottom>Start</Typography>
        <input type="text" onChange={() => {}} value={formatSeconds(form.startSecond)} />
        <button onClick={setCurrentPositionAsStart}>current position</button>
      </div>
      <div style={{ display: 'flex' }}>
        <Typography gutterBottom>End</Typography>
        <input type="text" onChange={() => {}} value={formatSeconds(form.endSecond)} />
        <button onClick={setCurrentPositionAsEnd}>current position</button>
      </div>
      <button onClick={handleAddSection}>Add section</button>
    </div>
  );
};
