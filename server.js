import express from "express";
import cors from "cors";
import OpenAI from "openai";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => res.send("OK backend running"));

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// ⚠️ Pega aquí el Assistant ID REAL (normalmente empieza con asst_)
const ASSISTANT_ID = process.env.ASSISTANT_ID;

app.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) return res.status(400).json({ error: "Falta message" });

    const r = await client.responses.create({
      assistant_id: ASSISTANT_ID,
      input: message
    });

    res.json({ reply: r.output_text });
  } catch (err) {
    res.status(500).json({ error: err?.message || String(err) });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Listening on", PORT));
