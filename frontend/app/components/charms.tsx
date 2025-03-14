"use client"
import { useState } from "react";
import { Plus, Check } from "lucide-react";
import { FaHeart } from "react-icons/fa";
interface Charm{
    id: string;
    name: string;
    image: string;
    variant: string;
    quote: string;
    isRare: boolean;
    category: "love" | "study" | "money" | "health";
}
export default function Charms({ id, name, image, variant, quote, isRare, category }: Charm) {
    const [add, setAdd] = useState(false);
    const [click,setClick] = useState(false);
    const handleClick = ()=>{
        const tempclick = click;
        setClick(!tempclick);
    }

    return (
    <div className="m-2 sm:scale-90">
    {/*  Front Card */}
    <div className={`items-center justify-center relative w-52 rounded-xl shadow-lg overflow-hidden bg-slate-200/60 border border-gray-200 hover:scale-105 transition duration-150 ${click && "rotate-y-180 hidden transition"} ${!click && "show"}`}>
      {/* Rarity */}
      {isRare && (
        <div className="absolute top-2 right-2 px-2 py-1 text-xs font-bold text-white bg-blue-500 rounded">
          RARE
        </div>
      )}

      {/* Image */}
      <img src={image} alt={name} className="w-full h-50 object-cover cursor-pointer" onClick={() => setClick(!click)} />

      {/* Card Content */}
      <div className="p-4 py-5 justify-between flex flex-row">
        {/* Name & Variant */}
        <div>
            <h2 className="text-lg font-bold text-black flex items-center gap-2">
            {name}
            {category === "love" && "♥️"}
            {category === "study" && "📝"}
            {category === "money" && "💸"}
            {category === "health" && "🛡️"}
            </h2>
            <p className="text-gray-800 text-sm">{variant}</p>
        </div>
        <button className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 
            ${add ? "bg-black" : "bg-white"}`} onClick={() => setAdd(!add)}>
            {add ? <Check className="w-6 h-6 cursor-pointer text-white" /> : <Plus className="w-6 h-6 text-gray-700" />}
        </button>
        
        
      </div>
    </div>

    {/* Back Card */}
    <div className={`relative w-52 rounded-xl shadow-lg overflow-hidden bg-slate-200/60 border border-gray-200 hover:scale-105 transition duration-150 ${!click && "rotate-y-180 hidden"} ${click && "show"}`} onClick={() => setClick(!click)}>
    <div className="h-72 text-black flex justify-center items-center text-center">
            {quote}
    </div>


    </div>
   
    </div>
    );
}