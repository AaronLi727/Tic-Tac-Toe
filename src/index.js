import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

const webSocket = new WebSocket('ws://localhost:6969/ws');

webSocket.onopen = e => {
  console.log(e)
  console.log('connection established');
};

webSocket.onclose = () => {
  console.log('connection closed');
};

webSocket.onerror = e => {
  console.log('connection error', e);
};

webSocket.onmessage = message => {
  console.log(message);
  console.log('message received', message.data);
};

ReactDOM.render(<App webSocket={webSocket} />,
  document.getElementById('root'));

serviceWorker.unregister();
