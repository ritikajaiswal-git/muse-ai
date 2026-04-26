import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/clerk-react";

export default function ProtectedRoute({ children }) {
  return (
    <>
      {/* ✅ If user logged in */}
      <SignedIn>
        {children}
      </SignedIn>

      {/* ❌ If not logged in */}
      <SignedOut>
        <div className="flex items-center justify-center h-screen">
          <RedirectToSignIn />
        </div>
      </SignedOut>
    </>
  );
}