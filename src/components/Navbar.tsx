import { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    FiCheckSquare,
    FiGitBranch,
    FiMessageCircle,
    FiUsers,
    FiChevronDown,
    FiPlus,
    FiSearch,
    FiBell,
    FiMenu,
    FiX,
    FiUser,
    FiLogOut,
    FiSettings,
} from "react-icons/fi";
import { Logo } from "../assets";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../store/store";
import type { AppDispatch } from "../store/store";
import { userLogout } from "../store/actions/auth.actions";
import { toast } from "react-toastify";

const featureItems = [
    {
        icon: FiCheckSquare,
         title: (
      <>
        Task{" "}
        <span className="bg-gradient-to-r from-red-400 to-red-300 bg-clip-text text-transparent cursiveFont">
          management
        </span>
      </>
    ),
        description: "Plan, assign, and track work in one place.",
        badge: "Popular"
    },
    {
        icon: FiGitBranch,
       title: (
      <>
        Task{" "}
        <span className="bg-gradient-to-r from-red-400 to-red-300 bg-clip-text text-transparent cursiveFont">
          breakdown
        </span>
      </>
    ),
        description: "Split big goals into clear, actionable steps.",
    },
    {
        icon: FiMessageCircle,
        title: (
      <>
        Coummu
        <span className="bg-gradient-to-r from-red-400 to-red-300 bg-clip-text text-transparent cursiveFont">
        nication
        </span>
      </>
    ),
        description: "Keep every conversation tied to the work.",
        badge: "New"
    },
    {
        icon: FiUsers,
        title: (
      <>
        Task{" "}
        <span className="bg-gradient-to-r from-red-400 to-red-300 bg-clip-text text-transparent cursiveFont">
          allocation
        </span>
      </>
    ),
        description: "Balance workload across your team with ease.",
    },
];

