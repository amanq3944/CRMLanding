"use client";

import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";
import * as Icons from "react-icons/fa";
import { useRef, useState, useCallback, useEffect } from "react";
import { useTheme } from "@/context/ThemeContext";

// ==================== PRODUCT DATA ====================
const products = [
  {
    id: "crm",
    icon: "FaCloud",
    title: "Cloud CRM",
    shortDesc: "Next-gen customer relationship management",
    description: "AI-powered CRM with real-time sync and unlimited scalability for enterprise businesses.",
    features: [
      { name: "Real-time sync", icon: "FaSync", highlight: true },
      { name: "Unlimited storage", icon: "FaDatabase", highlight: true },
      { name: "Mobile access", icon: "FaMobile", highlight: true },
      { name: "AI predictions", icon: "FaBrain", highlight: false }
    ],
    metrics: [
      { value: "99.9%", label: "Uptime", icon: "FaClock", trend: "+0.5%" },
      { value: "10K+", label: "Users", icon: "FaUsers", trend: "+156%" },
      { value: "245%", label: "ROI", icon: "FaChartLine", trend: "+89%" }
    ],
    technologies: ["React", "Node.js", "MongoDB", "Redis"],
    color: {
      primary: "from-purple-500 to-pink-500",
      secondary: "from-purple-600 to-pink-600",
      bg: "bg-purple-500/10",
      icon: "text-purple-400",
      border: "border-purple-500/20",
    },
    stats: "Enterprise"
  },
  {
    id: "analytics",
    icon: "FaChartPie",
    title: "Analytics",
    shortDesc: "AI-powered business intelligence",
    description: "Transform data into actionable insights with ML analytics and real-time visualization.",
    features: [
      { name: "Predictive analytics", icon: "FaBrain", highlight: true },
      { name: "Custom reports", icon: "FaChartBar", highlight: true },
      { name: "Live tracking", icon: "FaChartLine", highlight: true },
      { name: "ML insights", icon: "FaMicrochip", highlight: false }
    ],
    metrics: [
      { value: "2.5B", label: "Data points", icon: "FaDatabase", trend: "+45%" },
      { value: "99%", label: "Accuracy", icon: "FaCheckCircle", trend: "+12%" },
      { value: "Real-time", label: "Processing", icon: "FaClock", trend: "<10ms" }
    ],
    technologies: ["TensorFlow", "D3.js", "Python", "Spark"],
    color: {
      primary: "from-blue-500 to-cyan-500",
      secondary: "from-blue-600 to-cyan-600",
      bg: "bg-blue-500/10",
      icon: "text-blue-400",
      border: "border-blue-500/20",
    },
    stats: "AI-Powered"
  },
  {
    id: "automation",
    icon: "FaRobot",
    title: "Automation",
    shortDesc: "Intelligent workflow automation",
    description: "Automate repetitive tasks with adaptive AI technology and smart workflows.",
    features: [
      { name: "Smart workflows", icon: "FaNetworkWired", highlight: true },
      { name: "Predictive tasks", icon: "FaBrain", highlight: true },
      { name: "Auto-optimization", icon: "FaSync", highlight: true },
      { name: "NLP processing", icon: "FaMicrochip", highlight: false }
    ],
    metrics: [
      { value: "85%", label: "Time saved", icon: "FaClock", trend: "+23%" },
      { value: "1M+", label: "Automations", icon: "FaRocket", trend: "+200%" },
      { value: "98%", label: "Accuracy", icon: "FaCheckCircle", trend: "+5%" }
    ],
    technologies: ["GPT-4", "RPA", "LangChain", "Python"],
    color: {
      primary: "from-amber-500 to-orange-500",
      secondary: "from-amber-600 to-orange-600",
      bg: "bg-amber-500/10",
      icon: "text-amber-400",
      border: "border-amber-500/20",
    },
    stats: "85% Faster"
  },
  {
    id: "data",
    icon: "FaDatabase",
    title: "Data Management",
    shortDesc: "Enterprise-grade data security",
    description: "Military-grade encryption with intelligent organization and zero-trust architecture.",
    features: [
      { name: "Bank-level security", icon: "FaLock", highlight: true },
      { name: "Auto-backup", icon: "FaCloudUploadAlt", highlight: true },
      { name: "Smart search", icon: "FaBrain", highlight: true },
      { name: "Compliance", icon: "FaShieldAlt", highlight: false }
    ],
    metrics: [
      { value: "100%", label: "Secure", icon: "FaShieldAlt", trend: "AES-256" },
      { value: "99.99%", label: "Durable", icon: "FaServer", trend: "SLA" },
      { value: "Zero", label: "Trust", icon: "FaLock", trend: "Zero-trust" }
    ],
    technologies: ["AES-256", "IPFS", "Shamir", "Blockchain"],
    color: {
      primary: "from-emerald-500 to-teal-500",
      secondary: "from-emerald-600 to-teal-600",
      bg: "bg-emerald-500/10",
      icon: "text-emerald-400",
      border: "border-emerald-500/20",
    },
    stats: "Military Grade"
  }
];

