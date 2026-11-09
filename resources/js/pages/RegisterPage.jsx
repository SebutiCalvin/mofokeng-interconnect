import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Mail, Lock, Phone, Building2, Eye, EyeOff, ArrowRight, AlertCircle } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import toast from 'react-hot-toast';

const RegisterPage = () => {
    const navigate = useNavigate();
    const { register, loading } = useAuth();
    const [showPassword, setShowPassword] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        role: 'client',
        company_name: '',
        password: '',
        password_confirmation: '',
        terms: false
    });
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
        // Clear error for this field
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setErrors({});

        // Validate terms
        if (!formData.terms) {
            toast.error('Please agree to the Terms of Service');
            setIsSubmitting(false);
            return;
        }

        // Validate password match
        if (formData.password !== formData.password_confirmation) {
            toast.error('Passwords do not match');
            setIsSubmitting(false);
            return;
        }

        try {
            const result = await register(formData);
            
            if (result.success) {
                toast.success('Registration successful! Welcome to Mofokeng Interconnect!');
                // Redirect based on role
                if (formData.role === 'constructor') {
                    navigate('/constructor/dashboard');
                } else {
                    navigate('/');
                }
            } else {
                if (result.errors) {
                    setErrors(result.errors);
                    // Show first error as toast
                    const firstError = Object.values(result.errors)[0];
                    if (Array.isArray(firstError)) {
                        toast.error(firstError[0]);
                    } else {
                        toast.error(firstError || 'Registration failed');
                    }
                } else {
                    toast.error(result.error || 'Registration failed. Please try again.');
                }
            }
        } catch (error) {
            toast.error('An unexpected error occurred. Please try again.');
        } finally {
            setIsSubmitting(false);
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
                    <div className="text-center mb-6">
                        <div className="w-16 h-16 bg-gradient-to-r from-gold to-gold-light rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-gold/20">
                            <span className="text-[#0A1628] font-['Space_Grotesk'] font-bold text-2xl">R</span>
                        </div>
                        <h1 className="text-2xl font-['Playfair_Display'] font-bold text-white">Create Account</h1>
                        <p className="text-white/40 text-sm mt-1">Join Mofokeng Interconnect today</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-white/60 text-sm font-medium mb-2">Full Name</label>
                            <div className="relative">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className={`w-full pl-12 pr-4 py-3 bg-white/5 border ${errors.name ? 'border-red-500' : 'border-white/10'} rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-gold/50 transition-colors`}
                                    placeholder="John Doe"
                                    required
                                />
                            </div>
                            {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name[0]}</p>}
                        </div>

                        <div>
                            <label className="block text-white/60 text-sm font-medium mb-2">Email Address</label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className={`w-full pl-12 pr-4 py-3 bg-white/5 border ${errors.email ? 'border-red-500' : 'border-white/10'} rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-gold/50 transition-colors`}
                                    placeholder="you@example.com"
                                    required
                                />
                            </div>
                            {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email[0]}</p>}
                        </div>

                        <div>
                            <label className="block text-white/60 text-sm font-medium mb-2">Phone Number</label>
                            <div className="relative">
                                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className={`w-full pl-12 pr-4 py-3 bg-white/5 border ${errors.phone ? 'border-red-500' : 'border-white/10'} rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-gold/50 transition-colors`}
                                    placeholder="+266 5888 8888"
                                    required
                                />
                            </div>
                            {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone[0]}</p>}
                        </div>

                        <div>
                            <label className="block text-white/60 text-sm font-medium mb-2">I am a</label>
                            <div className="grid grid-cols-2 gap-3">
                                <button
                                    type="button"
                                    onClick={() => setFormData({ ...formData, role: 'client' })}
                                    className={`py-3 rounded-xl border transition-all duration-300 flex items-center justify-center gap-2 ${
                                        formData.role === 'client'
                                            ? 'border-gold bg-gold/20 text-gold'
                                            : 'border-white/10 text-white/40 hover:border-white/20'
                                    }`}
                                >
                                    <User className="w-4 h-4" />
                                    Client
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setFormData({ ...formData, role: 'constructor' })}
                                    className={`py-3 rounded-xl border transition-all duration-300 flex items-center justify-center gap-2 ${
                                        formData.role === 'constructor'
                                            ? 'border-gold bg-gold/20 text-gold'
                                            : 'border-white/10 text-white/40 hover:border-white/20'
                                    }`}
                                >
                                    <Building2 className="w-4 h-4" />
                                    Constructor
                                </button>
                            </div>
                        </div>

                        {formData.role === 'constructor' && (
                            <div>
                                <label className="block text-white/60 text-sm font-medium mb-2">Company Name</label>
                                <div className="relative">
                                    <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
                                    <input
                                        type="text"
                                        name="company_name"
                                        value={formData.company_name}
                                        onChange={handleChange}
                                        className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-gold/50 transition-colors"
                                        placeholder="Your Construction Company"
                                    />
                                </div>
                            </div>
                        )}

                        <div>
                            <label className="block text-white/60 text-sm font-medium mb-2">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className={`w-full pl-12 pr-12 py-3 bg-white/5 border ${errors.password ? 'border-red-500' : 'border-white/10'} rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-gold/50 transition-colors`}
                                    placeholder="••••••••"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors"
                                >
                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                            {errors.password && <p className="text-red-400 text-xs mt-1">{errors.password[0]}</p>}
                        </div>

                        <div>
                            <label className="block text-white/60 text-sm font-medium mb-2">Confirm Password</label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
                                <input
                                    type="password"
                                    name="password_confirmation"
                                    value={formData.password_confirmation}
                                    onChange={handleChange}
                                    className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-gold/50 transition-colors"
                                    placeholder="••••••••"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="flex items-start gap-2 text-sm text-white/40 cursor-pointer">
                                <input
                                    type="checkbox"
                                    name="terms"
                                    checked={formData.terms}
                                    onChange={handleChange}
                                    className="mt-1 w-4 h-4 text-gold border-white/20 bg-white/5 rounded focus:ring-gold"
                                    required
                                />
                                <span>
                                    I agree to the{' '}
                                    <Link to="/terms" className="text-gold hover:text-gold-light transition-colors">Terms of Service</Link>
                                    {' '}and{' '}
                                    <Link to="/privacy" className="text-gold hover:text-gold-light transition-colors">Privacy Policy</Link>
                                </span>
                            </label>
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting || !formData.terms}
                            className="w-full py-3 bg-gradient-to-r from-gold to-gold-light text-[#0A1628] font-semibold rounded-xl hover:scale-[1.02] transition-all duration-300 shadow-lg hover:shadow-glow flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isSubmitting ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-[#0A1628] border-t-transparent rounded-full animate-spin" />
                                    Creating Account...
                                </>
                            ) : (
                                <>
                                    Create Account
                                    <ArrowRight className="w-4 h-4" />
                                </>
                            )}
                        </button>
                    </form>

                    <p className="text-center text-white/40 text-sm mt-6">
                        Already have an account?{' '}
                        <Link to="/login" className="text-gold hover:text-gold-light transition-colors font-medium">
                            Sign In
                        </Link>
                    </p>
                </div>
            </motion.div>
        </div>
    );
};

export default RegisterPage;
