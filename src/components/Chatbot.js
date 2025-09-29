"use client";

import { useState, useRef, useEffect } from "react";
import { FaCommentDots } from "react-icons/fa";

/* ----- Dummy Q/A mappings ----- */
const predefinedQA = [
  {
    question: "What does this device do?",
    answer: "It assesses the quality of herbal samples using AI and sensors.",
  },
  {
    question: "How is taste analyzed?",
    answer: "Using an electronic tongue with sensors mimicking human taste.",
  },
  {
    question: "What technologies are used?",
    answer: "AI, machine learning, NIR spectroscopy and more.",
  },
  {
    question: "Can it detect adulteration?",
    answer: "Yes, it flags substandard or fake samples based on data.",
  },
  {
    question: "Where is the Ministry of AYUSH located?",
    answer:
      "The Ministry of AYUSH is located at AYUSH Bhawan, B-Block, GPO Complex, INA, New Delhi – 110023, India.",
  },
];

/* ----- small helper utilities ----- */
const normalizeText = (str = "") =>
  str
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s]/gu, " ") // remove punctuation (unicode-safe)
    .replace(/\s+/g, " ")
    .trim();

const STOPWORDS = new Set([
  "what",
  "how",
  "is",
  "the",
  "a",
  "an",
  "where",
  "when",
  "do",
  "does",
  "did",
  "can",
  "it",
  "this",
  "that",
  "of",
  "in",
  "on",
  "for",
  "are",
  "to",
  "by",
  "using",
  "with",
  "i",
  "we",
  "you",
  "me",
  "please",
]);

const tokenize = (str) =>
  normalizeText(str)
    .split(" ")
    .filter((t) => t && !STOPWORDS.has(t));

/* ----- matching: token overlap (Jaccard) ----- */
const findBestMatch = (query) => {
  const cleaned = normalizeText(query);
  if (!cleaned) return null;

  // exact match first (robust)
  const exact = predefinedQA.find(
    (qa) => normalizeText(qa.question) === cleaned
  );
  if (exact) return exact.answer;

  const qTokens = new Set(tokenize(cleaned));
  if (qTokens.size === 0) return null; // nothing meaningful to match

  let best = { score: 0, answer: null, qaQuestion: null };

  for (const qa of predefinedQA) {
    const qaTokensSet = new Set(tokenize(qa.question));
    if (qaTokensSet.size === 0) continue;

    // intersection & union for Jaccard
    let intersection = 0;
    for (const t of qTokens) if (qaTokensSet.has(t)) intersection++;

    const union = new Set([...qTokens, ...qaTokensSet]).size;
    const jaccard = union === 0 ? 0 : intersection / union;

    if (jaccard > best.score) {
      best = { score: jaccard, answer: qa.answer, qaQuestion: qa.question };
    }
  }

  // threshold prevents accidental matches on very short/irrelevant queries
  const THRESHOLD = 0.25;
  return best.score >= THRESHOLD ? best.answer : null;
};

/* ----- component ----- */
export default function FloatingChatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [userQuestion, setUserQuestion] = useState("");

  const inputRef = useRef(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (open && inputRef.current) inputRef.current.focus();
  }, [open]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const askQuestion = (question) => {
    if (!question || !question.trim()) return;

    const newUserMessage = { type: "user", text: question.trim() };
    setMessages((prev) => [...prev, newUserMessage]);

    const matched = findBestMatch(question.trim());
    const answer =
      matched ??
      "Sorry, I don't have an answer for that. Please try one of the example questions.";

    const newBotMessage = { type: "bot", text: answer };

    // small typing delay for demo feel
    setTimeout(() => {
      setMessages((prev) => [...prev, newBotMessage]);
    }, 300);
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (!userQuestion.trim()) return;
    askQuestion(userQuestion);
    setUserQuestion("");
  };

  // clickable example chips for demo reliability
  const exampleQuestions = predefinedQA.map((q) => q.question);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {open && (
        <div
          className="absolute bottom-20 right-0 w-80 h-96 bg-white rounded-lg shadow-lg border border-green-200 flex flex-col"
          style={{ maxWidth: "90vw" }}
        >
          <div className="bg-green-600 text-white px-4 py-3 rounded-t-lg">
            <h2 className="text-lg font-semibold">Chat Assistant</h2>
          </div>

          <div className="flex-grow overflow-y-auto p-4 space-y-3">
            {messages.length === 0 && (
              <div className="text-center text-gray-500 text-sm mt-8">
                Ask me anything about the herbal quality analyzer!
              </div>
            )}
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${
                  msg.type === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[75%] px-4 py-2 rounded-lg ${
                    msg.type === "user"
                      ? "bg-green-600 text-white"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  <p className="text-sm">{msg.text}</p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <form
            onSubmit={handleSubmit}
            className="p-3 border-t border-gray-200 flex gap-2"
          >
            <input
              ref={inputRef}
              type="text"
              value={userQuestion}
              onChange={(e) => setUserQuestion(e.target.value)}
              placeholder="Type your question..."
              className="flex-grow px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 text-sm"
            />
            <button
              type="submit"
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
            >
              Send
            </button>
          </form>
        </div>
      )}

      <button
        onClick={() => setOpen((o) => !o)}
        className="bg-green-600 text-white p-4 rounded-full shadow-lg hover:bg-green-700 transition-colors"
        aria-label="Toggle chatbot"
      >
        <FaCommentDots size={24} />
      </button>
    </div>
  );
}
