import { useNavigate } from "react-router-dom";
import bg from "../../assets/bg.png";

export default function Hero() {
  const navigate = useNavigate();

  return (
    <section className="relative h-screen flex items-center justify-center text-center px-6 overflow-hidden pt-20">

      {/* ✅ FULL IMAGE (no fade, no crop) */}
      <img
        src={bg}
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* ✅ LIGHT DARK OVERLAY (not white) */}
      <div className="absolute inset-0 bg-black/10"></div>

      {/* ✅ CONTENT */}
      <div className="relative z-10 max-w-3xl">
        <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6 text-black">
          Create amazing content <br />
          with <span className="text-indigo-600">AI tools</span>
        </h1>

        <p className="text-gray-700 text-lg mb-8">
          Transform your content creation with our suite of premium AI tools.
          Write articles, generate images, and enhance your workflow.
        </p>

        <div className="flex justify-center gap-4">
          <button
            onClick={() => navigate("/ai/dashboard")}
            className="px-8 py-3 bg-indigo-600 text-white rounded-xl shadow-lg hover:scale-105 transition"
          >
            Start creating now
          </button>

          <button className="px-8 py-3 bg-white/90 backdrop-blur border rounded-xl hover:bg-white transition">
            Watch demo
          </button>
        </div>

        <p className="mt-6 text-gray-700 text-sm">
          ⭐ Trusted by 10k+ users
        </p>
      </div>
    </section>
  );
}