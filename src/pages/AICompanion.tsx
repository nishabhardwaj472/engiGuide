import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Navbar } from '@/components/layout/Navbar';
import { Button } from '@/components/ui/button';
import { Send, Sparkles, Bot, User } from 'lucide-react';
import { aiResponses } from '@/data/mockData';

interface Message {
  id: number;
  text: string;
  isAI: boolean;
  typing?: boolean;
}

const samplePrompts = [
  "What should I study today?",
  "Is this subject important?",
  "I'm feeling overwhelmed",
  "How do I prepare for placements?",
];

const AICompanion = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hey! 👋 I'm your AI study companion. Ask me anything about your studies, career, or just vent about engineering. I'm here to help!",
      isAI: true,
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = (text: string) => {
    if (!text.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now(),
      text: text.trim(),
      isAI: false,
    };
    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI typing
    setTimeout(() => {
      const response = aiResponses[text.trim()] || 
        "That's a great question! Based on your current progress and goals, I'd suggest focusing on one subject at a time. Would you like me to create a personalized study plan for you? 📚";
      
      const aiMessage: Message = {
        id: Date.now() + 1,
        text: response,
        isAI: true,
      };
      setMessages((prev) => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="flex-1 pt-24 pb-6 px-4 flex flex-col">
        <div className="container max-w-3xl mx-auto flex-1 flex flex-col">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 glass-card rounded-full mb-4">
              <Sparkles className="w-4 h-4 text-accent" />
              <span className="text-sm text-muted-foreground">AI-Powered Assistant</span>
            </div>
            <h1 className="text-3xl font-bold">
              Your <span className="gradient-text">AI Companion</span>
            </h1>
            <p className="text-muted-foreground mt-1">
              Ask anything about studies, career, or mental clarity
            </p>
          </motion.div>

          {/* Chat container */}
          <div className="flex-1 glass-card p-4 mb-4 overflow-y-auto max-h-[50vh] md:max-h-[55vh]">
            <div className="space-y-4">
              {messages.map((message, index) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`flex gap-3 ${message.isAI ? '' : 'flex-row-reverse'}`}
                >
                  {/* Avatar */}
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                      message.isAI
                        ? 'bg-gradient-to-br from-primary to-accent'
                        : 'bg-gradient-to-br from-secondary to-teal-400'
                    }`}
                  >
                    {message.isAI ? (
                      <Bot className="w-4 h-4 text-white" />
                    ) : (
                      <User className="w-4 h-4 text-white" />
                    )}
                  </div>

                  {/* Message bubble */}
                  <div
                    className={`max-w-[80%] p-4 rounded-2xl ${
                      message.isAI
                        ? 'bg-muted/50 rounded-tl-none'
                        : 'bg-primary/20 rounded-tr-none'
                    }`}
                  >
                    <p className="text-sm leading-relaxed whitespace-pre-line">
                      {message.text}
                    </p>
                  </div>
                </motion.div>
              ))}

              {/* Typing indicator */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex gap-3"
                >
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                  <div className="bg-muted/50 p-4 rounded-2xl rounded-tl-none">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Sample prompts */}
          <div className="mb-4 flex flex-wrap gap-2">
            {samplePrompts.map((prompt) => (
              <button
                key={prompt}
                onClick={() => handleSend(prompt)}
                className="px-3 py-2 text-sm glass-card hover:bg-white/10 transition-colors"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Input */}
          <div className="glass-card p-2 flex gap-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend(inputValue)}
              placeholder="Ask me anything..."
              className="flex-1 bg-transparent border-none outline-none px-4 py-3 text-sm placeholder:text-muted-foreground"
            />
            <Button
              variant="hero"
              size="icon"
              onClick={() => handleSend(inputValue)}
              disabled={!inputValue.trim()}
              className="w-12 h-12"
            >
              <Send className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AICompanion;
