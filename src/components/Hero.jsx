"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import { useTheme } from "@/context/ThemeContext";

export default function Hero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [mounted, setMounted] = useState(false);
  const { isDarkMode } = useTheme();
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // ✅ ALL HOOKS CALLED AT TOP LEVEL
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);

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

  // Theme-aware gradient classes
  const bgGradient = isDarkMode
    ? "from-[#0a0f1e] via-[#0f172a] to-[#1a1f35]"
    : "from-blue-50 via-indigo-50 to-purple-50";

  const textGradient = "from-purple-600 to-indigo-600";
  const secondaryTextColor = isDarkMode ? "text-gray-400" : "text-gray-600";

  const floatingElements = [
    { Icon: "📊", delay: 0, x: 10, y: 20 },
    { Icon: "📈", delay: 0.5, x: -20, y: 40 },
    { Icon: "🤝", delay: 1, x: 30, y: -10 },
    { Icon: "⭐", delay: 1.5, x: -30, y: -20 },
  ];

  // FIXED: Use deterministic values instead of Math.random()
  const particlePositions = [
    { x: 10, y: 20, duration: 4, delay: 0.1, xMove: 20, yMove: 15 },
    { x: 30, y: 40, duration: 5, delay: 0.2, xMove: -15, yMove: 20 },
    { x: 50, y: 60, duration: 6, delay: 0.3, xMove: 25, yMove: -10 },
    { x: 70, y: 30, duration: 4.5, delay: 0.4, xMove: -20, yMove: 15 },
    { x: 20, y: 80, duration: 5.5, delay: 0.5, xMove: 15, yMove: -20 },
    { x: 80, y: 50, duration: 5, delay: 0.6, xMove: -25, yMove: 10 },
    { x: 40, y: 70, duration: 6.5, delay: 0.7, xMove: 20, yMove: -15 },
    { x: 60, y: 90, duration: 4, delay: 0.8, xMove: -15, yMove: 20 },
    { x: 90, y: 10, duration: 5, delay: 0.9, xMove: 10, yMove: -25 },
    { x: 15, y: 45, duration: 6, delay: 1.0, xMove: -20, yMove: 15 },
    { x: 45, y: 85, duration: 4.5, delay: 1.1, xMove: 15, yMove: -15 },
    { x: 75, y: 25, duration: 5.5, delay: 1.2, xMove: -10, yMove: 20 },
    { x: 25, y: 65, duration: 5, delay: 1.3, xMove: 20, yMove: -10 },
    { x: 55, y: 95, duration: 6, delay: 1.4, xMove: -15, yMove: 15 },
    { x: 85, y: 35, duration: 4, delay: 1.5, xMove: 10, yMove: -20 },
    { x: 35, y: 75, duration: 5, delay: 1.6, xMove: -20, yMove: 10 },
    { x: 65, y: 55, duration: 5.5, delay: 1.7, xMove: 15, yMove: -15 },
    { x: 95, y: 15, duration: 6, delay: 1.8, xMove: -10, yMove: 20 },
    { x: 5, y: 50, duration: 4.5, delay: 1.9, xMove: 20, yMove: -10 },
    { x: 50, y: 5, duration: 5, delay: 2.0, xMove: -15, yMove: 15 },
  ];

  // FIXED: Use deterministic values for stars
  const starPositions = [
    { size: 1, left: 5, top: 10, duration: 3, delay: 0 },
    { size: 2, left: 15, top: 25, duration: 4, delay: 0.2 },
    { size: 1, left: 25, top: 40, duration: 3.5, delay: 0.4 },
    { size: 3, left: 35, top: 15, duration: 5, delay: 0.6 },
    { size: 2, left: 45, top: 60, duration: 4, delay: 0.8 },
    { size: 1, left: 55, top: 30, duration: 3, delay: 1.0 },
    { size: 2, left: 65, top: 75, duration: 4.5, delay: 1.2 },
    { size: 1, left: 75, top: 45, duration: 3.5, delay: 1.4 },
    { size: 3, left: 85, top: 20, duration: 5, delay: 1.6 },
    { size: 2, left: 95, top: 80, duration: 4, delay: 1.8 },
    { size: 1, left: 8, top: 70, duration: 3, delay: 2.0 },
    { size: 2, left: 18, top: 85, duration: 4, delay: 2.2 },
    { size: 1, left: 28, top: 55, duration: 3.5, delay: 2.4 },
    { size: 3, left: 38, top: 95, duration: 5, delay: 2.6 },
    { size: 2, left: 48, top: 5, duration: 4, delay: 2.8 },
    { size: 1, left: 58, top: 35, duration: 3, delay: 3.0 },
    { size: 2, left: 68, top: 50, duration: 4.5, delay: 3.2 },
    { size: 1, left: 78, top: 65, duration: 3.5, delay: 3.4 },
    { size: 3, left: 88, top: 90, duration: 5, delay: 3.6 },
    { size: 2, left: 98, top: 12, duration: 4, delay: 3.8 },
  ];

  // Don't render animations until mounted on client
  if (!mounted) {
    return (
      <section 
        ref={containerRef}
        className={`relative w-full bg-gradient-to-br ${bgGradient} ${
          isDarkMode ? 'text-white' : 'text-gray-900'
        } min-h-screen overflow-hidden transition-colors duration-500`}
      >
        <div className="relative max-w-7xl mx-auto px-6 py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Simple static content for server render */}
            <div>
              <div className="h-8 w-48 bg-purple-500/20 rounded-full mb-6"></div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
                <span className="bg-gradient-to-r from-purple-600 to-indigo-600 text-transparent bg-clip-text">
                  Elevate
                </span>{" "}
                Ur Customer Relationships with Our CRM
              </h1>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section 
      ref={containerRef}
      className={`relative w-full bg-gradient-to-br ${bgGradient} ${
        isDarkMode ? 'text-white' : 'text-gray-900'
      } min-h-screen overflow-hidden transition-colors duration-500`}
    >
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden">
        {particlePositions.map((pos, i) => (
          <motion.div
            key={i}
            className={`absolute w-1 h-1 ${
              isDarkMode ? 'bg-purple-500/20' : 'bg-purple-400/30'
            } rounded-full`}
            style={{
              left: `${pos.x}%`,
              top: `${pos.y}%`,
            }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.2, 0.5, 0.2],
              x: [0, pos.xMove, 0],
              y: [0, pos.yMove, 0],
            }}
            transition={{
              duration: pos.duration,
              repeat: Infinity,
              delay: pos.delay,
              ease: "linear",
            }}
          />
        ))}
      </div>

      {/* Floating emojis/badges */}
      <div className="absolute inset-0 pointer-events-none">
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
              left: `${20 + index * 15}%`,
              top: `${10 + index * 10}%`,
            }}
          >
            {element.Icon}
          </motion.span>
        ))}
      </div>

      {/* Animated grid background */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(${isDarkMode ? 'rgba(139, 92, 246, 0.1)' : 'rgba(139, 92, 246, 0.1)'} 1px, transparent 1px),
            linear-gradient(90deg, ${isDarkMode ? 'rgba(139, 92, 246, 0.1)' : 'rgba(139, 92, 246, 0.1)'} 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}
      />

      {/* Animated gradient orbs */}
      <motion.div
        className={`absolute top-0 -left-20 w-96 h-96 ${
          isDarkMode ? 'bg-purple-600/30' : 'bg-purple-400/20'
        } rounded-full blur-3xl`}
        animate={{
          x: mousePosition.x * 50,
          y: mousePosition.y * 50,
          scale: [1, 1.2, 1],
        }}
        transition={{ 
          type: "spring", 
          stiffness: 50,
          scale: {
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }
        }}
      />
      <motion.div
        className={`absolute bottom-0 -right-20 w-96 h-96 ${
          isDarkMode ? 'bg-indigo-600/20' : 'bg-indigo-400/20'
        } rounded-full blur-3xl`}
        animate={{
          x: mousePosition.x * -50,
          y: mousePosition.y * -50,
          scale: [1.2, 1, 1.2],
        }}
        transition={{ 
          type: "spring", 
          stiffness: 50,
          scale: {
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }
        }}
      />
      
      {/* Additional floating orbs */}
      <motion.div
        className={`absolute top-1/3 left-1/4 w-64 h-64 ${
          isDarkMode ? 'bg-pink-600/20' : 'bg-pink-400/15'
        } rounded-full blur-3xl`}
        animate={{
          x: [0, 30, -30, 0],
          y: [0, -30, 30, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <motion.div
        className={`absolute bottom-1/3 right-1/4 w-72 h-72 ${
          isDarkMode ? 'bg-blue-600/20' : 'bg-blue-400/15'
        } rounded-full blur-3xl`}
        animate={{
          x: [0, -40, 40, 0],
          y: [0, 40, -40, 0],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Sparkling stars effect */}
      <div className="absolute inset-0 overflow-hidden">
        {starPositions.map((star, i) => (
          <motion.div
            key={i}
            className={`absolute rounded-full ${
              isDarkMode ? 'bg-white' : 'bg-purple-400'
            }`}
            style={{
              width: star.size,
              height: star.size,
              left: `${star.left}%`,
              top: `${star.top}%`,
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: star.duration,
              repeat: Infinity,
              delay: star.delay,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Animated wave at bottom */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden">
        <motion.div
          className="relative h-24 w-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
        >
          <svg
            className="absolute bottom-0 w-full h-24"
            preserveAspectRatio="none"
            viewBox="0 0 1440 74"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <motion.path
              d="M0 64L48 58.7C96 53.3 192 42.7 288 42.7C384 42.7 480 53.3 576 58.7C672 64 768 64 864 58.7C960 53.3 1056 42.7 1152 37.3C1248 32 1344 32 1392 32L1440 32V74H1392C1344 74 1248 74 1152 74C1056 74 960 74 864 74C768 74 672 74 576 74C480 74 384 74 288 74C192 74 96 74 48 74H0V64Z"
              fill={isDarkMode ? "url(#bottomGradientDark)" : "url(#bottomGradientLight)"}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 2.2, duration: 0.8 }}
            />
            <defs>
              <linearGradient id="bottomGradientDark" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#a78bfa" stopOpacity="0.3" />
                <stop offset="50%" stopColor="#4ade80" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#0f172a" stopOpacity="0" />
              </linearGradient>
              <linearGradient id="bottomGradientLight" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.2" />
                <stop offset="50%" stopColor="#6366f1" stopOpacity="0.15" />
                <stop offset="100%" stopColor="#f0f9ff" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>
        </motion.div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* LEFT CONTENT */}
          <motion.div
            style={{ y, opacity }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            {/* Animated badge with enhanced effects */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className={`inline-flex items-center gap-2 ${
                isDarkMode 
                  ? 'bg-white/5 border-white/10' 
                  : 'bg-purple-100/50 border-purple-200'
              } backdrop-blur-sm rounded-full px-4 py-2 mb-6 border relative overflow-hidden`}
            >
              {/* Shine effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                animate={{ x: ['-100%', '100%'] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              />
              
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <span className={`text-sm font-medium relative ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                New: AI-Powered Features
              </span>
              <motion.span
                animate={{ x: [0, 4, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="text-purple-500"
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
              <span className={`bg-gradient-to-r ${textGradient} text-transparent bg-clip-text`}>
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
                      stroke={isDarkMode ? "url(#gradientDark)" : "url(#gradientLight)"}
                      strokeWidth="3"
                      fill="none"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 1 }}
                      transition={{ delay: 1.5, duration: 1 }}
                    />
                    <defs>
                      <linearGradient id="gradientDark" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#a78bfa" />
                        <stop offset="50%" stopColor="#4ade80" />
                        <stop offset="100%" stopColor="#a78bfa" />
                      </linearGradient>
                      <linearGradient id="gradientLight" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#7c3aed" />
                        <stop offset="50%" stopColor="#10b981" />
                        <stop offset="100%" stopColor="#7c3aed" />
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
                <svg width="200" height="20" viewBox="0 0 200 20" className={isDarkMode ? 'text-purple-400' : 'text-purple-600'}>
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
                      i % 3 === 0 
                        ? isDarkMode ? 'bg-purple-500' : 'bg-purple-600'
                        : i % 3 === 1 
                        ? isDarkMode ? 'bg-green-400' : 'bg-green-600'
                        : isDarkMode ? 'bg-purple-300' : 'bg-purple-400'
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
              className={`${secondaryTextColor} mt-6 max-w-lg text-lg leading-relaxed`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              Enhance your customer interactions and streamline your sales
              processes with our powerful and intuitive CRM solution.
            </motion.p>

            {/* Buttons */}
            <motion.div 
              className="flex flex-wrap gap-4 mt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group relative px-8 py-4 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white transition-all shadow-lg shadow-purple-600/25 overflow-hidden"
              >
                <span className="relative z-10 font-semibold">Get a Demo</span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-purple-400 to-indigo-400"
                  initial={{ x: "100%" }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`group relative px-8 py-4 rounded-full border transition-all overflow-hidden ${
                  isDarkMode 
                    ? 'border-gray-600 hover:border-purple-500' 
                    : 'border-gray-300 hover:border-purple-500'
                }`}
              >
                <span className={`relative z-10 font-semibold ${
                  isDarkMode 
                    ? 'text-white group-hover:text-purple-400' 
                    : 'text-gray-900 group-hover:text-purple-600'
                } transition-colors`}>
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
                    className={`text-2xl font-bold bg-gradient-to-r ${textGradient} text-transparent bg-clip-text`}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 1 + index * 0.1, type: "spring" }}
                  >
                    {stat.value}
                  </motion.div>
                  <div className={`text-sm ${isDarkMode ? 'text-gray-500' : 'text-gray-600'}`}>
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* RIGHT SIDE IMAGE - USING PRE-COMPUTED HOOK VALUE */}
          <motion.div
            style={{ y: imageY }}
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
              className={`absolute -top-10 left-10 ${
                isDarkMode 
                  ? 'bg-[#1e293b]/90 border-white/10' 
                  : 'bg-white/90 border-gray-200 shadow-lg'
              } backdrop-blur-sm rounded-xl p-4 w-44 border`}
            >
              <p className={`text-xs font-semibold mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Volume vs Service
              </p>

              <div className="flex gap-2 items-end h-20">
                {[40, 60, 30, 50].map((height, i) => (
                  <motion.div
                    key={i}
                    className={`w-2 ${
                      i % 2 === 0 
                        ? isDarkMode ? 'bg-purple-400' : 'bg-purple-500'
                        : isDarkMode ? 'bg-indigo-400' : 'bg-indigo-500'
                    } rounded-t`}
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
              className={`absolute -bottom-10 right-0 ${
                isDarkMode 
                  ? 'bg-[#1e293b]/90 border-white/10' 
                  : 'bg-white/90 border-gray-200 shadow-lg'
              } backdrop-blur-sm rounded-xl p-4 w-72 border`}
            >
              <p className={`text-sm font-semibold mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Sales Reports
              </p>

              <div className="space-y-3">
                <div className="h-16 flex items-center">
                  <div className={`w-full h-1 ${
                    isDarkMode ? 'bg-gray-700' : 'bg-gray-200'
                  } rounded-full relative overflow-hidden`}>
                    <motion.div 
                      className="absolute top-0 left-0 w-1/3 h-full bg-purple-500"
                      animate={{ width: ["33%", "40%", "33%"] }}
                      transition={{ repeat: Infinity, duration: 3 }}
                    />
                    <motion.div 
                      className="absolute top-0 left-1/3 w-1/3 h-full bg-indigo-400"
                      animate={{ width: ["33%", "45%", "33%"] }}
                      transition={{ repeat: Infinity, duration: 3, delay: 0.5 }}
                    />
                    <div className="absolute top-0 right-0 w-1/3 h-full bg-green-400" />
                  </div>
                </div>

                {/* Mini legend */}
                <div className="flex gap-4 text-xs">
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-purple-500 rounded-full" />
                    <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>Q1</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-indigo-400 rounded-full" />
                    <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>Q2</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-green-400 rounded-full" />
                    <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>Q3</span>
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
              className={`absolute top-20 -right-10 ${
                isDarkMode 
                  ? 'bg-[#1e293b]/90 border-white/10' 
                  : 'bg-white/90 border-gray-200 shadow-lg'
              } backdrop-blur-sm rounded-xl p-3 border`}
            >
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center">
                  <span className="text-green-500">↑</span>
                </div>
                <div>
                  <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Conversion</p>
                  <p className="text-sm font-bold text-green-500">+23.5%</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <div className={`w-6 h-10 border-2 ${
          isDarkMode ? 'border-gray-600' : 'border-gray-300'
        } rounded-full flex justify-center relative overflow-hidden`}>
          <motion.div 
            className="w-1 h-2 bg-gradient-to-b from-purple-500 to-indigo-400 rounded-full mt-2"
            animate={{ y: [0, 4, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          />
          {/* Glow effect */}
          <motion.div
            className="absolute inset-0 bg-purple-500/20 blur-sm"
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ repeat: Infinity, duration: 2 }}
          />
        </div>
      </motion.div>
    </section>
  );
}