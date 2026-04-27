import { useAuth } from "@clerk/clerk-react";
import { useState } from "react";
import api from "../api";

export default function RemoveBackgroundPage() {
  const [file, setFile] = useState(null);
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { getToken } = useAuth();

  const handleSubmit = async () => {
    if (!file || loading) return;

    try {
      setLoading(true);
      setOutput("");
      setError("");

      const formData = new FormData();
      formData.append("image", file);

     const token = await getToken();

const res = await api.post("/image/remove-bg", formData, {
  headers: {
    Authorization: `Bearer ${token}`,
    "Content-Type": "multipart/form-data",
  },
});
      if (res.data.imageUrl) {
        setOutput(res.data.imageUrl);
      } else {
        setError("Failed to process image.");
      }
    } catch (err) {
      console.error(err);
      setError("❌ Error removing background. Backend not responding.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      
      {/* LEFT */}
      <section className="bg-white rounded-2xl border p-5">
        <h2 className="text-3xl font-bold mb-4">Background Removal</h2>

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          className="mb-4"
        />

        {/* FILE NAME */}
        {file && (
         <p className="text-sm text-slate-500 mb-3">
  Selected: {file.name.length > 25 
    ? file.name.slice(0, 25) + "..." 
    : file.name}
</p>
        )}

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full text-white py-3 rounded-xl bg-gradient-to-r from-amber-400 to-red-500"
        >
          {loading ? "Removing..." : "Remove Background"}
        </button>

        {/* ERROR */}
        {error && (
          <p className="text-red-500 mt-3 text-sm">{error}</p>
        )}
      </section>

      {/* RIGHT */}
      <section className="bg-white rounded-2xl border p-5 min-h-[420px]">
        <h2 className="text-3xl font-bold mb-4">Processed Image</h2>

        {loading ? (
          <p className="text-slate-500">Processing image...</p>
        ) : output ? (
          <img
            src={output}
            alt="result"
            className="max-w-full rounded-xl shadow"
          />
        ) : (
          <p className="text-slate-400">Upload image to see result</p>
        )}
      </section>
    </div>
  );
}