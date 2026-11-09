import React from 'react';
import { 
    ShieldCheck, 
    Camera, 
    MessageCircle, 
    Lock,
    Sparkles,
    TrendingUp,
    Award,
    Zap
} from 'lucide-react';
import { motion } from 'framer-motion';

const features = [
    {
        icon: ShieldCheck,
        title: 'Verified Companies',
        desc: 'Every company is thoroughly vetted and verified for quality and reliability.',
        gradient: 'from-emerald-500 to-teal-500',
        bgGradient: 'from-emerald-500/10 to-teal-500/10'
    },
    {
        icon: Camera,
        title: 'Real Portfolios',
        desc: 'View actual completed projects and see the quality of work firsthand.',
        gradient: 'from-blue-500 to-indigo-500',
        bgGradient: 'from-blue-500/10 to-indigo-500/10'
    },
    {
        icon: MessageCircle,
        title: 'Direct Messaging',
        desc: 'Communicate directly with construction companies instantly and securely.',
        gradient: 'from-purple-500 to-pink-500',
        bgGradient: 'from-purple-500/10 to-pink-500/10'
    },
    {
        icon: Lock,
        title: 'Secure Payments',
        desc: 'M-Pesa, EcoCash, and bank payments all integrated securely.',
        gradient: 'from-orange-500 to-red-500',
        bgGradient: 'from-orange-500/10 to-red-500/10'
    },
];

export const GlassFeatures = () => {
    return (
        <section className="py-32 bg-gradient-to-b from-[#FAF8F5] to-white relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('/images/grid.svg')] opacity-5" />
            
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-20"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-gold/10 rounded-full mb-4">
                        <Sparkles className="w-4 h-4 text-gold" />
                        <span className="text-gold text-sm font-semibold uppercase tracking-wider">Why Choose Us</span>
                    </div>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-['Playfair_Display'] font-bold text-[#0A1628]">
                        Why Choose <span className="bg-gradient-to-r from-gold to-gold-light bg-clip-text text-transparent">Mofokeng</span>
                    </h2>
                    <p className="mt-4 text-lg text-gray-600">Connecting the construction industry like never before</p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ y: -8 }}
                            className="group"
                        >
                            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 text-center border border-white/50 hover:border-gold/20 relative overflow-hidden">
                                <div className={`absolute inset-0 bg-gradient-to-br ${feature.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                                
                                <div className={`relative w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                                    <feature.icon className="w-8 h-8 text-white" />
                                </div>
                                
                                <h3 className="relative text-xl font-semibold text-[#0A1628] group-hover:text-gold transition-colors duration-300">
                                    {feature.title}
                                </h3>
                                <p className="relative mt-2 text-gray-600 text-sm leading-relaxed">
                                    {feature.desc}
                                </p>
                                
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    whileHover={{ opacity: 1 }}
                                    className="relative mt-4 text-gold font-semibold text-sm flex items-center justify-center gap-2"
                                >
                                    Learn More
                                    <TrendingUp className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </motion.div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
export default GlassFeatures;
