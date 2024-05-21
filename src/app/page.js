"use client";
import Typewriter from 'typewriter-effect';
import styles from '../styles.module.css';
import { useState } from 'react';
import { useRouter } from 'next/navigation'

const HomePage = () => {
  const [showButton, setShowButton] = useState(false);
  const router = useRouter();

  return(
    <div className=" h-screen w-screen bg-black flex flex-col items-center justify-center ">
      <div className='flex items-center justify-center pb-10'>
        <Typewriter
          onInit={(typewriter) => {
            typewriter.typeString('<span class=" text-5xl text-violet-700 font-bold">Welcome to Conversify!</span>')
              .callFunction(() => {
                console.log('String typed out!');
              })
              .pauseFor(2500)
              .deleteAll()
              .callFunction(() => {
                console.log('All strings were deleted');
              })
              .start();
            typewriter.typeString('<span class=" text-5xl text-violet-700 font-bold">Connect with friends and start chatting now.</span>')
              .callFunction(() => {
                console.log('String typed out!');
                setShowButton(true);
              })
              .pauseFor(2500)
              .start();
          }}
        />
      </div> 
      <button className={`${styles['button-50']} ${showButton ? 'opacity-100' : 'opacity-0'}`} onClick={()=>router.push('/auth/signUp')} >
        Enter Now
      </button>
    </div>
    
  )
}

export default HomePage;

