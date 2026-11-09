import React from 'react';
import * as Icons from 'lucide-react';

export const Icon = ({ name, className = '', size = 24, gradient = false }) => {
    const IconComponent = Icons[name];
    if (!IconComponent) return null;

    if (gradient) {
        return (
            <div className="relative">
                <IconComponent 
                    className={`${className} text-transparent bg-gradient-to-br from-gold to-gold-light bg-clip-text`}
                    size={size}
                />
                <div className="absolute inset-0 blur-xl opacity-30 bg-gradient-to-br from-gold to-gold-light rounded-full" />
            </div>
        );
    }

    return <IconComponent className={className} size={size} />;
};
