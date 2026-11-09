import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    PlusCircle,
    Search,
    Filter,
    Eye,
    Edit,
    Trash2,
    Clock,
    CheckCircle,
    AlertCircle,
    MapPin,
    DollarSign,
    Calendar,
    Users,
    ArrowRight,
    MoreVertical,
    Copy,
    Archive,
    Share2,
    FileText,
    Download
} from 'lucide-react';

const ClientTenders = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('All');

    const tenders = [
        {
            id: 1,
            title: 'School Construction - Modern Learning Facility',
            location: 'Maseru, Lesotho',
            budget: 'M 50M',
            deadline: '2026-08-15',
            status: 'Open',
            applications: 12,
            views: 245,
            postedDate: '2026-07-01',
            description: 'Construction of a modern 3-story school building...'
        },
        {
            id: 2,
            title: 'Hospital Renovation & Expansion',
            location: 'Kigali, Rwanda',
            budget: 'M 80M',
            deadline: '2026-07-30',
            status: 'Closing Soon',
            applications: 15,
            views: 189,
            postedDate: '2026-06-20',
            description: 'Complete renovation and expansion of the district hospital...'
        },
        {
            id: 3,
            title: 'Road Infrastructure - Highway Expansion',
            location: 'Nairobi, Kenya',
            budget: 'M 200M',
            deadline: '2026-09-01',
            status: 'Open',
            applications: 8,
            views: 312,
            postedDate: '2026-07-05',
            description: 'Expansion of the Mombasa Road highway from 4 to 8 lanes...'
        },
        {
            id: 4,
            title: 'Affordable Housing Project',
            location: 'Accra, Ghana',
            budget: 'M 150M',
            deadline: '2026-08-30',
            status: 'Open',
            applications: 6,
            views: 156,
            postedDate: '2026-07-10',
            description: 'Construction of 200 affordable housing units...'
        },
    ];

    const statuses = ['All', 'Open', 'Closing Soon', 'Closed'];

    const filteredTenders = tenders.filter(tender => {
        const matchesSearch = tender.title.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = selectedStatus === 'All' || tender.status === selectedStatus;
        return matchesSearch && matchesStatus;
    });

    const getStatusColor = (status) => {
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
                            My Tenders
                        </h1>
                        <p className="text-gray-600 mt-1">Manage and track your posted tenders</p>
                    </div>
                    <Link
                        to="/client/tenders/create"
                        className="px-6 py-2.5 bg-gold text-[#0A1628] font-semibold rounded-xl hover:bg-gold-light transition-all duration-300 flex items-center gap-2"
                    >
                        <PlusCircle className="w-5 h-5" />
                        Post New Tender
                    </Link>
                </div>

                {/* Search and Filter */}
                <div className="bg-white rounded-2xl shadow-card p-4 mb-6">
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1 relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search tenders..."
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
                    </div>
                </div>

                {/* Tenders List */}
                <div className="space-y-4">
                    {filteredTenders.map((tender, index) => (
                        <motion.div
                            key={tender.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.05 }}
                            className="bg-white rounded-2xl shadow-card p-6 hover:shadow-card-hover transition-all duration-300"
                        >
                            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                                <div className="flex-1">
                                    <div className="flex items-start gap-3">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 flex-wrap">
                                                <h3 className="text-xl font-bold text-[#0A1628] hover:text-gold transition-colors">
                                                    <Link to={`/tenders/${tender.id}`}>{tender.title}</Link>
                                                </h3>
                                                <span className={`inline-flex items-center gap-1 px-3 py-1 text-xs font-semibold rounded-full ${getStatusColor(tender.status)}`}>
                                                    {getStatusIcon(tender.status)}
                                                    {tender.status}
                                                </span>
                                            </div>
                                            <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-gray-500">
                                                <span className="flex items-center gap-1">
                                                    <MapPin className="w-4 h-4" /> {tender.location}
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <DollarSign className="w-4 h-4" /> {tender.budget}
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <Calendar className="w-4 h-4" /> Deadline: {tender.deadline}
                                                </span>
                                            </div>
                                            <p className="text-gray-600 text-sm mt-2 line-clamp-2">{tender.description}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col items-end gap-2">
                                    <div className="flex items-center gap-4 text-sm text-gray-500">
                                        <span className="flex items-center gap-1">
                                            <Eye className="w-4 h-4" /> {tender.views}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <Users className="w-4 h-4" /> {tender.applications} apps
                                        </span>
                                    </div>
                                    <div className="flex gap-2">
                                        <Link
                                            to={`/tenders/${tender.id}`}
                                            className="px-4 py-2 bg-gold text-[#0A1628] text-sm font-semibold rounded-lg hover:bg-gold-light transition-colors"
                                        >
                                            View
                                        </Link>
                                        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                                            <Edit className="w-4 h-4 text-gray-400" />
                                        </button>
                                        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                                            <MoreVertical className="w-4 h-4 text-gray-400" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ClientTenders;
