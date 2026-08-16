import axios from "axios";
import { ApiResponse } from "../utils/ApiResponse.js";

const GEMINI_MODEL = process.env.GEMINI_MODEL || "gemini-2.5-flash";
const MAX_HISTORY_TURNS = 10;

const SYSTEM_PROMPT =
  "You are the MentHer assistant, a helpful guide for a women-in-tech mentorship platform. " +
  "Answer questions about using the platform, choosing mentors, career growth, and learning resources. " +
  "Keep answers concise and encouraging. If asked about something unrelated to mentorship, careers in tech, " +
  "or the platform itself, politely redirect the user back to those topics.";

export const chatbotReply = async (req, res) => {
  const { message, history } = req.body;

  if (!message || typeof message !== "string") {
    return res.status(400).json({ message: "message is required" });
  }

  if (!process.env.GEMINI_API_KEY) {
    return res.status(500).json({ message: "Chatbot is not configured on the server" });
  }

  const priorTurns = Array.isArray(history)
    ? history.slice(-MAX_HISTORY_TURNS).map((turn) => ({
        role: turn.role === "assistant" ? "model" : "user",
        parts: [{ text: String(turn.text || "") }],
      }))
    : [];

  const contents = [...priorTurns, { role: "user", parts: [{ text: message }] }];

  try {
    const { data } = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`,
      {
        contents,
        systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
      },
      {
        params: { key: process.env.GEMINI_API_KEY },
        headers: { "Content-Type": "application/json" },
      }
    );

    const reply =
      data?.candidates?.[0]?.content?.parts?.map((part) => part.text).join("") ||
      "Sorry, I couldn't come up with a response. Please try again.";

    return res.status(200).json(new ApiResponse(200, { reply }, "Chatbot response generated"));
  } catch (error) {
    console.error("Gemini API error:", error.response?.data || error.message);
    return res.status(502).json({ message: "Chatbot service is unavailable right now" });
  }
};
