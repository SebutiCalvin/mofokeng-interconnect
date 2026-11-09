import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
    MapPin,
    Mail,
    Phone,
    Send,
    Clock,
    Globe,
    CheckCircle,
    AlertCircle
} from 'lucide-react';

const ContactPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus(null);
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        setSubmitStatus('success');
        setIsSubmitting(false);
        setFormData({ name: '', email: '', subject: '', message: '' });
        
        setTimeout(() => setSubmitStatus(null), 5000);
    };

    const contactInfo = [
        { icon: MapPin, label: 'Address', value: 'Maseru, Lesotho', color: 'from-red-500 to-orange-500' },
        { icon: Mail, label: 'Email', value: 'sebuticalvi@gmail.com', color: 'from-blue-500 to-indigo-500' },
        { icon: Phone, label: 'Phone', value: '+266 57266136', color: 'from-emerald-500 to-teal-500' },
        { icon: Clock, label: 'Working Hours', value: 'Mon - Fri, 8:00 AM - 6:00 PM', color: 'from-purple-500 to-pink-500' },
        { icon: Globe, label: 'Website', value: 'www.mofokengsebuti.com', color: 'from-cyan-500 to-blue-500' },
    ];

    return (
        <div className="min-h-screen bg-[#FAF8F5] py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-['Playfair_Display'] font-bold text-[#0A1628]">
                        Get in <span className="text-gold">Touch</span>
                    </h1>
                    <p className="text-gray-600 mt-2">We'd love to hear from you</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Contact Info */}
                    <div className="lg:col-span-1 space-y-4">
                        {contactInfo.map((info, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="bg-white rounded-2xl shadow-card p-4 flex items-center gap-4 hover:shadow-card-hover transition-all duration-300"
                            >
                                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${info.color} flex items-center justify-center flex-shrink-0`}>
                                    <info.icon className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <p className="text-xs text-gray-400">{info.label}</p>
                                    <p className="font-medium text-[#0A1628]">{info.value}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Contact Form */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-2xl shadow-card p-6 md:p-8">
                            <h2 className="text-2xl font-['Playfair_Display'] font-bold text-[#0A1628] mb-6">
                                Send us a <span className="text-gold">Message</span>
                            </h2>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <input
                                        type="text"
                                        placeholder="Your Name"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:border-gold transition-colors"
                                        required
                                    />
                                    <input
                                        type="email"
                                        placeholder="Your Email"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        className="px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:border-gold transition-colors"
                                        required
                                    />
                                </div>
                                <input
                                    type="text"
                                    placeholder="Subject"
                                    value={formData.subject}
                                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                    className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:border-gold transition-colors"
                                    required
                                />
                                <textarea
                                    rows="5"
                                    placeholder="Your Message"
                                    value={formData.message}
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:border-gold transition-colors"
                                    required
                                />

                                {submitStatus === 'success' && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="flex items-center gap-2 p-3 bg-emerald-50 text-emerald-700 rounded-xl"
                                    >
                                        <CheckCircle className="w-5 h-5" />
                                        Message sent! We'll get back to you soon.
                                    </motion.div>
                                )}

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full py-3 bg-gradient-to-r from-gold to-gold-light text-[#0A1628] font-semibold rounded-xl hover:scale-[1.02] transition-all duration-300 shadow-lg hover:shadow-glow disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <div className="w-5 h-5 border-2 border-[#0A1628] border-t-transparent rounded-full animate-spin" />
                                            Sending...
                                        </>
                                    ) : (
                                        <>
                                            <Send className="w-5 h-5" />
                                            Send Message
                                        </>
                                    )}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;
