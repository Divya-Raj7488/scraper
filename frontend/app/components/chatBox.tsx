import { Send, Loader2, Globe } from "lucide-react";
import ReactMarkdown from "react-markdown";

interface ChatBoxProps {
  resetChat: () => void;
  url: string;
  messages: { role: "user" | "assistant"; content: string }[];
  mutation: {
    isPending: boolean;
  };
  input: string;
  setInput: React.Dispatch<React.SetStateAction<string>>;
  handleKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  handleQuestionSubmit: () => void;
}

export default function ChatBox({
  resetChat,
  url,
  messages,
  mutation,
  input,
  setInput,
  handleKeyDown,
  handleQuestionSubmit,
}: ChatBoxProps) {
  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 flex flex-col justify-end">
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
                {msg.role === "assistant" ? (
                  <div className="prose prose-sm max-w-none">
                    <ReactMarkdown>{msg.content}</ReactMarkdown>
                  </div>
                ) : (
                  msg.content
                )}
              </div>
            </div>
          ))}
          {mutation.isPending && (
            <div className="flex justify-start">
              <div className="bg-white text-gray-800 shadow-md px-4 py-3 rounded-2xl flex items-center gap-2">
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Thinking...</span>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="bg-white border-t border-gray-200 p-4 sticky bottom-0 ">
        <div className="max-w-4xl mx-auto">
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask a question about the URL..."
              className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none transition-colors"
              disabled={mutation.isPending}
            />
            <button
              title="send message"
              onClick={handleQuestionSubmit}
              disabled={mutation.isPending || !input.trim()}
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
