import browser from 'webextension-polyfill';
import React from 'react';
import { createRoot } from 'react-dom/client';

import { AppWrapper } from './content-script/AppWrapper';

(function () {
  /**
   * Check and set a global guard variable.
   * If this content script is injected into the same page again,
   * it will do nothing next time.
   */
  if (window.hasRun) {
    return;
  }
  window.hasRun = true;

  browser.runtime.onMessage.addListener((message) => {
    if (message.command === 'track') {
      const video = document.querySelector('video');
      return new Promise<void>((resolve) => {
        video.addEventListener('timeupdate', (e: Event) => {
          const videoElement = e.target as HTMLVideoElement;
          console.log(videoElement.currentTime);
          console.log(message.endSecond);
          console.log('');
          if (videoElement.currentTime >= message.endSecond) {
            resolve();
          }
        });
      });
    }
  });

  setTimeout(() => {
    const topRow = document.querySelector('#top-row');
    const span = document.createElement('span');
    span.setAttribute('id', 'Div1');
    topRow.after(span);
    const root = createRoot(span);
    root.render(<AppWrapper />);
  }, 1000);
})();
