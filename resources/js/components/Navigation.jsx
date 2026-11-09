import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Home, Building2, Briefcase, FileText, Info, Mail, LogIn, Sparkles, Globe2, Search, Bell, User, LogOut, ChevronDown } from 'lucide-react';

const Navigation = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const location = useLocation();

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close mobile menu on route change
    useEffect(() => {
        setIsOpen(false);
        setIsUserMenuOpen(false);
    }, [location]);

    // Check auth status (mock for now)
    useEffect(() => {
        const token = localStorage.getItem('auth_token');
        setIsAuthenticated(!!token);
    }, []);

    // Keyboard shortcut for search
    useEffect(() => {
        const handleKeyDown = (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                setIsSearchOpen(true);
            }
            if (e.key === 'Escape') {
                setIsSearchOpen(false);
            }
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, []);

    const navLinks = [
        { name: 'Home', path: '/', icon: Home },
        { name: 'Constructors', path: '/constructors', icon: Building2 },
        { name: 'Projects', path: '/projects', icon: Briefcase },
        { name: 'Tenders', path: '/tenders', icon: FileText },
        { name: 'About', path: '/about', icon: Info },
        { name: 'Contact', path: '/contact', icon: Mail },
    ];

    const isActive = (path) => {
        if (path === '/') return location.pathname === '/';
        return location.pathname.startsWith(path);
    };

    const handleLogout = () => {
        localStorage.removeItem('auth_token');
        setIsAuthenticated(false);
        setIsUserMenuOpen(false);
    };

    return (
        <>
            <nav className={`fixed w-full z-50 transition-all duration-300 ${
                isScrolled 
                    ? 'bg-[#0A1628]/95 backdrop-blur-xl border-b border-white/10 shadow-lg' 
                    : 'bg-[#0A1628]/80 backdrop-blur-lg border-b border-white/5'
            }`}>
                <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
                    <div className="flex items-center justify-between h-14 sm:h-16 md:h-20">
                        {/* ===== LOGO ===== */}
                        <Link to="/" className="flex items-center space-x-2 sm:space-x-3 group flex-shrink-0">
                            <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-gradient-to-r from-gold to-gold-light rounded-lg sm:rounded-xl md:rounded-2xl flex items-center justify-center shadow-lg shadow-gold/20">
                                <span className="text-[#0A1628] font-['Space_Grotesk'] font-bold text-base sm:text-xl md:text-2xl">R</span>
                            </div>
                            <div className="hidden xs:block">
                                <span className="text-white text-xs sm:text-sm md:text-xl font-['Space_Grotesk'] font-bold tracking-tight">
                                    Mofokeng
                                </span>
                                <span className="text-gold text-xs sm:text-sm md:text-xl font-['Space_Grotesk'] font-bold tracking-tight">
                                    INTERCONNECT
                                </span>
                                <div className="hidden md:flex items-center gap-1 mt-0.5">
                                    <Globe2 className="w-2 h-2 md:w-3 md:h-3 text-gold/60" />
                                    <span className="text-[8px] md:text-[10px] text-white/40 font-medium tracking-wider">AFRICA'S PREMIER</span>
                                </div>
                            </div>
                            {/* Mobile Logo Text */}
                            <div className="xs:hidden">
                                <span className="text-white text-xs font-['Space_Grotesk'] font-bold tracking-tight">
                                    Mofokeng
                                </span>
                            </div>
                        </Link>

                        {/* ===== DESKTOP NAVIGATION ===== */}
                        <div className="hidden lg:flex items-center space-x-1">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.path}
                                    to={link.path}
                                    className={`relative px-3 py-2 rounded-xl text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                                        isActive(link.path)
                                            ? 'text-gold bg-gold/10'
                                            : 'text-white/70 hover:text-gold hover:bg-white/5'
                                    }`}
                                >
                                    <link.icon className="w-4 h-4" />
                                    {link.name}
                                    {isActive(link.path) && (
                                        <span className="absolute inset-0 bg-gold/10 rounded-xl -z-10" />
                                    )}
                                </Link>
                            ))}
                        </div>

                        {/* ===== RIGHT SECTION ===== */}
                        <div className="flex items-center space-x-1 sm:space-x-2 md:space-x-3">
                            {/* Search Button */}
                            <button
                                onClick={() => setIsSearchOpen(true)}
                                className="text-white/40 hover:text-gold transition-colors p-1.5 sm:p-2 rounded-lg sm:rounded-xl hover:bg-white/5"
                                aria-label="Search"
                            >
                                <Search className="w-4 h-4 sm:w-5 sm:h-5" />
                            </button>

                            {/* Notifications (if authenticated) */}
                            {isAuthenticated && (
                                <button className="relative text-white/40 hover:text-gold transition-colors p-1.5 sm:p-2 rounded-lg sm:rounded-xl hover:bg-white/5">
                                    <Bell className="w-4 h-4 sm:w-5 sm:h-5" />
                                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[10px] rounded-full flex items-center justify-center">3</span>
                                </button>
                            )}

                            {/* User Menu / Auth Buttons */}
                            {isAuthenticated ? (
                                <div className="relative">
                                    <button
                                        onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                                        className="flex items-center gap-1 sm:gap-2 text-white/70 hover:text-gold transition-colors p-1.5 sm:p-2 rounded-lg sm:rounded-xl hover:bg-white/5"
                                    >
                                        <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gold/20 rounded-full flex items-center justify-center text-gold font-bold text-xs sm:text-sm">
                                            JD
                                        </div>
                                        <ChevronDown className={`w-3 h-3 sm:w-4 sm:h-4 transition-transform duration-300 ${isUserMenuOpen ? 'rotate-180' : ''}`} />
                                    </button>

                                    {isUserMenuOpen && (
                                        <div className="absolute right-0 mt-2 w-48 sm:w-56 bg-[#1A2A4A] backdrop-blur-xl rounded-xl sm:rounded-2xl border border-white/10 shadow-2xl overflow-hidden">
                                            <div className="p-3 sm:p-4 border-b border-white/10">
                                                <p className="text-white font-semibold text-sm">John Doe</p>
                                                <p className="text-white/40 text-xs">Constructor</p>
                                            </div>
                                            <div className="py-1 sm:py-2">
                                                <Link to="/constructor/dashboard" className="flex items-center gap-3 px-3 sm:px-4 py-2 text-white/70 hover:text-gold hover:bg-white/5 transition-colors text-sm">
                                                    <User className="w-4 h-4" /> Dashboard
                                                </Link>
                                                <Link to="/constructor/profile" className="flex items-center gap-3 px-3 sm:px-4 py-2 text-white/70 hover:text-gold hover:bg-white/5 transition-colors text-sm">
                                                    <Settings className="w-4 h-4" /> Profile
                                                </Link>
                                                <button onClick={handleLogout} className="flex items-center gap-3 px-3 sm:px-4 py-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors text-sm w-full">
                                                    <LogOut className="w-4 h-4" /> Logout
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div className="hidden sm:flex items-center space-x-2 lg:space-x-4">
                                    <Link
                                        to="/login"
                                        className="text-white/70 hover:text-gold transition-colors text-sm font-medium px-3 py-2 rounded-lg hover:bg-white/5"
                                    >
                                        Login
                                    </Link>
                                    <Link
                                        to="/register"
                                        className="px-3 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-gold to-gold-light text-[#0A1628] font-semibold rounded-lg sm:rounded-xl hover:scale-[1.02] transition-all duration-300 shadow-lg hover:shadow-glow flex items-center gap-1 sm:gap-2 text-xs sm:text-sm"
                                    >
                                        <Sparkles className="w-3 h-3 sm:w-4 sm:h-4" />
                                        <span className="hidden xs:inline">Get Started</span>
                                        <span className="xs:hidden">Sign Up</span>
                                    </Link>
                                </div>
                            )}

                            {/* Mobile Menu Button */}
                            <button
                                onClick={() => setIsOpen(!isOpen)}
                                className="lg:hidden text-white/70 hover:text-gold transition-colors p-1.5 sm:p-2"
                                aria-label="Toggle menu"
                            >
                                {isOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* ===== MOBILE MENU ===== */}
                {isOpen && (
                    <div className="lg:hidden fixed inset-x-0 top-14 sm:top-16 md:top-20 bg-[#0A1628]/98 backdrop-blur-xl border-b border-white/10 shadow-2xl max-h-[calc(100vh-3.5rem)] overflow-y-auto">
                        <div className="px-4 py-4 space-y-1">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.path}
                                    to={link.path}
                                    onClick={() => setIsOpen(false)}
                                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium transition-all duration-300 ${
                                        isActive(link.path)
                                            ? 'text-gold bg-gold/10'
                                            : 'text-white/70 hover:text-gold hover:bg-white/5'
                                    }`}
                                >
                                    <link.icon className="w-5 h-5" />
                                    {link.name}
                                </Link>
                            ))}
                            <div className="pt-4 space-y-2 border-t border-white/10">
                                {isAuthenticated ? (
                                    <>
                                        <Link
                                            to="/constructor/dashboard"
                                            onClick={() => setIsOpen(false)}
                                            className="flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium text-white/70 hover:text-gold hover:bg-white/5 transition-all duration-300"
                                        >
                                            <User className="w-5 h-5" />
                                            Dashboard
                                        </Link>
                                        <button
                                            onClick={handleLogout}
                                            className="flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all duration-300 w-full"
                                        >
                                            <LogOut className="w-5 h-5" />
                                            Logout
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <Link
                                            to="/login"
                                            onClick={() => setIsOpen(false)}
                                            className="flex items-center justify-center px-4 py-3 text-white/70 hover:text-gold transition-colors rounded-xl text-base font-medium"
                                        >
                                            <LogIn className="w-5 h-5 mr-3" />
                                            Login
                                        </Link>
                                        <Link
                                            to="/register"
                                            onClick={() => setIsOpen(false)}
                                            className="flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-gold to-gold-light text-[#0A1628] font-semibold rounded-xl text-base"
                                        >
                                            <Sparkles className="w-4 h-4" />
                                            Get Started
                                        </Link>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </nav>

            {/* ===== SEARCH MODAL ===== */}
            {isSearchOpen && (
                <div 
                    className="fixed inset-0 z-[100] bg-[#0A1628]/95 backdrop-blur-xl flex items-start justify-center pt-16 sm:pt-20 px-4"
                    onClick={() => setIsSearchOpen(false)}
                >
                    <div 
                        className="w-full max-w-2xl bg-[#1A2A4A]/90 backdrop-blur-xl rounded-xl sm:rounded-2xl border border-white/10 shadow-2xl overflow-hidden"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex items-center p-3 sm:p-4 border-b border-white/10">
                            <Search className="w-5 h-5 text-white/40" />
                            <input
                                type="text"
                                placeholder="Search for construction companies, projects, or services..."
                                className="flex-1 bg-transparent text-white placeholder-white/40 border-0 outline-none px-3 sm:px-4 py-2 text-base sm:text-lg"
                                autoFocus
                            />
                            <button
                                onClick={() => setIsSearchOpen(false)}
                                className="text-white/40 hover:text-white transition-colors p-2"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <div className="p-3 sm:p-4">
                            <p className="text-white/30 text-xs uppercase tracking-wider mb-3">Popular Searches</p>
                            <div className="flex flex-wrap gap-2">
                                {['Residential Construction', 'Commercial Building', 'Renovation', 'Maseru', 'Leribe'].map((tag) => (
                                    <button
                                        key={tag}
                                        className="px-2 sm:px-3 py-1 sm:py-1.5 bg-white/5 hover:bg-white/10 text-white/60 hover:text-gold rounded-full text-xs sm:text-sm transition-colors border border-white/5"
                                    >
                                        {tag}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Navigation;
