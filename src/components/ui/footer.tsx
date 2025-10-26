import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="w-full bg-[#454343] text-white">
      <div className="mx-auto max-w-7xl px-4 py-10">
        <div className="grid gap-10 md:grid-cols-4 md:gap-6">
          {/* Brand  */}
          <div className="space-y-4 flex flex-col items-start">
            <h2 className="text-xl font-semibold text-white">SkillScribe</h2>
            <p className="text-sm leading-relaxed text-gray-200">
              Empowering learners
              <br />
              worldwide with quality
              <br />
              education
            </p>

            <div className="flex items-center gap-4 text-xl text-white">
              <button
                aria-label="Facebook"
                className="transition-colors hover:text-gray-300"
              >
                <FaFacebookF aria-hidden="true" />
              </button>
              <button
                aria-label="Twitter / X"
                className="transition-colors hover:text-gray-300"
              >
                <FaTwitter aria-hidden="true" />
              </button>
              <button
                aria-label="LinkedIn"
                className="transition-colors hover:text-gray-300"
              >
                <FaLinkedinIn aria-hidden="true" />
              </button>
              <button
                aria-label="YouTube"
                className="transition-colors hover:text-gray-300"
              >
                <FaYoutube aria-hidden="true" />
              </button>
            </div>
          </div>

          {/* Company */}
          <div className="space-y-3 flex flex-col items-start">
            <h3 className="text-xl font-semibold text-white">Company</h3>
            <ul className="space-y-3 text-base text-gray-200">
              <li className="cursor-pointer transition-colors hover:text-white">
                About
              </li>
              <li className="cursor-pointer transition-colors hover:text-white">
                Careers
              </li>
              <li className="cursor-pointer transition-colors hover:text-white">
                Press
              </li>
              <li className="cursor-pointer transition-colors hover:text-white">
                Blog
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-3 flex flex-col items-start">
            <h3 className="text-xl font-semibold text-white">Support</h3>
            <ul className="space-y-3 text-base text-gray-200">
              <li className="cursor-pointer transition-colors hover:text-white">
                Help Center
              </li>
              <li className="cursor-pointer transition-colors hover:text-white">
                FAQs
              </li>
              <li className="cursor-pointer transition-colors hover:text-white">
                Contact
              </li>
              <li className="cursor-pointer transition-colors hover:text-white">
                Report Issue
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-3 flex flex-col items-start">
            <h3 className="text-xl font-semibold text-white">Legal</h3>
            <ul className="space-y-3 text-base text-gray-200">
              <li className="cursor-pointer transition-colors hover:text-white">
                Terms of Service
              </li>
              <li className="cursor-pointer transition-colors hover:text-white">
                Privacy Policy
              </li>
              <li className="cursor-pointer transition-colors hover:text-white">
                Cookie Policy
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 text-sm text-gray-300">
          <div className="flex flex-col items-center gap-2 md:flex-row md:flex-wrap md:justify-center">
            <span>
              © {new Date().getFullYear()} SkillScribe. All rights reserved.
            </span>

            <span className="hidden md:inline text-gray-500">&nbsp;||&nbsp;</span>

            <span>Language selector</span>

            <span className="hidden md:inline text-gray-500">&nbsp;||&nbsp;</span>

            <span>“Accessibility Settings” quick link</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
