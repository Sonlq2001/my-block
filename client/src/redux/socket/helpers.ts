// import io from 'socket.io-client';
import { Middleware } from '@reduxjs/toolkit';

export const CRASH_MIDDLEWARE: Middleware = (store) => (next) => (action) => {
  try {
    console.log(store);
    return next(action);
  } catch (error) {
    throw error;
  }
};

export const LOGGER_MIDDLEWARE: Middleware = (store) => {
  return (next) => {
    return (action) => {
      const result = next(action);
      return result;
    };
  };
};

// export default function socketMiddleware() {
//   const socket = io();

//   return ({ dispatch }) => next => (action) => {
//     if (typeof action === 'function') {
//       return next(action);
//     }

//     const {
//       event,
//       leave,
//       handle,
//       ...rest
//     } = action;

//     if (!event) {
//       return next(action);
//     }

//     if (leave) {
//       socket.removeListener(event);
//     }

//     let handleEvent = handle;
//     if (typeof handleEvent === 'string') {
//       handleEvent = result => dispatch({ type: handle, result, ...rest });
//     }
//     return socket.on(event, handleEvent);
//   };
// }
