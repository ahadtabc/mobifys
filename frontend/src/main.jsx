
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
        position="bottom-right"
        containerStyle={{
          bottom: 20,
          right: 20,
          zIndex: 1000,
        }}
        toastOptions={{
          duration: 3000,
          style: {
            minWidth: '280px',
            maxWidth: 'min(380px, calc(100vw - 32px))',
            minHeight: '46px',
            padding: '10px 16px',
            borderRadius: '10px',
            border: '1px solid #e5e7eb',
            background: '#ffffff',
            color: '#1f2937',
            boxShadow: '0 4px 14px rgba(0, 0, 0, 0.08)',
            fontSize: '13.5px',
            fontWeight: 500,
            lineHeight: '1.4',
          },
        }}
      />
      <App />
    </Provider>
  </React.StrictMode>
);