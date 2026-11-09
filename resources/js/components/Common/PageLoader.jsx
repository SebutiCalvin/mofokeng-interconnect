import React from 'react';
import { motion } from 'framer-motion';

export const PageLoader = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-[#0A1628]">
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col items-center"
            >
                <div className="w-16 h-16 border-4 border-gold/20 border-t-gold rounded-full animate-spin"></div>
                <div className="mt-6 text-gold font-['Space_Grotesk'] font-bold text-xl tracking-wider">
                    Mofokeng <span className="text-white">INTERCONNECT</span>
                </div>
                <p className="text-white/40 text-sm mt-2">Loading...</p>
            </motion.div>
        </div>
    );
};
