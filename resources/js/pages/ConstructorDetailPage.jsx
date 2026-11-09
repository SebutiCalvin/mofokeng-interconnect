import {
    MapPin,
    Star,
    Briefcase,
    Calendar,
    Users,
    Award,
    Phone,
    Mail,
    Globe,
    MessageCircle,
    Share2,
    Heart,
    ArrowLeft,
    CheckCircle,
    Building2,
    Clock,
    Send,
    ExternalLink
} from 'lucide-react';

const ConstructorDetailPage = () => {
    const { slug } = useParams();
    const [activeTab, setActiveTab] = useState('overview');
    const [isFavorite, setIsFavorite] = useState(false);

    const company = {
        id: 1,
        name: 'Mwangi Construction Ltd',
        slug: 'mwangi-construction',
        location: 'Nairobi, Kenya',
        rating: 4.8,
        reviewCount: 156,
        projects: 150,
        verified: true,
        established: 2010,
        employees: 120,
        description: 'Mwangi Construction Ltd is a premier construction company specializing in residential, commercial, and renovation projects across East Africa.',
        mission: 'To build sustainable, innovative, and high-quality structures.',
        vision: 'To be the most trusted construction partner in Africa.',
        image: '🏗️',
        specialties: ['Residential', 'Commercial', 'Renovation'],
        certifications: ['ISO 9001:2015', 'CIDB Grade 6'],
        social: {
            website: 'https://mwangi-construction.com',
        },
        contact: {
            phone: '+254 700 123 456',
            email: 'info@mwangi-construction.com',
            address: '123 Moi Avenue, Nairobi, Kenya',
        },
        projectList: [
            {
                id: 1,
                title: 'Modern Villa Project',
                category: 'Residential',
                budget: 'M 15M',
                completion: '2025',
                image: '🏠',
                description: 'A luxurious modern villa with smart home features.',
            },
            {
                id: 2,
                title: 'Commercial Complex',
                category: 'Commercial',
                budget: 'M 45M',
                completion: '2024',
                image: '🏢',
                description: 'A state-of-the-art commercial complex.',
            },
        ],
        reviews: [
            {
                id: 1,
                user: 'John Mwangi',
                rating: 5,
                date: '2026-07-20',
                content: 'Excellent work on our home renovation.',
                avatar: 'JM',
            },
            {
                id: 2,
                user: 'Sarah Kamau',
                rating: 4,
                date: '2026-07-15',
                content: 'Great team to work with.',
                avatar: 'SK',
            },
        ],
    };

    const renderStars = (rating) => {
        return Array.from({ length: 5 }, (_, i) => (
            <Star key={i} className={`w-4 h-4 ${i < Math.floor(rating) ? 'fill-gold text-gold' : 'text-gray-300'}`} />
        ));
    };

    return (
        <div className="min-h-screen bg-[#0A1628] py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <Link to="/constructors" className="inline-flex items-center gap-2 px-4 py-2 bg-[#111C2E] text-white rounded-xl hover:bg-[#1A2A4A] transition-colors mb-6">
                    <ArrowLeft className="w-4 h-4" /> Back
                </Link>

                <div className="bg-[#111C2E] border border-white/5 rounded-2xl p-6">
                    <div className="flex items-start gap-6">
                        <div className="text-6xl">{company.image}</div>
                        <div>
                            <h1 className="text-3xl font-['Playfair_Display'] font-bold text-white">{company.name}</h1>
                            <div className="flex items-center gap-3 mt-2">
                                <span className="flex items-center gap-1 text-gray-400">
                                    <MapPin className="w-4 h-4" /> {company.location}
                                </span>
                                {company.verified && (
                                    <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 text-xs rounded-full flex items-center gap-1">
                                        <CheckCircle className="w-3 h-3" /> Verified
                                    </span>
                                )}
                            </div>
                            <div className="flex items-center gap-4 mt-3">
                                <span className="flex items-center gap-1 text-gold">
                                    {renderStars(company.rating)} {company.rating}
                                </span>
                                <span className="text-gray-400">({company.reviewCount} reviews)</span>
                            </div>
                        </div>
                        <button
                            onClick={() => setIsFavorite(!isFavorite)}
                            className="ml-auto px-4 py-2 bg-[#1A2A4A] rounded-xl hover:bg-[#2A3A5A] transition-colors flex items-center gap-2"
                        >
                            <Heart className={`w-4 h-4 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} />
                            <span className="text-white">{isFavorite ? 'Saved' : 'Save'}</span>
                        </button>
                    </div>

                    <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="bg-[#1A2A4A] rounded-xl p-4 text-center">
                            <div className="text-2xl font-bold text-gold">{company.projects}</div>
                            <div className="text-sm text-gray-400">Projects</div>
                        </div>
                        <div className="bg-[#1A2A4A] rounded-xl p-4 text-center">
                            <div className="text-2xl font-bold text-gold">{company.employees}</div>
                            <div className="text-sm text-gray-400">Employees</div>
                        </div>
                        <div className="bg-[#1A2A4A] rounded-xl p-4 text-center">
                            <div className="text-2xl font-bold text-gold">{company.established}</div>
                            <div className="text-sm text-gray-400">Established</div>
                        </div>
                        <div className="bg-[#1A2A4A] rounded-xl p-4 text-center">
                            <div className="text-2xl font-bold text-gold">★ {company.rating}</div>
                            <div className="text-sm text-gray-400">Rating</div>
                        </div>
                    </div>

                    <div className="mt-6">
                        <h3 className="text-lg font-semibold text-white mb-2">About</h3>
                        <p className="text-gray-400 leading-relaxed">{company.description}</p>
                    </div>

                    <div className="mt-6">
                        <h3 className="text-lg font-semibold text-white mb-2">Specialties</h3>
                        <div className="flex flex-wrap gap-2">
                            {company.specialties.map((spec, i) => (
                                <span key={i} className="px-3 py-1 bg-gold/10 text-gold text-sm rounded-full">
                                    {spec}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="mt-6">
                        <h3 className="text-lg font-semibold text-white mb-2">Projects</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {company.projectList.map((project) => (
                                <div key={project.id} className="bg-[#1A2A4A] rounded-xl p-4">
                                    <div className="text-3xl">{project.image}</div>
                                    <h4 className="text-white font-semibold mt-2">{project.title}</h4>
                                    <p className="text-gray-400 text-sm">{project.category}</p>
                                    <div className="flex items-center justify-between mt-2">
                                        <span className="text-gold font-semibold">{project.budget}</span>
                                        <span className="text-gray-400 text-sm">{project.completion}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="mt-6">
                        <h3 className="text-lg font-semibold text-white mb-2">Contact</h3>
                        <div className="space-y-2 text-gray-400">
                            <p className="flex items-center gap-2"><Phone className="w-4 h-4" /> {company.contact.phone}</p>
                            <p className="flex items-center gap-2"><Mail className="w-4 h-4" /> {company.contact.email}</p>
                            <p className="flex items-center gap-2"><MapPin className="w-4 h-4" /> {company.contact.address}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConstructorDetailPage;
