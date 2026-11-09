import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
    Upload,
    X,
    Plus,
    Trash2,
    Image,
    MapPin,
    DollarSign,
    Calendar,
    Ruler,
    Briefcase,
    Tag,
    FileText,
    CheckCircle,
    AlertCircle,
    ArrowLeft,
    Save,
    Eye,
    Clock,
    Building2,
    Users,
    Link2,
    Send
} from 'lucide-react';

const ProjectUpload = () => {
    const navigate = useNavigate();
    const [currentStep, setCurrentStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const fileInputRef = useRef(null);
    const [uploadedImages, setUploadedImages] = useState([]);

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        location: '',
        city: '',
        country: 'Lesotho',
        projectType: '',
        budget: '',
        size: '',
        duration: '',
        completionDate: '',
        features: [],
        materials: [],
        isFeatured: false,
        status: 'draft',
    });

    const [newFeature, setNewFeature] = useState('');
    const [newMaterial, setNewMaterial] = useState('');

    const projectTypes = ['Residential', 'Commercial', 'Industrial', 'Infrastructure', 'Renovation'];
    const countries = ['Lesotho', 'South Africa', 'Kenya', 'Rwanda', 'Nigeria', 'Egypt', 'Tanzania', 'Ghana'];

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files);
        files.forEach(file => {
            const reader = new FileReader();
            reader.onloadend = () => {
                setUploadedImages(prev => [...prev, {
                    id: Date.now() + Math.random(),
                    file: file,
                    preview: reader.result,
                    caption: ''
                }]);
            };
            reader.readAsDataURL(file);
        });
        e.target.value = '';
    };

    const removeImage = (id) => {
        setUploadedImages(prev => prev.filter(img => img.id !== id));
    };

    const updateImageCaption = (id, caption) => {
        setUploadedImages(prev => prev.map(img =>
            img.id === id ? { ...img, caption } : img
        ));
    };

    const addFeature = () => {
        if (newFeature.trim()) {
            setFormData(prev => ({
                ...prev,
                features: [...prev.features, newFeature.trim()]
            }));
            setNewFeature('');
        }
    };

    const removeFeature = (feature) => {
        setFormData(prev => ({
            ...prev,
            features: prev.features.filter(f => f !== feature)
        }));
    };

    const addMaterial = () => {
        if (newMaterial.trim()) {
            setFormData(prev => ({
                ...prev,
                materials: [...prev.materials, newMaterial.trim()]
            }));
            setNewMaterial('');
        }
    };

    const removeMaterial = (material) => {
        setFormData(prev => ({
            ...prev,
            materials: prev.materials.filter(m => m !== material)
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        setIsSubmitting(false);
        setSubmitSuccess(true);
        
        setTimeout(() => {
            navigate('/constructor/projects');
        }, 2000);
    };

    const steps = [
        { number: 1, label: 'Basic Info' },
        { number: 2, label: 'Images' },
        { number: 3, label: 'Details' },
    ];

    const renderStepContent = () => {
        switch(currentStep) {
            case 1:
                return (
                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Project Title *
                            </label>
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleInputChange}
                                placeholder="e.g. Modern Eco Villa"
                                className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:border-gold transition-colors"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Description *
                            </label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleInputChange}
                                rows="5"
                                placeholder="Describe your project in detail..."
                                className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:border-gold transition-colors"
                                required
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Location *
                                </label>
                                <input
                                    type="text"
                                    name="location"
                                    value={formData.location}
                                    onChange={handleInputChange}
                                    placeholder="e.g. Nairobi, Kenya"
                                    className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:border-gold transition-colors"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    City
                                </label>
                                <input
                                    type="text"
                                    name="city"
                                    value={formData.city}
                                    onChange={handleInputChange}
                                    placeholder="e.g. Nairobi"
                                    className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:border-gold transition-colors"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Country
                                </label>
                                <select
                                    name="country"
                                    value={formData.country}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:border-gold transition-colors"
                                >
                                    {countries.map(country => (
                                        <option key={country} value={country}>{country}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Project Type *
                                </label>
                                <select
                                    name="projectType"
                                    value={formData.projectType}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:border-gold transition-colors"
                                    required
                                >
                                    <option value="">Select type</option>
                                    {projectTypes.map(type => (
                                        <option key={type} value={type}>{type}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                );

            case 2:
                return (
                    <div className="space-y-6">
                        <div className="border-2 border-dashed border-gray-300 rounded-2xl p-8 text-center hover:border-gold transition-colors">
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleImageUpload}
                                accept="image/*"
                                multiple
                                className="hidden"
                            />
                            <button
                                type="button"
                                onClick={() => fileInputRef.current?.click()}
                                className="flex flex-col items-center gap-3 w-full"
                            >
                                <div className="w-20 h-20 bg-gold/10 rounded-full flex items-center justify-center">
                                    <Upload className="w-10 h-10 text-gold" />
                                </div>
                                <div>
                                    <p className="font-semibold text-[#0A1628]">Upload Images</p>
                                    <p className="text-sm text-gray-500">Click to browse or drag and drop</p>
                                    <p className="text-xs text-gray-400 mt-1">PNG, JPG, WEBP up to 10MB each</p>
                                </div>
                            </button>
                        </div>

                        {uploadedImages.length > 0 && (
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                {uploadedImages.map((image) => (
                                    <div key={image.id} className="relative group bg-gray-100 rounded-xl overflow-hidden">
                                        <img src={image.preview} alt={image.caption || 'Project image'} className="w-full h-48 object-cover" />
                                        <button
                                            type="button"
                                            onClick={() => removeImage(image.id)}
                                            className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                        <input
                                            type="text"
                                            placeholder="Caption"
                                            value={image.caption}
                                            onChange={(e) => updateImageCaption(image.id, e.target.value)}
                                            className="absolute bottom-2 left-2 right-2 px-2 py-1 bg-black/50 text-white text-sm rounded-lg border-0 focus:ring-2 focus:ring-gold"
                                        />
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                );

            case 3:
                return (
                    <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Budget
                                </label>
                                <input
                                    type="text"
                                    name="budget"
                                    value={formData.budget}
                                    onChange={handleInputChange}
                                    placeholder="e.g. M 15M"
                                    className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:border-gold transition-colors"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Size (sqm)
                                </label>
                                <input
                                    type="text"
                                    name="size"
                                    value={formData.size}
                                    onChange={handleInputChange}
                                    placeholder="e.g. 500 sqm"
                                    className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:border-gold transition-colors"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Duration
                                </label>
                                <input
                                    type="text"
                                    name="duration"
                                    value={formData.duration}
                                    onChange={handleInputChange}
                                    placeholder="e.g. 6 months"
                                    className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:border-gold transition-colors"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Completion Date
                                </label>
                                <input
                                    type="date"
                                    name="completionDate"
                                    value={formData.completionDate}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:border-gold transition-colors"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Key Features
                            </label>
                            <div className="flex gap-2 mb-2">
                                <input
                                    type="text"
                                    value={newFeature}
                                    onChange={(e) => setNewFeature(e.target.value)}
                                    placeholder="Add feature..."
                                    className="flex-1 px-4 py-2 bg-gray-50 rounded-lg border border-gray-200 focus:outline-none focus:border-gold transition-colors"
                                    onKeyPress={(e) => e.key === 'Enter' && addFeature()}
                                />
                                <button
                                    type="button"
                                    onClick={addFeature}
                                    className="px-4 py-2 bg-gold text-[#0A1628] rounded-lg hover:bg-gold-light transition-colors"
                                >
                                    <Plus className="w-5 h-5" />
                                </button>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {formData.features.map((feature, index) => (
                                    <span key={index} className="px-3 py-1 bg-gold/10 text-gold text-sm rounded-full flex items-center gap-1">
                                        {feature}
                                        <button
                                            type="button"
                                            onClick={() => removeFeature(feature)}
                                            className="hover:text-red-500 transition-colors"
                                        >
                                            <X className="w-3 h-3" />
                                        </button>
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Materials Used
                            </label>
                            <div className="flex gap-2 mb-2">
                                <input
                                    type="text"
                                    value={newMaterial}
                                    onChange={(e) => setNewMaterial(e.target.value)}
                                    placeholder="Add material..."
                                    className="flex-1 px-4 py-2 bg-gray-50 rounded-lg border border-gray-200 focus:outline-none focus:border-gold transition-colors"
                                    onKeyPress={(e) => e.key === 'Enter' && addMaterial()}
                                />
                                <button
                                    type="button"
                                    onClick={addMaterial}
                                    className="px-4 py-2 bg-gold text-[#0A1628] rounded-lg hover:bg-gold-light transition-colors"
                                >
                                    <Plus className="w-5 h-5" />
                                </button>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {formData.materials.map((material, index) => (
                                    <span key={index} className="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full flex items-center gap-1">
                                        {material}
                                        <button
                                            type="button"
                                            onClick={() => removeMaterial(material)}
                                            className="hover:text-red-500 transition-colors"
                                        >
                                            <X className="w-3 h-3" />
                                        </button>
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <input
                                type="checkbox"
                                name="isFeatured"
                                checked={formData.isFeatured}
                                onChange={handleInputChange}
                                className="w-4 h-4 text-gold border-gray-300 rounded focus:ring-gold"
                            />
                            <label className="text-sm text-gray-700">
                                Feature this project (appears on homepage)
                            </label>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                            <select
                                name="status"
                                value={formData.status}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:border-gold transition-colors"
                            >
                                <option value="draft">Draft</option>
                                <option value="published">Published</option>
                            </select>
                        </div>
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen bg-[#FAF8F5] py-8">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="flex items-center gap-4 mb-8">
                    <button
                        onClick={() => navigate('/constructor/projects')}
                        className="p-2 hover:bg-gray-200 rounded-xl transition-colors"
                    >
                        <ArrowLeft className="w-6 h-6 text-gray-600" />
                    </button>
                    <div>
                        <h1 className="text-3xl font-['Playfair_Display'] font-bold text-[#0A1628]">
                            Upload Project
                        </h1>
                        <p className="text-gray-600 mt-1">Add a new project to your portfolio</p>
                    </div>
                </div>

                {submitSuccess ? (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-white rounded-2xl shadow-card p-12 text-center"
                    >
                        <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <CheckCircle className="w-10 h-10 text-emerald-500" />
                        </div>
                        <h2 className="text-2xl font-bold text-[#0A1628]">Project Uploaded!</h2>
                        <p className="text-gray-600 mt-2">Your project has been successfully uploaded.</p>
                        <div className="flex gap-4 justify-center mt-6">
                            <button
                                onClick={() => navigate('/constructor/projects')}
                                className="px-6 py-2.5 bg-gold text-[#0A1628] font-semibold rounded-xl hover:bg-gold-light transition-colors"
                            >
                                View Projects
                            </button>
                            <button
                                onClick={() => {
                                    setSubmitSuccess(false);
                                    setFormData({
                                        title: '',
                                        description: '',
                                        location: '',
                                        city: '',
                                        country: 'Lesotho',
                                        projectType: '',
                                        budget: '',
                                        size: '',
                                        duration: '',
                                        completionDate: '',
                                        features: [],
                                        materials: [],
                                        isFeatured: false,
                                        status: 'draft',
                                    });
                                    setUploadedImages([]);
                                    setCurrentStep(1);
                                }}
                                className="px-6 py-2.5 bg-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-300 transition-colors"
                            >
                                Upload Another
                            </button>
                        </div>
                    </motion.div>
                ) : (
                    <form onSubmit={handleSubmit}>
                        <div className="bg-white rounded-2xl shadow-card overflow-hidden">
                            {/* Steps */}
                            <div className="p-6 border-b border-gray-100">
                                <div className="flex items-center justify-between max-w-md mx-auto">
                                    {steps.map((step, index) => (
                                        <div key={index} className="flex items-center">
                                            <button
                                                type="button"
                                                onClick={() => setCurrentStep(step.number)}
                                                className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all duration-300 ${
                                                    currentStep === step.number
                                                        ? 'bg-gold text-[#0A1628]'
                                                        : currentStep > step.number
                                                        ? 'bg-emerald-500 text-white'
                                                        : 'bg-gray-200 text-gray-500'
                                                }`}
                                            >
                                                {currentStep > step.number ? (
                                                    <CheckCircle className="w-5 h-5" />
                                                ) : (
                                                    step.number
                                                )}
                                            </button>
                                            {index < steps.length - 1 && (
                                                <div className={`w-16 h-1 mx-2 rounded-full ${
                                                    currentStep > step.number ? 'bg-emerald-500' : 'bg-gray-200'
                                                }`} />
                                            )}
                                        </div>
                                    ))}
                                </div>
                                <div className="flex justify-between mt-2 text-xs text-gray-500">
                                    {steps.map((step, index) => (
                                        <span key={index} className="text-center w-24">{step.label}</span>
                                    ))}
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-6">
                                {renderStepContent()}
                            </div>

                            {/* Actions */}
                            <div className="p-6 border-t border-gray-100 flex justify-between">
                                <button
                                    type="button"
                                    onClick={() => setCurrentStep(prev => Math.max(1, prev - 1))}
                                    className={`px-6 py-2.5 rounded-xl font-semibold transition-colors ${
                                        currentStep === 1
                                            ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                    }`}
                                    disabled={currentStep === 1}
                                >
                                    Back
                                </button>
                                {currentStep < steps.length ? (
                                    <button
                                        type="button"
                                        onClick={() => setCurrentStep(prev => Math.min(steps.length, prev + 1))}
                                        className="px-6 py-2.5 bg-gold text-[#0A1628] font-semibold rounded-xl hover:bg-gold-light transition-colors"
                                    >
                                        Next Step
                                    </button>
                                ) : (
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="px-6 py-2.5 bg-gold text-[#0A1628] font-semibold rounded-xl hover:bg-gold-light transition-colors flex items-center gap-2 disabled:opacity-70"
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <div className="w-5 h-5 border-2 border-[#0A1628] border-t-transparent rounded-full animate-spin" />
                                                Uploading...
                                            </>
                                        ) : (
                                            <>
                                                <Save className="w-5 h-5" />
                                                Upload Project
                                            </>
                                        )}
                                    </button>
                                )}
                            </div>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
};

export default ProjectUpload;
