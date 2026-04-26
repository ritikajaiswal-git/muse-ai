import { useAuth } from "@clerk/clerk-react"; // ✅ already added
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import api from "../api";

const lengths = ["Short", "Medium", "Long"];

export default function WriteArticlePage() {
  const { getToken } = useAuth(); // ✅ ADD THIS

  const [topic, setTopic] = useState("");
  const [length, setLength] = useState("Short");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");

  const handleGenerate = async () => {
    if (!topic.trim() || loading) return;

    try {
      setLoading(true);
      setError("");
      setCopied(false);
      setOutput("");

      const token = await getToken(); // ✅ GET TOKEN

      const res = await api.post(
        "/article/write",
        {
          topic: topic.trim(),
          length,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // ✅ SEND TOKEN
          },
        }
      );

      const article = res?.data?.article;
      setOutput(article || "No response");
    } catch (err) {
      const msg =
        err?.response?.data?.error ||
        err?.response?.data?.message ||
        err?.message ||
        "Error: backend not responding.";
      setError(msg);
      setOutput("");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    if (!output?.trim()) return;

    try {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      setError("Copy failed. Please copy manually.");
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Left Card */}
      <section className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-2xl">📝</span>
          <h2 className="text-3xl font-bold text-slate-800">Article Writer</h2>
        </div>

        <label className="block text-sm font-medium text-slate-700 mb-2">
          Article Topic
        </label>
        <input
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="e.g. The future of artificial intelligence in healthcare"
          className="w-full border border-slate-300 rounded-xl px-4 py-3 mb-4 outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <label className="block text-sm font-medium text-slate-700 mb-2">
          Article Length
        </label>
        <div className="flex flex-wrap gap-2 mb-5">
          {lengths.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setLength(item)}
              className={`px-4 py-2 rounded-lg border transition ${
                length === item
                  ? "bg-indigo-600 text-white border-indigo-600"
                  : "bg-white text-slate-700 border-slate-300 hover:bg-slate-50"
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={handleGenerate}
          disabled={loading || !topic.trim()}
          className="w-full text-white py-3 rounded-xl font-semibold disabled:opacity-60 bg-gradient-to-r from-indigo-500 to-purple-600"
        >
          {loading ? "Generating..." : "Generate Article"}
        </button>

        {error && <p className="mt-3 text-red-600 text-sm">{error}</p>}
      </section>

      {/* Right Card */}
      <section className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 min-h-[420px]">
        <div className="flex items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-2">
            <span className="text-2xl">📄</span>
            <h2 className="text-3xl font-bold text-slate-800">Generated Output</h2>
          </div>

          <button
            type="button"
            onClick={handleCopy}
            disabled={!output}
            className={`px-3 py-2 rounded-lg border text-sm ${
              copied
                ? "bg-green-600 text-white border-green-600"
                : "bg-white text-slate-700 border-slate-300"
            } disabled:opacity-50`}
          >
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>

        <div className="text-slate-700 whitespace-pre-wrap leading-7 prose max-w-none">
          {output ? (
            <ReactMarkdown>{output}</ReactMarkdown>
          ) : (
            'Enter a topic and click "Generate Article" to get started.'
          )}
        </div>
      </section>
    </div>
  );
}