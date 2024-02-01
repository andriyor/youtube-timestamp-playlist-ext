import browser from 'webextension-polyfill';
import React from 'react';
import { createRoot } from 'react-dom/client';

import { AppWrapper } from './content-script/AppWrapper';
import { HTMLElementEvent } from './types/HTMLElementEvent';

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

  type ContentMessage = {
    command: string;
    endSecond: number;
  };

  browser.runtime.onMessage.addListener((message: ContentMessage) => {
    if (message.command === 'track') {
      const video = document.querySelector('video');
      return new Promise<void>((resolve) => {
        if (video) {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-expect-error
          video.addEventListener('timeupdate', (e: HTMLElementEvent<HTMLVideoElement>) => {
            const videoElement = e.target;
            if (videoElement.currentTime >= message.endSecond) {
              resolve();
            }
          });
        }
      });
    }
    return;
  });

  setTimeout(() => {
    const topRow = document.querySelector('#top-row');
    const span = document.createElement('span');
    span.setAttribute('id', 'Div1');
    if (topRow) {
      topRow.after(span);
      const root = createRoot(span);
      root.render(<AppWrapper />);
    }
  }, 1000);
})();
