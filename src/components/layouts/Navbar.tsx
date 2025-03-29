'use client';
import { useState, useEffect } from 'react';
import { useAuth } from '@/context/LoginContext';
import { useRouter } from 'next/navigation';
import { Menu, Search } from 'lucide-react';
import useApiCall from '../../helpers/useApiCall';

const Navbar = () => {
  const { isLoggedIn, toggleSidebarDisplay } = useAuth();

  if (!isLoggedIn) return null; // Prevent rendering when not logged in

  return (
    <div className="flex justify-between items-center p-4">
      {/* Sidebar Toggle */}
      <div>
        <Menu
          className="hover:scale-110 hover:bg-white rounded-full cursor-pointer p-2"
          onClick={() => toggleSidebarDisplay()}
          size={38}
        />
      </div>

      {/* Search Box */}
      <div className="relative w-full max-w-md">
        <Search className="absolute left-3 top-2.5 text-gray-500" size={18} />
        <input
          type="text"
          placeholder="Search..."
          className="w-full pl-10 pr-4 py-2 rounded-full bg-white border border-gray-300 focus:ring-2 focus:ring-gray-400 focus:border-gray-400 outline-none"
        />
      </div>

      {/* User Dropdown */}
      <UserDropdown />
    </div>
  );
};

export default Navbar;

const UserDropdown: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { logout } = useAuth();
  const router = useRouter();
  const { request, isLoading } = useApiCall();
  const [user1, setUser1] = useState<{ name: string } | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await request({ method: 'GET', url: 'users' });
        console.log('user details', data);
        setUser1(data[0]);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };
    fetchUser();
  }, []); // <- Empty dependency array ensures it runs only once

  const userName = user1?.name || 'User';
  const nameParts = userName.split(' ');
  console.log('username is', userName);
  const userInitial =
    nameParts.length > 1
      ? nameParts[0].charAt(0).toUpperCase() +
        nameParts[nameParts.length - 1].charAt(0).toUpperCase()
      : nameParts[0].charAt(0).toUpperCase();

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 bg-primary-hard w-10 h-10 rounded-full text-white font-bold text-lg justify-center transition relative group"
      >
        {isLoading ? '...' : userInitial}
        <div className="absolute top-12 left-1/2 transform -translate-x-1/2 bg-primary-hard text-white text-xs px-2 py-1 rounded-md opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity">
          {userName}
        </div>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg border border-gray-200 overflow-hidden">
          <ul className="text-gray-700">
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
              Profile
            </li>
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
              Settings
            </li>
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Help</li>
            <li
              className="px-4 py-2 text-red-500 hover:bg-red-100 cursor-pointer"
              onClick={() => {
                sessionStorage.removeItem('loginUser');
                sessionStorage.removeItem('accesToken');
                sessionStorage.removeItem('refreshToken');
                logout();
                router.push('/login');
              }}
            >
              Logout
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};
