export type Section = {
  title: string;
  videoId: string;
  startSecond: number;
  endSecond: number;
};

export type Playlist = {
  title: string;
  sections: Section[];
};
