"use client"
import Image from 'next/image';
import { MdOutlineChatBubbleOutline } from "react-icons/md";
import { IoCallOutline } from "react-icons/io5";
import { IoSettingsOutline } from "react-icons/io5";
import { IoLogOutOutline } from "react-icons/io5";
import { CiUser } from "react-icons/ci";
import { IoMdNotificationsOutline } from "react-icons/io";
import { useState } from 'react';
import { useRouter } from 'next/navigation';


export default function Navbar() {
    const [selected, setSelected] = useState(0);
    const router = useRouter();
  
    const handleSelect = (index) => {
      
      setSelected(index);
      
     
    };
    
  
    return (
      <div className="h-screen w-16 bg-black flex flex-col items-center justify-between">
        <Image src="/images/dp.avif" alt="profile image" width={50} height={50} className="rounded-full mt-16 border-violet-700 border-4" />
        <div className='flex flex-col justify-between'>
          <MdOutlineChatBubbleOutline
            size={25}
            className={`my-4 cursor-pointer ${selected === 0 ? 'text-violet-700' : 'text-white'}`}
            onClick={() => handleSelect(0)}
          />
          <IoCallOutline
            size={25}
            className={`my-4 cursor-pointer ${selected === 1 ? 'text-violet-700' : 'text-white'}`}
            onClick={() => handleSelect(1)}
          />
          <CiUser
            size={25}
            className={`my-4 cursor-pointer ${selected === 2 ? 'text-violet-700' : 'text-white'}`}
            onClick={() => handleSelect(2)}
          />
          <IoMdNotificationsOutline
            size={25}
            className={`my-4 cursor-pointer ${selected === 3 ? 'text-violet-700' : 'text-white'}`}
            onClick={() => handleSelect(3)}
          />      
        </div>
        <div className='flex flex-col justify-between'> 
          <IoSettingsOutline size={25} color='white' className='my-4 cursor-pointer ' />
          <IoLogOutOutline size={25} color='white' className='my-4 cursor-pointer ' />
        </div>
      </div>
    );
  }