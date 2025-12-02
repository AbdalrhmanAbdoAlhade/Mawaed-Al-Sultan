
import { Reservation, Language } from '../types';

export const sendReservationEmail = async (reservation: Reservation, type: 'created' | 'confirmed', lang: Language) => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800));

    let subject = '';
    let body = '';

    if (lang === 'ar') {
        subject = type === 'created' 
            ? 'تم استلام طلب الحجز - مائدة السلطان' 
            : 'تأكيد الحجز - مائدة السلطان';
        
        body = type === 'created'
            ? `مرحباً ${reservation.customerName}،\n\nشكراً لاختيارك مائدة السلطان. لقد استلمنا طلب حجزك لـ ${reservation.guests} أشخاص في ${reservation.date} الساعة ${reservation.time}.\n\nسنقوم بمراجعة الطلب وتأكيده قريباً.`
            : `مرحباً ${reservation.customerName}،\n\nيسعدنا إخبارك بأنه تم تأكيد حجزك لـ ${reservation.guests} أشخاص في ${reservation.date} الساعة ${reservation.time}.\n\nنتطلع لاستقبالكم!`;
    } else {
        subject = type === 'created' 
            ? "Reservation Received - Sultan's Table" 
            : "Reservation Confirmed - Sultan's Table";
        
        body = type === 'created'
            ? `Hello ${reservation.customerName},\n\nThank you for choosing Sultan's Table. We have received your booking request for ${reservation.guests} guests on ${reservation.date} at ${reservation.time}.\n\nWe will review the request and confirm shortly.`
            : `Hello ${reservation.customerName},\n\nWe are pleased to inform you that your reservation for ${reservation.guests} guests on ${reservation.date} at ${reservation.time} has been confirmed.\n\nWe look forward to welcoming you!`;
    }

    console.log(`%c[Email Service] Sending to: ${reservation.email}`, 'color: #10b981; font-weight: bold');
    console.log(`%cSubject: ${subject}`, 'color: #059669');
    console.log(`%cBody: \n${body}`, 'color: #374151');
    
    return { 
        success: true, 
        message: lang === 'ar' 
            ? (type === 'created' ? 'تم إرسال تفاصيل الطلب إلى بريدك الإلكتروني' : 'تم إرسال بريد التأكيد للعميل')
            : (type === 'created' ? 'Order details sent to your email' : 'Confirmation email sent to customer')
    };
};
