import React, { useState, useCallback, useRef } from 'react';
import { Product } from '../types';
import { GoogleGenAI, Modality } from '@google/genai';


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
    
    // AI Editing State
    const [prompt, setPrompt] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [generatedImage, setGeneratedImage] = useState<string | null>(null);
    const [generatedText, setGeneratedText] = useState<string | null>(null);

    const handleFileChange = (files: FileList | null) => {
        if (files && files[0]) {
            const file = files[0];
            if (file.type.startsWith('image/')) {
                const reader = new FileReader();
                reader.onloadend = () => {
                    setImage(reader.result as string);
                    // Reset AI state when a new image is uploaded
                    setGeneratedImage(null);
                    setGeneratedText(null);
                    setPrompt('');
                    setError(null);
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
        if (!image) {
          fileInputRef.current?.click();
        }
    };
    
    function dataUrlToBlob(dataUrl: string): { mimeType: string, data: string } {
        const parts = dataUrl.split(',');
        const mimeType = parts[0].match(/:(.*?);/)?.[1] || 'image/png';
        const data = parts[1];
        return { mimeType, data };
    }

    const handleGenerate = async () => {
        if (!image || !prompt) {
            setError('Por favor, sube una imagen y escribe una instrucción.');
            return;
        }
        setIsLoading(true);
        setError(null);
        setGeneratedImage(null);
        setGeneratedText(null);

        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });
            const { mimeType, data } = dataUrlToBlob(image);

            const imagePart = {
                inlineData: {
                    mimeType,
                    data,
                },
            };
            const textPart = { text: prompt };

            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash-image-preview',
                contents: { parts: [imagePart, textPart] },
                config: {
                    responseModalities: [Modality.IMAGE, Modality.TEXT],
                },
            });

            if (response.candidates && response.candidates.length > 0) {
                 let foundImage = false;
                for (const part of response.candidates[0].content.parts) {
                    if (part.text) {
                        setGeneratedText(part.text);
                    } else if (part.inlineData) {
                        const newImageDataUrl = `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
                        setGeneratedImage(newImageDataUrl);
                        foundImage = true;
                    }
                }
                if (!foundImage) {
                   setError('La IA no devolvió una imagen. Intenta con un prompt diferente.');
                }
            } else {
               setError('No se pudo generar una respuesta. Inténtalo de nuevo.');
            }

        } catch (e) {
            console.error(e);
            setError('Ocurrió un error al contactar la API de IA. Revisa la consola para más detalles.');
        } finally {
            setIsLoading(false);
        }
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
                    className={`relative flex justify-center items-center w-full min-h-[20rem] rounded-xl border-2 border-dashed  transition-all duration-300
                        ${!image ? 'cursor-pointer' : ''}
                        ${isDragging ? 'border-brand-accent bg-brand-accent/10' : 'border-slate-300 dark:border-slate-600'}
                        ${!image && 'hover:border-brand-accent-dark dark:hover:border-brand-accent'}
                        ${image ? 'border-solid p-0' : 'p-6'}`}
                >
                    {image ? (
                         <img src={image} alt="Preview" className="object-contain w-full h-full max-h-[32rem] rounded-xl" />
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
                 <div className="mt-12 text-center">
                     <h2 className="text-2xl md:text-3xl font-bold">
                         3. Edita y genera tu diseño con IA
                     </h2>
                     <div className="p-6 mt-4 rounded-xl bg-brand-light-secondary dark:bg-brand-dark-secondary max-w-4xl mx-auto">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                            <div className="flex flex-col items-center">
                                <h4 className="font-bold mb-2 text-slate-700 dark:text-slate-300">Imagen Original</h4>
                                <img src={image} alt="Original" className="object-contain rounded-lg border border-slate-300 dark:border-slate-600 max-h-80" />
                            </div>
                            <div className="flex flex-col items-center">
                                <h4 className="font-bold mb-2 text-slate-700 dark:text-slate-300">Resultado Generado</h4>
                                <div className="w-full aspect-square bg-slate-200 dark:bg-slate-700 rounded-lg flex items-center justify-center border border-slate-300 dark:border-slate-600 max-h-80">
                                     {isLoading ? (
                                        <div className="flex flex-col items-center">
                                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-accent"></div>
                                            <p className="text-sm mt-2 text-slate-500">Generando...</p>
                                        </div>
                                    ) : generatedImage ? (
                                        <img src={generatedImage} alt="Generated" className="object-contain w-full h-full rounded-lg" />
                                    ) : (
                                        <p className="text-sm text-slate-500 px-4">Aquí aparecerá tu imagen editada.</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {generatedText && (
                            <p className="mt-4 text-center text-sm p-3 bg-brand-accent/10 rounded-md text-slate-600 dark:text-slate-300">{generatedText}</p>
                        )}
                        
                        <div className="mt-6 text-left">
                             <label htmlFor="prompt-input" className="block font-semibold text-slate-700 dark:text-slate-200 mb-2">Describe los cambios que quieres hacer:</label>
                             <textarea
                                id="prompt-input"
                                rows={3}
                                value={prompt}
                                onChange={(e) => setPrompt(e.target.value)}
                                placeholder="Ej: Añade un sombrero de fiesta al personaje principal"
                                className="w-full p-3 rounded-lg border bg-brand-light dark:bg-brand-dark border-slate-300 dark:border-slate-600 focus:ring-2 focus:ring-brand-accent focus:border-brand-accent outline-none transition"
                                disabled={isLoading}
                                aria-label="Instrucciones de edición de imagen"
                             />
                        </div>

                        <button
                            onClick={handleGenerate}
                            disabled={isLoading || !prompt.trim()}
                            className="mt-4 w-full px-6 py-3 font-bold text-white bg-brand-accent-dark rounded-lg hover:bg-brand-accent transition-transform hover:scale-105 disabled:bg-slate-500 disabled:cursor-not-allowed disabled:scale-100 flex items-center justify-center"
                        >
                            {isLoading ? (
                                <>
                                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                                    Generando...
                                </>
                            ) : (
                                'Generar Diseño'
                            )}
                        </button>

                         {error && <p className="mt-4 text-sm text-red-500" role="alert">{error}</p>}
                     </div>
                 </div>
            )}
        </section>
    );
};

export default ImageEditor;
