import React from 'react';
import { Product } from './types';

// SVG Icons as React Components
const MugIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 text-brand-accent">
        <path d="M10 21h4a2 2 0 0 0 2-2V7H8v12a2 2 0 0 0 2 2z"></path>
        <path d="M16 7h2a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-2"></path>
        <path d="M6 7H4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h2"></path>
    </svg>
);

const MousePadIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 text-brand-accent">
        <path d="M4 3a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2H4z"></path>
        <path d="M8 11V7"></path>
        <path d="M12 11V7"></path>
        <path d="M16 11V7"></path>
    </svg>
);

const CoasterSquareIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 text-brand-accent">
        <circle cx="12" cy="12" r="1" fill="currentColor"></circle>
        <circle cx="17" cy="12" r="1" fill="currentColor"></circle>
        <circle cx="7" cy="12" r="1" fill="currentColor"></circle>
        <circle cx="12" cy="7" r="1" fill="currentColor"></circle>
        <circle cx="12" cy="17" r="1" fill="currentColor"></circle>
    </svg>
);

const CoasterCircularIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 text-brand-accent">
        <circle cx="12" cy="12" r="10" stroke="none" fill="currentColor" fillOpacity="0.1"></circle>
        <circle cx="12" cy="12" r="1" fill="currentColor"></circle>
        <circle cx="16.3" cy="14.5" r="1" fill="currentColor"></circle>
        <circle cx="16.3" cy="9.5" r="1" fill="currentColor"></circle>
        <circle cx="7.7" cy="14.5" r="1" fill="currentColor"></circle>
        <circle cx="7.7" cy="9.5" r="1" fill="currentColor"></circle>
    </svg>
);

const MagnetIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 text-brand-accent">
        <rect x="3" y="4" width="18" height="16" rx="2"></rect>
        <line x1="7" y1="12" x2="17" y2="12"></line>
    </svg>
);

const BottleIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 text-brand-accent">
        <path d="M10 2v2"></path>
        <path d="M14 2v2"></path>
        <path d="M10 20.5A4.5 4.5 0 0 1 5.5 16V8h13v8a4.5 4.5 0 0 1-4.5 4.5h-4z"></path>
        <path d="M8 8V6a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
    </svg>
);


export const PRODUCTS: Product[] = [
    {
        id: 'mug-11oz',
        name: 'Taza 11 oz',
        icon: <MugIcon />,
        description: 'Área imprimible: 20 x 9 cm',
        recommended: 'Recomendado: 2362 x 1063 px',
    },
    {
        id: 'mousepad',
        name: 'PadMouse',
        icon: <MousePadIcon />,
        description: 'Dimensiones: 22 x 18 cm',
        recommended: 'Recomendado: 2598 x 2126 px',
    },
    {
        id: 'coaster-square',
        name: 'PosaVasos (Cuadrado)',
        icon: <CoasterSquareIcon />,
        description: 'Dimensiones: 9 x 9 cm',
        recommended: 'Recomendado: 1063 x 1063 px',
    },
    {
        id: 'coaster-circular',
        name: 'PosaVasos (Circular)',
        icon: <CoasterCircularIcon />,
        description: 'Diámetro: 9 cm',
        recommended: 'Recomendado: 1063 x 1063 px',
    },
    {
        id: 'magnet',
        name: 'Imán',
        icon: <MagnetIcon />,
        description: 'Dimensiones: 7 x 5 cm',
        recommended: 'Recomendado: 827 x 591 px',
    },
    {
        id: 'bottle-600ml',
        name: 'Tomatodo 600ml',
        icon: <BottleIcon />,
        description: 'Circunferencia imprimible: 23 x 18 cm',
        recommended: 'Recomendado: 2717 x 2126 px',
    },
];
