import React from 'react';
import { Link } from 'react-router-dom';

const PricingPage = () => {
    const plans = [
        { name: 'Basic', price: 'M 5,000', features: ['Profile Listing', '10 Projects', 'Basic Messaging'], popular: false },
        { name: 'Professional', price: 'M 12,000', features: ['Unlimited Projects', 'Featured Listing', 'Priority Support', 'Analytics'], popular: true },
        { name: 'Enterprise', price: 'M 25,000', features: ['Team Accounts', 'API Access', 'Dedicated Support', 'Custom Branding'], popular: false },
    ];

    return (
        <div className="min-h-screen bg-[#FAF8F5] py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-['Playfair_Display'] font-bold text-[#0A1628]">Choose Your Plan</h1>
                    <p className="text-gray-600 mt-2">Select the perfect plan for your construction business</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {plans.map((plan, index) => (
                        <div key={index} className={`bg-white rounded-2xl shadow-card hover:shadow-card-hover transition-all duration-300 overflow-hidden hover:-translate-y-2 ${plan.popular ? 'border-2 border-gold' : ''}`}>
                            {plan.popular && (
                                <div className="bg-gold text-[#0A1628] text-center py-2 text-sm font-semibold">Most Popular</div>
                            )}
                            <div className="p-6">
                                <h3 className="text-2xl font-bold text-[#0A1628]">{plan.name}</h3>
                                <div className="mt-4">
                                    <span className="text-4xl font-bold text-gold">{plan.price}</span>
                                    <span className="text-gray-500">/month</span>
                                </div>
                                <ul className="mt-6 space-y-3">
                                    {plan.features.map((feature, i) => (
                                        <li key={i} className="flex items-center gap-2 text-gray-600">
                                            <span className="text-gold">✓</span> {feature}
                                        </li>
                                    ))}
                                </ul>
                                <Link to="/register" className="mt-6 block w-full text-center py-3 bg-gold text-[#0A1628] font-semibold rounded-xl hover:bg-gold-light transition-all duration-300">
                                    Get Started
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PricingPage;
