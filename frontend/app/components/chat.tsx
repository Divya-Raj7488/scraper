"use client";
import { useState } from "react";
import { Send, Loader2, Globe } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import ReactMarkdown from "react-markdown";
import { askScraper } from "../services/fetchResponse";
import UrlForm from "./urlForm";
import ChatBox from "./chatBox";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function URLChatbot() {
  const [url, setUrl] = useState<string>("");
  const [urlSubmitted, setUrlSubmitted] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>("");

  const mutation = useMutation({
    mutationFn: ({ url, question }: { url: string; question: string }) =>
      askScraper(url, question),
    onSuccess: (data) => {
      const assistantMessage: Message = {
        role: "assistant",
        content: data.message,
      };
      setMessages((prev) => [...prev, assistantMessage]);
    },
    onError: () => {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Sorry, I encountered an error processing your question. Please try again.",
        },
      ]);
    },
  });

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

  const handleQuestionSubmit = (): void => {
    if (!input.trim() || mutation.isPending) return;

    const userMessage: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);

    mutation.mutate({ url, question: input });
    setInput("");
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

  if (urlSubmitted) {
    return (
      <ChatBox
        resetChat={resetChat}
        url={url}
        messages={messages}
        mutation={mutation}
        input={input}
        setInput={setInput}
        handleKeyDown={handleKeyDown}
        handleQuestionSubmit={handleQuestionSubmit}
      />
    );
  }
  return (
    <UrlForm
      url={url}
      setUrl={setUrl}
      handleKeyDown={handleKeyDown}
      handleUrlSubmit={handleUrlSubmit}
    />
  );
}
