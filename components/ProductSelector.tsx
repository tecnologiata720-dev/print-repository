import React, { useState } from 'react';
import { PRODUCTS } from '../constants';
import ProductCard from './ProductCard';

const ProductSelector: React.FC = () => {
    const [selectedProductId, setSelectedProductId] = useState<string | null>(null);

    return (
        <section>
            <h2 className="text-2xl md:text-3xl font-bold text-center">
                1. Selecciona un producto para empezar
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8 max-w-6xl mx-auto">
                {PRODUCTS.map((product) => (
                    <ProductCard
                        key={product.id}
                        product={product}
                        isSelected={selectedProductId === product.id}
                        onSelect={setSelectedProductId}
                    />
                ))}
            </div>
        </section>
    );
};

export default ProductSelector;
