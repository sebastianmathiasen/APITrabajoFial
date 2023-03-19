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
            prompt: `Crea un cuento para niños centrado en el siguiente hecho o lugar histórico: ${historicalFact}. El cuento debe proporcionar detalles precisos y específicos sobre este hecho histórico para enseñar a los niños acerca de él. Incluye en la historia un héroe: ${hero} y un villano: ${villain}. La narración debe incorporar elementos de ficción y fantasía siguiendo el estilo: ${fictionalWay}. Asegúrate de que el cuento sea entretenido e informativo, permitiendo a los lectores aprender sobre el hecho histórico mientras disfrutan de la trama.`,
            max_tokens: 1500,
            temperature: 0.5,
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

