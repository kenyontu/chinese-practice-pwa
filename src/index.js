import React from 'react';
import ReactDOM from 'react-dom';
import {StylesProvider} from '@material-ui/styles';

import './assets/styles.css';
import {UpdateProvider} from './context/updateContext';
import {SpeechProvider} from './context/speechContext';
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <UpdateProvider>
    <SpeechProvider>
      <StylesProvider injectFirst>
        <App />
      </StylesProvider>
    </SpeechProvider>
  </UpdateProvider>,
  document.getElementById('root')
);

serviceWorker.register({
  onUpdate: registration => {
    // Triggers the skipWaiting function in the waiting service worker
    // It is not auto-triggered to avoid unintended refreshes when the user
    // isn't expecting it.
    const skipWaiting = () => {
      if (
        registration &&
        registration.waiting &&
        typeof registration.waiting.postMessage === 'function'
      ) {
        registration.waiting.postMessage({type: 'SKIP_WAITING'});
      }
    };

    const event = new CustomEvent('appUpdateReady', {detail: {skipWaiting}});
    window.dispatchEvent(event);
  }
});
