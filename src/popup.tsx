import React from 'react';
import { createRoot } from 'react-dom/client';

import { App } from './popup/App';

const rootElement = document.querySelector('#root');
if (rootElement) {
  const root = createRoot(rootElement);
  root.render(<App />);
}
