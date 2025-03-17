'use client'
import Navbar from "../components/navbar";
import { auth } from '../firebase/config';
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from 'next/navigation';

export default function Landing() {
  const [user, setUser] = useState('Login');
  const [login, setLogin] = useState(false);
  const router = useRouter();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const displayName = user.displayName
        setUser(displayName || 'Login');
        setLogin(true);
      }
    })
  }, []);

  const handleGetStarted = () => {
    if (login) {
      router.push('/marketplace');
    }
    else {
      router.push('/login');
    }
  }

  const handleUserClick = () => {
    if (login) {
      router.push('/profile');
    }
    else {
      router.push('/login')
    }
  }

  return (
    <main className="grid grid-cols-3 grid-rows-5 gap-1 min-h-screen bg-white overflow-hidden">
      <div className="col-span-3">
        <Navbar user={user} login={login} onClick={handleUserClick} lp={true} />
      </div>
      {/* Circles */}
      <div className="col-span-3 row-span-4 row-start-2 flex flex-col items-center justify-center">
        <div className="flex items-center justify-center gap-[-10vw]">
          <div className="relative w-48 h-48 lg:w-64 lg:h-64 bg-violet-400 rounded-full mix-blend-multiply filter blur-2xl opacity-60 animate-blob animation-delay-2000 translate-y-20 translate-x-30 lg:translate-x-40 lg:translate-y-20"></div>
          <div className="relative w-48 h-48 lg:w-64 lg:h-64 bg-pink-400 rounded-full mix-blend-multiply filter blur-2xl opacity-60 animate-blob "></div>
          <div className="relative w-48 h-48 lg:w-64 lg:h-64 bg-teal-200 rounded-full filter blur-2xl opacity-70 animate-blob animation-delay-4000 z-5 translate-y-20 -translate-x-30 lg:-translate-x-40 lg:translate-y-20"></div>
        </div>
        {/* Text */}
        <div className="relative z-10 -translate-y-50 px-4 text-center font-poppins">
          <h1 className="text-5xl font-extrabold text-black/75 mb-4">
            Sustra
          </h1>
          <p className="text-xl max-w-[75vw] lg:max-w-[25vw] text-black/50 mx-auto py-2 mb-7">
            Empower the heart to move toward success
          </p>
          <button className="bg-black/70 rounded-3xl p-3 px-10 drop-shadow-lg font-bold text-white hover:scale-105 transition duration-200" onClick={handleGetStarted}>Get Started</button>
        </div>
      </div>
    </main>
  );
}