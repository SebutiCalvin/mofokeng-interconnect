@extends('layouts.app')

@section('title', 'Building Africa\'s Future - Mofokeng Interconnect')
@section('description', 'Discover and connect with Africa\'s leading construction companies. Browse portfolios, post tenders, and build the continent\'s future together.')
@section('keywords', 'construction, marketplace, Africa, contractors, building, projects, tenders, Mofokeng')

@section('content')
<!-- ============================================================
     HERO SECTION
     ============================================================ -->
<section class="relative min-h-screen flex items-center overflow-hidden" aria-label="Hero Section">
    <!-- Animated Background -->
    <div class="absolute inset-0 z-0 bg-gradient-to-br from-[#0A1628] via-[#1A2A4A] to-[#0A1628]">
        <!-- Pattern Overlay -->
        <div class="absolute inset-0 opacity-10" style="background-image: url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%23C9A94E\" fill-opacity=\"0.4\"%3E%3Cpath d=\"M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E');"></div>
        
        <!-- Animated Gradient Orbs -->
        <div class="absolute top-1/4 left-1/4 w-96 h-96 bg-gold/10 rounded-full blur-3xl animate-pulse"></div>
        <div class="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gold/5 rounded-full blur-3xl animate-pulse" style="animation-delay: 2s;"></div>
        <div class="absolute top-1/2 left-1/2 w-64 h-64 bg-gold/5 rounded-full blur-3xl animate-pulse" style="animation-delay: 4s;"></div>
    </div>

    <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div class="max-w-4xl">
            <!-- Premium Badge -->
            <div class="inline-flex items-center gap-3 px-6 py-3 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full mb-8 shadow-xl animate-fade-in-up hover:border-gold/30 transition-all duration-300 group cursor-default">
                <span class="text-2xl group-hover:scale-110 transition-transform duration-300">🌍</span>
                <span class="text-gold text-sm font-semibold uppercase tracking-wider">Africa's Premier Construction Marketplace</span>
                <span class="w-1 h-1 bg-gold/30 rounded-full"></span>
                <span class="text-white/30 text-xs font-medium">✦ 2026</span>
            </div>

            <!-- Main Title -->
            <h1 class="font-['Playfair_Display'] text-5xl sm:text-6xl lg:text-7xl xl:text-8xl text-white font-bold leading-[1.05] animate-fade-in-up" style="animation-delay: 0.1s">
                Building <br>
                <span class="relative inline-block">
                    <span class="bg-gradient-to-r from-gold via-gold-light to-gold bg-clip-text text-transparent bg-[length:200%_auto] animate-shimmer">
                        Africa's
                    </span>
                    <span class="absolute -bottom-2 left-0 w-full h-0.5 bg-gradient-to-r from-gold to-transparent"></span>
                </span>
                <span class="text-white"> Future</span>
            </h1>

            <!-- Description -->
            <p class="mt-6 text-lg sm:text-xl text-white/70 leading-relaxed max-w-2xl animate-fade-in-up" style="animation-delay: 0.2s">
                Discover, connect, and collaborate with Africa's leading construction 
                companies. Showcase your work, find your next project, and build 
                the continent's future together.
            </p>

            <!-- Search Bar -->
            <div class="mt-10 max-w-3xl animate-fade-in-up" style="animation-delay: 0.3s">
                <div class="relative group">
                    <div class="absolute -inset-0.5 bg-gradient-to-r from-gold/20 to-gold-light/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    
                    <div class="relative flex flex-col sm:flex-row gap-2 bg-white/5 backdrop-blur-xl rounded-2xl p-2 border border-white/10 group-hover:border-gold/30 transition-all duration-300">
                        <div class="flex-1 flex items-center px-4">
                            <svg class="w-5 h-5 text-white/40 mr-3 group-hover:text-gold transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                            </svg>
                            <input 
                                type="text" 
                                placeholder="Search for construction services, companies, or projects..." 
                                class="flex-1 py-4 bg-transparent text-white placeholder-white/40 border-0 outline-none focus:ring-0 text-sm"
                                aria-label="Search"
                            />
                            <kbd class="hidden sm:block px-2 py-1 bg-white/5 border border-white/10 rounded text-white/30 text-xs font-mono">⌘K</kbd>
                        </div>
                        <button class="px-8 py-4 bg-gradient-to-r from-gold to-gold-light text-[#0A1628] font-semibold rounded-xl hover:scale-[1.02] transition-all duration-300 shadow-lg hover:shadow-glow flex items-center gap-2 group/btn whitespace-nowrap">
                            <svg class="w-4 h-4 group-hover/btn:rotate-12 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                            </svg>
                            Search
                            <svg class="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
                            </svg>
                        </button>
                    </div>
                </div>
                
                <!-- Popular Searches -->
                <div class="flex flex-wrap gap-2 mt-4">
                    <span class="text-white/30 text-xs">Popular:</span>
                    @foreach(['Residential', 'Commercial', 'Industrial', 'Renovation'] as $tag)
                    <a href="#" class="text-white/30 hover:text-gold transition-colors text-xs px-3 py-1 bg-white/5 rounded-full hover:bg-white/10 border border-white/5 hover:border-gold/30">
                        #{{ $tag }}
                    </a>
                    @endforeach
                </div>
            </div>

            <!-- Statistics -->
            <div class="mt-12 flex flex-wrap gap-4 animate-fade-in-up" style="animation-delay: 0.4s">
                @php
                    $stats = [
                        ['number' => '500+', 'label' => 'Companies', 'icon' => '🏢'],
                        ['number' => '10,000+', 'label' => 'Projects', 'icon' => '📐'],
                        ['number' => '50,000+', 'label' => 'Clients', 'icon' => '👥'],
                    ];
                @endphp
                
                @foreach($stats as $stat)
                <div class="group cursor-pointer">
                    <div class="flex items-center gap-4 px-6 py-4 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/5 hover:border-gold/30 transition-all duration-300 hover:scale-[1.02] hover:shadow-glow">
                        <span class="text-2xl group-hover:scale-110 transition-transform duration-300">{{ $stat['icon'] }}</span>
                        <div>
                            <div class="text-2xl sm:text-3xl font-['Playfair_Display'] font-bold text-gold group-hover:text-gold-light transition-colors">
                                {{ $stat['number'] }}
                            </div>
                            <div class="text-xs text-white/50 uppercase tracking-wider">{{ $stat['label'] }}</div>
                        </div>
                    </div>
                </div>
                @endforeach
            </div>

            <!-- Trust Badges -->
            <div class="mt-8 flex flex-wrap items-center gap-6 text-white/30 text-xs animate-fade-in-up" style="animation-delay: 0.5s">
                <span class="flex items-center gap-2">
                    <svg class="w-4 h-4 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
                    </svg>
                    Verified Companies
                </span>
                <span class="flex items-center gap-2">
                    <svg class="w-4 h-4 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                    Fast & Secure
                </span>
                <span class="flex items-center gap-2">
                    <svg class="w-4 h-4 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"/>
                    </svg>
                    M-Pesa & EcoCash
                </span>
            </div>
        </div>
    </div>

    <!-- Scroll Indicator -->
    <div class="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
        <div class="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center">
            <div class="w-1 h-3 bg-gold/50 rounded-full mt-2 animate-pulse"></div>
        </div>
    </div>
