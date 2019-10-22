import React from 'react'
import ReactDOM from 'react-dom'
import 'normalize.css'
import './index.css'
import * as serviceWorker from './serviceWorker'
import { UpdateProvider } from './context/updateContext'
import './setup'
import App from './app/App'

ReactDOM.render(
  <UpdateProvider>
    <App />
  </UpdateProvider>,
  document.getElementById('root')
)

interface Registration {
  waiting: {
    postMessage: (options: { type: string }) => {}
  }
}

export type AppUpdateReadyEvent = CustomEvent<{ skipWaiting: () => void }>

serviceWorker.register({
  onUpdate: (registration: Registration) => {
    // Triggers the skipWaiting function in the waiting service worker
    // It is not auto-triggered to avoid unintended refreshes when the user
    // isn't expecting it.
    const skipWaiting = () => {
      if (
        registration &&
        registration.waiting &&
        typeof registration.waiting.postMessage === 'function'
      ) {
        registration.waiting.postMessage({ type: 'SKIP_WAITING' })
      }
    }

    const event: AppUpdateReadyEvent = new CustomEvent('appUpdateReady', {
      detail: { skipWaiting },
    })
    window.dispatchEvent(event)
  },
})
