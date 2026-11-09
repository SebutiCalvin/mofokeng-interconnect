import React, { Suspense, lazy } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import { HelmetProvider } from 'react-helmet-async';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import { queryClient } from './queryClient';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

// ============================================================
// LAZY LOAD PAGES FOR BETTER PERFORMANCE
// ============================================================
const HomePage = lazy(() => import('./pages/HomePage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const RegisterPage = lazy(() => import('./pages/RegisterPage'));
const ConstructorsPage = lazy(() => import('./pages/ConstructorsPage'));
const ConstructorDetailPage = lazy(() => import('./pages/ConstructorDetailPage'));
const ProjectsPage = lazy(() => import('./pages/ProjectsPage'));
const ProjectDetailPage = lazy(() => import('./pages/ProjectDetailPage'));
const TendersPage = lazy(() => import('./pages/TendersPage'));
const TenderDetailPage = lazy(() => import('./pages/TenderDetailPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const PricingPage = lazy(() => import('./pages/PricingPage'));
const BlogPage = lazy(() => import('./pages/BlogPage'));
const BlogDetailPage = lazy(() => import('./pages/BlogDetailPage'));
const FAQPage = lazy(() => import('./pages/FAQPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

// ============================================================
// CONSTRUCTOR PAGES (Authenticated)
// ============================================================
const ConstructorDashboard = lazy(() => import('./pages/constructor/ConstructorDashboard'));
const ConstructorProfile = lazy(() => import('./pages/constructor/ConstructorProfile'));
const ConstructorProjects = lazy(() => import('./pages/constructor/ConstructorProjects'));
const ProjectUpload = lazy(() => import('./pages/constructor/ProjectUpload'));
const ConstructorSubscriptions = lazy(() => import('./pages/constructor/ConstructorSubscriptions'));
const ConstructorMessages = lazy(() => import('./pages/constructor/ConstructorMessages'));
const ConstructorAnalytics = lazy(() => import('./pages/constructor/ConstructorAnalytics'));

// ============================================================
// CLIENT PAGES (Authenticated)
// ============================================================
const ClientDashboard = lazy(() => import('./pages/client/ClientDashboard'));
const ClientProfile = lazy(() => import('./pages/client/ClientProfile'));
const ClientTenders = lazy(() => import('./pages/client/ClientTenders'));
const ClientSaved = lazy(() => import('./pages/client/ClientSaved'));
const ClientMessages = lazy(() => import('./pages/client/ClientMessages'));

// ============================================================
// ADMIN PAGES (Authenticated + Admin Role)
// ============================================================
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'));
const AdminUsers = lazy(() => import('./pages/admin/AdminUsers'));
const AdminConstructors = lazy(() => import('./pages/admin/AdminConstructors'));
const AdminSubscriptions = lazy(() => import('./pages/admin/AdminSubscriptions'));
const AdminTenders = lazy(() => import('./pages/admin/AdminTenders'));
const AdminReports = lazy(() => import('./pages/admin/AdminReports'));
const AdminSettings = lazy(() => import('./pages/admin/AdminSettings'));
const AdminPayments = lazy(() => import('./pages/admin/AdminPayments'));

// ============================================================
// LOADING FALLBACK (light theme)
// ============================================================
const LoadingFallback = () => (
    <div className="min-h-[60vh] flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center">
            <div className="relative">
                <div className="w-16 h-16 border-4 border-gold/20 border-t-gold rounded-full animate-spin"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-gold font-bold text-sm font-['Space_Grotesk']">R</span>
                </div>
            </div>
            <p className="text-gray-500 mt-4 text-sm">Loading...</p>
        </div>
    </div>
);

// ============================================================
// PAGE WRAPPER WITH SUSPENSE
// ============================================================
const PageWrapper = ({ children }) => (
    <Suspense fallback={<LoadingFallback />}>
        {children}
    </Suspense>
);

// ============================================================
// MAIN APP COMPONENT
// ============================================================
const App = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <HelmetProvider>
                <BrowserRouter>
                    <Navigation />
                    <main className="min-h-screen pt-20 bg-gray-50">
                        <PageWrapper>
                            <Routes>
                                {/* PUBLIC ROUTES */}
                                <Route path="/" element={<HomePage />} />
                                <Route path="/login" element={<LoginPage />} />
                                <Route path="/register" element={<RegisterPage />} />

                                {/* CONSTRUCTOR PUBLIC ROUTES */}
                                <Route path="/constructors" element={<ConstructorsPage />} />
                                <Route path="/constructors/:slug" element={<ConstructorDetailPage />} />

                                {/* PROJECT ROUTES */}
                                <Route path="/projects" element={<ProjectsPage />} />
                                <Route path="/projects/:slug" element={<ProjectDetailPage />} />

                                {/* TENDER ROUTES */}
                                <Route path="/tenders" element={<TendersPage />} />
                                <Route path="/tenders/:id" element={<TenderDetailPage />} />

                                {/* STATIC PAGES */}
                                <Route path="/about" element={<AboutPage />} />
                                <Route path="/contact" element={<ContactPage />} />
                                <Route path="/pricing" element={<PricingPage />} />
                                <Route path="/blog" element={<BlogPage />} />
                                <Route path="/blog/:slug" element={<BlogDetailPage />} />
                                <Route path="/faq" element={<FAQPage />} />

                                {/* CONSTRUCTOR AUTHENTICATED */}
                                <Route path="/constructor/dashboard" element={<ConstructorDashboard />} />
                                <Route path="/constructor/profile" element={<ConstructorProfile />} />
                                <Route path="/constructor/projects" element={<ConstructorProjects />} />
                                <Route path="/constructor/projects/upload" element={<ProjectUpload />} />
                                <Route path="/constructor/subscriptions" element={<ConstructorSubscriptions />} />
                                <Route path="/constructor/messages" element={<ConstructorMessages />} />
                                <Route path="/constructor/analytics" element={<ConstructorAnalytics />} />

                                {/* CLIENT AUTHENTICATED */}
                                <Route path="/client/dashboard" element={<ClientDashboard />} />
                                <Route path="/client/profile" element={<ClientProfile />} />
                                <Route path="/client/tenders" element={<ClientTenders />} />
                                <Route path="/client/saved" element={<ClientSaved />} />
                                <Route path="/client/messages" element={<ClientMessages />} />

                                {/* ADMIN AUTHENTICATED */}
                                <Route path="/admin/dashboard" element={<AdminDashboard />} />
                                <Route path="/admin/users" element={<AdminUsers />} />
                                <Route path="/admin/constructors" element={<AdminConstructors />} />
                                <Route path="/admin/subscriptions" element={<AdminSubscriptions />} />
                                <Route path="/admin/tenders" element={<AdminTenders />} />
                                <Route path="/admin/reports" element={<AdminReports />} />
                                <Route path="/admin/settings" element={<AdminSettings />} />
                                <Route path="/admin/payments" element={<AdminPayments />} />

                                {/* 404 NOT FOUND */}
                                <Route path="*" element={<NotFoundPage />} />
                            </Routes>
                        </PageWrapper>
                    </main>
                    <Footer />

                    {/* TOAST NOTIFICATIONS */}
                    <Toaster
                        position="top-right"
                        toastOptions={{
                            duration: 4000,
                            style: {
                                background: '#FFFFFF',
                                color: '#1E1E2A',
                                border: '1px solid #E8E4DE',
                                borderRadius: '12px',
                                padding: '16px',
                            },
                            success: {
                                iconTheme: {
                                    primary: '#34D399',
                                    secondary: '#fff',
                                },
                            },
                            error: {
                                iconTheme: {
                                    primary: '#F87171',
                                    secondary: '#fff',
                                },
                            },
                        }}
                    />

                    {/* REACT QUERY DEVTOOLS */}
                    {import.meta.env.DEV && <ReactQueryDevtools initialIsOpen={false} />}
                </BrowserRouter>
            </HelmetProvider>
        </QueryClientProvider>
    );
};

// ============================================================
// MOUNT REACT APPLICATION
// ============================================================
const root = document.getElementById('app');

if (root) {
    const app = createRoot(root);
    app.render(
        <React.StrictMode>
            <App />
        </React.StrictMode>
    );
} else {
    console.error('❌ #app element not found! Make sure your layout has <div id="app"></div>');
}

// ============================================================
// DEVELOPMENT TOOLS
// ============================================================
if (import.meta.env.DEV) {
    console.log('🏗️ Mofokeng Interconnect - Development Mode');
    console.log('✅ React App mounted successfully!');
    console.log('📦 Routes:', {
        public: ['/', '/login', '/register', '/constructors', '/projects', '/tenders', '/about', '/contact'],
        constructor: ['/constructor/*'],
        client: ['/client/*'],
        admin: ['/admin/*'],
    });
    console.log('🚀 QueryClient initialized with React Query DevTools');
    console.log('🔔 Toast notifications ready (react-hot-toast)');
}

// ============================================================
// ERROR HANDLING FOR LAZY LOADING
// ============================================================
window.addEventListener('error', (event) => {
    if (event.target.tagName === 'SCRIPT' && event.target.src.includes('chunk')) {
        console.error('❌ Failed to load chunk:', event.target.src);
    }
});

export default App;