const Navbar = () => {
    const [featuresOpen, setFeaturesOpen] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const { user } = useSelector((state: RootState) => state.auth);
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY || window.pageYOffset || document.documentElement.scrollTop || 0;
            setScrolled(scrollY > 10);
        };

        handleScroll();
        window.addEventListener("scroll", handleScroll, { passive: true });

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleLogout = async () => {
        try {
            const response = await dispatch(userLogout());
            if (response?.success) {
                toast.success(response?.message || "User logout successfully");
                setIsDropdownOpen(false);
                navigate("/signin");
            } else {
                toast.error(response?.message || "Unexpected error occurred");
            }
        } catch (error) {
            console.error(error);
            toast.error("Unexpected error occurred");
        }
    };

    return (
        <header
            className={`sticky max-w-[80%] mx-auto top-3 z-50 w-full transition-all duration-300 ${
                scrolled 
                    ? "bg-[#0b0b0d]/90 backdrop-blur-xl border-red-500/20 shadow-2xl shadow-red-500/5" 
                    : "bg-[#0f0f14] border-white/10"
            } border shadow-lg rounded-full`}
        >
            <nav className="flex h-16 items-center justify-between px-6">
                <div className="flex items-center gap-10">
                    <Link to="/" className="flex items-center gap-1 group">
                        <div className="relative">
                            <img src={Logo} alt="OrgSyncAI" className="h-9 w-auto brightness-0 invert" />
                            <div className={`absolute -bottom-1 left-0 h-0.5 w-0 bg-red-500 transition-all duration-300 group-hover:w-full`}></div>
                        </div>
                        <span className={`text-xl font-bold tracking-tight transition-colors duration-300 text-white`}>
                            OrgSync<span className="bg-gradient-to-r from-red-400 to-red-300 bg-clip-text text-transparent cursiveFont">AI</span>
                        </span>
                    </Link>

                    <div className="hidden items-center gap-10 md:flex">
                        <div
                            className="relative"
                            onMouseEnter={() => setFeaturesOpen(true)}
                            onMouseLeave={() => setFeaturesOpen(false)}
                        >
                            <button className={`group flex items-center gap-1 text-sm font-bold transition-colors duration-300 text-white/70 hover:text-white`}>
                                Features
                                <FiChevronDown
                                    className={`h-4 w-4 font-bold transition-transform duration-300 ${
                                        featuresOpen ? "rotate-180" : ""
                                    }`}
                                />
                                <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-red-500 transition-all duration-300 group-hover:w-full"></span>
                            </button>

                            <div
                                className={`absolute left-1/2 top-full w-[480px] -translate-x-1/2 pt-4 transition-all duration-300 ${
                                    featuresOpen
                                        ? "translate-y-0 opacity-100"
                                        : "pointer-events-none -translate-y-3 opacity-0"
                                }`}
                            >
                                <div className="grid grid-cols-2 gap-2 rounded-xl border border-white/10 bg-[#0f0f14] p-4 shadow-2xl shadow-red-500/5 backdrop-blur-xl">
                                    {featureItems.map(({ icon: Icon, title, description, badge }) => (
                                        <div
                                            key={description}
                                            className="group relative flex cursor-pointer flex-col border border-transparent gap-2 rounded-lg p-4 transition-all duration-200 hover:border-red-500/20 hover:bg-red-500/5"
                                        >
                                            {badge && (
                                                <span className="absolute -right-1 -top-1 rounded-full bg-gradient-to-r from-red-500 to-red-600 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white shadow-lg shadow-red-500/30">
                                                    {badge}
                                                </span>
                                            )}
                                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-500/20 text-red-400 transition-all duration-200 group-hover:bg-gradient-to-br group-hover:from-red-500 group-hover:to-red-600 group-hover:text-white group-hover:scale-105 group-hover:shadow-lg group-hover:shadow-red-500/30">
                                                <Icon className="h-5 w-5" />
                                            </div>
                                            <div>
                                                <p className="text-sm font-semibold text-white">{title}</p>
                                                <p className="mt-0.5 text-xs leading-relaxed text-white/50">
                                                    {description}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <Link
                            to="/about"
                            className={`group relative text-sm font-bold transition-colors duration-300 text-white/70 hover:text-white`}
                        >
                            About
                            <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-red-500 transition-all duration-300 group-hover:w-full"></span>
                        </Link>
                        <Link
                            to="/enterprise"
                            className={`group relative text-sm font-bold transition-colors duration-300 text-white/70 hover:text-white`}
                        >
                            Enterprise
                            <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-red-500 transition-all duration-300 group-hover:w-full"></span>
                        </Link>
                        <Link
                            to="/pricing"
                            className={`group relative text-sm font-bold transition-colors duration-300 text-white/70 hover:text-white`}
                        >
                            Pricing
                            <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-red-500 transition-all duration-300 group-hover:w-full"></span>
                        </Link>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <button className={`hidden rounded-lg p-2 transition-all duration-200 md:block text-white/50 hover:text-white hover:bg-red-500/10 cursor-pointer`}>
                        <FiSearch className="h-5 w-5" />
                    </button>
                    <button className={`hidden rounded-lg p-2 transition-all duration-200 md:block text-white/50 hover:text-white hover:bg-red-500/10 cursor-pointer`}>
                        <FiBell className="h-5 w-5" />
                    </button>
                    
                    <Link to={"/organization-setup"}>
                        <button className={`hidden md:flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-300 cursor-pointer hover:scale-[.98] active:scale-[0.98] text-white 
                            bg-gradient-to-r from-red-500 to-red-600 hover:from-red-400 hover:to-red-500 shadow-lg shadow-red-500/30 hover:shadow-red-500/50`}>
                            CREATE A NEW WORKSPACE
                        </button>
                    </Link>

                    {/* User Avatar with Dropdown */}
                    <div className="relative" ref={dropdownRef}>
                        <div 
                            className="w-10 h-10 rounded-full relative border-2 border-red-500/30 shadow-lg shadow-red-500/20 cursor-pointer hover:border-red-500/50 transition-all duration-300 hover:scale-105"
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        >
                            <img 
                                src={user?.avatar || 'https://ui-avatars.com/api/?name=User&background=red&color=fff'} 
                                className="w-full rounded-full h-full object-cover" 
                                alt={user?.username || 'User'} 
                            />
                        </div>

                        {/* Dropdown Menu */}
                        {isDropdownOpen && (
                            <div className="absolute right-0 mt-3 w-64 bg-[#0f0f14] border border-white/10 rounded-xl shadow-2xl shadow-red-500/5 backdrop-blur-xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                                {/* User Info */}
                                <div className="px-4 py-3 border-b border-white/10">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full border-2 border-red-500/30 overflow-hidden">
                                            <img 
                                                src={user?.avatar || 'https://ui-avatars.com/api/?name=User&background=red&color=fff'} 
                                                className="w-full h-full object-cover" 
                                                alt={user?.username || 'User'} 
                                            />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-semibold text-white truncate">
                                                {user?.username || 'User'}
                                            </p>
                                            <p className="text-xs text-white/40 truncate">
                                                {user?.email || 'user@example.com'}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Menu Items */}
                                <div className="py-1">
                                    <Link
                                        to="/profile"
                                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-white/70 hover:text-white hover:bg-red-500/10 transition-colors duration-200"
                                        onClick={() => setIsDropdownOpen(false)}
                                    >
                                        <FiUser className="w-4 h-4" />
                                        Profile
                                    </Link>
                                    <Link
                                        to="/settings"
                                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-white/70 hover:text-white hover:bg-red-500/10 transition-colors duration-200"
                                        onClick={() => setIsDropdownOpen(false)}
                                    >
                                        <FiSettings className="w-4 h-4" />
                                        Settings
                                    </Link>
                                    <div className="border-t border-white/5 my-1" />
                                    <button
                                        onClick={handleLogout}
                                        className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors duration-200"
                                    >
                                        <FiLogOut className="w-4 h-4" />
                                        Logout
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="text-white/60 transition-colors hover:text-white md:hidden"
                    >
                        {mobileMenuOpen ? <FiX className="h-6 w-6" /> : <FiMenu className="h-6 w-6" />}
                    </button>
                </div>
            </nav>

            {mobileMenuOpen && (
                <div className="mt-2 rounded-2xl border border-white/10 bg-[#0f0f14]/95 backdrop-blur-xl p-4 md:hidden">
                    <div className="space-y-4">
                        <Link
                            to="/about"
                            className="block text-sm font-bold text-white/70 transition-colors hover:text-white hover:pl-2"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            About
                        </Link>
                        <Link
                            to="/enterprise"
                            className="block text-sm font-bold text-white/70 transition-colors hover:text-white hover:pl-2"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Enterprise
                        </Link>
                        <Link
                            to="/pricing"
                            className="block text-sm font-bold text-white/70 transition-colors hover:text-white hover:pl-2"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Pricing
                        </Link>
                        <Link to={"/organization-setup"} onClick={() => setMobileMenuOpen(false)}>
                            <button className="w-full rounded-full bg-gradient-to-r from-red-500 to-red-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-red-500/30 transition-all duration-300 hover:scale-[.98] hover:shadow-red-500/50">
                                CREATE A NEW WORKSPACE
                            </button>
                        </Link>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Navbar;