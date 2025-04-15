import { redirect } from 'next/navigation';

// Placeholder data for demonstration
type User = { _id: string, name: string };
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

export default function Page() {
  redirect('/workspace/chat');
  return null;
}
