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
  setView: (view: View) => set(() => ({ view: view })),

  selectedPlaylistIndex: 0,
  setSelected: (playlistIndex: number) =>
    set((state) => ({ selectedPlaylistIndex: playlistIndex })),
}));
