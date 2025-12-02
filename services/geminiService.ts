import { GoogleGenAI, Chat } from "@google/genai";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

const SYSTEM_INSTRUCTION = `
You are "Chef Osman", the head chef at "Mawaed Al-Sultan" (Sultan's Table), a high-end Arabic restaurant.
Your tone is warm, welcoming, and hospitable (like traditional Arab hospitality).
You speak primarily in Arabic, but can answer in English if asked.

The Menu Highlights:
- Mansaf (Jordanian lamb with yogurt sauce)
- Kabsa (Saudi spiced rice with chicken)
- Mixed Grill (Shish Tawook, Kebab, Lamb Chops)
- Hummus with Truffle Oil
- Kunafa Nabulsi

Your goal is to assist customers in choosing dishes, explaining ingredients, and making them feel hungry.
Keep responses concise (under 3 sentences) unless asked for a detailed recipe or story.
`;

let chatSession: Chat | null = null;

export const getChefChat = (): Chat => {
    if (!chatSession) {
        chatSession = ai.chats.create({
            model: 'gemini-2.5-flash',
            config: {
                systemInstruction: SYSTEM_INSTRUCTION,
            }
        });
    }
    return chatSession;
};

export const sendMessageToChef = async (message: string): Promise<string> => {
    try {
        const chat = getChefChat();
        const result = await chat.sendMessage({ message });
        return result.text || "عذراً، أنا مشغول في المطبخ الآن. سأعود إليك قريباً.";
    } catch (error) {
        console.error("Gemini Error:", error);
        return "حدث خطأ في الاتصال، يرجى المحاولة لاحقاً.";
    }
};