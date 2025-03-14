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

    return (
        <aside className="w-64 p-4 border-r border-gray-200 bg-white">
            {/* Category Filter */}
            <div className="mb-6 bg-white">
                <h3 className="text-lg font-semibold mb-2 text-black">Color</h3>
                {categories.map((category) => (
                    <label key={category} className="flex items-center space-x-2 text-gray-700">
                        <input
                            type="checkbox"
                            checked={selectedCategories.includes(category)}
                            onChange={() => handleCheckboxChange(category, "color")}
                            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring focus:ring-blue-200"
                        />
                        <span>{category}</span>
                    </label>
                ))}
            </div>

            {/* Rarity Filter */}
            <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2 text-black">Category</h3>
                {rarities.map((rarity) => (
                    <label key={rarity} className="flex items-center space-x-2 text-gray-700">
                        <input
                            type="checkbox"
                            checked={selectedRarities.includes(rarity)}
                            onChange={() => handleCheckboxChange(rarity, "category")}
                            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring focus:ring-blue-200"
                        />
                        <span>{rarity}</span>
                    </label>
                ))}
            </div>

            {/* Size Filter */}
            <div>
                <h3 className="text-lg font-semibold mb-2 text-black">Sizes</h3>
                {majors.map((major) => (
                    <label key={major} className="flex items-center space-x-2 text-gray-700">
                        <input
                            type="checkbox"
                            checked={selectedMajors.includes(major)}
                            onChange={() => handleCheckboxChange(major, "size")}
                            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring focus:ring-blue-200"
                        />
                        <span>{major}</span>
                    </label>
                ))}
            </div>
        </aside>
    );
};

export default Sidebar;