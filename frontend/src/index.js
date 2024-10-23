import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Find the root element in your HTML file
const rootElement = document.getElementById('root');

// Use createRoot instead of ReactDOM.render
const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