</section>

<!-- ============================================================
     FEATURES SECTION
     ============================================================ -->
<section class="py-24 bg-[#0A1628] relative overflow-hidden" aria-label="Features Section">
    <div class="absolute inset-0 bg-[url('/images/grid.svg')] opacity-5"></div>
    <div class="absolute top-0 right-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl"></div>
    
    <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Section Header -->
        <div class="text-center mb-16">
            <div class="inline-flex items-center gap-2 px-4 py-2 bg-gold/10 rounded-full mb-4">
                <span class="text-gold text-sm font-semibold uppercase tracking-wider">Why Choose Us</span>
            </div>
            <h2 class="font-['Playfair_Display'] text-3xl sm:text-4xl md:text-5xl text-white font-bold">
                Why Choose <span class="bg-gradient-to-r from-gold to-gold-light bg-clip-text text-transparent">Mofokeng Interconnect</span>
            </h2>
            <p class="mt-4 text-lg text-gray-400 max-w-2xl mx-auto">
                Connecting the construction industry like never before with trusted, verified professionals.
            </p>
        </div>
        
        <!-- Features Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            @php
                $features = [
                    [
                        'icon' => '✅',
                        'title' => 'Verified Companies',
                        'desc' => 'Every company is thoroughly vetted and verified for quality and reliability.',
                        'gradient' => 'from-emerald-500/10 to-teal-500/10',
                        'hover' => 'hover:border-emerald-400/50',
                    ],
                    [
                        'icon' => '📸',
                        'title' => 'Real Portfolios',
                        'desc' => 'View actual completed projects and see the quality of work firsthand.',
                        'gradient' => 'from-blue-500/10 to-indigo-500/10',
                        'hover' => 'hover:border-blue-400/50',
                    ],
                    [
                        'icon' => '💬',
                        'title' => 'Direct Messaging',
                        'desc' => 'Communicate directly with construction companies instantly and securely.',
                        'gradient' => 'from-purple-500/10 to-pink-500/10',
                        'hover' => 'hover:border-purple-400/50',
                    ],
                    [
                        'icon' => '🔒',
                        'title' => 'Secure Payments',
                        'desc' => 'M-Pesa, EcoCash, and bank payments all integrated securely.',
                        'gradient' => 'from-orange-500/10 to-red-500/10',
                        'hover' => 'hover:border-orange-400/50',
                    ],
                ];
            @endphp
            
            @foreach($features as $feature)
            <div class="group bg-[#111C2E] rounded-2xl p-8 shadow-card hover:shadow-card-hover transition-all duration-500 text-center hover:-translate-y-2 border border-white/5 {{ $feature['hover'] }} relative overflow-hidden">
                <div class="absolute inset-0 bg-gradient-to-br {{ $feature['gradient'] }} opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div class="relative w-16 h-16 bg-gold/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-gold group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                    <span class="text-3xl group-hover:text-[#0A1628] transition-colors duration-300">{{ $feature['icon'] }}</span>
                </div>
                
                <h3 class="relative text-xl font-semibold text-white group-hover:text-gold transition-colors duration-300">
                    {{ $feature['title'] }}
                </h3>
                <p class="relative mt-2 text-gray-400 text-sm leading-relaxed">
                    {{ $feature['desc'] }}
                </p>
                
                <div class="relative mt-4 text-gold font-semibold text-sm opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center gap-2">
                    Learn More
                    <svg class="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
                    </svg>
                </div>
            </div>
            @endforeach
        </div>

        <!-- Trust Indicators -->
        <div class="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
            <div class="text-center">
                <div class="text-3xl font-bold text-gold">98%</div>
                <div class="text-sm text-gray-400 mt-1">Client Satisfaction</div>
            </div>
            <div class="text-center">
                <div class="text-3xl font-bold text-gold">4.8★</div>
                <div class="text-sm text-gray-400 mt-1">Average Rating</div>
            </div>
            <div class="text-center">
                <div class="text-3xl font-bold text-gold">24/7</div>
                <div class="text-sm text-gray-400 mt-1">Customer Support</div>
            </div>
            <div class="text-center">
                <div class="text-3xl font-bold text-gold">100%</div>
                <div class="text-sm text-gray-400 mt-1">Data Security</div>
            </div>
        </div>
    </div>
