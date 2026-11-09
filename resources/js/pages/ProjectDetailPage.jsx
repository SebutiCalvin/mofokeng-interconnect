import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    MapPin,
    DollarSign,
    Calendar,
    Building2,
    ArrowLeft,
    Heart,
    Share2,
    MessageCircle,
    CheckCircle,
    Clock,
    Ruler,
    Briefcase,
    Send,
    ChevronLeft,
    ChevronRight,
    Star,
    Home,
    Waves,
    Sun,
    Droplets,
    Shield,
    Car,
    TreePine,
    ArrowRight
} from 'lucide-react';

const ProjectDetailPage = () => {
    const { slug } = useParams();
    const [activeImageIndex, setActiveImageIndex] = useState(0);
    const [isFavorite, setIsFavorite] = useState(false);
    const [showContactForm, setShowContactForm] = useState(false);
    const [showFullDescription, setShowFullDescription] = useState(false);

    // Mock project data
    const project = {
        id: 4,
        title: 'Modern Eco Villa',
        slug: 'modern-eco-villa',
        location: 'Nairobi, Kenya',
        type: 'Residential',
        category: 'Luxury',
        budget: 'M 15M',
        description: `This stunning modern eco-villa represents the pinnacle of sustainable luxury living in East Africa. Designed with both aesthetics and environmental consciousness in mind, this 4-bedroom home seamlessly blends contemporary architecture with eco-friendly features.
        The villa features state-of-the-art solar panel systems, rainwater harvesting, and energy-efficient appliances throughout. The open-plan living spaces are flooded with natural light, creating a warm and inviting atmosphere that connects indoor and outdoor living.
        Every detail has been carefully considered, from the premium finishes to the smart home automation system that controls lighting, security, and climate. The property also boasts a beautiful landscaped garden, infinity pool, and panoramic views of the surrounding landscape.`,
        year: '2025',
        size: '500 sqm',
        status: 'Completed',
        featured: true,
        constructor: {
            name: 'Mwangi Construction Ltd',
            slug: 'mwangi-construction',
            rating: 4.8,
            projects: 150,
            verified: true,
            location: 'Nairobi, Kenya',
        },
        // Using local images for the gallery
        images: [
            { id: 1, url: '/images/projects/project-4.jpg', caption: 'Front View' },
            { id: 2, url: '/images/projects/project-1.jpg', caption: 'Backyard View' },
            { id: 3, url: '/images/projects/project-2.jpg', caption: 'Garden Area' },
            { id: 4, url: '/images/projects/project-3.jpg', caption: 'Living Room' },
        ],
        // Using Lucide Icons for features
        features: [
            { icon: Waves, label: 'Infinity Pool' },
            { icon: Sun, label: 'Solar Panels' },
            { icon: Droplets, label: 'Rainwater Harvesting' },
            { icon: Home, label: 'Smart Home System' },
            { icon: TreePine, label: 'Landscaped Garden' },
            { icon: Car, label: 'Underground Parking' },
            { icon: Shield, label: 'Security System' },
            { icon: CheckCircle, label: 'Eco-Friendly Materials' },
        ],
        materials: [
            'High-grade concrete',
            'Imported marble tiles',
            'Energy-efficient windows',
            'Premium hardwood flooring',
            'Sustainable timber',
            'Recycled steel'
        ],
        timeline: [
            { phase: 'Planning & Design', duration: '3 months', status: 'Completed' },
            { phase: 'Foundation & Structure', duration: '4 months', status: 'Completed' },
            { phase: 'Construction', duration: '6 months', status: 'Completed' },
            { phase: 'Finishing & Landscaping', duration: '3 months', status: 'Completed' },
        ],
        reviews: [
            {
                id: 1,
                user: 'John Mwangi',
                rating: 5,
                date: '2026-07-20',
                content: 'Absolutely stunning work! The attention to detail is remarkable.',
                avatar: 'JM'
            },
            {
                id: 2,
                user: 'Sarah Kamau',
                rating: 5,
                date: '2026-07-15',
                content: 'A beautiful home that perfectly blends luxury with sustainability.',
                avatar: 'SK'
            },
        ],
        similarProjects: [
            { id: 2, title: 'Luxury Mansion', type: 'Residential', location: 'Maseru, Lesotho' },
            { id: 4, title: 'Green Housing Project', type: 'Residential', location: 'Kigali, Rwanda' },
            { id: 8, title: 'Residential Estate', type: 'Residential', location: 'Accra, Ghana' },
        ]
    };

    const handlePrevImage = () => {
        setActiveImageIndex(prev => prev === 0 ? project.images.length - 1 : prev - 1);
    };

    const handleNextImage = () => {
        setActiveImageIndex(prev => prev === project.images.length - 1 ? 0 : prev + 1);
    };

    const renderStars = (rating) => {
        return Array.from({ length: 5 }, (_, i) => (
            <Star key={i} className={`w-4 h-4 ${i < Math.floor(rating) ? 'fill-[#D4AF37] text-[#D4AF37]' : 'text-gray-300'}`} />
        ));
    };

    const getStatusBadge = (status) => {
        const styles = {
            'Completed': 'bg-emerald-50 text-emerald-600 border border-emerald-200',
            'Ongoing': 'bg-blue-50 text-blue-600 border border-blue-200',
            'Planned': 'bg-yellow-50 text-yellow-600 border border-yellow-200'
        };
        return styles[status] || 'bg-gray-50 text-gray-600 border border-gray-200';
    };

    return (
        <div className="min-h-screen bg-[#FAF8F5] pb-12">
            {/* Image Gallery Section */}
            <div className="relative bg-[#0A1628] min-h-[60vh] flex items-center justify-center">
                <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    {/* Back Button */}
                    <Link
                        to="/projects"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm text-white rounded-xl hover:bg-white/20 transition-colors mb-6"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Projects
                    </Link>

                    {/* Main Image Display */}
                    <div className="relative bg-black/40 backdrop-blur-sm rounded-2xl p-2 border border-white/10 overflow-hidden">
                        <div className="flex items-center justify-center h-[400px] md:h-[500px] w-full">
                            <img 
                                src={project.images[activeImageIndex].url} 
                                alt={project.images[activeImageIndex].caption}
                                className="w-full h-full object-cover rounded-xl"
                            />
                        </div>

                        {/* Navigation Arrows */}
                        {project.images.length > 1 && (
                            <>
                                <button
                                    onClick={handlePrevImage}
                                    className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/50 text-white rounded-full flex items-center justify-center hover:bg-[#D4AF37] hover:text-[#0A1628] transition-colors backdrop-blur-md"
                                >
                                    <ChevronLeft className="w-6 h-6" />
                                </button>
                                <button
                                    onClick={handleNextImage}
                                    className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/50 text-white rounded-full flex items-center justify-center hover:bg-[#D4AF37] hover:text-[#0A1628] transition-colors backdrop-blur-md"
                                >
                                    <ChevronRight className="w-6 h-6" />
                                </button>
                            </>
                        )}
                    </div>

                    {/* Thumbnail Navigation */}
                    <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
                        {project.images.map((image, index) => (
                            <button
                                key={image.id}
                                onClick={() => setActiveImageIndex(index)}
                                className={`flex-shrink-0 w-20 h-16 rounded-xl overflow-hidden border-2 transition-colors ${
                                    activeImageIndex === index ? 'border-[#D4AF37]' : 'border-transparent opacity-50 hover:opacity-100'
                                }`}
                            >
                                <img src={image.url} alt="thumbnail" className="w-full h-full object-cover" />
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Project Details */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-10">
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
                    {/* Header */}
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                        <div>
                            <div className="flex items-center gap-3 flex-wrap mb-2">
                                <h1 className="text-2xl md:text-4xl font-bold text-[#0A1628]">
                                    {project.title}
                                </h1>
                                {project.featured && (
                                    <span className="px-3 py-1 bg-[#D4AF37] text-[#0A1628] text-xs font-bold rounded-full">
                                        Featured
                                    </span>
                                )}
                                <span className={`px-3 py-1 text-xs font-semibold rounded-full ${getStatusBadge(project.status)}`}>
                                    {project.status}
                                </span>
                            </div>
                            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                                <span className="flex items-center gap-1">
                                    <MapPin className="w-4 h-4 text-[#D4AF37]" /> {project.location}
                                </span>
                                <span className="flex items-center gap-1">
                                    <Building2 className="w-4 h-4 text-[#D4AF37]" /> {project.type}
                                </span>
                                <span className="flex items-center gap-1 font-semibold text-gray-800">
                                    {project.budget}
                                </span>
                                <span className="flex items-center gap-1">
                                    <Ruler className="w-4 h-4 text-[#D4AF37]" /> {project.size}
                                </span>
                            </div>
                        </div>

                        <div className="flex gap-3">
                            <button
                                onClick={() => setIsFavorite(!isFavorite)}
                                className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-colors ${
                                    isFavorite ? 'bg-red-50 text-red-500' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                }`}
                            >
                                <Heart className={`w-5 h-5 ${isFavorite ? 'fill-red-500' : ''}`} />
                                {isFavorite ? 'Saved' : 'Save'}
                            </button>
                            <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-600 rounded-xl hover:bg-gray-200 transition-colors">
                                <Share2 className="w-5 h-5" />
                                Share
                            </button>
                        </div>
                    </div>

                    {/* Quick Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 p-6 bg-[#FAF8F5] rounded-xl border border-gray-100">
                        <div className="text-center">
                            <div className="text-2xl font-bold text-[#D4AF37]">{project.year}</div>
                            <div className="text-xs font-medium text-gray-500 uppercase tracking-wider mt-1">Year Completed</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-bold text-[#D4AF37]">{project.size}</div>
                            <div className="text-xs font-medium text-gray-500 uppercase tracking-wider mt-1">Total Size</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-bold text-[#D4AF37]">{project.budget}</div>
                            <div className="text-xs font-medium text-gray-500 uppercase tracking-wider mt-1">Project Budget</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-bold text-[#D4AF37]">4.8★</div>
                            <div className="text-xs font-medium text-gray-500 uppercase tracking-wider mt-1">Rating</div>
                        </div>
                    </div>

                    {/* Features */}
                    <div className="mt-10">
                        <h3 className="text-xl font-bold text-[#0A1628] mb-4">Key Features</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {project.features.map((feature, index) => (
                                <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100">
                                    <feature.icon className="w-5 h-5 text-[#D4AF37]" />
                                    <span className="text-sm font-medium text-gray-700">{feature.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Description */}
                    <div className="mt-10">
                        <h3 className="text-xl font-bold text-[#0A1628] mb-3">Project Description</h3>
                        <div className="text-gray-600 leading-relaxed">
                            <p className="whitespace-pre-line">
                                {showFullDescription ? project.description : project.description.split('. ').slice(0, 3).join('. ') + '.'}
                            </p>
                            {project.description.split('. ').length > 3 && (
                                <button
                                    onClick={() => setShowFullDescription(!showFullDescription)}
                                    className="text-[#D4AF37] font-semibold hover:text-[#C9A94E] transition-colors mt-2"
                                >
                                    {showFullDescription ? 'Show Less' : 'Read More'}
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Materials */}
                    <div className="mt-10">
                        <h3 className="text-xl font-bold text-[#0A1628] mb-3">Materials Used</h3>
                        <div className="flex flex-wrap gap-2">
                            {project.materials.map((material, index) => (
                                <span key={index} className="px-4 py-2 bg-gray-50 border border-gray-200 text-gray-600 text-sm font-medium rounded-lg">
                                    {material}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Timeline */}
                    <div className="mt-10">
                        <h3 className="text-xl font-bold text-[#0A1628] mb-4">Project Timeline</h3>
                        <div className="space-y-3">
                            {project.timeline.map((phase, index) => (
                                <div key={index} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl border border-gray-100">
                                    <div className="w-3 h-3 bg-[#D4AF37] rounded-full flex-shrink-0" />
                                    <div className="flex-1">
                                        <p className="font-semibold text-[#0A1628]">{phase.phase}</p>
                                        <p className="text-sm text-gray-500">{phase.duration}</p>
                                    </div>
                                    <span className={`px-3 py-1 text-xs font-semibold rounded-full ${getStatusBadge(phase.status)}`}>
                                        {phase.status}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Constructor Info */}
                    <div className="mt-10 p-6 bg-[#FAF8F5] rounded-xl border border-gray-100">
                        <h3 className="text-xl font-bold text-[#0A1628] mb-4">Construction Company</h3>
                        <div className="flex flex-col sm:flex-row sm:items-center gap-6">
                            <div className="flex items-center gap-4">
                                <div className="w-16 h-16 bg-white border border-gray-200 rounded-2xl flex items-center justify-center shadow-sm">
                                    <Building2 className="w-8 h-8 text-[#D4AF37]" />
                                </div>
                                <div>
                                    <Link
                                        to={`/constructors/${project.constructor.slug}`}
                                        className="text-lg font-bold text-[#0A1628] hover:text-[#D4AF37] transition-colors"
                                    >
                                        {project.constructor.name}
                                    </Link>
                                    <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600 mt-1">
                                        <span className="flex items-center gap-1">
                                            <MapPin className="w-4 h-4" /> {project.constructor.location}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <Star className="w-4 h-4 fill-[#D4AF37] text-[#D4AF37]" /> {project.constructor.rating}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <Briefcase className="w-4 h-4" /> {project.constructor.projects} projects
                                        </span>
                                        {project.constructor.verified && (
                                            <span className="flex items-center gap-1 text-emerald-600 font-medium">
                                                <CheckCircle className="w-4 h-4" /> Verified
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <Link
                                to={`/constructors/${project.constructor.slug}`}
                                className="sm:ml-auto px-6 py-3 bg-[#0A1628] text-white font-semibold rounded-xl hover:bg-[#1A2A4A] transition-colors text-sm flex items-center justify-center"
                            >
                                View Profile
                            </Link>
                        </div>
                    </div>

                    {/* Reviews */}
                    <div className="mt-10">
                        <h3 className="text-xl font-bold text-[#0A1628] mb-4">Reviews</h3>
                        <div className="space-y-4">
                            {project.reviews.map((review) => (
                                <div key={review.id} className="p-5 bg-gray-50 rounded-xl border border-gray-100">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-[#D4AF37]/20 rounded-full flex items-center justify-center text-[#D4AF37] font-bold">
                                                {review.avatar}
                                            </div>
                                            <div>
                                                <p className="font-semibold text-[#0A1628]">{review.user}</p>
                                                <div className="flex items-center gap-1">
                                                    {renderStars(review.rating)}
                                                </div>
                                            </div>
                                        </div>
                                        <span className="text-gray-400 text-sm">{review.date}</span>
                                    </div>
                                    <p className="text-gray-600 mt-3">{review.content}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Contact Section */}
                    <div className="mt-10 p-6 bg-gradient-to-r from-[#D4AF37]/10 to-[#C9A94E]/10 rounded-xl border border-[#D4AF37]/20">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                            <div>
                                <h3 className="text-lg font-bold text-[#0A1628]">Interested in this project?</h3>
                                <p className="text-gray-600 text-sm mt-1">Contact the constructor for more information</p>
                            </div>
                            <button
                                onClick={() => setShowContactForm(!showContactForm)}
                                className="px-6 py-3 bg-[#D4AF37] text-[#0A1628] font-bold rounded-xl hover:bg-[#C9A94E] transition-all duration-300 flex items-center justify-center gap-2"
                            >
                                <MessageCircle className="w-5 h-5" />
                                Contact Constructor
                            </button>
                        </div>

                        <AnimatePresence>
                            {showContactForm && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="mt-6 pt-6 border-t border-[#D4AF37]/20 overflow-hidden"
                                >
                                    <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <input type="text" placeholder="Your Name" className="px-4 py-3 bg-white rounded-xl border border-gray-200 focus:outline-none focus:border-[#D4AF37]" />
                                        <input type="email" placeholder="Your Email" className="px-4 py-3 bg-white rounded-xl border border-gray-200 focus:outline-none focus:border-[#D4AF37]" />
                                        <input type="text" placeholder="Phone Number" className="px-4 py-3 bg-white rounded-xl border border-gray-200 focus:outline-none focus:border-[#D4AF37]" />
                                        <select className="px-4 py-3 bg-white rounded-xl border border-gray-200 focus:outline-none focus:border-[#D4AF37]">
                                            <option>I'm interested in this project</option>
                                            <option>I want a similar project</option>
                                            <option>I have a question</option>
                                        </select>
                                        <div className="md:col-span-2">
                                            <textarea rows="3" placeholder="Your Message..." className="w-full px-4 py-3 bg-white rounded-xl border border-gray-200 focus:outline-none focus:border-[#D4AF37]" />
                                        </div>
                                        <button type="submit" className="md:col-span-2 py-3 bg-[#0A1628] text-white font-bold rounded-xl hover:bg-[#1A2A4A] transition-all duration-300 flex items-center justify-center gap-2">
                                            <Send className="w-5 h-5" /> Send Message
                                        </button>
                                    </form>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Similar Projects */}
                    <div className="mt-10">
                        <h3 className="text-xl font-bold text-[#0A1628] mb-4">Similar Projects</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {project.similarProjects.map((similar) => (
                                <Link
                                    key={similar.id}
                                    to={`/projects/${similar.id}`}
                                    className="group bg-white border border-gray-100 rounded-xl p-5 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                                >
                                    <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center mb-4 group-hover:bg-[#D4AF37]/10 transition-colors">
                                        <Home className="w-6 h-6 text-[#D4AF37]" />
                                    </div>
                                    <h4 className="font-bold text-[#0A1628] group-hover:text-[#D4AF37] transition-colors">
                                        {similar.title}
                                    </h4>
                                    <p className="text-gray-500 text-sm flex items-center gap-1 mt-1">
                                        <MapPin className="w-3 h-3" /> {similar.location}
                                    </p>
                                    <p className="text-gray-400 text-xs mt-2 font-medium uppercase tracking-wider">{similar.type}</p>
                                </Link>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default ProjectDetailPage;