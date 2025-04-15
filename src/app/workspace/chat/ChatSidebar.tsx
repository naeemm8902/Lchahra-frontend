// ChatSidebar implementation restored after migration
import React from 'react';

type User = { _id: string; name: string };
type Chat = { _id: string; name?: string; isGroup: boolean; members: User[] };

interface ChatSidebarProps {
  chats: Chat[];
  selectedChatId: string | null;
  onSelectChat: (id: string) => void;
  onCreateGroup: () => void;
  isOpen: boolean;
  onClose: () => void;
}

const ChatSidebar: React.FC<ChatSidebarProps> = ({ chats, selectedChatId, onSelectChat, onCreateGroup, isOpen, onClose }) => {
  return (
    <aside className={`bg-gray-100 dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 w-72 h-full flex flex-col z-30 fixed md:static top-0 left-0 transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800">
        <span className="font-bold text-lg text-gray-800 dark:text-white">Chats</span>
        <button onClick={onClose} className="md:hidden text-gray-600 dark:text-gray-300 hover:text-blue-600 transition">
          ✕
        </button>
      </div>
      <div className="flex-1 overflow-y-auto">
        <ul className="divide-y divide-gray-200 dark:divide-gray-800">
          {chats.map(chat => (
            <li
              key={chat._id}
              className={`p-4 cursor-pointer hover:bg-blue-50 dark:hover:bg-blue-900/30 transition ${selectedChatId === chat._id ? 'bg-blue-100 dark:bg-blue-900/40 font-bold' : ''}`}
              onClick={() => onSelectChat(chat._id)}
            >
              {chat.isGroup ? (
                <span>👥 {chat.name || 'Group Chat'}</span>
              ) : (
                <span>💬 {chat.members.filter(m => m._id !== 'u1')[0]?.name || 'Direct Chat'}</span>
              )}
            </li>
          ))}
        </ul>
      </div>
      <button onClick={onCreateGroup} className="m-4 px-4 py-2 rounded bg-blue-600 text-white font-bold hover:bg-blue-700 transition">+ New Group</button>
    </aside>
  );
};

export { ChatSidebar };
