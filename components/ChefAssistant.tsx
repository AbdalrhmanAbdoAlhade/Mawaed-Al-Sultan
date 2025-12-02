
import React, { useState, useRef, useEffect } from 'react';
import { ChefHat, Send, X } from 'lucide-react';
import { sendMessageToChef } from '../services/geminiService';
import { ChatMessage, Language } from '../types';
import { translations } from '../utils/translations';

interface ChefAssistantProps {
    lang: Language;
}

export const ChefAssistant: React.FC<ChefAssistantProps> = ({ lang }) => {
    const t = translations[lang].chef;
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const hasInitialized = useRef(false);

    // Initial message effect
    useEffect(() => {
        if (!hasInitialized.current) {
            setMessages([{ role: 'model', text: t.welcome }]);
            hasInitialized.current = true;
        } else {
             // If language changes, we might want to update the first greeting only if it's the only message,
             // but usually better not to wipe chat history.
             // For now, we won't force update history on lang change to preserve context.
        }
    }, [t.welcome]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isOpen]);

    const handleSend = async () => {
        if (!input.trim() || loading) return;

        const userText = input;
        setInput('');
        setMessages(prev => [...prev, { role: 'user', text: userText }]);
        setLoading(true);

        const reply = await sendMessageToChef(userText);
        
        setMessages(prev => [...prev, { role: 'model', text: reply }]);
        setLoading(false);
    };

    return (
        <div className={`fixed bottom-6 z-50 flex flex-col items-end ${lang === 'ar' ? 'left-6' : 'right-6'}`}>
            {!isOpen && (
                <button 
                    onClick={() => setIsOpen(true)}
                    className="bg-amber-500 hover:bg-amber-400 text-emerald-950 p-4 rounded-full shadow-lg transition-transform hover:scale-110 flex items-center gap-2 group"
                >
                    <span className={`bg-white text-emerald-900 text-xs py-1 px-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity absolute whitespace-nowrap shadow-md ${lang === 'ar' ? 'right-full me-2' : 'left-full ms-2'}`}>
                        {t.badge}
                    </span>
                    <ChefHat size={28} />
                </button>
            )}

            {isOpen && (
                <div className="bg-white rounded-2xl shadow-2xl w-80 sm:w-96 overflow-hidden border border-amber-100 flex flex-col h-[500px] animate-fade-in-up">
                    {/* Header */}
                    <div className="bg-emerald-900 p-4 flex justify-between items-center text-white">
                        <div className="flex items-center gap-3">
                            <div className="bg-amber-500 p-1.5 rounded-full text-emerald-900">
                                <ChefHat size={20} />
                            </div>
                            <div>
                                <h3 className="font-bold text-sm">{t.name}</h3>
                                <p className="text-xs text-emerald-300">{t.role}</p>
                            </div>
                        </div>
                        <button onClick={() => setIsOpen(false)} className="text-emerald-300 hover:text-white transition-colors">
                            <X size={20} />
                        </button>
                    </div>

                    {/* Chat Area */}
                    <div className="flex-1 overflow-y-auto p-4 bg-gray-50 space-y-4">
                        {messages.map((msg, idx) => (
                            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-start' : 'justify-end'}`}>
                                <div className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                                    msg.role === 'user' 
                                        ? `bg-emerald-100 text-emerald-900 ${lang === 'ar' ? 'rounded-tr-none' : 'rounded-tl-none'}` 
                                        : `bg-white text-gray-800 shadow-sm border border-gray-100 ${lang === 'ar' ? 'rounded-tl-none' : 'rounded-tr-none'}`
                                }`}>
                                    {msg.text}
                                </div>
                            </div>
                        ))}
                        {loading && (
                            <div className="flex justify-end">
                                <div className={`bg-white shadow-sm border border-gray-100 px-4 py-3 rounded-2xl ${lang === 'ar' ? 'rounded-tl-none' : 'rounded-tr-none'}`}>
                                    <div className="flex gap-1">
                                        <div className="w-2 h-2 bg-amber-400 rounded-full animate-bounce"></div>
                                        <div className="w-2 h-2 bg-amber-400 rounded-full animate-bounce delay-100"></div>
                                        <div className="w-2 h-2 bg-amber-400 rounded-full animate-bounce delay-200"></div>
                                    </div>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input Area */}
                    <div className="p-3 bg-white border-t border-gray-100 flex gap-2">
                        <input 
                            type="text" 
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                            placeholder={t.placeholder}
                            className="flex-1 bg-gray-100 border-0 rounded-full px-4 py-2 text-sm focus:ring-2 focus:ring-amber-500 outline-none"
                        />
                        <button 
                            onClick={handleSend}
                            disabled={loading || !input.trim()}
                            className="bg-emerald-900 hover:bg-emerald-800 disabled:opacity-50 text-white p-2 rounded-full transition-colors"
                        >
                            <Send size={18} className={lang === 'ar' ? 'rotate-180' : ''} />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};
