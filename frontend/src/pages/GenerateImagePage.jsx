import { useState } from "react";
import api from "../api";

const styles = [
  "Realistic",
  "Ghibli style",
  "Anime style",
  "Cartoon style",
  "Fantasy style",
  "3D style",
  "Portrait style",
];

export default function GenerateImagePage() {
  const [prompt, setPrompt] = useState("");
  const [style, setStyle] = useState("Realistic");
  const [isPublic, setIsPublic] = useState(false);
  const [output, setOutput] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // 🔒 PREMIUM BLOCK (API DISABLED)
  const handleGenerate = () => {
    setError("🚫 This is a premium feature");
    setOutput("");
    setImageUrl("");
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* LEFT */}
      <section className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-2xl">🖼️</span>
          <h2 className="text-3xl font-bold text-slate-800">
            AI Image Generator
          </h2>
        </div>

        <label className="block text-sm font-medium text-slate-700 mb-2">
          Describe your image
        </label>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          rows={4}
          placeholder="e.g. A futuristic city at sunset with flying cars"
          className="w-full border border-slate-300 rounded-xl px-4 py-3 mb-4 outline-none focus:ring-2 focus:ring-emerald-500"
        />

        <label className="block text-sm font-medium text-slate-700 mb-2">
          Style
        </label>
        <div className="flex flex-wrap gap-2 mb-4">
          {styles.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setStyle(item)}
              className={`px-4 py-2 rounded-lg border transition ${
                style === item
                  ? "bg-emerald-600 text-white border-emerald-600"
                  : "bg-white text-slate-700 border-slate-300 hover:bg-slate-50"
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        <label className="inline-flex items-center gap-2 mb-5 text-slate-700">
          <input
            type="checkbox"
            checked={isPublic}
            onChange={(e) => setIsPublic(e.target.checked)}
          />
          <span>Make this image public</span>
        </label>

        <button
          type="button"
          onClick={handleGenerate}
          className="w-full text-white py-3 rounded-xl font-semibold bg-gradient-to-r from-emerald-500 to-cyan-500"
        >
          Generate Image
        </button>

        {error && <p className="mt-3 text-red-600 text-sm">{error}</p>}
      </section>

      {/* RIGHT */}
      <section className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 min-h-[420px]">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-2xl">🧾</span>
          <h2 className="text-3xl font-bold text-slate-800">
            Generated Result
          </h2>
        </div>

        {/* 🔒 PREMIUM UI */}
        <div className="flex flex-col items-center justify-center h-full text-center">
          <h2 className="text-xl font-semibold text-slate-700 mb-2">
            🔒 Premium Feature
          </h2>
          <p className="text-slate-500 mb-4">
            AI Image generation is available only for Premium users.
          </p>
          <button
            onClick={() => (window.location.href = "/pricing")}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg"
          >
            Upgrade Plan
          </button>
        </div>
      </section>
    </div>
  );
}