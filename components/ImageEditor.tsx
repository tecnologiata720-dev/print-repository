import React, { useState, useCallback, useRef } from 'react';
import { Product } from '../types';

interface ImageEditorProps {
    product: Product;
    onBack: () => void;
}

const ArrowLeftIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 mr-2">
        <line x1="19" y1="12" x2="5" y2="12"></line>
        <polyline points="12 19 5 12 12 5"></polyline>
    </svg>
);

const UploadIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-12 h-12 mx-auto text-slate-400 dark:text-slate-500">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
        <polyline points="17 8 12 3 7 8"></polyline>
        <line x1="12" y1="3" x2="12" y2="15"></line>
    </svg>
);


const ImageEditor: React.FC<ImageEditorProps> = ({ product, onBack }) => {
    const [image, setImage] = useState<string | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (files: FileList | null) => {
        if (files && files[0]) {
            const file = files[0];
            if (file.type.startsWith('image/')) {
                const reader = new FileReader();
                reader.onloadend = () => {
                    setImage(reader.result as string);
                };
                reader.readAsDataURL(file);
            } else {
                alert("Por favor, selecciona un archivo de imagen.");
            }
        }
    };

    const onDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(true);
    }, []);

    const onDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(false);
    }, []);

    const onDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(false);
        handleFileChange(e.dataTransfer.files);
    }, []);
    
    const onUploadAreaClick = () => {
        fileInputRef.current?.click();
    };

    return (
        <section>
            <button onClick={onBack} className="flex items-center px-4 py-2 mb-8 text-sm font-medium rounded-lg text-slate-600 dark:text-slate-300 bg-brand-light-secondary dark:bg-brand-dark-secondary hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
                <ArrowLeftIcon />
                Volver a seleccionar producto
            </button>

            <div className="text-center">
                <h2 className="text-2xl md:text-3xl font-bold">
                    2. Carga tu imagen para: <span className="text-brand-accent">{product.name}</span>
                </h2>
                <p className="text-slate-600 dark:text-slate-400 mt-2">
                    {product.description} &bull; {product.recommended}
                </p>
            </div>

            <div className="mt-8 max-w-3xl mx-auto">
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={(e) => handleFileChange(e.target.files)}
                    accept="image/*"
                    className="hidden"
                />
                <div
                    onClick={onUploadAreaClick}
                    onDragOver={onDragOver}
                    onDragLeave={onDragLeave}
                    onDrop={onDrop}
                    className={`relative flex justify-center items-center w-full h-80 rounded-xl border-2 border-dashed  transition-all duration-300 cursor-pointer
                        ${isDragging ? 'border-brand-accent bg-brand-accent/10' : 'border-slate-300 dark:border-slate-600 hover:border-brand-accent-dark dark:hover:border-brand-accent'}
                        ${image ? 'border-solid p-0' : 'p-6'}`}
                >
                    {image ? (
                         <img src={image} alt="Preview" className="object-contain w-full h-full rounded-xl" />
                    ) : (
                        <div className="text-center">
                            <UploadIcon />
                            <p className="mt-4 font-semibold text-slate-700 dark:text-slate-200">Arrastra y suelta una imagen aquí</p>
                            <p className="text-sm text-slate-500 dark:text-slate-400">o haz clic para seleccionar un archivo</p>
                            <p className="text-xs text-slate-400 dark:text-slate-500 mt-2">PNG, JPG, WEBP, etc.</p>
                        </div>
                    )}
                </div>
            </div>
            
            {image && (
                 <div className="mt-8 text-center">
                     <h2 className="text-2xl md:text-3xl font-bold">
                         3. Edita y genera tu diseño
                     </h2>
                     <div className="p-8 mt-4 rounded-xl bg-brand-light-secondary dark:bg-brand-dark-secondary">
                        <p className="text-slate-500">Aquí irán las herramientas de edición de IA.</p>
                     </div>
                 </div>
            )}
        </section>
    );
};

export default ImageEditor;
