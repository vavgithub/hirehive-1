import "./sentry.js";
import React from 'react'
import ReactDOM from 'react-dom/client'
import * as Sentry from '@sentry/react'
import App from './App.jsx'
import './index.css'

const FallbackComponent = () => (
  <div style={{ padding: '2rem', textAlign: 'center' }}>
    <h2>Something went wrong</h2>
    <p>Our team has been notified. Please refresh the page.</p>
    <button onClick={() => window.location.reload()}>Refresh</button>
  </div>
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <Sentry.ErrorBoundary fallback={FallbackComponent} showDialog>
    <App />
  </Sentry.ErrorBoundary>
)

