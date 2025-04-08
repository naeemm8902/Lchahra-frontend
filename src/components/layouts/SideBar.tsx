'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '@/context/LoginContext';

const SideBar = () => {
  const { sideBarDisplay } = useAuth();

  return (
    <div
      className={`bg-primary-soft  hover:bg-transparent transition-colors duration-200 w-96 min-w-60 h-screen  ${sideBarDisplay ? 'sticky top-0 ' : 'absolute -left-96'}`}
    >
      <Hero />
      <Menu />
    </div>
  );
};
export default SideBar;

const Hero = () => {
  return (
    <div className="text-center my-4">
      <h1 className="font-bold text-4xl">LCHAHRA</h1>
    </div>
  );
};
const Menu = () => {
  const menu = [
    { label: 'Dashboard', link: '/' },
    { label: 'Join Invitation', link: 'join-invitations' },
  ];
  return (
    <div className="my-4 h-[70%] overflow-auto ">
      <ul className="flex flex-col gap-4 text-center ">
        {menu.map((item, index) => {
          return (
            <Link key={index} href={item.link}>
              <li className="border-y mx-2 py-2 hover:bg-primary-light text-primary-hard  hover:text-white ">
                {item.label}
              </li>
            </Link>
          );
        })}
      </ul>
    </div>
  );
};
