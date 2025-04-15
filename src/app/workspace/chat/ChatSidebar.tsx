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
      className={`bg-white dark:bg-gray-900 w-full sm:w-80 md:w-96 h-full flex flex-col z-40 fixed md:sticky top-0 left-0 transition-transform duration-300 ease-in-out shadow-2xl md:shadow-none ${
        isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
      }`}
    >
      <div className="flex items-center justify-between p-4 border-b border-gray-100 dark:border-gray-800">
        <h1 className="font-bold text-xl text-gray-900 dark:text-white flex items-center gap-2">
          <span className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white">
            <Users size={16} />
          </span>
          Conversations
        </h1>
        <button
          onClick={onClose}
          className="md:hidden text-gray-600 dark:text-gray-300 hover:text-blue-600 transition p-2"
        >
          <X size={20} />
        </button>
      </div>

      {/* Search */}
      <div className="p-4">
        <div className="relative">
          <input
            className="w-full bg-gray-100 dark:bg-gray-800 rounded-full py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-600 transition-all duration-300 text-gray-900 dark:text-white"
            placeholder="Search conversations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search
            className="absolute left-3 top-2.5 text-gray-500 dark:text-gray-400"
            size={18}
          />
        </div>
      </div>

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto px-2">
        <div className="mb-4">
          <div className="flex items-center justify-between px-4 py-2">
            <h2 className="font-semibold text-sm text-gray-500 dark:text-gray-400">
              DIRECT MESSAGES
            </h2>
            <button
              onClick={onCreateGroup}
              className="text-blue-600 dark:text-blue-400 hover:text-blue-700 p-1 rounded-full hover:bg-blue-50 dark:hover:bg-blue-900/30 transition"
            >
              <UserPlus size={16} />
            </button>
          </div>
          <ul className="space-y-1">
            {filteredChats
              .filter((chat) => !chat.isGroup)
              .map((chat) => {
                const contact = chat.members.filter((m) => m._id !== 'u1')[0];
                const isSelected = selectedChatId === chat._id;

                return (
                  <li
                    key={chat._id}
                    className={`px-4 py-3 rounded-xl cursor-pointer transition-all duration-200 ease-in-out ${
                      isSelected
                        ? 'bg-blue-600 text-white shadow-md'
                        : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-900 dark:text-white'
                    }`}
                    onClick={() => onSelectChat(chat._id)}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          isSelected
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white'
                        }`}
                      >
                        {contact ? getInitials(contact.name) : '?'}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium truncate">
                          {contact?.name || 'Unknown'}
                        </div>
                        <div
                          className={`text-xs truncate ${isSelected ? 'text-blue-100' : 'text-gray-500 dark:text-gray-400'}`}
                        >
                          Last message...
                        </div>
                      </div>
                      <div
                        className={`text-xs ${isSelected ? 'text-blue-100' : 'text-gray-500 dark:text-gray-400'}`}
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
          <div className="flex items-center justify-between px-4 py-2">
            <h2 className="font-semibold text-sm text-gray-500 dark:text-gray-400">
              GROUP CHATS
            </h2>
            <button
              onClick={onCreateGroup}
              className="text-blue-600 dark:text-blue-400 hover:text-blue-700 p-1 rounded-full hover:bg-blue-50 dark:hover:bg-blue-900/30 transition"
            >
              <Plus size={16} />
            </button>
          </div>
          <ul className="space-y-1 mb-4">
            {filteredChats
              .filter((chat) => chat.isGroup)
              .map((chat) => {
                const isSelected = selectedChatId === chat._id;
                const memberCount = chat.members.length;

                return (
                  <li
                    key={chat._id}
                    className={`px-4 py-3 rounded-xl cursor-pointer transition-all duration-200 ease-in-out ${
                      isSelected
                        ? 'bg-blue-600 text-white shadow-md'
                        : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-900 dark:text-white'
                    }`}
                    onClick={() => onSelectChat(chat._id)}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          isSelected
                            ? 'bg-blue-500 text-white'
                            : 'bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-300'
                        }`}
                      >
                        <Users size={16} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium truncate">
                          {chat.name || 'Group Chat'}
                        </div>
                        <div
                          className={`text-xs truncate ${isSelected ? 'text-blue-100' : 'text-gray-500 dark:text-gray-400'}`}
                        >
                          {memberCount} members
                        </div>
                      </div>
                      <div
                        className={`text-xs ${isSelected ? 'text-blue-100' : 'text-gray-500 dark:text-gray-400'}`}
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
      <div className="p-4 border-t border-gray-100 dark:border-gray-800">
        <button
          onClick={onCreateGroup}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl py-3 flex items-center justify-center gap-2 transition-all duration-300 ease-in-out transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
        >
          <Users size={18} />
          Create New Group
        </button>
      </div>
    </aside>
  );
};

export { ChatSidebar };
