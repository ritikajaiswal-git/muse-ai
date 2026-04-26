import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import { NavLink, Route, Routes, useLocation } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";

import {
  LayoutDashboard,
  FileText,
  Image,
  Wand2,
  History,
  Sparkles,
} from "lucide-react";

import LandingPage from "./pages/LandingPage";

import DashboardPage from "./pages/DashboardPage";
import WriteArticlePage from "./pages/WriteArticlePage";
import BlogTitlePage from "./pages/BlogTitlePage";
import GenerateImagePage from "./pages/GenerateImagePage";
import RemoveBackgroundPage from "./pages/RemoveBackgroundPage";
import RemoveObjectPage from "./pages/RemoveObjectPage";
import ReviewResumePage from "./pages/ReviewResumePage";
import CommunityPage from "./pages/CommunityPage";
import HistoryPage from "./pages/HistoryPage";

const menu = [
  { label: "Dashboard", path: "/ai/dashboard", icon: LayoutDashboard },
  { label: "Write Article", path: "/ai/write-article", icon: FileText },
  { label: "Blog Title", path: "/ai/blog-title", icon: FileText },
  { label: "Generate Image", path: "/ai/generate-image", icon: Image },
  { label: "Remove Background", path: "/ai/remove-background", icon: Wand2 },
  { label: "Remove Object", path: "/ai/remove-object", icon: Wand2 },
  { label: "Review Resume", path: "/ai/review-resume", icon: FileText },
  { label: "History", path: "/ai/history", icon: History },
  { label: "Community", path: "/ai/community", icon: Sparkles },
];

export default function App() {
  const location = useLocation();
  const { user } = useUser();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50">

      {/* ✅ Navbar shown everywhere */}
      <Navbar />

      <Routes>

        <Route path="/" element={<LandingPage />} />

        <Route
          path="/ai/*"
          element={
            <ProtectedRoute>
              {/* 🔥 FIXED HEIGHT + SPACING */}
              <div className="flex h-[calc(100vh-64px)] mt-16">

                {/* SIDEBAR */}
                <aside className="w-64 bg-white border-r p-5 hidden md:flex md:flex-col shadow-sm">
                  
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xl font-bold">
                      {user?.firstName?.[0] || "U"}
                    </div>
                    <div>
                      <p className="font-semibold">
                        {user?.fullName || "User"}
                      </p>
                      <p className="text-xs text-slate-500">
                        Free Plan
                      </p>
                    </div>
                  </div>

                  <nav className="space-y-2">
                    {menu.map((item) => {
                      const Icon = item.icon;
                      return (
                        <NavLink
                          key={item.path}
                          to={item.path}
                          className={({ isActive }) =>
                            `flex items-center gap-2 px-3 py-2 rounded-lg ${
                              isActive
                                ? "bg-indigo-600 text-white"
                                : "text-slate-700 hover:bg-slate-100"
                            }`
                          }
                        >
                          <Icon size={18} />
                          {item.label}
                        </NavLink>
                      );
                    })}
                  </nav>
                </aside>

                {/* MAIN */}
                <main className="flex-1 p-6 overflow-auto">
                  <Routes>
                    <Route path="dashboard" element={<DashboardPage />} />
                    <Route path="write-article" element={<WriteArticlePage />} />
                    <Route path="blog-title" element={<BlogTitlePage />} />
                    <Route path="generate-image" element={<GenerateImagePage />} />
                    <Route path="remove-background" element={<RemoveBackgroundPage />} />
                    <Route path="remove-object" element={<RemoveObjectPage />} />
                    <Route path="review-resume" element={<ReviewResumePage />} />
                    <Route path="history" element={<HistoryPage />} />
                    <Route path="community" element={<CommunityPage />} />
                  </Routes>
                </main>

              </div>
            </ProtectedRoute>
          }
        />

      </Routes>
    </div>
  );
}