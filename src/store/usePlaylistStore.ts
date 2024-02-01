import browser from 'webextension-polyfill';
import { create } from 'zustand';

import { Playlist, Section } from '../types/playlist';

type PlaylistActions = {
  addPlaylist: (playlistName: string) => void;
  addSectionToPlaylist: (playlistIndex: number, section: Section) => void;
  deletePlaylist: (playlistIndex: number) => void;
  updatePlaylists: (newPlaylist: Playlist[]) => void;
  playlistSectionsChange: (playlistIndex: number, sections: Section[]) => void;
  deleteSection: (playlistIndex: number, sectionIndex: number) => void;
};

type PlaylistState = {
  playlists: Playlist[];
  getPlaylistFromStorage: () => void;
};

const updatePlaylists = (newPlaylists: Playlist[]) => {
  void browser.storage.local.set({ playlists: newPlaylists });
  return { playlists: newPlaylists };
};

export const usePlaylistStore = create<PlaylistState & PlaylistActions>()((set) => ({
  playlists: [],
  getPlaylistFromStorage: () => {
    void browser.storage.local.get().then((res) => {
      if (res['playlists']) {
        set(() => ({ playlists: res['playlists'] as Playlist[] }));
      }
    });
  },

  addPlaylist: (playlistName) => {
    const newPlaylist: Playlist = { title: playlistName, sections: [] };
    set((state) => {
      const newPlaylists = [...state.playlists, newPlaylist];
      return updatePlaylists(newPlaylists);
    });
  },
  addSectionToPlaylist: (playlistIndex, section) => {
    set((state) => {
      const newPlaylists = [...state.playlists];
      if (newPlaylists[playlistIndex]) {
        newPlaylists[playlistIndex].sections = [...newPlaylists[playlistIndex].sections, section];
      } else {
        newPlaylists[playlistIndex].sections = [section];
      }

      return updatePlaylists(newPlaylists);
    });
  },
  deletePlaylist: (playlistIndex) => {
    set((state) => {
      const newPlaylists = [...state.playlists];
      newPlaylists.splice(playlistIndex, 1);

      return updatePlaylists(newPlaylists);
    });
  },
  updatePlaylists: (newPlaylists) => {
    set(() => {
      return updatePlaylists(newPlaylists);
    });
  },
  playlistSectionsChange: (playlistIndex, sections) => {
    set((state) => {
      const newPlaylists = [...state.playlists];
      newPlaylists[playlistIndex].sections = sections;

      return updatePlaylists(newPlaylists);
    });
  },
  deleteSection: (playlistIndex, sectionIndex) => {
    set((state) => {
      const newPlaylists = [...state.playlists];
      newPlaylists[playlistIndex]?.sections.splice(sectionIndex, 1);

      return updatePlaylists(newPlaylists);
    });
  },
}));
