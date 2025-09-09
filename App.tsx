import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import ProductSelector from './components/ProductSelector';
import Footer from './components/Footer';
import ImageEditor from './components/ImageEditor';
import { Product } from './types';

function App() {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      const storedTheme = window.localStorage.getItem('theme');
      if (storedTheme) {
        return storedTheme;
      }
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'dark';
  });

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'dark' ? 'light' : 'dark'));
  };

  const handleProductSelect = (product: Product) => {
    setSelectedProduct(product);
  };

  const handleBackToSelector = () => {
    setSelectedProduct(null);
  }

  return (
    <div className="min-h-screen bg-brand-light dark:bg-brand-dark text-slate-800 dark:text-slate-200 font-sans transition-colors duration-300">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <Header theme={theme} toggleTheme={toggleTheme} />
        <main className="mt-12 md:mt-16">
          {!selectedProduct ? (
            <ProductSelector onProductSelect={handleProductSelect} />
          ) : (
            <ImageEditor product={selectedProduct} onBack={handleBackToSelector} />
          )}
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default App;
