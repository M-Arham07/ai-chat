"use client";
import LoadingBubble from "@/components/custom-ui/loading-message";
import MessageBubble from "@/components/custom-ui/message-bubble";
import MessagingInput from "@/components/custom-ui/message-input";
import ModelDropdown from "@/components/custom-ui/model-dropdown";
import GeminiChat from "@/server-actions/Gemini";
import GrokChat from "@/server-actions/Groq";
import { useState, useEffect, useRef, Fragment } from "react";




export default function MessageUI() {
  const [msgs, setMsgs] = useState([]); // initialize an empty array
  const [messageTimes, setMessageTimes] = useState([]); // array of timestamps
  const [lastMessageMinute, setLastMessageMinute] = useState('');
  const [Loading, setIsLoading] = useState(false); // For loading message bubble!
  const messagesEndRef = useRef(null);

  // AI MODELS SWITCH:
  const [Model, setModel] = useState("Gemini")

  // Update lastMessageMinute when a new message is added
  useEffect(() => {
    if (messageTimes.length > 0) {
      const lastTime = messageTimes[messageTimes.length - 1];
      const date = new Date(lastTime);
      const minuteKey = `${date.getHours()}:${date.getMinutes()}`;
      setLastMessageMinute(minuteKey);
    }
  }, [messageTimes]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Scroll to bottom whenever messages change
  useEffect(() => {
    scrollToBottom();
  }, [msgs]);


  const handleSend = async (prompt) => {
    const now = Date.now();
    setMsgs((prev) => [...prev, {
      role: "user",
      parts: [{ text: prompt }]
    }]);
    setMessageTimes(prev => [...prev, now]);



  }


  // CALLING GEMINI AI


  /*   React state update are asynchronous, so we will manage sending in useEffect to 
       ensure Ai is only called after state has been updated
       We will put msgs in the dependecny array
       We will also add a length check to ensure not an empty array is sent */





  useEffect(() => {


    //LENGTH CHECK, AND ONLY RUN THIS FUCNTION IF LAST MSG FROM USER TO AVOID INFINITE LOOP
    if (msgs.length === 0 || msgs[msgs.length - 1].role !== "user") {
      return;
    }

    setIsLoading(true);


    // We will assign a function to the const ChatModel based on condition
    // if model is Gemini then assign it GeminiChat function otherwise GrokChat

    const ChatModel = Model === "Gemini" ? GeminiChat : GrokChat;


    /* Call the ChatModel function and pass msgs (the history + latest prompt, as an argument!)
       Here the chat model could be GeminiChat or GrokChat server action based on user preference */

    ChatModel(msgs).then((RESPONSE) => {

      if (!RESPONSE) {
        throw new Error("Failed to get response from Gemini!")

      }
      console.log("Response is:", RESPONSE)

      setIsLoading(false);
      setMsgs((prev) => [...prev, { role: "model", parts: [{ text: RESPONSE }] }]);


    })
      .catch(err => {
        console.error("Error! Logs:\n", err);

        setIsLoading(false);
        setMsgs((prev) => [...prev, { role: "model", parts: [{ text: "Oops! Something went wrong." }] }]);
        return;

      });



  }, [msgs]);





  return (
    <>



      {/* Fixed Navbar */}
      <nav className="sticky top-0 left-0 w-full border-b border-gray-200 z-20 h-14 flex items-center justify-between px-6 shadow-sm">
        <span className="font-bold text-lg tracking-wide">FreeAI</span>
        <ModelDropdown onModelChange={(model) => setModel(model)} />
      </nav>
      <main className="flex flex-col max-h-[90vh] pt-14">
        <div className="flex-1 overflow-y-auto p-4 pb-32">
          <div className="max-w-2xl mx-auto">
            {



              msgs.map((message, index) => {
                const timestamp = messageTimes[index];
                const key = `msg-${index}`;
                const date = new Date(timestamp);
                const minuteKey = `${date.getHours()}:${date.getMinutes()}`;
                const showTime = minuteKey === lastMessageMinute;

                return (
                  <Fragment key={key}>


                    <MessageBubble
                      content={message.parts[0].text}
                      sender={message.role}
                      timestamp={showTime ? timestamp : null}
                    />



                  </Fragment>
                )

              })
            }

            {/* if loading, then show the loading bubble */}

            {Loading && msgs.length > 0 && msgs[msgs.length - 1]?.role === "user"
              && <LoadingBubble />}

            <div ref={messagesEndRef} className="flex-1 overflow-y-auto p-4 pb-10 scroll-pb-32 scroll-pt-4" /> {/* Scroll anchor */}
          </div>
        </div>
        <MessagingInput onSend={handleSend} />
      </main>
    </>
  )
}


