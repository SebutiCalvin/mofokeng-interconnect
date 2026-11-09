import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
    Search,
    Filter,
    User,
    Mail,
    Phone,
    Calendar,
    CheckCircle,
    XCircle,
    Shield,
    MoreVertical,
    Edit,
    Trash2,
    Ban,
    UserCheck,
    Eye,
    ArrowUpDown,
    Users,
    Building2,
    Briefcase,
    Download,
    Printer,
    RefreshCw
} from 'lucide-react';

const AdminUsers = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedRole, setSelectedRole] = useState('All');
    const [selectedStatus, setSelectedStatus] = useState('All');

    const users = [
        {
            id: 1,
            name: 'John Mwangi',
            email: 'john@mwangi.com',
            phone: '+254 700 123 456',
            role: 'constructor',
            status: 'active',
            joinedDate: '2026-01-15',
            projects: 12,
            verified: true
        },
        {
            id: 2,
            name: 'Mary Lebeko',
            email: 'mary@lebeko.com',
            phone: '+266 5888 1234',
            role: 'client',
            status: 'active',
            joinedDate: '2026-02-20',
            projects: 5,
            verified: true
        },
        {
            id: 3,
            name: 'David Maloi',
            email: 'david@maloi.com',
            phone: '+27 82 123 4567',
            role: 'constructor',
            status: 'pending',
            joinedDate: '2026-03-10',
            projects: 3,
            verified: false
        },
        {
            id: 4,
            name: 'Sarah Kamau',
            email: 'sarah@kamau.com',
            phone: '+250 788 123 456',
            role: 'client',
            status: 'suspended',
            joinedDate: '2026-04-05',
            projects: 2,
            verified: false
        },
        {
            id: 5,
            name: 'Michael Otieno',
            email: 'michael@otieno.com',
            phone: '+254 722 123 456',
            role: 'admin',
            status: 'active',
            joinedDate: '2026-01-01',
            projects: 0,
            verified: true
        },
    ];

    const roles = ['All', 'admin', 'constructor', 'client'];
    const statuses = ['All', 'active', 'pending', 'suspended'];

    const filteredUsers = users.filter(user => {
        const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             user.email.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesRole = selectedRole === 'All' || user.role === selectedRole;
        const matchesStatus = selectedStatus === 'All' || user.status === selectedStatus;
        return matchesSearch && matchesRole && matchesStatus;
    });

    const getRoleBadge = (role) => {
        const colors = {
            admin: 'bg-purple-100 text-purple-700',
            constructor: 'bg-blue-100 text-blue-700',
            client: 'bg-emerald-100 text-emerald-700',
        };
        return colors[role] || 'bg-gray-100 text-gray-700';
    };

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
                            Manage Users
                        </h1>
                        <p className="text-gray-600 mt-1">View and manage all platform users</p>
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
                                placeholder="Search users by name or email..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:border-gold transition-colors"
                            />
                        </div>
                        <select
                            value={selectedRole}
                            onChange={(e) => setSelectedRole(e.target.value)}
                            className="px-4 py-2.5 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:border-gold transition-colors"
                        >
                            {roles.map(role => (
                                <option key={role} value={role}>{role.charAt(0).toUpperCase() + role.slice(1)}</option>
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

                {/* Users Table */}
                <div className="bg-white rounded-2xl shadow-card overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-[#0A1628] text-white">
                                <tr>
                                    <th className="px-6 py-4 text-left text-sm font-semibold">User</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold">Contact</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold">Role</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold">Status</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold">Joined</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {filteredUsers.map((user, index) => (
                                    <motion.tr
                                        key={user.id}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.3, delay: index * 0.05 }}
                                        className="hover:bg-gray-50 transition-colors"
                                    >
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 bg-gold/20 rounded-full flex items-center justify-center text-gold font-bold text-sm">
                                                    {user.name.split(' ').map(w => w[0]).join('')}
                                                </div>
                                                <div>
                                                    <p className="font-medium text-[#0A1628]">{user.name}</p>
                                                    {user.verified && (
                                                        <span className="flex items-center gap-1 text-xs text-emerald-600">
                                                            <CheckCircle className="w-3 h-3" /> Verified
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <p className="text-sm text-gray-600">{user.email}</p>
                                            <p className="text-xs text-gray-400">{user.phone}</p>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`px-3 py-1 text-xs font-semibold rounded-full ${getRoleBadge(user.role)}`}>
                                                {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`px-3 py-1 text-xs font-semibold rounded-full ${getStatusBadge(user.status)}`}>
                                                {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-500">
                                            {new Date(user.joinedDate).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex gap-2">
                                                <button className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors">
                                                    <Eye className="w-4 h-4 text-gray-400" />
                                                </button>
                                                <button className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors">
                                                    <Edit className="w-4 h-4 text-gray-400" />
                                                </button>
                                                <button className="p-1.5 hover:bg-red-50 rounded-lg transition-colors">
                                                    <Ban className="w-4 h-4 text-red-400" />
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

export default AdminUsers;
