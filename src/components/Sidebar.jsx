import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { RiCloseCircleFill } from 'react-icons/ri';
import { HiOutlineMenu } from 'react-icons/hi';

import { logo } from '../assets';
import { links } from '../assets/constants';

const NavLinks = ({ handleClick }) => (
  <div className="mt-10">
    {links.map((item, index) => (
      <NavLink
        key={index}
        to={item.to}
        onClick={() => handleClick && handleClick()}
        className="flex flex-row justify-start items-center my-8 text-sm font-medium text-gray-400 hover:text-cyan-400 "
      >
        <item.icon className="w-6 h-6 mr-2" />
        {item.name}
      </NavLink>
    ))}
  </div>
);

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <div className="md:flex hidden flex-col w-[240px] py-10 px-4 bg-[#191624] ">
        <img src={logo} alt="logo" className="w-full h-14 object-contain" />
        <NavLinks handleClick />
      </div>

      <div className="absolute md:hidden block top-6 right-3 ">
        {isOpen ? (
          <RiCloseCircleFill
            className="w-6 h-6 text-white mr-2 cursor-pointer"
            onClick={() => setIsOpen(false)}
          />
        ) : (
          <HiOutlineMenu
            className="w-6 h-6 text-white mr-2 cursor-pointer"
            onClick={() => setIsOpen(true)}
          />
        )}
      </div>
      <div
        className={`absolute top-0 h-screen w-1/4 bg-gradient-to-tl from-white/30 to-[#383d8b] backdrop-blur-lg z-10 p-6 md:hidden smooth-transition ${
          isOpen ? 'left-0' : '-left-full'
        }`}
      >
        <img src={logo} alt="logo" className="w-full h-14 object-contain" />
        <NavLinks handleClick={() => setIsOpen(false)} />
      </div>
    </>
  );
};

export default Sidebar;
