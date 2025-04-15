'use client';
import React, { useState, ReactNode, useEffect, useRef } from 'react';
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
  FileText,
  ChevronLeft,
  ChevronRight,
  Search,
} from 'lucide-react';
import Link from 'next/link';

// --- Chat Sidebar ---
const ChatSidebar = () => (
  <div className="space-y-1">
    <h3 className="px-2 py-1.5 text-xs font-semibold text-gray-500 tracking-wide uppercase">
      Chat Links
    </h3>
    {['General Chat', 'Team Chat', 'Project Chat'].map((chat, index) => (
      <Link
        key={index}
        href="#"
        className="block px-2 py-1.5 text-[13px] hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-md transition-colors"
      >
        <div className="flex items-center gap-2">
          <MessagesSquare size={16} className="text-gray-400" />
          <span className="truncate">{chat}</span>
        </div>
      </Link>
    ))}
  </div>
);

// --- Project Management Sidebar ---
const ProjectManagementSidebar = () => {
  const statusOrder = {
    Todo: 1,
    'In Progress': 2,
    Done: 3,
  };

  const statusStyles = {
    Todo: { bg: 'bg-gray-100', text: 'text-gray-600' },
    'In Progress': { bg: 'bg-yellow-50', text: 'text-yellow-700' },
    Done: { bg: 'bg-green-50', text: 'text-green-700' },
  };

  const [projects, setProjects] = useState([
    { name: 'Website Redesign', status: 'In Progress' },
    { name: 'Mobile App', status: 'Todo' },
    { name: 'Marketing Campaign', status: 'Done' },
  ]);

  const [searchTerm, setSearchTerm] = useState('');

  const sortedProjects = [...projects]
    .sort(
      (a, b) =>
        statusOrder[a.status as keyof typeof statusOrder] -
        statusOrder[b.status as keyof typeof statusOrder],
    )
    .filter((project) =>
      project.name.toLowerCase().includes(searchTerm.toLowerCase()),
    );

  return (
    <div className="flex flex-col h-full bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="flex items-center justify-between p-3 border-b border-gray-200 dark:border-gray-800">
        <h1 className="font-medium text-sm text-gray-900 dark:text-white flex items-center gap-2">
          <span className="w-5 h-5 bg-purple-600 rounded flex items-center justify-center text-white">
            <FolderKanban size={12} />
          </span>
          Projects
        </h1>
        <button className="text-gray-500 hover:text-purple-600 dark:text-gray-400 dark:hover:text-purple-400 p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
          <Plus size={14} />
        </button>
      </div>

      {/* Search */}
      <div className="p-2">
        <div className="relative">
          <input
            type="text"
            placeholder="Search projects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-gray-100 dark:bg-gray-800 rounded py-1 pl-7 pr-3 text-[13px] focus:outline-none focus:ring-1 focus:ring-purple-400 dark:focus:ring-purple-600 text-gray-900 dark:text-white"
          />
          <Search size={12} className="absolute left-2 top-1.5 text-gray-400" />
        </div>
      </div>

      {/* Projects List */}
      <div className="flex-1 overflow-y-auto">
        <div className="mb-2">
          <div className="px-2 py-1">
            <h2 className="font-semibold text-[11px] text-gray-500 dark:text-gray-400 tracking-wide uppercase">
              Projects
            </h2>
          </div>
          <ul className="space-y-0.5 px-1">
            {sortedProjects.map((project, index) => (
              <li key={index} className="group">
                <button className="w-full flex items-center gap-2 px-2 py-1 rounded text-[13px] hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                  <FolderKanban
                    size={14}
                    className="flex-shrink-0 text-gray-400 group-hover:text-purple-500"
                  />
                  <span className="flex-1 truncate text-left text-gray-700 dark:text-gray-300">
                    {project.name}
                  </span>
                  <span
                    className={`text-[11px] px-1.5 py-0.5 rounded-full flex-shrink-0 min-w-[60px] text-center ${statusStyles[project.status as keyof typeof statusStyles].bg} ${statusStyles[project.status as keyof typeof statusStyles].text}`}
                  >
                    {project.status}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Quick Actions */}
        <div className="px-2 py-1">
          <h2 className="font-semibold text-[11px] text-gray-500 dark:text-gray-400 tracking-wide uppercase">
            Quick Actions
          </h2>
        </div>
        <div className="space-y-0.5 px-1">
          <button className="w-full flex items-center gap-2 px-2 py-1 rounded text-[13px] hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 transition-colors">
            <ListChecks size={14} className="text-gray-400" />
            <span className="truncate">Tasks</span>
          </button>
          <button className="w-full flex items-center gap-2 px-2 py-1 rounded text-[13px] hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 transition-colors">
            <CalendarCheck size={14} className="text-gray-400" />
            <span className="truncate">Calendar</span>
          </button>
          <button className="w-full flex items-center gap-2 px-2 py-1 rounded text-[13px] hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 transition-colors">
            <FileText size={14} className="text-gray-400" />
            <span className="truncate">Docs</span>
          </button>
        </div>
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
          <li
            key={index}
            className="flex items-center gap-2 p-2 rounded hover:bg-blue-50"
          >
            {timer.running ? (
              <PlayCircle size={18} className="text-green-500 animate-pulse" />
            ) : (
              <PauseCircle size={18} className="text-gray-400" />
            )}
            <span className="flex-1 text-gray-800">{timer.label}</span>
            {timer.running && (
              <span className="text-xs text-green-700">Running</span>
            )}
          </li>
        ))}
      </ul>
      <div className="mt-4 space-y-2">
        <button className="w-full flex items-center gap-2 px-3 py-2 rounded bg-blue-100 text-blue-700 hover:bg-blue-200 text-xs">
          <CheckCircle size={16} /> Reports
        </button>
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
    {['John Doe', 'Jane Smith', 'Mike Johnson'].map((member, index) => (
      <Link
        key={index}
        href="#"
        className="block p-2 text-sm hover:underline text-blue-600"
      >
        {member}
      </Link>
    ))}
  </div>
);

