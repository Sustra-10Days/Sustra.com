'use client'
import Navbar from "../components/navbar";
import {auth} from '../firebase/config';
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import {useRouter} from 'next/navigation';

export default function Landing() {
  const [user,setUser] = useState('Username');
  const [login,setLogin] = useState(false);
  const router = useRouter();

  useEffect(()=>{
    onAuthStateChanged(auth, (user)=>{
      if (user){
        const displayName = user.displayName
        setUser(displayName || 'Username');
        setLogin(true);
      }
    })
  },[]);

  const handleGetStarted = ()=>{
    if(login){
      router.push('/marketplace');
    }
    else{
      router.push('/login');
    }
  }

  const handleUserClick = ()=>{
    if(login){
      router.push('/profile');
    }
    else{
      router.push('/l')
    }
  }

  return (
    <main className="relative flex items-center justify-center min-h-screen bg-white overflow-hidden">
      <Navbar user={user} login ={login} onClick={handleUserClick} />
      {/* Circles */}
      <div className="absolute flex items-center justify-center">
        <div className="absolute -translate-x-32 translate-y-5 w-[25vw] h-[25vw] bg-violet-400 rounded-full mix-blend-multiply filter blur-2xl opacity-60 animate-blob animation-delay-2000"></div>
        <div className="absolute translate-x-32 translate-y-5 w-[25vw] h-[25vw] bg-teal-200 rounded-full filter blur-2xl opacity-70 animate-blob animation-delay-4000 z-5"></div>
        <div className="absolute -translate-y-24 w-[25vw] h-[25vw] bg-pink-400 rounded-full mix-blend-multiply filter blur-2xl opacity-60 animate-blob"></div>
      </div>
      {/* Text */}
      <div className="relative z-10 -translate-y-6 px-4 text-center font-poppins">
        <h1 className="text-5xl font-extrabold text-black/75 mb-4">
          Sustra  
        </h1>
        <p className="text-xl max-w-[25vw] text-black/50 mx-auto py-2 mb-7">
           Empower the heart to move toward success
        </p>
        <button className="bg-black/70 rounded-3xl p-3 px-10 drop-shadow-lg font-bold text-white hover:scale-105 transition duration-200" onClick={handleGetStarted}>Get Started</button>
      </div>
    </main>
  );
}