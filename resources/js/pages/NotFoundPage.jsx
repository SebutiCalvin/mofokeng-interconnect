import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, ArrowRight, Building2, Search } from 'lucide-react';

const NotFoundPage = () => {
    return (
        <div className="min-h-[80vh] bg-[#FAF8F5] flex items-center justify-center px-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center max-w-2xl"
            >
                {/* 404 Number */}
                <div className="text-8xl sm:text-9xl font-['Playfair_Display'] font-bold text-gold/20 select-none">
                    404
                </div>

                {/* Icon */}
                <div className="w-24 h-24 bg-gold/10 rounded-3xl flex items-center justify-center mx-auto mb-6">
                    <Building2 className="w-12 h-12 text-gold" />
                </div>

                {/* Title */}
                <h1 className="text-3xl sm:text-4xl font-['Playfair_Display'] font-bold text-[#0A1628] mb-4">
                    Page Not Found
                </h1>

                {/* Description */}
                <p className="text-gray-600 text-lg mb-8">
                    Oops! The page you're looking for doesn't exist or has been moved.
                </p>

                {/* Actions */}
                <div className="flex flex-wrap justify-center gap-4">
                    <Link
                        to="/"
                        className="inline-flex items-center gap-2 px-8 py-3 bg-gold text-[#0A1628] font-semibold rounded-xl hover:bg-gold-light transition-all duration-300 shadow-lg hover:shadow-glow"
                    >
                        <Home className="w-5 h-5" />
                        Back to Home
                    </Link>
                    <Link
                        to="/search"
                        className="inline-flex items-center gap-2 px-8 py-3 border-2 border-[#0A1628] text-[#0A1628] font-semibold rounded-xl hover:bg-[#0A1628] hover:text-white transition-all duration-300"
                    >
                        <Search className="w-5 h-5" />
                        Search
                    </Link>
                </div>

                {/* Help Text */}
                <p className="text-gray-400 text-sm mt-8">
                    If you think this is a mistake, please{' '}
                    <Link to="/contact" className="text-gold hover:text-gold-light transition-colors">
                        contact support
                    </Link>
                </p>
            </motion.div>
        </div>
    );
};

export default NotFoundPage;
