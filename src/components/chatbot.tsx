'use client';
import React, { useState, useRef, useEffect } from 'react';
import { Bot, Send } from 'lucide-react';

interface Message {
  sender: 'user' | 'bot';
  text: string;
}

const formatBotText = (text: string): string => {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  const textWithLinks = text.replace(
    urlRegex,
    '<a href="$1" target="_blank" rel="noopener noreferrer" class="text-yellow-300 underline">$1</a>'
  );
  return textWithLinks.replace(/\n/g, '<br>');
};

const getFallbackResponse = (userInput: string): string => {
  const userInputLower = userInput.toLowerCase();
  if (userInputLower.includes('service') || userInputLower.includes('offer')) {
    return "Tendani Holdings offers Cleaning and Gardening services. How can we help with your project?";
  }
  if (
    userInputLower.includes('contact') ||
    userInputLower.includes('call') ||
    userInputLower.includes('phone')
  ) {
    return 'You can contact us at +27644836405 to discuss your project needs.';
  }
  if (
    userInputLower.includes('about') ||
    userInputLower.includes('company') ||
    userInputLower.includes('who')
  ) {
    return "Tendani Holdings is dedicated to providing exceptional cleaning and gardening services. Our team is passionate about helping enhance the beauty and value of every property we touch.";
  }
  return "I'm currently in offline mode, but I'd be happy to tell you about our services, our company, or how to contact us. What would you like to know?";
};

const getInitialMessages = (apiKeyValid: boolean | null): Message[] => {
  if (apiKeyValid === false) {
    return [
      {
        sender: 'bot',
        text: "Hi! I'm currently in offline mode due to a connection issue, but I can still provide basic information about Tendani Holdings. How can I help you today?",
      },
    ];
  }
  return [{ sender: 'bot', text: 'Hi! How can I help you today?' }];
};

