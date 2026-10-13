"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  MessageCircle,
  X,
  Send,
  RotateCcw,
  Sparkles,
  Bot,
  User,
  ChevronDown,
  PhoneCall,
  ExternalLink,
} from "lucide-react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
  suggestions?: string[];
}

const DEFAULT_SUGGESTIONS = [
  "Get A Free Quote",
  "Explore Services",
  "Pricing & Estimates",
  "Emergency Hotline",
];

const INITIAL_MESSAGES: Message[] = [
  {
    id: "welcome-1",
    role: "assistant",
    content:
      "Hello. Welcome to **Greenly Landscaping**.\n\nI can answer questions about lawn mowing, shrub trimming, seasonal cleanups, irrigation, soil testing, pricing, blog guides, gallery projects, or setting up a free quote.",
    timestamp: "Just now",
    suggestions: DEFAULT_SUGGESTIONS,
  },
];

let messageIdSeq = 0;
function createMessageId(prefix: string) {
  messageIdSeq += 1;
  return `${prefix}-${Date.now()}-${messageIdSeq}`;
}

function getCurrentTime() {
  const d = new Date();
  return `${d.getHours().toString().padStart(2, "0")}:${d.getMinutes().toString().padStart(2, "0")}`;
}

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hasUnread, setHasUnread] = useState(true);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = useCallback((smooth = true) => {
    messagesEndRef.current?.scrollIntoView({
      behavior: smooth ? "smooth" : "auto",
    });
  }, []);

  const handleToggle = () => {
    setIsOpen((prev) => {
      const next = !prev;
      if (next) {
        setHasUnread(false);
      }
      return next;
    });
  };

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
      scrollToBottom(false);
    }
  }, [isOpen, scrollToBottom]);

  useEffect(() => {
    if (isOpen) {
      scrollToBottom(true);
    }
  }, [messages, isLoading, isOpen, scrollToBottom]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputValue).trim();
    if (!text || isLoading) return;

    const timeStr = getCurrentTime();
    const userMessage: Message = {
      id: createMessageId("user"),
      role: "user",
      content: text,
      timestamp: timeStr,
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInputValue("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: newMessages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      const botMessage: Message = {
        id: createMessageId("bot"),
        role: "assistant",
        content:
          data.reply ||
          "For direct assistance or pricing estimates, call +1 (000) 123-4567 or email info@gardencare.com.",
        timestamp: getCurrentTime(),
        suggestions: data.suggestions && data.suggestions.length > 0 ? data.suggestions : undefined,
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      console.error("Chat error:", err);
      const errorMessage: Message = {
        id: createMessageId("bot-err"),
        role: "assistant",
        content:
          "I am having trouble connecting to the service. You can call our office directly at **+1 (000) 123-4567** or email **info@gardencare.com**.",
        timestamp: getCurrentTime(),
        suggestions: ["Contact Information", "Explore Services"],
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: createMessageId("welcome"),
        role: "assistant",
        content:
          "Hello. Welcome to **Greenly Landscaping**.\n\nI can answer questions about lawn mowing, shrub trimming, seasonal cleanups, irrigation, soil testing, pricing, blog guides, gallery projects, or setting up a free quote.",
        timestamp: getCurrentTime(),
        suggestions: DEFAULT_SUGGESTIONS,
      },
    ]);
  };

  // Helper to format markdown bold, links, emails, phone numbers, and internal paths safely
  const renderInlineFormatted = (rawText: string) => {
    // Regex tokens: [label](url) OR **bold** OR internal paths (/gallery, /blog, etc.) OR email OR phone number
    const regex = /(\[[^\]]+\]\([^)]+\)|\*\*[^*]+\*\*|\/(?:gallery|blog|service|about|contact-us|testimonials|privacy)(?:\/[a-z0-9-]+)?|[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}|\+1\s*\(\d{3}\)\s*\d{3}-\d{4})/g;
    const parts = rawText.split(regex);

    return parts.map((part, idx) => {
      if (!part) return null;

      // Markdown links: [label](url)
      const linkMatch = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
      if (linkMatch) {
        return (
          <a
            key={idx}
            href={linkMatch[2]}
            className="text-[#274839] font-medium underline hover:text-[#1b372a]"
            target={linkMatch[2].startsWith("http") ? "_blank" : undefined}
            rel={linkMatch[2].startsWith("http") ? "noopener noreferrer" : undefined}
          >
            {linkMatch[1]}
          </a>
        );
      }

      // Bold: **text**
      if (part.startsWith("**") && part.endsWith("**")) {
        return (
          <strong key={idx} className="font-semibold text-[#1b372a]">
            {part.slice(2, -2)}
          </strong>
        );
      }

      // Internal site routes (/gallery, /blog, etc.)
      if (/^\/(?:gallery|blog|service|about|contact-us|testimonials|privacy)(?:\/[a-z0-9-]+)?$/.test(part)) {
        return (
          <a
            key={idx}
            href={part}
            className="text-[#274839] font-semibold underline decoration-[#bedd25] hover:text-[#1b372a]"
          >
            {part}
          </a>
        );
      }

      // Email address
      if (/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(part)) {
        return (
          <a
            key={idx}
            href={`mailto:${part}`}
            className="text-[#274839] font-medium underline hover:text-[#1b372a]"
          >
            {part}
          </a>
        );
      }

      // Phone number: +1 (000) 123-4567
      if (/^\+1\s*\(\d{3}\)\s*\d{3}-\d{4}$/.test(part)) {
        const telNumber = part.replace(/[^\d+]/g, "");
        return (
          <a
            key={idx}
            href={`tel:${telNumber}`}
            className="font-semibold text-[#274839] underline decoration-[#bedd25] hover:text-[#1b372a]"
          >
            {part}
          </a>
        );
      }

      return <span key={idx}>{part}</span>;
    });
  };

  const formatMessageText = (content: string) => {
    const lines = content.split("\n");
    return lines.map((line, lineIdx) => {
      // Empty lines
      if (!line.trim()) {
        return <div key={lineIdx} className="h-2" />;
      }

      // Bullet points (supports •, -, and *)
      const isBullet = /^[•\-\*]\s*/.test(line.trim());
      const cleanLine = isBullet ? line.trim().replace(/^[•\-\*]\s*/, "") : line;

      if (isBullet) {
        return (
          <div key={lineIdx} className="flex items-start gap-1.5 my-1 text-xs sm:text-sm">
            <span className="text-[#274839] font-bold select-none">•</span>
            <div className="flex-1">{renderInlineFormatted(cleanLine)}</div>
          </div>
        );
      }

      return (
        <p key={lineIdx} className="my-1 text-xs sm:text-sm leading-relaxed">
          {renderInlineFormatted(cleanLine)}
        </p>
      );
    });
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end print:hidden">
      {/* Expanded Chat Window */}
      {isOpen && (
        <div
          role="dialog"
          aria-label="Greenly AI Customer Support Chat"
          data-lenis-prevent
          className="mb-4 w-[calc(100vw-2.5rem)] max-w-[410px] sm:w-[390px] md:w-[410px] h-[540px] max-h-[82vh] bg-[#fbfaf4] rounded-2xl shadow-2xl border border-[#274839]/20 flex flex-col overflow-hidden animate-chat-window"
        >
          {/* Header */}
          <div className="bg-[#274839] text-white px-4 py-3.5 flex items-center justify-between border-b border-[#345c4a] select-none">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-9 h-9 rounded-full bg-[#bedd25] text-[#274839] flex items-center justify-center font-bold shadow-sm">
                  <Bot className="w-5 h-5" />
                </div>
                <span
                  className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 border-2 border-[#274839] rounded-full"
                  title="Online"
                />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="font-semibold text-sm tracking-tight text-[#f2f1e7]">
                    Greenly Assistant
                  </h3>
                  <span className="px-1.5 py-0.2 bg-[#bedd25]/20 text-[#bedd25] text-[10px] font-medium rounded">
                    AI
                  </span>
                </div>
                <p className="text-[11px] text-[#f2f1e7]/80 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block animate-pulse" />
                  Online • Greenly Support
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={handleClearChat}
                title="Reset conversation"
                className="p-1.5 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
                aria-label="Reset conversation"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                title="Minimize chat"
                className="p-1.5 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
                aria-label="Close chat"
              >
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Quick Contact Ribbon */}
          <div className="bg-[#f2f1e7] border-b border-[#274839]/10 px-3.5 py-1.5 flex items-center justify-between text-[11px] text-[#274839]/80 font-medium">
            <span className="flex items-center gap-1.5">
              <PhoneCall className="w-3 h-3 text-[#274839]" />
              Urgent? Call:
              <a
                href="tel:+10001234567"
                className="font-semibold text-[#274839] hover:text-[#1b372a] underline decoration-[#bedd25]"
              >
                +1 (000) 123-4567
              </a>
            </span>
            <a
              href="/contact-us"
              className="text-[#274839] hover:underline flex items-center gap-0.5 text-[10px]"
            >
              Contact page
              <ExternalLink className="w-2.5 h-2.5" />
            </a>
          </div>

          {/* Messages Body */}
          <div
            data-lenis-prevent
            className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#fbfaf4]"
          >
            {messages.map((message) => {
              const isUser = message.role === "user";
              return (
                <div
                  key={message.id}
                  className={`flex gap-2.5 ${isUser ? "justify-end" : "justify-start"}`}
                >
                  {!isUser && (
                    <div className="w-7 h-7 rounded-full bg-[#274839] text-[#bedd25] flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                      <Sparkles className="w-3.5 h-3.5" />
                    </div>
                  )}

                  <div className={`max-w-[82%] sm:max-w-[78%] flex flex-col ${isUser ? "items-end" : "items-start"}`}>
                    <div
                      className={`px-3.5 py-2.5 rounded-2xl text-xs sm:text-sm leading-relaxed shadow-xs ${
                        isUser
                          ? "bg-[#274839] text-white rounded-tr-xs"
                          : "bg-white text-[#1f1f1f] border border-[#274839]/10 rounded-tl-xs shadow-[0_1px_3px_rgba(0,0,0,0.04)]"
                      }`}
                    >
                      {isUser ? (
                        <p className="whitespace-pre-wrap">{message.content}</p>
                      ) : (
                        <div>{formatMessageText(message.content)}</div>
                      )}
                    </div>

                    <span className="text-[10px] text-black/40 mt-1 px-1">
                      {message.timestamp}
                    </span>

                    {/* Quick Suggestions Chips (assistant only) */}
                    {!isUser && message.suggestions && message.suggestions.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-2 pt-1">
                        {message.suggestions.map((suggestion, idx) => (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => handleSendMessage(suggestion)}
                            disabled={isLoading}
                            className="text-[11px] font-medium px-2.5 py-1 bg-white hover:bg-[#bedd25]/20 text-[#274839] border border-[#274839]/20 hover:border-[#bedd25] rounded-full transition-all cursor-pointer shadow-2xs hover:scale-102 active:scale-98 disabled:opacity-50"
                          >
                            {suggestion}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {isUser && (
                    <div className="w-7 h-7 rounded-full bg-[#1b372a] text-white flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                      <User className="w-3.5 h-3.5" />
                    </div>
                  )}
                </div>
              );
            })}

            {/* Typing Indicator */}
            {isLoading && (
              <div className="flex gap-2.5 justify-start items-center">
                <div className="w-7 h-7 rounded-full bg-[#274839] text-[#bedd25] flex items-center justify-center shrink-0">
                  <Sparkles className="w-3.5 h-3.5" />
                </div>
                <div className="bg-white border border-[#274839]/10 px-4 py-2.5 rounded-2xl rounded-tl-xs flex items-center gap-1.5 shadow-xs">
                  <span className="w-2 h-2 rounded-full bg-[#274839] animate-bounce [animation-delay:-0.3s]" />
                  <span className="w-2 h-2 rounded-full bg-[#274839] animate-bounce [animation-delay:-0.15s]" />
                  <span className="w-2 h-2 rounded-full bg-[#274839] animate-bounce" />
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Footer */}
          <div className="p-3 bg-white border-t border-[#274839]/15">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-2"
            >
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about lawn care, quotes, pricing..."
                disabled={isLoading}
                className="flex-1 bg-[#fbfaf4] text-[#1f1f1f] text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-[#274839]/20 focus:outline-none focus:border-[#274839] focus:ring-1 focus:ring-[#274839] placeholder:text-[#606060]/70 disabled:opacity-60 transition-all"
              />
              <button
                type="submit"
                disabled={isLoading || !inputValue.trim()}
                title="Send message"
                className="bg-[#274839] hover:bg-[#1b372a] text-[#bedd25] p-2.5 rounded-xl transition-all flex items-center justify-center shrink-0 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer shadow-xs hover:scale-105 active:scale-95"
                aria-label="Send message"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
            <div className="flex items-center justify-between mt-2 px-1 text-[10px] text-[#606060]">
              <span>Greenly Smart Customer Service</span>
              <span className="flex items-center gap-1 text-[9px] text-[#274839]/70">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                Active
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Floating Launcher Button */}
      <div className="relative group">
        {!isOpen && hasUnread && (
          <div className="absolute -top-10 right-0 whitespace-nowrap bg-[#274839] text-[#f2f1e7] text-xs font-medium px-3 py-1.5 rounded-full shadow-lg border border-[#bedd25]/40 flex items-center gap-1.5 animate-bounce">
            <span className="w-2 h-2 rounded-full bg-[#bedd25]" />
            Ask Greenly AI
          </div>
        )}

        <button
          type="button"
          onClick={handleToggle}
          aria-label={isOpen ? "Close customer service chat" : "Open customer service chat"}
          className={`relative flex items-center justify-center w-14 h-14 rounded-full shadow-2xl transition-all duration-300 cursor-pointer ${
            isOpen
              ? "bg-[#1b372a] text-white rotate-90 scale-95"
              : "bg-[#274839] text-[#bedd25] hover:bg-[#1b372a] hover:scale-105 ring-4 ring-[#bedd25]/30 hover:ring-[#bedd25]/60"
          }`}
        >
          {isOpen ? (
            <X className="w-6 h-6 transition-transform" />
          ) : (
            <>
              <MessageCircle className="w-7 h-7" />
              <span className="absolute top-1 right-1 flex h-3.5 w-3.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#bedd25] opacity-75" />
                <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-[#bedd25] border-2 border-[#274839]" />
              </span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
