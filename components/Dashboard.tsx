
import React, { useMemo, useState } from 'react';
import { Reservation, MenuItem, Language } from '../types';
import { Check, X, Clock, Users, Calendar, Search, TrendingUp, Plus, Edit, Trash2, Image as ImageIcon } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { translations } from '../utils/translations';

interface DashboardProps {
    reservations: Reservation[];
    updateStatus: (id: string, status: 'confirmed' | 'cancelled') => void;
    menuItems: MenuItem[];
    onAddMenuItem: (item: Omit<MenuItem, 'id'>) => void;
    onUpdateMenuItem: (id: number, item: Partial<MenuItem>) => void;
    onDeleteMenuItem: (id: number) => void;
    lang: Language;
}

export const Dashboard: React.FC<DashboardProps> = ({ 
    reservations, 
    updateStatus,
    menuItems,
    onAddMenuItem,
    onUpdateMenuItem,
    onDeleteMenuItem,
    lang
}) => {
    const t = translations[lang].dashboard;
    const [activeTab, setActiveTab] = useState<'reservations' | 'menu'>('reservations');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<MenuItem | null>(null);

    // Form State
    const [formData, setFormData] = useState({
        nameAr: '',
        nameEn: '',
        descriptionAr: '',
        descriptionEn: '',
        price: '',
        category: 'main',
        image: ''
    });

    // Stats calculation
    const stats = useMemo(() => {
        const total = reservations.length;
        const pending = reservations.filter(r => r.status === 'pending').length;
        const confirmed = reservations.filter(r => r.status === 'confirmed').length;
        const cancelled = reservations.filter(r => r.status === 'cancelled').length;
        
        // Calculate Busiest Day
        const dayCounts: Record<string, number> = {};
        reservations.forEach(r => {
            const date = new Date(r.date);
            const locale = lang === 'ar' ? 'ar-SA' : 'en-US';
            const dayName = date.toLocaleDateString(locale, { weekday: 'long' });
            dayCounts[dayName] = (dayCounts[dayName] || 0) + 1;
        });
        const busiestDay = Object.entries(dayCounts).sort((a,b) => b[1] - a[1])[0];

        return { total, pending, confirmed, cancelled, busiestDay: busiestDay ? busiestDay[0] : '-' };
    }, [reservations, lang]);

    // Chart Data Preparation (Group by Date)
    const chartData = useMemo(() => {
        const grouped: Record<string, number> = {};
        reservations.forEach(r => {
            const d = r.date;
            grouped[d] = (grouped[d] || 0) + 1;
        });
        return Object.keys(grouped).map(date => ({ date, bookings: grouped[date] })).sort((a,b) => a.date.localeCompare(b.date));
    }, [reservations]);

    const getStatusColor = (status: string) => {
        switch(status) {
            case 'confirmed': return 'bg-green-100 text-green-800 border-green-200';
            case 'cancelled': return 'bg-red-100 text-red-800 border-red-200';
            default: return 'bg-yellow-100 text-yellow-800 border-yellow-200';
        }
    };

    const getStatusText = (status: string) => {
        switch(status) {
            case 'confirmed': return t.statusConfirmed;
            case 'cancelled': return t.statusCancelled;
            default: return t.statusPending;
        }
    };

    const handleOpenModal = (item?: MenuItem) => {
        if (item) {
            setEditingItem(item);
            setFormData({
                nameAr: item.nameAr,
                nameEn: item.nameEn,
                descriptionAr: item.descriptionAr,
                descriptionEn: item.descriptionEn,
                price: item.price.toString(),
                category: item.category,
                image: item.image
            });
        } else {
            setEditingItem(null);
            setFormData({ nameAr: '', nameEn: '', descriptionAr: '', descriptionEn: '', price: '', category: 'main', image: '' });
        }
        setIsModalOpen(true);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const itemData = {
            ...formData,
            price: parseFloat(formData.price),
            category: formData.category as any
        };

        if (editingItem) {
            onUpdateMenuItem(editingItem.id, itemData);
        } else {
            onAddMenuItem({ ...itemData, image: formData.image || 'https://picsum.photos/400/300' });
        }
        setIsModalOpen(false);
    };

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">{t.title}</h1>
                    <p className="text-gray-500 text-sm mt-1">{t.welcome}</p>
                </div>
                
                <div className="bg-white p-1 rounded-lg border border-gray-200 flex">
                    <button 
                        onClick={() => setActiveTab('reservations')}
                        className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${activeTab === 'reservations' ? 'bg-emerald-100 text-emerald-800' : 'text-gray-600 hover:bg-gray-50'}`}
                    >
                        {t.tabReservations}
                    </button>
                    <button 
                        onClick={() => setActiveTab('menu')}
                        className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${activeTab === 'menu' ? 'bg-emerald-100 text-emerald-800' : 'text-gray-600 hover:bg-gray-50'}`}
                    >
                        {t.tabMenu}
                    </button>
                </div>
            </div>

            {/* Stats Cards - Only show on Reservations Tab */}
            {activeTab === 'reservations' && (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                            <div className="flex justify-between items-center">
                                <div>
                                    <p className="text-gray-500 text-sm">{t.total}</p>
                                    <h3 className="text-3xl font-bold text-gray-800">{stats.total}</h3>
                                </div>
                                <div className="p-3 bg-blue-50 text-blue-600 rounded-lg"><Calendar /></div>
                            </div>
                        </div>
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                            <div className="flex justify-between items-center">
                                <div>
                                    <p className="text-gray-500 text-sm">{t.pending}</p>
                                    <h3 className="text-3xl font-bold text-amber-600">{stats.pending}</h3>
                                </div>
                                <div className="p-3 bg-amber-50 text-amber-600 rounded-lg"><Clock /></div>
                            </div>
                        </div>
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                            <div className="flex justify-between items-center">
                                <div>
                                    <p className="text-gray-500 text-sm">{t.confirmed}</p>
                                    <h3 className="text-3xl font-bold text-green-600">{stats.confirmed}</h3>
                                </div>
                                <div className="p-3 bg-green-50 text-green-600 rounded-lg"><Check /></div>
                            </div>
                        </div>
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                            <div className="flex justify-between items-center">
                                <div>
                                    <p className="text-gray-500 text-sm">{t.cancelled}</p>
                                    <h3 className="text-3xl font-bold text-red-600">{stats.cancelled}</h3>
                                </div>
                                <div className="p-3 bg-red-50 text-red-600 rounded-lg"><X /></div>
                            </div>
                        </div>
                         <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                            <div className="flex justify-between items-center">
                                <div>
                                    <p className="text-gray-500 text-sm">{t.busiest}</p>
                                    <h3 className="text-xl font-bold text-purple-600">{stats.busiestDay}</h3>
                                </div>
                                <div className="p-3 bg-purple-50 text-purple-600 rounded-lg"><TrendingUp /></div>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Reservations Table */}
                        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                                <h2 className="text-xl font-bold text-gray-800">{t.recentBookings}</h2>
                                <div className="relative hidden sm:block">
                                    <Search className={`absolute top-2.5 text-gray-400 w-4 h-4 ${lang === 'ar' ? 'right-3' : 'left-3'}`} />
                                    <input type="text" placeholder={t.search} className={`py-2 border rounded-lg text-sm bg-gray-50 outline-none focus:ring-1 focus:ring-emerald-500 ${lang === 'ar' ? 'pe-10 ps-4' : 'ps-10 pe-4'}`}/>
                                </div>
                            </div>
                            <div className="overflow-x-auto">
                                <table className={`w-full ${lang === 'ar' ? 'text-right' : 'text-left'}`}>
                                    <thead className="bg-gray-50 text-gray-600 text-sm">
                                        <tr>
                                            <th className="px-6 py-4 font-medium">{t.colCustomer}</th>
                                            <th className="px-6 py-4 font-medium">{t.colDateTime}</th>
                                            <th className="px-6 py-4 font-medium">{t.colGuests}</th>
                                            <th className="px-6 py-4 font-medium">{t.colStatus}</th>
                                            <th className="px-6 py-4 font-medium">{t.colActions}</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100">
                                        {reservations.length === 0 ? (
                                            <tr><td colSpan={5} className="text-center py-8 text-gray-500">{translations[lang].menu.empty}</td></tr>
                                        ) : (
                                            reservations.map(res => (
                                                <tr key={res.id} className="hover:bg-gray-50 transition-colors">
                                                    <td className="px-6 py-4">
                                                        <div className="font-medium text-gray-900">{res.customerName}</div>
                                                        <div className="text-xs text-gray-400">{res.email}</div>
                                                        <div className="text-sm text-gray-500">{res.phone}</div>
                                                    </td>
                                                    <td className="px-6 py-4 text-sm text-gray-600">
                                                        <div>{res.date}</div>
                                                        <div className="text-xs text-gray-400">{res.time}</div>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <div className="flex items-center gap-1 text-gray-600">
                                                            <Users size={16} />
                                                            <span>{res.guests}</span>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(res.status)}`}>
                                                            {getStatusText(res.status)}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        {res.status === 'pending' && (
                                                            <div className="flex gap-2">
                                                                <button 
                                                                    onClick={() => updateStatus(res.id, 'confirmed')}
                                                                    className="p-1.5 bg-green-100 text-green-600 rounded hover:bg-green-200 transition-colors" title={t.statusConfirmed}
                                                                >
                                                                    <Check size={18} />
                                                                </button>
                                                                <button 
                                                                    onClick={() => updateStatus(res.id, 'cancelled')}
                                                                    className="p-1.5 bg-red-100 text-red-600 rounded hover:bg-red-200 transition-colors" title={t.statusCancelled}
                                                                >
                                                                    <X size={18} />
                                                                </button>
                                                            </div>
                                                        )}
                                                    </td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Chart Section */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                            <h2 className="text-xl font-bold text-gray-800 mb-6">{t.chartTitle}</h2>
                            <div className="h-64">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={chartData}>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                        <XAxis dataKey="date" tick={{fontSize: 12}} />
                                        <YAxis allowDecimals={false} orientation={lang === 'ar' ? 'right' : 'left'} />
                                        <Tooltip 
                                            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                                            cursor={{fill: '#f3f4f6'}}
                                        />
                                        <Bar dataKey="bookings" radius={[4, 4, 0, 0]}>
                                            {chartData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#059669' : '#d97706'} />
                                            ))}
                                        </Bar>
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                            <div className="mt-4 text-sm text-gray-500 text-center">
                                {t.chartSubtitle}
                            </div>
                        </div>
                    </div>
                </>
            )}

            {/* Menu Management Tab */}
            {activeTab === 'menu' && (
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                     <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                        <div>
                            <h2 className="text-xl font-bold text-gray-800">{t.menuTitle}</h2>
                            <p className="text-sm text-gray-500 mt-1">{t.menuSubtitle}</p>
                        </div>
                        <button 
                            onClick={() => handleOpenModal()}
                            className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
                        >
                            <Plus size={18} />
                            <span>{t.addItem}</span>
                        </button>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
                        {menuItems.map(item => (
                            <div key={item.id} className="border border-gray-200 rounded-lg overflow-hidden group hover:shadow-md transition-all">
                                <div className="h-40 overflow-hidden relative">
                                    <img src={item.image} alt={lang === 'ar' ? item.nameAr : item.nameEn} className="w-full h-full object-cover" />
                                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100 gap-2">
                                        <button 
                                            onClick={() => handleOpenModal(item)}
                                            className="bg-white text-emerald-800 p-2 rounded-full hover:bg-emerald-50"
                                        >
                                            <Edit size={18} />
                                        </button>
                                        <button 
                                            onClick={() => onDeleteMenuItem(item.id)}
                                            className="bg-white text-red-600 p-2 rounded-full hover:bg-red-50"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </div>
                                <div className="p-4">
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="font-bold text-gray-800">{lang === 'ar' ? item.nameAr : item.nameEn}</h3>
                                        <span className="text-amber-600 font-bold">${item.price}</span>
                                    </div>
                                    <p className="text-gray-500 text-sm mb-3 line-clamp-2">{lang === 'ar' ? item.descriptionAr : item.descriptionEn}</p>
                                    <span className="inline-block px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                                        {translations[lang].menu[item.category] || item.category}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Menu Item Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
                    <div className="bg-white rounded-xl shadow-xl w-full max-w-lg overflow-hidden animate-fade-in-up">
                        <div className="bg-emerald-900 px-6 py-4 flex justify-between items-center">
                            <h3 className="text-white font-bold text-lg">
                                {editingItem ? t.editItem : t.addItem}
                            </h3>
                            <button onClick={() => setIsModalOpen(false)} className="text-emerald-200 hover:text-white">
                                <X size={20} />
                            </button>
                        </div>
                        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">{t.labels.nameAr}</label>
                                    <input 
                                        required
                                        type="text" 
                                        value={formData.nameAr}
                                        onChange={e => setFormData({...formData, nameAr: e.target.value})}
                                        className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-emerald-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">{t.labels.nameEn}</label>
                                    <input 
                                        required
                                        type="text" 
                                        value={formData.nameEn}
                                        onChange={e => setFormData({...formData, nameEn: e.target.value})}
                                        className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-emerald-500 text-left"
                                        dir="ltr"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">{t.labels.price}</label>
                                    <input 
                                        required
                                        type="number" 
                                        min="0"
                                        step="0.01"
                                        value={formData.price}
                                        onChange={e => setFormData({...formData, price: e.target.value})}
                                        className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-emerald-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">{t.labels.category}</label>
                                    <select 
                                        value={formData.category}
                                        onChange={e => setFormData({...formData, category: e.target.value})}
                                        className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
                                    >
                                        <option value="main">{translations[lang].menu.main}</option>
                                        <option value="appetizer">{translations[lang].menu.appetizer}</option>
                                        <option value="dessert">{translations[lang].menu.dessert}</option>
                                        <option value="drink">{translations[lang].menu.drink}</option>
                                    </select>
                                </div>
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">{t.labels.descAr}</label>
                                <textarea 
                                    required
                                    rows={2}
                                    value={formData.descriptionAr}
                                    onChange={e => setFormData({...formData, descriptionAr: e.target.value})}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-emerald-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">{t.labels.descEn}</label>
                                <textarea 
                                    required
                                    rows={2}
                                    value={formData.descriptionEn}
                                    onChange={e => setFormData({...formData, descriptionEn: e.target.value})}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-emerald-500 text-left"
                                    dir="ltr"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">{t.labels.image}</label>
                                <div className="relative">
                                    <ImageIcon className={`absolute top-2.5 text-gray-400 w-5 h-5 ${lang === 'ar' ? 'right-3' : 'left-3'}`} />
                                    <input 
                                        type="text" 
                                        placeholder="https://..."
                                        value={formData.image}
                                        onChange={e => setFormData({...formData, image: e.target.value})}
                                        className={`w-full border border-gray-300 rounded-lg py-2 outline-none focus:ring-2 focus:ring-emerald-500 dir-ltr ${lang === 'ar' ? 'pe-10 ps-3' : 'ps-10 pe-3'}`}
                                        dir="ltr"
                                    />
                                </div>
                            </div>
                            
                            <div className="pt-4 flex gap-3">
                                <button 
                                    type="button" 
                                    onClick={() => setIsModalOpen(false)}
                                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                                >
                                    {t.cancel}
                                </button>
                                <button 
                                    type="submit" 
                                    className="flex-1 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"
                                >
                                    {editingItem ? t.save : t.add}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};
