"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";

export default function Hero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  useEffect(() => {
    setMounted(true);
    
    const handleMouseMove = (e) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        setMousePosition({ x, y });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const floatingElements = [
    { Icon: "📊", delay: 0, x: 10, y: 20 },
    { Icon: "📈", delay: 0.5, x: -20, y: 40 },
    { Icon: "🤝", delay: 1, x: 30, y: -10 },
    { Icon: "⭐", delay: 1.5, x: -30, y: -20 },
  ];

  // Fixed positions for particles to avoid hydration mismatch
  const particlePositions = [
    { x: 10, y: 20 },
    { x: 30, y: 40 },
    { x: 50, y: 60 },
    { x: 70, y: 30 },
    { x: 20, y: 80 },
    { x: 80, y: 50 },
    { x: 40, y: 70 },
    { x: 60, y: 90 },
    { x: 90, y: 10 },
    { x: 15, y: 45 },
    { x: 45, y: 85 },
    { x: 75, y: 25 },
    { x: 25, y: 65 },
    { x: 55, y: 95 },
    { x: 85, y: 35 },
    { x: 35, y: 75 },
    { x: 65, y: 55 },
    { x: 95, y: 15 },
    { x: 5, y: 50 },
    { x: 50, y: 5 },
  ];

  return (
    <section 
      ref={containerRef}
      className="relative w-full bg-gradient-to-br from-[#0a0f1e] via-[#0f172a] to-[#1a1f35] text-white min-h-screen overflow-hidden"
    >
      {/* Animated background particles - Only render on client */}
      {mounted && (
        <div className="absolute inset-0 overflow-hidden">
          {particlePositions.map((pos, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-purple-500/20 rounded-full"
              style={{
                left: `${pos.x}%`,
                top: `${pos.y}%`,
              }}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.2, 0.5, 0.2],
                x: [0, Math.random() * 50 - 25, 0],
                y: [0, Math.random() * 50 - 25, 0],
              }}
              transition={{
                duration: Math.random() * 5 + 5,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          ))}
        </div>
      )}

      {/* Gradient orbs */}
      <motion.div
        className="absolute top-20 -left-20 w-96 h-96 bg-purple-600/30 rounded-full blur-3xl"
        animate={{
          x: mousePosition.x * 50,
          y: mousePosition.y * 50,
        }}
        transition={{ type: "spring", stiffness: 50 }}
      />
      <motion.div
        className="absolute bottom-20 -right-20 w-96 h-96 bg-green-500/20 rounded-full blur-3xl"
        animate={{
          x: mousePosition.x * -50,
          y: mousePosition.y * -50,
        }}
        transition={{ type: "spring", stiffness: 50 }}
      />

      <div className="relative max-w-7xl mx-auto px-6 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* LEFT CONTENT */}
          <motion.div
            style={{ y, opacity }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            {/* Floating emojis/badges - Only animate on client */}
            {mounted && (
              <div className="relative mb-8 h-20">
                {floatingElements.map((element, index) => (
                  <motion.span
                    key={index}
                    className="absolute text-2xl"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ 
                      opacity: [0, 1, 1, 0],
                      scale: [0, 1, 1, 0],
                      x: [0, element.x, element.x * 2, 0],
                      y: [0, element.y, element.y * 2, 0],
                    }}
                    transition={{
                      duration: 4,
                      delay: element.delay,
                      repeat: Infinity,
                      repeatType: "loop",
                    }}
                    style={{
                      left: `${index * 20}%`,
                      top: `${index * 10}%`,
                    }}
                  >
                    {element.Icon}
                  </motion.span>
                ))}
              </div>
            )}

            {/* Animated badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-sm rounded-full px-4 py-2 mb-6 border border-white/10"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <span className="text-sm font-medium text-gray-300">New: AI-Powered Features</span>
              <motion.span
                animate={{ x: [0, 4, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="text-purple-400"
              >
                →
              </motion.span>
            </motion.div>

            <motion.h1 
              className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <span className="bg-gradient-to-r from-purple-400 to-green-400 text-transparent bg-clip-text">
                Elevate
              </span>{" "}
              Ur Customer
              <br />
              Relationships with
              <br />
              <span className="relative">
                Our CRM
                {/* Zigzag line with animation */}
                <motion.div
                  className="absolute -bottom-4 left-0 w-full overflow-hidden"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ delay: 1, duration: 0.8 }}
                >
                  <svg width="100%" height="12" viewBox="0 0 200 12" preserveAspectRatio="none">
                    <motion.path
                      d="M0 12 L20 0 L40 12 L60 0 L80 12 L100 0 L120 12 L140 0 L160 12 L180 0 L200 12"
                      stroke="url(#gradient)"
                      strokeWidth="3"
                      fill="none"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 1 }}
                      transition={{ delay: 1.5, duration: 1 }}
                    />
                    <defs>
                      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#a78bfa" />
                        <stop offset="50%" stopColor="#4ade80" />
                        <stop offset="100%" stopColor="#a78bfa" />
                      </linearGradient>
                    </defs>
                  </svg>
                </motion.div>
              </span>
            </motion.h1>

            {/* Multiple decorative lines */}
            <motion.div 
              className="flex flex-col gap-1 mt-4"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.2 }}
            >
              {/* Wavy line */}
              <motion.div
                className="relative h-6 overflow-hidden"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ delay: 1.3, duration: 0.8 }}
              >
                <svg width="200" height="20" viewBox="0 0 200 20" className="text-purple-400">
                  <motion.path
                    d="M0 10 Q 25 0, 50 10 T 100 10 T 150 10 T 200 10"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ delay: 1.6, duration: 1 }}
                  />
                </svg>
              </motion.div>

              {/* Dotted zigzag */}
              <motion.div
                className="relative h-4 flex gap-1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.8 }}
              >
                {[...Array(15)].map((_, i) => (
                  <motion.div
                    key={i}
                    className={`w-1 h-1 rounded-full ${
                      i % 3 === 0 ? 'bg-purple-500' : i % 3 === 1 ? 'bg-green-400' : 'bg-purple-300'
                    }`}
                    animate={{ 
                      y: i % 2 === 0 ? [0, -5, 0] : [0, 5, 0],
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: 2,
                      delay: i * 0.1
                    }}
                  />
                ))}
              </motion.div>
            </motion.div>

            <motion.p 
              className="text-gray-400 mt-6 max-w-lg text-lg leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              Enhance your customer interactions and streamline your sales
              processes with our powerful and intuitive CRM solution.
            </motion.p>

            {/* Buttons with hover effects */}
            <motion.div 
              className="flex flex-wrap gap-4 mt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group relative px-8 py-4 rounded-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 transition-all shadow-lg shadow-purple-600/25 overflow-hidden"
              >
                <span className="relative z-10 font-semibold">Get a Demo</span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-purple-400 to-purple-500"
                  initial={{ x: "100%" }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group relative px-8 py-4 rounded-full border border-gray-600 hover:border-purple-500 transition-all overflow-hidden"
              >
                <span className="relative z-10 font-semibold group-hover:text-purple-400 transition-colors">
                  Get Started Free
                </span>
                <motion.div
                  className="absolute inset-0 bg-purple-500/10"
                  initial={{ scale: 0 }}
                  whileHover={{ scale: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.button>
            </motion.div>

            {/* Stats */}
            <motion.div 
              className="flex gap-8 mt-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
            >
              {[
                { value: "10K+", label: "Active Users" },
                { value: "98%", label: "Satisfaction" },
                { value: "24/7", label: "Support" },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -5 }}
                  className="text-center"
                >
                  <motion.div 
                    className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-green-400 text-transparent bg-clip-text"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 1 + index * 0.1, type: "spring" }}
                  >
                    {stat.value}
                  </motion.div>
                  <div className="text-sm text-gray-500">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* RIGHT SIDE IMAGE */}
          <motion.div
            style={{ y: useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]) }}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            {/* Main image with 3D tilt effect */}
            <motion.div
              animate={{
                rotateX: mousePosition.y * 10,
                rotateY: mousePosition.x * 10,
              }}
              transition={{ type: "spring", stiffness: 75 }}
              className="rounded-3xl overflow-hidden shadow-2xl relative group"
            >
              <Image
                src="/images/crm-image.jpg"
                alt="crm"
                width={600}
                height={600}
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-tr from-purple-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </motion.div>

            {/* Floating card top */}
            <motion.div
              animate={{ 
                y: [0, -15, 0],
                rotate: [0, 2, -2, 0],
              }}
              transition={{ repeat: Infinity, duration: 5 }}
              className="absolute -top-10 left-10 bg-[#1e293b]/90 backdrop-blur-sm rounded-xl shadow-xl p-4 w-44 border border-white/10"
            >
              <p className="text-xs font-semibold mb-2 text-gray-300">
                Volume vs Service
              </p>

              <div className="flex gap-2 items-end h-20">
                {[40, 60, 30, 50].map((height, i) => (
                  <motion.div
                    key={i}
                    className={`w-2 ${i % 2 === 0 ? 'bg-purple-400' : 'bg-green-400'} rounded-t`}
                    initial={{ height: 0 }}
                    animate={{ height }}
                    transition={{ delay: i * 0.1, duration: 0.5 }}
                  />
                ))}
              </div>
            </motion.div>

            {/* Floating card bottom */}
            <motion.div
              animate={{ 
                y: [0, 15, 0],
                rotate: [0, -2, 2, 0],
              }}
              transition={{ repeat: Infinity, duration: 6 }}
              className="absolute -bottom-10 right-0 bg-[#1e293b]/90 backdrop-blur-sm rounded-xl shadow-xl p-4 w-72 border border-white/10"
            >
              <p className="text-sm font-semibold mb-2 text-gray-300">
                Sales Reports
              </p>

              <div className="space-y-3">
                <div className="h-16 flex items-center">
                  <div className="w-full h-1 bg-gray-700 rounded-full relative overflow-hidden">
                    <motion.div 
                      className="absolute top-0 left-0 w-1/3 h-full bg-purple-500"
                      animate={{ width: ["33%", "40%", "33%"] }}
                      transition={{ repeat: Infinity, duration: 3 }}
                    />
                    <motion.div 
                      className="absolute top-0 left-1/3 w-1/3 h-full bg-green-400"
                      animate={{ width: ["33%", "45%", "33%"] }}
                      transition={{ repeat: Infinity, duration: 3, delay: 0.5 }}
                    />
                    <div className="absolute top-0 right-0 w-1/3 h-full bg-red-400" />
                  </div>
                </div>

                {/* Mini legend */}
                <div className="flex gap-4 text-xs">
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-purple-500 rounded-full" />
                    <span className="text-gray-400">Q1</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-green-400 rounded-full" />
                    <span className="text-gray-400">Q2</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-red-400 rounded-full" />
                    <span className="text-gray-400">Q3</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* New floating card - Right */}
            <motion.div
              animate={{ 
                x: [0, 10, 0],
                y: [0, -10, 0],
              }}
              transition={{ repeat: Infinity, duration: 4, delay: 1 }}
              className="absolute top-20 -right-10 bg-[#1e293b]/90 backdrop-blur-sm rounded-xl shadow-xl p-3 border border-white/10"
            >
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center">
                  <span className="text-green-400">↑</span>
                </div>
                <div>
                  <p className="text-xs text-gray-400">Conversion</p>
                  <p className="text-sm font-bold text-green-400">+23.5%</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Bottom decorative elements */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden">
        {/* Animated wave pattern at bottom */}
        <motion.div
          className="relative h-16 w-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
        >
          <svg
            className="absolute bottom-0 w-full h-16"
            preserveAspectRatio="none"
            viewBox="0 0 1440 74"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <motion.path
              d="M0 64L48 58.7C96 53.3 192 42.7 288 42.7C384 42.7 480 53.3 576 58.7C672 64 768 64 864 58.7C960 53.3 1056 42.7 1152 37.3C1248 32 1344 32 1392 32L1440 32V74H1392C1344 74 1248 74 1152 74C1056 74 960 74 864 74C768 74 672 74 576 74C480 74 384 74 288 74C192 74 96 74 48 74H0V64Z"
              fill="url(#bottomGradient)"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 2.2, duration: 0.8 }}
            />
            <defs>
              <linearGradient id="bottomGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#a78bfa" stopOpacity="0.3" />
                <stop offset="50%" stopColor="#4ade80" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#1e293b" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <div className="w-6 h-10 border-2 border-gray-600 rounded-full flex justify-center">
          <motion.div 
            className="w-1 h-2 bg-gradient-to-b from-purple-500 to-green-400 rounded-full mt-2"
            animate={{ y: [0, 4, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          />
        </div>
      </motion.div>
    </section>
  );
}