import React, { useEffect } from 'react';

import { PlaylistComponent } from './playlist/playlistComponent';
import { SectionComponent } from './section/sectionComponent';
import { usePlaylistStore } from '../store/useStore';

export const App = () => {
  const { initialize, view } = usePlaylistStore((state) => state);

  useEffect(() => {
    initialize();
  }, []);

  if (view === 'playlist') {
    return <PlaylistComponent />;
  }
  if (view === 'sections') {
    return <SectionComponent />;
  }
};
