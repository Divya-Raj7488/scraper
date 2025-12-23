import React from "react";

interface UrlFormProps {
  url: string;
  setUrl: React.Dispatch<React.SetStateAction<string>>;
  handleKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  handleUrlSubmit: () => void;
}

const UrlForm = ({
  url,
  setUrl,
  handleKeyDown,
  handleUrlSubmit,
}: UrlFormProps) => {
  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <div className="flex items-center justify-center mb-6"></div>
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
};

export default UrlForm;
