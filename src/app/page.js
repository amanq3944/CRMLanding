"use client";

import { useState, useEffect } from "react";
import Hero from "@/components/Hero";
import FeaturesSection from "@/components/FeaturesSection";
import Footer from "@/components/Footer";
import About from "@/components/About";
import OurProducts from "@/components/OurProducts";
import { Phone, ArrowUp } from "lucide-react";

export default function Home() {
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 500);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleCallUs = () => {
    window.location.href = "tel:+1234567890";
  };

  // Don't render anything until mounted on client
  if (!mounted) {
    return (
      <>
        <Hero />
        <About />
        <FeaturesSection />
        <OurProducts />
        <Footer />
      </>
    );
  }

  return (
    <>
      {/* Call Us Button */}
      <button
        onClick={handleCallUs}
        className="fixed bottom-6 left-6 z-50 flex items-center gap-3 bg-gradient-to-r from-violet-600 to-indigo-600 text-white px-5 py-3 rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
      >
        <div className="bg-white/20 p-1.5 rounded-lg">
          <Phone className="w-4 h-4" />
        </div>
        <div className="flex flex-col items-start">
          <span className="text-xs opacity-80">Need assistance?</span>
          <span className="font-semibold">Call Now</span>
        </div>
      </button>

      {/* Back to Top Button - Icon Only */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-50 group"
          aria-label="Back to Top"
        >
          <div className="relative">
            {/* Outer Ring with Pulse */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full blur-md opacity-60 group-hover:opacity-80"></div>
            
            {/* Inner Button */}
            <div className="relative w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-xl transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
              <ArrowUp className="w-5 h-5 text-white group-hover:animate-bounce" />
              
              {/* Shine Effect */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            
            {/* Small Sparkle Dots */}
            <div className="absolute -top-1 -right-1 w-2 h-2 bg-yellow-300 rounded-full animate-ping"></div>
            <div className="absolute -bottom-1 -left-1 w-1.5 h-1.5 bg-blue-300 rounded-full"></div>
          </div>
        </button>
      )}

      {/* Move animations to global CSS or use Tailwind classes only */}
      <Hero />
      <About />
      <FeaturesSection />
      <OurProducts />
      <Footer />
    </>
  );
}