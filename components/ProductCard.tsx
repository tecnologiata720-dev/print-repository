import React from 'react';
import { Product } from '../types';

interface ProductCardProps {
    product: Product;
    isSelected: boolean;
    onSelect: (id: string) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, isSelected, onSelect }) => {
    const baseClasses = "group relative p-6 rounded-xl border transition-all duration-300 cursor-pointer overflow-hidden";
    const inactiveClasses = "bg-brand-light-secondary dark:bg-brand-dark-secondary border-slate-200 dark:border-slate-700 hover:border-brand-accent-dark dark:hover:border-brand-accent hover:shadow-lg";
    const activeClasses = "border-brand-accent dark:border-brand-accent ring-2 ring-brand-accent/50 dark:ring-brand-accent/50 shadow-lg shadow-brand-accent/20";
    
    return (
        <div
            className={`${baseClasses} ${isSelected ? activeClasses : inactiveClasses}`}
            onClick={() => onSelect(product.id)}
        >
            <div className="flex items-start space-x-4">
                {product.icon}
                <div className="flex-1">
                    <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100">{product.name}</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">{product.description}</p>
                    <p className="text-sm text-brand-accent-dark dark:text-brand-accent font-medium mt-1">{product.recommended}</p>
                </div>
            </div>
             <div className={`absolute -bottom-12 -right-12 w-24 h-24 bg-brand-accent/10 dark:bg-brand-accent/5 rounded-full transition-transform duration-500 ${isSelected ? 'scale-[6]' : 'group-hover:scale-[3]'}`}></div>
        </div>
    );
};

export default ProductCard;
