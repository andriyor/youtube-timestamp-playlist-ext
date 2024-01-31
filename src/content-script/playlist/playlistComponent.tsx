import React, { useEffect, useState } from 'react';
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

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';

import { Playlist, ViewMode } from '../../types/playlist';
import { usePlaylistStore } from '../../store/usePlaylistStore';
import { useViewStore } from '../../store/useView';

export const PlaylistComponent = () => {
  const [playlistTitle, setPlaylistTitle] = useState('');
  const [playlistViewModes, setPlaylistViewModes] = useState<ViewMode[]>([]);
  const [immediatePlaylists, setImmediatePlaylists] = useState<Playlist[]>([]);
  const { addPlaylist, playlists, updatePlaylists, deletePlaylist } = usePlaylistStore(
    (state) => state,
  );
  const { setView, setSelected } = useViewStore((state) => state);

  useEffect(() => {
    const playlistViewModes = playlists.map((_) => 'VIEW' as ViewMode);
    setPlaylistViewModes(playlistViewModes);
    setImmediatePlaylists(playlists);
  }, [playlists]);

  const openEditMode = (playlistIndex: number) => {
    const newPlaylistsViewMode = [...playlistViewModes];
    newPlaylistsViewMode[playlistIndex] = 'EDIT';
    setPlaylistViewModes(newPlaylistsViewMode);
  };

  const savePlayListName = () => {
    updatePlaylists([...immediatePlaylists]);
  };

  const handleAddPlaylist = () => {
    setPlaylistTitle('');
    addPlaylist(playlistTitle);
  };

  const handlePlaylistNameChange = (playlistIndex: number, newPlaylistTitle: string) => {
    const newImmediatePlaylist = [...immediatePlaylists];
    newImmediatePlaylist[playlistIndex].title = newPlaylistTitle;
    setImmediatePlaylists(newImmediatePlaylist);
  };

  const handlePlaylistClick = (playlistIndex: number) => {
    setSelected(playlistIndex);
    setView('sections');
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
              {immediatePlaylists.map((playlist, playlistIndex) => {
                return (
                  <ListItem disablePadding key={String(playlistIndex)}>
                    <Box sx={{ display: 'flex', flex: 1 }}>
                      {playlistViewModes[playlistIndex] === 'EDIT' ? (
                        <TextField
                          fullWidth
                          label="Playlist title"
                          variant="outlined"
                          size="small"
                          value={playlist.title}
                          onChange={(e) => handlePlaylistNameChange(playlistIndex, e.target.value)}
                        />
                      ) : (
                        <ListItemButton onClick={() => handlePlaylistClick(playlistIndex)}>
                          <ListItemText primary={playlist.title} />
                        </ListItemButton>
                      )}

                      <Box sx={{ display: 'flex', ml: 'auto' }}>
                        <Box sx={{ mr: 2 }}>
                          {playlistViewModes[playlistIndex] === 'EDIT' ? (
                            <IconButton edge="end" onClick={savePlayListName}>
                              <SaveIcon />
                            </IconButton>
                          ) : (
                            <IconButton edge="end" onClick={() => openEditMode(playlistIndex)}>
                              <EditIcon />
                            </IconButton>
                          )}
                        </Box>
                        <Box>
                          <IconButton edge="end" onClick={() => deletePlaylist(playlistIndex)}>
                            <DeleteIcon />
                          </IconButton>
                        </Box>
                      </Box>
                    </Box>
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