// ==================== ICON HELPER ====================
const Icon = ({ name, className = "" }) => {
  const IconComponent = Icons[name];
  return IconComponent ? <IconComponent className={className} /> : null;
};

// ==================== STUNNING BACKGROUND - THEME AWARE ====================
const StunningBackground = ({ isDarkMode }) => {
  // Fixed positions for particles
  const particles = [
    { id: 0, left: 10, top: 20, size: 2, type: 0, delay: 0 },
    { id: 1, left: 25, top: 45, size: 3, type: 1, delay: 0.5 },
    { id: 2, left: 40, top: 70, size: 1.5, type: 2, delay: 1 },
    { id: 3, left: 55, top: 15, size: 2.5, type: 0, delay: 1.5 },
    { id: 4, left: 70, top: 85, size: 2, type: 1, delay: 2 },
    { id: 5, left: 85, top: 30, size: 3.5, type: 2, delay: 2.5 },
    { id: 6, left: 15, top: 60, size: 2, type: 0, delay: 3 },
    { id: 7, left: 45, top: 90, size: 2.5, type: 1, delay: 3.5 },
    { id: 8, left: 65, top: 40, size: 3, type: 2, delay: 4 },
    { id: 9, left: 95, top: 75, size: 1.5, type: 0, delay: 4.5 },
    { id: 10, left: 5, top: 50, size: 2, type: 1, delay: 5 },
    { id: 11, left: 35, top: 25, size: 2.5, type: 2, delay: 5.5 },
    { id: 12, left: 75, top: 10, size: 3, type: 0, delay: 6 },
    { id: 13, left: 50, top: 95, size: 2, type: 1, delay: 6.5 },
    { id: 14, left: 20, top: 80, size: 2.5, type: 2, delay: 7 },
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

  // Theme-aware base gradient
  const baseGradient = isDarkMode
    ? "from-slate-950 via-purple-950/30 to-slate-950"
    : "from-blue-50 via-purple-50/30 to-indigo-50";

  // Theme-aware radial gradients
  const radialTopLeft = isDarkMode
    ? "from-purple-900/40 via-transparent to-transparent"
    : "from-purple-400/30 via-transparent to-transparent";
  
  const radialBottomRight = isDarkMode
    ? "from-blue-900/40 via-transparent to-transparent"
    : "from-blue-400/30 via-transparent to-transparent";
  
  const radialCenter = isDarkMode
    ? "from-pink-900/20 via-transparent to-transparent"
    : "from-pink-400/20 via-transparent to-transparent";

  // Theme-aware vignette
  const vignetteColor = isDarkMode
    ? "rgba(0,0,0,0.5)"
    : "rgba(255,255,255,0.5)";

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Base Gradient */}
      <div className={`absolute inset-0 bg-gradient-to-br ${baseGradient}`} />
      
      {/* Animated Gradient Mesh */}
      <div className="absolute inset-0">
        <motion.div 
          className={`absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] ${radialTopLeft}`}
          animate={{ opacity: isDarkMode ? [0.2, 0.4, 0.2] : [0.1, 0.2, 0.1] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className={`absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] ${radialBottomRight}`}
          animate={{ opacity: isDarkMode ? [0.2, 0.4, 0.2] : [0.1, 0.2, 0.1] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
        <motion.div 
          className={`absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] ${radialCenter}`}
          animate={{ opacity: isDarkMode ? [0.1, 0.3, 0.1] : [0.05, 0.15, 0.05] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
      </div>

      {/* Floating Orbs with Trails */}
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

      {/* Animated constellation lines */}
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

      {/* Twinkling Stars */}
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

      {/* Floating particles with different shapes */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute pointer-events-none"
          style={{
            left: `${particle.left}%`,
            top: `${particle.top}%`,
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
            delay: particle.delay,
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

      {/* Energy Beams */}
      {[0, 1, 2, 3, 4].map((i) => (
        <motion.div
          key={`beam-${i}`}
          className={`absolute top-0 bottom-0 w-32 bg-gradient-to-r from-transparent ${
            isDarkMode ? 'via-purple-500/10' : 'via-purple-400/15'
          } to-transparent skew-x-12`}
          style={{ left: `${i * 25}%` }}
          animate={{
            x: ['-100%', '200%'],
            opacity: isDarkMode ? [0, 0.3, 0] : [0, 0.2, 0],
          }}
          transition={{
            duration: 4 + i,
            repeat: Infinity,
            delay: i * 2,
            ease: "linear"
          }}
        />
      ))}

      {/* Floating nebula clouds */}
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

      {/* Glowing dots grid */}
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

      {/* Floating Glowing Rings */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        {[1, 2, 3].map((i) => (
          <motion.div
            key={`ring-${i}`}
            className="absolute rounded-full"
            style={{
              width: 300 + i * 100,
              height: 300 + i * 100,
              border: `2px solid ${i === 1 
                ? (isDarkMode ? '#8b5cf6' : '#c084fc') 
                : i === 2 
                ? (isDarkMode ? '#3b82f6' : '#93c5fd') 
                : (isDarkMode ? '#ec4899' : '#f9a8d4')}`,
              opacity: isDarkMode ? 0.1 : 0.15,
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
            }}
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 360],
              opacity: isDarkMode ? [0.1, 0.2, 0.1] : [0.15, 0.25, 0.15],
            }}
            transition={{
              duration: 10 + i * 2,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </div>

      {/* Light Rays */}
      <div className="absolute inset-0">
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
          <motion.div
            key={`ray-${i}`}
            className={`absolute top-1/2 left-1/2 w-[200%] h-[2px] bg-gradient-to-r from-transparent ${
              isDarkMode ? 'via-purple-500/10' : 'via-purple-400/15'
            } to-transparent`}
            style={{
              transform: `translate(-50%, -50%) rotate(${angle}deg)`,
            }}
            animate={{
              opacity: isDarkMode ? [0.1, 0.2, 0.1] : [0.15, 0.25, 0.15],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: i * 0.2,
            }}
          />
        ))}
      </div>

      {/* Vignette Effect */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at center, transparent 30%, ${vignetteColor} 100%)`
        }}
      />

      {/* Subtle noise texture */}
      <div className="absolute inset-0 opacity-20 mix-blend-overlay" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.4'/%3E%3C/svg%3E")`,
        backgroundRepeat: 'repeat',
      }} />
    </div>
  );
};

// ==================== PRODUCT CARD - THEME AWARE - FIXED ====================
const ProductCard = ({ product, isActive, isDarkMode }) => {
  // Theme-aware card background
  const cardBg = isDarkMode 
    ? 'bg-slate-900/90' 
    : 'bg-white/90';
  
  const cardBorder = isDarkMode
    ? 'border-white/10'
    : 'border-gray-200';

  const innerBg = isDarkMode
    ? 'bg-slate-900/90'
    : 'bg-white/90';

  const textPrimary = isDarkMode ? 'text-white' : 'text-gray-900';
  const textSecondary = isDarkMode ? 'text-gray-300' : 'text-gray-600';
  const textTertiary = isDarkMode ? 'text-gray-400' : 'text-gray-500';

  return (
    <motion.div
      className={`w-[340px] ${cardBg} backdrop-blur-xl rounded-2xl overflow-hidden ${
        isActive 
          ? 'border-2 border-transparent bg-gradient-to-br from-purple-500/20 to-pink-500/20 shadow-2xl scale-100' 
          : `border ${cardBorder} scale-90 opacity-60`
      }`}
      animate={isActive ? {
        boxShadow: isDarkMode
          ? [
              '0 20px 40px rgba(139,92,246,0.3)',
              '0 30px 60px rgba(139,92,246,0.5)',
              '0 20px 40px rgba(139,92,246,0.3)',
            ]
          : [
              '0 20px 40px rgba(139,92,246,0.15)',
              '0 30px 60px rgba(139,92,246,0.25)',
              '0 20px 40px rgba(139,92,246,0.15)',
            ],
      } : {}}
      transition={{ duration: 2, repeat: isActive ? Infinity : 0 }}
    >
      {/* Animated Gradient Border for Active Card - FIXED */}
      {isActive && (
        <motion.div
          className="absolute inset-0 rounded-2xl"
          style={{
            backgroundImage: isDarkMode
              ? "linear-gradient(90deg, #9333EA, #3B82F6, #EC4899, #9333EA)"
              : "linear-gradient(90deg, #9333EA, #2563EB, #DB2777, #9333EA)",
            backgroundSize: "300% 100%",
          }}
          animate={{
            backgroundPosition: ["0% 0%", "100% 0%"],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      )}

      {/* Inner Content */}
      <div className={`relative p-6 ${innerBg} m-[1px] rounded-2xl`}>
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <motion.div
            className={`${product.color.bg} p-3 rounded-xl border-2 ${product.color.border}`}
            animate={isActive ? {
              rotate: [0, 5, -5, 0],
            } : {}}
            transition={{ duration: 4, repeat: isActive ? Infinity : 0 }}
          >
            <Icon name={product.icon} className={`${product.color.icon} text-2xl`} />
          </motion.div>

          <motion.div
            className={`px-3 py-1.5 rounded-full bg-gradient-to-r ${product.color.primary} text-white text-xs font-bold`}
            animate={isActive ? {
              scale: [1, 1.1, 1],
            } : {}}
            transition={{ duration: 2, repeat: isActive ? Infinity : 0 }}
          >
            {product.stats}
          </motion.div>
        </div>

        {/* Title */}
        <h3 className={`text-xl font-bold ${textPrimary} mb-2`}>{product.title}</h3>
        <p className={`text-sm ${textSecondary} mb-3`}>{product.shortDesc}</p>
        <p className={`text-xs ${textTertiary} mb-4`}>{product.description}</p>

        {/* Metrics */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          {product.metrics.map((metric, idx) => (
            <div key={idx} className={`text-center ${isDarkMode ? 'bg-white/5' : 'bg-purple-50'} rounded-lg p-2`}>
              <Icon name={metric.icon} className={`mx-auto mb-1 ${product.color.icon} text-base`} />
              <div className={`font-bold ${textPrimary} text-xs`}>{metric.value}</div>
              <div className={`${textTertiary} text-[8px]`}>{metric.label}</div>
            </div>
          ))}
        </div>

        {/* Features */}
        <div className="space-y-2 mb-4">
          {product.features.map((feature, idx) => (
            <div key={idx} className={`flex items-center gap-2 ${isDarkMode ? 'bg-white/5' : 'bg-purple-50'} rounded-lg p-2`}>
              <Icon name={feature.icon} className={`text-xs ${product.color.icon}`} />
              <span className={`text-xs ${textSecondary}`}>{feature.name}</span>
              {feature.highlight && isActive && (
                <motion.div
                  className="ml-auto w-1.5 h-1.5 rounded-full bg-purple-400"
                  animate={{ scale: [1, 1.5, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                />
              )}
            </div>
          ))}
        </div>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-1 mb-4">
          {product.technologies.map((tech, idx) => (
            <span
              key={idx}
              className={`text-[8px] px-2 py-1 rounded-full ${isDarkMode ? 'bg-white/5 text-gray-400 border-white/10' : 'bg-purple-50 text-gray-600 border-purple-100'} border`}
            >
              {tech}
            </span>
          ))}
        </div>

        {/* CTA Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`relative w-full px-4 py-3 rounded-xl bg-gradient-to-r ${product.color.secondary} text-white text-sm font-bold overflow-hidden group`}
        >
          <span className="relative z-10">Explore Product</span>
          <motion.div
            className="absolute inset-0 bg-white"
            initial={{ scale: 0, opacity: 0.3 }}
            whileHover={{ scale: 3, opacity: 0 }}
            transition={{ duration: 0.5 }}
          />
        </motion.button>
      </div>
    </motion.div>
  );
};

// ==================== CAROUSEL WITH SIDE BUTTONS - THEME AWARE ====================
const CarouselWithSideButtons = ({ products, currentIndex, onPrev, onNext, isDarkMode }) => {
  const containerRef = useRef(null);

  // Get visible cards (current, prev, next)
  const getVisibleCards = () => {
    const total = products.length;
    const prevIndex = (currentIndex - 1 + total) % total;
    const nextIndex = (currentIndex + 1) % total;
    
    return [
      { ...products[prevIndex], position: 'prev', index: prevIndex },
      { ...products[currentIndex], position: 'current', index: currentIndex },
      { ...products[nextIndex], position: 'next', index: nextIndex },
    ];
  };

  const visibleCards = getVisibleCards();

  // Theme-aware button backgrounds
  const buttonBg = isDarkMode
    ? 'bg-white/10 border-white/20'
    : 'bg-white/90 border-gray-200';

  return (
    <div ref={containerRef} className="relative w-full py-8">
      <div className="relative flex items-center justify-center">
        {/* Left Button */}
        <motion.button
          whileHover={{ scale: 1.1, x: -5 }}
          whileTap={{ scale: 0.9 }}
          onClick={onPrev}
          className="absolute left-0 z-20 group"
        >
          <div className={`absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full blur-xl opacity-50 group-hover:opacity-80 transition-opacity`} />
          <div className={`relative p-5 rounded-full ${buttonBg} backdrop-blur-md border-2 group-hover:border-purple-500/50 transition-all`}>
            <Icon name="FaArrowLeft" className={`${isDarkMode ? 'text-white' : 'text-gray-900'} text-2xl`} />
          </div>
        </motion.button>

        {/* Cards Container */}
        <div className="flex items-center justify-center gap-6">
          {visibleCards.map((card) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ 
                opacity: card.position === 'current' ? 1 : 0.6,
                scale: card.position === 'current' ? 1 : 0.85,
                x: card.position === 'prev' ? -20 : card.position === 'next' ? 20 : 0,
              }}
              transition={{ type: "spring", stiffness: 200, damping: 25 }}
              className="relative"
            >
              <ProductCard 
                product={card} 
                isActive={card.position === 'current'}
                isDarkMode={isDarkMode}
              />
            </motion.div>
          ))}
        </div>

        {/* Right Button */}
        <motion.button
          whileHover={{ scale: 1.1, x: 5 }}
          whileTap={{ scale: 0.9 }}
          onClick={onNext}
          className="absolute right-0 z-20 group"
        >
          <div className={`absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full blur-xl opacity-50 group-hover:opacity-80 transition-opacity`} />
          <div className={`relative p-5 rounded-full ${buttonBg} backdrop-blur-md border-2 group-hover:border-purple-500/50 transition-all`}>
            <Icon name="FaArrowRight" className={`${isDarkMode ? 'text-white' : 'text-gray-900'} text-2xl`} />
          </div>
        </motion.button>
      </div>

      {/* Progress Dots */}
      <div className="flex justify-center items-center gap-3 mt-8">
        {products.map((_, i) => (
          <motion.button
            key={i}
            onClick={() => {
              if (i > currentIndex) {
                for (let j = 0; j < i - currentIndex; j++) onNext();
              } else if (i < currentIndex) {
                for (let j = 0; j < currentIndex - i; j++) onPrev();
              }
            }}
            className="relative group"
            whileHover={{ scale: 1.2 }}
          >
            {/* Outer Ring Animation for Active Dot */}
            {i === currentIndex && (
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-purple-500"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 0, 0.5],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            )}
            
            {/* Dot */}
            <motion.div
              className={`rounded-full transition-all cursor-pointer ${
                i === currentIndex 
                  ? 'w-4 h-4 bg-gradient-to-r from-purple-500 to-pink-500' 
                  : `w-2 h-2 ${isDarkMode ? 'bg-white/30 group-hover:bg-white/50' : 'bg-gray-400 group-hover:bg-gray-600'}`
              }`}
              animate={i === currentIndex ? {
                scale: [1, 1.2, 1],
              } : {}}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.button>
        ))}
      </div>
    </div>
  );
};

// ==================== MAIN COMPONENT - THEME AWARE ====================
export default function OurProducts() {
  const containerRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [mounted, setMounted] = useState(false);
  
  const { isDarkMode } = useTheme();
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const smoothProgress = useSpring(scrollYProgress, { damping: 20, stiffness: 100 });
  const titleY = useTransform(smoothProgress, [0, 1], [0, -50]);

  useEffect(() => {
    setMounted(true);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % products.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + products.length) % products.length);
  };

  useEffect(() => {
    if (!mounted) return;
    const timer = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(timer);
  }, [mounted, currentIndex]);

  // Theme-aware classes
  const sectionBg = isDarkMode 
    ? 'bg-slate-950' 
    : 'bg-gradient-to-b from-purple-50 via-white to-indigo-50';
  
  const textSecondary = isDarkMode ? 'text-gray-300' : 'text-gray-600';
  
  const badgeBg = isDarkMode
    ? 'bg-white/10 border-white/20'
    : 'bg-purple-100 border-purple-200';

  const ctaBg = "bg-gradient-to-r from-purple-600 to-blue-600";

  if (!mounted) {
    return <div className={`min-h-screen ${sectionBg}`} />;
  }

  return (
    <section 
      ref={containerRef}
      className={`relative min-h-screen py-16 ${sectionBg} overflow-hidden transition-colors duration-500`}
    >
      <StunningBackground isDarkMode={isDarkMode} />

      {/* Main Content */}
      <div className="relative max-w-7xl mx-auto px-4 z-10">
        {/* Header */}
        <motion.div 
          style={{ y: titleY }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            className={`inline-flex items-center gap-2 ${badgeBg} backdrop-blur-md px-5 py-2.5 rounded-full border mb-6`}
          >
            <Icon name="FaCrown" className="text-purple-400 text-base" />
            <span className="text-sm font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Premium Product Showcase
            </span>
          </motion.div>

          <h2 className="text-5xl md:text-6xl font-bold mb-4">
            <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
              Discover Our
            </span>
            <br />
            <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
              Premium Products
            </span>
          </h2>

          <p className={`text-base ${textSecondary} max-w-2xl mx-auto`}>
            Explore our collection of innovative solutions designed to transform your business
          </p>
        </motion.div>

        {/* Carousel with Side Buttons */}
        <CarouselWithSideButtons 
          products={products}
          currentIndex={currentIndex}
          onPrev={prevSlide}
          onNext={nextSlide}
          isDarkMode={isDarkMode}
        />

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mt-16"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`relative inline-flex items-center gap-3 ${ctaBg} text-white px-10 py-4 rounded-full text-lg font-bold shadow-2xl group overflow-hidden`}
          >
            <motion.div
              className="absolute inset-0"
              style={{
                background: "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.3) 0%, transparent 50%)",
              }}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            
            <Icon name="FaRocket" className="text-lg relative z-10 group-hover:rotate-12 transition-transform" />
            <span className="relative z-10">View All Products</span>
            <Icon name="FaArrowRight" className="text-base relative z-10 group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}