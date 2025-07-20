export default function MessageBubble({ content, sender, timestamp }) {
  const isMe = sender === "user"

  // Convert timestamp to GMT+5 and get minute key
  const getTimeDetails = (timestamp) => {
    if (!timestamp) return { formattedTime: '', minuteKey: '' };
    
    const date = new Date(timestamp);
    const karachi = new Date(date.toLocaleString('en-US', { timeZone: 'Asia/Karachi' }));
    
    return {
      formattedTime: karachi.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      }),
      minuteKey: `${karachi.getHours()}:${karachi.getMinutes()}`
    };
  }

  const { formattedTime, minuteKey } = getTimeDetails(timestamp);

  const bubbleClasses = `
    max-w-[70%] p-3 rounded-xl
    ${isMe ? "bg-blue-500 text-white rounded-br-none" : "bg-gray-200 text-gray-800 rounded-bl-none"}
    break-words
  `

  const containerClasses = `
    flex flex-col mb-1 ${isMe ? "items-end" : "items-start"}
  `

  return (
    <div className={containerClasses}>
      <div className={bubbleClasses}>
        <p className="text-sm">{content}</p>
      </div>
      {minuteKey !== localStorage.getItem('lastMessageMinute') && (
        <div 
          className="text-xs text-gray-500 mt-1 mb-3 px-1"
          onLoad={() => localStorage.setItem('lastMessageMinute', minuteKey)}
        >
          {formattedTime}
        </div>
      )}
    </div>
  )
}
