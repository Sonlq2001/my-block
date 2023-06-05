import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import {
  SnackbarType,
  DEFAULT_AUTO_HIDE_DURATION,
} from 'constants/snackbar.constants';

type SnackbarState = {
  isOpen: boolean;
  message: string;
  snackbarType: SnackbarType;
  autoHideDuration: number;
  withIcon: boolean;
};

type SnackbarProps = Omit<
  SnackbarState,
  'isOpen' | 'snackbarType' | 'autoHideDuration' | 'withIcon'
> & {
  snackbarType?: SnackbarType;
  autoHideDuration?: number;
  withIcon?: boolean;
};

const initialState: SnackbarState = {
  isOpen: false,
  message: '',
  snackbarType: SnackbarType.DEFAULT,
  autoHideDuration: DEFAULT_AUTO_HIDE_DURATION,
  withIcon: false,
};

const snackbarSlice = createSlice({
  name: 'snackbar',
  initialState,
  reducers: {
    displaySnackbar(state, action: PayloadAction<SnackbarProps>) {
      state.isOpen = true;
      state.message = action.payload.message;
      state.snackbarType = action.payload.snackbarType || SnackbarType.DEFAULT;
      state.autoHideDuration =
        action.payload.autoHideDuration || DEFAULT_AUTO_HIDE_DURATION;
      state.withIcon = Boolean(action.payload.withIcon);
    },
    hideSnackbar(state) {
      state.isOpen = false;
    },
  },
});

export const snackbarReduce = snackbarSlice.reducer;
export const { displaySnackbar, hideSnackbar } = snackbarSlice.actions;
