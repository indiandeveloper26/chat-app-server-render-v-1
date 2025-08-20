// ESM module format (type: "module" in package.json) 
import { GoogleGenerativeAI } from "@google/generative-ai";

/**
 * aiComplete(prompt, opts)
 * - prompt: string | array of parts
 * - opts.model: "gemini-1.5-flash" (fast) | "gemini-1.5-pro" (accurate)
 * - opts.apiKey: optional override; default process.env.GEMINI_API_KEY
 */
export async function aiComplete(
  prompt,
  { model = "gemini-1.5-flash", apiKey = 'AIzaSyDQPNRpEpdrHaE8LirFlQXvXyTi0cvn6XA' } = {}
) {
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY missing. Put it in .env or pass via opts.apiKey");
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  const gemini = genAI.getGenerativeModel({ model });

  // आप चाहें तो safetySettings / systemInstruction भी दे सकते हैं
  const result = await gemini.generateContent({
    contents: [{ role: "user", parts: [{ text: String(prompt) }]}],
  });

  // text निकालना
  return result.response.text();
}

// --- Example run (node gemini-run.js से कॉल करें) ---
// (इसे अलग फाइल में रखें, जैसे gemini-run.js)
/*
import { aiComplete } from "./gemini.js";
const run = async () => {
  const out = await aiComplete("Explain WebSockets in simple Hindi.");
  console.log(out);
};
run();
*/


// console.log( await aiComplete(' what is react js and reacst netiv difreanse  '))