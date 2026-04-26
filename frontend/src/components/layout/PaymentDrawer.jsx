import { useState } from "react";

export default function PaymentDrawer({ open, setOpen, plan }) {
  const [success, setSuccess] = useState(false);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      
      {/* overlay */}
      <div
        className="absolute inset-0 bg-black/30"
        onClick={() => setOpen(false)}
      />

      {/* drawer */}
      <div className="relative w-[400px] h-full bg-white shadow-2xl p-6 animate-slideIn">

        {!success ? (
          <>
            <h2 className="text-lg font-semibold mb-4">{plan}</h2>

            <div className="border rounded-lg p-4 mb-4">
              <p className="text-gray-500 text-sm">Subtotal</p>
              <p className="text-xl font-semibold">$0.00</p>

              <p className="mt-3 font-semibold">Total Due Today</p>
              <p className="text-lg">$0.00</p>
            </div>

            <button
              onClick={() => setSuccess(true)}
              className="w-full bg-gray-900 text-white py-3 rounded-lg"
            >
              Subscribe
            </button>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center">
            
            {/* circle animation */}
            <div className="w-20 h-20 rounded-full border-4 border-green-500 flex items-center justify-center mb-4 animate-pulse">
              ✔
            </div>

            <h2 className="text-xl font-semibold">Success!</h2>
            <p className="text-gray-500">
              Your new subscription is all set.
            </p>

            <button
              onClick={() => setOpen(false)}
              className="mt-6 bg-gray-900 text-white px-6 py-2 rounded-lg"
            >
              Continue
            </button>
          </div>
        )}
      </div>
    </div>
  );
}