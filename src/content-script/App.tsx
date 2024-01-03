import browser from 'webextension-polyfill';
import React, { useEffect, useState } from 'react';

import { Playlist, Section } from '../types/playlist';
import { PlaylistComponent } from './playlist/playlistComponent';
import { SectionComponent } from './section/sectionComponent';

type View = 'playlist' | 'sections';

export const App = () => {
  const [view, setView] = useState<View>('playlist');

  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [selectedPlaylist, setSelectedPlaylist] = useState(0);

  useEffect(() => {
    browser.storage.local.get().then((res) => {
      if (res.playlists) {
        setPlaylists(res.playlists);
      }
    });
  }, []);

  const handlePlaylistClick = (playlistIndex: number) => {
    setSelectedPlaylist(playlistIndex);
    setView('sections');
  };

  const handleAddPlaylist = (playlistName: string) => {
    const newPlaylist: Playlist = { title: playlistName, sections: [] };
    const newPlaylists = [...playlists, newPlaylist];
    setPlaylists(newPlaylists);
    browser.storage.local.set({ playlists: newPlaylists });
  };

  const handleAddSection = (section: Section) => {
    const newPlaylist = [...playlists];
    if (newPlaylist[selectedPlaylist].sections) {
      newPlaylist[selectedPlaylist].sections = [...newPlaylist[selectedPlaylist].sections, section];
    } else {
      newPlaylist[selectedPlaylist].sections = [section];
    }

    setPlaylists(newPlaylist);
    browser.storage.local.set({ playlists: newPlaylist });
  };

  const handleBackToPlaylist = () => {
    setView('playlist');
  };

  if (view === 'playlist') {
    return (
      <PlaylistComponent
        playlists={playlists}
        onAddPlaylist={handleAddPlaylist}
        onPlaylistClick={handlePlaylistClick}
      />
    );
  }
  if (view === 'sections') {
    return (
      <SectionComponent
        playlist={playlists[selectedPlaylist]}
        onAddSection={handleAddSection}
        onBackToPlaylist={handleBackToPlaylist}
      />
    );
  }
};
