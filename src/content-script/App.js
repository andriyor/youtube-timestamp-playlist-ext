import browser from 'webextension-polyfill';
import { Playlist } from './playlist';
import { Section } from './section';
import React, { useEffect, useState } from 'react';

export const App = () => {
  const [view, setView] = useState('playlist');

  const [playlists, setPlaylists] = useState([]);
  const [selectedPlaylist, setSelectedPlaylist] = useState(0);

  useEffect(async () => {
    browser.storage.local.get().then((res) => {
      setPlaylists(res.playlists);
    });
  }, []);

  const handlePlaylistClick = (playlistIndex) => {
    setSelectedPlaylist(playlistIndex);
    setView('chapters');
  };

  const handleAddPlaylist = (playlistName) => {
    const newPlaylists = [...playlists, { name: playlistName, sections: [] }];
    setPlaylists(newPlaylists);
    browser.storage.local.set({ playlists: newPlaylists });
  };

  const handleAddSection = (section) => {
    const newPlaylist = [...playlists];
    if (newPlaylist[selectedPlaylist].sections) {
      newPlaylist[selectedPlaylist].sections = [
        ...newPlaylist[selectedPlaylist].sections,
        section,
      ];
    } else {
      newPlaylist[selectedPlaylist].sections = [section];
    }

    setPlaylists(newPlaylist);
  };

  if (view === 'playlist') {
    return (
      <Playlist
        playlists={playlists}
        onAddPlaylist={handleAddPlaylist}
        onPlaylistClick={handlePlaylistClick}
      />
    );
  }
  if (view === 'chapters') {
    return (
      <Section
        playlist={playlists[selectedPlaylist]}
        onAddSection={handleAddSection}
      />
    );
  }
};
