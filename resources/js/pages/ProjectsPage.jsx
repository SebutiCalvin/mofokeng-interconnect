import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Search,
    Filter,
    MapPin,
    Briefcase,
    Calendar,
    Heart,
    Share2,
    ArrowRight,
    X,
    Grid3x3,
    LayoutList,
    Eye,
    Building2,
    Home,
    Factory,
    Building
} from 'lucide-react';

const ProjectsPage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedType, setSelectedType] = useState('All');
    const [selectedLocation, setSelectedLocation] = useState('All');
    const [selectedBudget, setSelectedBudget] = useState('All');
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [viewMode, setViewMode] = useState('grid');
    const [currentPage, setCurrentPage] = useState(1);
    const [favorites, setFavorites] = useState([]);
    const itemsPerPage = 6;

    // Mock data with Local Images
    const projects = [
        {
            id: 1,
            title: 'Modern Eco Villa',
            location: 'Nairobi, Kenya',
            type: 'Residential',
            budget: 'M 15M',
            description: 'A stunning modern villa with eco-friendly features, solar panels, and smart home technology.',
            year: '2025',
            status: 'Completed',
            featured: true,
            constructor: 'Mwangi Construction Ltd',
            image: '/images/projects/project-1.jpg'
        },
        {
            id: 2,
            title: 'Royal Luxury Mansion',
            location: 'Maseru, Lesotho',
            type: 'Residential',
            budget: 'M 25M',
            description: 'A magnificent 6-bedroom mansion with panoramic views, infinity pool, and state-of-the-art amenities.',
            year: '2024',
            status: 'Completed',
            featured: false,
            constructor: 'Lesotho Building Co.',
            image: '/images/projects/project-2.jpg'
        },
        {
            id: 3,
            title: 'Business Office Complex',
            location: 'Johannesburg, SA',
            type: 'Commercial',
            budget: 'M 45M',
            description: 'A modern 10-story office complex with flexible workspaces, conference facilities, and sustainable design.',
            year: '2024',
            status: 'Ongoing',
            featured: true,
            constructor: 'African Skyscrapers',
            image: '/images/projects/project-3.jpg'
        },
        {
            id: 4,
            title: 'Green Housing Project',
            location: 'Kigali, Rwanda',
            type: 'Residential',
            budget: 'M 8M',
            description: 'Sustainable housing community with 50 eco-friendly homes, green spaces, and community facilities.',
            year: '2025',
            status: 'Completed',
            featured: false,
            constructor: 'EcoBuild Africa',
            image: '/images/projects/project-4.jpg'
        },
        {
            id: 5,
            title: 'Modern Shopping Mall',
            location: 'Lagos, Nigeria',
            type: 'Commercial',
            budget: 'M 80M',
            description: 'A state-of-the-art shopping mall with 100+ retail stores, food court, and entertainment facilities.',
            year: '2025',
            status: 'Ongoing',
            featured: true,
            constructor: 'Golden Gate Builders',
            image: '/images/projects/project-5.jpg'
        },
        {
            id: 6,
            title: 'Industrial Warehouse',
            location: 'Dar es Salaam, Tanzania',
            type: 'Industrial',
            budget: 'M 30M',
            description: 'A modern industrial warehouse with advanced logistics and storage facilities.',
            year: '2024',
            status: 'Completed',
            featured: false,
            constructor: 'Coastal Engineering',
            image: '/images/projects/project-6.jpg'
        },
    ];

    const getProjectIcon = (type) => {
        switch(type) {
            case 'Residential': return <Home className="w-10 h-10 text-gold" />;
            case 'Commercial': return <Building className="w-10 h-10 text-gold" />;
            case 'Industrial': return <Factory className="w-10 h-10 text-gold" />;
            default: return <Building2 className="w-10 h-10 text-gold" />;
        }
    };

    const types = ['All', 'Residential', 'Commercial', 'Industrial'];
    const locations = ['All', ...new Set(projects.map(p => p.location))];
    const budgets = ['All', 'Under M 10M', 'M 10M - 50M', 'Over M 50M'];

    const filteredProjects = projects.filter(project => {
        const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             project.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesType = selectedType === 'All' || project.type === selectedType;
        const matchesLocation = selectedLocation === 'All' || project.location === selectedLocation;
        const matchesBudget = selectedBudget === 'All' ||
            (selectedBudget === 'Under M 10M' && parseInt(project.budget.replace(/[^0-9]/g, '')) < 10) ||
            (selectedBudget === 'M 10M - 50M' && parseInt(project.budget.replace(/[^0-9]/g, '')) >= 10 && parseInt(project.budget.replace(/[^0-9]/g, '')) <= 50) ||
            (selectedBudget === 'Over M 50M' && parseInt(project.budget.replace(/[^0-9]/g, '')) > 50);
        
        return matchesSearch && matchesType && matchesLocation && matchesBudget;
    });

    const sortedProjects = [...filteredProjects].sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    const totalPages = Math.ceil(sortedProjects.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedProjects = sortedProjects.slice(startIndex, startIndex + itemsPerPage);

    useEffect(() => { setCurrentPage(1); }, [searchTerm, selectedType, selectedLocation, selectedBudget]);

    const toggleFavorite = (id) => {
        setFavorites(prev => prev.includes(id) ? prev.filter(fid => fid !== id) : [...prev, id]);
    };

    const clearFilters = () => {
        setSearchTerm(''); setSelectedType('All'); setSelectedLocation('All'); setSelectedBudget('All');
    };

    const getStatusColor = (status) => {
        switch(status) {
            case 'Completed': return 'bg-emerald-100 text-emerald-700';
            case 'Ongoing': return 'bg-blue-100 text-blue-700';
            default: return 'bg-gray-100 text-gray-700';
        }
    };

    return (
        <div className="min-h-screen bg-[#FAF8F5] py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-[#0A1628]">
                        Construction Projects
                    </h1>
                    <p className="text-gray-600 mt-2">Explore amazing construction projects across Africa</p>
                </div>

                {/* Search and Filter Bar */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 mb-6">
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1 relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search projects by title..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:border-gold transition-colors"
                            />
                        </div>
                        <div className="flex items-center gap-1 bg-gray-50 rounded-xl p-1">
                            <button onClick={() => setViewMode('grid')} className={`p-2 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-white shadow-sm text-gold' : 'text-gray-400'}`}>
                                <Grid3x3 className="w-5 h-5" />
                            </button>
                            <button onClick={() => setViewMode('list')} className={`p-2 rounded-lg transition-colors ${viewMode === 'list' ? 'bg-white shadow-sm text-gold' : 'text-gray-400'}`}>
                                <LayoutList className="w-5 h-5" />
                            </button>
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
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Project Type</label>
                                        <select value={selectedType} onChange={(e) => setSelectedType(e.target.value)} className="w-full px-3 py-2 bg-gray-50 rounded-lg border border-gray-200">
                                            {types.map(type => <option key={type} value={type}>{type}</option>)}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                                        <select value={selectedLocation} onChange={(e) => setSelectedLocation(e.target.value)} className="w-full px-3 py-2 bg-gray-50 rounded-lg border border-gray-200">
                                            {locations.map(loc => <option key={loc} value={loc}>{loc}</option>)}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Budget</label>
                                        <select value={selectedBudget} onChange={(e) => setSelectedBudget(e.target.value)} className="w-full px-3 py-2 bg-gray-50 rounded-lg border border-gray-200">
                                            {budgets.map(budget => <option key={budget} value={budget}>{budget}</option>)}
                                        </select>
                                    </div>
                                </div>
                                <button onClick={clearFilters} className="mt-4 text-sm text-gold hover:text-gold-light flex items-center gap-2">
                                    <X className="w-4 h-4" /> Clear All Filters
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Grid */}
                <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
                    {paginatedProjects.map((project, index) => (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: index * 0.05 }}
                            className={`bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 overflow-hidden group ${viewMode === 'list' ? 'flex flex-col md:flex-row' : ''}`}
                        >
                            {/* Image Header */}
                            <div className={`${viewMode === 'grid' ? 'h-48' : 'md:w-64 h-48 md:h-auto'} relative flex-shrink-0 overflow-hidden`}>
                                <img src={project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                {project.featured && (
                                    <span className="absolute top-3 left-3 px-3 py-1 bg-gold text-[#0A1628] text-xs font-bold rounded-full shadow-md">
                                        Featured
                                    </span>
                                )}
                                <div className="absolute top-3 right-3 flex gap-2">
                                    <button onClick={() => toggleFavorite(project.id)} className="w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors shadow-lg">
                                        <Heart className={`w-4 h-4 ${favorites.includes(project.id) ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
                                    </button>
                                </div>
                            </div>

                            {/* Content */}
                            <div className={`${viewMode === 'grid' ? 'p-6' : 'p-6 flex-1'}`}>
                                <div className="flex items-start justify-between">
                                    <div>
                                        <h3 className="text-xl font-bold text-[#0A1628] group-hover:text-gold transition-colors">{project.title}</h3>
                                        <p className="text-gray-600 text-sm flex items-center gap-1 mt-1">
                                            <MapPin className="w-4 h-4" /> {project.location}
                                        </p>
                                    </div>
                                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(project.status)}`}>
                                        {project.status}
                                    </span>
                                </div>

                                <div className="flex flex-wrap items-center gap-3 mt-4">
                                    <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-semibold rounded-full flex items-center gap-1">
                                        {getProjectIcon(project.type)} {project.type}
                                    </span>
                                    <span className="text-gray-600 text-sm font-medium flex items-center gap-1">
                                        {project.budget}
                                    </span>
                                    <span className="text-gray-500 text-sm flex items-center gap-1">
                                        <Calendar className="w-3 h-3" /> {project.year}
                                    </span>
                                </div>

                                <div className="flex items-center justify-between mt-6">
                                    <span className="text-xs text-gray-500 flex items-center gap-1">
                                        <Briefcase className="w-3 h-3" /> {project.constructor}
                                    </span>
                                    <Link to={`/projects/${project.id}`} className="inline-flex items-center gap-2 px-4 py-2 bg-[#0A1628] text-white rounded-xl hover:bg-gold hover:text-[#0A1628] transition-all duration-300 group">
                                        <Eye className="w-4 h-4" /> View
                                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
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

export default ProjectsPage;