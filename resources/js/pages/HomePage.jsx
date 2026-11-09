import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import GlassHero from '../components/GlassHero';
import GlassFeatures from '../components/GlassFeatures';
import GlassCTA from '../components/GlassCTA';

// ============================================================
// STATS SECTION
// ============================================================
const StatsSection = () => {
    const stats = [
        { number: '500+', label: 'Companies', icon: '🏢' },
        { number: '10,000+', label: 'Projects', icon: '📐' },
        { number: '50,000+', label: 'Clients', icon: '👥' },
        { number: '98%', label: 'Satisfaction', icon: '⭐' },
    ];

    return (
        <section className="py-12 md:py-16 bg-[#111C2E] border-y border-white/5">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="text-center"
                        >
                            <div className="text-3xl md:text-4xl mb-2">{stat.icon}</div>
                            <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-gold font-sans">
                                {stat.number}
                            </div>
                            <div className="text-xs md:text-sm text-gray-400 mt-1">{stat.label}</div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

// ============================================================
// TESTIMONIALS SECTION
// ============================================================
const TestimonialsSection = () => {
    const testimonials = [
        {
            name: 'Letlotlo Matlali',
            role: 'CEO, Mwangi Construction',
            content: 'Mofokeng Interconnect transformed our business. We connected with clients across Lesotho within weeks!',
            rating: 5,
        },
        {
            name: 'Mary Lebeko',
            role: 'Project Manager, Lebeko Builders',
            content: 'The platform is intuitive and has helped us showcase our work to a wider audience.',
            rating: 5,
        },
        {
            name: 'Thabang Maloi',
            role: 'Client, Homeowner',
            content: 'Found the perfect contractor for my dream home through Mofokeng Interconnect.',
            rating: 4,
        },
    ];

    return (
        <section className="py-12 md:py-20 bg-[#0A1628]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-8 md:mb-12">
                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white font-sans">
                        What Our <span className="text-gold">Clients Say</span>
                    </h2>
                    <p className="text-gray-400 text-sm md:text-base mt-2">Real reviews from real people</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                    {testimonials.map((testimonial, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="bg-white/5 backdrop-blur-sm rounded-xl md:rounded-2xl p-4 md:p-6 border border-white/10 hover:border-gold/30 transition-all duration-300"
                        >
                            <div className="flex items-center gap-1 text-gold mb-2 md:mb-3">
                                {[...Array(5)].map((_, i) => (
                                    <span key={i} className="text-sm md:text-base">{i < testimonial.rating ? '★' : '☆'}</span>
                                ))}
                            </div>
                            <p className="text-white/80 text-sm md:text-base leading-relaxed">"{testimonial.content}"</p>
                            <div className="mt-3 md:mt-4">
                                <p className="text-white font-semibold text-sm md:text-base">{testimonial.name}</p>
                                <p className="text-white/40 text-xs md:text-sm">{testimonial.role}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

// ============================================================
// TRUSTED BY SECTION
// ============================================================
const TrustedBySection = () => {
    const partners = [
        '🏗️ BuildCo Africa',
        '🏢 Skyline Constructors',
        '🌍 EcoBuild International',
        '🏠 HomeCraft Ltd',
        '🏛️ Urban Development Co',
    ];

    return (
        <section className="py-8 md:py-16 bg-[#111C2E]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <p className="text-center text-gray-400 text-xs md:text-sm uppercase tracking-wider mb-4 md:mb-8">
                    Trusted by leading construction companies
                </p>
                <div className="flex flex-wrap justify-center items-center gap-4 md:gap-8 lg:gap-12">
                    {partners.map((partner, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3, delay: index * 0.05 }}
                            className="text-gray-400 font-semibold text-xs md:text-sm hover:text-gold transition-colors duration-300 cursor-default"
                        >
                            {partner}
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

// ============================================================
// BLOG PREVIEW SECTION (FIXED)
// ============================================================
const BlogPreviewSection = () => {
    const posts = [
        {
            title: 'Top 10 Construction Trends in 2026',
            excerpt: 'Discover the latest trends shaping the construction industry across Africa.',
            date: 'July 28, 2026',
            category: 'Industry',
        },
        {
            title: 'How to Choose the Right Contractor',
            excerpt: 'A complete guide to finding the perfect construction partner for your project.',
            date: 'July 25, 2026',
            category: 'Tips',
        },
    ];

    return (
        <section className="py-12 md:py-20 bg-[#0A1628] border-t border-white/5">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center mb-6 md:mb-12">
                    <div>
                        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white font-sans">
                            Latest <span className="text-gold">Insights</span>
                        </h2>
                        <p className="text-gray-400 text-sm md:text-base mt-1">Read our latest articles and updates</p>
                    </div>
                    <a href="/blog" className="text-gold hover:text-gold-light transition-colors font-semibold text-sm md:text-base">
                        View All →
                    </a>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                    {posts.map((post, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="bg-[#111C2E] rounded-xl md:rounded-2xl p-4 md:p-6 hover:shadow-card transition-all duration-300 hover:-translate-y-1 border border-white/5"
                        >
                            <span className="text-xs text-gold font-semibold uppercase">{post.category}</span>
                            <h3 className="text-base md:text-xl font-bold text-white mt-1 md:mt-2">{post.title}</h3>
                            <p className="text-gray-400 text-sm md:text-base mt-2">{post.excerpt}</p>
                            <p className="text-gray-500 text-xs md:text-sm mt-3 md:mt-4">{post.date}</p>
                            <a href={`/blog/${index + 1}`} className="mt-3 md:mt-4 inline-block text-gold font-semibold hover:text-gold-light transition-colors text-sm md:text-base">
                                Read More →
                            </a>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

// ============================================================
// MAIN HOMEPAGE COMPONENT
// ============================================================
const HomePage = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isVisible ? 1 : 0 }}
            transition={{ duration: 0.5 }}
            className="min-h-screen"
        >
            {/* Hero Section */}
            <GlassHero />

            {/* Trusted By Section */}
            <TrustedBySection />

            {/* Features Section */}
            <GlassFeatures />

            {/* Statistics Section */}
            <StatsSection />

            {/* Testimonials Section */}
            <TestimonialsSection />

            {/* Blog Preview Section */}
            <BlogPreviewSection />

            {/* Call to Action Section */}
            <GlassCTA />

            {/* SEO Friendly */}
            <div className="sr-only">
                <h1>Mofokeng Interconnect - Africa's Premier Construction Marketplace</h1>
                <p>Connect with leading construction companies across Africa. Find contractors, browse projects, and build the future.</p>
            </div>
        </motion.div>
    );
};

export default HomePage;