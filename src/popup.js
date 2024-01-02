import browser from 'webextension-polyfill';

document.getElementById('youtube').addEventListener('click', () => {
  browser.runtime.sendMessage({
    text: 'playYoutube',
  });
});
