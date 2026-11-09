import React, { useState } from 'react';

const FAQPage = () => {
    const [openIndex, setOpenIndex] = useState(null);

    const faqs = [
        { q: 'How do I register as a constructor?', a: 'Click the "Get Started" button, fill in your company details, and submit your registration.' },
        { q: 'What payment methods do you accept?', a: 'We accept M-Pesa, EcoCash, and bank transfers.' },
        { q: 'How do I post a project?', a: 'After registration, go to your dashboard and click "Add Project".' },
        { q: 'How much does it cost to list my company?', a: 'We offer plans starting from M 5,000 per month.' },
    ];

    return (
        <div className="min-h-screen bg-[#FAF8F5] py-12">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-['Playfair_Display'] font-bold text-[#0A1628]">Frequently Asked Questions</h1>
                    <p className="text-gray-600 mt-2">Find answers to common questions</p>
                </div>

                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <div key={index} className="bg-white rounded-2xl shadow-card overflow-hidden">
                            <button
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                            >
                                <span className="font-semibold text-[#0A1628]">{faq.q}</span>
                                <span className="text-gold text-xl">{openIndex === index ? '−' : '+'}</span>
                            </button>
                            {openIndex === index && (
                                <div className="px-6 py-4 border-t border-gray-100 text-gray-600">
                                    {faq.a}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FAQPage;
