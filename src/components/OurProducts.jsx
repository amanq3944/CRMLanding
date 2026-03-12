"use client";

import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";
import * as Icons from "react-icons/fa";
import { useRef, useState, useCallback, useEffect } from "react";

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

// ==================== STUNNING BACKGROUND ====================
const StunningBackground = () => {
  // Fixed positions for particles (no randomness for hydration)
  const particles = [
    { id: 1, left: "10%", top: "15%", size: 2, delay: 0 },
    { id: 2, left: "20%", top: "45%", size: 3, delay: 0.5 },
    { id: 3, left: "30%", top: "75%", size: 1.5, delay: 1 },
    { id: 4, left: "40%", top: "25%", size: 2.5, delay: 1.5 },
    { id: 5, left: "50%", top: "85%", size: 2, delay: 2 },
    { id: 6, left: "60%", top: "35%", size: 3, delay: 2.5 },
    { id: 7, left: "70%", top: "65%", size: 1.5, delay: 3 },
    { id: 8, left: "80%", top: "95%", size: 2, delay: 3.5 },
    { id: 9, left: "90%", top: "5%", size: 2.5, delay: 4 },
    { id: 10, left: "15%", top: "55%", size: 2, delay: 4.5 },
  ];

  // Fixed positions for orbs
  const orbs = [
    { id: 1, size: 400, left: "-100px", top: "-100px", color: "from-purple-600/20", delay: 0 },
    { id: 2, size: 500, left: "60%", top: "20%", color: "from-blue-600/20", delay: 2 },
    { id: 3, size: 350, left: "70%", top: "70%", color: "from-pink-600/20", delay: 4 },
    { id: 4, size: 450, left: "10%", top: "60%", color: "from-cyan-600/20", delay: 1 },
    { id: 5, size: 300, left: "80%", top: "10%", color: "from-amber-600/20", delay: 3 },
  ];

  // Fixed positions for stars
  const stars = Array.from({ length: 50 }).map((_, i) => ({
    id: i,
    left: `${(i * 7) % 100}%`,
    top: `${(i * 13) % 100}%`,
    size: (i % 3) + 1,
    delay: (i % 5) * 0.2,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Base Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-purple-950/30 to-slate-950" />
      
      {/* Animated Gradient Mesh */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-purple-900/40 via-transparent to-transparent animate-pulse" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-blue-900/40 via-transparent to-transparent animate-pulse delay-1000" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-pink-900/20 via-transparent to-transparent animate-pulse delay-2000" />
      </div>

      {/* Floating Orbs with Trails */}
      {orbs.map((orb) => (
        <motion.div
          key={orb.id}
          className={`absolute rounded-full bg-gradient-to-br ${orb.color} to-transparent blur-3xl`}
          style={{
            width: orb.size,
            height: orb.size,
            left: orb.left,
            top: orb.top,
          }}
          animate={{
            x: [0, 50, -30, 0],
            y: [0, -30, 50, 0],
            scale: [1, 1.2, 0.9, 1],
            opacity: [0.3, 0.5, 0.3, 0.4],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            delay: orb.delay,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Glowing Particles */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            width: particle.size,
            height: particle.size,
            left: particle.left,
            top: particle.top,
            background: `radial-gradient(circle, ${
              particle.id % 3 === 0 ? '#9333EA' : particle.id % 3 === 1 ? '#3B82F6' : '#EC4899'
            }, transparent)`,
            boxShadow: `0 0 ${
              particle.size * 4
            }px ${
              particle.id % 3 === 0 ? '#9333EA' : particle.id % 3 === 1 ? '#3B82F6' : '#EC4899'
            }`,
          }}
          animate={{
            y: [0, -20, 0, 20, 0],
            x: [0, 10, 0, -10, 0],
            scale: [1, 1.3, 1, 0.8, 1],
            opacity: [0.4, 0.8, 0.4, 0.6, 0.4],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            delay: particle.delay,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Twinkling Stars */}
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute rounded-full bg-white"
          style={{
            width: star.size,
            height: star.size,
            left: star.left,
            top: star.top,
          }}
          animate={{
            opacity: [0.2, 0.8, 0.2],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: star.delay,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Animated Grid Lines */}
      <svg className="absolute inset-0 w-full h-full opacity-20">
        <defs>
          <pattern id="grid" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="url(#grid-gradient)" strokeWidth="0.5" />
          </pattern>
          <linearGradient id="grid-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#9333EA">
              <animate 
                attributeName="stop-color" 
                values="#9333EA; #3B82F6; #EC4899; #9333EA" 
                dur="8s" 
                repeatCount="indefinite" 
              />
            </stop>
            <stop offset="50%" stopColor="#3B82F6">
              <animate 
                attributeName="stop-color" 
                values="#3B82F6; #EC4899; #9333EA; #3B82F6" 
                dur="8s" 
                repeatCount="indefinite" 
              />
            </stop>
            <stop offset="100%" stopColor="#EC4899">
              <animate 
                attributeName="stop-color" 
                values="#EC4899; #9333EA; #3B82F6; #EC4899" 
                dur="8s" 
                repeatCount="indefinite" 
              />
            </stop>
          </linearGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>

      {/* Energy Waves at Bottom */}
      <svg className="absolute bottom-0 left-0 w-full opacity-30">
        {[1, 2, 3].map((i) => (
          <motion.path
            key={i}
            d={`M0,${100 - i * 20} Q200,${50 - i * 10} 400,${100 - i * 20} T800,${100 - i * 20} T1200,${100 - i * 20}`}
            stroke={`url(#wave-gradient-${i})`}
            strokeWidth="2"
            fill="none"
            animate={{
              d: [
                `M0,${100 - i * 20} Q200,${50 - i * 10} 400,${100 - i * 20} T800,${100 - i * 20} T1200,${100 - i * 20}`,
                `M0,${120 - i * 20} Q200,${70 - i * 10} 400,${120 - i * 20} T800,${120 - i * 20} T1200,${120 - i * 20}`,
                `M0,${80 - i * 20} Q200,${30 - i * 10} 400,${80 - i * 20} T800,${80 - i * 20} T1200,${80 - i * 20}`,
              ],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.5,
            }}
          />
        ))}
        <defs>
          {[1, 2, 3].map((i) => (
            <linearGradient key={i} id={`wave-gradient-${i}`} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#9333EA" />
              <stop offset="50%" stopColor="#3B82F6" />
              <stop offset="100%" stopColor="#EC4899" />
            </linearGradient>
          ))}
        </defs>
      </svg>

      {/* Floating Glowing Rings */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        {[1, 2, 3].map((i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: 300 + i * 100,
              height: 300 + i * 100,
              border: `2px solid ${i === 1 ? '#9333EA' : i === 2 ? '#3B82F6' : '#EC4899'}`,
              opacity: 0.1,
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
            }}
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 360],
              opacity: [0.1, 0.2, 0.1],
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
            key={i}
            className="absolute top-1/2 left-1/2 w-[200%] h-[2px] bg-gradient-to-r from-transparent via-purple-500/10 to-transparent"
            style={{
              transform: `translate(-50%, -50%) rotate(${angle}deg)`,
            }}
            animate={{
              opacity: [0.1, 0.3, 0.1],
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
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_30%,_rgba(0,0,0,0.5)_100%)] pointer-events-none" />
    </div>
  );
};

// ==================== PRODUCT CARD ====================
const ProductCard = ({ product, isActive }) => {
  return (
    <motion.div
      className={`w-[340px] bg-slate-900/90 backdrop-blur-xl rounded-2xl overflow-hidden ${
        isActive 
          ? 'border-2 border-transparent bg-gradient-to-br from-purple-500/20 to-pink-500/20 shadow-2xl scale-100' 
          : 'border border-white/10 scale-90 opacity-60'
      }`}
      animate={isActive ? {
        boxShadow: [
          '0 20px 40px rgba(139,92,246,0.3)',
          '0 30px 60px rgba(139,92,246,0.5)',
          '0 20px 40px rgba(139,92,246,0.3)',
        ],
      } : {}}
      transition={{ duration: 2, repeat: isActive ? Infinity : 0 }}
    >
      {/* Animated Gradient Border for Active Card */}
      {isActive && (
        <motion.div
          className="absolute inset-0 rounded-2xl"
          style={{
            background: "linear-gradient(90deg, #9333EA, #3B82F6, #EC4899, #9333EA)",
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
      <div className="relative p-6 bg-slate-900/90 m-[1px] rounded-2xl">
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
        <h3 className="text-xl font-bold text-white mb-2">{product.title}</h3>
        <p className="text-sm text-gray-300 mb-3">{product.shortDesc}</p>
        <p className="text-xs text-gray-400 mb-4">{product.description}</p>

        {/* Metrics */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          {product.metrics.map((metric, idx) => (
            <div key={idx} className="text-center bg-white/5 rounded-lg p-2">
              <Icon name={metric.icon} className={`mx-auto mb-1 ${product.color.icon} text-base`} />
              <div className="font-bold text-white text-xs">{metric.value}</div>
              <div className="text-gray-400 text-[8px]">{metric.label}</div>
            </div>
          ))}
        </div>

        {/* Features */}
        <div className="space-y-2 mb-4">
          {product.features.map((feature, idx) => (
            <div key={idx} className="flex items-center gap-2 bg-white/5 rounded-lg p-2">
              <Icon name={feature.icon} className={`text-xs ${product.color.icon}`} />
              <span className="text-xs text-gray-300">{feature.name}</span>
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
              className="text-[8px] px-2 py-1 rounded-full bg-white/5 text-gray-400 border border-white/10"
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

// ==================== CAROUSEL WITH SIDE BUTTONS ====================
const CarouselWithSideButtons = ({ products, currentIndex, onPrev, onNext }) => {
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

  return (
    <div ref={containerRef} className="relative w-full py-8">
      <div className="relative flex items-center justify-center">
        {/* Left Button - Positioned absolutely on left side */}
        <motion.button
          whileHover={{ scale: 1.1, x: -5 }}
          whileTap={{ scale: 0.9 }}
          onClick={onPrev}
          className="absolute left-0 z-20 group"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full blur-xl opacity-50 group-hover:opacity-80 transition-opacity" />
          <div className="relative p-5 rounded-full bg-white/10 backdrop-blur-md border-2 border-white/20 group-hover:border-purple-500/50 transition-all">
            <Icon name="FaArrowLeft" className="text-white text-2xl" />
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
              />
            </motion.div>
          ))}
        </div>

        {/* Right Button - Positioned absolutely on right side */}
        <motion.button
          whileHover={{ scale: 1.1, x: 5 }}
          whileTap={{ scale: 0.9 }}
          onClick={onNext}
          className="absolute right-0 z-20 group"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full blur-xl opacity-50 group-hover:opacity-80 transition-opacity" />
          <div className="relative p-5 rounded-full bg-white/10 backdrop-blur-md border-2 border-white/20 group-hover:border-purple-500/50 transition-all">
            <Icon name="FaArrowRight" className="text-white text-2xl" />
          </div>
        </motion.button>
      </div>

      {/* Progress Dots - Below the cards */}
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
                  : 'w-2 h-2 bg-white/30 group-hover:bg-white/50'
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

// ==================== MAIN COMPONENT ====================
export default function OurProducts() {
  const containerRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [mounted, setMounted] = useState(false);
  
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

  if (!mounted) {
    return <div className="min-h-screen bg-slate-950" />;
  }

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen py-16 bg-slate-950 overflow-hidden"
    >
      <StunningBackground />

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
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-5 py-2.5 rounded-full border border-white/20 mb-6"
          >
            <Icon name="FaCrown" className="text-purple-400 text-base" />
            <span className="text-sm font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Premium Product Showcase
            </span>
          </motion.div>

          <h2 className="text-5xl md:text-6xl font-bold text-white mb-4">
            <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
              Discover Our
            </span>
            <br />
            <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
              Premium Products
            </span>
          </h2>

          <p className="text-base text-gray-300 max-w-2xl mx-auto">
            Explore our collection of innovative solutions designed to transform your business
          </p>
        </motion.div>

        {/* Carousel with Side Buttons */}
        <CarouselWithSideButtons 
          products={products}
          currentIndex={currentIndex}
          onPrev={prevSlide}
          onNext={nextSlide}
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
            className="relative inline-flex items-center gap-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-10 py-4 rounded-full text-lg font-bold shadow-2xl group overflow-hidden"
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