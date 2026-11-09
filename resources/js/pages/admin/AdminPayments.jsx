import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
    DollarSign,
    Search,
    Filter,
    Calendar,
    Download,
    Printer,
    RefreshCw,
    Eye,
    CheckCircle,
    XCircle,
    Clock,
    AlertCircle,
    Building2,
    User,
    CreditCard,
    TrendingUp,
    TrendingDown,
    ArrowUp,
    ArrowDown,
    ChevronDown,
    ChevronRight,
    MoreVertical,
    FileText,
    Mail,
    Phone,
    MapPin
} from 'lucide-react';

const AdminPayments = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('All');
    const [selectedMethod, setSelectedMethod] = useState('All');

    const payments = [
        {
            id: 1,
            company: 'Mwangi Construction Ltd',
            amount: 'M 12,000',
            plan: 'Professional',
            method: 'M-Pesa',
            status: 'completed',
            date: '2026-07-15',
            transactionId: 'TRX-2026-001',
            email: 'info@mwangi.com',
            phone: '+254 700 123 456',
        },
        {
            id: 2,
            company: 'Lesotho Building Co.',
            amount: 'M 25,000',
            plan: 'Enterprise',
            method: 'Bank Transfer',
            status: 'pending',
            date: '2026-07-14',
            transactionId: 'TRX-2026-002',
            email: 'info@lesothobuilding.com',
            phone: '+266 5888 8888',
        },
        {
            id: 3,
            company: 'EcoBuild Africa',
            amount: 'M 5,000',
            plan: 'Basic',
            method: 'EcoCash',
            status: 'failed',
            date: '2026-07-13',
            transactionId: 'TRX-2026-003',
            email: 'info@ecobuild.com',
            phone: '+250 788 123 456',
        },
        {
            id: 4,
            company: 'African Skyscrapers',
            amount: 'M 12,000',
            plan: 'Professional',
            method: 'M-Pesa',
            status: 'completed',
            date: '2026-07-12',
            transactionId: 'TRX-2026-004',
            email: 'info@africanskyscrapers.com',
            phone: '+27 82 123 4567',
        },
        {
            id: 5,
            company: 'Coastal Engineering',
            amount: 'M 25,000',
            plan: 'Enterprise',
            method: 'Bank Transfer',
            status: 'refunded',
            date: '2026-07-11',
            transactionId: 'TRX-2026-005',
            email: 'info@coastalengineering.com',
            phone: '+255 788 123 456',
        },
    ];

    const statuses = ['All', 'completed', 'pending', 'failed', 'refunded'];
    const methods = ['All', 'M-Pesa', 'Bank Transfer', 'EcoCash'];

    const filteredPayments = payments.filter(payment => {
        const matchesSearch = payment.company.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = selectedStatus === 'All' || payment.status === selectedStatus;
        const matchesMethod = selectedMethod === 'All' || payment.method === selectedMethod;
        return matchesSearch && matchesStatus && matchesMethod;
    });

    const getStatusBadge = (status) => {
        const colors = {
            completed: 'bg-emerald-100 text-emerald-700',
            pending: 'bg-yellow-100 text-yellow-700',
            failed: 'bg-red-100 text-red-700',
            refunded: 'bg-gray-100 text-gray-700',
        };
        return colors[status] || 'bg-gray-100 text-gray-700';
    };

    const getStatusIcon = (status) => {
        switch(status) {
            case 'completed': return <CheckCircle className="w-4 h-4" />;
            case 'pending': return <Clock className="w-4 h-4" />;
            case 'failed': return <XCircle className="w-4 h-4" />;
            case 'refunded': return <AlertCircle className="w-4 h-4" />;
            default: return <Clock className="w-4 h-4" />;
        }
    };

    // Summary stats
    const totalRevenue = payments
        .filter(p => p.status === 'completed')
        .reduce((sum, p) => sum + parseInt(p.amount.replace(/[^0-9]/g, '')), 0);

    const pendingAmount = payments
        .filter(p => p.status === 'pending')
        .reduce((sum, p) => sum + parseInt(p.amount.replace(/[^0-9]/g, '')), 0);

    const totalTransactions = payments.length;

    return (
        <div className="min-h-screen bg-[#FAF8F5] py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
                    <div>
                        <h1 className="text-3xl font-['Playfair_Display'] font-bold text-[#0A1628]">
                            Payment Management
                        </h1>
                        <p className="text-gray-600 mt-1">View and manage all platform payments</p>
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
                        <p className="text-sm text-gray-500">Total Transactions</p>
                        <p className="text-2xl font-bold text-[#0A1628]">{totalTransactions}</p>
                        <span className="text-xs text-emerald-600">+12% from last month</span>
                    </div>
                    <div className="bg-white rounded-2xl shadow-card p-4">
                        <p className="text-sm text-gray-500">Pending Payments</p>
                        <p className="text-2xl font-bold text-yellow-600">M {pendingAmount.toLocaleString()}</p>
                        <span className="text-xs text-yellow-600">2 transactions pending</span>
                    </div>
                    <div className="bg-white rounded-2xl shadow-card p-4">
                        <p className="text-sm text-gray-500">Success Rate</p>
                        <p className="text-2xl font-bold text-[#0A1628]">94.5%</p>
                        <span className="text-xs text-emerald-600">+2.3% improvement</span>
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
                            value={selectedStatus}
                            onChange={(e) => setSelectedStatus(e.target.value)}
                            className="px-4 py-2.5 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:border-gold transition-colors"
                        >
                            {statuses.map(status => (
                                <option key={status} value={status}>{status.charAt(0).toUpperCase() + status.slice(1)}</option>
                            ))}
                        </select>
                        <select
                            value={selectedMethod}
                            onChange={(e) => setSelectedMethod(e.target.value)}
                            className="px-4 py-2.5 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:border-gold transition-colors"
                        >
                            {methods.map(method => (
                                <option key={method} value={method}>{method}</option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Payments Table */}
                <div className="bg-white rounded-2xl shadow-card overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-[#0A1628] text-white">
                                <tr>
                                    <th className="px-6 py-4 text-left text-sm font-semibold">Company</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold">Amount</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold">Plan</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold">Method</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold">Status</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold">Date</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {filteredPayments.map((payment, index) => (
                                    <motion.tr
                                        key={payment.id}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.3, delay: index * 0.05 }}
                                        className="hover:bg-gray-50 transition-colors"
                                    >
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 bg-gold/10 rounded-full flex items-center justify-center text-gold font-bold text-xs">
                                                    {payment.company.split(' ').map(w => w[0]).join('')}
                                                </div>
                                                <span className="font-medium text-[#0A1628]">{payment.company}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-gold font-semibold">{payment.amount}</td>
                                        <td className="px-6 py-4 text-sm text-gray-500">{payment.plan}</td>
                                        <td className="px-6 py-4 text-sm text-gray-500">{payment.method}</td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center gap-1 px-3 py-1 text-xs font-semibold rounded-full ${getStatusBadge(payment.status)}`}>
                                                {getStatusIcon(payment.status)}
                                                {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-500">
                                            {new Date(payment.date).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex gap-2">
                                                <button className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors">
                                                    <Eye className="w-4 h-4 text-gray-400" />
                                                </button>
                                                <button className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors">
                                                    <FileText className="w-4 h-4 text-gray-400" />
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

export default AdminPayments;
