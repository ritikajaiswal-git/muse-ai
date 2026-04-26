import { useState } from "react";
import { useAuth } from "@clerk/clerk-react"; // ✅ ADD
import api from "../api";
const categories = [
  "General",
  "Technology",
  "Business",
  "Health",
  "Lifestyle",
  "Education",
  "Travel",
  "Food",
];

export default function BlogTitlePage() {
  const { getToken } = useAuth(); // ✅ ADD

  const [keyword, setKeyword] = useState("");
  const [category, setCategory] = useState("General");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!keyword.trim() || loading) return;

    try {
      setLoading(true);
      setOutput("Generating titles...");

     // const token = await getToken(); // ✅ ADD
     const token = await getToken();

if (!token) {
  setOutput("User not authenticated");
  return;
}

      const res = await api.post(
        "/blog/titles",
        { keyword, category },
        {
          headers: {
            Authorization: `Bearer ${token}`, // ✅ ADD
          },
        }
      );

      const titles = res.data.titles || [];
      setOutput(
        titles.map((t, i) => `${i + 1}. ${t}`).join("\n") || "No response"
      );

    } catch (error) {
      setOutput(
        error?.response?.data?.error || "Error: backend not responding."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <section className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-2xl">#️⃣</span>
          <h2 className="text-3xl font-bold text-slate-800">Blog Title Generator</h2>
        </div>

        <label className="block text-sm font-medium text-slate-700 mb-2">Keyword</label>
        <input
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="e.g. AI tools for students"
          className="w-full border border-slate-300 rounded-xl px-4 py-3 mb-4 outline-none focus:ring-2 focus:ring-purple-500"
        />

        <label className="block text-sm font-medium text-slate-700 mb-2">Category</label>
        <div className="flex flex-wrap gap-2 mb-5">
          {categories.map((item) => (
            <button
              key={item}
              onClick={() => setCategory(item)}
              className={`px-4 py-2 rounded-lg border transition ${
                category === item
                  ? "bg-purple-600 text-white border-purple-600"
                  : "bg-white text-slate-700 border-slate-300 hover:bg-slate-50"
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        <button
          onClick={handleGenerate}
          disabled={loading}
          className="w-full text-white py-3 rounded-xl font-semibold disabled:opacity-60 bg-gradient-to-r from-violet-500 to-fuchsia-600"
        >
          {loading ? "Generating..." : "Generate Titles"}
        </button>
      </section>

      <section className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 min-h-[420px]">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-2xl">💡</span>
          <h2 className="text-3xl font-bold text-slate-800">Generated Titles</h2>
        </div>

        <div className="text-slate-700 whitespace-pre-wrap leading-7">
          {output || 'Enter keyword and click "Generate Titles" to get started.'}
        </div>
      </section>
    </div>
  );
}