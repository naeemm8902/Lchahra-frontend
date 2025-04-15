import { ChatSidebar } from './ChatSidebar';
import { ChatArea } from './ChatArea';
import React, { useState } from 'react';

type User = { _id: string; name: string };
type Chat = {
  _id: string;
  name?: string;
  isGroup: boolean;
  members: User[];
};
type Message = {
  _id: string;
  sender: User;
  content: string;
  createdAt: string;
};

const mockUser: User = { _id: 'u1', name: 'You' };
const mockChats: Chat[] = [
  { _id: 'c1', isGroup: false, members: [mockUser, { _id: 'u2', name: 'Alice' }] },
  { _id: 'c2', isGroup: true, name: 'Project Team', members: [mockUser, { _id: 'u2', name: 'Alice' }, { _id: 'u3', name: 'Bob' }] },
];
const mockMessages: Message[] = [
  { _id: 'm1', sender: mockUser, content: 'Hello!', createdAt: new Date().toISOString() },
  { _id: 'm2', sender: { _id: 'u2', name: 'Alice' }, content: 'Hi there!', createdAt: new Date().toISOString() },
];

export const ChatPageContent = () => {
  const [selectedChatId, setSelectedChatId] = useState<string | null>(mockChats[0]?._id || null);
  const [chats] = useState<Chat[]>(mockChats);
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const selectedChat = chats.find(c => c._id === selectedChatId) || null;

  const handleSendMessage = (msg: string) => {
    setMessages(prev => [
      ...prev,
      { _id: Math.random().toString(), sender: mockUser, content: msg, createdAt: new Date().toISOString() }
    ]);
  };
  const handleCreateGroup = () => alert('Show create group modal');
  const handleAddUser = () => alert('Show add user modal');
  const handleRemoveUser = () => alert('Show remove user modal');

  return (
    <div className="flex h-full w-full relative">
      <button
        className="fixed top-5 left-5 z-40 md:hidden bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition md:hidden"
        onClick={() => setSidebarOpen(true)}
        aria-label="Open sidebar"
      >
        <svg width="28" height="28" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16"/></svg>
      </button>
      <ChatSidebar
        chats={chats}
        selectedChatId={selectedChatId}
        onSelectChat={(id: string) => { setSelectedChatId(id); setSidebarOpen(false); }}
        onCreateGroup={handleCreateGroup}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
      <div className="flex-1 flex min-w-0">
        <ChatArea
          chat={selectedChat}
          messages={messages}
          onSendMessage={handleSendMessage}
          onAddUser={handleAddUser}
          onRemoveUser={handleRemoveUser}
          currentUserId={mockUser._id}
        />
      </div>
    </div>
  );
};
