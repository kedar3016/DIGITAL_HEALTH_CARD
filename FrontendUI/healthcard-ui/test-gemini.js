import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = "AIzaSyAs81QcJCwyLVj8iYAUI-3iygcq9pcLUbE";
const genAI = new GoogleGenerativeAI(apiKey);

async function listModels() {
    try {
        console.log("Fetching available models...");
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        // functionality to list models is on the older GoogleGenAI or via direct rest, 
        // but the SDK does not expose listModels directly on the client instance in some versions?
        // Wait, typical SDK usage for verifying access is just to try a simple prompt.
        // But the error message said "Call ListModels".
        // I'll try a basic generation with 'gemini-1.5-flash' again but without stream, just to see if it works at all.
        // Actually, I'll try to find a model that definitely works, often 'gemini-pro' is safe.

        // Let's try to verify if 'gemini-1.5-flash' works with a simple GenerateContent (not stream)
        console.log("Testing gemini-1.5-flash...");
        const modelFlash = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const resultFlash = await modelFlash.generateContent("Hello");
        console.log("gemini-1.5-flash response:", resultFlash.response.text());

    } catch (error) {
        console.error("Error testing gemini-1.5-flash:", error.message);

        try {
            console.log("Testing gemini-pro...");
            const modelPro = genAI.getGenerativeModel({ model: "gemini-pro" });
            const resultPro = await modelPro.generateContent("Hello");
            console.log("gemini-pro response:", resultPro.response.text());
        } catch (errPro) {
            console.error("Error testing gemini-pro:", errPro.message);
        }
    }
}

listModels();
