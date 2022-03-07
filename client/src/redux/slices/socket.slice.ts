import { createSlice } from '@reduxjs/toolkit';
import { Socket } from 'socket.io-client';

interface SocketSlice {
  socketData: Socket | null;
}

const initialState: SocketSlice = {
  socketData: null,
};

const socketSlice = createSlice({
  name: 'socket',
  initialState,
  reducers: {
    getSocket: (state, action) => {
      state.socketData = action.payload;
    },
  },
});

export const socketReducer = socketSlice.reducer;
export const { getSocket } = socketSlice.actions;
