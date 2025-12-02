
import React, { useState } from 'react';
import { Reservation, Language } from '../types';
import { Calendar, Clock, User, Phone, Users, CheckCircle, Mail } from 'lucide-react';
import { translations } from '../utils/translations';

interface ReservationFormProps {
    addReservation: (res: Reservation) => void;
    lang: Language;
}

export const ReservationForm: React.FC<ReservationFormProps> = ({ addReservation, lang }) => {
    const t = translations[lang].form;
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        date: '',
        time: '',
        guests: 2
    });
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newReservation: Reservation = {
            id: Math.random().toString(36).substr(2, 9),
            customerName: formData.name,
            email: formData.email,
            phone: formData.phone,
            date: formData.date,
            time: formData.time,
            guests: formData.guests,
            status: 'pending'
        };
        addReservation(newReservation);
        setSubmitted(true);
        // Reset after 5 seconds
        setTimeout(() => {
            setSubmitted(false);
            setFormData({ name: '', email: '', phone: '', date: '', time: '', guests: 2 });
        }, 5000);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    if (submitted) {
        return (
            <div className="bg-emerald-50 p-12 rounded-2xl shadow-xl text-center border border-emerald-200 animate-fade-in-up">
                <CheckCircle className="w-20 h-20 text-emerald-500 mx-auto mb-6" />
                <h3 className="text-3xl font-bold text-emerald-900 mb-2">{t.successTitle}</h3>
                <p className="text-emerald-700 text-lg mb-4">{t.successMsg}</p>
                <p className="text-sm text-emerald-600">{t.copySent} {formData.email}</p>
            </div>
        );
    }

    return (
        <div className="bg-white p-8 md:p-10 rounded-2xl shadow-xl border-t-4 border-amber-500">
            <h3 className="text-2xl font-bold text-emerald-900 mb-8 text-center">{t.title}</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="relative">
                        <label className="block text-sm font-medium text-gray-700 mb-1">{t.name}</label>
                        <div className="relative">
                            <User className={`absolute top-3 text-gray-400 w-5 h-5 ${lang === 'ar' ? 'right-3' : 'left-3'}`} />
                            <input 
                                required
                                type="text" 
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className={`w-full py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all ${lang === 'ar' ? 'pe-10 ps-4' : 'ps-10 pe-4'}`}
                                placeholder={t.namePlaceholder}
                            />
                        </div>
                    </div>

                    <div className="relative">
                        <label className="block text-sm font-medium text-gray-700 mb-1">{t.email}</label>
                        <div className="relative">
                            <Mail className={`absolute top-3 text-gray-400 w-5 h-5 ${lang === 'ar' ? 'right-3' : 'left-3'}`} />
                            <input 
                                required
                                type="email" 
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className={`w-full py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all ${lang === 'ar' ? 'pe-10 ps-4' : 'ps-10 pe-4'}`}
                                placeholder="example@email.com"
                            />
                        </div>
                    </div>

                    <div className="relative">
                        <label className="block text-sm font-medium text-gray-700 mb-1">{t.phone}</label>
                        <div className="relative">
                            <Phone className={`absolute top-3 text-gray-400 w-5 h-5 ${lang === 'ar' ? 'right-3' : 'left-3'}`} />
                            <input 
                                required
                                type="tel" 
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                className={`w-full py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all ${lang === 'ar' ? 'pe-10 ps-4' : 'ps-10 pe-4'}`}
                                placeholder="05xxxxxxxx"
                            />
                        </div>
                    </div>

                    <div className="relative">
                        <label className="block text-sm font-medium text-gray-700 mb-1">{t.date}</label>
                        <div className="relative">
                            <Calendar className={`absolute top-3 text-gray-400 w-5 h-5 ${lang === 'ar' ? 'right-3' : 'left-3'}`} />
                            <input 
                                required
                                type="date" 
                                name="date"
                                value={formData.date}
                                onChange={handleChange}
                                className={`w-full py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all ${lang === 'ar' ? 'pe-10 ps-4' : 'ps-10 pe-4'}`}
                            />
                        </div>
                    </div>

                    <div className="relative">
                        <label className="block text-sm font-medium text-gray-700 mb-1">{t.time}</label>
                        <div className="relative">
                            <Clock className={`absolute top-3 text-gray-400 w-5 h-5 ${lang === 'ar' ? 'right-3' : 'left-3'}`} />
                            <input 
                                required
                                type="time" 
                                name="time"
                                value={formData.time}
                                onChange={handleChange}
                                className={`w-full py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all ${lang === 'ar' ? 'pe-10 ps-4' : 'ps-10 pe-4'}`}
                            />
                        </div>
                    </div>

                    <div className="relative">
                        <label className="block text-sm font-medium text-gray-700 mb-1">{t.guests}</label>
                        <div className="relative">
                            <Users className={`absolute top-3 text-gray-400 w-5 h-5 ${lang === 'ar' ? 'right-3' : 'left-3'}`} />
                            <select 
                                name="guests" 
                                value={formData.guests}
                                onChange={handleChange}
                                className={`w-full py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all bg-white ${lang === 'ar' ? 'pe-10 ps-4' : 'ps-10 pe-4'}`}
                            >
                                {[1,2,3,4,5,6,7,8,9,10,12,15].map(n => (
                                    <option key={n} value={n}>{n} {t.guestsOption}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                <button 
                    type="submit" 
                    className="w-full bg-emerald-800 hover:bg-emerald-900 text-white font-bold py-4 rounded-lg shadow-lg hover:shadow-xl transition-all text-lg"
                >
                    {t.submit}
                </button>
            </form>
        </div>
    );
};