const SIDEBAR_OPTIONS = [
  {
    id: 'Home',
    label: 'Home',
    icon: <Home size={20} />,
    component: <HomeSidebar />,
  },
  {
    id: 'Chat',
    label: 'Chat',
    icon: <MessagesSquare size={20} />,
    component: <ChatSidebar />,
  },
  {
    id: 'Project Management',
    label: 'Project Management',
    icon: <Briefcase size={20} />,
    component: <ProjectManagementSidebar />,
  },
  {
    id: 'Time Tracking',
    label: 'Time Tracking',
    icon: <Clock size={20} />,
    component: <TimeTrackingSidebar />,
  },
  {
    id: 'Members Management',
    label: 'Members Management',
    icon: <Users size={20} />,
    component: <MembersManagementSidebar />,
  },
];

const SidebarButton = ({
  icon,
  label,
  isSelected,
  onClick,
  isExpanded,
}: {
  icon: ReactNode;
  label: string;
  isSelected: boolean;
  onClick: () => void;
  isExpanded?: boolean;
}) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-300 w-full ${isSelected ? 'bg-cyan-500 text-white' : 'hover:bg-gray-800'}`}
    title={label}
  >
    {icon}
    {isExpanded && (
      <span className="transition-all duration-300 overflow-hidden">
        {label}
      </span>
    )}
  </button>
);

interface WorkSpaceSidebarProps {
  selected: string;
  onSelect: (id: any) => void;
}

const WorkSpaceSidebar = ({ selected, onSelect }: WorkSpaceSidebarProps) => {
  const [isExpanded, setIsExpanded] = React.useState(true);
  const [contentWidth, setContentWidth] = React.useState(320); // 320px = 20rem (w-80)
  const [isResizing, setIsResizing] = React.useState(false);
  const contentRef = React.useRef<HTMLDivElement>(null);

  const toggleSidebar = () => setIsExpanded(!isExpanded);

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsResizing(true);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isResizing || !contentRef.current) return;

    const containerRect = contentRef.current.getBoundingClientRect();
    const newWidth = e.clientX - containerRect.left;

    // Set min and max width constraints
    if (newWidth >= 200 && newWidth <= 800) {
      setContentWidth(newWidth);
    }
  };

  const handleMouseUp = () => {
    setIsResizing(false);
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  };

  React.useEffect(() => {
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isResizing]);

  return (
    <div className="flex h-screen">
      <div
        className={`flex flex-col gap-4 px-2 py-4 border-r bg-gray-900 text-white shadow-lg transition-all duration-300 ${isExpanded ? 'w-64' : 'w-16'}`}
      >
        <div className="flex justify-end mb-2">
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-lg hover:bg-gray-800 transition"
            title={isExpanded ? 'Collapse sidebar' : 'Expand sidebar'}
          >
            {isExpanded ? (
              <ChevronLeft size={20} />
            ) : (
              <ChevronRight size={20} />
            )}
          </button>
        </div>
        {SIDEBAR_OPTIONS.map((option) => (
          <SidebarButton
            key={option.id}
            icon={option.icon}
            label={option.label}
            isSelected={selected === option.id}
            onClick={() => onSelect(option.id)}
            isExpanded={isExpanded}
          />
        ))}
      </div>
      <div
        ref={contentRef}
        style={{ width: contentWidth }}
        className="relative flex flex-col items-start justify-start p-6 bg-gray-100 border-r border-gray-300 text-gray-900 font-semibold text-lg min-h-screen"
      >
        <div className="w-full h-full overflow-x-hidden overflow-y-auto">
          {SIDEBAR_OPTIONS.find((opt) => opt.id === selected)?.component}
        </div>
        <div
          onMouseDown={handleMouseDown}
          className="absolute top-0 right-0 w-1 h-full cursor-col-resize hover:bg-cyan-500 transition-colors"
        />
      </div>
    </div>
  );
};

export default WorkSpaceSidebar;
