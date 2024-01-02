import React, { useState } from 'react';
import { format } from 'date-fns/format';

export const SectionForm = ({ onAddSection }) => {
  const [form, setForm] = useState({
    title: '',
    start: 0,
    end: 0,
  });

  const setCurrentPositionAsStart = () => {
    const video = document.querySelector('video');
    setForm({
      ...form,
      start: Math.round(video.currentTime),
    });
  };

  const setCurrentPositionAsEnd = () => {
    const video = document.querySelector('video');
    setForm({
      ...form,
      end: Math.round(video.currentTime),
    });
  };

  const handleTitleChange = (e) => {
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
      <div>Section title</div>
      <input type="text" onChange={handleTitleChange} />
      <div style={{ display: 'flex' }}>
        <div>start</div>
        <input
          type="text"
          value={format(Math.round(form.start) * 1000, 'mm:ss')}
        />
        <button onClick={setCurrentPositionAsStart}>current position</button>
      </div>
      <div style={{ display: 'flex' }}>
        <div>end</div>
        <input
          type="text"
          value={format(Math.round(form.end) * 1000, 'mm:ss')}
        />
        <button onClick={setCurrentPositionAsEnd}>current position</button>
      </div>
      <button onClick={handleAddSection}>Add section</button>
    </div>
  );
};
