import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || '/api';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
});

// Request interceptor
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('auth_token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Response interceptor
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem('auth_token');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

// API endpoints
export const auth = {
    register: (data) => api.post('/register', data),
    login: (data) => api.post('/login', data),
    logout: () => api.post('/logout'),
    user: () => api.get('/user'),
};

export const constructors = {
    getAll: (params) => api.get('/constructors', { params }),
    get: (slug) => api.get(`/constructors/${slug}`),
    updateProfile: (data) => api.put('/constructor/profile', data),
    uploadLogo: (file) => {
        const formData = new FormData();
        formData.append('logo', file);
        return api.post('/constructor/profile/logo', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
    },
};

export const projects = {
    getAll: (params) => api.get('/projects', { params }),
    get: (slug) => api.get(`/projects/${slug}`),
    create: (data) => api.post('/constructor/projects', data),
    update: (id, data) => api.put(`/constructor/projects/${id}`, data),
    delete: (id) => api.delete(`/constructor/projects/${id}`),
    uploadImage: (projectId, file) => {
        const formData = new FormData();
        formData.append('image', file);
        return api.post(`/constructor/projects/${projectId}/images`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
    },
};

export const tenders = {
    getAll: (params) => api.get('/tenders', { params }),
    get: (id) => api.get(`/tenders/${id}`),
    create: (data) => api.post('/client/tenders', data),
    apply: (id, data) => api.post(`/tenders/${id}/apply`, data),
};

export const messages = {
    getAll: () => api.get('/messages'),
    send: (data) => api.post('/messages', data),
    markRead: (id) => api.put(`/messages/${id}/read`),
};

export const subscriptions = {
    getAll: () => api.get('/subscriptions'),
    subscribe: (data) => api.post('/subscriptions', data),
    cancel: (id) => api.post(`/subscriptions/${id}/cancel`),
};

export const admin = {
    dashboard: () => api.get('/admin/dashboard'),
    users: () => api.get('/admin/users'),
    approveConstructor: (id) => api.put(`/admin/constructors/${id}/approve`),
    suspendConstructor: (id) => api.put(`/admin/constructors/${id}/suspend`),
};

// Default export for useAuth
export default api;
