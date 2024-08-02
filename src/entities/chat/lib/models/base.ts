export type MessageAttachmentType = 'file' | 'video' | 'img' | 'location';

export type ChatDialogMessage = {
  senderId: number;
  message?: string;
  timestamp: number;
  type?: 'text' | 'attachment';
  attachment?: { type: MessageAttachmentType; src: string };
  isRead?: boolean;
};

export type ChatDialog = {
  id: number;
  name: string;
  avatar?: string;
  messages?: ChatDialogMessage[];
};

export type Dialog = {
  id: number;
  title: string;
  avatar: string;
  unread_count: number;
  last_message: LastMessage | null;
  created_by: number;
};

export type ChatDialogShort = {
  isLastMe: boolean;

  id: number;
  title: string;
  avatar: string;
  unread_count: number;
  // created_by: number;
  last_message: LastMessage | null;
};

export type LastMessage = {
  user: User;
  time: string;
  content: string;
};

export type Message = {
  chat_id: number;
  content: string;
  file: string;
  id: number;
  is_read: boolean;
  time: string;
  type: 'message';
  user_id: number;
};

type User = {
  id: number;
  first_name: string;
  second_name: string;
  display_name: string;
  login: string;
  email: string;
  phone: string;
  avatar: string;
};

export type Chat = {
  id: number;
  title: string;
  avatar: string;
  unread_count: number;
  created_by: number;
  last_message: LastMessage | null;
};
