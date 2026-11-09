import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
    Settings,
    Globe,
    Mail,
    Shield,
    Bell,
    Palette,
    Database,
    Users,
    Building2,
    DollarSign,
    FileText,
    MessageCircle,
    Lock,
    Smartphone,
    Monitor,
    Moon,
    Sun,
    Save,
    CheckCircle,
    AlertCircle,
    RefreshCw,
    ChevronDown,
    ChevronRight,
    Edit,
    X,
    Plus,
    Trash2,
    Upload,
    Download,
    Printer,
    Eye,
    EyeOff,
    Link2,
    Share2,
    Code,
    Server,
    Cloud,
    Terminal,
    Key,
    UserCheck,
    UserX
} from 'lucide-react';

const AdminSettings = () => {
    const [activeTab, setActiveTab] = useState('general');
    const [isSaving, setIsSaving] = useState(false);
    const [saveSuccess, setSaveSuccess] = useState(false);

    const [settings, setSettings] = useState({
        general: {
            siteName: 'Mofokeng Interconnect',
            siteDescription: 'Africa\'s Premier Construction Marketplace',
            siteUrl: 'https://Mofokeng.com',
            supportEmail: 'sebuticalvi@gmail.com',
            timezone: 'Africa/Nairobi',
            language: 'en',
            maintenanceMode: false,
        },
        appearance: {
            theme: 'dark',
            primaryColor: '#C9A94E',
            logo: '/images/logo.png',
            favicon: '/images/favicon.png',
        },
        notifications: {
            emailNotifications: true,
            smsNotifications: true,
            pushNotifications: false,
            marketingEmails: false,
            securityAlerts: true,
        },
        security: {
            twoFactorAuth: true,
            sessionTimeout: '60',
            passwordPolicy: 'medium',
            allowedIPs: [],
            blockedIPs: [],
        },
        payment: {
            currency: 'LSL',
            mpgsEnabled: true,
            ecocashEnabled: true,
            bankTransferEnabled: true,
            defaultPlan: 'professional',
        },
    });

    const tabs = [
        { id: 'general', icon: Settings, label: 'General' },
        { id: 'appearance', icon: Palette, label: 'Appearance' },
        { id: 'notifications', icon: Bell, label: 'Notifications' },
        { id: 'security', icon: Shield, label: 'Security' },
        { id: 'payment', icon: DollarSign, label: 'Payment' },
    ];

    const handleSave = async () => {
        setIsSaving(true);
        await new Promise(resolve => setTimeout(resolve, 1500));
        setIsSaving(false);
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 3000);
    };

    const renderContent = () => {
        switch(activeTab) {
            case 'general':
                return (
                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Site Name</label>
                            <input
                                type="text"
                                value={settings.general.siteName}
                                className="w-full px-4 py-2.5 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:border-gold transition-colors"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Site Description</label>
                            <input
                                type="text"
                                value={settings.general.siteDescription}
                                className="w-full px-4 py-2.5 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:border-gold transition-colors"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Support Email</label>
                            <input
                                type="email"
                                value={settings.general.supportEmail}
                                className="w-full px-4 py-2.5 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:border-gold transition-colors"
                            />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Timezone</label>
                                <select className="w-full px-4 py-2.5 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:border-gold transition-colors">
                                    <option>Africa/Nairobi</option>
                                    <option>Africa/Johannesburg</option>
                                    <option>Africa/Lagos</option>
                                    <option>Africa/Cairo</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Language</label>
                                <select className="w-full px-4 py-2.5 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:border-gold transition-colors">
                                    <option>English</option>
                                    <option>French</option>
                                    <option>Portuguese</option>
                                    <option>Arabic</option>
                                </select>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <input
                                type="checkbox"
                                checked={settings.general.maintenanceMode}
                                className="w-4 h-4 text-gold border-gray-300 rounded focus:ring-gold"
                            />
                            <label className="text-sm text-gray-700">Enable Maintenance Mode</label>
                        </div>
                    </div>
                );

            case 'appearance':
                return (
                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Theme</label>
                            <div className="flex gap-3">
                                <button className={`px-4 py-2 rounded-xl border transition-colors ${settings.appearance.theme === 'dark' ? 'border-gold bg-gold/10' : 'border-gray-200'}`}>
                                    <Moon className="w-5 h-5 inline mr-2" /> Dark
                                </button>
                                <button className={`px-4 py-2 rounded-xl border transition-colors ${settings.appearance.theme === 'light' ? 'border-gold bg-gold/10' : 'border-gray-200'}`}>
                                    <Sun className="w-5 h-5 inline mr-2" /> Light
                                </button>
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Primary Color</label>
                            <div className="flex items-center gap-3">
                                <input
                                    type="color"
                                    value={settings.appearance.primaryColor}
                                    className="w-12 h-12 rounded-xl border-0 cursor-pointer"
                                />
                                <span className="text-sm text-gray-500">{settings.appearance.primaryColor}</span>
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Logo</label>
                            <div className="flex items-center gap-4">
                                <div className="w-20 h-20 bg-gray-100 rounded-xl flex items-center justify-center text-3xl">
                                    🏗️
                                </div>
                                <button className="px-4 py-2 bg-gold text-[#0A1628] rounded-xl hover:bg-gold-light transition-colors text-sm">
                                    Upload Logo
                                </button>
                            </div>
                        </div>
                    </div>
                );

            case 'notifications':
                return (
                    <div className="space-y-4">
                        {[
                            { key: 'emailNotifications', label: 'Email Notifications' },
                            { key: 'smsNotifications', label: 'SMS Notifications' },
                            { key: 'pushNotifications', label: 'Push Notifications' },
                            { key: 'marketingEmails', label: 'Marketing Emails' },
                            { key: 'securityAlerts', label: 'Security Alerts' },
                        ].map((item) => (
                            <div key={item.key} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                                <span className="text-sm text-gray-700">{item.label}</span>
                                <div className={`relative inline-block w-12 h-6 rounded-full transition-colors ${settings.notifications[item.key] ? 'bg-gold' : 'bg-gray-300'}`}>
                                    <div className={`absolute top-0 left-0 w-6 h-6 bg-white rounded-full shadow-md transition-transform duration-300 ${settings.notifications[item.key] ? 'transform translate-x-6' : ''}`} />
                                </div>
                            </div>
                        ))}
                    </div>
                );

            case 'security':
                return (
                    <div className="space-y-6">
                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                            <div>
                                <p className="font-medium text-[#0A1628]">Two-Factor Authentication</p>
                                <p className="text-sm text-gray-500">Require 2FA for all admin accounts</p>
                            </div>
                            <div className={`relative inline-block w-12 h-6 rounded-full transition-colors ${settings.security.twoFactorAuth ? 'bg-gold' : 'bg-gray-300'}`}>
                                <div className={`absolute top-0 left-0 w-6 h-6 bg-white rounded-full shadow-md transition-transform duration-300 ${settings.security.twoFactorAuth ? 'transform translate-x-6' : ''}`} />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Session Timeout (minutes)</label>
                            <input
                                type="number"
                                value={settings.security.sessionTimeout}
                                className="w-full px-4 py-2.5 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:border-gold transition-colors"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Password Policy</label>
                            <select className="w-full px-4 py-2.5 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:border-gold transition-colors">
                                <option>Low</option>
                                <option selected>Medium</option>
                                <option>High</option>
                            </select>
                        </div>
                    </div>
                );

            case 'payment':
                return (
                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Default Currency</label>
                            <select className="w-full px-4 py-2.5 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:border-gold transition-colors">
                                <option>LSL</option>
                                <option>USD</option>
                                <option>EUR</option>
                                <option>ZAR</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Default Plan</label>
                            <select className="w-full px-4 py-2.5 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:border-gold transition-colors">
                                <option>Basic</option>
                                <option selected>Professional</option>
                                <option>Enterprise</option>
                            </select>
                        </div>
                        <div className="space-y-3">
                            {[
                                { key: 'mpgsEnabled', label: 'M-Pesa' },
                                { key: 'ecocashEnabled', label: 'EcoCash' },
                                { key: 'bankTransferEnabled', label: 'Bank Transfer' },
                            ].map((item) => (
                                <div key={item.key} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                                    <span className="text-sm text-gray-700">{item.label}</span>
                                    <div className={`relative inline-block w-12 h-6 rounded-full transition-colors ${settings.payment[item.key] ? 'bg-gold' : 'bg-gray-300'}`}>
                                        <div className={`absolute top-0 left-0 w-6 h-6 bg-white rounded-full shadow-md transition-transform duration-300 ${settings.payment[item.key] ? 'transform translate-x-6' : ''}`} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen bg-[#FAF8F5] py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
                    <div>
                        <h1 className="text-3xl font-['Playfair_Display'] font-bold text-[#0A1628]">
                            Platform Settings
                        </h1>
                        <p className="text-gray-600 mt-1">Manage your platform settings and preferences</p>
                    </div>
                    <div className="flex gap-3">
                        {saveSuccess && (
                            <span className="flex items-center gap-2 text-emerald-600">
                                <CheckCircle className="w-5 h-5" /> Settings saved!
                            </span>
                        )}
                        <button
                            onClick={handleSave}
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
                                    Save Settings
                                </>
                            )}
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    {/* Tabs */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-2xl shadow-card p-4 space-y-1">
                            {tabs.map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                                        activeTab === tab.id
                                            ? 'bg-gold/10 text-gold'
                                            : 'text-gray-600 hover:bg-gray-50'
                                    }`}
                                >
                                    <tab.icon className="w-5 h-5" />
                                    <span className="font-medium">{tab.label}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Content */}
                    <div className="lg:col-span-3">
                        <div className="bg-white rounded-2xl shadow-card p-6">
                            {renderContent()}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminSettings;
