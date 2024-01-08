import { create } from 'zustand';

export type View = 'playlist' | 'sections';

interface ViewState {
  view: View;
  setView: (view: View) => void;

  selectedPlaylistIndex: number;
  setSelected: (playlistIndex: number) => void;
}

export const useViewStore = create<ViewState>()((set) => ({
  view: 'playlist',
  setView: (view) => set(() => ({ view: view })),

  selectedPlaylistIndex: 0,
  setSelected: (playlistIndex) => set((state) => ({ selectedPlaylistIndex: playlistIndex })),
}));
