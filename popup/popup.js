import * as browser from "webextension-polyfill";


document.getElementById("youtube").addEventListener("click", (e) => {
  browser.runtime.sendMessage({
    text: 'playYoutube',
  });
});
