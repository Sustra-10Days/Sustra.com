import { useState, useEffect } from "react";
import { User, Search, Backpack, Menu, Home, ShoppingBag } from "lucide-react";
import { useRouter } from 'next/navigation'
import { auth } from '@/app/firebase/config'

interface MNavbarProps {
    user: string;
    email: string;
    onClick: (event: React.MouseEvent<HTMLElement>) => void;
    login: boolean;
    lp: boolean;
}

export default function MNavbar({ user, email,login, onClick, lp }: MNavbarProps) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [showSidebar, setShowSidebar] = useState(false);
    const router = useRouter();
    const handleLogo = () => {
        router.push('/');
    }

    useEffect(() => {
        if (isMobileMenuOpen) {
            setShowSidebar(true);
            setTimeout(() => setIsVisible(true), 10);
        } else {
            setIsVisible(false);
            const timer = setTimeout(() => setShowSidebar(false), 300);
            return () => clearTimeout(timer);
        }
    }, [isMobileMenuOpen]);

    const closeSidebar = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsMobileMenuOpen(false);
    }

    return (
        <nav className="top-0 w-screen flex items-center justify-between py-6 px-10 sm:px-10 md:px-20 lg:px-20 bg-white/80 z-100">
            {/* Logo and Product */}
            <div className=" hidden sm:block">
                <div className="flex items-center space-x-6">
                    <div className="text-2xl font-bold text-black/75 cursor-pointer" onClick={handleLogo}>Sustra</div>
                    <a className="text-violet-900/80 font-medium hover:text-violet-900 transition duration-100 cursor-pointer onClick={()=>{router.push('/marketplace')}}">Items</a>
                </div>
            </div>
            {/* Mobile Menu Button */}
            {!lp && (
                <div className="sm:hidden flex items-center space-x-6">
                    <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                        <svg className="w-6 h-6 text-violet-900" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="3" y1="15" x2="15" y2="15" />
                            <line x1="3" y1="6" x2="21" y2="6" />
                        </svg>
                    </button>
                </div>
            )}
            {!lp && (
                <div className="sm:hidden flex items-center space-x-6">
                    <Backpack className="w-11 h-11 text-purple-800 hover:bg-purple-100 cursor-pointer p-2 transition-all duration-500 rounded-lg" onClick={()=>{router.push('/inventory')}} />
                </div>
            )}
            {/* User Icon */}
            {lp && (
                <div className="sm:hidden flex items-center space-x-6">
                    <div className="w-10 h-10 bg-purple-300/40 rounded-full flex items-center justify-center">
                        <User className="w-6 h-6 text-purple-800" />
                    </div>
                </div>
            )}
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
                    <Backpack className="w-11 h-11 text-purple-800 hover:bg-purple-100 cursor-pointer p-2 transition-all duration-500 rounded-lg" onClick={()=>{router.push('/inventory')}} />
                )}
                <div className="flex items-center space-x-2 hover:bg-purple-100 rounded-lg p-2 cursor-pointer transition duration-500" onClick={()=>{router.push('/profile')}}>
                    <div className="w-10 h-10 bg-purple-300/40 rounded-full flex items-center justify-center">
                        <User className="w-6 h-6 text-purple-800" />
                    </div>
                    <span className="italic text-gray-500">{user}</span>
                </div>
            </div>

            {/* Mobile Sidebar */}
            {showSidebar && (
                <>
                    <div
                        className={`sm:hidden fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
                        onClick={closeSidebar}
                    >
                        <div
                            className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${isVisible ? 'translate-x-0' : '-translate-x-full'}`}
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* User Profile */}
                            <div className="p-6 flex flex-col border-b">
                                <div className="w-16 h-16 bg-purple-300/40 rounded-full flex items-center justify-center">
                                    <User className="w-8 h-8 text-purple-800" />
                                </div>
                                <h2 className="mt-2 text-purple-800 font-semibold text-lg">{user}</h2>
                                <p className="text-sm text-gray-500">{email}</p>
                            </div>

                            {/* Navigation */}
                            <nav className="p-6 space-y-4">
                                <a
                                    onClick={() => {
                                        router.push('/landing');
                                        setIsMobileMenuOpen(false);
                                    }}
                                    className="flex items-center gap-3 text-lg text-purple-800 hover:text-purple-900 cursor-pointer"
                                >
                                    <Home className="w-6 h-6 text-gray-500" /> Home
                                </a>
                                <a
                                    onClick={() => {
                                        router.push('/marketplace');
                                        setIsMobileMenuOpen(false);
                                    }}
                                    className="flex items-center gap-3 text-lg text-purple-800 hover:text-purple-900 cursor-pointer"
                                >
                                    <ShoppingBag className="w-6 h-6 text-gray-500" /> Items
                                </a>
                                <a
                                    onClick={() => {
                                        router.push('/inventory');
                                        setIsMobileMenuOpen(false);
                                    }}
                                    className="flex items-center gap-3 text-lg text-purple-800 hover:text-purple-900 cursor-pointer"
                                >
                                    <Backpack className="w-6 h-6 text-gray-500" /> Inventory
                                </a>
                                <a
                                    onClick={() => {
                                        router.push('/profile');
                                        setIsMobileMenuOpen(false);
                                    }}
                                    className="flex items-center gap-3 text-lg text-purple-800 hover:text-purple-900 cursor-pointer"
                                >
                                    <User className="w-6 h-6 text-gray-500" /> Profile
                                </a>
                            </nav>
                        </div>
                    </div>
                </>
            )}
        </nav>
    );
}