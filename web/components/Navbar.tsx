import { CloudLightning } from "lucide-react";
import Link from "next/link";
import React from "react";

const Navbar = () => {
  const Navlinks = [
    {
      title: "Problems",
      href: "/problems",
    },
    {
      title: "Learning Path",
      href: "/learning-path",
    },
    {
      title: "Resources",
      href: "/resources",
    },
    {
      title: "Community",
      href: "/community",
    },
  ];

  return (
    <nav className="sticky top-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 backdrop-blur-sm bg-black/30 rounded-full mt-4 mx-4 shadow-lg border border-white/10">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 pl-4 hover:opacity-80 transition-opacity"
          >
            <CloudLightning className="w-5 h-5 text-white" />
            <h1 className="text-lg font-semibold text-white">
              LeetCode Mastery
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex gap-8 items-center pr-4">
            {Navlinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm font-medium text-gray-300 hover:text-white transition-colors duration-200"
                >
                  {link.title}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/login"
                className="text-sm font-medium text-gray-300 hover:text-white transition-colors duration-200"
              >
                Sign In
              </Link>
            </li>
            <li>
              <Link
                href="/signup"
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-full hover:bg-blue-700 transition-colors duration-200"
              >
                Get Started
              </Link>
            </li>
          </ul>

          {/* Mobile menu button */}
          <div className="md:hidden pr-4">
            <button
              className="text-gray-300 hover:text-white transition-colors duration-200"
              aria-label="Open menu"
            >
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
