import { Link } from "react-router-dom";
import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/clerk-react";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 
    bg-white/70 backdrop-blur-xl border-b border-gray-200">

      <div className="max-w-6xl mx-auto flex justify-between items-center px-6 py-4">

        {/* 🔥 Logo */}
        <Link
          to="/"
          className="text-2xl font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent"
        >
          Muse.ai
        </Link>

        {/* 🔥 Middle links (optional but premium feel) */}
        <div className="hidden md:flex gap-8 text-gray-600 font-medium">
          <a href="#features" className="hover:text-indigo-600 transition">
            Features
          </a>
          <a href="#pricing" className="hover:text-indigo-600 transition">
            Pricing
          </a>
          <a href="#testimonials" className="hover:text-indigo-600 transition">
            Reviews
          </a>
        </div>

        {/* 🔥 Right side */}
        <div className="flex items-center gap-4">

          {/* ❌ NOT logged in */}
          <SignedOut>
            <SignInButton mode="modal">
              <button className="px-5 py-2 rounded-lg text-white 
              bg-gradient-to-r from-indigo-500 to-purple-600
              hover:opacity-90 transition shadow-md">
                Login
              </button>
            </SignInButton>
          </SignedOut>

          {/* ✅ Logged in */}
          <SignedIn>
            <UserButton
              afterSignOutUrl="/"
              appearance={{
                elements: {
                  avatarBox: "w-10 h-10",
                },
              }}
            />
          </SignedIn>

        </div>
      </div>
    </nav>
  );
}