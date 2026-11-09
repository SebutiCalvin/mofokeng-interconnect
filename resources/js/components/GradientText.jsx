import React from 'react';
import { motion } from 'framer-motion';

export const GradientText = ({ children, className = '' }) => {
    return (
        <motion.span
            initial={{ backgroundPosition: '0% 50%' }}
            animate={{ backgroundPosition: '100% 50%' }}
            transition={{ duration: 3, repeat: Infinity, repeatType: 'reverse' }}
            className={`bg-gradient-to-r from-gold via-gold-light to-gold bg-clip-text text-transparent bg-[length:200%_auto] ${className}`}
        >
            {children}
        </motion.span>
    );
};
