import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from './app/store'

// Temporary placeholder until we add Router:
// Render a simple “App is running” div so the build succeeds now.
function Placeholder() {
  return <div style={{ padding: 16 }}>App is running…</div>
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Placeholder />
      </PersistGate>
    </Provider>
  </React.StrictMode>
)
