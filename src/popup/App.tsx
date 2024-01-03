import browser from 'webextension-polyfill';
import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from '@mui/material';

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
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Box sx={{ mb: 2 }}>
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
        </Box>

        <Button size="small" variant="contained" onClick={handleClear}>
          clear all playlists
        </Button>
      </CardContent>
    </Card>
  );
};
