import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
    Download,
    Printer,
    Calendar,
    Filter,
    Search,
    TrendingUp,
    TrendingDown,
    Users,
    Building2,
    Briefcase,
    DollarSign,
    FileText,
    ArrowUp,
    ArrowDown,
    Eye,
    Star,
    MessageCircle,
    RefreshCw,
    ChevronDown,
    ChevronRight,
    BarChart3,
    PieChart,
    LineChart,
    Award,
    Clock,
    AlertCircle
} from 'lucide-react';

const AdminReports = () => {
    const [selectedPeriod, setSelectedPeriod] = useState('month');
    const [selectedReportType, setSelectedReportType] = useState('overview');

    const reportData = {
        overview: {
            totalUsers: 1247,
            newUsers: 45,
            activeConstructors: 156,
            totalProjects: 892,
            newProjects: 28,
            totalTenders: 67,
            newTenders: 12,
            totalRevenue: 2400000,
            revenueGrowth: 22.7,
            userGrowth: 12.5,
            projectGrowth: 18.2,
            tenderGrowth: 5.4,
        },
        monthly: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
            users: [45, 52, 48, 58, 62, 55, 45],
            projects: [12, 15, 18, 22, 20, 25, 28],
            revenue: [120000, 150000, 180000, 220000, 200000, 250000, 280000],
            tenders: [5, 7, 8, 6, 9, 11, 12],
        },
        topPerformers: [
            { name: 'Mwangi Construction Ltd', rating: 4.8, projects: 150, revenue: 'M 450K' },
            { name: 'Lesotho Building Co.', rating: 4.9, projects: 200, revenue: 'M 520K' },
            { name: 'EcoBuild Africa', rating: 4.6, projects: 90, revenue: 'M 280K' },
            { name: 'African Skyscrapers', rating: 4.7, projects: 120, revenue: 'M 380K' },
        ],
    };

    const renderChart = (data, color = 'gold') => {
        const max = Math.max(...data);
        return (
            <div className="flex items-end gap-2 h-40">
                {data.map((value, index) => (
                    <motion.div
                        key={index}
                        initial={{ height: 0 }}
                        animate={{ height: `${(value / max) * 100}%` }}
                        transition={{ duration: 0.8, delay: index * 0.02 }}
                        className={`flex-1 bg-${color}/20 rounded-t-lg hover:bg-${color}/40 transition-colors relative group`}
                        style={{ minHeight: '4px' }}
                    >
                        <div className={`absolute -top-8 left-1/2 -translate-x-1/2 bg-${color} text-white text-xs px-2 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap`}>
                            {value}
                        </div>
                    </motion.div>
                ))}
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-[#FAF8F5] py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
                    <div>
                        <h1 className="text-3xl font-['Playfair_Display'] font-bold text-[#0A1628]">
                            Reports & Analytics
                        </h1>
                        <p className="text-gray-600 mt-1">View platform performance reports and analytics</p>
                    </div>
                    <div className="flex gap-3">
                        <select
                            value={selectedPeriod}
                            onChange={(e) => setSelectedPeriod(e.target.value)}
                            className="px-4 py-2.5 bg-white rounded-xl border border-gray-200 focus:outline-none focus:border-gold transition-colors"
                        >
                            <option value="week">This Week</option>
                            <option value="month">This Month</option>
                            <option value="quarter">This Quarter</option>
                            <option value="year">This Year</option>
                        </select>
                        <button className="px-4 py-2.5 bg-white rounded-xl shadow-sm hover:shadow-card transition-all duration-300 flex items-center gap-2">
                            <Download className="w-5 h-5" />
                            Export PDF
                        </button>
                        <button className="px-4 py-2.5 bg-white rounded-xl shadow-sm hover:shadow-card transition-all duration-300 flex items-center gap-2">
                            <Printer className="w-5 h-5" />
                            Print
                        </button>
                    </div>
                </div>

                {/* Report Type Tabs */}
                <div className="flex flex-wrap gap-2 mb-6">
                    {['overview', 'users', 'projects', 'revenue', 'tenders'].map((type) => (
                        <button
                            key={type}
                            onClick={() => setSelectedReportType(type)}
                            className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                                selectedReportType === type
                                    ? 'bg-gold text-[#0A1628]'
                                    : 'bg-white text-gray-600 hover:bg-gray-50'
                            }`}
                        >
                            {type.charAt(0).toUpperCase() + type.slice(1)}
                        </button>
                    ))}
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    <div className="bg-white rounded-2xl shadow-card p-4">
                        <div className="flex items-center justify-between">
                            <p className="text-sm text-gray-500">Total Users</p>
                            <Users className="w-5 h-5 text-blue-500" />
                        </div>
                        <p className="text-2xl font-bold text-[#0A1628]">{reportData.overview.totalUsers}</p>
                        <span className="text-xs text-emerald-600 flex items-center gap-1">
                            <ArrowUp className="w-3 h-3" /> {reportData.overview.userGrowth}%
                        </span>
                    </div>
                    <div className="bg-white rounded-2xl shadow-card p-4">
                        <div className="flex items-center justify-between">
                            <p className="text-sm text-gray-500">Total Projects</p>
                            <Briefcase className="w-5 h-5 text-purple-500" />
                        </div>
                        <p className="text-2xl font-bold text-[#0A1628]">{reportData.overview.totalProjects}</p>
                        <span className="text-xs text-emerald-600 flex items-center gap-1">
                            <ArrowUp className="w-3 h-3" /> {reportData.overview.projectGrowth}%
                        </span>
                    </div>
                    <div className="bg-white rounded-2xl shadow-card p-4">
                        <div className="flex items-center justify-between">
                            <p className="text-sm text-gray-500">Revenue</p>
                            <DollarSign className="w-5 h-5 text-gold" />
                        </div>
                        <p className="text-2xl font-bold text-gold">M {reportData.overview.totalRevenue.toLocaleString()}</p>
                        <span className="text-xs text-emerald-600 flex items-center gap-1">
                            <ArrowUp className="w-3 h-3" /> {reportData.overview.revenueGrowth}%
                        </span>
                    </div>
                    <div className="bg-white rounded-2xl shadow-card p-4">
                        <div className="flex items-center justify-between">
                            <p className="text-sm text-gray-500">Active Tenders</p>
                            <FileText className="w-5 h-5 text-orange-500" />
                        </div>
                        <p className="text-2xl font-bold text-[#0A1628]">{reportData.overview.totalTenders}</p>
                        <span className="text-xs text-emerald-600 flex items-center gap-1">
                            <ArrowUp className="w-3 h-3" /> {reportData.overview.tenderGrowth}%
                        </span>
                    </div>
                </div>

                {/* Charts */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                    <div className="bg-white rounded-2xl shadow-card p-6">
                        <h3 className="font-semibold text-[#0A1628] mb-4">User Growth</h3>
                        {renderChart(reportData.monthly.users, 'blue')}
                        <div className="flex justify-between mt-2 text-xs text-gray-400">
                            {reportData.monthly.labels.map((month, i) => (
                                <span key={i}>{month}</span>
                            ))}
                        </div>
                    </div>
                    <div className="bg-white rounded-2xl shadow-card p-6">
                        <h3 className="font-semibold text-[#0A1628] mb-4">Revenue Trends</h3>
                        {renderChart(reportData.monthly.revenue, 'gold')}
                        <div className="flex justify-between mt-2 text-xs text-gray-400">
                            {reportData.monthly.labels.map((month, i) => (
                                <span key={i}>{month}</span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Top Performers */}
                <div className="bg-white rounded-2xl shadow-card p-6">
                    <h3 className="font-semibold text-[#0A1628] mb-4">Top Performing Constructors</h3>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Company</th>
                                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Rating</th>
                                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Projects</th>
                                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Revenue</th>
                                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {reportData.topPerformers.map((performer, index) => (
                                    <tr key={index} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-4 py-3 font-medium text-[#0A1628]">{performer.name}</td>
                                        <td className="px-4 py-3">
                                            <span className="flex items-center gap-1 text-gold">
                                                <Star className="w-4 h-4 fill-gold" /> {performer.rating}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3">{performer.projects}</td>
                                        <td className="px-4 py-3 text-gold font-semibold">{performer.revenue}</td>
                                        <td className="px-4 py-3">
                                            <span className="px-2 py-1 bg-emerald-100 text-emerald-700 text-xs rounded-full">Active</span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminReports;
