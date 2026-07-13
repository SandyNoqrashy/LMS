import React, { useState } from 'react';

const AIAssistant = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [showWelcome, setShowWelcome] = useState(true);

  const handleSend = async () => {
    if (!inputValue.trim()) return;

    const newUserMsg = {
      id: "m" + Date.now(),
      sender: "user",
      text: inputValue
    };

    setShowWelcome(false);

    // يبدأ شات جديد بدون الرسائل القديمة
    const updatedMessages = [newUserMsg];

    setMessages(updatedMessages);
    setInputValue("");

    try {
      await fetch("http://localhost:3000/chats/1", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          messages: updatedMessages
        })
      });

      setTimeout(async () => {
        const aiResponse = {
          id: "a" + Date.now(),
          sender: "ai",
          text: "رد الـ AI التلقائي على: " + newUserMsg.text
        };

        const finalMessages = [newUserMsg, aiResponse];

        setMessages(finalMessages);

        await fetch("http://localhost:3000/chats/1", {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            messages: finalMessages
          })
        });

      }, 1000);

    } catch (error) {
      console.error("Error sending message:", error);
    }
  };


  return (
    <div className="flex-1 flex flex-col h-full p-4 md:p-8 bg-gray-50 overflow-y-auto">

      {showWelcome ? (

        <div className="flex flex-col items-center justify-center flex-grow">

          <img
            src="/eyouth.png"
            alt="logo"
            className="w-20 md:w-24 mb-6"
          />

          <h1 className="text-xl md:text-2xl font-bold text-blue-900 mb-8 text-center">
            Ask me anything, How can we help?
          </h1>

          <div className="w-full max-w-4xl">
            <ChatInput
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onSend={handleSend}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-4xl mt-12">

            <Card
              title="Help Me Writing"
              desc="Elevate your writing..."
              color="bg-purple-50"
            />

            <Card
              title="Create a study plan"
              desc="Generate a tailored..."
              color="bg-teal-50"
            />

            <Card
              title="Summarize Lesson"
              desc="Turn lengthy lessons..."
              color="bg-orange-50"
            />

          </div>

        </div>

      ) : (

        <div className="flex flex-col h-full w-full max-w-4xl mx-auto">

          <div className="flex-grow overflow-y-auto mb-4 p-4 space-y-4">

            {messages.map((msg) => (

              <div
                key={msg.id}
                className={`p-4 rounded-lg max-w-[85%] md:max-w-[70%] ${
                  msg.sender === "user"
                    ? "self-end bg-blue-600 text-white ml-auto"
                    : "self-start bg-white border border-gray-200"
                }`}
              >
                {msg.text}
              </div>

            ))}

          </div>


          <div className="w-full">
            <ChatInput
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onSend={handleSend}
            />
          </div>

        </div>

      )}

    </div>
  );
};



const Card = ({ title, desc, color }) => (
  <div
    className={`p-6 rounded-xl border border-gray-200 ${color} cursor-pointer hover:shadow-md transition w-full`}
  >

    <h3 className="font-bold mb-2 text-blue-900">
      {title}
    </h3>

    <p className="text-sm text-gray-600">
      {desc}
    </p>

  </div>
);



const ChatInput = ({ value, onChange, onSend }) => (

  <div className="flex items-center gap-3 w-full">

    <div className="flex-grow border border-gray-300 rounded-lg p-2 flex items-center bg-white shadow-sm">

      <input
        className="flex-grow p-2 outline-none text-gray-700 w-full"
        placeholder="Send message..."
        value={value}
        onChange={onChange}
        onKeyDown={(e) => e.key === "Enter" && onSend()}
      />

    </div>


    <button
      onClick={onSend}
      className="p-3 bg-blue-100 rounded-full hover:scale-105 transition active:scale-95 shrink-0"
    >

      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#5C80ED"
        strokeWidth="2"
      >

        <path
          d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

      </svg>

    </button>

  </div>

);


export default AIAssistant;
