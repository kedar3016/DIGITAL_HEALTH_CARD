
const apiKey = "AIzaSyAs81QcJCwyLVj8iYAUI-3iygcq9pcLUbE";
const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`;

async function getModels() {
    try {
        const response = await fetch(url);
        const data = await response.json();
        if (data.models) {
            console.log("Available Models:");
            data.models.forEach(m => console.log(`- ${m.name}`));
        } else {
            console.log("No models found or error:", JSON.stringify(data, null, 2));
        }
    } catch (err) {
        console.error("Fetch error:", err);
    }
}

getModels();
