interface Sidebar{
    categories: string[],
    rarities: string[],
    majors: string[],
    handleCheckboxChange: (item: string, type: string) => void,
    selectedCategories: string[],
    selectedRarities: string[],
    selectedMajors: string[]
}
const Sidebar = ({categories, rarities, majors, handleCheckboxChange,selectedCategories,selectedMajors,selectedRarities}:Sidebar) => {

    const Checkbox = ({ checked, onChange, label }: { checked: boolean; onChange: () => void; label: string }) => (
        <label className="flex items-center space-x-2 text-indigo-950 mb-2 cursor-pointer">
            <div className="relative flex items-center justify-center">
                <input
                    type="checkbox"
                    checked={checked}
                    onChange={onChange}
                    className="absolute opacity-0 w-4 h-4"
                />
                <div className={`w-4 h-4 border border-indigo-950 rounded flex items-center justify-center ${checked ? 'bg-indigo-950' : 'bg-white'}`}>
                    {checked && (
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
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
                <h3 className="text-lg font-semibold mb-2 text-indigo-950">Category</h3>
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
                <h3 className="text-lg font-semibold mb-2 text-indigo-950">Rarity</h3>
                {rarities.map((rarity) => (
                    <Checkbox
                        key={rarity}
                        checked={selectedRarities.includes(rarity)}
                        onChange={() => handleCheckboxChange(rarity, "category")}
                        label={rarity}
                    />
                ))}
            </div>

            {/* Major Filter */}
            <div className="mb-6 px-20">
                <h3 className="text-lg font-semibold mb-2 text-indigo-950">Major</h3>
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