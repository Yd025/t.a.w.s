import {
  ArrowUp,
  BookOpen,
  CheckCircle2,
  Circle,
  FileText,
  HelpCircle,
  Paperclip,
  Sparkles,
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { parseLlmResponse } from '@/lib/chat-api';

const CHAT_API_URL = import.meta.env.VITE_CHAT_API_URL ?? '/v1/chat';
import {
  COURSE_SUBTITLE,
  COURSE_TITLE,
  chatSuggestions,
  topics,
} from '@/lib/cse451-schedule';
import { Button } from '@/app/components/ui/button';
import { cn } from '@/app/components/ui/utils';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const initialMessages: Message[] = [
  {
    id: '1',
    role: 'assistant',
    content:
      "Hello! I'm your AI learning assistant for CSE 451. I have access to course materials including lectures and the syllabus. I'm here to help you understand operating systems concepts and guide your learning. How can I assist you today?",
    timestamp: new Date(),
  },
];

const suggestionIcons = [BookOpen, HelpCircle, FileText];

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [sessionId] = useState(() => Math.random().toString(36).substring(2, 15));
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

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
      const res = await fetch(CHAT_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question: question , sessionId: sessionId}),
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

  const completedTopics = topics.filter((t) => t.completed).length;

  return (
    <div className="flex flex-1 min-h-0 flex-col gradient-bg">
      <header className="flex shrink-0 items-center justify-between border-b border-border/40 bg-card/40 px-8 py-5 backdrop-blur-xl">
        <div>
          <h1 className="font-serif text-2xl font-bold tracking-tight text-foreground">
            {COURSE_TITLE}
          </h1>
          <p className="text-sm text-muted-foreground">{COURSE_SUBTITLE}</p>
        </div>
        <span className="flex items-center gap-2 rounded-full border border-[oklch(0.85_0.06_160)] bg-[oklch(0.95_0.04_160)] px-3 py-1.5 text-sm font-medium text-[oklch(0.4_0.12_160)]">
          <span className="h-2 w-2 animate-pulse rounded-full bg-[oklch(0.55_0.15_160)]" />
          Online
        </span>
      </header>

      <div className="flex min-h-0 flex-1 overflow-hidden">
        <aside className="topics-panel-bg hidden w-72 shrink-0 flex-col border-r border-border/60 lg:flex">
          <div className="border-b border-border/60 p-5">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="font-semibold text-foreground">Course Topics</h2>
              <span className="text-xs font-medium text-primary">
                {completedTopics}/{topics.length}
              </span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-white/60 shadow-inner">
              <div
                className="h-full rounded-full bg-gradient-to-r from-primary via-accent to-[oklch(0.7_0.15_50)] transition-all duration-500"
                style={{ width: `${(completedTopics / topics.length) * 100}%` }}
              />
            </div>
          </div>
          <div className="min-h-0 flex-1 overflow-y-auto p-4">
            <div className="space-y-1.5">
              {topics.map((topic) => (
                <div
                  key={topic.id}
                  className={cn(
                    'flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left transition-all',
                    topic.completed
                      ? 'bg-white/50 shadow-sm'
                      : 'hover:bg-white/40',
                  )}
                >
                  {topic.completed ? (
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-accent shadow-sm">
                      <CheckCircle2 className="h-4 w-4 text-primary-foreground" />
                    </div>
                  ) : (
                    <Circle className="h-6 w-6 shrink-0 text-muted-foreground/50" />
                  )}
                  <div className="min-w-0 flex-1">
                    <p
                      className={cn(
                        'truncate text-sm font-medium',
                        topic.completed ? 'text-foreground' : 'text-muted-foreground',
                      )}
                    >
                      {topic.title}
                    </p>
                    <p className="text-xs text-muted-foreground/70">Week {topic.week}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </aside>

        <div className="flex min-h-0 min-w-0 flex-1 flex-col">
          <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-6 py-8">
            <div className="mx-auto max-w-2xl space-y-6">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={cn(
                    'flex gap-4',
                    message.role === 'user' && 'flex-row-reverse',
                  )}
                >
                  {message.role === 'assistant' && (
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-accent shadow-lg shadow-primary/20">
                      <Sparkles className="h-5 w-5 text-primary-foreground" />
                    </div>
                  )}
                  <div
                    className={cn(
                      'max-w-[85%] rounded-2xl px-5 py-4',
                      message.role === 'user'
                        ? 'bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-lg shadow-primary/20'
                        : 'border border-border/50 bg-card text-card-foreground shadow-sm',
                    )}
                  >
                    <p className="whitespace-pre-wrap text-sm leading-relaxed">
                      {message.content}
                    </p>
                    <p
                      className={cn(
                        'mt-3 text-xs',
                        message.role === 'user'
                          ? 'text-primary-foreground/60'
                          : 'text-muted-foreground',
                      )}
                    >
                      {message.timestamp.toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-accent shadow-lg shadow-primary/20">
                    <Sparkles className="h-5 w-5 text-primary-foreground" />
                  </div>
                  <div className="rounded-2xl border border-border/50 bg-card px-5 py-4 shadow-sm">
                    <div className="flex gap-1.5">
                      <span className="h-2.5 w-2.5 animate-bounce rounded-full bg-primary/60" />
                      <span className="h-2.5 w-2.5 animate-bounce rounded-full bg-primary/60 [animation-delay:0.15s]" />
                      <span className="h-2.5 w-2.5 animate-bounce rounded-full bg-primary/60 [animation-delay:0.3s]" />
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>
          </div>

          {messages.length <= 1 && (
            <div className="shrink-0 border-t border-border/50 bg-card/30 px-6 py-5">
              <div className="mx-auto max-w-2xl">
                <p className="mb-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Quick suggestions
                </p>
                <div className="flex flex-wrap gap-2">
                  {chatSuggestions.map((suggestion, i) => {
                    const Icon = suggestionIcons[i] ?? BookOpen;
                    return (
                      <button
                        key={suggestion.text}
                        type="button"
                        onClick={() => setInput(suggestion.text)}
                        className="flex items-center gap-2 rounded-full border border-border/50 bg-card px-4 py-2.5 text-sm text-foreground transition-all hover:border-primary/30 hover:bg-secondary hover:shadow-md hover:shadow-primary/5"
                      >
                        <Icon className="h-4 w-4 text-primary" />
                        {suggestion.text}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          <div className="shrink-0 border-t border-border/50 bg-card/50 px-6 py-5 backdrop-blur-sm">
            <div className="mx-auto max-w-2xl">
              <div className="flex items-end gap-3 rounded-2xl border border-border/50 bg-background p-2 shadow-lg transition-all focus-within:border-primary/50 focus-within:shadow-primary/10">
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="shrink-0 text-muted-foreground hover:bg-secondary hover:text-foreground"
                  aria-label="Attach file"
                >
                  <Paperclip className="h-5 w-5" />
                </Button>
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      void handleSend();
                    }
                  }}
                  placeholder="Ask anything about your course..."
                  className="max-h-32 min-h-[48px] flex-1 resize-none bg-transparent py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
                  rows={1}
                />
                <Button
                  type="button"
                  onClick={() => void handleSend()}
                  disabled={!input.trim() || isTyping}
                  size="icon"
                  className="shrink-0 rounded-xl bg-gradient-to-br from-primary to-accent text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:opacity-90 disabled:opacity-50"
                >
                  <ArrowUp className="h-5 w-5" />
                </Button>
              </div>
              <p className="mt-3 text-center text-xs text-muted-foreground">
                AI responses are based on your course materials and may not always be accurate.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
