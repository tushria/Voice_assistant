let apikey="AIzaSyAZpX88ePbR00S3jfRAZ_HLPtUuippqhvo";

import {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
    ChatSession,
} from "@google/generative-ai";


const genAI = new GoogleGenerativeAI(apikey);

const model = genAI.getGenerativeModel({
    model:"gemini-1.5-flash",
});

const generationConfig = {
    temperature:1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 9192,
    responseMimeType:"text/plain",
};

async function run(prompt){
    const chatSession = model.startChat({
        generationConfig,
        history:[

        ],
    });

    const result =await chatSession.sendMessage(prompt);
    return result.response.text()
}
export default run;