"use client";
import MNavbar from "../components/mnavbar";
import Charms from "../components/charms";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/config";
import { Plus } from "lucide-react";

export default function Inventory() {
  const [user, setUser] = useState("Login");
  const [login, setLogin] = useState(false);
  const [email, setEmail] = useState('');
  const router = useRouter();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const displayName = user.displayName;
        setUser(displayName || "Login");
        setLogin(true);
        setEmail(user.email ||'');
      }
    });
  }, []);

  return (
    <div className="h-screen grid grid-rows-[auto_1fr] md:overflow-hidden lg:overflow-hidden">
      {/* Navbar */}
      <MNavbar user={user} email={email} login={login} onClick={() => {}} lp={false}/>

      {/* Main content */}
      <div className="grid grid-cols-5 md:overflow-hidden lg:overflow-hidden">
        {/* Side spacing */}
        <div className="col-span-1"></div>
        {/* CONTAINER */}
        <div className="col-span-5 md:col-span-3 lg:col-span-3 font-poppins sm:pl-6 sm:pr-6 grid grid-rows-[auto_1fr_auto] md:overflow-hidden lg:overflow-hidden">
          {/* TEXT */}
          <div className="text-center md:mt-20 lg:mt-20">
            <h1 className="text-black text-3xl font-[600] mb-1">
              YOUR INVENTORY
            </h1>
            <p className="text-black">Maximum 3 Charms</p>
          </div>
          {/* CHARMS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-8 self-center">
            {/* First charm with custom layout */}
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-1 items-start">
              {/* Charm component - fixed column span */}
              <div className="col-span-1 md:col-span-full">
                <Charms
                  id="1"
                  name="1231"
                  image="https://cdn.discordapp.com/attachments/519834856159444992/1350053846172303361/sigmaconsulting.png?ex=67d5571f&is=67d4059f&hm=0cb711bfd0dac2aba3ce97df3a34277a13a3bafedc7391f7e3690be2f89b4dc7&"
                  variant="1231"
                  quote="123123"
                  isRare={true}
                  category="study"
                />
              </div>

              {/* Expiration text - fixed typo in items-center */}
              <div className="col-span-1 md:col-span-full flex items-center md:mt-2 justify-center w-full h-full">
                <p className="text-sm text-gray-600 md:text-center md:w-full">
                  Expires in <span className="font-bold">24 hrs.</span>
                </p>
              </div>
            </div>
            {Array.from({ length: 2 }).map((_, index) => (
              <div key={index} className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-1 items-start">
                <div className="col-span-1 md:col-span-full">
                  <div className="w-full aspect-[279.67/355.69] border-2 border-dashed border-purple-300 rounded-3xl grid items-center justify-center">
                    <button
                      className="w-12 h-12 bg-purple-100 rounded-full grid items-center justify-center hover:bg-purple-300 transition"
                      onClick={() => {
                        router.push("/marketplace");
                      }}
                    >
                      <Plus className="w-6 h-6 text-purple-600" />
                    </button>
                  </div>
                </div>
                {/* Empty right column on small screens */}
                <div className="col-span-1 md:hidden"></div>
              </div>
            ))}
          </div>
          {/* BUTTON */}
          <div className="text-center sm:mb-6 md:mb-24 lg:mb-24">
            <button className="bg-purple-200 px-6 py-2 rounded-lg text-purple-900 hover:bg-purple-300 transition">
              Random
            </button>
          </div>
        </div>
        {/* Side spacing */}
        <div className="col-span-1"></div>
      </div>
    </div>
  );
}
