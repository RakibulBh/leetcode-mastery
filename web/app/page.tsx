"use client";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <main className="h-screen flex flex-col text-white">
      <Navbar />
      <Hero />
    </main>
  );
}
