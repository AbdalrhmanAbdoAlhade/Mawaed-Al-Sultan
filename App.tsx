
import React, { useState, useRef, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Menu } from './components/Menu';
import { ReservationForm } from './components/ReservationForm';
import { Dashboard } from './components/Dashboard';
import { ChefAssistant } from './components/ChefAssistant';
import { Login } from './components/Login';
import { Reservation, MenuItem, Language } from './types';
import { sendReservationEmail } from './services/emailService';
import { CheckCircle, Info } from 'lucide-react';
import { translations } from './utils/translations';

// Mock initial data
const INITIAL_RESERVATIONS: Reservation[] = [
    { id: '1', customerName: 'أحمد محمد', email: 'ahmed@example.com', phone: '0501234567', date: new Date().toISOString().split('T')[0], time: '20:00', guests: 4, status: 'confirmed' },
    { id: '2', customerName: 'Sarah Smith', email: 'sara@example.com', phone: '0559876543', date: new Date().toISOString().split('T')[0], time: '19:30', guests: 2, status: 'pending' },
];

const INITIAL_MENU_ITEMS: MenuItem[] = [
    { 
        id: 1, 
        nameAr: "منسف أردني", nameEn: "Jordanian Mansaf",
        descriptionAr: "لحم ضأن بلدي، جميد كركي، أرز مصري، يقدم مع المكسرات", descriptionEn: "Local lamb, Karaki Jameed, Egyptian rice, served with nuts",
        price: 85, category: 'main', image: "https://picsum.photos/id/292/400/300" 
    },
    { 
        id: 2, 
        nameAr: "مشاوي مشكلة", nameEn: "Mixed Grill",
        descriptionAr: "شيش طاووق، كباب حلبي، ريش ضأن، تقدم مع الخضار المشوية", descriptionEn: "Shish Tawook, Aleppo Kebab, Lamb Chops, served with grilled vegetables",
        price: 95, category: 'main', image: "https://picsum.photos/id/488/400/300" 
    },
    { 
        id: 3, 
        nameAr: "تبولة ومقبلات", nameEn: "Tabbouleh & Mezza",
        descriptionAr: "بقدونس طازج، برغل ناعم، زيت زيتون بكر، مع تشكيلة مازة", descriptionEn: "Fresh parsley, fine bulgur, virgin olive oil, with assorted mezza",
        price: 45, category: 'appetizer', image: "https://picsum.photos/id/493/400/300" 
    },
    { 
        id: 4, 
        nameAr: "كنافة نابلسية", nameEn: "Nabulsi Kunafa",
        descriptionAr: "جبنة عكاوي، عجينة كنافة خشنة، قطر بالزهر", descriptionEn: "Akkawi cheese, coarse Kunafa dough, blossom syrup",
        price: 35, category: 'dessert', image: "https://picsum.photos/id/1080/400/300" 
    },
    { 
        id: 5, 
        nameAr: "قهوة عربية", nameEn: "Arabic Coffee",
        descriptionAr: "قهوة شقراء بالهيل والزعفران تقدم مع التمر", descriptionEn: "Blonde coffee with cardamom and saffron served with dates",
        price: 25, category: 'drink', image: "https://picsum.photos/id/766/400/300" 
    },
    { 
        id: 6, 
        nameAr: "برياني دجاج", nameEn: "Chicken Biryani",
        descriptionAr: "أرز بسمتي فاخر، دجاج متبل ببهارات هندية وعربية", descriptionEn: "Premium Basmati rice, chicken marinated in Indian and Arabic spices",
        price: 65, category: 'main', image: "https://picsum.photos/id/835/400/300" 
    },
];

interface Notification {
    id: number;
    message: string;
    type: 'success' | 'info';
}

