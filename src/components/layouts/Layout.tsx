'use client';
import Navbar from './Navbar';
import SideBar from './SideBar';
import { useAuth } from '@/context/LoginContext';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import logo from '../../../public/next.svg';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isLoggedIn } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timeout);
  }, []);

  const handleReload = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 1000);
  };

  return (
    <>
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-opacity-60 backdrop-blur-md z-50">
          <div className="relative flex flex-col items-center p-6 bg-white bg-opacity-10 backdrop-blur-lg rounded-2xl shadow-xl border border-gray-300/20">
            <Image
              src="/vercel.svg"
              alt="Logo"
              width={80}
              height={80}
              className="mb-4 animate-pulse"
            />
            <div className="flex space-x-2">
              <span className="w-4 h-4 bg-blue-400 rounded-full animate-bounce"></span>
              <span className="w-4 h-4 bg-green-400 rounded-full animate-bounce delay-150"></span>
              <span className="w-4 h-4 bg-yellow-400 rounded-full animate-bounce delay-300"></span>
            </div>
            <p className="mt-4 text-black text-lg font-semibold tracking-wide">
              Lchara, please wait...
            </p>
          </div>
        </div>
      )}

      <div className="flex h-screen  bg-gray-100 dark:bg-gray-900  overflow-hidden">
        {isLoggedIn && <SideBar />}
        <div className="w-full flex flex-col min-w-96 relative bg-gray-100 dark:bg-gray-900 transition-all">
          {isLoggedIn && <Navbar />}
          <main className="p-6">{children}</main>
        </div>
      </div>
    </>
  );
};

export default Layout;

