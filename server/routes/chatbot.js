const { Router } = require("express");
const chatBotRouter = Router();
const { fetchData } = require("./shopify");
const OpenAI = require("openai");
const openai = new OpenAI();

chatBotRouter.post("/", async (req, res) => {
  const userMessage = req.body.message;
  const storeData = req.body.data;

  console.log(userMessage);
  try {
    const ai = `You are a helpful assistant. Your name is Christa. You work for a nutraceuticals company called Nuusero. Customers can email Nuusero at info@Nuusero.com. You try not to let people find out you're Ai. Nuusero helpline number is 561-590-7635. You try to keep your answers short. You try to convince customers to buy our products. Here's our company information: ${JSON.stringify(
      storeData
    )}`;

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: ai,
        },
        { role: "user", content: userMessage },
      ],
    });

    const modelResponse = response.choices[0].message.content;
    console.log("Model response:", modelResponse);

    res.status(200).json(modelResponse);
  } catch (error) {
    console.error("Couldnt generate response", error);
  }
});

module.exports = chatBotRouter;
