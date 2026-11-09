import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Search, 
    Filter, 
    MapPin, 
    Star, 
    Briefcase, 
    CheckCircle, 
    ChevronDown,
    Building2,
    Users,
    ArrowRight,
    X
} from 'lucide-react';

const ConstructorsPage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedLocation, setSelectedLocation] = useState('All');
    const [selectedRating, setSelectedRating] = useState('All');
    const [selectedVerification, setSelectedVerification] = useState('All');
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [sortBy, setSortBy] = useState('rating');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

    const constructors = [
        { 
            id: 1, 
            name: 'Mwangi Construction Ltd', 
            location: 'Nairobi, Kenya', 
            rating: 4.8, 
            projects: 150, 
            verified: true,
            description: 'Leading construction company specializing in residential and commercial projects.',
            established: 2010,
            employees: 120,
            image: '/images/constructors/constructor-1.jpg'
        },
        { 
            id: 2, 
            name: 'Lesotho Building Co.', 
            location: 'Maseru, Lesotho', 
            rating: 4.9, 
            projects: 200, 
            verified: true,
            description: 'Premier construction firm with decades of experience in Lesotho.',
            established: 2005,
            employees: 200,
            image: '/images/constructors/constructor-2.jpg'
        },
        { 
            id: 3, 
            name: 'African Skyscrapers', 
            location: 'Johannesburg, SA', 
            rating: 4.7, 
            projects: 120, 
            verified: false,
            description: 'Innovative construction company pushing boundaries in high-rise development.',
            established: 2015,
            employees: 80,
            image: '/images/constructors/constructor-3.jpg'
        },
        { 
            id: 4, 
            name: 'EcoBuild Africa', 
            location: 'Kigali, Rwanda', 
            rating: 4.6, 
            projects: 90, 
            verified: true,
            description: 'Sustainable construction experts focused on eco-friendly building solutions.',
            established: 2018,
            employees: 60,
            image: '/images/constructors/constructor-4.jpg'
        },
        { 
            id: 5, 
            name: 'Desert Constructors', 
            location: 'Cairo, Egypt', 
            rating: 4.5, 
            projects: 80, 
            verified: false,
            description: 'Specialized in large-scale infrastructure projects in challenging environments.',
            established: 2012,
            employees: 150,
            image: '/images/constructors/constructor-5.jpg'
        },
        { 
            id: 6, 
            name: 'Coastal Engineering', 
            location: 'Dar es Salaam, Tanzania', 
            rating: 4.8, 
            projects: 110, 
            verified: true,
            description: 'Marine and coastal construction specialists with regional expertise.',
            established: 2008,
            employees: 90,
            image: '/images/constructors/constructor-6.jpg'
        },
    ];

    const locations = ['All', ...new Set(constructors.map(c => c.location))];
    const ratings = ['All', '4.5+', '4.0+', '3.5+'];
    const verificationOptions = ['All', 'Verified Only', 'Unverified Only'];

    const filteredConstructors = constructors.filter(constructor => {
        const matchesSearch = constructor.name.toLowerCase().includes(searchTerm.toLowerCase()) || constructor.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesLocation = selectedLocation === 'All' || constructor.location === selectedLocation;
        const matchesRating = selectedRating === 'All' || (selectedRating === '4.5+' && constructor.rating >= 4.5) || (selectedRating === '4.0+' && constructor.rating >= 4.0) || (selectedRating === '3.5+' && constructor.rating >= 3.5);
        const matchesVerification = selectedVerification === 'All' || (selectedVerification === 'Verified Only' && constructor.verified) || (selectedVerification === 'Unverified Only' && !constructor.verified);
        return matchesSearch && matchesLocation && matchesRating && matchesVerification;
    });

    const sortedConstructors = [...filteredConstructors].sort((a, b) => {
        if (sortBy === 'rating') return b.rating - a.rating;
        if (sortBy === 'projects') return b.projects - a.projects;
        if (sortBy === 'name') return a.name.localeCompare(b.name);
        return 0;
    });

    const totalPages = Math.ceil(sortedConstructors.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedConstructors = sortedConstructors.slice(startIndex, startIndex + itemsPerPage);

    useEffect(() => { setCurrentPage(1); }, [searchTerm, selectedLocation, selectedRating, selectedVerification, sortBy]);

    const clearFilters = () => {
        setSearchTerm(''); setSelectedLocation('All'); setSelectedRating('All'); setSelectedVerification('All'); setSortBy('rating');
    };

    return (
        <div className="min-h-screen bg-[#FAF8F5] py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-[#0A1628]">
                        Top Construction Companies
                    </h1>
                    <p className="text-gray-600 mt-2">Find the best construction companies across Africa</p>
                </div>

                {/* Filter Bar */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 mb-6">
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1 relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input type="text" placeholder="Search companies..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-3 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:border-gold transition-colors" />
                        </div>
                        <div className="relative">
                            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="w-full md:w-40 px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 appearance-none">
                                <option value="rating">Highest Rated</option>
                                <option value="projects">Most Projects</option>
                                <option value="name">Alphabetical</option>
                            </select>
                            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                        </div>
                        <button onClick={() => setIsFilterOpen(!isFilterOpen)} className="flex items-center justify-center gap-2 px-6 py-3 bg-[#0A1628] text-white rounded-xl hover:bg-[#1A2A4A] transition-colors">
                            <Filter className="w-5 h-5" /> Filters
                        </button>
                    </div>

                    <AnimatePresence>
                        {isFilterOpen && (
                            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="mt-4 pt-4 border-t border-gray-100 overflow-hidden">
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                                        <select value={selectedLocation} onChange={(e) => setSelectedLocation(e.target.value)} className="w-full px-3 py-2 bg-gray-50 rounded-lg border border-gray-200">
                                            {locations.map(loc => <option key={loc} value={loc}>{loc}</option>)}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
                                        <select value={selectedRating} onChange={(e) => setSelectedRating(e.target.value)} className="w-full px-3 py-2 bg-gray-50 rounded-lg border border-gray-200">
                                            {ratings.map(r => <option key={r} value={r}>{r}</option>)}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Verification</label>
                                        <select value={selectedVerification} onChange={(e) => setSelectedVerification(e.target.value)} className="w-full px-3 py-2 bg-gray-50 rounded-lg border border-gray-200">
                                            {verificationOptions.map(v => <option key={v} value={v}>{v}</option>)}
                                        </select>
                                    </div>
                                </div>
                                <button onClick={clearFilters} className="mt-4 text-sm text-gold hover:text-gold-light flex items-center gap-2">
                                    <X className="w-4 h-4" /> Clear Filters
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {paginatedConstructors.map((company, index) => (
                        <motion.div
                            key={company.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: index * 0.05 }}
                            className="bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 overflow-hidden group"
                        >
                            {/* Image Header */}
                            <div className="h-40 relative overflow-hidden">
                                <img src={company.image} alt={company.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                {company.verified && (
                                    <span className="absolute top-3 right-3 px-3 py-1 bg-emerald-500 text-white text-xs font-bold rounded-full flex items-center gap-1 shadow-md">
                                        <CheckCircle className="w-3 h-3" /> Verified
                                    </span>
                                )}
                                <div className="absolute bottom-3 left-3">
                                    <h3 className="text-xl font-bold text-white drop-shadow-md">{company.name}</h3>
                                </div>
                            </div>

                            <div className="p-6">
                                <p className="text-gray-600 text-sm flex items-center gap-1">
                                    <MapPin className="w-4 h-4 text-gold" /> {company.location}
                                </p>
                                <p className="text-gray-500 text-sm mt-2 line-clamp-2">{company.description}</p>
                                
                                <div className="flex items-center gap-4 mt-4 border-t border-gray-100 pt-4">
                                    <div className="flex items-center gap-1 text-gold font-bold">
                                        <Star className="w-4 h-4 fill-current" /> {company.rating}
                                    </div>
                                    <div className="flex items-center gap-1 text-gray-500 text-sm">
                                        <Briefcase className="w-4 h-4" /> {company.projects} projects
                                    </div>
                                    <div className="flex items-center gap-1 text-gray-500 text-sm">
                                        <Users className="w-4 h-4" /> {company.employees}
                                    </div>
                                </div>

                                <Link to={`/constructors/${company.id}`} className="mt-6 block w-full text-center py-2.5 bg-[#0A1628] text-white rounded-xl hover:bg-gold hover:text-[#0A1628] transition-all duration-300 flex items-center justify-center gap-2">
                                    View Profile <ArrowRight className="w-4 h-4" />
                                </Link>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ConstructorsPage;