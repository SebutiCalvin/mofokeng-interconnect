import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
    Search, 
    MapPin, 
    Calendar, 
    Clock, 
    ArrowRight, 
    Filter,
    CheckCircle2,
    AlertCircle,
    Building2
} from 'lucide-react';

const TendersPage = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const tenders = [
        {
            id: 1,
            title: 'Hospital Renovation & Expansion',
            category: 'Healthcare',
            location: 'Kigali, Rwanda',
            budget: 'M 80M',
            deadline: '2026-07-30',
            daysLeft: 45,
            status: 'Closing Soon',
            applicants: 15,
            description: 'Complete renovation of the main regional hospital including new emergency wing and modernized patient wards.'
        },
        {
            id: 2,
            title: 'School Construction - Modern Learning Facility',
            category: 'Education',
            location: 'Maseru, Lesotho',
            budget: 'M 50M',
            deadline: '2026-08-15',
            daysLeft: 60,
            status: 'Open',
            applicants: 12,
            description: 'Construction of a new state-of-the-art high school with science labs, library, and sports facilities.'
        },
        {
            id: 3,
            title: 'Water Treatment Plant',
            category: 'Infrastructure',
            location: 'Lusaka, Zambia',
            budget: 'M 120M',
            deadline: '2026-08-20',
            daysLeft: 75,
            status: 'Open',
            applicants: 7,
            description: 'Design and build a large-scale water treatment facility to serve the growing urban population.'
        },
        {
            id: 4,
            title: 'Affordable Housing Project',
            category: 'Residential',
            location: 'Accra, Ghana',
            budget: 'M 150M',
            deadline: '2026-08-30',
            daysLeft: 85,
            status: 'Open',
            applicants: 6,
            description: 'Development of 500 affordable housing units with community centers and green spaces.'
        },
    ];

    const getStatusBadge = (status) => {
        if (status === 'Open') return 'bg-emerald-50 text-emerald-600 border-emerald-200';
        if (status === 'Closing Soon') return 'bg-orange-50 text-orange-600 border-orange-200';
        return 'bg-gray-50 text-gray-600 border-gray-200';
    };

    return (
        <div className="min-h-screen bg-[#FAF8F5] py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* Header */}
                <div className="mb-10 text-center">
                    <h1 className="text-4xl font-bold text-[#0A1628] mb-3">Open Tenders</h1>
                    <p className="text-gray-500 max-w-2xl mx-auto">Discover and apply for the latest construction tenders across Africa. Secure your next big project.</p>
                </div>

                {/* Search Bar */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 mb-8 flex flex-col md:flex-row gap-4">
                    <div className="flex-1 relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search tenders by title, category, or location..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 bg-gray-50 rounded-xl border-none focus:ring-2 focus:ring-[#D4AF37] outline-none"
                        />
                    </div>
                    <button className="px-6 py-3 bg-[#0A1628] text-white rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-[#1A2A4A] transition-colors">
                        <Filter className="w-4 h-4" /> Filter Tenders
                    </button>
                </div>

                {/* Tender Cards */}
                <div className="space-y-4">
                    {tenders.map((tender, index) => (
                        <motion.div 
                            key={tender.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: index * 0.1 }}
                            className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow group"
                        >
                            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                                
                                {/* Left Side: Info */}
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-3">
                                        <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusBadge(tender.status)}`}>
                                            {tender.status}
                                        </span>
                                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-600">
                                            {tender.category}
                                        </span>
                                        <span className="text-sm text-gray-400 flex items-center gap-1">
                                            <Clock className="w-4 h-4" /> Posted 2 days ago
                                        </span>
                                    </div>
                                    
                                    <h3 className="text-xl font-bold text-[#0A1628] group-hover:text-[#D4AF37] transition-colors mb-2">
                                        {tender.title}
                                    </h3>
                                    <p className="text-gray-500 text-sm line-clamp-2 mb-4">
                                        {tender.description}
                                    </p>

                                    <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600">
                                        <span className="flex items-center gap-2">
                                            <MapPin className="w-4 h-4 text-[#D4AF37]" /> {tender.location}
                                        </span>
                                        <span className="flex items-center gap-2">
                                            <Building2 className="w-4 h-4 text-[#D4AF37]" /> {tender.budget} Budget
                                        </span>
                                        <span className="flex items-center gap-2">
                                            <Calendar className="w-4 h-4 text-[#D4AF37]" /> Deadline: {tender.deadline}
                                        </span>
                                    </div>
                                </div>

                                {/* Right Side: Action */}
                                <div className="lg:w-64 flex flex-col lg:items-end justify-between border-t lg:border-t-0 lg:border-l border-gray-100 pt-4 lg:pt-0 lg:pl-6">
                                    <div className="text-right mb-4">
                                        <p className="text-sm text-gray-500 mb-1">{tender.applicants} Applicants</p>
                                        <div className="w-full bg-gray-100 rounded-full h-2 mt-2">
                                            <div className="bg-[#D4AF37] h-2 rounded-full" style={{ width: `${(tender.daysLeft / 90) * 100}%` }}></div>
                                        </div>
                                        <p className="text-xs text-orange-500 font-semibold mt-2">{tender.daysLeft} days left to apply</p>
                                    </div>
                                    
                                    <Link to={`/tenders/${tender.id}`} className="w-full py-3 bg-[#0A1628] text-white text-center rounded-xl font-semibold hover:bg-[#D4AF37] hover:text-[#0A1628] transition-all flex items-center justify-center gap-2">
                                        View Tender <ArrowRight className="w-4 h-4" />
                                    </Link>
                                </div>

                            </div>
                        </motion.div>
                    ))}
                </div>

            </div>
        </div>
    );
};

export default TendersPage;