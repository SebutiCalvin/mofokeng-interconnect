import toast from 'react-hot-toast';

export const useToast = () => {
    const success = (message, options = {}) => {
        toast.success(message, {
            duration: 3000,
            style: {
                background: '#111C2E',
                color: '#fff',
                border: '1px solid rgba(201, 169, 78, 0.3)',
            },
            ...options,
        });
    };

    const error = (message, options = {}) => {
        toast.error(message, {
            duration: 4000,
            style: {
                background: '#111C2E',
                color: '#fff',
                border: '1px solid rgba(239, 68, 68, 0.3)',
            },
            ...options,
        });
    };

    const info = (message, options = {}) => {
        toast(message, {
            duration: 3000,
            icon: 'ℹ️',
            style: {
                background: '#111C2E',
                color: '#fff',
                border: '1px solid rgba(59, 130, 246, 0.3)',
            },
            ...options,
        });
    };

    const loading = (message, options = {}) => {
        return toast.loading(message, {
            style: {
                background: '#111C2E',
                color: '#fff',
                border: '1px solid rgba(201, 169, 78, 0.3)',
            },
            ...options,
        });
    };

    return { success, error, info, loading };
};
