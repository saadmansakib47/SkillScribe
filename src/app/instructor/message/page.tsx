"use client";

import { useState } from "react";
import InstructorLayout from "@/app/instructor/instructorlayout";

import ConversationList from "@/components/messages/conversationList";
import ChatHeader from "@/components/messages/chatHeader";
import MessageList from "@/components/messages/messageList";
import MessageComposer from "@/components/messages/messageComposer";
import UserDetailsPanel from "@/components/messages/userDetailsPanel";

import { Conversation, Message } from "@/components/messages/types";

export default function InstructorMessages() {
  const [selectedChat, setSelectedChat] = useState<number | null>(1);

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

  const messages: Message[] = [
    { id: 1, text: "Hello instructor!", sender: "them", timestamp: "10:21 AM" },
    { id: 2, text: "Hi, how can I help?", sender: "me", timestamp: "10:22 AM" },
    { id: 3, text: "I have a question about module 2.", sender: "them", timestamp: "10:23 AM" },
  ];

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

        <MessageList messages={messages} />

        <MessageComposer onSend={(msg) => console.log("Sent:", msg)} />
      </div>

      <UserDetailsPanel
        name="John Doe"
        avatar="https://i.pravatar.cc/150?img=12"
        role="Student"
      />
    </div>
  );
}
