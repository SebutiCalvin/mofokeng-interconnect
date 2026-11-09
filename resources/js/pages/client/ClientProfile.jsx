import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
    User,
    Mail,
    Phone,
    MapPin,
    Save,
    Edit,
    X,
    Camera,
    CheckCircle,
    Building2,
    Calendar,
    Shield,
    Award,
    Star,
    Briefcase,
    Heart,
    MessageCircle,
    Settings,
    Globe,
    Link2
} from 'lucide-react';

const ClientProfile = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [saveSuccess, setSaveSuccess] = useState(false);

    const [profile, setProfile] = useState({
        name: 'John Mwangi',
        email: 'john.mwangi@example.com',
        phone: '+266 5888 1234',
        location: 'Maseru, Lesotho',
        company: 'Tech Solutions Ltd',
        bio: 'Construction industry professional with 5+ years of experience in project management and procurement.',
        avatar: null,
        memberSince: '2025-01-15',
        tendersPosted: 12,
        savedCompanies: 8,
        messagesReceived: 34,
        verified: true
    });

    const [formData, setFormData] = useState(profile);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSaving(true);
        await new Promise(resolve => setTimeout(resolve, 1500));
        setProfile(formData);
        setIsSaving(false);
        setIsEditing(false);
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 3000);
    };

    const handleCancel = () => {
        setFormData(profile);
        setIsEditing(false);
    };

    const getInitials = (name) => {
        return name.split(' ').map(word => word[0]).join('').toUpperCase();
    };

    return (
        <div className="min-h-screen bg-[#FAF8F5] py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
                    <div>
                        <h1 className="text-3xl font-['Playfair_Display'] font-bold text-[#0A1628]">
                            My Profile
                        </h1>
                        <p className="text-gray-600 mt-1">Manage your personal information and preferences</p>
                    </div>
                    <div className="flex gap-3">
                        {!isEditing ? (
                            <button
                                onClick={() => setIsEditing(true)}
                                className="px-6 py-2.5 bg-gold text-[#0A1628] font-semibold rounded-xl hover:bg-gold-light transition-all duration-300 flex items-center gap-2"
                            >
                                <Edit className="w-5 h-5" />
                                Edit Profile
                            </button>
                        ) : (
                            <>
                                <button
                                    onClick={handleCancel}
                                    className="px-6 py-2.5 bg-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-300 transition-all duration-300 flex items-center gap-2"
                                >
                                    <X className="w-5 h-5" />
                                    Cancel
                                </button>
                                <button
                                    onClick={handleSubmit}
                                    disabled={isSaving}
                                    className="px-6 py-2.5 bg-gold text-[#0A1628] font-semibold rounded-xl hover:bg-gold-light transition-all duration-300 flex items-center gap-2 disabled:opacity-70"
                                >
                                    {isSaving ? (
                                        <>
                                            <div className="w-5 h-5 border-2 border-[#0A1628] border-t-transparent rounded-full animate-spin" />
                                            Saving...
                                        </>
                                    ) : (
                                        <>
                                            <Save className="w-5 h-5" />
                                            Save Changes
                                        </>
                                    )}
                                </button>
                            </>
                        )}
                    </div>
                </div>

                {/* Save Success */}
                {saveSuccess && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-6 p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-3 text-emerald-700"
                    >
                        <CheckCircle className="w-5 h-5" />
                        Profile updated successfully!
                    </motion.div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Left Column - Profile Image */}
                        <div className="lg:col-span-1 space-y-6">
                            <div className="bg-white rounded-2xl shadow-card p-6 text-center">
                                <div className="relative inline-block">
                                    <div className="w-32 h-32 rounded-2xl bg-gradient-to-br from-gold/20 to-gold-light/20 flex items-center justify-center text-5xl mx-auto overflow-hidden">
                                        {formData.avatar ? (
                                            <img src={formData.avatar} alt="Profile" className="w-full h-full object-cover" />
                                        ) : (
                                            <span className="text-6xl">👤</span>
                                        )}
                                    </div>
                                    {isEditing && (
                                        <button
                                            type="button"
                                            className="absolute bottom-0 right-0 p-2 bg-gold rounded-full shadow-lg hover:bg-gold-light transition-colors"
                                        >
                                            <Camera className="w-4 h-4 text-[#0A1628]" />
                                        </button>
                                    )}
                                </div>
                                <h3 className="text-xl font-bold text-[#0A1628] mt-4">{profile.name}</h3>
                                {profile.verified && (
                                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-emerald-100 text-emerald-700 text-xs font-semibold rounded-full mt-2">
                                        <CheckCircle className="w-3 h-3" /> Verified Account
                                    </span>
                                )}
                                <div className="flex items-center justify-center gap-4 mt-3 text-sm text-gray-500">
                                    <span className="flex items-center gap-1">
                                        <Briefcase className="w-4 h-4" /> {profile.tendersPosted} tenders
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <Heart className="w-4 h-4" /> {profile.savedCompanies} saved
                                    </span>
                                </div>
                            </div>

                            <div className="bg-white rounded-2xl shadow-card p-6">
                                <h4 className="font-semibold text-[#0A1628] mb-4">Account Stats</h4>
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-gray-600">Member Since</span>
                                        <span className="font-semibold text-[#0A1628]">{new Date(profile.memberSince).toLocaleDateString()}</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-gray-600">Tenders Posted</span>
                                        <span className="font-semibold text-[#0A1628]">{profile.tendersPosted}</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-gray-600">Saved Companies</span>
                                        <span className="font-semibold text-[#0A1628]">{profile.savedCompanies}</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-gray-600">Messages</span>
                                        <span className="font-semibold text-[#0A1628]">{profile.messagesReceived}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Column - Profile Details */}
                        <div className="lg:col-span-2 space-y-6">
                            <div className="bg-white rounded-2xl shadow-card p-6">
                                <h2 className="text-lg font-semibold text-[#0A1628] mb-4">Personal Information</h2>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                                        {isEditing ? (
                                            <input
                                                type="text"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-2.5 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:border-gold transition-colors"
                                            />
                                        ) : (
                                            <p className="text-[#0A1628] flex items-center gap-2">
                                                <User className="w-4 h-4 text-gray-400" /> {profile.name}
                                            </p>
                                        )}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                                        {isEditing ? (
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-2.5 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:border-gold transition-colors"
                                            />
                                        ) : (
                                            <p className="text-[#0A1628] flex items-center gap-2">
                                                <Mail className="w-4 h-4 text-gray-400" /> {profile.email}
                                            </p>
                                        )}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                                        {isEditing ? (
                                            <input
                                                type="tel"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-2.5 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:border-gold transition-colors"
                                            />
                                        ) : (
                                            <p className="text-[#0A1628] flex items-center gap-2">
                                                <Phone className="w-4 h-4 text-gray-400" /> {profile.phone}
                                            </p>
                                        )}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                                        {isEditing ? (
                                            <input
                                                type="text"
                                                name="location"
                                                value={formData.location}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-2.5 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:border-gold transition-colors"
                                            />
                                        ) : (
                                            <p className="text-[#0A1628] flex items-center gap-2">
                                                <MapPin className="w-4 h-4 text-gray-400" /> {profile.location}
                                            </p>
                                        )}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Company/Organization</label>
                                        {isEditing ? (
                                            <input
                                                type="text"
                                                name="company"
                                                value={formData.company}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-2.5 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:border-gold transition-colors"
                                            />
                                        ) : (
                                            <p className="text-[#0A1628] flex items-center gap-2">
                                                <Building2 className="w-4 h-4 text-gray-400" /> {profile.company}
                                            </p>
                                        )}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                                        {isEditing ? (
                                            <textarea
                                                name="bio"
                                                value={formData.bio}
                                                onChange={handleInputChange}
                                                rows="3"
                                                className="w-full px-4 py-2.5 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:border-gold transition-colors"
                                            />
                                        ) : (
                                            <p className="text-gray-600 leading-relaxed">{profile.bio}</p>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white rounded-2xl shadow-card p-6">
                                <h2 className="text-lg font-semibold text-[#0A1628] mb-4">Preferences</h2>
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between">
                                        <span className="text-gray-600">Email Notifications</span>
                                        <div className="relative inline-block w-12 h-6 bg-gray-200 rounded-full cursor-pointer">
                                            <div className="absolute left-0 top-0 w-6 h-6 bg-white rounded-full shadow-md transition-transform duration-300 transform translate-x-6 bg-gold"></div>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-gray-600">SMS Notifications</span>
                                        <div className="relative inline-block w-12 h-6 bg-gray-200 rounded-full cursor-pointer">
                                            <div className="absolute left-0 top-0 w-6 h-6 bg-white rounded-full shadow-md"></div>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-gray-600">Newsletter Subscription</span>
                                        <div className="relative inline-block w-12 h-6 bg-gray-200 rounded-full cursor-pointer">
                                            <div className="absolute left-0 top-0 w-6 h-6 bg-white rounded-full shadow-md transition-transform duration-300 transform translate-x-6 bg-gold"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ClientProfile;
