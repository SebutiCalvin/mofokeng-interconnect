import React, { useState, useEffect, useRef } from 'react';
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
    Link2,
    Upload,
    Trash2,
    Plus,
    Users
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import axios from 'axios';
import toast from 'react-hot-toast';

const ConstructorProfile = () => {
    const { user } = useAuth();
    const [isEditing, setIsEditing] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [saveSuccess, setSaveSuccess] = useState(false);
    const fileInputRef = useRef(null);
    const coverInputRef = useRef(null);

    const [profile, setProfile] = useState(null);
    const [formData, setFormData] = useState({
        company_name: '',
        email: '',
        phone: '',
        location: '',
        city: '',
        country: '',
        website: '',
        description: '',
        established_year: '',
        employees: 0,
        specializations: [],
        certifications: [],
        logo: null,
        cover_image: null,
        rating: 0,
        review_count: 0,
        projects_count: 0,
        verified: false,
    });

    const [newSpecialty, setNewSpecialty] = useState('');
    const [newCertification, setNewCertification] = useState('');

    // Fetch profile on load
    useEffect(() => {
        axios.get('/api/constructor/profile')
            .then(res => {
                const data = res.data;
                setProfile(data);
                setFormData({
                    company_name: data.company_name || '',
                    email: data.email || user?.email || '',
                    phone: data.phone || '',
                    location: data.location || '',
                    city: data.city || '',
                    country: data.country || '',
                    website: data.website || '',
                    description: data.description || '',
                    established_year: data.established_year || '',
                    employees: data.employees || 0,
                    specializations: Array.isArray(data.specializations) ? data.specializations : [],
                    certifications: Array.isArray(data.certifications) ? data.certifications : [],
                    logo: data.logo ? `/storage/${data.logo}` : null,
                    cover_image: data.cover_image ? `/storage/${data.cover_image}` : null,
                    rating: data.rating || 0,
                    review_count: data.review_count || 0,
                    projects_count: data.projects_count || 0,
                    verified: data.is_verified || false,
                });
                setIsLoading(false);
            })
            .catch(err => {
                console.error(err);
                toast.error('Failed to load profile');
                setIsLoading(false);
            });
    }, [user]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const addSpecialty = () => {
        if (newSpecialty.trim() && !formData.specializations.includes(newSpecialty.trim())) {
            setFormData(prev => ({
                ...prev,
                specializations: [...prev.specializations, newSpecialty.trim()]
            }));
            setNewSpecialty('');
        }
    };

    const removeSpecialty = (specialty) => {
        setFormData(prev => ({
            ...prev,
            specializations: prev.specializations.filter(s => s !== specialty)
        }));
    };

    const addCertification = () => {
        if (newCertification.trim() && !formData.certifications.includes(newCertification.trim())) {
            setFormData(prev => ({
                ...prev,
                certifications: [...prev.certifications, newCertification.trim()]
            }));
            setNewCertification('');
        }
    };

    const removeCertification = (cert) => {
        setFormData(prev => ({
            ...prev,
            certifications: prev.certifications.filter(c => c !== cert)
        }));
    };

    const handleImageUpload = async (type, e) => {
        const file = e.target.files[0];
        if (!file) return;

        const endpoint = type === 'logo' 
            ? '/api/constructor/profile/logo' 
            : '/api/constructor/profile/cover';

        const fd = new FormData();
        fd.append(type === 'logo' ? 'logo' : 'cover_image', file);

        try {
            const res = await axios.post(endpoint, fd, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            const path = res.data[type === 'logo' ? 'logo' : 'cover_image'];
            setFormData(prev => ({
                ...prev,
                [type]: `/storage/${path}`
            }));
            toast.success(`${type === 'logo' ? 'Logo' : 'Cover image'} updated`);
        } catch (error) {
            console.error(error);
            toast.error('Failed to upload image');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSaving(true);
        setSaveSuccess(false);

        // Prepare data for API (convert arrays to comma-separated strings if needed, but our API accepts arrays)
        const payload = {
            company_name: formData.company_name,
            description: formData.description,
            location: formData.location,
            city: formData.city,
            country: formData.country,
            phone: formData.phone,
            established_year: formData.established_year,
            website: formData.website,
            specializations: formData.specializations,
            certifications: formData.certifications,
        };

        try {
            await axios.put('/api/constructor/profile', payload);
            setProfile(formData);
            setIsEditing(false);
            setSaveSuccess(true);
            toast.success('Profile updated successfully!');
            setTimeout(() => setSaveSuccess(false), 3000);
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || 'Failed to update profile');
        } finally {
            setIsSaving(false);
        }
    };

    const handleCancel = () => {
        // Reset form data to current profile
        setFormData({
            company_name: profile.company_name || '',
            email: profile.email || user?.email || '',
            phone: profile.phone || '',
            location: profile.location || '',
            city: profile.city || '',
            country: profile.country || '',
            website: profile.website || '',
            description: profile.description || '',
            established_year: profile.established_year || '',
            employees: profile.employees || 0,
            specializations: Array.isArray(profile.specializations) ? profile.specializations : [],
            certifications: Array.isArray(profile.certifications) ? profile.certifications : [],
            logo: profile.logo ? `/storage/${profile.logo}` : null,
            cover_image: profile.cover_image ? `/storage/${profile.cover_image}` : null,
            rating: profile.rating || 0,
            review_count: profile.review_count || 0,
            projects_count: profile.projects_count || 0,
            verified: profile.is_verified || false,
        });
        setIsEditing(false);
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-[#0A1628] flex items-center justify-center">
                <div className="text-white">Loading profile...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#0A1628] py-6 md:py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6 md:mb-8">
                    <div>
                        <h1 className="text-2xl md:text-3xl font-['Playfair_Display'] font-bold text-white">
                            Company Profile
                        </h1>
                        <p className="text-gray-400 text-sm mt-1">Manage your company information and public profile</p>
                    </div>
                    <div className="flex gap-3">
                        {!isEditing ? (
                            <button
                                onClick={() => setIsEditing(true)}
                                className="px-4 py-2 bg-gold text-[#0A1628] font-semibold rounded-xl hover:bg-gold-light transition-all duration-300 flex items-center gap-2 text-sm"
                            >
                                <Edit className="w-4 h-4" />
                                Edit Profile
                            </button>
                        ) : (
                            <>
                                <button
                                    onClick={handleCancel}
                                    className="px-4 py-2 bg-[#1A2A4A] text-gray-300 font-semibold rounded-xl hover:bg-[#2A3A5A] transition-all duration-300 flex items-center gap-2 text-sm"
                                >
                                    <X className="w-4 h-4" />
                                    Cancel
                                </button>
                                <button
                                    onClick={handleSubmit}
                                    disabled={isSaving}
                                    className="px-4 py-2 bg-gold text-[#0A1628] font-semibold rounded-xl hover:bg-gold-light transition-all duration-300 flex items-center gap-2 text-sm disabled:opacity-70"
                                >
                                    {isSaving ? (
                                        <>
                                            <div className="w-4 h-4 border-2 border-[#0A1628] border-t-transparent rounded-full animate-spin" />
                                            Saving...
                                        </>
                                    ) : (
                                        <>
                                            <Save className="w-4 h-4" />
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
                        className="mb-6 p-4 bg-emerald-500/20 border border-emerald-500/30 rounded-xl flex items-center gap-3 text-emerald-400"
                    >
                        <CheckCircle className="w-5 h-5" />
                        Profile updated successfully!
                    </motion.div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Left Column */}
                        <div className="lg:col-span-1 space-y-6">
                            {/* Profile Image */}
                            <div className="bg-[#111C2E] border border-white/5 rounded-2xl p-6 text-center">
                                <div className="relative inline-block">
                                    <div className="w-32 h-32 rounded-2xl bg-gradient-to-br from-gold/20 to-gold-light/20 flex items-center justify-center text-5xl mx-auto overflow-hidden">
                                        {formData.logo ? (
                                            <img src={formData.logo} alt="Company Logo" className="w-full h-full object-cover" />
                                        ) : (
                                            <span className="text-6xl">🏗️</span>
                                        )}
                                    </div>
                                    {isEditing && (
                                        <button
                                            type="button"
                                            onClick={() => fileInputRef.current?.click()}
                                            className="absolute bottom-0 right-0 p-2 bg-gold rounded-full shadow-lg hover:bg-gold-light transition-colors"
                                        >
                                            <Camera className="w-4 h-4 text-[#0A1628]" />
                                        </button>
                                    )}
                                    <input
                                        type="file"
                                        ref={fileInputRef}
                                        onChange={(e) => handleImageUpload('logo', e)}
                                        accept="image/*"
                                        className="hidden"
                                    />
                                </div>
                                <h3 className="text-xl font-bold text-white mt-4">{formData.company_name || 'Company Name'}</h3>
                                {formData.verified && (
                                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-emerald-500/20 text-emerald-400 text-xs font-semibold rounded-full mt-2">
                                        <CheckCircle className="w-3 h-3" /> Verified Company
                                    </span>
                                )}
                                <div className="flex items-center justify-center gap-4 mt-3 text-sm text-gray-400">
                                    <span className="flex items-center gap-1">
                                        <Star className="w-4 h-4 text-gold fill-gold" /> {formData.rating}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <Briefcase className="w-4 h-4" /> {formData.projects_count} projects
                                    </span>
                                </div>
                            </div>

                            {/* Quick Stats */}
                            <div className="bg-[#111C2E] border border-white/5 rounded-2xl p-6">
                                <h4 className="font-semibold text-white mb-4">Quick Stats</h4>
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-gray-400">Projects Completed</span>
                                        <span className="font-semibold text-white">{formData.projects_count}</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-gray-400">Total Reviews</span>
                                        <span className="font-semibold text-white">{formData.review_count}</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-gray-400">Established</span>
                                        <span className="font-semibold text-white">{formData.established_year || 'N/A'}</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-gray-400">Employees</span>
                                        <span className="font-semibold text-white">{formData.employees || 0}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Column */}
                        <div className="lg:col-span-2 space-y-6">
                            {/* Basic Information */}
                            <div className="bg-[#111C2E] border border-white/5 rounded-2xl p-6">
                                <h2 className="text-lg font-semibold text-white mb-4">Basic Information</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-1">Company Name</label>
                                        {isEditing ? (
                                            <input
                                                type="text"
                                                name="company_name"
                                                value={formData.company_name}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-2.5 bg-[#1A2A4A] border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-gold/50 transition-colors"
                                            />
                                        ) : (
                                            <p className="text-white">{formData.company_name}</p>
                                        )}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-1">Email</label>
                                        {isEditing ? (
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-2.5 bg-[#1A2A4A] border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-gold/50 transition-colors"
                                            />
                                        ) : (
                                            <p className="text-white flex items-center gap-2">
                                                <Mail className="w-4 h-4 text-gray-400" /> {formData.email}
                                            </p>
                                        )}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-1">Phone</label>
                                        {isEditing ? (
                                            <input
                                                type="tel"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-2.5 bg-[#1A2A4A] border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-gold/50 transition-colors"
                                            />
                                        ) : (
                                            <p className="text-white flex items-center gap-2">
                                                <Phone className="w-4 h-4 text-gray-400" /> {formData.phone}
                                            </p>
                                        )}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-1">Location</label>
                                        {isEditing ? (
                                            <input
                                                type="text"
                                                name="location"
                                                value={formData.location}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-2.5 bg-[#1A2A4A] border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-gold/50 transition-colors"
                                            />
                                        ) : (
                                            <p className="text-white flex items-center gap-2">
                                                <MapPin className="w-4 h-4 text-gray-400" /> {formData.location}
                                            </p>
                                        )}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-1">Website</label>
                                        {isEditing ? (
                                            <input
                                                type="url"
                                                name="website"
                                                value={formData.website}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-2.5 bg-[#1A2A4A] border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-gold/50 transition-colors"
                                            />
                                        ) : (
                                            <a href={formData.website} target="_blank" rel="noopener noreferrer" className="text-gold hover:text-gold-light transition-colors flex items-center gap-2">
                                                <Globe className="w-4 h-4" /> {formData.website?.replace('https://', '') || 'Not set'}
                                            </a>
                                        )}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-1">Established Year</label>
                                        {isEditing ? (
                                            <input
                                                type="number"
                                                name="established_year"
                                                value={formData.established_year}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-2.5 bg-[#1A2A4A] border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-gold/50 transition-colors"
                                            />
                                        ) : (
                                            <p className="text-white flex items-center gap-2">
                                                <Calendar className="w-4 h-4 text-gray-400" /> {formData.established_year || 'N/A'}
                                            </p>
                                        )}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-1">Employees</label>
                                        {isEditing ? (
                                            <input
                                                type="number"
                                                name="employees"
                                                value={formData.employees}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-2.5 bg-[#1A2A4A] border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-gold/50 transition-colors"
                                            />
                                        ) : (
                                            <p className="text-white flex items-center gap-2">
                                                <Users className="w-4 h-4 text-gray-400" /> {formData.employees || 0} employees
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Description */}
                            <div className="bg-[#111C2E] border border-white/5 rounded-2xl p-6">
                                <h2 className="text-lg font-semibold text-white mb-4">Description</h2>
                                {isEditing ? (
                                    <textarea
                                        name="description"
                                        value={formData.description}
                                        onChange={handleInputChange}
                                        rows="4"
                                        className="w-full px-4 py-2.5 bg-[#1A2A4A] border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-gold/50 transition-colors"
                                    />
                                ) : (
                                    <p className="text-gray-300 leading-relaxed">{formData.description || 'No description provided'}</p>
                                )}
                            </div>

                            {/* Specializations */}
                            <div className="bg-[#111C2E] border border-white/5 rounded-2xl p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <h2 className="text-lg font-semibold text-white">Specializations</h2>
                                    {isEditing && (
                                        <div className="flex gap-2">
                                            <input
                                                type="text"
                                                value={newSpecialty}
                                                onChange={(e) => setNewSpecialty(e.target.value)}
                                                placeholder="Add specialty..."
                                                className="px-3 py-1.5 bg-[#1A2A4A] border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-gold/50 transition-colors text-sm"
                                            />
                                            <button
                                                type="button"
                                                onClick={addSpecialty}
                                                className="px-3 py-1.5 bg-gold text-[#0A1628] rounded-lg hover:bg-gold-light transition-colors"
                                            >
                                                <Plus className="w-4 h-4" />
                                            </button>
                                        </div>
                                    )}
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {formData.specializations.length > 0 ? (
                                        formData.specializations.map((specialty, index) => (
                                            <span key={index} className="px-3 py-1 bg-gold/10 text-gold text-sm rounded-full flex items-center gap-1">
                                                {specialty}
                                                {isEditing && (
                                                    <button
                                                        type="button"
                                                        onClick={() => removeSpecialty(specialty)}
                                                        className="hover:text-red-500 transition-colors"
                                                    >
                                                        <X className="w-3 h-3" />
                                                    </button>
                                                )}
                                            </span>
                                        ))
                                    ) : (
                                        <span className="text-gray-400 text-sm">No specializations added</span>
                                    )}
                                </div>
                            </div>

                            {/* Certifications */}
                            <div className="bg-[#111C2E] border border-white/5 rounded-2xl p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <h2 className="text-lg font-semibold text-white">Certifications</h2>
                                    {isEditing && (
                                        <div className="flex gap-2">
                                            <input
                                                type="text"
                                                value={newCertification}
                                                onChange={(e) => setNewCertification(e.target.value)}
                                                placeholder="Add certification..."
                                                className="px-3 py-1.5 bg-[#1A2A4A] border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-gold/50 transition-colors text-sm"
                                            />
                                            <button
                                                type="button"
                                                onClick={addCertification}
                                                className="px-3 py-1.5 bg-gold text-[#0A1628] rounded-lg hover:bg-gold-light transition-colors"
                                            >
                                                <Plus className="w-4 h-4" />
                                            </button>
                                        </div>
                                    )}
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {formData.certifications.length > 0 ? (
                                        formData.certifications.map((cert, index) => (
                                            <span key={index} className="px-3 py-1 bg-emerald-500/20 text-emerald-400 text-sm rounded-full flex items-center gap-1">
                                                <Award className="w-3 h-3" />
                                                {cert}
                                                {isEditing && (
                                                    <button
                                                        type="button"
                                                        onClick={() => removeCertification(cert)}
                                                        className="hover:text-red-500 transition-colors"
                                                    >
                                                        <X className="w-3 h-3" />
                                                    </button>
                                                )}
                                            </span>
                                        ))
                                    ) : (
                                        <span className="text-gray-400 text-sm">No certifications added</span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ConstructorProfile;
