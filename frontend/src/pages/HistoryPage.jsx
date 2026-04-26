import { useEffect, useState } from "react";
import api from "../api";

export default function HistoryPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await api.get("/history");
        setData(res.data.data || []);
      } catch {
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  const getIcon = (type) => {
    switch (type) {
      case "article":
        return "📝";
      case "blog":
        return "✍️";
      case "image":
        return "🖼️";
      case "remove-bg":
        return "🎨";
      case "remove-object":
        return "✂️";
      case "resume":
        return "📄";
      default:
        return "📌";
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">History</h1>

      {loading ? (
        <p className="text-slate-500">Loading...</p>
      ) : data.length === 0 ? (
        <p className="text-slate-400">No history yet</p>
      ) : (
        <div className="grid gap-4">
          {data.map((item, index) => (
            <div
              key={index}
              className="bg-white border rounded-xl p-4 shadow-sm hover:shadow-md transition"
            >
              <div className="flex justify-between items-start gap-4">

                {/* LEFT */}
                <div className="flex gap-3">
                  <div className="text-2xl">{getIcon(item.type)}</div>

                  <div>
                    <p className="font-semibold capitalize">
                      {item.type.replace("-", " ")}
                    </p>

                    <p className="text-sm text-slate-500 line-clamp-2">
                      {item.content}
                    </p>
                  </div>
                </div>

                {/* RIGHT */}
                <div className="text-xs text-slate-400 whitespace-nowrap">
                  {new Date(item.createdAt).toLocaleString()}
                </div>

              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}