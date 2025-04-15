// ChatArea with call, emoji, GIF, file upload, and mention UI restored
import React, { useRef, useState } from 'react';
import { Phone, Video, Users, Smile, Image as ImageIcon, FileUp, AtSign, Gift } from 'lucide-react';

type User = { _id: string; name: string };
type Message = { _id: string; sender: User; content: string; createdAt: string };
type Chat = { _id: string; name?: string; isGroup: boolean; members: User[] };

interface ChatAreaProps {
  chat: Chat | null;
  messages: Message[];
  onSendMessage: (msg: string) => void;
  onAddUser: () => void;
  onRemoveUser: () => void;
  currentUserId: string;
}

export const ChatArea: React.FC<ChatAreaProps> = ({ chat, messages, onSendMessage, onAddUser, onRemoveUser, currentUserId }) => {
  const [input, setInput] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      onSendMessage(input);
      setInput('');
    }
  };

  // Placeholder handlers for features
  const handleCall = () => alert('Call feature coming soon!');
  const handleVideoCall = () => alert('Video call feature coming soon!');
  const handleHuddle = () => alert('Huddle feature coming soon!');
  const handleEmoji = () => alert('Emoji picker coming soon!');
  const handleGif = () => alert('GIF picker coming soon!');
  const handleFile = () => fileInputRef.current?.click();
  const handleMention = () => setInput(input + '@');
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      alert('File upload feature coming soon!');
    }
  };

  return (
    <div className="flex flex-col flex-1 bg-white dark:bg-gray-900 rounded-lg shadow-lg">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-800 px-6 py-4">
        <div className="flex items-center gap-2">
          {chat?.isGroup ? <Users className="text-blue-500" /> : <Phone className="text-blue-500" />} 
          <span className="font-bold text-lg text-gray-900 dark:text-white">
            {chat?.isGroup ? chat?.name || 'Group Chat' : chat?.members.filter(m => m._id !== currentUserId)[0]?.name || 'Direct Chat'}
          </span>
        </div>
        <div className="flex gap-2">
          <button onClick={handleCall} className="p-2 rounded-full hover:bg-blue-100 dark:hover:bg-blue-800 transition"><Phone size={18} /></button>
          <button onClick={handleVideoCall} className="p-2 rounded-full hover:bg-blue-100 dark:hover:bg-blue-800 transition"><Video size={18} /></button>
          <button onClick={handleHuddle} className="p-2 rounded-full hover:bg-blue-100 dark:hover:bg-blue-800 transition"><Users size={18} /></button>
        </div>
      </div>
      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-2">
        {messages.map(msg => (
          <div key={msg._id} className={`mb-2 ${msg.sender._id === currentUserId ? 'text-right' : 'text-left'}`}> 
            <span className="font-bold">{msg.sender.name}: </span>
            <span>{msg.content}</span>
          </div>
        ))}
      </div>
      {/* Input */}
      <form className="flex items-center gap-2 border-t border-gray-200 dark:border-gray-800 px-6 py-4" onSubmit={handleSend}>
        <button type="button" onClick={handleEmoji} className="p-2 rounded-full hover:bg-blue-50 dark:hover:bg-blue-900 transition" title="Emoji"><Smile size={20} /></button>
        <button type="button" onClick={handleGif} className="p-2 rounded-full hover:bg-blue-50 dark:hover:bg-blue-900 transition" title="GIF"><Gift size={20} /></button>
        <button type="button" onClick={handleFile} className="p-2 rounded-full hover:bg-blue-50 dark:hover:bg-blue-900 transition" title="Upload File"><FileUp size={20} /></button>
        <button type="button" onClick={handleFile} className="p-2 rounded-full hover:bg-blue-50 dark:hover:bg-blue-900 transition" title="Upload Image"><ImageIcon size={20} /></button>
        <button type="button" onClick={handleMention} className="p-2 rounded-full hover:bg-blue-50 dark:hover:bg-blue-900 transition" title="Mention"><AtSign size={20} /></button>
        <input
          type="text"
          className="flex-1 border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-400 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white"
          placeholder="Type a message..."
          value={input}
          onChange={e => setInput(e.target.value)}
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">Send</button>
        <input type="file" ref={fileInputRef} className="hidden" onChange={handleFileChange} />
      </form>
    </div>
  );
};
