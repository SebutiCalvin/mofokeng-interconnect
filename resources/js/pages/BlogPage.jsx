import React from 'react';
import { Link } from 'react-router-dom';

const BlogPage = () => {
    const posts = [
        { id: 1, title: 'Top 10 Construction Trends in 2026', excerpt: 'Discover the latest trends shaping the construction industry.', date: 'July 28, 2026', category: 'Industry' },
        { id: 2, title: 'How to Choose the Right Contractor', excerpt: 'A complete guide to finding the perfect construction partner.', date: 'July 25, 2026', category: 'Tips' },
        { id: 3, title: 'Sustainable Building Practices', excerpt: 'Learn about eco-friendly construction methods.', date: 'July 20, 2026', category: 'Sustainability' },
    ];

    return (
        <div className="min-h-screen bg-[#FAF8F5] py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-['Playfair_Display'] font-bold text-[#0A1628]">Construction Blog</h1>
                    <p className="text-gray-600 mt-2">Latest news and insights from the construction industry</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {posts.map((post) => (
                        <div key={post.id} className="bg-white rounded-2xl shadow-card hover:shadow-card-hover transition-all duration-300 overflow-hidden hover:-translate-y-2">
                            <div className="h-48 bg-gradient-to-br from-gold/10 to-gold-light/10 flex items-center justify-center text-6xl">
                                📰
                            </div>
                            <div className="p-6">
                                <span className="text-xs text-gold font-semibold uppercase">{post.category}</span>
                                <h3 className="text-xl font-bold text-[#0A1628] mt-2">{post.title}</h3>
                                <p className="text-gray-600 text-sm mt-2">{post.excerpt}</p>
                                <p className="text-gray-400 text-xs mt-4">{post.date}</p>
                                <Link to={`/blog/${post.id}`} className="mt-4 inline-block text-gold font-semibold hover:text-gold-light transition-colors">
                                    Read More →
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default BlogPage;
