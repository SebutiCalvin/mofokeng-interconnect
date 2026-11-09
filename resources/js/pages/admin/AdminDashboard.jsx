import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    Users,
    Building2,
    Briefcase,
    DollarSign,
    FileText,
    MessageCircle,
    TrendingUp,
    TrendingDown,
    Eye,
    Star,
    Clock,
    Calendar,
    CheckCircle,
    AlertCircle,
    Shield,
    Award,
    Settings,
    Download,
    RefreshCw,
    UserPlus,
    ArrowRight,
    Search,
    Filter,
    MoreVertical,
    UserCheck,
    UserX
} from 'lucide-react';

const AdminDashboard = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [selectedPeriod, setSelectedPeriod] = useState('month');

    // Mock data - In real app, fetch from API
    const stats = [
        { 
            icon: Users, 
            label: 'Total Users', 
            value: '1,247', 
            change: '+12.5%', 
            trend: 'up',
            color: 'from-blue-500 to-indigo-500',
            bg: 'bg-blue-500/10'
        },
        { 
            icon: Building2, 
            label: 'Constructors', 
            value: '156', 
            change: '+8.3%', 
            trend: 'up',
            color: 'from-emerald-500 to-teal-500',
            bg: 'bg-emerald-500/10'
        },
        { 
            icon: Briefcase, 
            label: 'Projects', 
            value: '892', 
            change: '+18.2%', 
            trend: 'up',
            color: 'from-purple-500 to-pink-500',
            bg: 'bg-purple-500/10'
        },
        { 
            icon: DollarSign, 
            label: 'Revenue', 
            value: 'M 2.4M', 
            change: '+22.7%', 
            trend: 'up',
            color: 'from-gold to-gold-light',
            bg: 'bg-gold/10'
        },
        { 
            icon: FileText, 
            label: 'Tenders', 
            value: '67', 
            change: '+5.4%', 
            trend: 'up',
            color: 'from-orange-500 to-red-500',
            bg: 'bg-orange-500/10'
        },
        { 
            icon: MessageCircle, 
            label: 'Messages', 
            value: '1,234', 
            change: '+15.8%', 
            trend: 'up',
            color: 'from-cyan-500 to-blue-500',
            bg: 'bg-cyan-500/10'
        },
    ];

    const recentActivity = [
        { action: 'New user registered', details: 'John Mwangi - Constructor', time: '2 hours ago', type: 'user' },
        { action: 'New project uploaded', details: 'Modern Eco Villa by Mwangi Construction', time: '4 hours ago', type: 'project' },
        { action: 'Subscription payment', details: 'Lesotho Building Co. - M 12,000', time: '6 hours ago', type: 'payment' },
        { action: 'New tender posted', details: 'School Construction - Maseru', time: '1 day ago', type: 'tender' },
        { action: 'Account verification', details: 'EcoBuild Africa - Verified', time: '2 days ago', type: 'verification' },
    ];

    const pendingApprovals = [
        { id: 1, name: 'Desert Constructors', type: 'Constructor', status: 'Pending', date: '2026-07-28' },
        { id: 2, name: 'Nile Valley Construction', type: 'Constructor', status: 'Pending', date: '2026-07-27' },
        { id: 3, name: 'Modern Villa Project', type: 'Project', status: 'Pending', date: '2026-07-26' },
        { id: 4, name: 'Coastal Engineering', type: 'Constructor', status: 'Pending', date: '2026-07-25' },
    ];

    const subscriptionStats = [
        { plan: 'Basic', count: 45, revenue: 'M 225,000' },
        { plan: 'Professional', count: 28, revenue: 'M 336,000' },
        { plan: 'Enterprise', count: 12, revenue: 'M 300,000' },
    ];

    useEffect(() => {
        setTimeout(() => setIsLoading(false), 1000);
    }, []);

    const getActivityIcon = (type) => {
        const icons = {
            user: <UserPlus className="w-4 h-4 text-blue-400" />,
            project: <Briefcase className="w-4 h-4 text-purple-400" />,
            payment: <DollarSign className="w-4 h-4 text-emerald-400" />,
            tender: <FileText className="w-4 h-4 text-orange-400" />,
            verification: <Shield className="w-4 h-4 text-indigo-400" />,
        };
        return icons[type] || <AlertCircle className="w-4 h-4 text-gray-400" />;
    };

    return (
        <div className="min-h-screen bg-[#0A1628] py-6 md:py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* ===== HEADER ===== */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6 md:mb-8">
                    <div>
                        <h1 className="text-2xl md:text-3xl font-['Playfair_Display'] font-bold text-white">
                            Admin Dashboard
                        </h1>
                        <p className="text-gray-400 text-sm mt-1">Manage your platform and monitor performance</p>
                    </div>
                    <div className="flex flex-wrap gap-3">
                        <select
                            value={selectedPeriod}
                            onChange={(e) => setSelectedPeriod(e.target.value)}
                            className="px-3 py-2 bg-[#111C2E] border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-gold/50 transition-colors"
                        >
                            <option value="week">This Week</option>
                            <option value="month">This Month</option>
                            <option value="quarter">This Quarter</option>
                            <option value="year">This Year</option>
                        </select>
                        <button className="px-3 py-2 bg-[#111C2E] border border-white/10 rounded-xl hover:border-gold/30 transition-all duration-300 flex items-center gap-2 text-gray-400 hover:text-white text-sm">
                            <Download className="w-4 h-4" />
                            <span className="hidden sm:inline">Export</span>
                        </button>
                        <button className="px-3 py-2 bg-[#111C2E] border border-white/10 rounded-xl hover:border-gold/30 transition-all duration-300 flex items-center gap-2 text-gray-400 hover:text-white text-sm">
                            <RefreshCw className="w-4 h-4" />
                            <span className="hidden sm:inline">Refresh</span>
                        </button>
                    </div>
                </div>

                {/* ===== STATS CARDS - DARK THEME ===== */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4 mb-6 md:mb-8">
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
                    {/* ===== RECENT ACTIVITY ===== */}
                    <div className="lg:col-span-2">
                        <div className="bg-[#111C2E] border border-white/5 rounded-xl md:rounded-2xl overflow-hidden">
                            <div className="p-4 md:p-6 border-b border-white/5 flex items-center justify-between">
                                <h2 className="text-base md:text-lg font-semibold text-white">Recent Activity</h2>
                                <button className="text-sm text-gold hover:text-gold-light transition-colors">View All</button>
                            </div>
                            <div className="divide-y divide-white/5">
                                {recentActivity.map((activity, index) => (
                                    <div key={index} className="p-3 md:p-4 hover:bg-white/5 transition-colors">
                                        <div className="flex items-start gap-3">
                                            <div className="w-8 h-8 bg-[#1A2A4A] rounded-full flex items-center justify-center flex-shrink-0">
                                                {getActivityIcon(activity.type)}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="font-medium text-white text-sm">{activity.action}</p>
                                                <p className="text-sm text-gray-400 truncate">{activity.details}</p>
                                                <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* ===== RIGHT COLUMN ===== */}
                    <div className="space-y-4 md:space-y-6">
                        {/* ===== PENDING APPROVALS ===== */}
                        <div className="bg-[#111C2E] border border-white/5 rounded-xl md:rounded-2xl p-4 md:p-6">
                            <h2 className="text-base md:text-lg font-semibold text-white mb-4">Pending Approvals</h2>
                            <div className="space-y-3">
                                {pendingApprovals.map((item) => (
                                    <div key={item.id} className="flex items-center justify-between p-3 bg-[#1A2A4A] rounded-xl">
                                        <div className="min-w-0">
                                            <p className="font-medium text-white text-sm truncate">{item.name}</p>
                                            <p className="text-xs text-gray-400">{item.type} • {item.date}</p>
                                        </div>
                                        <button className="px-3 py-1.5 bg-gold text-[#0A1628] text-xs font-semibold rounded-lg hover:bg-gold-light transition-colors flex-shrink-0">
                                            Review
                                        </button>
                                    </div>
                                ))}
                            </div>
                            <Link to="/admin/constructors" className="mt-4 block text-center text-sm text-gold hover:text-gold-light transition-colors">
                                View All Approvals
                            </Link>
                        </div>

                        {/* ===== SUBSCRIPTION OVERVIEW ===== */}
                        <div className="bg-[#111C2E] border border-white/5 rounded-xl md:rounded-2xl p-4 md:p-6">
                            <h2 className="text-base md:text-lg font-semibold text-white mb-4">Subscription Overview</h2>
                            <div className="space-y-3">
                                {subscriptionStats.map((stat, index) => (
                                    <div key={index} className="flex items-center justify-between p-3 bg-[#1A2A4A] rounded-xl">
                                        <div>
                                            <p className="font-medium text-white text-sm">{stat.plan}</p>
                                            <p className="text-xs text-gray-400">{stat.count} subscribers</p>
                                        </div>
                                        <span className="text-gold font-semibold text-sm">{stat.revenue}</span>
                                    </div>
                                ))}
                            </div>
                            <Link to="/admin/subscriptions" className="mt-4 block text-center text-sm text-gold hover:text-gold-light transition-colors">
                                Manage Subscriptions
                            </Link>
                        </div>
                    </div>
                </div>

                {/* ===== LOADING SKELETON ===== */}
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

export default AdminDashboard;
