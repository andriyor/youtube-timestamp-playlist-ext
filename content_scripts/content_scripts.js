import * as browser from "webextension-polyfill";

(function() {
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
    if (message.command === "track") {
      const video = document.querySelector('video')
      return new Promise((resolve)=> {
        video.addEventListener('timeupdate', (e) => {
          console.log(e.target.currentTime);
          console.log(message.endTime);
          console.log('');
          if (e.target.currentTime >= message.endTime) {
            resolve()
          }
        });
      })
    }
  });
})();
