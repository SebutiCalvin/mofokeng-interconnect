<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" class="scroll-smooth">
<head>
    <link rel="manifest" href="/manifest.json">
<link rel="apple-touch-icon" href="/images/icon-192x192.png">
<meta name="theme-color" content="#0A1628">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <meta name="theme-color" content="#0A1628">
    
    <!-- SEO Meta Tags -->
    <meta name="description" content="@yield('description', 'Mofokeng Interconnect - Africa\'s Premier Construction Marketplace')">
    <meta name="keywords" content="@yield('keywords', 'construction, marketplace, Africa, contractors, building, projects, tenders')">
    
    <title>@yield('title', 'Mofokeng Interconnect - Construction Marketplace')</title>
    
    <!-- Preconnect for Performance -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link rel="dns-prefetch" href="https://fonts.googleapis.com">
    <link rel="dns-prefetch" href="https://fonts.gstatic.com">
    
    <!-- Google Fonts - Premium Collection -->
    <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;0,800;1,400&family=Inter:wght@300;400;500;600;700;800;900&family=Space+Grotesk:wght@400;500;600;700&display=swap" rel="stylesheet">
    
    <!-- Vite Assets -->
    @viteReactRefresh
    @vite(['resources/css/app.css', 'resources/js/app.jsx'])
    
    @stack('styles')
</head>
<body class="font-sans antialiased text-white bg-[#0A1628] overflow-x-hidden">
    <!-- React Root - All content rendered by React -->
    <div id="app"></div>

    @stack('scripts')
</body>
</html>
