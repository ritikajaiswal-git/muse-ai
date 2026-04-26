import { useState } from "react";

export default function ResumeAnalyzerPage() {
  const [file, setFile] = useState(null);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      
      {/* LEFT */}
      <div className="bg-white p-5 rounded-2xl border">
        <h2 className="text-3xl font-bold mb-4">Resume Analyzer</h2>

        <input
          type="file"
          accept=".pdf,.docx"
          onChange={(e) => setFile(e.target.files?.[0])}
          className="mb-4"
        />

        {/* 🔥 Premium CTA Button */}
        <button
          onClick={() => alert("🚀 Upgrade to Premium to unlock this feature")}
          className="w-full py-3 rounded-xl font-semibold text-white 
                     bg-gradient-to-r from-purple-500 to-indigo-600 
                     hover:opacity-90 transition"
        >
          Unlock with Premium 🔒
        </button>
      </div>

      {/* RIGHT */}
      <div className="bg-white p-5 rounded-2xl border flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-800 mb-2">
            🔒 Premium Feature
          </h2>

          <p className="text-slate-500 mb-4">
            Resume Analyzer is available only for Premium users.
          </p>

          <button
            onClick={() => alert("Upgrade feature coming soon")}
            className="px-5 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
          >
            Upgrade Plan
          </button>
        </div>
      </div>
    </div>
  );
}