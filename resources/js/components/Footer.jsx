import React from 'react';
import { Link } from 'react-router-dom';
import { 
    Mail, 
    Phone, 
    MapPin, 
    ArrowRight,
    Building2,
    Briefcase,
    Users,
    Sparkles,
    Shield,
    Zap
} from 'lucide-react';
import { 
    FaFacebook, 
    FaTwitter, 
    FaLinkedin, 
    FaInstagram, 
    FaYoutube 
} from 'react-icons/fa';

export const Footer = () => {
    const currentYear = new Date().getFullYear();

    const socialLinks = [
        { icon: FaFacebook, href: '#', label: 'Facebook', color: '#1877F2' },
        { icon: FaTwitter, href: '#', label: 'Twitter', color: '#1DA1F2' },
        { icon: FaLinkedin, href: '#', label: 'LinkedIn', color: '#0A66C2' },
        { icon: FaInstagram, href: '#', label: 'Instagram', color: '#E4405F' },
        { icon: FaYoutube, href: '#', label: 'YouTube', color: '#FF0000' },
    ];

    return (
        <footer className="bg-[#0A1628] border-t border-white/5 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-gold/5 to-transparent opacity-30" />
            
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="py-16 grid grid-cols-1 lg:grid-cols-5 gap-12">
                    {/* Brand */}
                    <div className="lg:col-span-1">
                        <div className="flex items-center space-x-3 mb-4">
                            <div className="w-12 h-12 bg-gradient-to-r from-gold to-gold-light rounded-xl flex items-center justify-center">
                                <span className="text-[#0A1628] font-bold text-xl">R</span>
                            </div>
                            <div>
                                <span className="text-white text-lg font-bold block">Mofokeng</span>
                                <span className="text-gold text-xs font-semibold tracking-wider">INTERCONNECT</span>
                            </div>
                        </div>
                        <p className="text-white/40 text-sm leading-relaxed max-w-xs">
                            Building Africa's construction future, one connection at a time.
                        </p>
                        
                        <div className="flex space-x-4 mt-6">
                            {socialLinks.map((social, index) => {
                                const Icon = social.icon;
                                return (
                                    <a
                                        key={index}
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-10 h-10 bg-white/5 hover:bg-white/10 rounded-xl flex items-center justify-center text-white/40 hover:text-gold transition-all duration-300 border border-white/5 hover:border-gold/30"
                                        aria-label={social.label}
                                    >
                                        <Icon className="w-5 h-5" />
                                    </a>
                                );
                            })}
                        </div>
                    </div>

                    {/* Links */}
                    <div>
                        <h4 className="font-semibold text-sm uppercase tracking-wider text-white/60 mb-4">For Contractors</h4>
                        <ul className="space-y-3">
                            <li><Link to="/register" className="text-white/40 hover:text-gold transition-colors text-sm">List Your Company</Link></li>
                            <li><Link to="/pricing" className="text-white/40 hover:text-gold transition-colors text-sm">Subscription Plans</Link></li>
                            <li><Link to="/tenders" className="text-white/40 hover:text-gold transition-colors text-sm">Tender Applications</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold text-sm uppercase tracking-wider text-white/60 mb-4">For Clients</h4>
                        <ul className="space-y-3">
                            <li><Link to="/constructors" className="text-white/40 hover:text-gold transition-colors text-sm">Find Contractors</Link></li>
                            <li><Link to="/projects" className="text-white/40 hover:text-gold transition-colors text-sm">Browse Projects</Link></li>
                            <li><Link to="/tenders/create" className="text-white/40 hover:text-gold transition-colors text-sm">Post a Tender</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold text-sm uppercase tracking-wider text-white/60 mb-4">Company</h4>
                        <ul className="space-y-3">
                            <li><Link to="/about" className="text-white/40 hover:text-gold transition-colors text-sm">About Us</Link></li>
                            <li><Link to="/contact" className="text-white/40 hover:text-gold transition-colors text-sm">Contact</Link></li>
                            <li><Link to="/blog" className="text-white/40 hover:text-gold transition-colors text-sm">Blog</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold text-sm uppercase tracking-wider text-white/60 mb-4">Newsletter</h4>
                        <p className="text-white/40 text-sm mb-4">Get the latest updates</p>
                        <form className="flex">
                            <input type="email" placeholder="Enter your email" className="flex-1 px-4 py-3 rounded-l-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-gold/50 text-sm" />
                            <button type="submit" className="px-5 py-3 bg-gradient-to-r from-gold to-gold-light text-[#0A1628] font-semibold rounded-r-xl hover:scale-[1.02] transition-all duration-300 flex items-center gap-2">
                                Subscribe
                                <ArrowRight className="w-4 h-4" />
                            </button>
                        </form>
                        <div className="mt-4 space-y-2 text-sm">
                            <a href="mailto:sebuticalvi@gmail.com" className="text-white/40 hover:text-gold transition-colors flex items-center gap-2">
                                <Mail className="w-4 h-4" /> sebuticalvi@gmail.com
                            </a>
                            <a href="tel:+26658888888" className="text-white/40 hover:text-gold transition-colors flex items-center gap-2">
                                <Phone className="w-4 h-4" /> +266 5888 8888
                            </a>
                            <div className="text-white/40 flex items-center gap-2">
                                <MapPin className="w-4 h-4" /> Maseru, Lesotho
                            </div>
                        </div>
                    </div>
                </div>

                <div className="py-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="text-white/30 text-xs">
                        © {currentYear} Mofokeng Interconnect. All rights reserved.
                    </div>
                    <div className="flex items-center gap-6 text-xs">
                        <Link to="/privacy" className="text-white/30 hover:text-gold transition-colors">Privacy Policy</Link>
                        <Link to="/terms" className="text-white/30 hover:text-gold transition-colors">Terms of Service</Link>
                        <span className="flex items-center gap-1 text-white/20">
                            <Shield className="w-3 h-3" />
                            <Zap className="w-3 h-3" />
                            <Sparkles className="w-3 h-3" />
                        </span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
