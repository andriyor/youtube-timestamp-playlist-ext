import React, { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  TextField,
} from '@mui/material';

import { Playlist } from '../../types/playlist';

type PlaylistComponentProps = {
  playlists: Playlist[];
  onAddPlaylist: (playlistName: string) => void;
  onPlaylistClick: (playlistIndex: number) => void;
};

export const PlaylistComponent = ({
  playlists,
  onAddPlaylist,
  onPlaylistClick,
}: PlaylistComponentProps) => {
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
      <Box sx={{ mb: 2 }}>
        <Card>
          <CardContent>
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
          </CardContent>
        </Card>
      </Box>

      <div>
        <Grid container spacing={2}>
          <Grid xs={4} item>
            <TextField
              fullWidth
              label="Outlined"
              variant="outlined"
              size="small"
              onChange={(e) => setPlaylistName(e.target.value)}
            />
          </Grid>
          <Grid xs={3} item>
            <Button variant="contained" onClick={handleAddPlaylist}>
              Add playlist
            </Button>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};