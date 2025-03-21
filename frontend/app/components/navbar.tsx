import { useState, useEffect } from "react";
import { User, Search, Backpack } from "lucide-react";
import { useRouter } from 'next/navigation'

interface NavbarProps {
  user: string;
  onClick: (event: React.MouseEvent<HTMLElement>) => void;
  login: boolean;
  lp: boolean;
}

export default function Navbar({ user, login, onClick, lp }: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const router = useRouter();
  const handleLogo = () => {
    router.push('/');
  }

  useEffect(() => {
    if (isMobileMenuOpen) {
      setTimeout(() => setIsSidebarVisible(true), 10);
    } else {
      setTimeout(() => setIsSidebarVisible(false), 300);
    }
  }, [isMobileMenuOpen]);

  return (
    <nav className="top-0 w-screen flex items-center justify-between py-6 px-10 sm:px-10 md:px-20 lg:px-20 bg-white/80 z-100">
      {/* Logo and Product */}
      <div className="flex items-center space-x-6">
        <div className="text-2xl font-bold text-black/75 cursor-pointer" onClick={handleLogo}>Sustra</div>
        <a className="text-violet-900/80 font-medium hover:text-violet-900 transition duration-100 cursor-pointer" onClick={()=>{router.push('/marketplace')}}>Items</a>
      </div>

      {/* User Icon */}
      {lp && (
        <div className="sm:hidden flex items-center space-x-6">
          <div className="w-10 h-10 bg-purple-300/40 rounded-full flex items-center justify-center">
            <User className="w-6 h-6 text-purple-800" />
          </div>
        </div>
      )}

      {/* Search Bar */}
      {!lp&&login && (
        <div className="hidden sm:flex items-center bg-gray-100 rounded-xl px-4 py-2 w-[45%] shadow-inner">
          <Search className="w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search for items"
            className="ml-2 bg-transparent focus:outline-none text-gray-500 w-full"
          />
        </div>
      )}

      {/* Cart and User */}
      <div className="hidden sm:flex items-center space-x-6">
        {!lp&&login && 
        (<Backpack className="w-11 h-11 text-purple-800 hover:bg-purple-100 cursor-pointer p-2 transition-all duration-500 rounded-lg" onClick={()=>{router.push('/inventory')}} />)}
        <div className="flex items-center space-x-2 hover:bg-purple-100 rounded-lg p-2 cursor-pointer transition duration-500" onClick={()=>{router.push('/profile')}}>
          <div className="w-10 h-10 bg-purple-300/40 rounded-full flex items-center justify-center">
            <User className="w-6 h-6 text-purple-800" />
          </div>
          <span className="italic text-gray-500">{user}</span>
        </div>
      </div>
    </nav>
  );
}