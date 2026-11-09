import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    Heart,
    MapPin,
    Star,
    Briefcase,
    CheckCircle,
    XCircle,
    Building2,
    Users,
    Clock,
    ArrowRight,
    Trash2,
    Search,
    Filter,
    Eye
} from 'lucide-react';

const ClientSaved = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const savedCompanies = [
        {
            id: 1,
            name: 'Mwangi Construction Ltd',
            location: 'Nairobi, Kenya',
            rating: 4.8,
            projects: 150,
            verified: true,
            image: '🏗️',
            savedDate: '2026-07-25',
            specialties: ['Residential', 'Commercial', 'Renovation']
        },
        {
            id: 2,
            name: 'Lesotho Building Co.',
            location: 'Maseru, Lesotho',
            rating: 4.9,
            projects: 200,
            verified: true,
            image: '🏢',
            savedDate: '2026-07-20',
            specialties: ['Residential', 'Commercial', 'Infrastructure']
        },
        {
            id: 3,
            name: 'EcoBuild Africa',
            location: 'Kigali, Rwanda',
            rating: 4.6,
            projects: 90,
            verified: true,
            image: '🌿',
            savedDate: '2026-07-15',
            specialties: ['Residential', 'Eco-Friendly', 'Renovation']
        },
        {
            id: 4,
            name: 'Golden Gate Builders',
            location: 'Accra, Ghana',
            rating: 4.4,
            projects: 70,
            verified: false,
            image: '🏗️',
            savedDate: '2026-07-10',
            specialties: ['Residential', 'Commercial']
        },
    ];

    const filteredCompanies = savedCompanies.filter(company =>
        company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        company.location.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleRemove = (id) => {
        // Remove from saved list logic
        alert('Company removed from saved list');
    };

    return (
        <div className="min-h-screen bg-[#FAF8F5] py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
                    <div>
                        <h1 className="text-3xl font-['Playfair_Display'] font-bold text-[#0A1628]">
                            Saved Companies
                        </h1>
                        <p className="text-gray-600 mt-1">View and manage your saved construction companies</p>
                    </div>
                    <div className="flex gap-3">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search saved companies..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10 pr-4 py-2.5 bg-white rounded-xl border border-gray-200 focus:outline-none focus:border-gold transition-colors w-64"
                            />
                        </div>
                    </div>
                </div>

                {/* Companies Grid */}
                {filteredCompanies.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredCompanies.map((company, index) => (
                            <motion.div
                                key={company.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: index * 0.05 }}
                                whileHover={{ y: -8 }}
                                className="bg-white rounded-2xl shadow-card hover:shadow-card-hover transition-all duration-300 overflow-hidden"
                            >
                                <div className="p-6">
                                    <div className="flex items-start justify-between">
                                        <div className="text-4xl">{company.image}</div>
                                        <button
                                            onClick={() => handleRemove(company.id)}
                                            className="p-2 hover:bg-red-50 rounded-lg transition-colors group"
                                        >
                                            <Heart className="w-5 h-5 text-red-500 fill-red-500 group-hover:scale-110 transition-transform" />
                                        </button>
                                    </div>

                                    <div className="mt-3">
                                        <div className="flex items-center gap-2">
                                            <h3 className="text-xl font-bold text-[#0A1628] hover:text-gold transition-colors">
                                                <Link to={`/constructors/${company.id}`}>{company.name}</Link>
                                            </h3>
                                            {company.verified && (
                                                <CheckCircle className="w-5 h-5 text-emerald-500" />
                                            )}
                                        </div>
                                        <p className="text-gray-600 text-sm flex items-center gap-1">
                                            <MapPin className="w-4 h-4" /> {company.location}
                                        </p>
                                    </div>

                                    <div className="flex items-center gap-4 mt-3 text-sm">
                                        <span className="flex items-center gap-1 text-gold">
                                            <Star className="w-4 h-4 fill-gold" /> {company.rating}
                                        </span>
                                        <span className="text-gray-400">|</span>
                                        <span className="text-gray-500 flex items-center gap-1">
                                            <Briefcase className="w-4 h-4" /> {company.projects} projects
                                        </span>
                                    </div>

                                    <div className="flex flex-wrap gap-2 mt-3">
                                        {company.specialties.map((spec, i) => (
                                            <span key={i} className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-full">
                                                {spec}
                                            </span>
                                        ))}
                                    </div>

                                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                                        <span className="text-xs text-gray-400">
                                            Saved on {new Date(company.savedDate).toLocaleDateString()}
                                        </span>
                                        <Link
                                            to={`/constructors/${company.id}`}
                                            className="inline-flex items-center gap-1 px-4 py-2 bg-[#0A1628] text-white text-sm rounded-xl hover:bg-[#1A2A4A] transition-colors"
                                        >
                                            <Eye className="w-4 h-4" />
                                            View Profile
                                        </Link>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-16 bg-white rounded-2xl shadow-card">
                        <div className="text-6xl mb-4">💔</div>
                        <h3 className="text-2xl font-bold text-[#0A1628]">No Saved Companies</h3>
                        <p className="text-gray-600 mt-2">Start saving companies you're interested in</p>
                        <Link to="/constructors" className="inline-block mt-4 px-6 py-3 bg-gold text-[#0A1628] font-semibold rounded-xl hover:bg-gold-light transition-colors">
                            Browse Companies
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ClientSaved;
