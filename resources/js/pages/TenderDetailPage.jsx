import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    ArrowLeft,
    MapPin,
    DollarSign,
    Calendar,
    Clock,
    Building2,
    FileText,
    Download,
    CheckCircle,
    AlertCircle,
    Users,
    Briefcase,
    Mail,
    Phone,
    Send,
    Eye,
    Award,
    Shield,
    Star,
    ChevronRight
} from 'lucide-react';

const TenderDetailPage = () => {
    const { id } = useParams();
    const [showApplicationForm, setShowApplicationForm] = useState(false);
    const [applicationSubmitted, setApplicationSubmitted] = useState(false);

    // Mock tender data - In real app, fetch from API
    const tender = {
        id: 1,
        title: 'School Construction - Modern Learning Facility',
        location: 'Maseru, Lesotho',
        budget: 'M 50M',
        deadline: '2026-08-15',
        category: 'Education',
        status: 'Open',
        postedDate: '2026-07-01',
        description: `The Ministry of Education invites qualified construction companies to submit tenders for the construction of a modern 3-story school building in Maseru, Lesotho.

        The project includes:
        • 20 modern classrooms
        • A fully equipped library
        • Sports facilities (football pitch, basketball court)
        • Administrative offices
        • Parking area
        • Landscaped grounds

        The project is expected to be completed within 18 months from the start date.`,
        requirements: [
            'CIDB Grade 6 or higher',
            'Minimum 5 years experience in educational construction',
            'Registered and verified on Mofokeng Interconnect platform',
            'Valid tax compliance certificate',
            'Proof of previous similar projects',
            'Financial capability to handle projects of this scale',
        ],
        documents: [
            { name: 'Tender Document', size: '2.4 MB' },
            { name: 'Site Plan', size: '1.8 MB' },
            { name: 'Building Specifications', size: '3.2 MB' },
            { name: 'Environmental Impact Assessment', size: '1.5 MB' },
        ],
        client: {
            name: 'Ministry of Education',
            email: 'procurement@education.gov.ls',
            phone: '+266 2222 1111',
            location: 'Maseru, Lesotho',
        },
        applications: 12,
        views: 245,
    };

    const daysUntilDeadline = () => {
        const diff = new Date(tender.deadline) - new Date();
        return Math.ceil(diff / (1000 * 60 * 60 * 24));
    };

    const handleApplicationSubmit = (e) => {
        e.preventDefault();
        setApplicationSubmitted(true);
        setTimeout(() => {
            setApplicationSubmitted(false);
            setShowApplicationForm(false);
        }, 3000);
    };

    const getStatusBadge = (status) => {
        const styles = {
            'Open': 'bg-emerald-100 text-emerald-700',
            'Closing Soon': 'bg-yellow-100 text-yellow-700',
            'Closed': 'bg-red-100 text-red-700',
        };
        return styles[status] || 'bg-gray-100 text-gray-700';
    };

    return (
        <div className="min-h-screen bg-[#FAF8F5] py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Back Button */}
                <Link
                    to="/tenders"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-xl shadow-sm hover:shadow-card transition-all duration-300 text-[#0A1628] mb-6"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Tenders
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Main Content */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-2xl shadow-card p-6 md:p-8">
                            {/* Header */}
                            <div className="flex flex-wrap items-start justify-between gap-4">
                                <div>
                                    <h1 className="text-2xl md:text-3xl font-['Playfair_Display'] font-bold text-[#0A1628]">
                                        {tender.title}
                                    </h1>
                                    <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-gray-600">
                                        <span className="flex items-center gap-1">
                                            <MapPin className="w-4 h-4" /> {tender.location}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <Building2 className="w-4 h-4" /> {tender.category}
                                        </span>
                                        <span className={`px-3 py-1 text-xs font-semibold rounded-full ${getStatusBadge(tender.status)}`}>
                                            {tender.status}
                                        </span>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="text-2xl font-bold text-gold">{tender.budget}</div>
                                    <div className="text-xs text-gray-500">Budget</div>
                                </div>
                            </div>

                            {/* Quick Stats */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 p-4 bg-gray-50 rounded-xl">
                                <div className="text-center">
                                    <div className="text-sm font-semibold text-[#0A1628]">Posted</div>
                                    <div className="text-sm text-gray-600">{tender.postedDate}</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-sm font-semibold text-[#0A1628]">Deadline</div>
                                    <div className="text-sm text-gray-600">{tender.deadline}</div>
                                    <div className="text-xs text-orange-500">{daysUntilDeadline()} days left</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-sm font-semibold text-[#0A1628]">Applications</div>
                                    <div className="text-sm text-gray-600">{tender.applications}</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-sm font-semibold text-[#0A1628]">Views</div>
                                    <div className="text-sm text-gray-600">{tender.views}</div>
                                </div>
                            </div>

                            {/* Description */}
                            <div className="mt-6">
                                <h3 className="text-lg font-semibold text-[#0A1628] mb-3">About the Tender</h3>
                                <div className="text-gray-600 leading-relaxed whitespace-pre-line">
                                    {tender.description}
                                </div>
                            </div>

                            {/* Requirements */}
                            <div className="mt-6">
                                <h3 className="text-lg font-semibold text-[#0A1628] mb-3">Requirements</h3>
                                <ul className="space-y-2">
                                    {tender.requirements.map((req, index) => (
                                        <li key={index} className="flex items-start gap-3 text-gray-600 text-sm">
                                            <CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                                            <span>{req}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Documents */}
                            <div className="mt-6">
                                <h3 className="text-lg font-semibold text-[#0A1628] mb-3">Tender Documents</h3>
                                <div className="space-y-2">
                                    {tender.documents.map((doc, index) => (
                                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                                            <div className="flex items-center gap-3">
                                                <FileText className="w-5 h-5 text-gold" />
                                                <div>
                                                    <p className="text-sm font-medium text-[#0A1628]">{doc.name}</p>
                                                    <p className="text-xs text-gray-400">{doc.size}</p>
                                                </div>
                                            </div>
                                            <button className="flex items-center gap-1 px-3 py-1.5 text-sm text-gold hover:text-gold-light transition-colors">
                                                <Download className="w-4 h-4" />
                                                Download
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-2xl shadow-card p-6">
                            <h3 className="text-lg font-semibold text-[#0A1628] mb-4">Quick Actions</h3>
                            
                            <button
                                onClick={() => setShowApplicationForm(!showApplicationForm)}
                                className="w-full py-3 bg-gold text-[#0A1628] font-semibold rounded-xl hover:bg-gold-light transition-all duration-300 flex items-center justify-center gap-2"
                            >
                                <Send className="w-5 h-5" />
                                Apply Now
                            </button>

                            {/* Application Form */}
                            {showApplicationForm && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="mt-4 pt-4 border-t border-gray-100"
                                >
                                    {applicationSubmitted ? (
                                        <div className="text-center py-4">
                                            <CheckCircle className="w-12 h-12 text-emerald-500 mx-auto" />
                                            <p className="font-semibold text-emerald-700 mt-2">Application Submitted!</p>
                                            <p className="text-sm text-gray-500">We'll review your application</p>
                                        </div>
                                    ) : (
                                        <form onSubmit={handleApplicationSubmit} className="space-y-3">
                                            <input
                                                type="text"
                                                placeholder="Company Name"
                                                className="w-full px-4 py-2.5 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:border-gold transition-colors"
                                                required
                                            />
                                            <input
                                                type="email"
                                                placeholder="Contact Email"
                                                className="w-full px-4 py-2.5 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:border-gold transition-colors"
                                                required
                                            />
                                            <input
                                                type="text"
                                                placeholder="Phone Number"
                                                className="w-full px-4 py-2.5 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:border-gold transition-colors"
                                                required
                                            />
                                            <select className="w-full px-4 py-2.5 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:border-gold transition-colors">
                                                <option>Select your CIDB Grade</option>
                                                <option>Grade 6</option>
                                                <option>Grade 7</option>
                                                <option>Grade 8</option>
                                                <option>Grade 9</option>
                                            </select>
                                            <textarea
                                                rows="3"
                                                placeholder="Cover letter / Experience"
                                                className="w-full px-4 py-2.5 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:border-gold transition-colors"
                                            />
                                            <button
                                                type="submit"
                                                className="w-full py-2.5 bg-[#0A1628] text-white font-semibold rounded-xl hover:bg-[#1A2A4A] transition-colors"
                                            >
                                                Submit Application
                                            </button>
                                        </form>
                                    )}
                                </motion.div>
                            )}

                            <div className="mt-6 pt-6 border-t border-gray-100 space-y-4">
                                <div>
                                    <h4 className="text-sm font-semibold text-[#0A1628]">Contact Client</h4>
                                    <div className="mt-2 space-y-2 text-sm text-gray-600">
                                        <div className="flex items-center gap-2">
                                            <Building2 className="w-4 h-4 text-gold" />
                                            {tender.client.name}
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Mail className="w-4 h-4 text-gold" />
                                            {tender.client.email}
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Phone className="w-4 h-4 text-gold" />
                                            {tender.client.phone}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2 text-sm text-gray-500">
                                    <Shield className="w-4 h-4" />
                                    <span>Verified by Mofokeng</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TenderDetailPage;
