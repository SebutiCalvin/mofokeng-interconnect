import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, ArrowLeft, CheckCircle } from 'lucide-react';

export const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        setLoading(false);
        setSubmitted(true);
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center bg-gradient-to-br from-[#0A1628] via-[#1A2A4A] to-[#0A1628] p-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="w-full max-w-md"
            >
                <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10 shadow-2xl">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <div className="w-16 h-16 bg-gold/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                            <Mail className="w-8 h-8 text-gold" />
                        </div>
                        <h2 className="text-2xl font-['Playfair_Display'] font-bold text-white">Reset Password</h2>
                        <p className="text-white/40 text-sm mt-1">
                            Enter your email to receive reset instructions
                        </p>
                    </div>

                    {submitted ? (
                        // Success Message
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="text-center"
                        >
                            <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                <CheckCircle className="w-10 h-10 text-emerald-400" />
                            </div>
                            <h3 className="text-white text-lg font-semibold">Check Your Email</h3>
                            <p className="text-white/40 text-sm mt-2">
                                We've sent password reset instructions to <strong className="text-white">{email}</strong>
                            </p>
                            <Link
                                to="/login"
                                className="mt-6 inline-block px-6 py-3 bg-gold text-[#0A1628] font-semibold rounded-xl hover:bg-gold-light transition-all duration-300"
                            >
                                Back to Login
                            </Link>
                        </motion.div>
                    ) : (
                        // Form
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-white/60 text-sm font-medium mb-2">Email Address</label>
                                <div className="relative">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-gold/50 transition-colors"
                                        placeholder="you@example.com"
                                        required
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-3 bg-gradient-to-r from-gold to-gold-light text-[#0A1628] font-semibold rounded-xl hover:scale-[1.02] transition-all duration-300 shadow-lg hover:shadow-glow disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? (
                                    <span className="flex items-center justify-center gap-2">
                                        <svg className="w-5 h-5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Sending...
                                    </span>
                                ) : (
                                    'Send Reset Instructions'
                                )}
                            </button>

                            <div className="text-center">
                                <Link to="/login" className="text-white/40 hover:text-gold transition-colors text-sm flex items-center justify-center gap-2">
                                    <ArrowLeft className="w-4 h-4" />
                                    Back to Login
                                </Link>
                            </div>
                        </form>
                    )}
                </div>
            </motion.div>
        </div>
    );
};
