import React, { useState, useEffect } from 'react';
import { 
    Search, 
    Building2, 
    Briefcase, 
    Users, 
    Sparkles,
    ArrowRight,
    Globe2
} from 'lucide-react';
import { motion } from 'framer-motion';

export const GlassHero = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    const stats = [
        { icon: Building2, number: '500+', label: 'Companies', gradient: 'from-emerald-400 to-teal-400' },
        { icon: Briefcase, number: '10,000+', label: 'Projects', gradient: 'from-blue-400 to-indigo-400' },
        { icon: Users, number: '50,000+', label: 'Clients', gradient: 'from-purple-400 to-pink-400' },
    ];

    return (
        <section 
            className="relative min-h-screen flex items-center overflow-hidden bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: "url('/images/hero-bg.jpg')" }}
        >
            {/* Dark Overlay so text is readable */}
            <div className="absolute inset-0 bg-black/60 z-0"></div>

            {/* Content */}
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 40 }}
                    transition={{ duration: 0.8 }}
                    className="max-w-4xl"
                >
                    {/* Premium Badge */}
                    <motion.div 
                        className="inline-flex items-center gap-3 px-6 py-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full mb-8 shadow-xl"
                        whileHover={{ scale: 1.02 }}
                        transition={{ type: "spring", stiffness: 300 }}
                    >
                        <Sparkles className="w-4 h-4 text-gold animate-pulse" />
                        <span className="text-gold text-sm font-semibold uppercase tracking-wider flex items-center gap-2">
                            <Globe2 className="w-4 h-4" />
                            Africa's Premier Construction Marketplace
                        </span>
                        <div className="w-1 h-1 bg-gold/50 rounded-full" />
                        <span className="text-white/50 text-xs">✦ 2026</span>
                    </motion.div>
                    
                    {/* Main Title */}
                    <motion.h1 
                        className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold leading-[1.05]"
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : -30 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <span className="text-white drop-shadow-lg">Building</span><br />
                        <span className="relative inline-block">
                            <span className="bg-gradient-to-r from-gold via-yellow-300 to-gold bg-clip-text text-transparent drop-shadow-md">
                                Africa's
                            </span>
                            <div className="absolute -bottom-2 left-0 w-full h-0.5 bg-gradient-to-r from-gold to-transparent" />
                        </span>
                        <span className="text-white drop-shadow-lg"> Future</span>
                    </motion.h1>
                    
                    {/* Description */}
                    <motion.p 
                        className="mt-6 text-lg sm:text-xl text-white/90 leading-relaxed max-w-2xl font-light drop-shadow-md"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: isVisible ? 1 : 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                    >
                        Discover, connect, and collaborate with Lesotho's leading construction
                        companies. Showcase your work, find your next project, and build
                        the future together.
                    </motion.p>
                    
                    {/* Search Bar */}
                    <motion.div 
                        className="mt-10 max-w-2xl"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                    >
                        <div className="relative group">
                            <div className="absolute -inset-0.5 bg-gradient-to-r from-gold/40 to-gold-light/40 rounded-2xl blur group-hover:blur-md transition-all duration-500" />
                            <div className="relative flex flex-col sm:flex-row gap-2 bg-white/10 backdrop-blur-xl rounded-2xl p-2 border border-white/20">
                                <div className="flex-1 flex items-center px-4">
                                    <Search className="w-5 h-5 text-white/60 mr-3 group-hover:text-gold transition-colors" />
                                    <input
                                        type="text"
                                        placeholder="Search for construction services..."
                                        className="flex-1 py-4 bg-transparent text-white placeholder-white/60 border-0 outline-none focus:ring-0"
                                    />
                                </div>
                                <button className="px-8 py-4 bg-gradient-to-r from-gold to-gold-light text-[#0A1628] font-bold rounded-xl hover:scale-105 transition-all duration-300 shadow-lg flex items-center justify-center gap-2">
                                    <Search className="w-4 h-4" />
                                    Search
                                    <ArrowRight className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                    
                    {/* Stats */}
                    <motion.div 
                        className="mt-12 flex flex-wrap gap-4 md:gap-8"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: isVisible ? 1 : 0 }}
                        transition={{ duration: 0.8, delay: 0.8 }}
                    >
                        {stats.map((stat, index) => (
                            <motion.div 
                                key={index}
                                className="flex items-center gap-4 px-6 py-4 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/10 hover:border-gold/50 transition-all duration-300 group"
                                whileHover={{ scale: 1.05, y: -4 }}
                                transition={{ type: "spring", stiffness: 300 }}
                            >
                                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center shadow-lg`}>
                                    <stat.icon className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <div className="text-2xl sm:text-3xl font-bold text-white">
                                        {stat.number}
                                    </div>
                                    <div className="text-xs text-white/60 uppercase tracking-wider">{stat.label}</div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

export default GlassHero;