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

export type ChatDialogShort = {
  id: number;
  avatarSrc: string;
  name: string;
  isLastMe: boolean;
  lastMessage?: string;
  lastMessageTime?: string;
  messageCount?: number;
};
