import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    Home,
    Building2,
    Briefcase,
    Heart,
    MessageCircle,
    User,
    Settings,
    Bell,
    Search,
    PlusCircle,
    ArrowRight,
    Eye,
    Star,
    Clock,
    Calendar,
    CheckCircle,
    AlertCircle,
    TrendingUp,
    TrendingDown,
    DollarSign,
    Users,
    FileText,
    Download,
    Printer,
    RefreshCw,
    MoreVertical
} from 'lucide-react';

const ClientDashboard = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('overview');

    // Mock data - In real app, fetch from API
    const stats = [
        { 
            icon: Heart, 
            label: 'Saved Companies', 
            value: '12', 
            change: '+3', 
            trend: 'up',
            color: 'from-red-500 to-pink-500',
            bg: 'bg-red-500/10'
        },
        { 
            icon: FileText, 
            label: 'My Tenders', 
            value: '5', 
            change: '+2', 
            trend: 'up',
            color: 'from-blue-500 to-indigo-500',
            bg: 'bg-blue-500/10'
        },
        { 
            icon: MessageCircle, 
            label: 'Messages', 
            value: '8', 
            change: '+5', 
            trend: 'up',
            color: 'from-emerald-500 to-teal-500',
            bg: 'bg-emerald-500/10'
        },
        { 
            icon: Eye, 
            label: 'Companies Viewed', 
            value: '24', 
            change: '+12%', 
            trend: 'up',
            color: 'from-purple-500 to-pink-500',
            bg: 'bg-purple-500/10'
        },
    ];

    const savedCompanies = [
        {
            id: 1,
            name: 'Mwangi Construction Ltd',
            location: 'Nairobi, Kenya',
            rating: 4.8,
            projects: 150,
            verified: true,
            image: '🏗️',
            savedDate: '2026-07-25'
        },
        {
            id: 2,
            name: 'Lesotho Building Co.',
            location: 'Maseru, Lesotho',
            rating: 4.9,
            projects: 200,
            verified: true,
            image: '🏢',
            savedDate: '2026-07-20'
        },
        {
            id: 3,
            name: 'EcoBuild Africa',
            location: 'Kigali, Rwanda',
            rating: 4.6,
            projects: 90,
            verified: true,
            image: '🌿',
            savedDate: '2026-07-15'
        },
    ];

    const recentTenders = [
        {
            id: 1,
            title: 'School Construction',
            location: 'Maseru, Lesotho',
            budget: 'M 50M',
            deadline: '2026-08-15',
            status: 'Open',
            applications: 12
        },
        {
            id: 2,
            title: 'Hospital Renovation',
            location: 'Kigali, Rwanda',
            budget: 'M 80M',
            deadline: '2026-07-30',
            status: 'Closing Soon',
            applications: 15
        },
    ];

    const recentMessages = [
        {
            id: 1,
            from: 'Mwangi Construction Ltd',
            subject: 'Project Quote',
            message: 'Thank you for your inquiry. We have prepared a quote for...',
            time: '2 hours ago',
            read: false
        },
        {
            id: 2,
            from: 'Lesotho Building Co.',
            subject: 'Availability Inquiry',
            message: 'We are available for the project starting next month...',
            time: '5 hours ago',
            read: false
        },
        {
            id: 3,
            from: 'EcoBuild Africa',
            subject: 'Portfolio Update',
            message: 'We have added new sustainable projects to our portfolio...',
            time: '1 day ago',
            read: true
        },
    ];

    useEffect(() => {
        setTimeout(() => setIsLoading(false), 1000);
    }, []);

    const getStatusColor = (status) => {
        const colors = {
            'Open': 'bg-emerald-500/20 text-emerald-400',
            'Closing Soon': 'bg-yellow-500/20 text-yellow-400',
            'Closed': 'bg-red-500/20 text-red-400',
        };
        return colors[status] || 'bg-gray-500/20 text-gray-400';
    };

    return (
        <div className="min-h-screen bg-[#0A1628] py-6 md:py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* ===== HEADER ===== */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6 md:mb-8">
                    <div>
                        <h1 className="text-2xl md:text-3xl font-['Playfair_Display'] font-bold text-white">
                            Client Dashboard
                        </h1>
                        <p className="text-gray-400 text-sm mt-1">Welcome back! Here's what's happening with your projects</p>
                    </div>
                    <div className="flex flex-wrap gap-3">
                        <Link
                            to="/client/tenders/create"
                            className="px-4 py-2 bg-gold text-[#0A1628] font-semibold rounded-xl hover:bg-gold-light transition-all duration-300 flex items-center gap-2 text-sm shadow-lg hover:shadow-glow"
                        >
                            <PlusCircle className="w-4 h-4" />
                            <span className="hidden sm:inline">Post Tender</span>
                            <span className="sm:hidden">Add</span>
                        </Link>
                        <button className="px-3 py-2 bg-[#111C2E] border border-white/10 rounded-xl hover:border-gold/30 transition-all duration-300 flex items-center gap-2 text-gray-400 hover:text-white text-sm">
                            <RefreshCw className="w-4 h-4" />
                            <span className="hidden sm:inline">Refresh</span>
                        </button>
                    </div>
                </div>

                {/* ===== STATS CARDS ===== */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-6 md:mb-8">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: index * 0.05 }}
                            className="bg-[#111C2E] border border-white/5 rounded-xl md:rounded-2xl p-3 md:p-4 hover:border-gold/30 transition-all duration-300 hover:-translate-y-1"
                        >
                            <div className={`w-8 h-8 md:w-10 md:h-10 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-2 md:mb-3`}>
                                <stat.icon className="w-4 h-4 md:w-5 md:h-5 text-white" />
                            </div>
                            <p className="text-lg md:text-2xl font-bold text-white">{stat.value}</p>
                            <p className="text-xs text-gray-400">{stat.label}</p>
                            <div className={`flex items-center gap-1 text-xs mt-1 ${stat.trend === 'up' ? 'text-emerald-400' : 'text-red-400'}`}>
                                {stat.trend === 'up' ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                                {stat.change}
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* ===== MAIN CONTENT ===== */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
                    {/* ===== SAVED COMPANIES ===== */}
                    <div className="lg:col-span-2">
                        <div className="bg-[#111C2E] border border-white/5 rounded-xl md:rounded-2xl overflow-hidden">
                            <div className="p-4 md:p-6 border-b border-white/5 flex items-center justify-between">
                                <h2 className="text-base md:text-lg font-semibold text-white">Saved Companies</h2>
                                <Link to="/client/saved" className="text-sm text-gold hover:text-gold-light transition-colors flex items-center gap-1">
                                    View All <ArrowRight className="w-4 h-4" />
                                </Link>
                            </div>
                            <div className="divide-y divide-white/5">
                                {savedCompanies.map((company) => (
                                    <div key={company.id} className="p-3 md:p-4 hover:bg-white/5 transition-colors">
                                        <div className="flex items-center gap-3 md:gap-4">
                                            <div className="text-3xl md:text-4xl flex-shrink-0">{company.image}</div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center gap-2">
                                                    <h3 className="font-semibold text-white text-sm md:text-base truncate">{company.name}</h3>
                                                    {company.verified && (
                                                        <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-400 text-xs rounded-full">✓</span>
                                                    )}
                                                </div>
                                                <p className="text-sm text-gray-400 truncate">{company.location}</p>
                                                <div className="flex items-center gap-3 mt-1 text-sm">
                                                    <span className="flex items-center gap-1 text-gold">
                                                        <Star className="w-4 h-4 fill-gold" /> {company.rating}
                                                    </span>
                                                    <span className="text-gray-500">|</span>
                                                    <span className="text-gray-400">{company.projects} projects</span>
                                                </div>
                                            </div>
                                            <Link
                                                to={`/constructors/${company.id}`}
                                                className="px-3 py-1.5 bg-[#1A2A4A] text-white text-sm rounded-lg hover:bg-[#2A3A5A] transition-colors flex-shrink-0"
                                            >
                                                View
                                            </Link>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* ===== RIGHT COLUMN ===== */}
                    <div className="space-y-4 md:space-y-6">
                        {/* ===== RECENT TENDERS ===== */}
                        <div className="bg-[#111C2E] border border-white/5 rounded-xl md:rounded-2xl p-4 md:p-6">
                            <h2 className="text-base md:text-lg font-semibold text-white mb-4">Recent Tenders</h2>
                            <div className="space-y-3">
                                {recentTenders.map((tender) => (
                                    <div key={tender.id} className="p-3 bg-[#1A2A4A] rounded-xl">
                                        <div className="flex items-start justify-between">
                                            <div className="min-w-0">
                                                <p className="font-medium text-white text-sm truncate">{tender.title}</p>
                                                <p className="text-sm text-gray-400 truncate">{tender.location}</p>
                                            </div>
                                            <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(tender.status)} flex-shrink-0`}>
                                                {tender.status}
                                            </span>
                                        </div>
                                        <div className="flex items-center justify-between mt-2 text-sm">
                                            <span className="text-gold font-semibold">{tender.budget}</span>
                                            <span className="text-gray-400">{tender.applications} applications</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <Link to="/client/tenders" className="mt-4 block text-center text-sm text-gold hover:text-gold-light transition-colors">
                                View All Tenders
                            </Link>
                        </div>

                        {/* ===== RECENT MESSAGES ===== */}
                        <div className="bg-[#111C2E] border border-white/5 rounded-xl md:rounded-2xl p-4 md:p-6">
                            <h2 className="text-base md:text-lg font-semibold text-white mb-4">Recent Messages</h2>
                            <div className="space-y-3">
                                {recentMessages.map((message) => (
                                    <div key={message.id} className={`p-3 rounded-xl transition-colors ${message.read ? 'bg-[#1A2A4A]' : 'bg-gold/10 border border-gold/30'}`}>
                                        <div className="flex items-start gap-3">
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center justify-between">
                                                    <p className="font-semibold text-white text-sm truncate">{message.from}</p>
                                                    <span className="text-xs text-gray-400 flex-shrink-0">{message.time}</span>
                                                </div>
                                                <p className="text-sm text-gray-400 truncate">{message.message}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <Link to="/client/messages" className="mt-4 block text-center text-sm text-gold hover:text-gold-light transition-colors">
                                View All Messages
                            </Link>
                        </div>
                    </div>
                </div>

                {/* ===== LOADING STATE ===== */}
                {isLoading && (
                    <div className="fixed inset-0 bg-[#0A1628]/80 backdrop-blur-sm flex items-center justify-center z-50">
                        <div className="flex flex-col items-center">
                            <div className="w-12 h-12 border-4 border-gold/20 border-t-gold rounded-full animate-spin" />
                            <p className="text-white/60 mt-4 text-sm">Loading...</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ClientDashboard;
