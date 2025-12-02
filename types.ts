
export type Language = 'ar' | 'en';

export interface Reservation {
    id: string;
    customerName: string;
    email: string;
    phone: string;
    date: string;
    time: string;
    guests: number;
    status: 'pending' | 'confirmed' | 'cancelled';
    notes?: string;
}

export interface MenuItem {
    id: number;
    nameAr: string;
    nameEn: string;
    descriptionAr: string;
    descriptionEn: string;
    price: number;
    image: string;
    category: 'main' | 'appetizer' | 'dessert' | 'drink';
}

export interface ChatMessage {
    role: 'user' | 'model';
    text: string;
}
