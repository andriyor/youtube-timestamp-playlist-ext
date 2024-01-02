import React, { useState } from 'react';
import { List, ListItem, ListItemButton, ListItemText } from '@mui/material';

import { Playlist } from '../types/playlist';

type PlaylistComponentProps = {
  playlists: Playlist[];
  onAddPlaylist: (playlistName: string) => void;
  onPlaylistClick: (playlistIndex: number) => void;
};

export const PlaylistComponent = ({ playlists, onAddPlaylist, onPlaylistClick }: PlaylistComponentProps) => {
  const [playlistName, setPlaylistName] = useState('');

  const handlePlaylistClick = (playlistIndex: number) => {
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
            <ListItem disablePadding key={playlist.title}>
              <ListItemButton onClick={() => handlePlaylistClick(index)}>
                <ListItemText primary={playlist.title} />
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
