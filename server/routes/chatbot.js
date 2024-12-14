const { Router } = require("express");
const chatBotRouter = Router();
const OpenAI = require("openai");
const openai = new OpenAI();

chatBotRouter.post("/", async (req, res) => {
  const userMessage = req.body.message;
  console.log(userMessage);
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "You are a helpful assistant called NuusAi. You work for a neutreceuticals company called Nuusero",
        },
        { role: "user", content: userMessage },
      ],
    });

    const modelResponse = response.choices[0].message.content;
    console.log("Model response:", modelResponse);

    res.status(200).json(modelResponse);
  }catch(error){
    console.error("Couldnt generate response", error);
  }
});

module.exports = chatBotRouter;
