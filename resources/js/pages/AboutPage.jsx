import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    Building2,
    Briefcase,
    Users,
    Award,
    Shield,
    Globe,
    Heart,
    Star,
    TrendingUp,
    CheckCircle
} from 'lucide-react';

const AboutPage = () => {
    const stats = [
        { icon: Building2, value: '500+', label: 'Companies', color: 'from-emerald-500 to-teal-500' },
        { icon: Briefcase, value: '10,000+', label: 'Projects', color: 'from-blue-500 to-indigo-500' },
        { icon: Users, value: '50,000+', label: 'Clients', color: 'from-purple-500 to-pink-500' },
        { icon: Award, value: '98%', label: 'Satisfaction', color: 'from-orange-500 to-red-500' },
    ];

    const values = [
        {
            icon: Shield,
            title: 'Trust & Transparency',
            description: 'We believe in building trust through transparent processes and honest communication.',
        },
        {
            icon: Heart,
            title: 'Excellence',
            description: 'We strive for excellence in everything we do, from our platform to our partnerships.',
        },
        {
            icon: Globe,
            title: 'Pan-African Vision',
            description: 'Connecting construction companies and clients across the entire African continent.',
        },
        {
            icon: TrendingUp,
            title: 'Innovation',
            description: 'Leveraging technology to transform the construction industry in Africa.',
        },
    ];

    const team = [
        { name: 'John Mwangi', role: 'CEO & Founder', image: '👨‍💼', bio: '20+ years in construction industry' },
        { name: 'Sarah Kamau', role: 'CTO', image: '👩‍💻', bio: 'Tech innovation leader' },
        { name: 'Michael Otieno', role: 'Head of Operations', image: '👨‍🔧', bio: 'Construction management expert' },
        { name: 'Grace Nkosi', role: 'Client Relations', image: '👩‍💼', bio: 'Customer experience specialist' },
    ];

    return (
        <div className="min-h-screen bg-[#FAF8F5]">
            {/* Hero Section */}
            <section className="relative bg-gradient-to-br from-[#0A1628] to-[#1A2A4A] py-20 overflow-hidden">
                <div className="absolute inset-0 pattern-grid opacity-10" />
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-['Playfair_Display'] font-bold text-white">
                            About <span className="text-gold">Mofokeng Interconnect</span>
                        </h1>
                        <p className="text-xl text-white/60 mt-4 max-w-3xl mx-auto">
                            Africa's premier construction marketplace, connecting builders and clients across the continent.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-12 bg-white border-y border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {stats.map((stat, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="text-center"
                            >
                                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mx-auto mb-3`}>
                                    <stat.icon className="w-7 h-7 text-white" />
                                </div>
                                <div className="text-3xl font-['Playfair_Display'] font-bold text-gold">
                                    {stat.value}
                                </div>
                                <div className="text-sm text-gray-500">{stat.label}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Mission Section */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <span className="text-gold font-semibold text-sm uppercase tracking-wider">Our Mission</span>
                            <h2 className="text-3xl font-['Playfair_Display'] font-bold text-[#0A1628] mt-2">
                                Building Africa's <span className="text-gold">Construction Future</span>
                            </h2>
                            <p className="text-gray-600 mt-4 leading-relaxed">
                                Mofokeng Interconnect was founded with a vision to revolutionize the construction 
                                industry in Africa. We believe that by connecting construction companies with 
                                clients through our digital marketplace, we can unlock the continent's full potential.
                            </p>
                            <p className="text-gray-600 mt-4 leading-relaxed">
                                Our platform empowers construction companies to showcase their work, build their 
                                reputation, and grow their business while giving clients access to trusted, 
                                verified professionals.
                            </p>
                            <div className="flex flex-wrap gap-4 mt-6">
                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                    <CheckCircle className="w-5 h-5 text-gold" />
                                    Trusted Platform
                                </div>
                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                    <CheckCircle className="w-5 h-5 text-gold" />
                                    Verified Companies
                                </div>
                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                    <CheckCircle className="w-5 h-5 text-gold" />
                                    Secure Payments
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                            className="bg-white rounded-2xl shadow-card p-8"
                        >
                            <div className="text-6xl mb-4">🏗️</div>
                            <h3 className="text-xl font-bold text-[#0A1628]">Our Vision</h3>
                            <p className="text-gray-600 mt-2 leading-relaxed">
                                To be the most trusted construction partner in Africa, setting the standard 
                                for excellence in the industry and transforming how construction is done 
                                across the continent.
                            </p>
                            <div className="mt-6 p-4 bg-gray-50 rounded-xl">
                                <div className="flex items-center gap-3">
                                    <Star className="w-6 h-6 text-gold fill-gold" />
                                    <div>
                                        <p className="font-semibold text-[#0A1628]">Our Promise</p>
                                        <p className="text-sm text-gray-500">Quality, Trust, and Excellence</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-['Playfair_Display'] font-bold text-[#0A1628]">
                            Our Core <span className="text-gold">Values</span>
                        </h2>
                        <p className="text-gray-600 mt-2">The principles that guide everything we do</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {values.map((value, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="bg-gray-50 rounded-2xl p-6 text-center hover:shadow-card transition-all duration-300 hover:-translate-y-1"
                            >
                                <div className="w-14 h-14 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <value.icon className="w-7 h-7 text-gold" />
                                </div>
                                <h3 className="font-semibold text-[#0A1628]">{value.title}</h3>
                                <p className="text-gray-600 text-sm mt-2">{value.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-['Playfair_Display'] font-bold text-[#0A1628]">
                            Meet Our <span className="text-gold">Team</span>
                        </h2>
                        <p className="text-gray-600 mt-2">The people behind Mofokeng Interconnect</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {team.map((member, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="bg-white rounded-2xl shadow-card p-6 text-center hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1"
                            >
                                <div className="w-20 h-20 bg-gradient-to-br from-gold/20 to-gold-light/20 rounded-full flex items-center justify-center text-4xl mx-auto">
                                    {member.image}
                                </div>
                                <h3 className="font-semibold text-[#0A1628] mt-4">{member.name}</h3>
                                <p className="text-gold text-sm">{member.role}</p>
                                <p className="text-gray-500 text-xs mt-1">{member.bio}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-gradient-to-br from-[#0A1628] to-[#1A2A4A]">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-3xl font-['Playfair_Display'] font-bold text-white">
                            Ready to Build Africa's <span className="text-gold">Future</span>?
                        </h2>
                        <p className="text-white/60 mt-4">
                            Join thousands of construction companies and clients already connected on our platform.
                        </p>
                        <div className="flex flex-wrap justify-center gap-4 mt-8">
                            <Link
                                to="/register"
                                className="px-8 py-3 bg-gold text-[#0A1628] font-semibold rounded-xl hover:bg-gold-light transition-all duration-300 shadow-lg hover:shadow-glow"
                            >
                                Get Started Free
                            </Link>
                            <Link
                                to="/constructors"
                                className="px-8 py-3 border border-white/30 text-white font-semibold rounded-xl hover:bg-white hover:text-[#0A1628] transition-all duration-300"
                            >
                                Explore Companies
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default AboutPage;
