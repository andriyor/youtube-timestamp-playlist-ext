import browser from 'webextension-polyfill';
import React, { useEffect, useState } from 'react';
import { List, ListItem, ListItemButton, ListItemText } from '@mui/material';

export const App = () => {
  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    browser.storage.local.get().then((res) => {
      console.log('res');
      console.log(res);
      if (res.playlists) {
        setPlaylists(res.playlists);
      }
    });
  }, []);

  const handlePlaylistClick = (playlist) => {
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
            <ListItem disablePadding key={playlist.name}>
              <ListItemButton onClick={() => handlePlaylistClick(playlist)}>
                <ListItemText primary={playlist.name} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
      <button onClick={handleClear}>clear playlists</button>
    </div>
  );
};
