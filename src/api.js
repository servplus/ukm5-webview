/* eslint-disable no-undef */

import { CMD_EXIT } from './constants/commands';
import { MESS_CONNECTED, MESS_DISCONNECTED, MESS_CONNECT, MESS_DISCONNECT, MESS_ITEM_CODE } from './constants/messages';

const sendMessage = mess => window.parent.postMessage(mess, '*');

let onItemCodeCB;
let connected = false;

export const isConnected = () => connected;

const onMessage = (event) => {
  switch (event.data.type) {
    case MESS_CONNECTED:
      connected = true;
      break;
    case MESS_DISCONNECTED:
      window.onmessage = null;
      connected = false;
      break;
    case MESS_ITEM_CODE:
      if (onItemCodeCB) onItemCodeCB(event.data.code);
      break;
  }
};

export const connectApp = () => {
  window.onmessage = onMessage;
  sendMessage({ type: MESS_CONNECT });
};

export const disconnectApp = () => {
  connected && sendMessage({ type: MESS_DISCONNECT });
};

export const onItemCode = (cb) => { onItemCodeCB = cb; };

export const cmdExit = () => connected && sendMessage({ type: CMD_EXIT });
