"use server";

import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({});

// In Contents we pass an array that looks like: [{role:"user",parts:[{text:"your prompt"}]}];

export default async function GeminiChat(chats) {

    console.log("Received params",chats);

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: chats
        });
        console.log("Response is:",response.text)

        // return the response text:
        return response.text;

    }
    catch (err) {
        console.error("Failed Generating Response (Gemini)! Logs:\n ",err);

        // return false if theres an error
        return false;

    }

}

