export type ChatDialogMessage = {
  senderId: number;
  message?: string;
  timestamp: number;
  type: "text" | "attachment";
  src?: string;
  isRead?: boolean;
};

export type ChatDialog = {
  id: number;
  name: string;
  avatar?: string;
  messages?: any[];
};

export type ChatDialogShort = {
  id: number;
  avatarSrc: string;
  name: string;
  isLastMe: boolean;
  lastMessage: string;
  lastMessageTime: string;
};
