import { useState } from "react";
import PaymentDrawer from "./PaymentDrawer";

export default function Pricing() {
  const [open, setOpen] = useState(false);
  const [plan, setPlan] = useState("");

  const handleClick = (type) => {
    setPlan(type);
    setOpen(true);
  };

  return (
    <section className="py-24 px-6 bg-white text-center">
      
      <h2 className="text-4xl font-bold mb-3">Choose Your Plan</h2>
      <p className="text-gray-500 mb-12">
        Start for free. Upgrade when you're ready.
      </p>

      <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">

        {/* FREE */}
        <div className="border rounded-2xl p-6 text-left shadow-sm hover:shadow-lg transition">
          <p className="text-sm text-gray-500">Free</p>
          <h3 className="text-3xl font-bold mt-2">$0</h3>
          <p className="text-gray-400 mb-6">Always free</p>

          <button
            onClick={() => handleClick("Free")}
            className="w-full border rounded-full py-2 hover:bg-gray-100 transition"
          >
            Switch to this plan
          </button>
        </div>

        {/* PREMIUM */}
        <div className="border rounded-2xl p-6 text-left shadow-sm relative hover:shadow-lg transition">
          
          {/* badge */}
          <span className="absolute top-4 right-4 bg-indigo-600 text-white text-xs px-3 py-1 rounded-full">
            Active
          </span>

          <p className="text-sm text-gray-500">Premium</p>

          <h3 className="text-3xl font-bold mt-2">
            $16 <span className="text-sm text-gray-400">/month</span>
          </h3>

          <p className="text-gray-400 mb-4">Only billed monthly</p>

          <ul className="text-gray-600 space-y-2 mb-6">
            <li>✔ Title Generation</li>
            <li>✔ Article Generation</li>
            <li>✔ Generate Images</li>
            <li className="text-indigo-600 cursor-pointer">
              + See all features
            </li>
          </ul>

          <button
            onClick={() => handleClick("Premium")}
            className="w-full bg-indigo-600 text-white py-2 rounded-full hover:opacity-90 transition"
          >
            Subscribe
          </button>
        </div>

      </div>

      {/* RIGHT SIDE DRAWER */}
      <PaymentDrawer open={open} setOpen={setOpen} plan={plan} />
    </section>
  );
}