</section>

<!-- ============================================================
     CTA SECTION
     ============================================================ -->
<section class="relative py-24 overflow-hidden" aria-label="Call to Action">
    <div class="absolute inset-0 bg-gradient-to-br from-[#0A1628] via-[#1A2A4A] to-[#0A1628]">
        <div class="absolute inset-0 bg-[url('/images/grid.svg')] opacity-10"></div>
        <div class="absolute top-0 left-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl"></div>
        <div class="absolute bottom-0 right-0 w-96 h-96 bg-gold/10 rounded-full blur-3xl"></div>
    </div>
    
    <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div class="max-w-4xl mx-auto bg-white/5 backdrop-blur-xl rounded-3xl p-8 sm:p-12 border border-white/10 shadow-2xl">
            <!-- Badge -->
            <div class="inline-flex items-center gap-2 px-5 py-2 bg-gold/20 rounded-full mb-6 border border-gold/30">
                <span class="text-gold text-sm font-semibold uppercase tracking-wider">🚀 Get Started Today</span>
            </div>
            
            <!-- Title -->
            <h2 class="font-['Playfair_Display'] text-3xl sm:text-4xl md:text-5xl text-white font-bold leading-tight">
                Ready to Build Africa's <span class="bg-gradient-to-r from-gold via-gold-light to-gold bg-clip-text text-transparent bg-[length:200%_auto] animate-shimmer">Future</span>?
            </h2>
            
            <p class="mt-4 text-lg text-white/60 max-w-2xl mx-auto">
                Join thousands of construction companies and clients already connected on our platform. Start building today!
            </p>
            
            <!-- CTA Buttons -->
            <div class="mt-10 flex flex-wrap justify-center gap-4">
                <a href="/register" class="px-8 py-4 bg-gradient-to-r from-gold to-gold-light text-[#0A1628] font-semibold rounded-xl hover:scale-[1.02] transition-all duration-300 shadow-lg hover:shadow-glow flex items-center gap-3 group">
                    <svg class="w-5 h-5 group-hover:rotate-12 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                    </svg>
                    Get Started Free
                    <svg class="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
                    </svg>
                </a>
                <a href="/about" class="px-8 py-4 border-2 border-white/20 text-white font-semibold rounded-xl hover:bg-white hover:text-[#0A1628] transition-all duration-300 flex items-center gap-2 group">
                    <svg class="w-5 h-5 group-hover:rotate-12 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                    Learn More
                </a>
            </div>
            
            <!-- Features List -->
            <div class="mt-8 flex flex-wrap justify-center gap-6 text-white/30 text-sm">
                <span class="flex items-center gap-2">
                    <svg class="w-4 h-4 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                    </svg>
                    No Credit Card Required
                </span>
                <span class="flex items-center gap-2">
                    <svg class="w-4 h-4 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                    14-Day Free Trial
                </span>
                <span class="flex items-center gap-2">
                    <svg class="w-4 h-4 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
                    </svg>
                    Cancel Anytime
                </span>
            </div>
        </div>
    </div>
