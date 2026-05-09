import { useContext, useEffect, useState } from "react";
import { assets } from "../assets/frontend_assets/assets";
import { HiX } from "react-icons/hi";
import { useLocation } from "@tanstack/react-router";
import { ShopContext } from "../context/ShopContext";

const SearchBar = () => {

    const context = useContext(ShopContext);
    if (!context) return null;
    const { search, setSearch, showSearch, setShowSearch } = context;
    const [visible, setVisible] = useState(false);
    const location = useLocation();

    useEffect(() => {
        if (location.pathname.includes('product')) {
            setVisible(true);
        } else {
            setVisible(false);
            setShowSearch(false);
            setSearch("");
        }
    }, [location])

    return (
        <div
            className={`transition-all duration-500 ease-in-out overflow-hidden bg-white/70 backdrop-blur-md text-center shadow-sm flex items-center justify-center ${showSearch && visible ? 'max-h-24 opacity-100 py-4' : 'max-h-0 opacity-0 py-0'
                }`}
        >
            <div className="inline-flex items-center justify-center bg-gray-200/50 px-5 py-2 mx-3 rounded-full w-3/4 sm:w-1/2 focus-within:bg-white focus-within:ring-2 focus-within:ring-gray-200 transition-all duration-300">
                <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="flex-1 outline-none bg-transparent text-sm md:text-base text-gray-700 placeholder-gray-400"
                    type="text"
                    placeholder="Search for premium fashion..."
                />
                <img className="w-5 opacity-50 hover:opacity-100 transition-opacity cursor-pointer" src={assets.search_icon} alt="search" />
            </div>
            <button
                onClick={() => {
                    setShowSearch(false);
                    setSearch("");
                }}
                className="inline-flex items-center justify-center p-2 rounded-full hover:bg-gray-200/50 transition-all duration-300 hover:rotate-90 active:scale-90 cursor-pointer"
            >
                <HiX className="w-5 h-5 text-gray-500" />
            </button>
        </div>
    )
}

export default SearchBar