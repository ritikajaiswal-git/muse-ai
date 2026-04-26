import { useState } from "react";
import api from "../api";

export default function RemoveObjectPage() {
  const [file, setFile] = useState(null);
  const [objectName, setObjectName] = useState("");
  const [output, setOutput] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // 🔒 PREMIUM BLOCK (API DISABLED)
  const handleSubmit = () => {
    setMessage("🚫 This is a premium feature");
    setOutput("");
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      
      {/* LEFT */}
      <div className="bg-white p-5 rounded-2xl border">
        <h2 className="text-3xl font-bold mb-4">Object Removal</h2>

        <input
          type="file"
          onChange={(e) => setFile(e.target.files?.[0])}
          className="mb-4"
        />

        <input
          type="text"
          value={objectName}
          onChange={(e) => setObjectName(e.target.value)}
          placeholder="e.g. car"
          className="w-full border px-3 py-2 mb-4 rounded"
        />

        <button
          onClick={handleSubmit}
          className="w-full py-3 bg-purple-600 text-white rounded-xl"
        >
          Remove Object
        </button>

        {/* OPTIONAL MESSAGE */}
        {message && (
          <p className="text-sm text-red-600 mt-3">{message}</p>
        )}
      </div>

      {/* RIGHT */}
      <div className="bg-white p-5 rounded-2xl border flex items-center justify-center">
        
        {/* 🔒 PREMIUM UI */}
        <div className="flex flex-col items-center justify-center text-center">
          <h2 className="text-xl font-semibold text-slate-700 mb-2">
            🔒 Premium Feature
          </h2>
          <p className="text-slate-500 mb-4">
            Object removal is available only for Premium users.
          </p>
          <button
            onClick={() => (window.location.href = "/pricing")}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg"
          >
            Upgrade Plan
          </button>
        </div>

      </div>
    </div>
  );
}