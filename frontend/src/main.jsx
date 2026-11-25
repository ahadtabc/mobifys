import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { Toaster } from 'react-hot-toast';
import { store } from './redux/store';
import App from './App.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <Toaster
        position="top-center"
        containerStyle={{
          top: 59,
          zIndex: 1000,
        }}
        toastOptions={{
          duration: 3000,
          style: {
            minWidth: '280px',
            maxWidth: '420px',
            minHeight: '52px',
            padding: '12px 16px',
            borderRadius: '14px',
            border: '1px solid #e5e7eb',
            background: '#ffffff',
            color: '#111827',
            boxShadow: '0 10px 28px rgba(17, 24, 39, 0.14), 0 2px 8px rgba(17, 24, 39, 0.08)',
            fontFamily: "'Inter', system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
            fontSize: '13px',
            fontWeight: 700,
            lineHeight: '1.4',
          },
          success: {
            iconTheme: {
              primary: '#ff5722',
              secondary: '#fff3ed',
            },
          },
          error: {
            iconTheme: {
              primary: '#dc2626',
              secondary: '#fef2f2',
            },
          },
        }}
      />
      <App />
    </Provider>
  </React.StrictMode>
);