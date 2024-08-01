import { Dialog, Message } from '../../entities/chat/lib';
import { User } from '../../entities/user/model';

export type Indexed<T = unknown> = {
  [key in string]: T;
};

export type AppStore = {
  user?: User;

  dialogs?: Dialog[]
  selectedDialog?: Dialog
  lastDialogMessage?: []

  messages?: Message[]
  isLoadingMsg?: boolean
  isLoadingOldMsg?: boolean
};