const Chatbot: React.FC = () => {
  const [apiKeyValid, setApiKeyValid] = useState<boolean | null>(null);
  const [messages, setMessages] = useState<Message[]>(
    getInitialMessages(null)
  );
  const [input, setInput] = useState('');
  const [open, setOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const initialMessagesRef = useRef<Message[]>(getInitialMessages(null));

  useEffect(() => {
    if (
      initialMessagesRef.current.length === 1 &&
      initialMessagesRef.current[0].sender === 'bot'
    ) {
      setMessages(getInitialMessages(apiKeyValid));
    }
  }, [apiKeyValid]);

  useEffect(() => {
    if (open && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, open]);

  useEffect(() => {
    const checkApiKeyValidity = async () => {
      try {
        const apiKey = process.env.NEXT_PUBLIC_GROQ_API_KEY || '';
        if (!apiKey || apiKey === 'YOUR_API_KEY_HERE') {
          setApiKeyValid(false);
          return;
        }
        const response = await fetch('https://api.groq.com/openai/v1/models', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${apiKey}`,
          },
        });
        setApiKeyValid(response.ok);
      } catch (error) {
        console.error('API key validation error:', error);
        setApiKeyValid(false);
      }
    };
    checkApiKeyValidity();
  }, []);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMessage: Message = { sender: 'user', text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    try {
      let botReply = '';
      if (apiKeyValid === false) {
        botReply = getFallbackResponse(userMessage.text);
      } else {
        const apiKey = process.env.NEXT_PUBLIC_GROQ_API_KEY || '';
        const response = await fetch(
          'https://api.groq.com/openai/v1/chat/completions',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
              model: 'llama3-8b-8192',
              messages: [
                {
                  role: 'system',
                  content: `You are a helpful AI assistant for Tendani Holdings, a company that specializes in cleaning and gardening services. 
                  Your name is Tendani Assistant. 
                  The contact number is +27644836405. 
                  Keep your responses concise, friendly, and focused on helping potential clients understand Tendani Holdings's services. 
                  If asked about pricing, explain that it varies by project scope and invite them to contact the company for a personalized quote. 
                  If you don't know something specific about the company, don't make up details - instead, suggest contacting the company directly. 
                  Avoid using markdown formatting in your responses.`,
                },
                ...messages.map((msg) => ({
                  role: msg.sender === 'user' ? 'user' : 'assistant',
                  content: msg.text,
                })),
                { role: 'user', content: userMessage.text },
              ],
              temperature: 0.7,
              max_tokens: 800,
            }),
          }
        );

        if (!response.ok) {
          throw new Error(`API request failed with status ${response.status}`);
        }

        const data = await response.json();
        botReply = data.choices[0].message.content;
      }

      const cleanedBotReply = botReply.replace(/\*/g, '');
      setMessages((prev) => [...prev, { sender: 'bot', text: cleanedBotReply }]);
      setIsTyping(false);
    } catch (error) {
      console.error('Chatbot error:', error);
      const fallbackResponse = getFallbackResponse(userMessage.text);
      setMessages((prev) => [
        ...prev,
        { sender: 'bot', text: fallbackResponse },
      ]);
      setIsTyping(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleSend();
  };

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-center space-y-2">
        {!open && <p className="text-white text-center text-sm bg-gray-800 bg-opacity-75 p-2 rounded-lg shadow-lg border border-yellow-400 animate-fadeInUpBig">
          Talk to an Agent!
        </p>}
        <button
          className="bg-primary text-primary-foreground rounded-full shadow-lg p-4 h-16 w-16 hover:bg-primary/90 focus:outline-none"
          onClick={() => setOpen((o) => !o)}
          aria-label="Open chatbot"
        >
          <Bot className="h-8 w-8" />
        </button>

        {open && (
          <div className="absolute bottom-24 right-0 w-80 max-w-[95vw] bg-card border border-primary rounded-xl shadow-2xl z-50 flex flex-col overflow-hidden">
            <div className="p-4 border-b border-primary bg-primary text-primary-foreground font-extrabold text-lg flex items-center justify-between">
              <div className="flex items-center gap-2">
                 <Bot className="w-8 h-8" />
                <span>Tendani Assistant</span>
                {apiKeyValid === false && (
                  <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800">
                    Offline
                  </span>
                )}
              </div>
            </div>
            <div className="flex-1 p-4 overflow-y-auto max-h-72">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`mb-2 flex ${
                    msg.sender === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  {msg.sender === 'user' ? (
                    <div className="px-3 py-2 rounded-xl text-sm max-w-[75%] bg-primary text-primary-foreground shadow-md">
                      {msg.text}
                    </div>
                  ) : (
                    <div
                      className="px-3 py-2 rounded-xl text-sm max-w-[75%] bg-muted text-muted-foreground shadow-md"
                      dangerouslySetInnerHTML={{
                        __html: formatBotText(msg.text),
                      }}
                    />
                  )}
                </div>
              ))}
              {isTyping && (
                <div className="mb-2 flex justify-start">
                  <div className="px-3 py-2 rounded-xl text-sm max-w-[75%] bg-muted text-muted-foreground opacity-70 animate-pulse shadow-md">
                    Tendani is typing...
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
            <div className="p-2 border-t border-border flex gap-2 bg-card w-full"
     style={{ minHeight: '56px', boxSizing: 'border-box' }}>
  <input
    type="text"
    className="flex-1 px-3 py-2 rounded-full bg-background text-foreground border border-border focus:outline-none focus:border-primary transition-all duration-200 min-w-0"
    placeholder="Type your message..."
    value={input}
    onChange={(e) => setInput(e.target.value)}
    onKeyDown={handleKeyDown}
    style={{ fontSize: '1rem' }}
  />
  <button
    className="bg-primary text-primary-foreground px-4 py-2 rounded-full hover:bg-primary/90 font-semibold transition-all duration-200 transform hover:scale-105 whitespace-nowrap"
    onClick={handleSend}
    disabled={!input.trim()}
    style={{ fontSize: '1rem', minWidth: '64px' }}
  >
    <Send className="h-4 w-4" />
  </button>
</div>
          </div>
        )}
      </div>
    </>
  );
};

export default Chatbot;
