import { User, Search, ShoppingCart } from "lucide-react";
export default function Navbar() {
  return (
    <nav className="absolute top-0 left-0 w-full flex items-center justify-between py-6 px-20 bg-white/80">
      {/* Logo and Product */}
      <div className="flex items-center space-x-6">
        <div className="text-2xl font-bold text-black/75">Logo</div>
        <a href="#" className="text-violet-900/80 font-medium hover:text-violet-900 transition duration-100">Product</a>
      </div>

      {/* Search Bar */}
      <div className="flex items-center bg-gray-100 rounded-xl px-4 py-2 w-[45%] shadow-inner">
        <Search className="w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search for items"
          className="ml-2 bg-transparent focus:outline-none text-gray-500 w-full"
        />
      </div>

      {/*Cart and User*/}
      <div className="flex items-center space-x-6">
        <ShoppingCart className="w-6 h-6 text-purple-800 cursor-pointer" />
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-purple-300/40 rounded-full flex items-center justify-center">
            <User className="w-6 h-6 text-purple-800" />
          </div>
          <span className="italic text-gray-500">Username</span>
        </div>
      </div>
    </nav>
  );
}