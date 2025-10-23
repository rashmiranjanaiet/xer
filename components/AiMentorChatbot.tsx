
import React, { useState } from 'react';

const AiMentorChatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello! I'm your AI Mentor. How can I help you with your career path today?", sender: 'bot' },
  ]);
  const [input, setInput] = useState('');

  const toggleChat = () => setIsOpen(!isOpen);

  const handleSend = () => {
    if (input.trim() === '') return;

    const newMessages = [...messages, { id: Date.now(), text: input, sender: 'user' }];
    setMessages(newMessages);
    setInput('');

    // Simulate bot response
    setTimeout(() => {
        let botResponse = "That's a great question! Based on your profile, for Product Design, you should focus on learning Figma, User Research, and Prototyping principles. I've added some course suggestions to your dashboard.";
        if(input.toLowerCase().includes("resume")) {
            botResponse = "Your resume is strong in technical projects. To improve, try adding a 'Professional Summary' at the top to quickly grab a recruiter's attention. Quantify your achievements, for example, 'Increased performance by 15%' instead of just 'improved performance'."
        }

        setMessages([...newMessages, { id: Date.now() + 1, text: botResponse, sender: 'bot' }]);
    }, 1500);
  };

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50">
        <button onClick={toggleChat} className="bg-primary-600 text-white w-16 h-16 rounded-full shadow-lg flex items-center justify-center hover:bg-primary-700 transition-transform transform hover:scale-110">
          {isOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
              <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
                <path d="M4.913 2.658c2.075-.27 4.19-.408 6.337-.408 2.147 0 4.262.139 6.337.408 1.92.23 3.426 1.043 4.402 2.016 1.028.987 1.625 2.242 1.735 3.546.11.1284.19.2711.244.418.065.18.093.368.093.56 0 .193-.028.38-.093.56-.054.147-.134.289-.244.418-.11.1292-.25.2417-.403.344-1.46.99-3.267 1.69-5.278 2.112a25.353 25.353 0 0 1-6.103.41c-2.093 0-4.13-.13-6.103-.41-2.01-.422-3.818-1.122-5.278-2.112a2.43 2.43 0 0 1-.403-.344.99.99 0 0 1-.244-.418c-.065-.18-.093-.368-.093-.56 0-.193.028-.38.093-.56.054-.147.134-.289.244-.418.11-.1303.25-.241.403-.344 1.46-.99 3.267-1.69 5.278-2.112Zm1.636 11.362c.413 1.092 1.258 2.04 2.378 2.712a25.011 25.011 0 0 0 5.152 1.07c1.718 0 3.399-.13 5.02-.38a2.44 2.44 0 0 0 1.93-1.402 1.03 1.03 0 0 0-.34-1.282 2.44 2.44 0 0 0-2.06-1.08c-1.382-.05-2.783-.09-4.195-.09-1.412 0-2.813.04-4.195.09a2.44 2.44 0 0 0-2.06 1.08 1.03 1.03 0 0 0-.34 1.282Z" />
            </svg>
          )}
        </button>
      </div>
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-80 h-96 bg-white dark:bg-slate-800 rounded-lg shadow-2xl flex flex-col border border-slate-200 dark:border-slate-700 animate-fade-in-up">
          <div className="p-3 bg-primary-600 text-white rounded-t-lg">
            <h3 className="font-bold text-lg">AI Mentor</h3>
          </div>
          <div className="flex-1 p-4 overflow-y-auto space-y-4">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-xs px-3 py-2 rounded-xl ${msg.sender === 'user' ? 'bg-primary-500 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200'}`}>
                  {msg.text}
                </div>
              </div>
            ))}
          </div>
          <div className="p-2 border-t border-slate-200 dark:border-slate-700">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask me anything..."
                className="flex-1 px-3 py-2 bg-slate-100 dark:bg-slate-700 border-transparent rounded-md focus:ring-2 focus:ring-primary-500 focus:outline-none"
              />
              <button onClick={handleSend} className="bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700 transition">Send</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AiMentorChatbot;
