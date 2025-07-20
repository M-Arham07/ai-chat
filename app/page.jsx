"use client";
import LoadingBubble from "@/components/loading-message";
import MessageBubble from "@/components/message-bubble";
import MessagingInput from "@/components/message-input";
import { useState, useEffect,useRef, Fragment } from "react";



export default function Home() {
  const [msgs, setMsgs] = useState([]); // initialize an empty array
  const [messageTimes, setMessageTimes] = useState([]); // array of timestamps
  const [lastMessageMinute, setLastMessageMinute] = useState('');
  const messagesEndRef = useRef(null);

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

  const handleSend = (prompt) => {
    const now = Date.now();
    setMsgs((prev) => [...prev, {
      role: "user",
      parts: [{ text: prompt }]
    }]);

    setMessageTimes(prev => [...prev, now]);
  }








  return (
    <main className="flex flex-col min-h-screen">
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

                  <LoadingBubble />
                </Fragment>
              )

            })
          }
          <div ref={messagesEndRef} className="flex-1 overflow-y-auto p-4 pb-10 scroll-pb-32 scroll-pt-4" /> {/* Scroll anchor */}
        </div>
      </div>
      <MessagingInput onSend={handleSend} />
    </main>
  )
}


