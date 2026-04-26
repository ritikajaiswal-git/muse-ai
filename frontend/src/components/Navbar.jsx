import { Link } from "react-router-dom";
import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/clerk-react";

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 h-16 
    bg-white/70 backdrop-blur-lg border-b border-gray-200">

      <div className="flex justify-between items-center h-full px-8 max-w-7xl mx-auto">
        
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-indigo-600">
          Muse.ai
        </Link>

        {/* Center Links */}
        <div className="hidden md:flex gap-8 text-gray-600 font-medium">
          <a href="#features" className="hover:text-indigo-600">Features</a>
          <a href="#pricing" className="hover:text-indigo-600">Pricing</a>
          <a href="#reviews" className="hover:text-indigo-600">Testimonials</a>
        </div>

        {/* Right */}
        <div className="flex items-center gap-4">
          <SignedOut>
            <SignInButton mode="modal">
              <button className="px-5 py-2 bg-indigo-600 text-white rounded-lg shadow-md hover:scale-105 transition">
                Login
              </button>
            </SignInButton>
          </SignedOut>

          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
        </div>
      </div>
    </nav>
  );
}