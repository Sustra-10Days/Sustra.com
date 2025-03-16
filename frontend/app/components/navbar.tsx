import { useState, useEffect } from "react";
import { User, Search, ShoppingCart, Menu } from "lucide-react";
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
    <nav className="top-0 w-screen flex items-center justify-between py-6 px-10 sm:px-10 md:px-20 lg:px-20 bg-white/80 z-100 sm:block">
      {/* Logo and Product */}
      <div className="flex items-center space-x-6">
      {lp && (<>
        <div className="text-2xl font-bold text-black/75" onClick={handleLogo}>Sustra</div>
        <a className="text-violet-900/80 font-medium hover:text-violet-900 transition duration-100">Product</a>
        </>)}

      {/* Mobile Menu Button */}
      {!lp && (<div className="sm:hidden order-1">
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          <svg className="w-6 h-6 text-violet-900" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
            <line x1="3" y1="15" x2="15" y2="15" />
            <line x1="3" y1="6" x2="21" y2="6" />
          </svg>
        </button>
      </div>)}
      {!lp && (<div className="sm:hidden order-2">


      </div>)}
      {lp && (
        <div className="sm:hidden order-2 sm:order-1">
          <div className="w-10 h-10 bg-purple-300/40 rounded-full flex items-center justify-center">
            <User className="w-6 h-6 text-purple-800" />
          </div>
        </div>)}

      {/* Search Bar */}
      {login && (
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
        {login && (
          <ShoppingCart className="w-11 h-11 text-purple-800 hover:bg-purple-100 cursor-pointer p-2 transition-all duration-500 rounded-lg" />
        )}
        <div className="flex items-center space-x-2 hover:bg-purple-100 rounded-lg p-2 cursor-pointer transition duration-500" onClick={onClick}>
          <div className="w-10 h-10 bg-purple-300/40 rounded-full flex items-center justify-center">
            <User className="w-6 h-6 text-purple-800" />
          </div>
          <span className="italic text-gray-500">{user}</span>
        </div>
      </div>
      </div>

      {/* Mobile Sidebar */}
      {isMobileMenuOpen && (
        <div className="sm:hidden fixed inset-0 bg-black/50 z-40" onClick={() => { setIsMobileMenuOpen(false) }}>
          <div className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-50 transform transition-transform duration-300 ${isSidebarVisible ? 'translate-x-0' : '-translate-x-full'}`}>
            <div className="grid grid-cols-1 grid-rows-5 gap-1 ">
              <div className="h-[20vh] flex items-center justify-center">
                <div className="grid grid-cols-1 grid-rows-4 gap-4">
                  <div className="row-span-2">1</div>
                  <div className="row-start-3">2</div>
                  <div className="row-start-4">3</div>
                </div>
              </div>
              <div className="row-span-4 h-[80vh] ">2</div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}