import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('blog')
);

let bd = document.getElementById('blog-data')
if (bd) {
  bd.style.display = 'none'
}