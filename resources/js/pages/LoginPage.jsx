import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, ArrowRight, Building2, User, AlertCircle } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import toast from 'react-hot-toast';

const LoginPage = () => {
    const navigate = useNavigate();
    const { login, loading } = useAuth();
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        remember: false
    });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        // Validate
        if (!formData.email || !formData.password) {
            toast.error('Please fill in all fields');
            setIsLoading(false);
            return;
        }

        try {
            const result = await login(formData.email, formData.password);
            
            if (result.success) {
                toast.success('Welcome back! Redirecting...');
                // Redirect based on role
                const userRole = result.user?.role || 'client';
                if (userRole === 'admin') {
                    navigate('/admin/dashboard');
                } else if (userRole === 'constructor') {
                    navigate('/constructor/dashboard');
                } else {
                    navigate('/');
                }
            } else {
                setError(result.error || 'Login failed. Please check your credentials.');
                toast.error(result.error || 'Invalid email or password');
            }
        } catch (error) {
            setError('An unexpected error occurred. Please try again.');
            toast.error('Login failed. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#0A1628] to-[#1A2A4A] flex items-center justify-center py-12 px-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-md w-full"
            >
                <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10 shadow-2xl">
                    {/* Logo/Header */}
                    <div className="text-center mb-8">
                        <div className="w-16 h-16 bg-gradient-to-r from-gold to-gold-light rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-gold/20">
                            <span className="text-[#0A1628] font-['Space_Grotesk'] font-bold text-2xl">R</span>
                        </div>
                        <h1 className="text-2xl font-['Playfair_Display'] font-bold text-white">Welcome Back</h1>
                        <p className="text-white/40 text-sm mt-1">Sign in to your Mofokeng Interconnect account</p>
                    </div>

                    {error && (
                        <div className="mb-4 p-3 bg-red-500/20 border border-red-500/30 rounded-xl flex items-center gap-2 text-red-400 text-sm">
                            <AlertCircle className="w-5 h-5" />
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label className="block text-white/60 text-sm font-medium mb-2">Email Address</label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-gold/50 transition-colors"
                                    placeholder="sebuticalvi@gmail.com"
                                    required
                                    autoComplete="email"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-white/60 text-sm font-medium mb-2">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="w-full pl-12 pr-12 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-gold/50 transition-colors"
                                    placeholder="••••••••"
                                    required
                                    autoComplete="current-password"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors"
                                >
                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <label className="flex items-center gap-2 text-sm text-white/40 cursor-pointer">
                                <input
                                    type="checkbox"
                                    name="remember"
                                    checked={formData.remember}
                                    onChange={handleChange}
                                    className="rounded border-white/20 bg-white/5 text-gold focus:ring-gold"
                                />
                                Remember me
                            </label>
                            <Link to="/forgot-password" className="text-sm text-gold hover:text-gold-light transition-colors">
                                Forgot password?
                            </Link>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full py-3 bg-gradient-to-r from-gold to-gold-light text-[#0A1628] font-semibold rounded-xl hover:scale-[1.02] transition-all duration-300 shadow-lg hover:shadow-glow flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {isLoading ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-[#0A1628] border-t-transparent rounded-full animate-spin" />
                                    Signing In...
                                </>
                            ) : (
                                <>
                                    Sign In
                                    <ArrowRight className="w-4 h-4" />
                                </>
                            )}
                        </button>
                    </form>

                    <p className="text-center text-white/40 text-sm mt-6">
                        Don't have an account?{' '}
                        <Link to="/register" className="text-gold hover:text-gold-light transition-colors font-medium">
                            Sign Up
                        </Link>
                    </p>

                    {/* Quick Login Demo Credentials */}
                    <div className="mt-6 pt-6 border-t border-white/10">
                        <p className="text-white/30 text-xs text-center mb-3">Demo Credentials</p>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                            <button
                                onClick={() => {
                                    setFormData({ email: 'sebuticalvi@gmail.com', password: 'Mofokeng123', remember: false });
                                }}
                                className="px-3 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-white/60 hover:text-white text-xs transition-colors border border-white/5"
                            >
                                👑 Admin
                            </button>
                            <button
                                onClick={() => {
                                    setFormData({ email: 'constructor@Mofokeng.com', password: 'Mofokeng123', remember: false });
                                }}
                                className="px-3 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-white/60 hover:text-white text-xs transition-colors border border-white/5"
                            >
                                🏗️ Constructor
                            </button>
                            <button
                                onClick={() => {
                                    setFormData({ email: 'client@Mofokeng.com', password: 'Mofokeng123', remember: false });
                                }}
                                className="px-3 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-white/60 hover:text-white text-xs transition-colors border border-white/5"
                            >
                                👤 Client
                            </button>
                        </div>
                        <p className="text-white/20 text-[10px] text-center mt-2">Password: Mofokeng123</p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default LoginPage;
