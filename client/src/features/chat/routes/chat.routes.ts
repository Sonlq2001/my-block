import { RouteItemDef } from 'types/routes.types';

import ChatScreen from '../screens/ChatScreen/ChatScreen';
import { ChatPathsEnum } from '../constants/chat.paths';
import BlankLayout from 'components/layouts/BlankLayout/BlankLayout';

const CHAT_SCREEN: RouteItemDef = {
  id: 'chat',
  path: ChatPathsEnum.CHAT,
  component: ChatScreen,
  layout: BlankLayout,
};

export const CHAT_ROUTES = [CHAT_SCREEN];
