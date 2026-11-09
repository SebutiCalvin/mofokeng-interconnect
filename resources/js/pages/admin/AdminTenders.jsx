import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
    Search,
    Filter,
    FileText,
    MapPin,
    DollarSign,
    Calendar,
    Eye,
    Edit,
    Trash2,
    CheckCircle,
    XCircle,
    AlertCircle,
    Users,
    MoreVertical,
    Download,
    RefreshCw,
    Clock,
    Building2,
    User,
    ArrowUpDown
} from 'lucide-react';

const AdminTenders = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('All');
    const [selectedCategory, setSelectedCategory] = useState('All');

    const tenders = [
        {
            id: 1,
            title: 'School Construction - Modern Learning Facility',
            location: 'Maseru, Lesotho',
            budget: 'M 50M',
            deadline: '2026-08-15',
            status: 'Open',
            category: 'Education',
            applications: 12,
            views: 245,
            postedBy: 'Ministry of Education',
            postedDate: '2026-07-01'
        },
        {
            id: 2,
            title: 'Hospital Renovation & Expansion',
            location: 'Kigali, Rwanda',
            budget: 'M 80M',
            deadline: '2026-07-30',
            status: 'Closing Soon',
            category: 'Healthcare',
            applications: 15,
            views: 189,
            postedBy: 'Ministry of Health',
            postedDate: '2026-06-20'
        },
        {
            id: 3,
            title: 'Road Infrastructure - Highway Expansion',
            location: 'Nairobi, Kenya',
            budget: 'M 200M',
            deadline: '2026-09-01',
            status: 'Open',
            category: 'Infrastructure',
            applications: 8,
            views: 312,
            postedBy: 'Kenya Roads Authority',
            postedDate: '2026-07-05'
        },
        {
            id: 4,
            title: 'Affordable Housing Project',
            location: 'Accra, Ghana',
            budget: 'M 150M',
            deadline: '2026-08-30',
            status: 'Open',
            category: 'Residential',
            applications: 6,
            views: 156,
            postedBy: 'Housing Ministry',
            postedDate: '2026-07-10'
        },
        {
            id: 5,
            title: 'Industrial Park Development',
            location: 'Dar es Salaam, Tanzania',
            budget: 'M 300M',
            deadline: '2026-09-15',
            status: 'Open',
            category: 'Industrial',
            applications: 4,
            views: 98,
            postedBy: 'Industrial Development Board',
            postedDate: '2026-07-08'
        },
    ];

    const statuses = ['All', 'Open', 'Closing Soon', 'Closed'];
    const categories = ['All', 'Education', 'Healthcare', 'Infrastructure', 'Residential', 'Industrial'];

    const filteredTenders = tenders.filter(tender => {
        const matchesSearch = tender.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             tender.location.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = selectedStatus === 'All' || tender.status === selectedStatus;
        const matchesCategory = selectedCategory === 'All' || tender.category === selectedCategory;
        return matchesSearch && matchesStatus && matchesCategory;
    });

    const getStatusBadge = (status) => {
        const colors = {
            'Open': 'bg-emerald-100 text-emerald-700',
            'Closing Soon': 'bg-yellow-100 text-yellow-700',
            'Closed': 'bg-red-100 text-red-700',
        };
        return colors[status] || 'bg-gray-100 text-gray-700';
    };

    const getStatusIcon = (status) => {
        switch(status) {
            case 'Open': return <CheckCircle className="w-4 h-4" />;
            case 'Closing Soon': return <AlertCircle className="w-4 h-4" />;
            default: return <Clock className="w-4 h-4" />;
        }
    };

    return (
        <div className="min-h-screen bg-[#FAF8F5] py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
                    <div>
                        <h1 className="text-3xl font-['Playfair_Display'] font-bold text-[#0A1628]">
                            Manage Tenders
                        </h1>
                        <p className="text-gray-600 mt-1">View and manage all platform tenders</p>
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

                {/* Search and Filters */}
                <div className="bg-white rounded-2xl shadow-card p-4 mb-6">
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1 relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search tenders by title or location..."
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
                                <option key={status} value={status}>{status}</option>
                            ))}
                        </select>
                        <select
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            className="px-4 py-2.5 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:border-gold transition-colors"
                        >
                            {categories.map(cat => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Tenders Table */}
                <div className="bg-white rounded-2xl shadow-card overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-[#0A1628] text-white">
                                <tr>
                                    <th className="px-6 py-4 text-left text-sm font-semibold">Tender</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold">Category</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold">Budget</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold">Status</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold">Deadline</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold">Applications</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {filteredTenders.map((tender, index) => (
                                    <motion.tr
                                        key={tender.id}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.3, delay: index * 0.05 }}
                                        className="hover:bg-gray-50 transition-colors"
                                    >
                                        <td className="px-6 py-4">
                                            <div>
                                                <p className="font-medium text-[#0A1628] hover:text-gold transition-colors">
                                                    <Link to={`/admin/tenders/${tender.id}`}>{tender.title}</Link>
                                                </p>
                                                <p className="text-xs text-gray-400 flex items-center gap-1">
                                                    <MapPin className="w-3 h-3" /> {tender.location}
                                                </p>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                                                {tender.category}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-gold font-semibold">{tender.budget}</td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center gap-1 px-3 py-1 text-xs font-semibold rounded-full ${getStatusBadge(tender.status)}`}>
                                                {getStatusIcon(tender.status)}
                                                {tender.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-500">
                                            {new Date(tender.deadline).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-500">
                                            {tender.applications}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex gap-2">
                                                <Link
                                                    to={`/admin/tenders/${tender.id}`}
                                                    className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
                                                >
                                                    <Eye className="w-4 h-4 text-gray-400" />
                                                </Link>
                                                <button className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors">
                                                    <Edit className="w-4 h-4 text-gray-400" />
                                                </button>
                                                <button className="p-1.5 hover:bg-red-50 rounded-lg transition-colors">
                                                    <Trash2 className="w-4 h-4 text-red-400" />
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

export default AdminTenders;
