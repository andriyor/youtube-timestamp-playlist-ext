import { nanoid } from 'nanoid';

import type { Playlist } from '../types/playlist';

export const playlists: Playlist[] = [
  {
    title: 'playlist',
    sections: [
      {
        id: nanoid(),
        title: 'sections 1',
        videoId: 'R3udqk9ahRM',
        startSecond: 339,
        endSecond: 400,
      },
      {
        id: nanoid(),
        title: 'sections 2',
        videoId: 'RPaZvCNd6P4',
        startSecond: 1657,
        endSecond: 1667,
      },
    ],
  },
];
