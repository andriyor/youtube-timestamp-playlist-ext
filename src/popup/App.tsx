import browser from 'webextension-polyfill';
import React, { useEffect, useState } from 'react';
import { List, ListItem, ListItemButton, ListItemText } from '@mui/material';

import { Playlist } from '../types/playlist';

export const App = () => {
  const [playlists, setPlaylists] = useState<Playlist[]>([]);

  useEffect(() => {
    browser.storage.local.get().then((res) => {
      console.log('res');
      console.log(res);
      if (res.playlists) {
        setPlaylists(res.playlists);
      }
    });
  }, []);

  const handlePlaylistClick = (playlist: Playlist) => {
    browser.runtime.sendMessage({
      text: 'playYoutube',
      playlist,
    });
  };

  const handleClear = () => {
    browser.storage.local.clear();
  };

  return (
    <div>
      <List>
        {playlists.map((playlist) => {
          return (
            <ListItem disablePadding key={playlist.title}>
              <ListItemButton onClick={() => handlePlaylistClick(playlist)}>
                <ListItemText primary={playlist.title} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
      <button onClick={handleClear}>clear playlists</button>
    </div>
  );
};
