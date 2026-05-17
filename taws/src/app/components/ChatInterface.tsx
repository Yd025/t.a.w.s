import { Send, Bot, User } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface CourseMaterial {
  id: string;
  name: string;
  type: 'pdf' | 'doc' | 'note';
  uploadedAt: Date;
}

interface ChatInterfaceProps {
  materials: CourseMaterial[];
  onFlaggedPrompt: () => void;
}

export function ChatInterface({ materials, onFlaggedPrompt }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Hello! I\'m your AI learning assistant. I can answer questions based on the course materials provided by your professor.',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const isPolicyViolation = (question: string) => {
    const policyTerms = ['illegal', 'harm', 'attack', 'violence', 'cheat', 'hate'];
    return policyTerms.some((term) => question.toLowerCase().includes(term));
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Math.random().toString(36).substr(2, 9),
      role: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages((current) => [...current, userMessage]);
    const violation = isPolicyViolation(input);
    if (violation) {
      onFlaggedPrompt();
    }

    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const aiMessage: Message = {
        id: Math.random().toString(36).substr(2, 9),
        role: 'assistant',
        content: violation
          ? 'That request may violate usage policy, so I can\'t provide an answer. Your professor will be notified if there are repeated policy issues.'
          : generateAIResponse(input),
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1000);
  };

  const generateAIResponse = (question: string): string => {
    const lowerQuestion = question.toLowerCase();

    const materialNames = materials.map((material) => material.name.toLowerCase());

    if (lowerQuestion.includes('neural network') && materialNames.some((name) => name.includes('neural networks'))) {
      return 'A neural network is a computational model inspired by biological neural systems. It consists of interconnected neurons organized into layers, which transform inputs into outputs through learned weights and activation functions. Would you like to review an example from your course materials?';
    }

    if (lowerQuestion.includes('machine learning') && materialNames.some((name) => name.includes('machine learning'))) {
      return 'Machine learning is the study of algorithms that improve through experience. Common categories include supervised learning, unsupervised learning, and reinforcement learning. Which part of the course would you like to explore in more detail?';
    }

    return 'I can help you answer questions from the course materials your professor provided. Ask about concepts, definitions, examples, or summaries from the syllabus and readings.';
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex-1 h-full flex flex-col bg-background">
      <div className="flex-1 overflow-y-auto p-6 pb-32">
        <div className="max-w-3xl mx-auto space-y-6">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-4 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {message.role === 'assistant' && (
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                  <Bot className="w-5 h-5 text-primary-foreground" />
                </div>
              )}
              <div
                className={`max-w-[70%] rounded-2xl px-4 py-3 ${
                  message.role === 'user'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-foreground'
                }`}
              >
                <p className="text-sm">{message.content}</p>
                <p className={`text-xs mt-1 ${message.role === 'user' ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
              {message.role === 'user' && (
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                  <User className="w-5 h-5 text-foreground" />
                </div>
              )}
            </div>
          ))}
          {isTyping && (
            <div className="flex gap-4 justify-start">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                <Bot className="w-5 h-5 text-primary-foreground" />
              </div>
              <div className="bg-muted rounded-2xl px-4 py-3">
                <div className="flex gap-1">
                  <div className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      <div className="fixed bottom-0 left-80 right-0 bg-background border-t border-border p-6">
        <div className="max-w-3xl mx-auto">
          <div className="flex gap-3 items-end">
            <div className="flex-1 bg-input-background rounded-2xl px-4 py-3 border border-border focus-within:border-primary transition-colors">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me anything about your course materials..."
                className="w-full bg-transparent outline-none text-foreground placeholder:text-muted-foreground"
              />
            </div>
            <button
              onClick={handleSend}
              disabled={!input.trim()}
              className="flex-shrink-0 w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
          <p className="text-xs text-muted-foreground mt-2 text-center">
            AI responses are based on your professor-provided course materials.
          </p>
        </div>
      </div>
    </div>
  );
}
