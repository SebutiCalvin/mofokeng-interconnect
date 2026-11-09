import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, Building2, ArrowLeft } from 'lucide-react';

export const NotFound = () => {
    return (
        <div className="min-h-[80vh] flex items-center justify-center bg-gradient-to-br from-[#0A1628] to-[#1A2A4A] px-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center max-w-2xl"
            >
                {/* 404 Number */}
                <div className="text-8xl sm:text-9xl font-['Playfair_Display'] font-bold text-gold/20">
                    404
                </div>
                
                {/* Icon */}
                <div className="w-24 h-24 bg-gold/10 rounded-3xl flex items-center justify-center mx-auto mb-6">
                    <Building2 className="w-12 h-12 text-gold" />
                </div>
                
                {/* Title */}
                <h1 className="text-3xl sm:text-4xl font-['Playfair_Display'] font-bold text-white mb-4">
                    Page Not Found
                </h1>
                
                {/* Description */}
                <p className="text-white/60 text-lg mb-8">
                    Oops! The page you're looking for doesn't exist or has been moved.
                </p>
                
                {/* Actions */}
                <div className="flex flex-wrap justify-center gap-4">
                    <Link
                        to="/"
                        className="px-6 py-3 bg-gradient-to-r from-gold to-gold-light text-[#0A1628] font-semibold rounded-xl hover:scale-[1.02] transition-all duration-300 shadow-lg hover:shadow-glow flex items-center gap-2"
                    >
                        <Home className="w-4 h-4" />
                        Back to Home
                    </Link>
                    <button
                        onClick={() => window.history.back()}
                        className="px-6 py-3 border-2 border-white/20 text-white font-semibold rounded-xl hover:bg-white hover:text-[#0A1628] transition-all duration-300 flex items-center gap-2"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Go Back
                    </button>
                </div>
                
                {/* Footer Text */}
                <p className="text-white/20 text-sm mt-8">
                    If you think this is a mistake, please contact support.
                </p>
            </motion.div>
        </div>
    );
};
