import { useUser } from "@clerk/clerk-react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const { isSignedIn, isLoaded } = useUser();

  // ⏳ Wait until Clerk loads
  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  // ❌ Not logged in → go to sign-in route
  if (!isSignedIn) {
    return <Navigate to="/sign-in" />;
  }

  // ✅ Logged in → show content
  return children;
}