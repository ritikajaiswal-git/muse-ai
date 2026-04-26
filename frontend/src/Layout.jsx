import Navbar from "./components/Navbar";

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50">

      {/* ✅ NEW NAVBAR (Clerk) */}
      <Navbar />

      {/* Content */}
      <div className="p-6 max-w-6xl mx-auto">
        {children}
      </div>
    </div>
  );
}