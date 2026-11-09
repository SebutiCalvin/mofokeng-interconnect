import React from 'react';
import { Rocket, ArrowRight, Shield, Sparkles, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

export const GlassCTA = () => {
    return (
        <section className="relative py-32 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-[#0A1628] via-[#1A2A4A] to-[#0A1628]">
                <div className="absolute inset-0 bg-[url('/images/grid.svg')] opacity-5" />
                <div className="absolute top-0 left-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl" />
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-gold/10 rounded-full blur-3xl" />
            </div>
            
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="max-w-4xl mx-auto"
                >
                    <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-12 border border-white/10 shadow-2xl relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-gold/5 to-transparent" />
                        
                        <div className="relative text-center">
                            <motion.div 
                                className="inline-flex items-center gap-2 px-5 py-2 bg-gold/20 rounded-full mb-6 border border-gold/30"
                                whileHover={{ scale: 1.02 }}
                            >
                                <Sparkles className="w-4 h-4 text-gold animate-pulse" />
                                <span className="text-gold text-sm font-semibold uppercase tracking-wider">Get Started Today</span>
                            </motion.div>
                            
                            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-['Playfair_Display'] font-bold text-white leading-tight">
                                Ready to Build Africa's <span className="bg-gradient-to-r from-gold via-gold-light to-gold bg-clip-text text-transparent bg-[length:200%_auto] animate-shimmer">Future</span>?
                            </h2>
                            
                            <p className="mt-4 text-lg text-white/60 max-w-2xl mx-auto">
                                Join thousands of construction companies and clients already connected on our platform.
                            </p>
                            
                            <div className="mt-8 flex flex-wrap justify-center gap-4">
                                <motion.a 
                                    href="#" 
                                    className="px-8 py-4 bg-gradient-to-r from-gold to-gold-light text-[#0A1628] font-semibold rounded-xl hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-glow flex items-center gap-3 group"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <Rocket className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                                    Get Started Free
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </motion.a>
                                
                                <motion.a 
                                    href="#" 
                                    className="px-8 py-4 border-2 border-white/20 text-white font-semibold rounded-xl hover:bg-white hover:text-[#0A1628] transition-all duration-300 flex items-center gap-2 group"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <Shield className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                                    Learn More
                                </motion.a>
                            </div>
                            
                            <div className="mt-8 flex flex-wrap justify-center gap-6 text-white/30 text-sm">
                                <span className="flex items-center gap-2">
                                    <Zap className="w-4 h-4 text-gold" />
                                    No Credit Card Required
                                </span>
                                <span className="flex items-center gap-2">
                                    <Sparkles className="w-4 h-4 text-gold" />
                                    14-Day Free Trial
                                </span>
                                <span className="flex items-center gap-2">
                                    <Shield className="w-4 h-4 text-gold" />
                                    Cancel Anytime
                                </span>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};
export default GlassCTA;
