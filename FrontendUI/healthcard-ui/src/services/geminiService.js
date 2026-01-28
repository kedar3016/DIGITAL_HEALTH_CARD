import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash",
  systemInstruction:
    "You are a helpful, concise, and friendly AI assistant for a web application. Keep your answers brief and relevant to the user context.",
});

export const createChatSession = () => {
  return model.startChat({
    history: [],
  });
};

export const sendMessageStream = async (chat, message) => {
  const result = await chat.sendMessageStream(message);
  return result.stream;
};
