/* =========================================================
   NAFISA NASRIN PORTFOLIO — BACKEND
   Two features:
   1. POST /api/ask       — AI assistant that answers questions about Nafisa
   2. GET/POST /api/comments — public guestbook
   See README.md for setup + free deployment instructions.
   ========================================================= */

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const Anthropic = require("@anthropic-ai/sdk");

const PROFILE_SYSTEM_PROMPT = require("./profile");
const commentsStore = require("./commentsStore");

const app = express();
const PORT = process.env.PORT || 5000;

// ---------- Middleware ----------
const allowedOrigins = (process.env.ALLOWED_ORIGINS || "*")
  .split(",")
  .map(s => s.trim())
  .filter(Boolean);

app.use(cors({
  origin: allowedOrigins.includes("*") ? true : allowedOrigins,
}));
app.use(express.json({ limit: "20kb" }));

// Basic rate limiting to keep API costs & spam under control
const askLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 12,
  message: { error: "Too many questions — please wait a moment and try again." },
});
const commentLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 5,
  message: { error: "Too many messages — please wait a moment and try again." },
});

// ---------- Anthropic client ----------
let anthropic = null;
if (process.env.ANTHROPIC_API_KEY) {
  anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
} else {
  console.warn("⚠️  ANTHROPIC_API_KEY not set — /api/ask will return an error until it's configured in .env");
}

// ---------- Health check ----------
app.get("/", (req, res) => {
  res.json({ status: "ok", service: "nafisa-portfolio-backend" });
});

// ---------- AI ASSISTANT ----------
app.post("/api/ask", askLimiter, async (req, res) => {
  try {
    const question = (req.body?.question || "").toString().trim();

    if (!question) {
      return res.status(400).json({ error: "Please include a question." });
    }
    if (question.length > 500) {
      return res.status(400).json({ error: "That question is a bit long — please keep it under 500 characters." });
    }
    if (!anthropic) {
      return res.status(503).json({ error: "AI assistant isn't configured yet. Add ANTHROPIC_API_KEY to the backend .env file." });
    }

    const response = await anthropic.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 400,
      system: PROFILE_SYSTEM_PROMPT,
      messages: [{ role: "user", content: question }],
    });

    const answer = response.content
      .map(block => (block.type === "text" ? block.text : ""))
      .filter(Boolean)
      .join("\n")
      .trim();

    res.json({ answer: answer || "I'm not sure how to answer that — try asking about her skills, projects, or education!" });
  } catch (err) {
    console.error("Error in /api/ask:", err.message);
    res.status(500).json({ error: "Something went wrong answering that question. Please try again shortly." });
  }
});

// ---------- GUESTBOOK ----------
app.get("/api/comments", (req, res) => {
  try {
    const comments = commentsStore.readAll();
    res.json({ comments });
  } catch (err) {
    console.error("Error in GET /api/comments:", err.message);
    res.status(500).json({ error: "Could not load comments right now." });
  }
});

app.post("/api/comments", commentLimiter, (req, res) => {
  try {
    let { name, message, gbWebsite } = req.body || {};

    // Honeypot: hidden field real visitors never fill in — bots often do.
    if (gbWebsite) {
      return res.status(201).json({ comment: { id: "ok", name: "", message: "", createdAt: new Date().toISOString() } });
    }

    name = (name || "").toString().trim().slice(0, 60);
    message = (message || "").toString().trim().slice(0, 600);

    // Strip any HTML tags server-side too (defense in depth — frontend already escapes on render)
    name = name.replace(/<[^>]*>/g, "");
    message = message.replace(/<[^>]*>/g, "");

    if (!name || !message) {
      return res.status(400).json({ error: "Name and message are both required." });
    }

    const comment = commentsStore.addComment({ name, message });
    res.status(201).json({ comment });
  } catch (err) {
    console.error("Error in POST /api/comments:", err.message);
    res.status(500).json({ error: "Could not post your message right now." });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Backend running at http://localhost:${PORT}`);
});
