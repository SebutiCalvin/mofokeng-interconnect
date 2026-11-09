import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    Briefcase,
    Users,
    Eye,
    Star,
    TrendingUp,
    TrendingDown,
    MessageCircle,
    DollarSign,
    PlusCircle,
    ArrowRight,
    Home,
    Building,
    Castle,
    Leaf,
    RefreshCw,
} from 'lucide-react';

// Import the Chat component
import ChatModule from '../../components/Chat/ChatModule';

// Assume you have an auth hook – adjust the import path as needed
// If you don't have one, you can pass the user as a prop from the parent
import { useAuth } from '../../hooks/useAuth'; 

const ConstructorDashboard = () => {
    const [isLoading, setIsLoading] = useState(true);
    const { user } = useAuth(); // get the logged‑in user

    // Stats data (unchanged)
    const stats = [
        { 
            icon: Briefcase, 
            label: 'Total Projects', 
            value: '24', 
            change: '+12%', 
            trend: 'up',
            color: 'from-blue-500 to-indigo-500',
        },
        { 
            icon: Users, 
            label: 'Total Clients', 
            value: '18', 
            change: '+8%', 
            trend: 'up',
            color: 'from-emerald-500 to-teal-500',
        },
        { 
            icon: Eye, 
            label: 'Profile Views', 
            value: '1,247', 
            change: '+23%', 
            trend: 'up',
            color: 'from-purple-500 to-pink-500',
        },
        { 
            icon: Star, 
            label: 'Average Rating', 
            value: '4.8', 
            change: '+0.3', 
            trend: 'up',
            color: 'from-orange-500 to-red-500',
        },
        { 
            icon: MessageCircle, 
            label: 'New Messages', 
            value: '8', 
            change: '+5', 
            trend: 'up',
            color: 'from-cyan-500 to-blue-500',
        },
        { 
            icon: DollarSign, 
            label: 'Revenue', 
            value: 'M 2.4M', 
            change: '+18%', 
            trend: 'up',
            color: 'from-gold to-gold-light',
        },
    ];

    // Recent projects (unchanged)
    const recentProjects = [
        {
            id: 1,
            title: 'Modern Eco Villa',
            location: 'Nairobi, Kenya',
            status: 'Completed',
            budget: 'M 15M',
            date: '2026-07-25',
            client: 'John Mwangi',
            icon: Home,
            iconBg: 'from-emerald-500/20 to-emerald-500/10',
            iconColor: 'text-emerald-600',
            progress: 100
        },
        {
            id: 2,
            title: 'Luxury Mansion',
            location: 'Maseru, Lesotho',
            status: 'In Progress',
            budget: 'M 25M',
            date: '2026-07-20',
            client: 'Mary Lebeko',
            icon: Castle,
            iconBg: 'from-purple-500/20 to-purple-500/10',
            iconColor: 'text-purple-600',
            progress: 65
        },
        {
            id: 3,
            title: 'Office Complex',
            location: 'Johannesburg, SA',
            status: 'Planning',
            budget: 'M 45M',
            date: '2026-07-15',
            client: 'David Maloi',
            icon: Building,
            iconBg: 'from-blue-500/20 to-blue-500/10',
            iconColor: 'text-blue-600',
            progress: 20
        },
        {
            id: 4,
            title: 'Green Housing Project',
            location: 'Kigali, Rwanda',
            status: 'Completed',
            budget: 'M 8M',
            date: '2026-07-10',
            client: 'Sarah Kamau',
            icon: Leaf,
            iconBg: 'from-emerald-500/20 to-teal-500/10',
            iconColor: 'text-emerald-600',
            progress: 100
        },
    ];

    const getStatusColor = (status) => {
        const colors = {
            'Completed': 'bg-emerald-100 text-emerald-700',
            'In Progress': 'bg-blue-100 text-blue-700',
            'Planning': 'bg-yellow-100 text-yellow-700',
            'On Hold': 'bg-orange-100 text-orange-700',
            'Cancelled': 'bg-red-100 text-red-700',
        };
        return colors[status] || 'bg-gray-100 text-gray-600';
    };

    useEffect(() => {
        setTimeout(() => setIsLoading(false), 1000);
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 py-6 md:py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6 md:mb-8">
                    <div>
                        <h1 className="text-2xl md:text-3xl font-['Playfair_Display'] font-bold text-gray-900">
                            Constructor Dashboard
                        </h1>
                        <p className="text-gray-600 text-sm mt-1">Welcome back! Here's what's happening with your business</p>
                    </div>
                    <div className="flex flex-wrap gap-3">
                        <Link
                            to="/constructor/projects/upload"
                            className="px-4 py-2 bg-gold text-white font-semibold rounded-xl hover:bg-gold-light transition-all duration-300 flex items-center gap-2 text-sm shadow-md hover:shadow-lg"
                        >
                            <PlusCircle className="w-4 h-4" />
                            <span className="hidden sm:inline">New Project</span>
                            <span className="sm:hidden">Add</span>
                        </Link>
                        <button className="px-3 py-2 bg-white border border-gray-200 rounded-xl hover:border-gold/50 transition-all duration-300 flex items-center gap-2 text-gray-600 hover:text-gray-900 text-sm shadow-sm">
                            <RefreshCw className="w-4 h-4" />
                            <span className="hidden sm:inline">Refresh</span>
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
                            className="bg-white rounded-xl md:rounded-2xl p-3 md:p-4 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 border border-gray-100"
                        >
                            <div className={`w-8 h-8 md:w-10 md:h-10 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-2 md:mb-3`}>
                                <stat.icon className="w-4 h-4 md:w-5 md:h-5 text-white" />
                            </div>
                            <p className="text-lg md:text-2xl font-bold text-gray-900">{stat.value}</p>
                            <p className="text-xs text-gray-500">{stat.label}</p>
                            <div className={`flex items-center gap-1 text-xs mt-1 ${stat.trend === 'up' ? 'text-emerald-600' : 'text-red-600'}`}>
                                {stat.trend === 'up' ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                                {stat.change}
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Main Content: 2‑column layout */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
                    {/* Left: Recent Projects */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-xl md:rounded-2xl overflow-hidden shadow-sm border border-gray-100">
                            <div className="p-4 md:p-6 border-b border-gray-100 flex items-center justify-between">
                                <h2 className="text-base md:text-lg font-semibold text-gray-900">Recent Projects</h2>
                                <Link to="/constructor/projects" className="text-sm text-gold hover:text-gold-dark transition-colors flex items-center gap-1">
                                    View All <ArrowRight className="w-4 h-4" />
                                </Link>
                            </div>
                            <div className="divide-y divide-gray-100">
                                {recentProjects.map((project) => {
                                    const IconComponent = project.icon;
                                    return (
                                        <div key={project.id} className="p-3 md:p-4 hover:bg-gray-50 transition-colors">
                                            <div className="flex items-start gap-3 md:gap-4">
                                                <div className={`w-10 h-10 md:w-12 md:h-12 rounded-xl bg-gradient-to-br ${project.iconBg} flex items-center justify-center flex-shrink-0`}>
                                                    <IconComponent className={`w-5 h-5 md:w-6 md:h-6 ${project.iconColor}`} />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-start justify-between gap-2">
                                                        <div className="min-w-0">
                                                            <h3 className="font-semibold text-gray-900 text-sm md:text-base truncate">{project.title}</h3>
                                                            <p className="text-sm text-gray-500 truncate">{project.location}</p>
                                                            <p className="text-sm text-gray-500 truncate">Client: {project.client}</p>
                                                        </div>
                                                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(project.status)} flex-shrink-0`}>
                                                            {project.status}
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center gap-4 mt-2 text-sm">
                                                        <span className="text-gold font-semibold">{project.budget}</span>
                                                        <span className="text-gray-300">|</span>
                                                        <span className="text-gray-500">{project.date}</span>
                                                    </div>
                                                    <div className="mt-2">
                                                        <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                                                            <span>Progress</span>
                                                            <span>{project.progress}%</span>
                                                        </div>
                                                        <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                                                            <div className="h-full bg-gold rounded-full transition-all duration-1000" style={{ width: `${project.progress}%` }} />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    {/* Right: Chat Module */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 h-full min-h-[500px] flex flex-col">
                            <ChatModule currentUser={user} />
                        </div>
                    </div>
                </div>

                {/* Loading Overlay */}
                {isLoading && (
                    <div className="fixed inset-0 bg-gray-50/80 backdrop-blur-sm flex items-center justify-center z-50">
                        <div className="flex flex-col items-center">
                            <div className="w-12 h-12 border-4 border-gold/20 border-t-gold rounded-full animate-spin" />
                            <p className="text-gray-600 mt-4 text-sm">Loading...</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ConstructorDashboard;
