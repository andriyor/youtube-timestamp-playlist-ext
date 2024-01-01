import * as browser from "webextension-polyfill";


const playlist = [
  {
    url: "https://youtu.be/R3udqk9ahRM?si=8bvTCoKPJG1UNL4c&t=339",
    end: 400
  },
  {
    url: "https://www.youtube.com/watch?v=RPaZvCNd6P4&t=1657s",
    end: 1667
  }
];


function timeout(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

browser.runtime.onMessage.addListener((message) => {
  console.log("message");
  console.log(message);
  if (message.text === "playYoutube") {
    browser.tabs.query({active: true, currentWindow: true}).then(async (tabs) => {
      for (const video of playlist) {

        await browser.tabs.update(tabs[0].id, {url: video.url});

        console.log("updated");

        await timeout(2000);

        await browser.tabs.executeScript({file: "/content_scripts.js"})

        console.log("executed");

        await browser.tabs.sendMessage(tabs[0].id, {
          command: "track",
          endTime: video.end
        });

        console.log("done");

      }
    });
  }
});
