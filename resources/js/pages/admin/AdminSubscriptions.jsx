import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
    Search,
    Filter,
    CreditCard,
    Building2,
    User,
    Calendar,
    DollarSign,
    CheckCircle,
    XCircle,
    Eye,
    Edit,
    MoreVertical,
    Download,
    RefreshCw,
    TrendingUp,
    TrendingDown,
    AlertCircle,
    Clock,
    Users,
    Award
} from 'lucide-react';

const AdminSubscriptions = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedPlan, setSelectedPlan] = useState('All');
    const [selectedStatus, setSelectedStatus] = useState('All');

    const subscriptions = [
        {
            id: 1,
            company: 'Mwangi Construction Ltd',
            plan: 'Professional',
            status: 'active',
            amount: 'M 12,000',
            startDate: '2026-01-15',
            endDate: '2026-07-15',
            renews: '2026-08-15',
            paymentMethod: 'M-Pesa'
        },
        {
            id: 2,
            company: 'Lesotho Building Co.',
            plan: 'Enterprise',
            status: 'active',
            amount: 'M 25,000',
            startDate: '2026-02-01',
            endDate: '2026-08-01',
            renews: '2026-09-01',
            paymentMethod: 'Bank Transfer'
        },
        {
            id: 3,
            company: 'EcoBuild Africa',
            plan: 'Basic',
            status: 'expired',
            amount: 'M 5,000',
            startDate: '2026-01-10',
            endDate: '2026-07-10',
            renews: '2026-07-10',
            paymentMethod: 'EcoCash'
        },
        {
            id: 4,
            company: 'African Skyscrapers',
            plan: 'Professional',
            status: 'active',
            amount: 'M 12,000',
            startDate: '2026-03-15',
            endDate: '2026-09-15',
            renews: '2026-10-15',
            paymentMethod: 'M-Pesa'
        },
        {
            id: 5,
            company: 'Coastal Engineering',
            plan: 'Enterprise',
            status: 'cancelled',
            amount: 'M 25,000',
            startDate: '2026-01-20',
            endDate: '2026-07-20',
            renews: '2026-07-20',
            paymentMethod: 'Bank Transfer'
        },
    ];

    const plans = ['All', 'Basic', 'Professional', 'Enterprise'];
    const statuses = ['All', 'active', 'expired', 'cancelled'];

    const filteredSubscriptions = subscriptions.filter(sub => {
        const matchesSearch = sub.company.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesPlan = selectedPlan === 'All' || sub.plan === selectedPlan;
        const matchesStatus = selectedStatus === 'All' || sub.status === selectedStatus;
        return matchesSearch && matchesPlan && matchesStatus;
    });

    const getPlanBadge = (plan) => {
        const colors = {
            Basic: 'bg-blue-100 text-blue-700',
            Professional: 'bg-purple-100 text-purple-700',
            Enterprise: 'bg-gold/20 text-gold',
        };
        return colors[plan] || 'bg-gray-100 text-gray-700';
    };

    const getStatusBadge = (status) => {
        const colors = {
            active: 'bg-emerald-100 text-emerald-700',
            expired: 'bg-red-100 text-red-700',
            cancelled: 'bg-gray-100 text-gray-700',
        };
        return colors[status] || 'bg-gray-100 text-gray-700';
    };

    const getPlanIcon = (plan) => {
        const icons = {
            Basic: <Award className="w-4 h-4" />,
            Professional: <TrendingUp className="w-4 h-4" />,
            Enterprise: <Crown className="w-4 h-4" />,
        };
        return icons[plan] || <Award className="w-4 h-4" />;
    };

    // Summary stats
    const totalRevenue = subscriptions.reduce((sum, sub) => {
        if (sub.status === 'active') {
            return sum + parseInt(sub.amount.replace(/[^0-9]/g, ''));
        }
        return sum;
    }, 0);

    const activeSubscriptions = subscriptions.filter(s => s.status === 'active').length;
    const expiringSoon = subscriptions.filter(s => {
        if (s.status === 'active') {
            const daysLeft = Math.ceil((new Date(s.renews) - new Date()) / (1000 * 60 * 60 * 24));
            return daysLeft <= 30;
        }
        return false;
    }).length;

    return (
        <div className="min-h-screen bg-[#FAF8F5] py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
                    <div>
                        <h1 className="text-3xl font-['Playfair_Display'] font-bold text-[#0A1628]">
                            Manage Subscriptions
                        </h1>
                        <p className="text-gray-600 mt-1">View and manage all platform subscriptions</p>
                    </div>
                    <div className="flex gap-3">
                        <button className="px-4 py-2.5 bg-white rounded-xl shadow-sm hover:shadow-card transition-all duration-300 flex items-center gap-2">
                            <Download className="w-5 h-5" />
                            Export
                        </button>
                        <button className="px-4 py-2.5 bg-white rounded-xl shadow-sm hover:shadow-card transition-all duration-300 flex items-center gap-2">
                            <RefreshCw className="w-5 h-5" />
                            Refresh
                        </button>
                    </div>
                </div>

                {/* Summary Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                    <div className="bg-white rounded-2xl shadow-card p-4">
                        <p className="text-sm text-gray-500">Total Revenue</p>
                        <p className="text-2xl font-bold text-gold">M {totalRevenue.toLocaleString()}</p>
                        <span className="text-xs text-emerald-600">+18.5% from last month</span>
                    </div>
                    <div className="bg-white rounded-2xl shadow-card p-4">
                        <p className="text-sm text-gray-500">Active Subscriptions</p>
                        <p className="text-2xl font-bold text-[#0A1628]">{activeSubscriptions}</p>
                        <span className="text-xs text-emerald-600">+12% from last month</span>
                    </div>
                    <div className="bg-white rounded-2xl shadow-card p-4">
                        <p className="text-sm text-gray-500">Expiring Soon</p>
                        <p className="text-2xl font-bold text-[#0A1628]">{expiringSoon}</p>
                        <span className="text-xs text-yellow-600">Within 30 days</span>
                    </div>
                    <div className="bg-white rounded-2xl shadow-card p-4">
                        <p className="text-sm text-gray-500">Conversion Rate</p>
                        <p className="text-2xl font-bold text-[#0A1628]">24.5%</p>
                        <span className="text-xs text-emerald-600">+3.2% improvement</span>
                    </div>
                </div>

                {/* Search and Filters */}
                <div className="bg-white rounded-2xl shadow-card p-4 mb-6">
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1 relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search by company name..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:border-gold transition-colors"
                            />
                        </div>
                        <select
                            value={selectedPlan}
                            onChange={(e) => setSelectedPlan(e.target.value)}
                            className="px-4 py-2.5 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:border-gold transition-colors"
                        >
                            {plans.map(plan => (
                                <option key={plan} value={plan}>{plan}</option>
                            ))}
                        </select>
                        <select
                            value={selectedStatus}
                            onChange={(e) => setSelectedStatus(e.target.value)}
                            className="px-4 py-2.5 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:border-gold transition-colors"
                        >
                            {statuses.map(status => (
                                <option key={status} value={status}>{status.charAt(0).toUpperCase() + status.slice(1)}</option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Subscriptions Table */}
                <div className="bg-white rounded-2xl shadow-card overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-[#0A1628] text-white">
                                <tr>
                                    <th className="px-6 py-4 text-left text-sm font-semibold">Company</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold">Plan</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold">Amount</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold">Status</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold">Renews</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold">Payment</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {filteredSubscriptions.map((sub, index) => (
                                    <motion.tr
                                        key={sub.id}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.3, delay: index * 0.05 }}
                                        className="hover:bg-gray-50 transition-colors"
                                    >
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 bg-gold/10 rounded-full flex items-center justify-center text-gold font-bold text-xs">
                                                    {sub.company.split(' ').map(w => w[0]).join('')}
                                                </div>
                                                <span className="font-medium text-[#0A1628]">{sub.company}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center gap-1 px-3 py-1 text-xs font-semibold rounded-full ${getPlanBadge(sub.plan)}`}>
                                                {getPlanIcon(sub.plan)}
                                                {sub.plan}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-gold font-semibold">{sub.amount}</td>
                                        <td className="px-6 py-4">
                                            <span className={`px-3 py-1 text-xs font-semibold rounded-full ${getStatusBadge(sub.status)}`}>
                                                {sub.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-500">
                                            {new Date(sub.renews).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-500">{sub.paymentMethod}</td>
                                        <td className="px-6 py-4">
                                            <div className="flex gap-2">
                                                <button className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors">
                                                    <Eye className="w-4 h-4 text-gray-400" />
                                                </button>
                                                <button className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors">
                                                    <Edit className="w-4 h-4 text-gray-400" />
                                                </button>
                                            </div>
                                        </td>
                                    </motion.tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminSubscriptions;
