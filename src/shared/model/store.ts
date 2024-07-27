import { Dialog, Message } from '../../entities/chat/lib';
import { User } from '../../entities/user/model';
import { Socket } from '../lib';

export type Indexed<T = unknown> = {
  [key in string]: T;
};

export type AppStore = {
  user?: User;

  // currentDialog?:{
  //   dialog: Dialog
  //   messages: Message[]
  //   socket: Socket
  //   isLoadingDialog?: boolean
  // }
  dialogs?: Dialog[]
  selectedDialog?: Dialog
  selectedDialogMessages?: []
  lastDialogMessage?: []
  dialogSocket?: Socket
};
