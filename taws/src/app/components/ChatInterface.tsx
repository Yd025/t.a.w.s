import { Send, Bot, User } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

// Same-origin path; Amplify (prod) and Vite (dev) proxy to API Gateway (avoids CORS).
const CHAT_API_URL = import.meta.env.VITE_CHAT_API_URL ?? '/v1/chat';

function extractLlmText(data: unknown): string | null {
  if (typeof data === 'string' && data.trim()) return data;
  if (!data || typeof data !== 'object') return null;
  const o = data as Record<string, unknown>;
  const keys = [
    'response',
    'message',
    'answer',
    'text',
    'content',
    'output',
    'result',
  ];
  for (const k of keys) {
    const v = o[k];
    if (typeof v === 'string' && v.trim()) return v;
  }
  return null;
}

function parseLlmResponse(raw: string): string {
  const trimmed = raw.trim();
  try {
    const outer = JSON.parse(trimmed) as unknown;
    const direct = extractLlmText(outer);
    if (direct) return direct;

    if (outer && typeof outer === 'object' && 'body' in outer) {
      const body = (outer as { body: unknown }).body;
      if (typeof body === 'string') {
        const innerTrim = body.trim();
        try {
          const inner = JSON.parse(innerTrim) as unknown;
          return extractLlmText(inner) ?? innerTrim;
        } catch {
          return innerTrim;
        }
      }
    }

    return typeof outer === 'object'
      ? JSON.stringify(outer)
      : String(outer);
  } catch {
    return trimmed;
  }
}

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Hello! I\'m your AI learning assistant for CSE 451. I have access to course materials including lectures and syllabus. I\'m here to help you understand concepts and guide your learning. How can I assist you today?',
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

  const handleSend = async () => {
    const question = input.trim();
    if (!question || isTyping) return;

    const userMessage: Message = {
      id: Math.random().toString(36).substring(2, 11),
      role: 'user',
      content: question,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    try {
      const formData = new FormData();
      formData.append('question', question);

      const res = await fetch(CHAT_API_URL, {
        method: 'POST',
        body: formData,
      });

      const raw = await res.text();
      if (!res.ok) {
        throw new Error(raw || `Request failed with status ${res.status}`);
      }

      const reply = parseLlmResponse(raw);
      const aiMessage: Message = {
        id: Math.random().toString(36).substring(2, 11),
        role: 'assistant',
        content: reply,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Failed to reach the chat service.';
      setMessages((prev) => [
        ...prev,
        {
          id: Math.random().toString(36).substring(2, 11),
          role: 'assistant',
          content: `Sorry, something went wrong: ${message}`,
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      void handleSend();
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
                onKeyDown={handleKeyDown}
                placeholder="Ask me anything about your course materials..."
                className="w-full bg-transparent outline-none text-foreground placeholder:text-muted-foreground"
              />
            </div>
            <button
              type="button"
              onClick={() => void handleSend()}
              disabled={!input.trim() || isTyping}
              className="flex-shrink-0 w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
          <p className="text-xs text-muted-foreground mt-2 text-center">
            AI responses are based on your uploaded course materials
          </p>
        </div>
      </div>
    </div>
  );
}
