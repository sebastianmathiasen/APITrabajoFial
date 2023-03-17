const { Configuration, OpenAIApi } = require("openai");
require('dotenv').config();

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);


const generateStory = async (historicalFact, hero, villain, fictionalWay) => {
    try {
        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: `Crea un cuento para niños que tenga lugar en el siguiente momento histórico o lugar específico:${historicalFact}, el cual presenta un héroe:${hero} que lucha contra un villano:${villain}. Utiliza los siguientes elementos de ficción o fantasia para dar vida a la historia:${fictionalWay}. El cuento debe respetar los sucesos historicos reales y exponerlos para el aprendisaje, solo se debe sumar la fantasia o ficcion para hacerlo entretenido`,
            max_tokens: 1000,
            temperature: 1,
        });
        const { choices } = response.data;
        const [{ text }] = choices;
        return text.trim();

    } catch (error) {
        console.error(error);
        return "I'm sorry, I couldn't generate a story. Please try again.";
    }
};

module.exports = { generateStory };

