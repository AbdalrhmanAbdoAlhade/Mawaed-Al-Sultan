
import React, { useState } from 'react';
import { Lock, User, KeyRound, ArrowRight } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../utils/translations';

interface LoginProps {
    onLogin: (success: boolean) => void;
    lang: Language;
}

export const Login: React.FC<LoginProps> = ({ onLogin, lang }) => {
    const t = translations[lang].login;
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        setTimeout(() => {
            if (username === 'admin' && password === 'admin123') {
                onLogin(true);
            } else {
                setError(t.error);
                setIsLoading(false);
            }
        }, 800);
    };

    return (
        <div className="min-h-[calc(100vh-80px)] flex items-center justify-center bg-gray-50 px-4">
            <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 animate-fade-in-up">
                <div className="bg-emerald-900 p-8 text-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')] opacity-10"></div>
                    <div className="relative z-10">
                        <div className="mx-auto bg-amber-500 w-16 h-16 rounded-full flex items-center justify-center mb-4 shadow-lg">
                            <Lock className="text-emerald-900 w-8 h-8" />
                        </div>
                        <h2 className="text-2xl font-bold text-white mb-2">{t.title}</h2>
                        <p className="text-emerald-200 text-sm">{t.subtitle}</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="p-8 space-y-6">
                    {error && (
                        <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg border border-red-100 text-center">
                            {error}
                        </div>
                    )}

                    <div className="space-y-1">
                        <label className="text-sm font-medium text-gray-700">{t.username}</label>
                        <div className="relative">
                            <User className={`absolute top-3 text-gray-400 w-5 h-5 ${lang === 'ar' ? 'right-3' : 'left-3'}`} />
                            <input 
                                type="text" 
                                required
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className={`w-full py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all ${lang === 'ar' ? 'pe-10 ps-4' : 'ps-10 pe-4'}`}
                                placeholder={t.username}
                            />
                        </div>
                    </div>

                    <div className="space-y-1">
                        <label className="text-sm font-medium text-gray-700">{t.password}</label>
                        <div className="relative">
                            <KeyRound className={`absolute top-3 text-gray-400 w-5 h-5 ${lang === 'ar' ? 'right-3' : 'left-3'}`} />
                            <input 
                                type="password" 
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className={`w-full py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all ${lang === 'ar' ? 'pe-10 ps-4' : 'ps-10 pe-4'}`}
                                placeholder="••••••••"
                            />
                        </div>
                    </div>

                    <button 
                        type="submit" 
                        disabled={isLoading}
                        className={`w-full bg-emerald-900 hover:bg-emerald-800 text-white font-bold py-3 rounded-lg shadow-lg transition-all flex items-center justify-center gap-2 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                    >
                        {isLoading ? (
                            <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                        ) : (
                            <>
                                <span>{t.button}</span>
                                <ArrowRight size={18} className={lang === 'ar' ? 'rotate-180' : ''} />
                            </>
                        )}
                    </button>
                    
                    <div className="text-center">
                        <p className="text-xs text-gray-400">
                            {t.hint}
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};
