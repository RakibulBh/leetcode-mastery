import { CloudLightning } from "lucide-react";
import Link from "next/link";
import React from "react";

const Navbar = () => {
  const Navlinks = [
    {
      title: "How it works",
      href: "tutorial",
    },
    {
      title: "About",
      href: "about",
    },
    {
      title: "Pricing",
      href: "pricing",
    },
    {
      title: "FAQ",
      href: "faq",
    },
  ];

  return (
    <nav className="sticky top-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 backdrop-blur-sm bg-black/30 rounded-full mt-4 mx-4 shadow-lg">
          {/* Logo */}
          <div className="flex items-center gap-2 pl-4">
            <CloudLightning className="w-5 h-5 text-white" />
            <h1 className="text-lg font-medium text-white">LeetCode Mastery</h1>
          </div>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex gap-8 items-center pr-4">
            {Navlinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-gray-400 hover:text-white transition-colors duration-200"
                >
                  {link.title}
                </Link>
              </li>
            ))}
          </ul>

          {/* Mobile menu button */}
          <div className="md:hidden pr-4">
            <button className="text-gray-400 hover:text-white">
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