function App() {
    const [view, setView] = useState<'home' | 'dashboard'>('home');
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [reservations, setReservations] = useState<Reservation[]>(INITIAL_RESERVATIONS);
    const [menuItems, setMenuItems] = useState<MenuItem[]>(INITIAL_MENU_ITEMS);
    const [notification, setNotification] = useState<Notification | null>(null);
    const [language, setLanguage] = useState<Language>('ar');
    const bookingRef = useRef<HTMLDivElement>(null);

    // Update document direction based on language
    useEffect(() => {
        document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
        document.documentElement.lang = language;
    }, [language]);

    // Auto-dismiss notification
    useEffect(() => {
        if (notification) {
            const timer = setTimeout(() => {
                setNotification(null);
            }, 4000);
            return () => clearTimeout(timer);
        }
    }, [notification]);

    const showNotification = (message: string, type: 'success' | 'info' = 'success') => {
        setNotification({ id: Date.now(), message, type });
    };

    const handleLogin = (success: boolean) => {
        if (success) {
            setIsAuthenticated(true);
            showNotification(language === 'ar' ? 'تم تسجيل الدخول بنجاح' : 'Login successful');
        }
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
        setView('home');
        showNotification(language === 'ar' ? 'تم تسجيل الخروج' : 'Logged out', 'info');
    };

    const scrollToBooking = () => {
        setView('home');
        // Small timeout to allow view change if needed
        setTimeout(() => {
            bookingRef.current?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
    };

    const addReservation = async (newRes: Reservation) => {
        setReservations(prev => [newRes, ...prev]);
        // Send email
        await sendReservationEmail(newRes, 'created', language);
        showNotification(
            language === 'ar' 
                ? `تم إرسال تفاصيل الحجز إلى ${newRes.email}` 
                : `Booking details sent to ${newRes.email}`
        );
    };

    const updateReservationStatus = (id: string, status: 'confirmed' | 'cancelled') => {
        let targetRes: Reservation | undefined;
        
        setReservations(prev => prev.map(res => {
            if (res.id === id) {
                if (status === 'confirmed' && res.status !== 'confirmed') {
                    targetRes = res;
                }
                return { ...res, status };
            }
            return res;
        }));

        if (targetRes && status === 'confirmed') {
             sendReservationEmail(targetRes, 'confirmed', language).then((res) => {
                 showNotification(res.message);
             });
        }
    };

    // Menu Management Handlers
    const handleAddMenuItem = (item: Omit<MenuItem, 'id'>) => {
        const newItem = { ...item, id: Date.now() };
        setMenuItems(prev => [...prev, newItem]);
        showNotification(language === 'ar' ? 'تم إضافة الطبق بنجاح' : 'Item added successfully');
    };

    const handleUpdateMenuItem = (id: number, updatedItem: Partial<MenuItem>) => {
        setMenuItems(prev => prev.map(item => item.id === id ? { ...item, ...updatedItem } : item));
        showNotification(language === 'ar' ? 'تم تحديث الطبق بنجاح' : 'Item updated successfully');
    };

    const handleDeleteMenuItem = (id: number) => {
        setMenuItems(prev => prev.filter(item => item.id !== id));
        showNotification(language === 'ar' ? 'تم حذف الطبق' : 'Item deleted', 'info');
    };

    const renderContent = () => {
        if (view === 'home') {
            return (
                <>
                    <Hero scrollToBooking={scrollToBooking} lang={language} />
                    <Menu items={menuItems} lang={language} />
                    
                    <div ref={bookingRef} className="py-20 bg-emerald-900">
                        <div className="container mx-auto px-4">
                            <div className="max-w-4xl mx-auto">
                                <ReservationForm addReservation={addReservation} lang={language} />
                            </div>
                        </div>
                    </div>

                    <footer className="bg-slate-900 text-slate-400 py-12 text-center">
                        <div className="container mx-auto px-4">
                            <h2 className="text-2xl font-bold text-amber-500 mb-4">{translations[language].nav.brand}</h2>
                            <p className="mb-6">{translations[language].footer.slogan}</p>
                            <div className="text-sm">
                                © {new Date().getFullYear()} {translations[language].footer.rights}
                            </div>
                        </div>
                    </footer>
                    
                    <ChefAssistant lang={language} />
                </>
            );
        }

        if (view === 'dashboard') {
            if (!isAuthenticated) {
                return <Login onLogin={handleLogin} lang={language} />;
            }

            return (
                <Dashboard 
                    reservations={reservations} 
                    updateStatus={updateReservationStatus}
                    menuItems={menuItems}
                    onAddMenuItem={handleAddMenuItem}
                    onUpdateMenuItem={handleUpdateMenuItem}
                    onDeleteMenuItem={handleDeleteMenuItem}
                    lang={language}
                />
            );
        }
    };

    return (
        <div className={`min-h-screen bg-gray-50 flex flex-col font-sans ${language === 'ar' ? 'font-tajawal' : 'font-sans'}`}>
            <Navbar 
                currentView={view} 
                setView={setView} 
                isAuthenticated={isAuthenticated}
                onLogout={handleLogout}
                language={language}
                setLanguage={setLanguage}
            />
            
            {/* Notification Toast */}
            {notification && (
                <div className="fixed top-24 left-1/2 transform -translate-x-1/2 z-[60] animate-fade-in-up w-max max-w-[90vw]">
                    <div className={`flex items-center gap-3 px-6 py-4 rounded-full shadow-2xl border ${
                        notification.type === 'success' 
                            ? 'bg-emerald-900 text-white border-emerald-700' 
                            : 'bg-amber-100 text-amber-900 border-amber-200'
                    }`}>
                        {notification.type === 'success' ? <CheckCircle size={20} className="text-emerald-400" /> : <Info size={20} />}
                        <span className="font-medium">{notification.message}</span>
                    </div>
                </div>
            )}
            
            <main className="flex-1">
                {renderContent()}
            </main>
        </div>
    );
}

export default App;
