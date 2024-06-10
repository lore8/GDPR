const OpenAI = require("openai");
require("dotenv").config();

const getCompliance = async (prompt) => {
  try {
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const completion = await openai.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "gpt-3.5-turbo",
    });

    return completion;
  } catch (error) {
    console.error("Error al obtener la respuesta de OpenAI", error);
  }
};

module.exports = { getCompliance };
