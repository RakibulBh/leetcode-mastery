"use client";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";

const techCompanies = [
  { name: "Google", logo: "/svg/google.svg" },
  { name: "Amazon", logo: "/svg/amazon.svg" },
  { name: "Meta", logo: "/svg/meta.svg" },
  { name: "Apple", logo: "/svg/apple.svg" },
  { name: "Netflix", logo: "/svg/netflix.svg" },
];

const stickers = [
  { src: "/stickers/full-stack.png", delay: 0 },
  { src: "/stickers/exam.png", delay: 0.2 },
  { src: "/stickers/briefcase.png", delay: 0.4 },
];

export default function Hero() {
  return (
    <div className="relative px-4 sm:px-6 lg:px-8 max-w-[1400px] mx-auto flex-1 flex flex-col">
      <div className="flex-1 flex flex-col lg:flex-row justify-between items-start pt-8 lg:pt-16">
        <div className="space-y-6 lg:space-y-8 max-w-2xl">
          {/* Tag */}
          <div className="inline-block">
            <span className="bg-white/5 text-gray-300 px-4 py-2 rounded-full text-sm font-medium border border-white/10">
              The best journal for leetcoding
            </span>
          </div>

          {/* Main title with squiggly underline */}
          <div className="space-y-2">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white">
              The ONLY LeetCode
            </h1>
            <div className="relative">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white">
                Journal you{" "}
                <span className="relative">
                  NEED
                  <svg
                    className="absolute -bottom-2 left-0 w-full"
                    height="8"
                    viewBox="0 0 200 8"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M0 4C50 0 100 8 150 4C200 0 250 8 300 4"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
              </h1>
            </div>
          </div>

          <p className="text-gray-400 text-lg sm:text-xl max-w-xl">
            Track your progress, learn from your mistakes, and master LeetCode
            with our comprehensive journaling system.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 items-center sm:items-start">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full sm:w-auto bg-white text-black rounded-xl px-8 py-4 font-semibold text-lg relative group"
            >
              <span className="relative z-10">Sign Up Now</span>
              <div className="absolute inset-0 bg-white/20 rounded-xl blur-xl group-hover:blur-2xl transition-all duration-300" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full sm:w-auto bg-white/5 text-white flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-lg font-semibold border border-white/10 hover:bg-white/10 transition-colors"
            >
              See what you can do
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </div>
        </div>

        {/* Floating Stickers */}
        <div className="hidden lg:block relative w-[400px] h-[500px]">
          {stickers.map((sticker, index) => (
            <motion.div
              key={index}
              initial={{ y: 0 }}
              animate={{
                y: [0, -20, 0],
              }}
              transition={{
                duration: 3,
                delay: sticker.delay,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute"
              style={{
                left: `${index * 120}px`,
                top: `${index * 100}px`,
              }}
            >
              <Image
                src={sticker.src}
                alt={`Sticker ${index + 1}`}
                width={120}
                height={120}
                className="object-contain"
              />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Tech Companies Section */}
      <div className="mt-auto pt-12 border-t border-white/10">
        <p className="text-center text-gray-400 text-sm mb-8">
          Trusted by developers at
        </p>
        <div className="relative w-full overflow-hidden">
          <div className="flex animate-scroll gap-16 items-center">
            {[...techCompanies, ...techCompanies].map((company, index) => (
              <div key={index} className="flex-shrink-0">
                <div className="w-32 h-12 relative">
                  <Image
                    src={company.logo}
                    alt={company.name}
                    fill
                    className="object-contain transition-opacity"
                    style={{ filter: "grayscale(100%) brightness(50%)" }}
                  />
                  {/* Optional: Add hover effect to the parent div or directly to the Image */}
                  <div className="absolute inset-0 opacity-50 hover:opacity-100 transition-opacity"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
