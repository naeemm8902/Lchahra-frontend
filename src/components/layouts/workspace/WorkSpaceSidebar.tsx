"use client";
import { useState, ReactNode } from "react";
import {
  MessagesSquare,
  Briefcase,
  Clock,
  Users,
  Home,
  Mail,
  ClipboardCheck,
  Plus,
  PlayCircle,
  PauseCircle,
  CheckCircle,
  ListChecks,
  CalendarCheck,
  TimerReset,
  FolderKanban,
  FileText
} from 'lucide-react';
import Link from 'next/link';

// --- Chat Sidebar ---
const ChatSidebar = () => (
  <div className="space-y-2">
    <h3 className="text-sm font-semibold text-gray-700">Chat Links</h3>
    {['General Chat', 'Team Chat', 'Project Chat'].map((chat, index) => (
      <Link
        key={index}
        href="#"
        className="block p-2 text-sm hover:underline text-blue-600"
      >
        {chat}
      </Link>
    ))}
  </div>
);

// --- Project Management Sidebar ---
const ProjectManagementSidebar = () => {
  const [projects, setProjects] = useState([
    { name: 'Website Redesign', status: 'In Progress' },
    { name: 'Mobile App', status: 'Todo' },
    { name: 'Marketing Campaign', status: 'Done' },
  ]);
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-gray-700">Projects</h3>
        <button className="flex items-center gap-1 px-2 py-1 text-xs rounded bg-blue-100 text-blue-600 hover:bg-blue-200">
          <Plus size={14} /> New
        </button>
      </div>
      <ul className="space-y-2">
        {projects.map((project, index) => (
          <li key={index} className="flex items-center gap-2 p-2 rounded hover:bg-blue-50">
            <FolderKanban size={18} className="text-blue-400" />
            <span className="flex-1 text-gray-800">{project.name}</span>
            <span className={`text-xs rounded px-2 py-0.5 ${project.status === 'Done' ? 'bg-green-100 text-green-700' : project.status === 'In Progress' ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-200 text-gray-600'}`}>{project.status}</span>
          </li>
        ))}
      </ul>
      <div className="mt-4 space-y-2">
        <button className="w-full flex items-center gap-2 px-3 py-2 rounded bg-purple-100 text-purple-700 hover:bg-purple-200 text-xs"><ListChecks size={16}/> Tasks</button>
        <button className="w-full flex items-center gap-2 px-3 py-2 rounded bg-blue-100 text-blue-700 hover:bg-blue-200 text-xs"><CalendarCheck size={16}/> Calendar</button>
        <button className="w-full flex items-center gap-2 px-3 py-2 rounded bg-gray-100 text-gray-700 hover:bg-gray-200 text-xs"><FileText size={16}/> Docs</button>
      </div>
    </div>
  );
};

// --- Time Tracking Sidebar ---
const TimeTrackingSidebar = () => {
  const [timers, setTimers] = useState([
    { label: 'Current Week', running: true },
    { label: 'Last Week', running: false },
    { label: 'Monthly Report', running: false },
  ]);
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-gray-700">Time Tracking</h3>
        <button className="flex items-center gap-1 px-2 py-1 text-xs rounded bg-blue-100 text-blue-600 hover:bg-blue-200">
          <TimerReset size={14} /> Start
        </button>
      </div>
      <ul className="space-y-2">
        {timers.map((timer, index) => (
          <li key={index} className="flex items-center gap-2 p-2 rounded hover:bg-blue-50">
            {timer.running ? <PlayCircle size={18} className="text-green-500 animate-pulse" /> : <PauseCircle size={18} className="text-gray-400" />}
            <span className="flex-1 text-gray-800">{timer.label}</span>
            {timer.running && <span className="text-xs text-green-700">Running</span>}
          </li>
        ))}
      </ul>
      <div className="mt-4 space-y-2">
        <button className="w-full flex items-center gap-2 px-3 py-2 rounded bg-blue-100 text-blue-700 hover:bg-blue-200 text-xs"><CheckCircle size={16}/> Reports</button>
      </div>
    </div>
  );
};

// --- Members Management Sidebar ---
const MembersManagementSidebar = () => {
  const navLinks = [
    {
      text: 'Invites',
      link: '/workspace/members/invite',
      icon: <Mail className="w-5 h-5 text-blue-600" />,
    },
    {
      text: 'Members',
      link: '/workspace/members/list',
      icon: <Users className="w-5 h-5 text-blue-600" />,
    },
    {
      text: 'Pending Invitations',
      link: '/workspace/members/invitations',
      icon: <ClipboardCheck className="w-5 h-5 text-blue-600" />,
    },
  ];

  return (
    <div className="">
      <h3 className="text-lg font-semibold text-gray-800">
        Members Management
      </h3>
      {navLinks.map((link, index) => (
        <Link
          key={index}
          href={link.link}
          className="flex items-center space-x-3 p-3 rounded-lg text-sm text-gray-700 hover:w-full hover:bg-blue-100 hover:text-blue-600 transition-all duration-200"
        >
          {link.icon}
          <span>{link.text}</span>
        </Link>
      ))}
    </div>
  );
};

// --- Home Sidebar ---
const HomeSidebar = () => (
  <div className="space-y-2">
    <h3 className="text-sm font-semibold text-gray-700">Home</h3>
    {["John Doe", "Jane Smith", "Mike Johnson"].map((member, index) => (
      <Link key={index} href="#" className="block p-2 text-sm hover:underline text-blue-600">{member}</Link>
    ))}
  </div>
);

const SIDEBAR_OPTIONS = [
  { id: "Home", label: "Home", icon: <Home size={20} />, component: <HomeSidebar /> },
  { id: "Chat", label: "Chat", icon: <MessagesSquare size={20} />, component: <ChatSidebar /> },
  { id: "Project Management", label: "Project Management", icon: <Briefcase size={20} />, component: <ProjectManagementSidebar /> },
  { id: "Time Tracking", label: "Time Tracking", icon: <Clock size={20} />, component: <TimeTrackingSidebar /> },
  { id: "Members Management", label: "Members Management", icon: <Users size={20} />, component: <MembersManagementSidebar /> },
];

const SidebarButton = ({ icon, label, isSelected, onClick  }: { icon: ReactNode; label: string; isSelected: boolean; onClick: () => void }) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-3 p-3 rounded-lg transition w-full ${isSelected ? "bg-cyan-500 text-white" : "hover:bg-gray-800"}`}
    title={label}
  >
    {icon}
  </button>
);

interface WorkSpaceSidebarProps {
  selected: string;
  onSelect: (id: any) => void;
}

const WorkSpaceSidebar = ({ selected, onSelect }: WorkSpaceSidebarProps) => {
  return (
    <div className="flex h-screen">
      <div className="flex flex-col gap-4 px-2 py-4 border-r bg-gray-900 text-white shadow-lg w-16">
        {SIDEBAR_OPTIONS.map(option => (
          <SidebarButton 
            key={option.id} 
            icon={option.icon} 
            label={option.label} 
            isSelected={selected === option.id} 
            onClick={() => onSelect(option.id)} 
          />
        ))}
      </div>
      <div className="w-80 bg-gray-100 flex flex-col items-start justify-start p-6 border-r border-gray-300 text-gray-900 font-semibold text-lg min-h-screen">
        {SIDEBAR_OPTIONS.find(opt => opt.id === selected)?.component}
      </div>
    </div>
  );
};

export default WorkSpaceSidebar;