</section>

<!-- ============================================================
     PARTNERS SECTION
     ============================================================ -->
<section class="py-16 bg-[#0A1628] border-t border-white/5" aria-label="Partners Section">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p class="text-center text-gray-400 text-sm uppercase tracking-wider mb-8">
            Trusted by construction companies across Africa
        </p>
        <div class="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
            @foreach(['🏗️ BuildCo Africa', '🏢 Skyline Constructors', '🌍 EcoBuild International', '🏠 HomeCraft Ltd', '🏛️ Urban Development Co'] as $partner)
            <div class="text-gray-400 font-semibold text-sm">{{ $partner }}</div>
            @endforeach
        </div>
    </div>
</section>
@endsection

@push('scripts')
<script>
    document.addEventListener('DOMContentLoaded', function() {
        'use strict';

        // Keyboard shortcut: Ctrl+K for search
        document.addEventListener('keydown', function(e) {
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                const searchInput = document.querySelector('input[type="text"][placeholder*="Search"]');
                if (searchInput) {
                    searchInput.focus();
                    searchInput.select();
                }
            }
        });

        // Smooth scroll for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                if (href !== '#') {
                    e.preventDefault();
                    const target = document.querySelector(href);
                    if (target) {
                        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                }
            });
        });

        console.log('🏗️ Mofokeng Interconnect - Homepage loaded successfully!');
        console.log('🌍 Building Africa\'s construction future.');
    });
</script>
@endpush
