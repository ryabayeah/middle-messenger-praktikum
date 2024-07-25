import { ChatDialogShort, Dialog } from '../../entities/chat/lib';
import { User } from '../../entities/user/model';

export type Indexed<T = unknown> = {
  [key in string]: T;
};

export type AppStore = {
  user?: User;
  dialogs?: Dialog[]
};
