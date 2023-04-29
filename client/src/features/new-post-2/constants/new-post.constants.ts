export enum TAB_SET_IMAGE {
  LINK = 1,
  FILE = 2,
}

export const FORMAT_POST = [
  {
    id: 1,
    label: 'Tiêu chuẩn',
  },
  {
    id: 2,
    label: 'Video',
  },
];

export enum FORMAT_POST_ID {
  STANDARD = 1,
  VIDEO = 2,
}

export const MAX_LENGTH_TITLE = 100;
export const MAX_LENGTH_TAG = 5;
export const MIN_LENGTH = 1;
export const MAX_LENGTH_CHARACTER_TAG = 20;
export const MAX_SIZE_FILE = 2000000; // 2MB;

export const FILES_ACCEPT = ['image/jpeg', 'image/jpg', 'image/png'];

export enum STATUS_POST {
  PUBLIC = 1,
  DRAFT = 2,
  PRIVATE = 3,
}
