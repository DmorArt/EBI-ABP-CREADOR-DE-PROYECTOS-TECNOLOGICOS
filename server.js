import express from "express";
import cors from "cors";
import OpenAI from "openai";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req,res)=>res.send("OK backend running"));

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

app.post("/chat", async (req,res)=>{
  try{

    const { message } = req.body;

    const response = await client.responses.create({
      model: "gpt-5.2",   // ← ESTE ERA EL ERROR
      assistant_id: process.env.ASSISTANT_ID,
      input: message
    });

    res.json({ reply: response.output_text });

  }catch(err){
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT);
