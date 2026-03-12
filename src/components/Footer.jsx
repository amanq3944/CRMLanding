"use client";

import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { 
  FaFacebookF, FaTwitter, FaLinkedinIn, FaGithub, 
  FaHeart, FaRocket, FaShieldAlt, FaGlobe, FaBolt,
  FaCrown, FaStar, FaArrowRight, FaCheck, FaSparkles
} from "react-icons/fa";
import { FiArrowUpRight, FiMail, FiMapPin, FiClock } from "react-icons/fi";
import { HiOutlineSparkles } from "react-icons/hi";
import { BsStars } from "react-icons/bs";
import { useTheme } from "@/context/ThemeContext";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const footerRef = useRef(null);
  const [email, setEmail] = useState("");
  const [isHovered, setIsHovered] = useState(false);
  const [mounted, setMounted] = useState(false);
  
  const { isDarkMode } = useTheme();
  
  // Parallax scroll effects
  const { scrollYProgress } = useScroll({
    target: footerRef,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.9]);
  
  // Mouse follower effect - only on client
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 25, stiffness: 200 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  useEffect(() => {
    setMounted(true);
    
    const handleMouseMove = (e) => {
      if (footerRef.current) {
        const rect = footerRef.current.getBoundingClientRect();
        mouseX.set(e.clientX - rect.left);
        mouseY.set(e.clientY - rect.top);
      }
    };
    
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  // Theme-aware color values
  const bgColor = isDarkMode ? '#030014' : '#f8fafc';
  const textPrimary = isDarkMode ? 'text-white' : 'text-gray-900';
  const textSecondary = isDarkMode ? 'text-gray-300' : 'text-gray-600';
  const textTertiary = isDarkMode ? 'text-gray-400' : 'text-gray-500';
  const borderColor = isDarkMode ? 'border-purple-500/30' : 'border-purple-300/50';
  const cardBg = isDarkMode 
    ? 'bg-gradient-to-br from-purple-900/40 via-pink-900/30 to-blue-900/40' 
    : 'bg-gradient-to-br from-purple-100/80 via-pink-100/80 to-blue-100/80';
  const inputBg = isDarkMode ? 'bg-white/5 border-white/10' : 'bg-purple-50/80 border-purple-200';
  const socialIconBg = isDarkMode ? 'bg-white/5 border-white/10' : 'bg-purple-100 border-purple-200';
  const linkColor = isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900';

  // Fixed values for SSR - no Math.random()
  const particles = [
    { id: 0, x: 10, y: 20, size: 2, type: 0 },
    { id: 1, x: 25, y: 45, size: 3, type: 1 },
    { id: 2, x: 40, y: 70, size: 1.5, type: 2 },
    { id: 3, x: 55, y: 15, size: 2.5, type: 0 },
    { id: 4, x: 70, y: 85, size: 2, type: 1 },
    { id: 5, x: 85, y: 30, size: 3.5, type: 2 },
    { id: 6, x: 15, y: 60, size: 2, type: 0 },
    { id: 7, x: 45, y: 90, size: 2.5, type: 1 },
    { id: 8, x: 65, y: 40, size: 3, type: 2 },
    { id: 9, x: 95, y: 75, size: 1.5, type: 0 },
    { id: 10, x: 5, y: 50, size: 2, type: 1 },
    { id: 11, x: 35, y: 25, size: 2.5, type: 2 },
    { id: 12, x: 75, y: 10, size: 3, type: 0 },
    { id: 13, x: 50, y: 95, size: 2, type: 1 },
    { id: 14, x: 20, y: 80, size: 2.5, type: 2 },
  ];

  // Fixed lines for SSR
  const lines = [
    { id: 0, x1: 10, y1: 20, x2: 30, y2: 40 },
    { id: 1, x1: 50, y1: 60, x2: 70, y2: 80 },
    { id: 2, x1: 80, y1: 10, x2: 40, y2: 50 },
    { id: 3, x1: 20, y1: 70, x2: 90, y2: 30 },
    { id: 4, x1: 60, y1: 40, x2: 30, y2: 85 },
    { id: 5, x1: 45, y1: 15, x2: 75, y2: 65 },
    { id: 6, x1: 85, y1: 55, x2: 25, y2: 95 },
    { id: 7, x1: 15, y1: 35, x2: 55, y2: 75 },
  ];

  // Fixed stars for SSR - theme aware colors
  const stars = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    x: (i * 7) % 100,
    y: (i * 13) % 100,
    size: ((i % 3) + 1) * 0.5,
    delay: (i % 5) * 0.2,
  }));

  // Fixed orbs for SSR - theme aware colors
  const orbs = [
    { id: 0, left: 10, top: 20, width: 250, height: 250, color: 'purple', delay: 0 },
    { id: 1, left: 70, top: 60, width: 200, height: 200, color: 'pink', delay: 2 },
    { id: 2, left: 40, top: 30, width: 300, height: 300, color: 'blue', delay: 4 },
    { id: 3, left: 80, top: 10, width: 220, height: 220, color: 'purple', delay: 1 },
    { id: 4, left: 20, top: 80, width: 280, height: 280, color: 'pink', delay: 3 },
    { id: 5, left: 55, top: 45, width: 180, height: 180, color: 'blue', delay: 5 },
  ];

  // Fixed clouds for SSR - theme aware colors
  const clouds = [
    { id: 0, left: 5, top: 10, width: 400, height: 400, color: 'purple' },
    { id: 1, left: 35, top: 40, width: 400, height: 400, color: 'pink' },
    { id: 2, left: 65, top: 20, width: 400, height: 400, color: 'blue' },
    { id: 3, left: 25, top: 70, width: 400, height: 400, color: 'purple' },
  ];

  // Animated features
  const features = [
    { icon: FaBolt, text: "Lightning Fast", color: "yellow" },
    { icon: FaShieldAlt, text: "Bank-Level Security", color: "green" },
    { icon: FaGlobe, text: "Global Infrastructure", color: "blue" },
    { icon: FaHeart, text: "99.9% Uptime", color: "red" }
  ];

  // Theme-aware gradient classes
  const footerGradient = isDarkMode
    ? 'from-[#030014] via-[#0a0a2a] to-[#030014]'
    : 'from-purple-50 via-white to-indigo-50';
  
  const radialTopGradient = isDarkMode
    ? 'ellipse_at_top,_#1a0b2e_0%,_#030014_50%'
    : 'ellipse_at_top,_#f3e8ff_0%,_#f8fafc_50%';
  
  const radialBottomGradient = isDarkMode
    ? 'ellipse_at_bottom,_#0f172a_0%,_#030014_100%'
    : 'ellipse_at_bottom,_#e0e7ff_0%,_#f8fafc_100%';
  
  const vignetteColor = isDarkMode ? '#030014' : '#f8fafc';

  // Don't render complex animations on server
  if (!mounted) {
    return (
      <footer className={`relative ${isDarkMode ? 'bg-[#030014]' : 'bg-purple-50'} pt-24 pb-8 border-t ${borderColor} transition-colors duration-500`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Simple static footer for SSR */}
          <div className="grid lg:grid-cols-5 gap-12 mb-20">
            <div className="lg:col-span-2">
              <div className={`text-5xl font-extrabold mb-4 ${textPrimary}`}>CRM</div>
              <p className={textTertiary}>The next-generation SaaS platform.</p>
            </div>
          </div>
        </div>
      </footer>
    );
  }

  return (
    <footer 
      ref={footerRef}
      className={`relative ${isDarkMode ? 'bg-[#030014]' : 'bg-gradient-to-b from-purple-50 to-white'} pt-24 pb-8 overflow-hidden border-t ${borderColor} transition-colors duration-500`}
    >
      {/* ===== SPECTACULAR BACKGROUND DESIGN - THEME AWARE ===== */}
      
      {/* 1. Deep cosmic gradient base - THEME AWARE */}
      <div 
        className="absolute inset-0"
        style={{
          background: `radial-gradient(${radialTopGradient}), radial-gradient(${radialBottomGradient})`
        }}
      />
      
      {/* 2. Animated aurora borealis effect - THEME AWARE - REMOVED animate-pulse */}
      <motion.div 
        className="absolute inset-0"
        style={{ opacity: isDarkMode ? 0.3 : 0.15 }}
        animate={{
          background: isDarkMode
            ? [
                "radial-gradient(circle at 20% 50%, #8b5cf6 0%, transparent 50%), radial-gradient(circle at 80% 50%, #ec4899 0%, transparent 50%)",
                "radial-gradient(circle at 30% 40%, #8b5cf6 0%, transparent 50%), radial-gradient(circle at 70% 60%, #ec4899 0%, transparent 50%)",
                "radial-gradient(circle at 20% 50%, #8b5cf6 0%, transparent 50%), radial-gradient(circle at 80% 50%, #ec4899 0%, transparent 50%)",
              ]
            : [
                "radial-gradient(circle at 20% 50%, #c084fc 0%, transparent 50%), radial-gradient(circle at 80% 50%, #f9a8d4 0%, transparent 50%)",
                "radial-gradient(circle at 30% 40%, #c084fc 0%, transparent 50%), radial-gradient(circle at 70% 60%, #f9a8d4 0%, transparent 50%)",
                "radial-gradient(circle at 20% 50%, #c084fc 0%, transparent 50%), radial-gradient(circle at 80% 50%, #f9a8d4 0%, transparent 50%)",
              ]
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      {/* 3. Twinkling stars background - THEME AWARE - USING FRAMER MOTION INSTEAD OF ANIMATION CLASSES */}
      <div className="absolute inset-0">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          {stars.map((star) => (
            <motion.circle
              key={`star-${star.id}`}
              cx={`${star.x}%`}
              cy={`${star.y}%`}
              r={star.size}
              fill={isDarkMode ? "#ffffff" : "#8b5cf6"}
              animate={{
                opacity: isDarkMode ? [0.2, 0.8, 0.2] : [0.1, 0.4, 0.1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: star.delay,
              }}
            />
          ))}
        </svg>
      </div>
      
      {/* 4. Floating glowing orbs with trails - THEME AWARE */}
      {orbs.map((orb) => (
        <motion.div
          key={`orb-${orb.id}`}
          className="absolute rounded-full blur-3xl"
          style={{
            width: orb.width,
            height: orb.height,
            background: `radial-gradient(circle at center, 
              ${orb.color === 'purple' 
                ? (isDarkMode ? '#8b5cf6' : '#c084fc') 
                : orb.color === 'pink' 
                ? (isDarkMode ? '#ec4899' : '#f9a8d4') 
                : (isDarkMode ? '#3b82f6' : '#93c5fd')}${isDarkMode ? '40' : '30'}, 
              transparent 70%)`,
            left: `${orb.left}%`,
            top: `${orb.top}%`,
          }}
          animate={{
            x: [0, orb.id % 2 === 0 ? 50 : -40, 0],
            y: [0, orb.id % 3 === 0 ? -40 : 30, 0],
            scale: [1, 1.3, 1],
            opacity: isDarkMode ? [0.3, 0.6, 0.3] : [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 15 + orb.id,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
      
      {/* 5. Animated constellation lines - THEME AWARE */}
      <svg className="absolute inset-0 w-full h-full" style={{ opacity: isDarkMode ? 0.2 : 0.1 }}>
        {lines.map((line) => (
          <motion.line
            key={`line-${line.id}`}
            x1={`${line.x1}%`}
            y1={`${line.y1}%`}
            x2={`${line.x2}%`}
            y2={`${line.y2}%`}
            stroke={`url(#lineGrad-${line.id % 3})`}
            strokeWidth="0.5"
            strokeDasharray="5,5"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{
              duration: 15 + line.id,
              repeat: Infinity,
              delay: line.id * 0.5,
              repeatType: "reverse"
            }}
          />
        ))}
        <defs>
          <linearGradient id="lineGrad-0" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={isDarkMode ? "#8b5cf6" : "#c084fc"} />
            <stop offset="100%" stopColor={isDarkMode ? "#ec4899" : "#f9a8d4"} />
          </linearGradient>
          <linearGradient id="lineGrad-1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={isDarkMode ? "#3b82f6" : "#93c5fd"} />
            <stop offset="100%" stopColor={isDarkMode ? "#8b5cf6" : "#c084fc"} />
          </linearGradient>
          <linearGradient id="lineGrad-2" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={isDarkMode ? "#ec4899" : "#f9a8d4"} />
            <stop offset="100%" stopColor={isDarkMode ? "#3b82f6" : "#93c5fd"} />
          </linearGradient>
        </defs>
      </svg>
      
      {/* 6. Floating particles with different shapes - THEME AWARE */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute pointer-events-none"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size * 2,
            height: particle.size * 2,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, (particle.id % 2 === 0 ? 20 : -20), 0],
            rotate: [0, 360],
            opacity: isDarkMode ? [0.1, 0.5, 0.1] : [0.05, 0.25, 0.05],
          }}
          transition={{
            duration: 10 + particle.id,
            repeat: Infinity,
            delay: particle.id * 0.3,
            ease: "easeInOut"
          }}
        >
          {particle.type === 0 && (
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L15 9H22L16 14L19 21L12 16.5L5 21L8 14L2 9H9L12 2Z" 
                fill={particle.id % 3 === 0 
                  ? (isDarkMode ? '#8b5cf6' : '#c084fc') 
                  : particle.id % 3 === 1 
                  ? (isDarkMode ? '#ec4899' : '#f9a8d4') 
                  : (isDarkMode ? '#3b82f6' : '#93c5fd')} 
                opacity={isDarkMode ? "0.5" : "0.3"}/>
            </svg>
          )}
          {particle.type === 1 && (
            <div className={`w-full h-full rounded-full ${
              particle.id % 3 === 0 
                ? (isDarkMode ? 'bg-purple-400' : 'bg-purple-300') 
                : particle.id % 3 === 1 
                ? (isDarkMode ? 'bg-pink-400' : 'bg-pink-300') 
                : (isDarkMode ? 'bg-blue-400' : 'bg-blue-300')
            } ${isDarkMode ? 'opacity-30' : 'opacity-20'}`} />
          )}
          {particle.type === 2 && (
            <div className={`w-full h-full rotate-45 ${
              particle.id % 3 === 0 
                ? (isDarkMode ? 'bg-purple-400' : 'bg-purple-300') 
                : particle.id % 3 === 1 
                ? (isDarkMode ? 'bg-pink-400' : 'bg-pink-300') 
                : (isDarkMode ? 'bg-blue-400' : 'bg-blue-300')
            } ${isDarkMode ? 'opacity-30' : 'opacity-20'}`} style={{ clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' }} />
          )}
        </motion.div>
      ))}
      
      {/* 7. Animated gradient mesh - THEME AWARE - REMOVED ANIMATION CLASSES */}
      <div className="absolute inset-0" style={{ opacity: isDarkMode ? 0.3 : 0.15 }}>
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="mesh" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
              <motion.path
                d="M40 0 L0 0 0 40"
                stroke="url(#meshGrad)"
                strokeWidth="0.5"
                fill="none"
                animate={{
                  d: [
                    "M40 0 L0 0 0 40",
                    "M40 5 L5 0 0 35",
                    "M40 0 L0 0 0 40"
                  ]
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </pattern>
            <linearGradient id="meshGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={isDarkMode ? "#8b5cf6" : "#c084fc"} stopOpacity={isDarkMode ? "0.3" : "0.2"} />
              <stop offset="50%" stopColor={isDarkMode ? "#ec4899" : "#f9a8d4"} stopOpacity={isDarkMode ? "0.3" : "0.2"} />
              <stop offset="100%" stopColor={isDarkMode ? "#3b82f6" : "#93c5fd"} stopOpacity={isDarkMode ? "0.3" : "0.2"} />
            </linearGradient>
          </defs>
          <rect width="100%" height="100%" fill="url(#mesh)" />
        </svg>
      </div>
      
      {/* 8. Animated light beams - THEME AWARE */}
      {[0, 1, 2, 3, 4].map((i) => (
        <motion.div
          key={`beam-${i}`}
          className={`absolute top-0 bottom-0 w-32 bg-gradient-to-r from-transparent ${
            isDarkMode ? 'via-white/5' : 'via-purple-200/20'
          } to-transparent skew-x-12`}
          style={{ left: `${i * 25}%` }}
          animate={{
            x: ['-100%', '200%'],
            opacity: isDarkMode ? [0, 0.5, 0] : [0, 0.3, 0],
          }}
          transition={{
            duration: 4 + i,
            repeat: Infinity,
            delay: i * 2,
            ease: "linear"
          }}
        />
      ))}
      
      {/* 9. Glowing dots grid - THEME AWARE */}
      <div className="absolute inset-0" style={{ 
        backgroundImage: isDarkMode
          ? `
            radial-gradient(circle at 20px 20px, #8b5cf6 1px, transparent 1px),
            radial-gradient(circle at 60px 60px, #ec4899 1px, transparent 1px)
          `
          : `
            radial-gradient(circle at 20px 20px, #c084fc 1px, transparent 1px),
            radial-gradient(circle at 60px 60px, #f9a8d4 1px, transparent 1px)
          `,
        backgroundSize: '80px 80px, 120px 120px',
        opacity: isDarkMode ? 0.1 : 0.05
      }} />
      
      {/* 10. Animated mouse follower with enhanced effect - THEME AWARE */}
      <motion.div
        className="absolute pointer-events-none inset-0"
        style={{
          background: isDarkMode
            ? `radial-gradient(circle at ${springX}px ${springY}px, 
                rgba(139, 92, 246, 0.2) 0%, 
                rgba(236, 72, 153, 0.1) 30%, 
                transparent 60%)`
            : `radial-gradient(circle at ${springX}px ${springY}px, 
                rgba(139, 92, 246, 0.15) 0%, 
                rgba(236, 72, 153, 0.08) 30%, 
                transparent 60%)`,
        }}
      />
      
      {/* 11. Floating nebula clouds - THEME AWARE */}
      {clouds.map((cloud) => (
        <motion.div
          key={`cloud-${cloud.id}`}
          className="absolute rounded-full blur-[100px]"
          style={{
            width: cloud.width,
            height: cloud.height,
            background: `radial-gradient(circle at center, 
              ${cloud.color === 'purple' 
                ? (isDarkMode ? '#8b5cf6' : '#c084fc') 
                : cloud.color === 'pink' 
                ? (isDarkMode ? '#ec4899' : '#f9a8d4') 
                : (isDarkMode ? '#3b82f6' : '#93c5fd')}${isDarkMode ? '20' : '15'}, 
              transparent 70%)`,
            left: `${cloud.left}%`,
            top: `${cloud.top}%`,
          }}
          animate={{
            x: [0, 40, -20, 0],
            y: [0, -30, 20, 0],
            scale: [1, 1.2, 0.9, 1],
          }}
          transition={{
            duration: 20 + cloud.id * 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
      
      {/* 12. Animated corner accents - THEME AWARE */}
      <div className="absolute top-0 left-0 w-64 h-64">
        <motion.div 
          className={`absolute top-0 left-0 w-32 h-32 border-t-2 border-l-2 ${
            isDarkMode ? 'border-purple-500/30' : 'border-purple-400/30'
          } rounded-tl-3xl`}
          animate={{
            scale: [1, 1.1, 1],
            opacity: isDarkMode ? [0.3, 0.6, 0.3] : [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 4, repeat: Infinity }}
        />
      </div>
      <div className="absolute top-0 right-0 w-64 h-64">
        <motion.div 
          className={`absolute top-0 right-0 w-32 h-32 border-t-2 border-r-2 ${
            isDarkMode ? 'border-pink-500/30' : 'border-pink-400/30'
          } rounded-tr-3xl`}
          animate={{
            scale: [1, 1.1, 1],
            opacity: isDarkMode ? [0.3, 0.6, 0.3] : [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 4, repeat: Infinity, delay: 1 }}
        />
      </div>
      <div className="absolute bottom-0 left-0 w-64 h-64">
        <motion.div 
          className={`absolute bottom-0 left-0 w-32 h-32 border-b-2 border-l-2 ${
            isDarkMode ? 'border-blue-500/30' : 'border-blue-400/30'
          } rounded-bl-3xl`}
          animate={{
            scale: [1, 1.1, 1],
            opacity: isDarkMode ? [0.3, 0.6, 0.3] : [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 4, repeat: Infinity, delay: 2 }}
        />
      </div>
      <div className="absolute bottom-0 right-0 w-64 h-64">
        <motion.div 
          className={`absolute bottom-0 right-0 w-32 h-32 border-b-2 border-r-2 ${
            isDarkMode ? 'border-purple-500/30' : 'border-purple-400/30'
          } rounded-br-3xl`}
          animate={{
            scale: [1, 1.1, 1],
            opacity: isDarkMode ? [0.3, 0.6, 0.3] : [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 4, repeat: Infinity, delay: 3 }}
        />
      </div>
      
      {/* 13. Vignette effect - THEME AWARE */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at center, transparent 30%, ${vignetteColor} 100%)`
        }}
      />
      
      {/* 14. Subtle noise texture */}
      <div className="absolute inset-0 opacity-20 mix-blend-overlay" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.4'/%3E%3C/svg%3E")`,
        backgroundRepeat: 'repeat',
      }} />

      {/* ===== END BACKGROUND DESIGN ===== */}

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        {/* TOP SECTION WITH NEWSLETTER AND STATS */}
        <motion.div 
          style={{ y, opacity, scale }}
          className="grid lg:grid-cols-5 gap-12 mb-20"
        >
          
          {/* BRAND - WITH ANIMATED COUNTERS */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, type: "spring" }}
              viewport={{ once: true }}
            >
              <motion.h2 
                className={`text-5xl font-extrabold mb-4 tracking-tight ${textPrimary}`}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <span className={`bg-gradient-to-r ${
                  isDarkMode 
                    ? 'from-white via-purple-200 to-pink-200' 
                    : 'from-gray-900 via-purple-600 to-pink-600'
                } bg-clip-text text-transparent`}>
                  CRM
                </span>
                <motion.span
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                  className="inline-block ml-1"
                >
                  <BsStars className="text-purple-400 text-3xl" />
                </motion.span>
              </motion.h2>
              
              <p className={`${textTertiary} leading-relaxed max-w-md mb-6`}>
                The next-generation SaaS platform that empowers businesses to scale faster with intelligent automation and real-time insights.
              </p>
              
              {/* STATS */}
              <div className="flex gap-6 mb-6">
                {[
                  { value: "10K+", label: "Customers" },
                  { value: "99.9%", label: "Uptime" },
                  { value: "24/7", label: "Support" }
                ].map((stat, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    whileHover={{ y: -5 }}
                  >
                    <div className={`text-2xl font-bold ${textPrimary}`}>{stat.value}</div>
                    <div className={`text-xs ${textTertiary}`}>{stat.label}</div>
                  </motion.div>
                ))}
              </div>
              
              {/* SOCIAL ICONS - WITH RIPPLE EFFECT */}
              <div className="flex gap-3">
                {[
                  { icon: FaFacebookF, label: "Facebook" },
                  { icon: FaTwitter, label: "Twitter" },
                  { icon: FaLinkedinIn, label: "LinkedIn" },
                  { icon: FaGithub, label: "GitHub" },
                ].map((social, idx) => (
                  <motion.a
                    key={idx}
                    href="#"
                    whileHover={{ scale: 1.15, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                    className={`group relative w-11 h-11 ${socialIconBg} backdrop-blur-sm rounded-xl flex items-center justify-center ${
                      isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                    } border transition-all duration-300`}
                    style={{
                      borderColor: isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(139,92,246,0.2)',
                      backgroundColor: isDarkMode ? 'rgba(255,255,255,0.05)' : 'rgba(139,92,246,0.05)'
                    }}
                    aria-label={social.label}
                  >
                    <social.icon className="text-base" />
                    <motion.span 
                      className={`absolute inset-0 rounded-xl bg-gradient-to-r ${
                        isDarkMode ? 'from-purple-500/20 to-pink-500/20' : 'from-purple-400/20 to-pink-400/20'
                      }`}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileHover={{ opacity: 1, scale: 1.2 }}
                      transition={{ duration: 0.3 }}
                    />
                    {/* Ripple effect */}
                    <motion.span
                      className="absolute inset-0 rounded-xl border-2 border-purple-400/30"
                      animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
                      transition={{ duration: 2, repeat: Infinity, delay: idx * 0.3 }}
                    />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* ENHANCED NEWSLETTER WITH ANIMATION */}
          <div className="lg:col-span-3">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, type: "spring", delay: 0.2 }}
              viewport={{ once: true }}
              style={{
                boxShadow: isDarkMode
                  ? "0 25px 50px -12px rgba(168, 85, 247, 0.5)"
                  : "0 25px 50px -12px rgba(168, 85, 247, 0.3)"
              }}
              className={`${cardBg} backdrop-blur-xl p-8 rounded-3xl border ${borderColor} relative overflow-hidden group`}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {/* Animated background pattern */}
              <motion.div
                className="absolute inset-0 transition-opacity duration-700"
                style={{ opacity: 0 }}
                animate={{
                  opacity: isHovered ? 1 : 0,
                  background: isHovered && isDarkMode
                    ? "radial-gradient(circle at 30% 50%, rgba(168, 85, 247, 0.2), transparent 50%)"
                    : isHovered && !isDarkMode
                    ? "radial-gradient(circle at 30% 50%, rgba(168, 85, 247, 0.1), transparent 50%)"
                    : "none"
                }}
              />
              
              <motion.div
                animate={{
                  rotate: isHovered ? [0, 360] : 0
                }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className={`absolute -right-10 -top-10 w-40 h-40 bg-gradient-to-r ${
                  isDarkMode ? 'from-purple-500/10 to-pink-500/10' : 'from-purple-400/10 to-pink-400/10'
                } rounded-full blur-2xl`}
              />
              
              <div className="relative">
                <motion.div 
                  className="flex items-center gap-3 mb-4"
                  animate={{ x: isHovered ? [0, 5, -5, 0] : 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <FaRocket className="text-purple-400 text-2xl" />
                  <h3 className={`text-2xl font-semibold ${textPrimary}`}>
                    Stay ahead of the curve
                  </h3>
                  <HiOutlineSparkles className="text-yellow-400 text-xl" />
                </motion.div>
                
                <p className={`${textSecondary} mb-6`}>
                  Join 10,000+ subscribers getting product updates, industry insights, and exclusive offers.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="flex-1 relative">
                    <input 
                      type="email" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email" 
                      className={`w-full px-5 py-4 ${inputBg} border rounded-xl ${
                        isDarkMode 
                          ? 'text-white placeholder-gray-500' 
                          : 'text-gray-900 placeholder-gray-400'
                      } focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all pr-12`}
                    />
                    <FiMail className={`absolute right-4 top-1/2 transform -translate-y-1/2 ${textTertiary}`} />
                  </div>
                  
                  <motion.button 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium rounded-xl shadow-lg shadow-purple-600/30 hover:shadow-purple-600/50 transition-all duration-300 flex items-center justify-center gap-2 group relative overflow-hidden"
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      Subscribe
                      <FiArrowUpRight className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </span>
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-500"
                      animate={{
                        x: ["0%", "100%"],
                      }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      style={{ opacity: 0.3 }}
                    />
                  </motion.button>
                </div>
                
                {/* Features list */}
                <motion.div 
                  className="flex flex-wrap gap-4 mt-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  {features.map((feature, idx) => (
                    <motion.div
                      key={idx}
                      className={`flex items-center gap-2 text-sm ${textTertiary}`}
                      whileHover={{ scale: 1.05, color: isDarkMode ? "#fff" : "#000" }}
                    >
                      <feature.icon className={`text-${feature.color}-400`} />
                      <span>{feature.text}</span>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* LINKS GRID - WITH STAGGER ANIMATION */}
        <div className={`grid md:grid-cols-2 lg:grid-cols-4 gap-8 py-8 border-t ${
          isDarkMode ? 'border-white/5' : 'border-gray-200'
        }`}>
          
          {[
            {
              title: "Product",
              links: ["Features", "Pricing", "Integrations", "Updates", "Roadmap"],
              badges: { "Roadmap": "new" }
            },
            {
              title: "Company",
              links: ["About", "Blog", "Careers", "Press", "Partners"],
              badges: { "Careers": "hiring" }
            },
            {
              title: "Support",
              links: ["Help Center", "Documentation", "API Status", "Security", "Compliance"],
              badges: { "API Status": "live" }
            },
            {
              title: "Legal",
              links: ["Privacy Policy", "Terms of Service", "Cookie Policy", "GDPR", "DPA"],
            }
          ].map((section, sectionIdx) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: sectionIdx * 0.1 }}
              viewport={{ once: true }}
            >
              <h3 className={`text-lg font-semibold ${textPrimary} mb-5 flex items-center gap-2`}>
                <motion.span 
                  className="w-1 h-4 bg-gradient-to-b from-purple-400 to-pink-400 rounded-full"
                  animate={{
                    height: [16, 20, 16],
                    opacity: [0.5, 1, 0.5]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: sectionIdx * 0.3
                  }}
                />
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((item, idx) => (
                  <motion.li 
                    key={item}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: (sectionIdx * 0.1) + (idx * 0.05) }}
                    whileHover={{ x: 5 }}
                  >
                    <a href="#" className={`${linkColor} transition-colors duration-200 flex items-center gap-2 group`}>
                      <motion.span
                        className="w-1 h-1 bg-purple-400 rounded-full opacity-0 group-hover:opacity-100"
                        animate={{
                          scale: [1, 1.5, 1],
                        }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                        }}
                      />
                      {item}
                      {section.badges?.[item] && (
                        <motion.span 
                          className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${
                            section.badges[item] === "hiring" 
                              ? "bg-green-500/20 text-green-400 border-green-500/30"
                              : section.badges[item] === "new"
                              ? "bg-purple-500/20 text-purple-400 border-purple-500/30"
                              : "bg-blue-500/20 text-blue-400 border-blue-500/30"
                          }`}
                          animate={{
                            scale: [1, 1.1, 1],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                          }}
                        >
                          {section.badges[item]}
                        </motion.span>
                      )}
                      <FiArrowUpRight className="opacity-0 group-hover:opacity-100 text-xs transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* BOTTOM BAR - WITH CONTACT INFO AND TRUST BADGES */}
        <motion.div 
          className={`border-t ${isDarkMode ? 'border-white/5' : 'border-gray-200'} mt-12 pt-8 flex flex-col lg:flex-row items-center justify-between gap-6`}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          viewport={{ once: true }}
        >
          
          {/* COPYRIGHT */}
          <div className={`${textTertiary} text-sm flex items-center gap-2`}>
            <span>© {currentYear} CRM Platform.</span>
            <motion.span 
              className="flex items-center gap-1"
              animate={{
                color: isDarkMode 
                  ? ["#9ca3af", "#c084fc", "#9ca3af"]
                  : ["#6b7280", "#9333ea", "#6b7280"]
              }}
              transition={{
                duration: 3,
                repeat: Infinity
              }}
            >
              All rights reserved.
            </motion.span>
          </div>

          {/* CONTACT INFO */}
          <div className={`flex items-center gap-6 text-sm ${textTertiary}`}>
            <motion.div 
              className="flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
            >
              <FiMapPin className="text-purple-400" />
              <span>India</span>
            </motion.div>
            <motion.div 
              className="flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
            >
              <FiClock className="text-purple-400" />
              <span>24/7 Support</span>
            </motion.div>
          </div>

          {/* TRUST BADGES */}
          <div className="flex gap-4">
            {["ISO 27001", "SOC 2", "GDPR"].map((badge, idx) => (
              <motion.div
                key={badge}
                className={`px-3 py-1 rounded-full text-xs border`}
                style={{
                  backgroundColor: isDarkMode ? 'rgba(255,255,255,0.05)' : 'rgba(139,92,246,0.05)',
                  borderColor: isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(139,92,246,0.2)',
                  color: isDarkMode ? '#9ca3af' : '#6b7280'
                }}
                whileHover={{ 
                  scale: 1.1, 
                  backgroundColor: isDarkMode ? 'rgba(168, 85, 247, 0.2)' : 'rgba(168, 85, 247, 0.1)' 
                }}
                animate={{
                  y: [0, -2, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: idx * 0.3
                }}
              >
                {badge}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* MADE WITH LOVE ANIMATION */}
        <motion.div 
          className={`mt-8 text-center text-xs ${textTertiary} flex items-center justify-center gap-1`}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 1 }}
          whileHover={{ scale: 1.1 }}
        >
          <span>Made with</span>
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity
            }}
          >
            <FaHeart className="text-red-500" />
          </motion.div>
          <span>by the CRM team</span>
        </motion.div>
      </div>
    </footer>
  );
}