import React, { useState } from 'react';

import { List, ListItem, ListItemButton, ListItemText } from '@mui/material';

export const Playlist = ({ playlists, onAddPlaylist, onPlaylistClick }) => {
  const [playlistName, setPlaylistName] = useState('');

  const handlePlaylistClick = (playlistIndex) => {
    onPlaylistClick(playlistIndex);
  };

  const handleAddPlaylist = () => {
    setPlaylistName('');
    onAddPlaylist(playlistName);
  };

  return (
    <div>
      <List>
        {playlists.map((playlist, index) => {
          return (
            <ListItem disablePadding key={playlist.name}>
              <ListItemButton onClick={() => handlePlaylistClick(index)}>
                <ListItemText primary={playlist.name} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>

      <div>
        <input type="text" onChange={(e) => setPlaylistName(e.target.value)} />
        <button onClick={handleAddPlaylist}>add playlist</button>
      </div>
    </div>
  );
};
