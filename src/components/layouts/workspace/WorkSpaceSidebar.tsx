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
} from 'lucide-react';
import Link from 'next/link';
import {
  EnvelopeIcon,
  UserGroupIcon,
  ClockIcon,
} from '@heroicons/react/24/outline';
import { useRouter } from 'next/router';

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

const ProjectManagementSidebar = () => (
  <div className="space-y-2">
    <h3 className="text-sm font-semibold text-gray-700">Projects</h3>
    {['Website Redesign', 'Mobile App', 'Marketing Campaign'].map(
      (project, index) => (
        <Link
          key={index}
          href="#"
          className="block p-2 text-sm hover:underline text-blue-600"
        >
          {project}
        </Link>
      ),
    )}
  </div>
);

const TimeTrackingSidebar = () => (
  <div className="space-y-2">
    <h3 className="text-sm font-semibold text-gray-700">Time Reports</h3>
    {['Current Week', 'Last Week', 'Monthly Report'].map((report, index) => (
      <Link
        key={index}
        href="#"
        className="block p-2 text-sm hover:underline text-blue-600"
      >
        {report}
      </Link>
    ))}
  </div>
);

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
const WorkSpaceSidebar = () => {
    const [selectedOption, setSelectedOption] = useState("Home");

    return (
      <div className="flex h-screen group">
        <div className="flex flex-col gap-4 px-2 py-4 border-r bg-gray-900 text-white shadow-lg w-16">
          {SIDEBAR_OPTIONS.map(option => (
            <SidebarButton 
              key={option.id} 
              icon={option.icon} 
              label={option.label} 
              isSelected={selectedOption === option.id} 
              onClick={() => setSelectedOption(option.id)} 
            />
          ))}
        </div>
        <div className="w-72 bg-gray-200 hidden group-hover:flex flex-col items-start justify-start p-4 border-r border-r-gray-500 text-gray-900 font-semibold text-lg ">
          {SIDEBAR_OPTIONS.find(opt => opt.id === selectedOption)?.component}
        </div>
      </div>
    );
}

export default WorkSpaceSidebar