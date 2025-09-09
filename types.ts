import type React from 'react';

export interface Product {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
  recommended: string;
}
