
import React, { useState } from 'react';
import { MenuItem, Language } from '../types';
import { translations } from '../utils/translations';

interface MenuProps {
    items: MenuItem[];
    lang: Language;
}

export const Menu: React.FC<MenuProps> = ({ items, lang }) => {
    const [activeCategory, setActiveCategory] = useState<string>('all');
    const t = translations[lang].menu;

    const filteredItems = activeCategory === 'all' 
        ? items 
        : items.filter(item => item.category === activeCategory);

    return (
        <section className="py-16 bg-orange-50">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h3 className="text-amber-600 font-bold tracking-wider mb-2">{t.title}</h3>
                    <h2 className="text-4xl font-bold text-emerald-950">{t.subtitle}</h2>
                </div>

                <div className="flex justify-center gap-2 md:gap-4 mb-10 flex-wrap">
                    {['all', 'main', 'appetizer', 'dessert', 'drink'].map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`px-6 py-2 rounded-full border-2 font-medium transition-all ${
                                activeCategory === cat 
                                    ? 'bg-emerald-800 border-emerald-800 text-white' 
                                    : 'border-emerald-800 text-emerald-800 hover:bg-emerald-100'
                            }`}
                        >
                            {cat === 'all' && t.all}
                            {cat === 'main' && t.main}
                            {cat === 'appetizer' && t.appetizer}
                            {cat === 'dessert' && t.dessert}
                            {cat === 'drink' && t.drink}
                        </button>
                    ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredItems.map(item => (
                        <div key={item.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 group">
                            <div className="h-48 overflow-hidden">
                                <img 
                                    src={item.image} 
                                    alt={lang === 'ar' ? item.nameAr : item.nameEn} 
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                            </div>
                            <div className="p-6">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="text-xl font-bold text-emerald-900">
                                        {lang === 'ar' ? item.nameAr : item.nameEn}
                                    </h3>
                                    <span className="text-amber-600 font-bold text-lg">
                                        {item.price} <span className="text-xs">{t.sar}</span>
                                    </span>
                                </div>
                                <p className="text-gray-600 text-sm">
                                    {lang === 'ar' ? item.descriptionAr : item.descriptionEn}
                                </p>
                            </div>
                        </div>
                    ))}
                    {filteredItems.length === 0 && (
                        <div className="col-span-full text-center py-12 text-gray-500">
                            {t.empty}
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};
