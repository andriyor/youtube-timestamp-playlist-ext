import browser from 'webextension-polyfill';

import type { Playlist } from './types/playlist';

const playlist: Playlist[] = [
  {
    videoId: 'R3udqk9ahRM',
    startSecond: 339,
    end: 400,
  },
  {
    videoId: 'RPaZvCNd6P4',
    startSecond: 1657,
    end: 1667,
  },
];

function timeout(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

browser.runtime.onMessage.addListener((message) => {
  if (message.text === 'playYoutube') {
    browser.tabs
      .query({ active: true, currentWindow: true })
      .then(async (tabs) => {
        for (const video of playlist) {
          await browser.tabs.update(tabs[0].id, {
            url: `https://www.youtube.com/watch?v=${video.videoId}&t=${video.startSecond}`,
          });

          await timeout(2000);

          await browser.tabs.sendMessage(tabs[0].id, {
            command: 'track',
            endTime: video.end,
          });
        }
      });
  }
});
