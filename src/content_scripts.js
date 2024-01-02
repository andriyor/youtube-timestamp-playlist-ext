import browser from "webextension-polyfill";
import React, {useState} from 'react';
import {createRoot} from "react-dom/client";

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
    if (message.command === "track") {
      const video = document.querySelector('video')
      return new Promise((resolve) => {
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


  const Component = () => {
    const [count, setCount] = useState(0);

    const handleClick = () => {
      setCount(count + 1);
    }

    return <div>
      <div>
        {count}
      </div>
      <button onClick={handleClick}>button</button>
    </div>
  }


  setTimeout(() => {
    const topRow = document.querySelector('#top-row');
    const span = document.createElement("span")
    span.setAttribute("id", "Div1")
    topRow.after(span)
    const root = createRoot(span);
    root.render(<Component/>);
  }, 1000)
})();
