import { io } from 'socket.io-client';
import React from 'react';
const SOCKET_URL =
  window.location.host.indexOf('localhost') >= 0
    ? 'http://127.0.0.1:5000'
    : window.location.host;

export const AppContext = React.createContext();
export const socket = io(SOCKET_URL);
