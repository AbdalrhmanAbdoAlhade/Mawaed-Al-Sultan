
import { Language } from '../types';

export const translations = {
    ar: {
        nav: {
            brand: 'مائدة السلطان',
            home: 'الرئيسية',
            dashboard: 'الإدارة',
            logout: 'خروج',
            login: 'دخول'
        },
        hero: {
            subtitle: 'أصالة الطعم العربي',
            title: 'تذوق فخامة',
            titleHighlight: 'الضيافة الملكية',
            description: 'نقدم لكم أشهى الأطباق الشرقية المحضرة بكل حب وعناية في أجواء تعكس سحر الشرق وتاريخه العريق.',
            cta: 'احجز طاولتك الآن'
        },
        menu: {
            title: 'قائمة الطعام',
            subtitle: 'أطباقنا المميزة',
            all: 'الكل',
            main: 'أطباق رئيسية',
            appetizer: 'مقبلات',
            dessert: 'حلويات',
            drink: 'مشروبات',
            empty: 'لا توجد أطباق في هذه القائمة حالياً.',
            sar: 'ريال'
        },
        form: {
            title: 'حجز طاولة جديدة',
            name: 'الاسم الكامل',
            namePlaceholder: 'أدخل اسمك',
            email: 'البريد الإلكتروني',
            phone: 'رقم الهاتف',
            date: 'التاريخ',
            time: 'الوقت',
            guests: 'عدد الضيوف',
            submit: 'تأكيد الحجز',
            successTitle: 'تم استلام طلبك!',
            successMsg: 'شكراً لك، سيتم تأكيد حجزك برسالة نصية وبريد إلكتروني قريباً.',
            copySent: 'تم إرسال نسخة من الطلب إلى',
            guestsOption: 'أشخاص'
        },
        dashboard: {
            title: 'لوحة تحكم الإدارة',
            welcome: 'مرحباً بك في نظام إدارة مطعم مائدة السلطان',
            tabReservations: 'إدارة الحجوزات',
            tabMenu: 'إدارة القائمة',
            total: 'إجمالي الحجوزات',
            pending: 'قيد الانتظار',
            confirmed: 'مؤكدة',
            cancelled: 'ملغاة',
            busiest: 'اليوم الأكثر ازدحاماً',
            recentBookings: 'آخر الحجوزات',
            search: 'بحث...',
            colCustomer: 'العميل',
            colDateTime: 'التاريخ/الوقت',
            colGuests: 'الضيوف',
            colStatus: 'الحالة',
            colActions: 'الإجراءات',
            statusConfirmed: 'مؤكد',
            statusCancelled: 'ملغى',
            statusPending: 'قيد الانتظار',
            chartTitle: 'تحليل الحجوزات اليومية',
            chartSubtitle: 'عدد الحجوزات لكل يوم',
            menuTitle: 'قائمة الطعام',
            menuSubtitle: 'إضافة وتعديل أصناف القائمة',
            addItem: 'إضافة صنف',
            editItem: 'تعديل الصنف',
            save: 'حفظ',
            add: 'إضافة',
            cancel: 'إلغاء',
            labels: {
                nameAr: 'اسم الطبق (عربي)',
                nameEn: 'اسم الطبق (انجليزي)',
                descAr: 'الوصف (عربي)',
                descEn: 'الوصف (انجليزي)',
                price: 'السعر',
                category: 'الفئة',
                image: 'رابط الصورة'
            }
        },
        login: {
            title: 'تسجيل دخول الإدارة',
            subtitle: 'يرجى إدخال بيانات الاعتماد للمتابعة',
            username: 'اسم المستخدم',
            password: 'كلمة المرور',
            button: 'دخول',
            error: 'اسم المستخدم أو كلمة المرور غير صحيحة',
            hint: 'بيانات تجريبية: admin / admin123'
        },
        chef: {
            badge: 'اسأل الشيف',
            name: 'الشيف عثمان',
            role: 'مساعدك الذكي',
            placeholder: 'اكتب سؤالك هنا...',
            welcome: 'أهلاً بك في مائدة السلطان! أنا الشيف عثمان. كيف يمكنني مساعدتك في اختيار طبقك اليوم؟'
        },
        footer: {
            slogan: 'حيث يلتقي الطعم الأصيل بالفخامة',
            rights: 'جميع الحقوق محفوظة'
        }
    },
    en: {
        nav: {
            brand: "Sultan's Table",
            home: 'Home',
            dashboard: 'Dashboard',
            logout: 'Logout',
            login: 'Login'
        },
        hero: {
            subtitle: 'Authentic Arabian Taste',
            title: 'Taste the Luxury of',
            titleHighlight: 'Royal Hospitality',
            description: 'We offer the most delicious oriental dishes prepared with love and care in an atmosphere that reflects the magic and history of the East.',
            cta: 'Book Your Table Now'
        },
        menu: {
            title: 'Our Menu',
            subtitle: 'Signature Dishes',
            all: 'All',
            main: 'Main Courses',
            appetizer: 'Appetizers',
            dessert: 'Desserts',
            drink: 'Drinks',
            empty: 'No items in this category currently.',
            sar: 'SAR'
        },
        form: {
            title: 'Book a Table',
            name: 'Full Name',
            namePlaceholder: 'Enter your name',
            email: 'Email Address',
            phone: 'Phone Number',
            date: 'Date',
            time: 'Time',
            guests: 'Number of Guests',
            submit: 'Confirm Booking',
            successTitle: 'Order Received!',
            successMsg: 'Thank you, your booking will be confirmed via email shortly.',
            copySent: 'A copy has been sent to',
            guestsOption: 'Guests'
        },
        dashboard: {
            title: 'Admin Dashboard',
            welcome: "Welcome to Sultan's Table Management System",
            tabReservations: 'Reservations',
            tabMenu: 'Menu Management',
            total: 'Total Bookings',
            pending: 'Pending',
            confirmed: 'Confirmed',
            cancelled: 'Cancelled',
            busiest: 'Busiest Day',
            recentBookings: 'Recent Bookings',
            search: 'Search...',
            colCustomer: 'Customer',
            colDateTime: 'Date/Time',
            colGuests: 'Guests',
            colStatus: 'Status',
            colActions: 'Actions',
            statusConfirmed: 'Confirmed',
            statusCancelled: 'Cancelled',
            statusPending: 'Pending',
            chartTitle: 'Daily Booking Analysis',
            chartSubtitle: 'Number of bookings per day',
            menuTitle: 'Menu Items',
            menuSubtitle: 'Add and edit menu items',
            addItem: 'Add Item',
            editItem: 'Edit Item',
            save: 'Save Changes',
            add: 'Add',
            cancel: 'Cancel',
            labels: {
                nameAr: 'Dish Name (Arabic)',
                nameEn: 'Dish Name (English)',
                descAr: 'Description (Arabic)',
                descEn: 'Description (English)',
                price: 'Price',
                category: 'Category',
                image: 'Image URL'
            }
        },
        login: {
            title: 'Admin Login',
            subtitle: 'Please enter credentials to continue',
            username: 'Username',
            password: 'Password',
            button: 'Login',
            error: 'Invalid username or password',
            hint: 'Demo credentials: admin / admin123'
        },
        chef: {
            badge: 'Ask Chef',
            name: 'Chef Osman',
            role: 'Your Smart Assistant',
            placeholder: 'Type your question here...',
            welcome: "Welcome to Sultan's Table! I'm Chef Osman. How can I help you choose your dish today?"
        },
        footer: {
            slogan: 'Where authentic taste meets luxury',
            rights: 'All rights reserved'
        }
    }
};
