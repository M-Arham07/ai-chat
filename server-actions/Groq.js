"use server";
import Groq from "groq-sdk";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export default async function GrokChat(chats) {
    console.log("GrokChat: Received Params", chats)

    // GROQ API ACCEPTS MESSAGES IN A DIFFERENT WAY, SO I WILL HAVE TO CHANGE ITS STRUCTURE HERE

    // GEMINI's content array looks like this :  [ {role:"user", parts:[{text:"xyz"}] } ]

    let messages = [];


    chats.map(k => {
        let role = k.role;

        if (role === "model") { // GroqAPI uses role= assistant instead of model 
            role = "assistant"
        }


        let text = k.parts[0].text;

        messages.push({
            role: role,
            content: text
        })

    });

    console.log("Sending this to grok",messages);

    try {

        const completion = await groq.chat.completions
            .create({
                messages: messages,
                model: "llama-3.3-70b-versatile",
            })

        //   console.log(completion.choices[0].message.content);

        // Return the response text from AI:

        return completion?.choices[0]?.message?.content;

    }

    catch (err) {
        console.error("An error occured in Groq! Logs:\n", err);

        return false;
    }

}


