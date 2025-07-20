export default function LoadingBubble() {
  return (
    <div className="flex justify-start mb-2">
      <div className="bg-gray-200 text-gray-800 rounded-xl rounded-bl-none p-3 max-w-[70%]">
        <div className="flex space-x-1 items-center">
          <div className="flex space-x-1">
            <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
            <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></div>
            <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
          </div>
        </div>
      </div>
    </div>
  )
}
