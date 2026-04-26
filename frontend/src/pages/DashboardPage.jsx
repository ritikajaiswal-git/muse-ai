import { useEffect, useState } from "react";
import api from "../api";

export default function DashboardPage() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const res = await api.get("/dashboard");
      setCount(res.data.total || 0);
    };

    fetchData();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

      <div className="bg-white p-6 rounded-2xl border shadow-sm">
        <p className="text-slate-500">Total Creations</p>
        <h2 className="text-4xl font-bold mt-2">{count}</h2>
      </div>

      <div className="bg-white p-6 rounded-2xl border shadow-sm">
        <p className="text-slate-500">Active Plan</p>
        <h2 className="text-3xl font-bold mt-2">Free</h2>
      </div>

    </div>
  );
}