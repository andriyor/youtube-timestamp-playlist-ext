import React, { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  TextField,
  Typography,
} from '@mui/material';

import { Playlist } from '../../types/playlist';
import DeleteIcon from '@mui/icons-material/Delete';

type PlaylistComponentProps = {
  playlists: Playlist[];
  onAddPlaylist: (playlistName: string) => void;
  onPlaylistClick: (playlistIndex: number) => void;
  onDeletePlaylist: (playlistIndex: number) => void;
};

export const PlaylistComponent = ({
  playlists,
  onAddPlaylist,
  onPlaylistClick,
  onDeletePlaylist,
}: PlaylistComponentProps) => {
  const [playlistTitle, setPlaylistTitle] = useState('');

  const handlePlaylistClick = (playlistIndex: number) => {
    onPlaylistClick(playlistIndex);
  };

  const handleAddPlaylist = () => {
    setPlaylistTitle('');
    onAddPlaylist(playlistTitle);
  };

  return (
    <div>
      <Box sx={{ mb: 2 }}>
        <Card>
          <CardContent>
            <Box sx={{ ml: 2 }}>
              <Typography variant="h5" gutterBottom>
                Playlists:
              </Typography>
            </Box>

            <List>
              {playlists.map((playlist, index) => {
                return (
                  <ListItem
                    disablePadding
                    key={playlist.title}
                    secondaryAction={
                      <IconButton edge="end" onClick={() => onDeletePlaylist(index)}>
                        <DeleteIcon />
                      </IconButton>
                    }
                  >
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
              label="Playlist title"
              variant="outlined"
              size="small"
              value={playlistTitle}
              onChange={(e) => setPlaylistTitle(e.target.value)}
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
