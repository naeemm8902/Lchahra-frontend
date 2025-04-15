import React, { useRef, useState, useEffect } from 'react';
import {
  Phone,
  Video,
  Users,
  Smile,
  Image as ImageIcon,
  FileUp,
  AtSign,
  Gift,
  Send,
  MoreVertical,
} from 'lucide-react';

type User = { _id: string; name: string };
type Message = {
  _id: string;
  sender: User;
  content: string;
  createdAt: string;
};
type Chat = { _id: string; name?: string; isGroup: boolean; members: User[] };

interface ChatAreaProps {
  chat: Chat | null;
  messages: Message[];
  onSendMessage: (msg: string) => void;
  onAddUser: () => void;
  onRemoveUser: () => void;
  currentUserId: string;
}

export const ChatArea: React.FC<ChatAreaProps> = ({
  chat,
  messages,
  onSendMessage,
  onAddUser,
  onRemoveUser,
  currentUserId,
}) => {
  const [input, setInput] = useState('');
  const [showToolbar, setShowToolbar] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      onSendMessage(input);
      setInput('');
    }
  };

  // Placeholder handlers
  const handleCall = () => alert('Call feature coming soon!');
  const handleVideoCall = () => alert('Video call feature coming soon!');
  const handleHuddle = () => alert('Huddle feature coming soon!');
  const handleEmoji = () => alert('Emoji picker coming soon!');
  const handleGif = () => alert('GIF picker coming soon!');
  const handleFile = () => fileInputRef.current?.click();
  const handleMention = () => setInput(input + '@');
  const handleMore = () => alert('More options coming soon!');
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      alert('File upload feature coming soon!');
    }
  };

  if (!chat) {
    return (
      <div className="flex-1 flex items-center justify-center text-gray-500 dark:text-gray-400">
        <div className="text-center p-6 max-w-sm">
          <div className="mb-4 text-blue-500 dark:text-blue-400">
            <svg
              width="64"
              height="64"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="mx-auto"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
          </div>
          <h3 className="text-xl font-semibold mb-2">Select a conversation</h3>
          <p className="text-gray-600 dark:text-gray-400">
            Choose an existing chat or start a new conversation
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col flex-1 bg-white dark:bg-gray-900 rounded-2xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-800">
      {/* Header */}
      <div className="flex items-center justify-between bg-white dark:bg-gray-900 px-6 py-4 border-b border-gray-100 dark:border-gray-800 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white">
            {chat?.isGroup ? (
              <Users size={18} />
            ) : (
              <div className="font-bold">
                {
                  chat?.members.filter((m) => m._id !== currentUserId)[0]
                    ?.name[0]
                }
              </div>
            )}
          </div>
          <div>
            <div className="font-bold text-gray-900 dark:text-white">
              {chat?.isGroup
                ? chat?.name || 'Group Chat'
                : chat?.members.filter((m) => m._id !== currentUserId)[0]
                    ?.name || 'Direct Chat'}
            </div>
            <div className="text-xs text-green-500">Active now</div>
          </div>
        </div>
        <div className="flex gap-3">
          <button
            onClick={handleCall}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition text-gray-700 dark:text-gray-300"
            title="Call"
          >
            <Phone size={18} />
          </button>
          <button
            onClick={handleVideoCall}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition text-gray-700 dark:text-gray-300"
            title="Video Call"
          >
            <Video size={18} />
          </button>
          <button
            onClick={handleMore}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition text-gray-700 dark:text-gray-300"
            title="More Options"
          >
            <MoreVertical size={18} />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4 bg-gray-50 dark:bg-gray-950">
        {messages.map((msg) => {
          const isCurrentUser = msg.sender._id === currentUserId;
          return (
            <div
              key={msg._id}
              className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs sm:max-w-sm md:max-w-md rounded-2xl px-4 py-3 ${
                  isCurrentUser
                    ? 'bg-blue-600 text-white rounded-tr-none'
                    : 'bg-white dark:bg-gray-800 text-gray-800 dark:text-white rounded-tl-none shadow-sm'
                }`}
              >
                {!isCurrentUser && (
                  <div className="font-medium text-xs mb-1 text-gray-500 dark:text-gray-400">
                    {msg.sender.name}
                  </div>
                )}
                <div>{msg.content}</div>
                <div className="text-xs mt-1 text-right opacity-70">
                  {new Date(msg.createdAt).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </div>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="bg-white dark:bg-gray-900 px-4 py-3 border-t border-gray-100 dark:border-gray-800">
        <div className="relative">
          {showToolbar && (
            <div className="absolute bottom-full mb-2 bg-white dark:bg-gray-800 rounded-full shadow-lg p-1 flex gap-1 transition-all duration-200 ease-in-out">
              <button
                onClick={handleEmoji}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300"
                title="Emoji"
              >
                <Smile size={18} />
              </button>
              <button
                onClick={handleGif}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300"
                title="GIF"
              >
                <Gift size={18} />
              </button>
              <button
                onClick={handleFile}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300"
                title="Upload File"
              >
                <FileUp size={18} />
              </button>
              <button
                onClick={handleFile}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300"
                title="Upload Image"
              >
                <ImageIcon size={18} />
              </button>
              <button
                onClick={handleMention}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300"
                title="Mention"
              >
                <AtSign size={18} />
              </button>
            </div>
          )}
          <form
            className="flex items-center gap-2 rounded-full bg-gray-100 dark:bg-gray-800 pr-2"
            onSubmit={handleSend}
          >
            <button
              type="button"
              className="p-3 text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition"
              onClick={() => setShowToolbar(!showToolbar)}
            >
              <Smile size={20} />
            </button>
            <input
              type="text"
              className="flex-1 bg-transparent py-3 px-2 focus:outline-none text-gray-900 dark:text-white"
              placeholder="Type a message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full transition-all duration-300 ease-in-out transform hover:scale-105"
              disabled={!input.trim()}
            >
              <Send size={18} />
            </button>
          </form>
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            onChange={handleFileChange}
          />
        </div>
      </div>
    </div>
  );
};
