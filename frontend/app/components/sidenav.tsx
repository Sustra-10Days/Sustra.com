"use client";
import { useState } from "react";

const Sidebar = () => {
    // State to track selected checkboxes
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [selectedRarities, setSelectedRarities] = useState<string[]>([]);
    const [selectedMajors, setSelectedMajors] = useState<string[]>([]);

    const categories = ["Love", "Study", "Work", "Health"];
    const rarities = ["Common", "Rare"];
    const majors = ["IE", "ICE", "Nano"];

    const handleCheckboxChange = (item: string, type: string) => {
        if (type === "color") {
            setSelectedCategories((prev) =>
                prev.includes(item) ? prev.filter((c) => c !== item) : [...prev, item]
            );
        } else if (type === "category") {
            setSelectedRarities((prev) =>
                prev.includes(item) ? prev.filter((c) => c !== item) : [...prev, item]
            );
        } else if (type === "size") {
            setSelectedMajors((prev) =>
                prev.includes(item) ? prev.filter((s) => s !== item) : [...prev, item]
            );
        }
    };

    const Checkbox = ({ checked, onChange, label }: { checked: boolean; onChange: () => void; label: string }) => (
        <label className="flex items-center space-x-2 text-gray-700 mb-2 cursor-pointer">
            <div className="relative flex items-center justify-center">
                <input
                    type="checkbox"
                    checked={checked}
                    onChange={onChange}
                    className="absolute opacity-0 w-4 h-4"
                />
                <div className={`w-4 h-4 border border-gray-300 rounded flex items-center justify-center ${checked ? 'bg-blue-600' : 'bg-white'}`}>
                    {checked && (
                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                    )}
                </div>
            </div>
            <span>{label}</span>
        </label>
    );

    return (
        <aside className="w-64 p-4 items-center justify-center flex-col">
            {/* Category Filter */}
            <div className="mb-6 bg-white px-20">
                <h3 className="text-lg font-semibold mb-2 text-black">Color</h3>
                {categories.map((category) => (
                    <Checkbox
                        key={category}
                        checked={selectedCategories.includes(category)}
                        onChange={() => handleCheckboxChange(category, "color")}
                        label={category}
                    />
                ))}
            </div>

            {/* Rarity Filter */}
            <div className="mb-6 px-20">
                <h3 className="text-lg font-semibold mb-2 text-black">Category</h3>
                {rarities.map((rarity) => (
                    <Checkbox
                        key={rarity}
                        checked={selectedRarities.includes(rarity)}
                        onChange={() => handleCheckboxChange(rarity, "category")}
                        label={rarity}
                    />
                ))}
            </div>

            {/* Size Filter */}
            <div className="mb-6 px-20">
                <h3 className="text-lg font-semibold mb-2 text-black">Major</h3>
                {majors.map((major) => (
                    <Checkbox
                        key={major}
                        checked={selectedMajors.includes(major)}
                        onChange={() => handleCheckboxChange(major, "size")}
                        label={major}
                    />
                ))}
            </div>
        </aside>
    );
};

export default Sidebar;