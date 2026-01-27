import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: import.meta.env.VITE_GEMINI_API_KEY,
});

export const createChatSession = async () => {
  return await ai.chats.create({
    model: "gemini-2.5-flash-lite",
    config: {
      systemInstruction:
        "You are a helpful, concise, and friendly AI assistant for a web application. Keep your answers brief and relevant to the user context.",
    },
  });
};

export const sendMessageStream = async (chat, message) => {
  return await chat.sendMessageStream({ message });
};
