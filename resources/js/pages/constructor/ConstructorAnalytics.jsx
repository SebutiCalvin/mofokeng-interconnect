import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
    TrendingUp,
    TrendingDown,
    Eye,
    Briefcase,
    Star,
    MessageCircle,
    DollarSign,
    Calendar,
    Download,
    Filter,
    ArrowUp,
    ArrowDown,
    Users,
    Target,
    Zap,
    Clock,
    Award
} from 'lucide-react';

const ConstructorAnalytics = () => {
    const [selectedPeriod, setSelectedPeriod] = useState('month');

    const stats = [
        { label: 'Profile Views', value: '1,247', change: '+12.5%', trend: 'up', icon: Eye },
        { label: 'Project Views', value: '3,856', change: '+18.3%', trend: 'up', icon: Briefcase },
        { label: 'Inquiries', value: '48', change: '+8.2%', trend: 'up', icon: MessageCircle },
        { label: 'Conversion Rate', value: '24.5%', change: '+3.1%', trend: 'up', icon: Target },
        { label: 'Revenue', value: 'M 2.4M', change: '+15.8%', trend: 'up', icon: DollarSign },
        { label: 'Rating', value: '4.8★', change: '+0.2', trend: 'up', icon: Star },
    ];

    const monthlyData = {
        views: [320, 380, 450, 420, 560, 680, 620, 740, 810, 900, 950, 1247],
        inquiries: [12, 15, 18, 14, 22, 25, 20, 28, 32, 35, 40, 48],
        conversions: [3, 4, 5, 3, 6, 7, 5, 8, 9, 10, 12, 15],
    };

    const recentActivity = [
        { action: 'New project view', details: 'Modern Eco Villa', time: '2 hours ago' },
        { action: 'New inquiry', details: 'John Mwangi - Commercial Complex', time: '5 hours ago' },
        { action: 'Profile view', details: 'Mary Lebeko viewed your profile', time: '1 day ago' },
        { action: 'New review', details: 'Sarah Kamau - ★★★★★', time: '2 days ago' },
    ];

    const topProjects = [
        { name: 'Modern Eco Villa', views: 456, inquiries: 12, conversion: 8.3 },
        { name: 'Luxury Mansion', views: 389, inquiries: 10, conversion: 7.2 },
        { name: 'Office Complex', views: 312, inquiries: 8, conversion: 6.1 },
        { name: 'Green Housing Project', views: 278, inquiries: 6, conversion: 5.5 },
    ];

    const renderChart = (data, color = 'gold') => {
        const max = Math.max(...data);
        return (
            <div className="flex items-end gap-1 h-32">
                {data.map((value, index) => (
                    <motion.div
                        key={index}
                        initial={{ height: 0 }}
                        animate={{ height: `${(value / max) * 100}%` }}
                        transition={{ duration: 0.8, delay: index * 0.02 }}
                        className={`flex-1 bg-${color}/20 rounded-t-lg hover:bg-${color}/40 transition-colors relative group`}
                        style={{ minHeight: '4px' }}
                    >
                        <div className={`absolute -top-8 left-1/2 -translate-x-1/2 bg-${color} text-[#0A1628] text-xs px-2 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap`}>
                            {value}
                        </div>
                    </motion.div>
                ))}
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-[#0A1628] py-6 md:py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6 md:mb-8">
                    <div>
                        <h1 className="text-2xl md:text-3xl font-['Playfair_Display'] font-bold text-white">
                            Analytics Dashboard
                        </h1>
                        <p className="text-gray-400 text-sm mt-1">Track your performance and growth metrics</p>
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
                            Export
                        </button>
                    </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4 mb-6 md:mb-8">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: index * 0.05 }}
                            className="bg-[#111C2E] border border-white/5 rounded-xl p-3 md:p-4 hover:border-gold/30 transition-all duration-300"
                        >
                            <div className="flex items-center justify-between">
                                <div className="w-8 h-8 md:w-10 md:h-10 rounded-xl bg-gold/10 flex items-center justify-center">
                                    <stat.icon className="w-4 h-4 md:w-5 md:h-5 text-gold" />
                                </div>
                                <span className={`flex items-center gap-1 text-xs font-semibold ${stat.trend === 'up' ? 'text-emerald-400' : 'text-red-400'}`}>
                                    {stat.trend === 'up' ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
                                    {stat.change}
                                </span>
                            </div>
                            <p className="text-lg md:text-2xl font-bold text-white mt-2">{stat.value}</p>
                            <p className="text-xs text-gray-400">{stat.label}</p>
                        </motion.div>
                    ))}
                </div>

                {/* Charts */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 mb-6 md:mb-8">
                    <div className="bg-[#111C2E] border border-white/5 rounded-xl p-4 md:p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="font-semibold text-white">Profile Views</h3>
                            <span className="text-sm text-gray-400">Monthly</span>
                        </div>
                        {renderChart(monthlyData.views)}
                        <div className="flex justify-between mt-2 text-xs text-gray-400">
                            {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((month, i) => (
                                <span key={i}>{month}</span>
                            ))}
                        </div>
                    </div>

                    <div className="bg-[#111C2E] border border-white/5 rounded-xl p-4 md:p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="font-semibold text-white">Inquiries & Conversions</h3>
                            <span className="text-sm text-gray-400">Monthly</span>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <p className="text-xs text-gray-400">Inquiries</p>
                                {renderChart(monthlyData.inquiries, 'blue')}
                            </div>
                            <div>
                                <p className="text-xs text-gray-400">Conversions</p>
                                {renderChart(monthlyData.conversions, 'emerald')}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Top Projects & Recent Activity */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
                    <div className="bg-[#111C2E] border border-white/5 rounded-xl p-4 md:p-6">
                        <h3 className="font-semibold text-white mb-4">Top Performing Projects</h3>
                        <div className="space-y-3">
                            {topProjects.map((project, index) => (
                                <div key={index} className="flex items-center justify-between p-3 bg-[#1A2A4A] rounded-xl">
                                    <div className="min-w-0">
                                        <p className="font-medium text-white text-sm truncate">{project.name}</p>
                                        <div className="flex gap-4 mt-1 text-xs text-gray-400">
                                            <span>{project.views} views</span>
                                            <span>{project.inquiries} inquiries</span>
                                            <span className="text-emerald-400">{project.conversion}% conversion</span>
                                        </div>
                                    </div>
                                    <div className={`px-2 py-1 rounded-full text-xs font-semibold ${project.conversion > 7 ? 'bg-emerald-500/20 text-emerald-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
                                        {project.conversion > 7 ? 'High' : 'Medium'}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-[#111C2E] border border-white/5 rounded-xl p-4 md:p-6">
                        <h3 className="font-semibold text-white mb-4">Recent Activity</h3>
                        <div className="space-y-3">
                            {recentActivity.map((activity, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                    className="flex items-start gap-3 p-3 bg-[#1A2A4A] rounded-xl"
                                >
                                    <div className="w-2 h-2 bg-gold rounded-full mt-2 flex-shrink-0" />
                                    <div className="min-w-0">
                                        <p className="text-sm font-medium text-white">{activity.action}</p>
                                        <p className="text-sm text-gray-400 truncate">{activity.details}</p>
                                        <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConstructorAnalytics;
