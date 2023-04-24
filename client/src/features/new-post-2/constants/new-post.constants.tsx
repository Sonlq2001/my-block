import { Level } from '@tiptap/extension-heading/dist/packages/extension-heading/src/heading';

import { ReactComponent as IconHeading1 } from 'assets/images/icon-editor/icon-heading-1.svg';
import { ReactComponent as IconHeading2 } from 'assets/images/icon-editor/icon-heading-2.svg';
import { ReactComponent as IconHeading3 } from 'assets/images/icon-editor/icon-heading-3.svg';
import { ReactComponent as IconHeading4 } from 'assets/images/icon-editor/icon-heading-4.svg';
import { ReactComponent as IconHeading5 } from 'assets/images/icon-editor/icon-heading-5.svg';
import { ReactComponent as IconHeading6 } from 'assets/images/icon-editor/icon-heading-6.svg';

export const HEADINGS: {
  level: Level;
  name: string;
  icon: React.ReactNode;
}[] = [
  {
    level: 1,
    name: 'Heading 1',
    icon: <IconHeading1 />,
  },
  {
    level: 2,
    name: 'Heading 2',
    icon: <IconHeading2 />,
  },
  {
    level: 3,
    name: 'Heading 3',
    icon: <IconHeading3 />,
  },
  {
    level: 4,
    name: 'Heading 4',
    icon: <IconHeading4 />,
  },
  {
    level: 5,
    name: 'Heading 5',
    icon: <IconHeading5 />,
  },
  {
    level: 6,
    name: 'Heading 6',
    icon: <IconHeading6 />,
  },
];

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
