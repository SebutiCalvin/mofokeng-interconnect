import React from 'react';
import { useFormContext } from 'react-hook-form';

export const Input = ({ name, label, type = 'text', placeholder, required, className = '' }) => {
    const {
        register,
        formState: { errors },
    } = useFormContext();

    const error = errors[name];

    return (
        <div className="space-y-1">
            {label && (
                <label className="block text-sm font-medium text-gray-300">
                    {label}
                    {required && <span className="text-red-400 ml-1">*</span>}
                </label>
            )}
            <input
                type={type}
                placeholder={placeholder}
                className={`w-full px-4 py-3 bg-[#1A2A4A] border ${
                    error ? 'border-red-500' : 'border-white/10'
                } rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-gold/50 transition-colors ${className}`}
                {...register(name)}
            />
            {error && (
                <p className="text-sm text-red-400 mt-1">{error.message}</p>
            )}
        </div>
    );
};
