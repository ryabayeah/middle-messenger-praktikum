export type GetChatsParams = {
  offset?: number;
  limit?: number;
  title?: string;
};

export type AddUserToChatParams = {
  users: number[];
  chatId: 0;
};
