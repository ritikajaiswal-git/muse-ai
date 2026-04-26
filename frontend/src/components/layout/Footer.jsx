import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white pt-16 pb-8 px-6">
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10">

        {/* LEFT */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Muse.ai</h2>
          <p className="text-sm text-gray-200 leading-relaxed">
            Experience the power of AI with Muse.ai. Transform your content creation
            with our suite of premium AI tools — write articles, generate images,
            and enhance your workflow.
          </p>
        </div>

        {/* CENTER */}
        <div>
          <h3 className="font-semibold text-lg mb-4">Company</h3>
          <ul className="space-y-2 text-sm text-gray-200">
            <li className="hover:text-white cursor-pointer">Home</li>
            <li className="hover:text-white cursor-pointer">About us</li>
            <li className="hover:text-white cursor-pointer">Contact us</li>
            <li className="hover:text-white cursor-pointer">Privacy policy</li>
          </ul>
        </div>

        {/* RIGHT */}
        <div>
          <h3 className="font-semibold text-lg mb-4">Connect with us</h3>

          <div className="flex gap-4 text-lg">
            <FaFacebookF className="cursor-pointer hover:scale-110 transition" />
            <FaTwitter className="cursor-pointer hover:scale-110 transition" />
            <FaInstagram className="cursor-pointer hover:scale-110 transition" />
            <FaLinkedinIn className="cursor-pointer hover:scale-110 transition" />
          </div>
        </div>

      </div>

      {/* bottom */}
      <div className="mt-12 border-t border-white/20 pt-6 flex flex-col md:flex-row justify-between text-sm text-gray-200 max-w-6xl mx-auto">
        <p>© 2026 Muse.ai. All rights reserved.</p>
        <p>Made with ❤️ by  riya </p>
      </div>
    </footer>
  );
}