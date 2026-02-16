import express from "express";
import OpenAI from "openai";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

const ASSISTANT_ID = "asistente_2o8VMaRKdQNp4iHAxhS6SGg3";

app.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;

    const response = await client.responses.create({
      assistant_id: ASSISTANT_ID,
      input: message
    });

    res.json({ reply: response.output_text });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(3000);
