
import { FileText, Image, Wand2, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom"; // ✅ added

function Card({ icon, title, desc, onClick }) {
  return (
    <div
      onClick={onClick}
      className="cursor-pointer p-6 rounded-2xl bg-white shadow-lg border hover:border-indigo-200 hover:shadow-2xl hover:-translate-y-2 hover:scale-[1.02] transition-all duration-300"
    >
      <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 text-white mb-4">
        {icon}
      </div>

      <h3 className="font-semibold text-lg mb-2">{title}</h3>
      <p className="text-gray-500 text-sm">{desc}</p>
    </div>
  );
}

export default function AiTools() {
  const navigate = useNavigate(); // ✅ added

  return (
    <section className="py-24 px-6 bg-gray-50">
      <h2 className="text-4xl font-bold text-center mb-4">
        Powerful AI Tools
      </h2>

      <p className="text-center text-gray-500 mb-12">
        Everything you need to create, enhance, and optimize your content with cutting-edge AI technology.
      </p>

      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">

        <Card
          icon={<FileText size={20} />}
          title="Write Article"
          desc="Generate high-quality articles with AI assistance"
          onClick={() => navigate("/ai/write-article")}
        />

        <Card
          icon={<Sparkles size={20} />}
          title="Blog Titles"
          desc="Create catchy blog titles that drive engagement"
          onClick={() => navigate("/ai/blog-title")}
        />

        <Card
          icon={<Image size={20} />}
          title="Generate Images"
          desc="Create stunning images with AI technology"
          onClick={() => navigate("/ai/generate-image")}
        />

        <Card
          icon={<Wand2 size={20} />}
          title="Remove Background"
          desc="Remove backgrounds from images instantly"
          onClick={() => navigate("/ai/remove-background")}
        />

        <Card
          icon={<Wand2 size={20} />}
          title="Remove Object"
          desc="Remove unwanted objects from your photos"
          onClick={() => navigate("/ai/remove-object")}
        />

        <Card
          icon={<FileText size={20} />}
          title="Review Resume"
          desc="Get AI-powered feedback on your resume"
          onClick={() => navigate("/ai/review-resume")}
        />

      </div>
    </section>
  );
}