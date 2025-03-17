"use client";
import MNavbar from "../components/mnavbar";
import { User, Edit, Trash2, Package } from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/config";

export default function Profile() {
    const [user, setUser] = useState("Login");
    const [login, setLogin] = useState(false);
    const [email,setEmail] = useState('');
    const router = useRouter();
  
    useEffect(() => {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          const displayName = user.displayName;
          setUser(displayName || "Login");
          setLogin(true);
          setEmail(user.email||'');
        }
      });
    }, []);
  
    return (
        <div className="min-h-screen w-screen">
            {/* Navbar */}
            <MNavbar user={user} email={email} login={login} onClick={() => {}} lp={false} />
            <div className="flex justify-center items-center flex-grow p-4">
                <section className="bg-white p-10 rounded-lg shadow-xl flex flex-col sm:flex-row justify-between items-center w-full max-w-[90vw] sm:max-w-[60vw] lg:max-w-[65vw]">
                    <div className="flex flex-col sm:flex-row items-center space-x-0 sm:space-x-4 text-center sm:text-left">
                        {/* Profile Icon */}
                        <div className="relative mb-4 sm:mb-0">
                            <div className="w-16 h-16 bg-purple-300/40 rounded-full flex items-center justify-center">
                                <User className="w-8 h-8 text-purple-800" />
                            </div>
                            <div className="absolute bottom-0 right-0 bg-white p-1 rounded-full shadow-md cursor-pointer">
                                <Edit className="w-4 h-4 text-gray-600" />
                            </div>
                        </div>

                        {/* User Info */}
                        <div>
                            <h2 className="text-xl font-semibold text-purple-800">{user}</h2>
                            <p className="text-gray-500">{email}</p>
                            <p className="text-gray-600">Major: <span className="font-semibold">ICE</span></p>
                        </div>
                    </div>

                    {/* Edit Button */}
                    <button className="bg-purple-200 px-6 py-2 mt-4 sm:mt-0 rounded-lg font-semibold drop-shadow-lg text-purple-800 hover:bg-purple-300 transition">
                        Edit
                    </button>
                </section>
            </div>
        </div>    
    );
}