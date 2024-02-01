import browser from 'webextension-polyfill';

import type { Playlist } from './types/playlist';

function timeout(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

type playYoutubeMessage = {
  text: string;
  playlist: Playlist;
};

browser.runtime.onMessage.addListener((message: playYoutubeMessage) => {
  if (message.text === 'playYoutube') {
    void browser.tabs.query({ active: true, currentWindow: true }).then(async (tabs) => {
      for (const section of message.playlist.sections) {
        if (tabs[0]?.id) {
          await browser.tabs.update(tabs[0].id, {
            url: `https://www.youtube.com/watch?v=${section.videoId}&t=${section.startSecond}`,
          });

          await timeout(2000);

          await browser.tabs.sendMessage(tabs[0].id, {
            command: 'track',
            endSecond: section.endSecond,
          });

          console.log(`${section.title} played`);
        }
      }
    });
  }
});
