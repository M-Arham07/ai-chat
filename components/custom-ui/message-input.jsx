"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Send } from "lucide-react"

export default function MessagingInput({ onSend, placeholder = "Type a message...", disabled = false }) {
  const [message, setMessage] = useState("")
  const [isDark, setIsDark] = useState(true) // Default to dark mode
  const textareaRef = useRef(null)
  const [bottomOffset, setBottomOffset] = useState(null)



  // Handle keyboard visibility and textarea auto-resize
  useEffect(() => {
    const vv = window.visualViewport;

    const updatePosition = () => {
      const keyboardHeight = window.innerHeight - vv.height - vv.offsetTop;

      if (keyboardHeight > 150) {
        // Keyboard is likely open
        setBottomOffset(keyboardHeight + 10); // padding above keyboard
      } else {
        // Keyboard closed
        setBottomOffset(null);
      }
    };

    vv.addEventListener('resize', updatePosition);
    vv.addEventListener('scroll', updatePosition);

    return () => {
      vv.removeEventListener('resize', updatePosition);
      vv.removeEventListener('scroll', updatePosition);
    };
  }, [])

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      const scrollHeight = textareaRef.current.scrollHeight;
      const maxHeight = window.innerHeight * 0.3; // 30vh
      textareaRef.current.style.height = `${Math.min(scrollHeight, maxHeight)}px`;
    }
  }, [message])

  // Apply dark mode class to document
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [isDark])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (message.trim() && !disabled) {
      onSend(message.trim());
      setMessage("")
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  const handleChange = (e) => {
    setMessage(e.target.value)
  }

  return (
    <div 
      className="fixed w-full bg-black/80 backdrop-blur-sm text-white p-4 sm:p-6"
      style={{
        bottom: bottomOffset !== null ? `${bottomOffset}px` : 0,
        transition: 'bottom 0.3s ease'
      }}
    >
      {/* Custom Scrollbar Styles */}
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #ffffff;
          border-radius: 2px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #cccccc;
        }
        
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: #ffffff transparent;
        }
      `}</style>

      <div className="w-full max-w-4xl mx-auto mb-10">
        <div className="flex gap-2">
          <textarea
            ref={textareaRef}
            value={message}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            className="flex-1 resize-none bg-black text-white border-2 border-white rounded-lg sm:rounded-xl p-3 sm:p-4 text-sm sm:text-base leading-relaxed placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white focus:border-white transition-all duration-200 custom-scrollbar disabled:opacity-50 disabled:cursor-not-allowed overflow-y-auto"
            rows={1}
            style={{
              minHeight: "52px",
              maxHeight: "30vh"
            }}
          />
          <Button
            onClick={handleSubmit}
            disabled={!message.trim() || disabled }
            className="bg-white text-black hover:bg-gray-200 disabled:bg-gray-600 disabled:text-gray-400 disabled:cursor-not-allowed transition-all duration-200 rounded-lg sm:rounded-xl px-4 mt-0.5 sm:mt-0 sm:px-6 py-4 sm:py-4 font-medium text-sm sm:text-base flex items-center gap-2 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 h-full"
          >
            <Send className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="hidden sm:inline">Send</span>
          </Button>
        </div>
      </div>
    </div>
  )
}
