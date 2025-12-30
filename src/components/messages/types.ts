export interface Conversation {
  id: number;
  name: string;
  avatar: string;
  lastMessage: string;
  unread: boolean;
  timestamp: string;
}

export interface Message {
  id: number;
  text: string;
  sender: "me" | "them";
  timestamp: string;
  attachments?: string[];
}