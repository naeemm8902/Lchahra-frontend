"use client";
import Link from "next/link";
import WorkSpaceSidebar from "@/components/layouts/workspace/WorkSpaceSidebar";
import { useWorkspace } from '@/context/selectedWorkspaceContext';

const Navbar = () => {
  const { selectedWorkspace } = useWorkspace();
  return (
    <div className="h-16 bg-gray-900 text-white flex items-center px-6">
      <Link href={'/'}>Ichera </Link>
      <div className="px-3">{selectedWorkspace?.name}</div>
    </div>
  );
};
const layout:React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <>
      <Navbar />
      <div className="bg-white dark:bg-gray-900 h-screen flex">
        <WorkSpaceSidebar />
        <div className="flex-1 overflow-y-auto p-6 flex  justify-center text-gray-800 text-2xl">
          {children}
        </div>
      </div>
    </>
  );
}

export default layout