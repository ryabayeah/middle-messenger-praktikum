import { Dialog } from '../../entities/chat/lib';
import { User } from '../../entities/user/model';
import { Socket } from '../lib';

export type Indexed<T = unknown> = {
  [key in string]: T;
};

export type AppStore = {
  user?: User;

  dialogs?: Dialog[]
  selectedDialog?: Dialog
  selectedDialogMessages?: []
  lastDialogMessage?: []
  dialogSocket?: Socket
};
