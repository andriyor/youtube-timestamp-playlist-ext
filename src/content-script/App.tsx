import React, { useEffect } from 'react';

import { PlaylistComponent } from './playlist/playlistComponent';
import { SectionComponent } from './section/sectionComponent';
import { usePlaylistStore } from '../store/useStore';
import { useViewStore } from '../store/useView';

export const App = () => {
  const { getPlaylistFromStorage } = usePlaylistStore((state) => state);
  const { view } = useViewStore((state) => state);

  useEffect(() => {
    getPlaylistFromStorage();
  }, []);

  if (view === 'playlist') {
    return <PlaylistComponent />;
  }
  if (view === 'sections') {
    return <SectionComponent />;
  }
};
