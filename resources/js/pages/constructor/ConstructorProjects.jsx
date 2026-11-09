import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    PlusCircle,
    Search,
    Eye,
    Edit,
    Trash2,
    MapPin,
    DollarSign,
    Calendar,
    MoreVertical,
    CheckCircle,
    Clock,
    AlertCircle,
    Building2,
    ArrowRight,
    Home,
    Building,
    Castle,
    Leaf
} from 'lucide-react';

const ConstructorProjects = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('All');

    const projects = [
        {
            id: 1,
            title: 'Modern Eco Villa',
            location: 'Nairobi, Kenya',
            budget: 'M 15M',
            status: 'Completed',
            date: '2026-07-25',
            views: 245,
            image: Home,
            progress: 100,
            client: 'John Mwangi'
        },
        {
            id: 2,
            title: 'Luxury Mansion',
            location: 'Maseru, Lesotho',
            budget: 'M 25M',
            status: 'In Progress',
            date: '2026-07-20',
            views: 189,
            image: Castle,
            progress: 65,
            client: 'Mary Lebeko'
        },
        {
            id: 3,
            title: 'Office Complex',
            location: 'Johannesburg, SA',
            budget: 'M 45M',
            status: 'Planning',
            date: '2026-07-15',
            views: 312,
            image: Building,
            progress: 20,
            client: 'David Maloi'
        },
        {
            id: 4,
            title: 'Green Housing Project',
            location: 'Kigali, Rwanda',
            budget: 'M 8M',
            status: 'Completed',
            date: '2026-07-10',
            views: 156,
            image: Leaf,
            progress: 100,
            client: 'Sarah Kamau'
        },
    ];

    const statuses = ['All', 'Completed', 'In Progress', 'Planning', 'On Hold'];

    const filteredProjects = projects.filter(project => {
        const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = selectedStatus === 'All' || project.status === selectedStatus;
        return matchesSearch && matchesStatus;
    });

    const getStatusColor = (status) => {
        const colors = {
            'Completed': 'bg-emerald-500/20 text-emerald-400',
            'In Progress': 'bg-blue-500/20 text-blue-400',
            'Planning': 'bg-yellow-500/20 text-yellow-400',
            'On Hold': 'bg-orange-500/20 text-orange-400',
        };
        return colors[status] || 'bg-gray-500/20 text-gray-400';
    };

    const getStatusIcon = (status) => {
        switch(status) {
            case 'Completed': return <CheckCircle className="w-4 h-4" />;
            case 'In Progress': return <Clock className="w-4 h-4" />;
            case 'Planning': return <AlertCircle className="w-4 h-4" />;
            default: return <Clock className="w-4 h-4" />;
        }
    };

    return (
        <div className="min-h-screen bg-[#0A1628] py-6 md:py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6 md:mb-8">
                    <div>
                        <h1 className="text-2xl md:text-3xl font-['Playfair_Display'] font-bold text-white">
                            My Projects
                        </h1>
                        <p className="text-gray-400 text-sm mt-1">Manage your construction projects</p>
                    </div>
                    <Link
                        to="/constructor/projects/upload"
                        className="px-4 py-2 bg-gold text-[#0A1628] font-semibold rounded-xl hover:bg-gold-light transition-all duration-300 flex items-center gap-2 text-sm shadow-lg hover:shadow-glow"
                    >
                        <PlusCircle className="w-4 h-4" />
                        Add Project
                    </Link>
                </div>

                {/* Search and Filter */}
                <div className="bg-[#111C2E] border border-white/5 rounded-xl p-4 mb-6">
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1 relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search projects..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-9 pr-4 py-2.5 bg-[#1A2A4A] border border-white/10 rounded-xl text-white placeholder-gray-400 text-sm focus:outline-none focus:border-gold/50 transition-colors"
                            />
                        </div>
                        <select
                            value={selectedStatus}
                            onChange={(e) => setSelectedStatus(e.target.value)}
                            className="px-4 py-2.5 bg-[#1A2A4A] border border-white/10 rounded-xl text-white focus:outline-none focus:border-gold/50 transition-colors text-sm"
                        >
                            {statuses.map(status => (
                                <option key={status} value={status}>{status}</option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Projects Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                    {filteredProjects.map((project, index) => {
                        const IconComponent = project.image;
                        return (
                            <motion.div
                                key={project.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: index * 0.05 }}
                                className="bg-[#111C2E] border border-white/5 rounded-xl md:rounded-2xl hover:border-gold/30 transition-all duration-300 overflow-hidden hover:-translate-y-1"
                            >
                                <div className="p-4 md:p-6">
                                    <div className="flex items-start justify-between">
                                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br from-gold/20 to-gold-light/20 flex items-center justify-center`}>
                                            <IconComponent className="w-6 h-6 text-gold" />
                                        </div>
                                        <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(project.status)}`}>
                                            {getStatusIcon(project.status)}
                                            {project.status}
                                        </span>
                                    </div>
                                    <h3 className="text-lg font-bold text-white mt-3">{project.title}</h3>
                                    <p className="text-gray-400 text-sm flex items-center gap-1">
                                        <MapPin className="w-4 h-4" /> {project.location}
                                    </p>
                                    <p className="text-gray-400 text-sm">Client: {project.client}</p>
                                    <div className="flex items-center gap-3 mt-3 text-sm">
                                        <span className="text-gold font-semibold">{project.budget}</span>
                                        <span className="text-gray-500">|</span>
                                        <span className="text-gray-400">{project.views} views</span>
                                    </div>
                                    <div className="mt-3">
                                        <div className="flex items-center justify-between text-xs text-gray-400 mb-1">
                                            <span>Progress</span>
                                            <span>{project.progress}%</span>
                                        </div>
                                        <div className="w-full h-1.5 bg-[#1A2A4A] rounded-full overflow-hidden">
                                            <div className="h-full bg-gold rounded-full transition-all duration-1000" style={{ width: `${project.progress}%` }} />
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2 mt-4 pt-4 border-t border-white/5">
                                        <Link
                                            to={`/projects/${project.id}`}
                                            className="flex-1 px-3 py-2 bg-gold text-[#0A1628] text-sm font-semibold rounded-lg hover:bg-gold-light transition-colors text-center"
                                        >
                                            <Eye className="w-4 h-4 inline mr-1" /> View
                                        </Link>
                                        <button className="p-2 hover:bg-white/5 rounded-lg transition-colors">
                                            <Edit className="w-4 h-4 text-gray-400" />
                                        </button>
                                        <button className="p-2 hover:bg-red-500/10 rounded-lg transition-colors">
                                            <Trash2 className="w-4 h-4 text-red-400" />
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                {filteredProjects.length === 0 && (
                    <div className="text-center py-12">
                        <div className="text-6xl mb-4">🔍</div>
                        <h3 className="text-xl font-bold text-white">No projects found</h3>
                        <p className="text-gray-400 text-sm mt-2">Try adjusting your search or filters</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ConstructorProjects;
