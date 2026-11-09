import React from 'react';
import { useParams, Link } from 'react-router-dom';

const BlogDetailPage = () => {
    const { slug } = useParams();

    return (
        <div className="min-h-screen bg-[#FAF8F5] py-12">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-white rounded-2xl shadow-card p-8">
                    <Link to="/blog" className="text-gold hover:text-gold-light transition-colors">← Back to Blog</Link>
                    <h1 className="text-3xl font-['Playfair_Display'] font-bold text-[#0A1628] mt-4">Blog Post: {slug}</h1>
                    <p className="text-gray-600 mt-2">Full blog content will appear here...</p>
                </div>
            </div>
        </div>
    );
};

export default BlogDetailPage;
