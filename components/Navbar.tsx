
import React from 'react';
import { UtensilsCrossed, LayoutDashboard, Home, LogOut, Lock, Globe } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../utils/translations';

interface NavbarProps {
    currentView: 'home' | 'dashboard';
    setView: (view: 'home' | 'dashboard') => void;
    isAuthenticated: boolean;
    onLogout: () => void;
    language: Language;
    setLanguage: (lang: Language) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentView, setView, isAuthenticated, onLogout, language, setLanguage }) => {
    const t = translations[language].nav;

    return (
        <nav className="bg-emerald-900 text-orange-50 shadow-lg sticky top-0 z-50">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                <div className="flex items-center gap-2 cursor-pointer" onClick={() => setView('home')}>
                    <UtensilsCrossed className="w-8 h-8 text-amber-400" />
                    <h1 className="text-2xl font-bold tracking-wider hidden sm:block">{t.brand}</h1>
                </div>
                
                <div className="flex gap-2 md:gap-4 items-center">
                    <button 
                        onClick={() => setLanguage(language === 'ar' ? 'en' : 'ar')}
                        className="flex items-center gap-1 px-3 py-1.5 rounded-full hover:bg-emerald-800 transition-all text-xs md:text-sm font-medium border border-emerald-700"
                    >
                        <Globe size={14} />
                        <span>{language === 'ar' ? 'English' : 'عربي'}</span>
                    </button>

                    <button 
                        onClick={() => setView('home')}
                        className={`flex items-center gap-2 px-3 md:px-4 py-2 rounded-full transition-all text-sm md:text-base ${currentView === 'home' ? 'bg-amber-500 text-emerald-900 font-bold' : 'hover:bg-emerald-800'}`}
                    >
                        <Home size={18} />
                        <span className="hidden md:inline">{t.home}</span>
                    </button>
                    
                    <button 
                        onClick={() => setView('dashboard')}
                        className={`flex items-center gap-2 px-3 md:px-4 py-2 rounded-full transition-all text-sm md:text-base ${currentView === 'dashboard' ? 'bg-amber-500 text-emerald-900 font-bold' : 'hover:bg-emerald-800'}`}
                    >
                        {isAuthenticated ? <LayoutDashboard size={18} /> : <Lock size={18} />}
                        <span className="hidden md:inline">{t.dashboard}</span>
                    </button>

                    {isAuthenticated && (
                        <button 
                            onClick={onLogout}
                            className="flex items-center gap-2 px-3 md:px-4 py-2 rounded-full hover:bg-red-800/80 bg-red-900 text-white transition-all text-sm"
                            title={t.logout}
                        >
                            <LogOut size={18} />
                            <span className="hidden md:inline">{t.logout}</span>
                        </button>
                    )}
                </div>
            </div>
        </nav>
    );
};
