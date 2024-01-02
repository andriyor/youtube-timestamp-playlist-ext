import browser from 'webextension-polyfill';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { AppWrapper } from './content-script/AppWrapper';
import { App } from './popup/App';

// document.getElementById('youtube').addEventListener('click', () => {
//   browser.runtime.sendMessage({
//     text: 'playYoutube',
//   });
// });

const rootElement = document.querySelector('#root');
const root = createRoot(rootElement);
root.render(<App />);
