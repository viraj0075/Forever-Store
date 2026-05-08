import { Link, useLocation } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import ContainerLayout from "../layouts/ContainerLayout";
import { assets } from "../assets/frontend_assets/assets";
import { useScroll } from "../hooks/use-scroll";
import { HiX, HiChevronLeft } from "react-icons/hi";
import { navLinks } from "../constants/Navlinks";
import { useWindow } from "../hooks/useWindow";

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);

    const scrolled = useScroll({ threshold: 50 });
    const width = useWindow();

    const pathname = useLocation({
        select: (location) => location.pathname,
    });

    useEffect(() => {
        if (width > 768) {
            setMenuOpen(false);
        }
    }, [width]);

    // Prevent body scroll when mobile menu opens
    useEffect(() => {
        document.body.style.overflow = menuOpen ? "hidden" : "auto";

        return () => {
            document.body.style.overflow = "auto";
        };
    }, [menuOpen]);

    return (
        <header
            className={`sticky top-0 z-50 overflow-x-clip transition-all duration-300 ${scrolled
                ? "border-b border-gray-300 bg-white/90 shadow-sm backdrop-blur-md"
                : "border-b border-transparent bg-white"
                }`}
        >
            <ContainerLayout>
                <div className="flex items-center justify-between py-4 font-medium">
                    {/* Logo */}
                    <Link to="/" className="shrink-0">
                        <img
                            src={assets.logo}
                            className="w-24 md:w-32"
                            alt="Forever Store Logo"
                            loading="lazy"
                        />
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="hidden items-center gap-10 text-sm font-semibold tracking-wider text-gray-700 md:flex">
                        {navLinks.map((item) => {
                            const active = pathname === item.path;

                            return (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    className="group relative transition-colors hover:text-black"
                                >
                                    {item.name}

                                    <span
                                        className={`absolute -bottom-1 left-0 h-0.5 bg-black transition-all duration-300 ${active
                                            ? "w-full"
                                            : "w-0 group-hover:w-full"
                                            }`}
                                    />
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Right Side */}
                    <div className="flex items-center gap-5 md:gap-8">
                        {/* Search */}
                        <button
                            onClick={() => setSearchOpen(!searchOpen)}
                            className="cursor-pointer rounded-full p-2 transition-colors hover:bg-gray-200 "
                        >
                            <img
                                src={assets.search_icon}
                                className="w-5"
                                alt="Search"
                            />
                        </button>

                        {/* Profile */}
                        <div className="group relative z-40">
                            <button
                                onClick={() => setSearchOpen(false)}
                                onMouseEnter={() => setSearchOpen(false)}
                                className="cursor-pointer rounded-full p-1 transition-colors hover:bg-gray-200"
                            >
                                <img
                                    src={assets.profile_icon}
                                    className="w-5"
                                    alt="Profile"
                                />
                            </button>

                            <div className="invisible absolute right-0 top-full pt-4 opacity-0 transition-all duration-300 group-hover:visible group-hover:opacity-100">
                                <div className="flex w-44 flex-col gap-1 overflow-hidden rounded-xl border border-gray-100 bg-white px-2 py-3 text-gray-600 shadow-2xl">
                                    <Link
                                        to="/login"
                                        className="rounded-lg px-4 py-2 transition-colors hover:bg-gray-50 hover:text-black"
                                    >
                                        My Profile
                                    </Link>

                                    <Link
                                        to="/order"
                                        className="rounded-lg px-4 py-2 transition-colors hover:bg-gray-50 hover:text-black"
                                    >
                                        Orders
                                    </Link>

                                    <button className="rounded-lg px-4 py-2 text-left transition-colors hover:bg-gray-50 hover:text-black">
                                        Logout
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Cart */}
                        <Link
                            to="/cart"
                            className="relative rounded-full p-1 transition-colors hover:bg-gray-100"
                        >
                            <img
                                src={assets.cart_icon}
                                className="w-5 min-w-5"
                                alt="Cart"
                            />

                            <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-black text-[10px] font-bold text-white ring-2 ring-white">
                                0
                            </span>
                        </Link>

                        {/* Mobile Menu */}
                        <button
                            onClick={() => setMenuOpen(true)}
                            className="cursor-pointer rounded-full p-1 transition-colors hover:bg-gray-100 md:hidden"
                        >
                            <img
                                src={assets.menu_icon}
                                className="w-5"
                                alt="Menu"
                            />
                        </button>
                    </div>
                </div>
            </ContainerLayout>

            {/* Search Overlay */}
            <div
                className={`absolute top-full inset-x-0 z-40 overflow-hidden border-b border-gray-200 bg-white/95 backdrop-blur-md transition-all duration-300  ${searchOpen
                    ? "h-20 py-4 opacity-100"
                    : "pointer-events-none h-0 opacity-0"
                    }`}
            >
                <div className="px-4 sm:px-6 lg:px-8 ">
                    <div className="flex items-center justify-center gap-3">
                        <div className="flex w-full max-w-2xl items-center rounded-full border border-gray-300 bg-gray-50 px-5 py-2.5 transition-all focus-within:bg-white focus-within:ring-2 focus-within:ring-gray-200">
                            <img
                                src={assets.search_icon}
                                className="mr-3 w-5 cursor-pointer opacity-60"
                                alt="Search bar"
                                loading="lazy"
                            />

                            <input
                                type="text"
                                placeholder="Search products..."
                                className="flex-1 bg-transparent text-sm outline-none md:text-base"
                            />
                        </div>

                        <button
                            onClick={() => setSearchOpen(false)}
                            className="cursor-pointer rounded-full p-2 transition-colors hover:bg-gray-200"
                        >
                            <HiX className="h-5 w-5 text-gray-500" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Sidebar */}
            <div
                className={`fixed inset-0 z-150 md:hidden transition-all duration-300 ${menuOpen
                    ? "visible opacity-100"
                    : "invisible opacity-0"
                    }`}
            >
                {/* Backdrop */}
                <div
                    onClick={() => setMenuOpen(false)}
                    className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                />

                {/* Sidebar */}
                <div
                    className={`absolute right-0 top-0 h-screen w-full bg-white transition-transform duration-300 ${menuOpen ? "translate-x-0" : "translate-x-full"
                        } overflow-y-auto`}
                >
                    <div className="flex min-h-screen flex-col bg-white">
                        {/* Header */}
                        <div className="sticky top-0 z-20 flex items-center justify-between border-b border-gray-200 bg-white px-4 py-3">
                            <button
                                onClick={() => setMenuOpen(false)}
                                className="group flex items-center gap-2 text-gray-600 transition-colors hover:text-black"
                            >
                                <HiChevronLeft className="h-5 w-5 transition-transform group-hover:-translate-x-1" />

                                <span className="text-sm font-bold">BACK</span>
                            </button>

                            <img
                                src={assets.logo}
                                className="w-20"
                                alt="Forever logo"
                                loading="lazy"
                            />

                            <button
                                onClick={() => setMenuOpen(false)}
                                className="rounded-full p-2 transition-colors hover:bg-gray-200"
                            >
                                <HiX className="h-5 w-5 text-gray-500" />
                            </button>
                        </div>

                        {/* Links */}
                        <div className="flex flex-col py-4 bg-white">
                            {navLinks.map((item) => {
                                const active = pathname === item.path;

                                return (
                                    <Link
                                        key={item.path}
                                        to={item.path}
                                        onClick={() => setMenuOpen(false)}
                                        className={`border-l-4 p-4 text-sm font-bold transition-all ${active
                                            ? "border-black bg-gray-100 text-black"
                                            : "border-transparent text-gray-700 hover:bg-gray-100 hover:text-black"
                                            }`}
                                    >
                                        {item.name}
                                    </Link>
                                );
                            })}
                        </div>

                        {/* Footer */}
                        <div className="mt-auto bg-white p-6">
                            <Link
                                to="/signup"
                                onClick={() => setMenuOpen(false)}
                                className="mb-3 block w-full rounded-xl bg-black py-3 text-center text-sm font-bold text-white transition-colors hover:bg-gray-800"
                            >
                                Create Account
                            </Link>

                            <Link
                                to="/login"
                                onClick={() => setMenuOpen(false)}
                                className="block w-full rounded-xl border-2 border-gray-200 py-3 text-center text-sm font-bold text-gray-700 transition-colors hover:bg-gray-50"
                            >
                                Log In
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}