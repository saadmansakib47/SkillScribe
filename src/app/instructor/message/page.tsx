"use client";

import { useState } from "react";

import ConversationList from "@/components/messages/conversationList";
import ChatHeader from "@/components/messages/chatHeader";
import MessageList from "@/components/messages/messageList";
import MessageComposer from "@/components/messages/messageComposer";
import UserDetailsPanel from "@/components/messages/userDetailsPanel";

import { Conversation, Message } from "@/components/messages/types";

export default function InstructorMessages() {
  const [selectedChat, setSelectedChat] = useState<number | null>(1);
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: "Hello instructor!", sender: "them", timestamp: "10:21 AM", reactions: [] },
    { id: 2, text: "Hi, how can I help?", sender: "me", timestamp: "10:22 AM", reactions: [] },
    { id: 3, text: "I have a question about module 2.", sender: "them", timestamp: "10:23 AM", reactions: [] },
  ]);

  const conversations: Conversation[] = [
    {
      id: 1,
      name: "John Doe",
      avatar: "https://i.pravatar.cc/150?img=12",
      lastMessage: "Thank you!",
      unread: true,
      timestamp: "2m ago",
    },
    {
      id: 2,
      name: "Sarah Kim",
      avatar: "https://i.pravatar.cc/150?img=31",
      lastMessage: "Can you clarify question 4?",
      unread: false,
      timestamp: "1h ago",
    },
  ];

  const handleSendMessage = (text: string, attachments?: File[]) => {
    const newMessage: Message = {
      id: messages.length + 1,
      text: text,
      sender: "me",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      attachments: attachments?.map(file => file.name),
      reactions: [],
    };

    setMessages((prev) => [...prev, newMessage]);
  };

  const handleAddReaction = (messageId: number, emoji: string) => {
    setMessages((prev) =>
      prev.map((msg) =>
        msg.id === messageId
          ? { ...msg, reactions: [...(msg.reactions || []), emoji] }
          : msg
      )
    );
  };

  return (
    <div className="flex min-h-screen bg-[#F9FAFB]">
      <ConversationList
        conversations={conversations}
        selectedChat={selectedChat}
        onSelect={setSelectedChat}
      />

      <div className="flex-1 flex flex-col">
        <ChatHeader
          name="John Doe"
          avatar="https://i.pravatar.cc/150?img=12"
          status="Online"
        />

        <MessageList messages={messages} onAddReaction={handleAddReaction} />

        <MessageComposer onSend={handleSendMessage} />
      </div>

      <UserDetailsPanel
        name="John Doe"
        avatar="https://i.pravatar.cc/150?img=12"
        role="Student"
      />
    </div>
  );
}