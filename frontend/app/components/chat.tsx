"use client";
import { useState } from "react";
import { Send, Loader2, Globe } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface ClaudeResponse {
  content: Array<{
    type: string;
    text: string;
  }>;
}

export default function URLChatbot() {
  const [url, setUrl] = useState<string>("");
  const [urlSubmitted, setUrlSubmitted] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleUrlSubmit = (): void => {
    if (url.trim()) {
      setUrlSubmitted(true);
      setMessages([
        {
          role: "assistant",
          content: `I've loaded the URL: ${url}. What would you like to know about it?`,
        },
      ]);
    }
  };

  const handleQuestionSubmit = async (): Promise<void> => {
    if (!input.trim() || loading) return;

    const userMessage: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          messages: [
            {
              role: "user",
              content: `Based on the content from this URL: ${url}, please answer the following question: ${input}`,
            },
          ],
        }),
      });

      const data: ClaudeResponse = await response.json();
      const assistantMessage: Message = {
        role: "assistant",
        content: data.content[0].text,
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Error:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Sorry, I encountered an error processing your question. Please try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const resetChat = (): void => {
    setUrl("");
    setUrlSubmitted(false);
    setMessages([]);
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === "Enter") {
      if (urlSubmitted && !e.shiftKey) {
        handleQuestionSubmit();
      } else if (!urlSubmitted) {
        handleUrlSubmit();
      }
    }
  };

  if (!urlSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
          <div className="flex items-center justify-center mb-6">
          </div>
          <h1 className="text-xl font-bold text-gray-800 text-center mb-2">
            URL Chatbot
          </h1>
          <p className="text-gray-600 text-center mb-8">
            Enter a URL to start asking questions about its content
          </p>
          <div>
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com"
              onKeyDown={handleKeyDown}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none transition-colors mb-4"
            />
            <button
              onClick={handleUrlSubmit}
              className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
            >
              Start Chatting
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col">
      <div className="bg-white shadow-md border-b border-gray-200 p-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Globe className="w-6 h-6 text-indigo-600" />
            <div>
              <h2 className="font-semibold text-gray-800">Chatting about:</h2>
              <p className="text-sm text-gray-600 truncate max-w-md">{url}</p>
            </div>
          </div>
          <button
            onClick={resetChat}
            className="px-4 py-2 text-sm text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
          >
            New URL
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        <div className="max-w-4xl mx-auto space-y-4">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex ${
                msg.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-xl px-4 py-3 rounded-2xl ${
                  msg.role === "user"
                    ? "bg-indigo-600 text-white"
                    : "bg-white text-gray-800 shadow-md"
                }`}
              >
                {msg.content}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="bg-white text-gray-800 shadow-md px-4 py-3 rounded-2xl flex items-center gap-2">
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Thinking...</span>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="bg-white border-t border-gray-200 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask a question about the URL..."
              className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none transition-colors"
              disabled={loading}
            />
            <button
              title="send message"
              onClick={handleQuestionSubmit}
              disabled={loading || !input.trim()}
              className="bg-indigo-600 text-white p-3 rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
