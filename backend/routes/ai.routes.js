import { getAuth } from "@clerk/express";
import Creation from "../models/Creation.js";
import express from "express";
import axios from "axios";
import multer from "multer";
import FormData from "form-data";

import { createRequire } from "module";
const require = createRequire(import.meta.url);
const pdf = require("pdf-parse");



import mammoth from "mammoth";

const router = express.Router();
const upload = multer();

/* -------------------- TEXT -------------------- */

const MODELS = [
     "mistralai/mistral-7b-instruct",
  "openai/gpt-3.5-turbo",


  
];

async function callOpenRouter(model, prompt) {
  console.log("📡 Calling OpenRouter...");
    console.log("🔑 KEY:", process.env.OPENROUTER_API_KEY);

  const res = await axios.post(
    "https://openrouter.ai/api/v1/chat/completions",
    {
      model,
      messages: [{ role: "user", content: prompt }],
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "http://localhost:5174",
        "X-Title": "Muse AI App",
      },
    }
  );

  return res?.data?.choices?.[0]?.message?.content || "";
}

async function generateText(prompt) {
  for (const model of MODELS) {
    try {
      console.log("👉 Trying model:", model);

      const text = await callOpenRouter(model, prompt);

      console.log("✅ Response:", text);

      if (text?.trim()) return text;
    } catch (err) {
  console.log("❌ OpenRouter Error:", err.response?.data || err.message);
}
  }

  return "⚠️ AI not responding";
}

/* -------------------- ARTICLE -------------------- */

