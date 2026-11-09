import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
    Search,
    Filter,
    Building2,
    MapPin,
    Star,
    Briefcase,
    CheckCircle,
    XCircle,
    Eye,
    Edit,
    Trash2,
    Shield,
    MoreVertical,
    UserCheck,
    UserX,
    Download,
    RefreshCw,
    Calendar,
    Mail,
    Phone,
    AlertCircle
} from 'lucide-react';

const AdminConstructors = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('All');
    const [selectedVerification, setSelectedVerification] = useState('All');

    const constructors = [
        {
            id: 1,
            name: 'Mwangi Construction Ltd',
            location: 'Nairobi, Kenya',
            rating: 4.8,
            projects: 150,
            verified: true,
            status: 'active',
            email: 'info@mwangi.com',
            phone: '+254 700 123 456',
            joinedDate: '2026-01-15',
            image: '🏗️'
        },
        {
            id: 2,
            name: 'Lesotho Building Co.',
            location: 'Maseru, Lesotho',
            rating: 4.9,
            projects: 200,
            verified: true,
            status: 'active',
            email: 'info@lesothobuilding.com',
            phone: '+266 5888 8888',
            joinedDate: '2026-02-01',
            image: '🏢'
        },
        {
            id: 3,
            name: 'Desert Constructors',
            location: 'Cairo, Egypt',
            rating: 4.5,
            projects: 80,
            verified: false,
            status: 'pending',
            email: 'info@desertconstructors.com',
            phone: '+20 123 456 789',
            joinedDate: '2026-07-20',
            image: '🏜️'
        },
        {
            id: 4,
            name: 'EcoBuild Africa',
            location: 'Kigali, Rwanda',
            rating: 4.6,
            projects: 90,
            verified: true,
            status: 'active',
            email: 'info@ecobuild.com',
            phone: '+250 788 123 456',
            joinedDate: '2026-03-10',
            image: '🌿'
        },
        {
            id: 5,
            name: 'Nile Valley Construction',
            location: 'Khartoum, Sudan',
            rating: 4.3,
            projects: 60,
            verified: false,
            status: 'pending',
            email: 'info@nilevalley.com',
            phone: '+249 123 456 789',
            joinedDate: '2026-07-25',
            image: '🌊'
        },
    ];

    const statuses = ['All', 'active', 'pending', 'suspended'];
    const verifications = ['All', 'Verified', 'Unverified'];

    const filteredConstructors = constructors.filter(constructor => {
        const matchesSearch = constructor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             constructor.location.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = selectedStatus === 'All' || constructor.status === selectedStatus;
        const matchesVerification = selectedVerification === 'All' ||
                                   (selectedVerification === 'Verified' && constructor.verified) ||
                                   (selectedVerification === 'Unverified' && !constructor.verified);
        return matchesSearch && matchesStatus && matchesVerification;
    });

    const getStatusBadge = (status) => {
        const colors = {
            active: 'bg-emerald-100 text-emerald-700',
            pending: 'bg-yellow-100 text-yellow-700',
            suspended: 'bg-red-100 text-red-700',
        };
        return colors[status] || 'bg-gray-100 text-gray-700';
    };

    return (
        <div className="min-h-screen bg-[#FAF8F5] py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
                    <div>
                        <h1 className="text-3xl font-['Playfair_Display'] font-bold text-[#0A1628]">
                            Manage Constructors
                        </h1>
                        <p className="text-gray-600 mt-1">View and manage all construction companies</p>
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
                                placeholder="Search constructors by name or location..."
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
                            value={selectedVerification}
                            onChange={(e) => setSelectedVerification(e.target.value)}
                            className="px-4 py-2.5 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:border-gold transition-colors"
                        >
                            {verifications.map(ver => (
                                <option key={ver} value={ver}>{ver}</option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Constructors Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredConstructors.map((constructor, index) => (
                        <motion.div
                            key={constructor.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: index * 0.05 }}
                            whileHover={{ y: -8 }}
                            className="bg-white rounded-2xl shadow-card hover:shadow-card-hover transition-all duration-300 overflow-hidden"
                        >
                            <div className="p-6">
                                <div className="flex items-start justify-between">
                                    <div className="text-4xl">{constructor.image}</div>
                                    <div className="flex gap-2">
                                        {constructor.verified && (
                                            <span className="px-2 py-1 bg-emerald-100 text-emerald-700 text-xs rounded-full flex items-center gap-1">
                                                <CheckCircle className="w-3 h-3" /> Verified
                                            </span>
                                        )}
                                    </div>
                                </div>

                                <div className="mt-3">
                                    <h3 className="text-xl font-bold text-[#0A1628] hover:text-gold transition-colors">
                                        <Link to={`/admin/constructors/${constructor.id}`}>{constructor.name}</Link>
                                    </h3>
                                    <p className="text-gray-600 text-sm flex items-center gap-1">
                                        <MapPin className="w-4 h-4" /> {constructor.location}
                                    </p>
                                </div>

                                <div className="flex items-center gap-4 mt-3 text-sm">
                                    <span className="flex items-center gap-1 text-gold">
                                        <Star className="w-4 h-4 fill-gold" /> {constructor.rating}
                                    </span>
                                    <span className="text-gray-400">|</span>
                                    <span className="text-gray-500 flex items-center gap-1">
                                        <Briefcase className="w-4 h-4" /> {constructor.projects} projects
                                    </span>
                                </div>

                                <div className="mt-3 space-y-1 text-sm text-gray-500">
                                    <p className="flex items-center gap-1">
                                        <Mail className="w-4 h-4" /> {constructor.email}
                                    </p>
                                    <p className="flex items-center gap-1">
                                        <Phone className="w-4 h-4" /> {constructor.phone}
                                    </p>
                                    <p className="flex items-center gap-1">
                                        <Calendar className="w-4 h-4" /> Joined {new Date(constructor.joinedDate).toLocaleDateString()}
                                    </p>
                                </div>

                                <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                                    <span className={`px-3 py-1 text-xs font-semibold rounded-full ${getStatusBadge(constructor.status)}`}>
                                        {constructor.status}
                                    </span>
                                    <div className="flex gap-2">
                                        <Link
                                            to={`/admin/constructors/${constructor.id}`}
                                            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                                        >
                                            <Eye className="w-4 h-4 text-gray-400" />
                                        </Link>
                                        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                                            <Edit className="w-4 h-4 text-gray-400" />
                                        </button>
                                        <button className="p-2 hover:bg-red-50 rounded-lg transition-colors">
                                            <UserX className="w-4 h-4 text-red-400" />
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

export default AdminConstructors;
