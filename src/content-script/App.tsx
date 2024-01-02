import browser from 'webextension-polyfill';
import React, { useEffect, useState } from 'react';

import { PlaylistComponent } from './playlistComponent';
import { SectionComponent } from './sectionComponent';
import { Playlist, Section } from '../types/playlist';

export const App = () => {
  const [view, setView] = useState('playlist');

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
    setView('chapters');
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

  if (view === 'playlist') {
    return (
      <PlaylistComponent
        playlists={playlists}
        onAddPlaylist={handleAddPlaylist}
        onPlaylistClick={handlePlaylistClick}
      />
    );
  }
  if (view === 'chapters') {
    return <SectionComponent playlist={playlists[selectedPlaylist]} onAddSection={handleAddSection} />;
  }
};
