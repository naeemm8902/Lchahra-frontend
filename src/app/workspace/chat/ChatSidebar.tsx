import React, { useState } from 'react';
import { Users, Search, Plus, X, UserPlus } from 'lucide-react';

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

const getInitials = (name: string) => {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase();
};

const ChatSidebar: React.FC<ChatSidebarProps> = ({
  chats,
  selectedChatId,
  onSelectChat,
  onCreateGroup,
  isOpen,
  onClose,
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredChats = searchTerm
    ? chats.filter(
        (chat) =>
          (chat.isGroup && chat.name
            ? chat.name.toLowerCase().includes(searchTerm.toLowerCase())
            : false) ||
          (!chat.isGroup &&
            chat.members.some((m) =>
              m.name.toLowerCase().includes(searchTerm.toLowerCase()),
            )),
      )
    : chats;

  return (
    <aside
      className={`bg-white dark:bg-gray-900 w-full sm:w-64 md:w-72 h-full flex flex-col z-40 fixed md:sticky top-0 left-0 transition-transform duration-300 ease-in-out shadow-2xl md:shadow-none ${
        isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
      }`}
    >
      <div className="flex items-center justify-between p-2 border-b border-gray-100 dark:border-gray-800">
        <h1 className="font-medium text-sm text-gray-900 dark:text-white flex items-center gap-2">
          <span className="w-5 h-5 bg-blue-600 rounded flex items-center justify-center text-white">
            <Users size={12} />
          </span>
          Conversations
        </h1>
        <button
          onClick={onClose}
          className="md:hidden text-gray-600 dark:text-gray-300 hover:text-blue-600 transition p-1"
        >
          <X size={16} />
        </button>
      </div>

      {/* Search */}
      <div className="p-2">
        <div className="relative">
          <input
            className="w-full bg-gray-100 dark:bg-gray-800 rounded py-1 pl-7 pr-3 text-[13px] focus:outline-none focus:ring-1 focus:ring-blue-400 dark:focus:ring-blue-600 transition-all duration-300 text-gray-900 dark:text-white"
            placeholder="Search conversations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search
            className="absolute left-2 top-1.5 text-gray-500 dark:text-gray-400"
            size={12}
          />
        </div>
      </div>

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto">
        <div className="mb-2">
          <div className="flex items-center justify-between px-2 py-1">
            <h2 className="font-semibold text-[11px] text-gray-500 dark:text-gray-400 tracking-wide uppercase">
              Direct Messages
            </h2>
            <button
              onClick={onCreateGroup}
              className="text-gray-400 hover:text-blue-600 dark:text-gray-500 dark:hover:text-blue-400 p-0.5 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <UserPlus size={14} />
            </button>
          </div>
          <ul className="space-y-0. px-1">
            {filteredChats
              .filter((chat) => !chat.isGroup)
              .map((chat) => {
                const contact = chat.members.filter((m) => m._id !== 'u1')[0];
                const isSelected = selectedChatId === chat._id;

                return (
                  <li
                    key={chat._id}
                    className={`px-2 py-1 rounded cursor-pointer transition-colors duration-100 ${
                      isSelected
                        ? 'bg-blue-600 text-white'
                        : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-900 dark:text-white'
                    }`}
                    onClick={() => onSelectChat(chat._id)}
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-6 h-6 rounded flex items-center justify-center text-[11px] font-medium ${
                          isSelected
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white'
                        }`}
                      >
                        {contact ? getInitials(contact.name) : '?'}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-[13px] font-medium truncate">
                          {contact?.name || 'Unknown'}
                        </div>
                        <div
                          className={`text-[11px] truncate ${isSelected ? 'text-blue-100' : 'text-gray-500 dark:text-gray-400'}`}
                        >
                          Last message...
                        </div>
                      </div>
                      <div
                        className={`text-[10px] ${isSelected ? 'text-blue-100' : 'text-gray-500 dark:text-gray-400'}`}
                      >
                        Now
                      </div>
                    </div>
                  </li>
                );
              })}
          </ul>
        </div>

        <div>
          <div className="flex items-center justify-between px-2 py-1">
            <h2 className="font-semibold text-[11px] text-gray-500 dark:text-gray-400 tracking-wide uppercase">
              Group Chats
            </h2>
            <button
              onClick={onCreateGroup}
              className="text-gray-400 hover:text-blue-600 dark:text-gray-500 dark:hover:text-blue-400 p-0.5 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <Plus size={14} />
            </button>
          </div>
          <ul className="space-y-0.5 px-1 mb-2">
            {filteredChats
              .filter((chat) => chat.isGroup)
              .map((chat) => {
                const isSelected = selectedChatId === chat._id;
                const memberCount = chat.members.length;

                return (
                  <li
                    key={chat._id}
                    className={`px-2 py-1 rounded cursor-pointer transition-colors duration-100 ${
                      isSelected
                        ? 'bg-theme text-white'
                        : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-900 dark:text-white'
                    }`}
                    onClick={() => onSelectChat(chat._id)}
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-6 h-6 rounded flex items-center justify-center ${
                          isSelected
                            ? 'bg-blue-500 text-white'
                            : 'bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-300'
                        }`}
                      >
                        <Users size={12} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-[13px] font-medium truncate">
                          {chat.name || 'Group Chat'}
                        </div>
                        <div
                          className={`text-[11px] truncate ${isSelected ? 'text-blue-100' : 'text-gray-500 dark:text-gray-400'}`}
                        >
                          {memberCount} members
                        </div>
                      </div>
                      <div
                        className={`text-[10px] ${isSelected ? 'text-blue-100' : 'text-gray-500 dark:text-gray-400'}`}
                      >
                        Now
                      </div>
                    </div>
                  </li>
                );
              })}
          </ul>
        </div>
      </div>

      {/* New Group Button */}
      <div className="p-2 border-t border-gray-100 dark:border-gray-800">
        <button
          onClick={onCreateGroup}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white text-[13px] font-medium rounded py-1.5 flex items-center justify-center gap-1.5 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
        >
          <Users size={14} />
          Create New Group
        </button>
      </div>
    </aside>
  );
};

export { ChatSidebar };
