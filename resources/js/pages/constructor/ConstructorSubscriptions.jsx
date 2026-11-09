import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
    CreditCard,
    CheckCircle,
    Crown,
    Sparkles,
    Building2,
    Users,
    Briefcase,
    Star,
    ArrowRight,
    Clock,
    Shield,
    Zap,
    Award,
    Calendar,
    DollarSign,
    AlertCircle,
    Loader2
} from 'lucide-react';
import api from '../../services/api';
import toast from 'react-hot-toast';

const ConstructorSubscriptions = () => {
    const [selectedPlan, setSelectedPlan] = useState(null);
    const [paymentMethod, setPaymentMethod] = useState('mpesa');
    const [isProcessing, setIsProcessing] = useState(false);
    const [paymentSuccess, setPaymentSuccess] = useState(false);

    const currentPlan = {
        name: 'Professional',
        price: 'M 12,000',
        period: 'monthly',
        features: ['Unlimited Projects', 'Featured Listing', 'Priority Support', 'Analytics Dashboard'],
        expiresAt: '2026-09-15',
        status: 'Active'
    };

    const plans = [
        {
            id: 'basic',
            name: 'Basic',
            price: 5000,
            period: 'monthly',
            features: ['Profile Listing', '10 Projects', 'Basic Messaging'],
            popular: false,
            icon: Building2,
            color: 'from-blue-500 to-indigo-500'
        },
        {
            id: 'professional',
            name: 'Professional',
            price: 12000,
            period: 'monthly',
            features: ['Unlimited Projects', 'Featured Listing', 'Priority Support', 'Analytics Dashboard'],
            popular: true,
            icon: Crown,
            color: 'from-gold to-gold-light'
        },
        {
            id: 'enterprise',
            name: 'Enterprise',
            price: 25000,
            period: 'monthly',
            features: ['Team Accounts', 'API Access', 'Dedicated Support', 'Custom Branding', 'Advanced Analytics'],
            popular: false,
            icon: Sparkles,
            color: 'from-purple-500 to-pink-500'
        },
    ];

    const handleSubscribe = async () => {
        if (!selectedPlan) {
            toast.error('Please select a plan');
            return;
        }

        if (!paymentMethod) {
            toast.error('Please select a payment method');
            return;
        }

        setIsProcessing(true);
        try {
            const response = await api.post('/payments/initiate', {
                plan: selectedPlan,
                payment_method: paymentMethod,
            });

            const { payment_url, reference } = response.data;
            toast.success(`Payment initiated! Reference: ${reference}`);

            // Simulate payment success for demo
            setTimeout(() => {
                setPaymentSuccess(true);
                setIsProcessing(false);
                toast.success('Subscription activated successfully!');
            }, 3000);

        } catch (error) {
            toast.error(error.response?.data?.message || 'Payment initiation failed');
            setIsProcessing(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#0A1628] py-6 md:py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-6 md:mb-8">
                    <h1 className="text-2xl md:text-3xl font-['Playfair_Display'] font-bold text-white">
                        Subscriptions
                    </h1>
                    <p className="text-gray-400 text-sm mt-1">Manage your subscription plans and billing</p>
                </div>

                {/* Current Plan */}
                <div className="bg-[#111C2E] border border-white/5 rounded-2xl p-4 md:p-6 mb-6 md:mb-8">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div>
                            <div className="flex items-center gap-2">
                                <h2 className="text-lg font-semibold text-white">Current Plan</h2>
                                <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 text-xs font-semibold rounded-full flex items-center gap-1">
                                    <CheckCircle className="w-3 h-3" /> {currentPlan.status}
                                </span>
                            </div>
                            <p className="text-2xl font-bold text-gold mt-1">{currentPlan.name}</p>
                            <div className="flex flex-wrap gap-4 mt-2 text-sm text-gray-400">
                                <span className="flex items-center gap-1">
                                    <DollarSign className="w-4 h-4" /> {currentPlan.price}/{currentPlan.period}
                                </span>
                                <span className="flex items-center gap-1">
                                    <Calendar className="w-4 h-4" /> Expires: {currentPlan.expiresAt}
                                </span>
                            </div>
                        </div>
                        <div className="flex flex-wrap gap-3">
                            <button className="px-4 py-2 bg-[#1A2A4A] text-white rounded-xl hover:bg-[#2A3A5A] transition-colors text-sm">
                                Manage Billing
                            </button>
                            <button className="px-4 py-2 bg-red-500/10 text-red-400 rounded-xl hover:bg-red-500/20 transition-colors text-sm">
                                Cancel Subscription
                            </button>
                        </div>
                    </div>
                    <div className="mt-4 pt-4 border-t border-white/5">
                        <div className="flex flex-wrap gap-3">
                            {currentPlan.features.map((feature, index) => (
                                <span key={index} className="flex items-center gap-1 text-sm text-gray-300">
                                    <CheckCircle className="w-4 h-4 text-emerald-400" /> {feature}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Plan Selection */}
                <h2 className="text-xl font-['Playfair_Display'] font-bold text-white mb-4">Choose Your Plan</h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-6">
                    {plans.map((plan) => (
                        <motion.div
                            key={plan.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4 }}
                            className={`bg-[#111C2E] border rounded-2xl p-4 md:p-6 cursor-pointer transition-all duration-300 hover:border-gold/50 ${
                                selectedPlan === plan.id ? 'border-gold ring-2 ring-gold/30' : 'border-white/10'
                            }`}
                            onClick={() => setSelectedPlan(plan.id)}
                        >
                            {plan.popular && (
                                <div className="bg-gold text-[#0A1628] text-center py-1 text-xs font-semibold rounded-t-lg -mt-4 -mx-4 mb-4">
                                    Most Popular
                                </div>
                            )}
                            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${plan.color} flex items-center justify-center mb-4`}>
                                <plan.icon className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="text-xl font-bold text-white">{plan.name}</h3>
                            <div className="mt-2">
                                <span className="text-3xl font-bold text-gold">M {plan.price.toLocaleString()}</span>
                                <span className="text-gray-400">/{plan.period}</span>
                            </div>
                            <ul className="mt-4 space-y-2">
                                {plan.features.map((feature, idx) => (
                                    <li key={idx} className="flex items-start gap-2 text-sm text-gray-300">
                                        <CheckCircle className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}
                </div>

                {/* Payment Method Selection */}
                {selectedPlan && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-[#111C2E] border border-white/10 rounded-2xl p-4 md:p-6 mb-6"
                    >
                        <h3 className="text-lg font-semibold text-white mb-4">Select Payment Method</h3>
                        <div className="flex flex-wrap gap-4">
                            {['mpesa', 'ecocash', 'bank'].map((method) => (
                                <button
                                    key={method}
                                    onClick={() => setPaymentMethod(method)}
                                    className={`px-6 py-3 rounded-xl border transition-all duration-300 flex items-center gap-2 capitalize text-sm ${
                                        paymentMethod === method
                                            ? 'border-gold bg-gold/10 text-gold'
                                            : 'border-white/10 text-gray-400 hover:border-white/30'
                                    }`}
                                >
                                    {method === 'mpesa' && '📱 M-Pesa'}
                                    {method === 'ecocash' && '📱 EcoCash'}
                                    {method === 'bank' && '🏦 Bank Transfer'}
                                </button>
                            ))}
                        </div>
                    </motion.div>
                )}

                {/* Subscribe Button */}
                {selectedPlan && paymentMethod && (
                    <motion.button
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        onClick={handleSubscribe}
                        disabled={isProcessing}
                        className="w-full py-4 bg-gold text-[#0A1628] font-semibold rounded-xl hover:bg-gold-light transition-all duration-300 flex items-center justify-center gap-2 text-lg disabled:opacity-50"
                    >
                        {isProcessing ? (
                            <>
                                <Loader2 className="w-5 h-5 animate-spin" />
                                Processing...
                            </>
                        ) : (
                            <>
                                Subscribe Now
                                <ArrowRight className="w-5 h-5" />
                            </>
                        )}
                    </motion.button>
                )}

                {/* Payment Success */}
                {paymentSuccess && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-6 p-4 bg-emerald-500/20 border border-emerald-500/30 rounded-xl flex items-center gap-3 text-emerald-400"
                    >
                        <CheckCircle className="w-5 h-5" />
                        Subscription activated successfully! Your plan has been upgraded.
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default ConstructorSubscriptions;
