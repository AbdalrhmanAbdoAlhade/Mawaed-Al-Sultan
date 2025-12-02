
import React from 'react';
import { CalendarCheck } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../utils/translations';

interface HeroProps {
    scrollToBooking: () => void;
    lang: Language;
}

export const Hero: React.FC<HeroProps> = ({ scrollToBooking, lang }) => {
    const t = translations[lang].hero;

    return (
        <div className="relative h-[500px] w-full bg-slate-900 flex items-center justify-center overflow-hidden">
            {/* Background Image with Overlay */}
            <div 
                className="absolute inset-0 z-0 opacity-60 bg-cover bg-center"
                style={{ backgroundImage: 'url("https://picsum.photos/id/431/1920/1080")' }}
            ></div>
            <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-transparent to-transparent z-0"></div>

            <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
                <h2 className="text-amber-400 text-xl md:text-2xl font-medium mb-4 tracking-widest">{t.subtitle}</h2>
                <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
                    {t.title}<br />
                    <span className="text-amber-500">{t.titleHighlight}</span>
                </h1>
                <p className="text-gray-200 text-lg md:text-xl mb-8 leading-relaxed">
                    {t.description}
                </p>
                <button 
                    onClick={scrollToBooking}
                    className="group bg-amber-500 hover:bg-amber-400 text-emerald-950 font-bold py-4 px-8 rounded-full text-lg shadow-lg hover:shadow-amber-500/50 transition-all flex items-center gap-3 mx-auto"
                >
                    <CalendarCheck className="w-6 h-6 group-hover:scale-110 transition-transform" />
                    {t.cta}
                </button>
            </div>
        </div>
    );
};