router.post("/article/write", async (req, res) => {
  console.log("🔥 /article/write route hit");

  const { userId } = getAuth(req);

  if (!userId) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const { topic, length } = req.body;

    const text = await generateText(
      `Write a ${length || "short"} article on ${topic}`
    );

    await Creation.create({
      type: "article",
      content: text,
      userId,
    });

    res.json({ article: text });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

/* -------------------- BLOG -------------------- */

router.post("/blog/titles", async (req, res) => {
  console.log("🔥 BLOG ROUTE HIT");

  const { userId } = getAuth(req);

  if (!userId) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const { keyword, category } = req.body;

    const text = await generateText(
      `Generate 5 blog titles for ${keyword} in ${category}`
    );

    if (!text || text.includes("⚠️")) {
      return res.json({ titles: ["AI failed. Try again."] });
    }

    await Creation.create({
      type: "blog",
      content: text,
      userId,
    });

    res.json({
      titles: text.split("\n").filter(Boolean),
    });

  } catch (err) {
    console.log("❌ BLOG ERROR:", err);
    res.status(500).json({ error: "Blog generation failed" });
  }
});
/* -------------------- IMAGE -------------------- */

router.post("/image/generate", async (req, res) => {
  console.log("🔥 IMAGE ROUTE HIT");

  try {
    const { prompt } = req.body;
    console.log("👉 Prompt:", prompt);

    const { userId } = getAuth(req);

    let imageUrl = "";

    try {
      const response = await axios.post(
        "https://api-inference.huggingface.co/models/runwayml/stable-diffusion-v1-5",
        { inputs: prompt },
        {
          headers: {
            Authorization: `Bearer ${process.env.HF_API_KEY}`,
          },
          responseType: "arraybuffer",
          timeout: 20000,
        }
      );

      const contentType = response.headers["content-type"];

      if (!contentType || contentType.includes("text/html")) {
        throw new Error("HF returned HTML");
      }

      const base64 = Buffer.from(response.data).toString("base64");

      imageUrl = `data:image/png;base64,${base64}`;

    } catch (hfError) {
      console.log("⚠️ HF FAILED → using fallback");

      // ✅ fallback (ALWAYS WORKS)
      imageUrl = `https://source.unsplash.com/1024x768/?${prompt}`;
    }

    await Creation.create({
      type: "image",
      content: prompt,
      userId,
    });

    res.json({ imageUrl });

  } catch (err) {
    console.log("❌ FINAL ERROR:", err.message);

    res.status(500).json({
      error: "Image generation failed",
    });
  }
});

/* -------------------- REMOVE BG -------------------- */

router.post("/image/remove-bg", upload.single("image"), async (req, res) => {
  try {
    const formData = new FormData();
    formData.append("image_file", req.file.buffer);

    const response = await axios.post(
      "https://api.remove.bg/v1.0/removebg",
      formData,
      {
        headers: {
          ...formData.getHeaders(),
          "X-Api-Key": process.env.REMOVE_BG_API_KEY,
        },
        responseType: "arraybuffer",
      }
    );

    const base64 = Buffer.from(response.data).toString("base64");

    // ✅ SAFE HISTORY (won’t break anything)
    try {
     const { userId } = getAuth(req);

await Creation.create({
  type: "remove-bg",
  content: "Background removed successfully",
  userId,
});
    } catch (e) {
      console.log("History save failed");
    }

    res.json({
      imageUrl: `data:image/png;base64,${base64}`,
    });
  } catch {
    res.json({ error: "Remove BG failed" });
  }
});

/* -------------------- REMOVE OBJECT -------------------- */

router.post("/image/remove-object", upload.single("image"), async (req, res) => {

  // ✅ SAFE HISTORY
  try {
 const { userId } = getAuth(req);

await Creation.create({
  type: "remove-object",
  content: `Removed: ${req.body?.prompt || "object"}`,
  userId,
});
  } catch (e) {
    console.log("History save failed");
  }

  res.json({
    imageUrl: "",
    message: "⚠️ Object removal requires paid API",
  });
});

/* -------------------- RESUME -------------------- */
router.post("/resume/analyze", upload.single("resume"), async (req, res) => {
  try {
    console.log("🔥 RESUME ROUTE HIT");

    // ✅ 1. File check
    if (!req.file) {
      console.log("❌ No file uploaded");
      return res.json({ analysis: "❌ No file uploaded" });
    }

    console.log("📄 FILE TYPE:", req.file.mimetype);
    console.log("📦 FILE SIZE:", req.file.size);

    let text = "";

    // ✅ 2. PDF PARSE (SAFE)
   if (req.file.mimetype.includes("pdf")) {
  try {
    const data = await pdf(req.file.buffer);

    console.log("📄 PDF DATA KEYS:", Object.keys(data));

    text = data.text || "";

    if (!text || text.trim().length === 0) {
      console.log("⚠️ PDF TEXT EMPTY");
    }

  } catch (e) {
    console.log("❌ PDF ERROR:", e.message);
    text = "";
  }
} else {
      // ✅ 3. DOCX PARSE
      try {
        const result = await mammoth.extractRawText({
          buffer: req.file.buffer,
        });
        text = result.value;
      } catch (e) {
        console.log("❌ DOCX PARSE ERROR:", e.message);
        text = "";
      }
    }

    // ✅ 4. CLEAN TEXT
    text = text.replace(/\s+/g, " ").trim();

    console.log("📄 RAW TEXT PREVIEW:", text.slice(0, 200));
    console.log("📏 TEXT LENGTH:", text.length);

    // ❌ If unreadable
    if (!text || text.length < 50) {
      return res.json({
        analysis:
          "❌ Could not read resume properly. Please upload a simple text-based PDF or DOCX.",
      });
    }

    // ✅ 5. LIMIT TEXT (VERY IMPORTANT)
    const limitedText = text.slice(0, 3000);

    // ✅ 6. AI PROMPT
    const prompt = `
You are a professional resume reviewer.

Analyze the resume and give:

Score: X/10

Strengths:
- ...

Weaknesses:
- ...

Suggestions:
- ...

Resume:
${limitedText}
`;

    const analysis = await generateText(prompt);

    console.log("🤖 AI RESPONSE RECEIVED");

    // ✅ 7. SAVE HISTORY (SAFE)
    try {
      const { userId } = getAuth(req);

      if (userId) {
        await Creation.create({
          type: "resume",
          content: limitedText.slice(0, 200),
          userId,
        });
      }
    } catch (e) {
      console.log("⚠️ History save failed");
    }

    // ✅ 8. RESPONSE
    res.json({ analysis });

  } catch (err) {
    console.log("❌ RESUME ERROR:", err.message);

    res.json({
      analysis:
        "❌ Failed to analyze resume. Try a simpler PDF or DOCX file.",
    });
  }
});
/* -------------------- DASHBOARD -------------------- */

router.get("/dashboard", async (req, res) => {
  const total = await Creation.countDocuments();
  res.json({ total });
});

/* -------------------- HISTORY -------------------- */

router.get("/history", async (req, res) => {
  try {
    
      const { userId } = getAuth(req);

const data = await Creation.find({ userId })
  
      .sort({ createdAt: -1 })
      .limit(20);

    res.json({ data });
  } catch {
    res.json({ data: [] });
  }
});

export default router;