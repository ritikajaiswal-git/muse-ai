import { Star } from "lucide-react";

const data = [
  {
    name: "Rohan Joshi",
    role: "Digital Strategist, Zomato",
    img: "https://randomuser.me/api/portraits/men/32.jpg",
    text: `" Muse.ai has revolutionized our content workflow. The quality of the articles is outstanding, and it saves us hours of work every week. "`,
  },
  {
    name: "Priya Kumar",
    role: "Freelance YouTuber (Tech)",
    img: "https://randomuser.me/api/portraits/men/44.jpg",
    text: `" Muse.ai has made our content creation process effortless. The AI tools have helped us produce high-quality content faster than ever before. "`,
  },
  {
    name: "Aisha Khan",
    role: "SEO Specialist, OYO",
    img: "https://randomuser.me/api/portraits/women/65.jpg",
    text: `" Muse.ai has transformed our content creation process. The AI tools have helped us produce high-quality content faster than ever before. "`,
  },
];

export default function Testimonials() {
  return (
    <section className="py-24 bg-[#f7f8fc]">
      <h2 className="text-4xl font-bold text-center mb-3">
        Loved by Creators
      </h2>

      <p className="text-center text-gray-500 mb-14">
        Don't just take our word for it. Here's what our users are saying.
      </p>

      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto px-6">
        {data.map((item, i) => (
          <div
            key={i}
            className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm
            transition-all duration-300 hover:-translate-y-3 hover:shadow-xl"
          >
            {/* ⭐ Stars */}
            <div className="flex gap-1 text-indigo-500 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={18} fill="currentColor" />
              ))}
            </div>

            {/* 💬 Text */}
            <p className="text-gray-600 text-sm leading-relaxed">
              {item.text}
            </p>

            {/* 🔥 Divider line */}
            <div className="my-5 border-t border-gray-200"></div>

            {/* 👤 Profile */}
            <div className="flex items-center gap-3">
              <img
                src={item.img}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <h4 className="font-semibold text-sm">{item.name}</h4>
                <p className="text-xs text-gray-500">{item.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}