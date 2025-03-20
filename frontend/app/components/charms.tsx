"use client"
import { useState } from "react";
import { Plus, Check } from "lucide-react";

interface Charm {
  id: string;
  name: string;
  image: string;
  variant: string;
  quote: string;
  isRare: boolean;
  category: string;
  quantity: number;
  onAddChange?: (id: string, newState: boolean) => void;
  invp: boolean;
}

export default function Charms({ id, name, image, variant, quote, isRare, category, quantity, onAddChange, invp }: Charm) {
  const [add, setAdd] = useState(false);
  const [click, setClick] = useState(false);
  const handleAddClick = () => {
    const newState = !add;
    setAdd(newState);
    if (onAddChange) {
      onAddChange(id, newState); // Notify parent component of the state change
    }
    setTimeout(() => setAdd(false), 2000);
  };

  return (
    <div className="aspect-[279.67/355.69] w-full">
      {/*  Front Card */}
      <div className={`items-center justify-center relative w-full h-full rounded-xl shadow-lg overflow-hidden bg-slate-200/60 border border-gray-200 hover:scale-105 transition duration-150 ${click && "rotate-y-180 hidden transition"} ${!click && "show"}`}>
        {/* Rarity */}
        {isRare && (
          <div className="absolute top-2 right-2 px-2 py-1 text-xs font-bold text-white bg-blue-500 rounded">
            RARE
          </div>
        )}

        {/* Image */}
        <img src={image} alt={name} className="w-full h-[65%] md:h-[70%] lg:h-[80%] object-cover cursor-pointer" onClick={() => setClick(!click)} />

        {/* Card Content */}
        <div className="p-3 justify-between flex flex-row">
          {/* Name & Variant */}
          <div className="mr-2">
            <h2 className="text-sm font-bold text-black flex items-center gap-1">
              {name}
              {category === "LOVE" && "♥️"}
              {category === "STUDY" && "📝"}
              {category === "MONEY" && "💸"}
              {category === "HEALTH" && "🛡️"}
              
            </h2>
            <p className="text-gray-800 text-xs">{variant}</p>
            {!invp && <p className="text-gray-800 text-xs">Stocks : {quantity}</p>}
          </div>
          {isRare || !invp && <button className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-500 
            ${add ? "bg-black" : "bg-white"}`} onClick={handleAddClick}>
            {add ? <Check className="w-4 h-4 cursor-pointer text-white" /> : <Plus className="w-4 h-4 text-gray-700" />}
          </button>}
        </div>
      </div>

      {/* Back Card */}
      <div className={`relative items-center justify-center w-full h-full rounded-xl shadow-lg overflow-hidden bg-slate-200/60 border border-gray-200 hover:scale-105 transition duration-150 ${!click && "rotate-y-180 hidden"} ${click && "show"}`} onClick={() => setClick(!click)}>
        <div className="text-black flex justify-center items-center text-center p-3 h-full w-full">
          <p className="text-sm">{quote}</p>
        </div>
      </div>
    </div>
  );
}