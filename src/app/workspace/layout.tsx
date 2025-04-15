"use client";
import Link from "next/link";
import WorkSpaceSidebar from "@/components/layouts/workspace/WorkSpaceSidebar";
import { useWorkspace } from '@/context/selectedWorkspaceContext';
import { useState } from "react";

// --- Main Content Panels ---
import { ChatPageContent } from "./chat/ChatPageContent";
import { ProjectManagementPanel } from "./project/ProjectManagementPanel";
import { TimeTrackingPanel } from "./timetracking/TimeTrackingPanel";
import { MembersManagementPanel } from "./members/MembersManagementPanel";
import { HomePanel } from "./HomePanel";

const Navbar = () => {
  const { selectedWorkspace } = useWorkspace();
  return (
    <div className="h-16 bg-gray-900 text-white flex items-center px-6">
      <Link href={'/'}>LCHAHRA </Link>
      <div className="px-3">{selectedWorkspace?.name}</div>
    </div>
  );
};

const PANEL_MAP = {
  Home: <HomePanel />,
  Chat: <ChatPageContent />,
  "Project Management": <ProjectManagementPanel />,
  "Time Tracking": <TimeTrackingPanel />,
  "Members Management": <MembersManagementPanel />,
};

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [selectedPanel, setSelectedPanel] = useState<keyof typeof PANEL_MAP>("Chat");
  return (
    <>
      <Navbar />
      <div className="bg-white dark:bg-gray-900 h-screen flex">
        <WorkSpaceSidebar selected={selectedPanel} onSelect={setSelectedPanel} />
        <div className="flex-1 overflow-y-auto p-6 flex justify-center text-gray-800 text-2xl">
          {PANEL_MAP[selectedPanel]}
        </div>
      </div>
    </>
  );
};

export default Layout;