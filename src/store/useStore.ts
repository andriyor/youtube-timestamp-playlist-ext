import browser from 'webextension-polyfill';
import { create } from 'zustand';

import { Playlist, Section } from '../types/playlist';

export type View = 'playlist' | 'sections';

interface PlaylistActions {
  addPlaylist: (playlistName: string) => void;
  addSectionToCurrentPlaylist: (section: Section) => void;
  deletePlaylist: (playlistIndex: number) => void;
  updatePlaylists: (newPlaylist: Playlist[]) => void;
  playlistSectionsChange: (sections: Section[]) => void;
}

interface PlaylistState {
  playlists: Playlist[];
  initialize: () => void;

  selectedPlaylistIndex: number;
  setSelected: (playlistIndex: number) => void;

  view: View;
  setView: (view: View) => void;
}

const updatePlaylists = (newPlaylists: Playlist[]) => {
  browser.storage.local.set({ playlists: newPlaylists });
  return { playlists: newPlaylists };
};

export const usePlaylistStore = create<PlaylistState & PlaylistActions>()((set) => ({
  playlists: [],
  initialize: () => {
    browser.storage.local.get().then((res) => {
      if (res.playlists) {
        set((state) => ({ playlists: res.playlists }));
      }
    });
  },

  view: 'playlist',
  setView: (view: View) => set(() => ({ view: view })),

  selectedPlaylistIndex: 0,
  setSelected: (playlistIndex: number) =>
    set((state) => ({ selectedPlaylistIndex: playlistIndex })),

  addPlaylist: (playlistName: string) => {
    const newPlaylist: Playlist = { title: playlistName, sections: [] };
    set((state) => {
      const newPlaylists = [...state.playlists, newPlaylist];
      return updatePlaylists(newPlaylists);
    });
  },
  addSectionToCurrentPlaylist: (section: Section) => {
    set((state) => {
      const selectedPlaylistIndex = state.selectedPlaylistIndex;
      const newPlaylists = [...state.playlists];
      if (newPlaylists[selectedPlaylistIndex].sections) {
        newPlaylists[selectedPlaylistIndex].sections = [
          ...newPlaylists[selectedPlaylistIndex].sections,
          section,
        ];
      } else {
        newPlaylists[selectedPlaylistIndex].sections = [section];
      }

      return updatePlaylists(newPlaylists);
    });
  },
  deletePlaylist: (playlistIndex: number) => {
    set((state) => {
      const newPlaylists = [...state.playlists];
      newPlaylists.splice(playlistIndex, 1);

      return updatePlaylists(newPlaylists);
    });
  },
  updatePlaylists: (newPlaylists: Playlist[]) => {
    set((state) => {
      return updatePlaylists(newPlaylists);
    });
  },
  playlistSectionsChange: (sections: Section[]) => {
    set((state) => {
      const newPlaylists = [...state.playlists];
      newPlaylists[state.selectedPlaylistIndex].sections = sections;

      return updatePlaylists(newPlaylists);
    });
  },
}));
