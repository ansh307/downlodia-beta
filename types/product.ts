export interface Product {
  id: string;
  title: string;
  price: number;
  isFeatured: boolean;
  categoryId: string | null;
  desc: string | null;
  brief: string | null;
  originalPrice: number
  discount: number
  image: string | null;
  images: string[];
  badge: string | null;
  tools: string[];
  features: string[];
  compatibleWith: string[];
  driveLink: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;

  description?: string | null;
  imageUrl?: string[];
}


export interface Bundle {
  id: string;
  title: string;
  price: number;
  isFeatured: boolean;
  desc: string | null;
  originalPrice: number; // ✅ FIX
  discount: number; // ✅ FIX
  badge: string | null;
  features: string[];
  driveLink: string | null;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
