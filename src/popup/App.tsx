import browser from 'webextension-polyfill';
import React, { ChangeEvent, useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
  styled,
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DeleteIcon from '@mui/icons-material/Delete';
import FileDownloadIcon from '@mui/icons-material/FileDownload';

import { Playlist } from '../types/playlist';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

const downloadJson = (fileName: string, data: unknown) => {
  const blob = new Blob([JSON.stringify(data)]);
  const link = document.createElement('a');
  link.download = `${fileName}.json`;
  link.href = window.URL.createObjectURL(blob);
  link.click();
};

export const App = () => {
  const [playlists, setPlaylists] = useState<Playlist[]>([]);

  void browser.storage.local.get().then((res) => {
    if (res['playlists']) {
      setPlaylists(res['playlists'] as Playlist[]);
    }
  });

  const handlePlaylistClick = (playlist: Playlist) => {
    void browser.runtime.sendMessage({
      text: 'playYoutube',
      playlist,
    });
  };

  const handleClear = () => {
    void browser.storage.local.clear();
    setPlaylists([]);
  };

  const handleDownloadPlaylist = () => {
    downloadJson('youtube-playlist', playlists);
  };

  const handleImportPlaylists = (event: ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();
    if (event.target.files?.[0]) {
      reader.readAsText(event.target.files[0]);
      reader.onload = () => {
        const playlists = JSON.parse(reader.result as string) as Playlist[];
        setPlaylists(playlists);
        void browser.storage.local.set({ playlists });
      };
    }
  };

  const handleImportPlaylist = (event: ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();
    if (event.target.files?.[0]) {
      reader.readAsText(event.target.files[0]);
      reader.onload = () => {
        const playlist = JSON.parse(reader.result as string) as Playlist;
        const newPlaylists = [...playlists, playlist];
        setPlaylists(newPlaylists);
        void browser.storage.local.set({ playlists: newPlaylists });
      };
    }
  };

  const handlePlaylistExport = (playlist: Playlist) => {
    downloadJson(playlist.title, playlist);
  };

  return (
    <Card sx={{ minWidth: 300 }}>
      <CardContent>
        <Box sx={{ mb: 2 }}>
          <Typography variant="h5" gutterBottom>
            Playlists:
          </Typography>
          <List>
            {playlists.map((playlist) => {
              return (
                <ListItem
                  disablePadding
                  key={playlist.title}
                  secondaryAction={
                    <IconButton edge="end" onClick={() => handlePlaylistExport(playlist)}>
                      <FileDownloadIcon />
                    </IconButton>
                  }
                >
                  <ListItemButton onClick={() => handlePlaylistClick(playlist)}>
                    <ListItemText primary={playlist.title} />
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>
        </Box>

        <Box sx={{ mb: 2 }}>
          <Button size="small" variant="contained" onClick={handleDownloadPlaylist}>
            Export all playlists
          </Button>
        </Box>

        <Box sx={{ mb: 2 }}>
          <Button component="label" variant="contained" startIcon={<CloudUploadIcon />}>
            Import single playlist
            <VisuallyHiddenInput onChange={handleImportPlaylist} type="file" />
          </Button>
        </Box>

        <Box sx={{ mb: 2 }}>
          <Button component="label" variant="contained" startIcon={<CloudUploadIcon />}>
            Import playlists
            <VisuallyHiddenInput onChange={handleImportPlaylists} type="file" />
          </Button>
        </Box>

        <Box sx={{ mb: 2 }}>
          <Button variant="contained" onClick={handleClear} startIcon={<DeleteIcon />}>
            Clear all playlists
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};
