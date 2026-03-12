"use client";

import Image from "next/image";
import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion";
import { 
  FaRocket, 
  FaUsers, 
  FaChartLine, 
  FaShieldAlt, 
  FaCrown,
  FaArrowRight,
  FaStar,
  FaCheckCircle,
  FaInfinity,
  FaBrain,
  FaGem,
  FaBolt,
  FaCloud,
  FaMoon,
  FaComet,
  FaMeteor,
  FaGalacticRepublic
} from "react-icons/fa";
import { useRef, useEffect, useState, useCallback } from "react";

const stats = [
  { value: "98", label: "Customer Satisfaction", icon: FaStar, suffix: "%" },
  { value: "25", label: "Active Businesses", icon: FaUsers, suffix: "K+" },
  { value: "3.5", label: "Data Points", icon: FaChartLine, suffix: "B+" },
];

const features = [
  {
    icon: FaRocket,
    title: "Lightning Fast",
    description: "10x faster performance",
    color: "from-purple-500 to-pink-500",
    iconColor: "text-purple-400",
    glowColor: "shadow-purple-500/50"
  },
  {
    icon: FaShieldAlt,
    title: "Enterprise Security",
    description: "Bank-level encryption",
    color: "from-blue-500 to-cyan-500",
    iconColor: "text-blue-400",
    glowColor: "shadow-blue-500/50"
  },
  {
    icon: FaCrown,
    title: "Premium Support",
    description: "24/7 dedicated assistance",
    color: "from-amber-500 to-orange-500",
    iconColor: "text-amber-400",
    glowColor: "shadow-amber-500/50"
  },
  {
    icon: FaBrain,
    title: "AI-Powered",
    description: "Smart predictions",
    color: "from-emerald-500 to-teal-500",
    iconColor: "text-emerald-400",
    glowColor: "shadow-emerald-500/50"
  },
  {
    icon: FaBolt,
    title: "Real-time Sync",
    description: "Instant updates",
    color: "from-yellow-500 to-amber-500",
    iconColor: "text-yellow-400",
    glowColor: "shadow-yellow-500/50"
  },
  {
    icon: FaCloud,
    title: "Cloud Native",
    description: "99.99% uptime",
    color: "from-sky-500 to-indigo-500",
    iconColor: "text-sky-400",
    glowColor: "shadow-sky-500/50"
  }
];

const achievements = [
  { year: "2024", event: "Global Innovation Award", icon: FaGem },
  { year: "2023", event: "Best CRM Platform", icon: FaCrown },
  { year: "2022", event: "Fastest Growing", icon: FaRocket },
];

// Counter component for animated numbers
const Counter = ({ value, suffix = "" }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      const duration = 2000;
      const steps = 60;
      const stepValue = parseFloat(value) / steps;
      let current = 0;
      
      const timer = setInterval(() => {
        current += stepValue;
        if (current >= parseFloat(value)) {
          setCount(parseFloat(value));
          clearInterval(timer);
        } else {
          setCount(current);
        }
      }, duration / steps);

      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  return (
    <span ref={ref}>
      {count.toFixed(1).replace(/\.0$/, '')}{suffix}
    </span>
  );
};

export default function About() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const [isClient, setIsClient] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hoveredFeature, setHoveredFeature] = useState(null);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const isInView = useInView(containerRef, { once: false, amount: 0.2 });

  // Smooth scroll transforms
  const smoothProgress = useSpring(scrollYProgress, { damping: 30, stiffness: 200 });
  
  const y1 = useTransform(smoothProgress, [0, 1], [0, -200]);
  const y2 = useTransform(smoothProgress, [0, 1], [0, 200]);
  const y3 = useTransform(smoothProgress, [0, 1], [0, -150]);
  const rotate = useTransform(smoothProgress, [0, 1], [0, 30]);
  const scale = useTransform(smoothProgress, [0, 0.5, 1], [0.8, 1.2, 0.8]);
  const opacity = useTransform(smoothProgress, [0, 0.3, 0.7, 1], [0.1, 1, 1, 0.1]);

  useEffect(() => {
    setIsClient(true);
    
    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };
    
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  // Advanced dark-themed particle system
  useEffect(() => {
    if (!isClient || !canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    
    canvas.width = dimensions.width || window.innerWidth;
    canvas.height = dimensions.height || window.innerHeight;
    
    // Particle system for dark theme
    const particles = [];
    const particleCount = 200;
    
    // Colors for dark theme (more subtle, glowing)
    const colors = [
      'rgba(139, 92, 246, ', // purple
      'rgba(59, 130, 246, ', // blue
      'rgba(168, 85, 247, ', // violet
      'rgba(6, 182, 212, ',  // cyan
      'rgba(236, 72, 153, ', // pink
    ];
    
    // Create particles
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2.5 + 0.5,
        speedX: (Math.random() - 0.5) * 0.3,
        speedY: (Math.random() - 0.5) * 0.3,
        color: colors[Math.floor(Math.random() * colors.length)],
        opacity: Math.random() * 0.4 + 0.1,
        pulseSpeed: Math.random() * 0.02 + 0.005,
        pulsePhase: Math.random() * Math.PI * 2,
        connections: []
      });
    }
    
    // Draw function for dark theme
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Dark gradient background
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, '#030014');
      gradient.addColorStop(0.5, '#0A0320');
      gradient.addColorStop(1, '#030014');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Draw subtle connections between nearby particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            
            // Create gradient for connection line
            const gradient = ctx.createLinearGradient(
              particles[i].x, particles[i].y,
              particles[j].x, particles[j].y
            );
            gradient.addColorStop(0, `rgba(139, 92, 246, ${0.05 * (1 - distance / 120)})`);
            gradient.addColorStop(1, `rgba(59, 130, 246, ${0.05 * (1 - distance / 120)})`);
            
            ctx.strokeStyle = gradient;
            ctx.lineWidth = 0.3;
            ctx.stroke();
          }
        }
      }
      
      // Update and draw particles
      particles.forEach(p => {
        // Mouse repulsion effect
        if (mousePosition.x && mousePosition.y) {
          const dx = mousePosition.x * canvas.width - p.x;
          const dy = mousePosition.y * canvas.height - p.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 150) {
            const force = (150 - distance) / 150 * 0.02;
            p.x -= dx * force;
            p.y -= dy * force;
          }
        }
        
        // Normal movement
        p.x += p.speedX;
        p.y += p.speedY;
        
        // Wrap around edges
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
        
        // Pulsing opacity
        const pulseOpacity = p.opacity + Math.sin(Date.now() * p.pulseSpeed + p.pulsePhase) * 0.1;
        
        // Draw particle with glow
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        
        // Main particle
        ctx.fillStyle = p.color + pulseOpacity + ')';
        ctx.fill();
        
        // Outer glow
        ctx.shadowColor = p.color.replace('rgba', 'rgb') + ')';
        ctx.shadowBlur = 10;
        ctx.fill();
        ctx.shadowBlur = 0;
      });
      
      animationFrameId = requestAnimationFrame(draw);
    };
    
    draw();
    
    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isClient, dimensions, mousePosition]);

  const handleMouseMove = useCallback((e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setMousePosition({ x, y });
  }, []);

  // Rotate testimonials
  useEffect(() => {
    if (!isClient) return;
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isClient]);

  const testimonials = [
    {
      text: "This platform transformed our business completely.",
      author: "Sarah Johnson",
      role: "CEO, TechCorp",
      rating: 5
    },
    {
      text: "The best investment we've made this year.",
      author: "Michael Chen",
      role: "CTO, InnovateLabs",
      rating: 5
    },
    {
      text: "Incredible ROI and support team.",
      author: "Emily Rodriguez",
      role: "Founder, StartUpX",
      rating: 5
    }
  ];

  return (
    <section 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative py-20 md:py-32 bg-[#030014] overflow-hidden"
    >
      {/* Canvas for dark particle effects */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ opacity: 0.8 }}
      />

      {/* Dark Themed Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        
        {/* Deep Space Nebula - Dark Purple */}
        <motion.div 
          style={{ y: y1, scale, opacity }}
          className="absolute -top-40 -right-40 w-[800px] h-[800px]"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-fuchsia-900/10 to-pink-900/20 rounded-full blur-3xl" />
          <div className="absolute inset-0 bg-gradient-to-tl from-blue-900/20 via-indigo-900/10 to-purple-900/20 rounded-full blur-3xl animation-delay-2000" />
        </motion.div>
        
        {/* Dark Blue Nebula */}
        <motion.div 
          style={{ y: y2 }}
          className="absolute -bottom-40 -left-40 w-[800px] h-[800px] bg-gradient-to-tr from-blue-900/20 via-indigo-900/10 to-purple-900/20 rounded-full blur-3xl animation-delay-1000"
        />
        
        {/* Center Galaxy - Dark Theme */}
        <motion.div
          style={{ rotate, scale: useTransform(smoothProgress, [0, 0.5, 1], [0.8, 1.2, 0.8]) }}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px]"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-purple-900/10 via-transparent to-transparent rounded-full blur-3xl" />
          <div className="absolute inset-0 bg-[conic-gradient(from_0deg,_#581c8720,_#1e3a8a20,_#83184320,_#581c8720)] rounded-full blur-3xl animate-spin-slow" />
        </motion.div>
        
        {/* Dark Grid with Glow */}
        <svg className="absolute inset-0 w-full h-full opacity-20" style={{ perspective: "1000px" }}>
          <defs>
            <pattern id="darkGrid" patternUnits="userSpaceOnUse" width="80" height="80">
              <path d="M 80 0 L 0 0 0 80" fill="none" stroke="url(#darkGridGradient)" strokeWidth="0.3" />
              <circle cx="40" cy="40" r="1" fill="url(#darkGridGradient)" />
            </pattern>
            <linearGradient id="darkGridGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#9333EA" stopOpacity="0.3">
                <animate attributeName="stop-opacity" values="0.3;0.6;0.3" dur="5s" repeatCount="indefinite" />
              </stop>
              <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.3">
                <animate attributeName="stop-opacity" values="0.3;0.6;0.3" dur="5s" repeatCount="indefinite" />
              </stop>
            </linearGradient>
          </defs>
          <motion.g
            animate={{ 
              rotateX: [0, 5, 0],
              rotateY: [0, 5, 0],
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            <rect x="0" y="0" width="100%" height="100%" fill="url(#darkGrid)" />
          </motion.g>
        </svg>

        {/* Distant Stars - Subtle */}
        {isClient && [...Array(150)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 2}px`,
              height: `${Math.random() * 2}px`,
              background: `rgba(255, 255, 255, ${Math.random() * 0.3})`,
              boxShadow: `0 0 ${Math.random() * 4}px rgba(255, 255, 255, 0.2)`,
            }}
            animate={{
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}

        {/* Floating Dark Geometric Shapes */}
        <motion.div
          style={{ 
            rotate: useTransform(smoothProgress, [0, 1], [0, 360]),
            x: useTransform(smoothProgress, [0, 1], [0, 100]),
            y: useTransform(smoothProgress, [0, 1], [0, -100])
          }}
          className="absolute top-20 left-20 w-40 h-40 border border-purple-500/10 rounded-3xl"
        />
        
        <motion.div
          style={{ 
            rotate: useTransform(smoothProgress, [0, 1], [360, 0]),
            x: useTransform(smoothProgress, [0, 1], [0, -100]),
            y: useTransform(smoothProgress, [0, 1], [0, 100])
          }}
          className="absolute bottom-20 right-20 w-56 h-56 border border-blue-500/10 rounded-full"
        />
        
        <motion.div
          style={{ 
            scale: useTransform(smoothProgress, [0, 0.5, 1], [1, 1.5, 1]),
          }}
          className="absolute top-1/3 right-1/4 w-32 h-32 border border-pink-500/10 transform rotate-45"
        />

        {/* Dark Energy Waves */}
        <svg className="absolute inset-0 w-full h-full opacity-10">
          <defs>
            <linearGradient id="darkWave" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#9333EA" stopOpacity="0.1">
                <animate attributeName="stop-opacity" values="0.1;0.2;0.1" dur="4s" repeatCount="indefinite" />
              </stop>
              <stop offset="50%" stopColor="#3B82F6" stopOpacity="0.1">
                <animate attributeName="stop-opacity" values="0.1;0.2;0.1" dur="4s" repeatCount="indefinite" />
              </stop>
              <stop offset="100%" stopColor="#9333EA" stopOpacity="0.1">
                <animate attributeName="stop-opacity" values="0.1;0.2;0.1" dur="4s" repeatCount="indefinite" />
              </stop>
            </linearGradient>
          </defs>
          <motion.path
            d="M0,300 Q150,250 300,300 T600,300 T900,300 T1200,300 T1500,300"
            stroke="url(#darkWave)"
            strokeWidth="1"
            fill="none"
            animate={{ 
              d: [
                "M0,300 Q150,250 300,300 T600,300 T900,300 T1200,300 T1500,300",
                "M0,300 Q150,350 300,300 T600,300 T900,300 T1200,300 T1500,300",
                "M0,300 Q150,250 300,300 T600,300 T900,300 T1200,300 T1500,300"
              ]
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />
        </svg>

        {/* Dark Orbs */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={`dark-orb-${i}`}
            className="absolute w-96 h-96 rounded-full"
            style={{
              left: `${i * 20}%`,
              top: `${(i * 15) % 100}%`,
              background: `radial-gradient(circle at 30% 30%, ${i % 2 === 0 ? '#581c8720' : '#1e3a8a20'}, transparent 70%)`,
              filter: 'blur(60px)',
            }}
            animate={{
              x: [0, 50, 0],
              y: [0, -50, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 15 + i * 2,
              repeat: Infinity,
              delay: i * 2,
            }}
          />
        ))}
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        {/* Header Badge - Dark Theme */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="inline-flex items-center gap-2 md:gap-3 bg-white/5 backdrop-blur-md px-4 md:px-6 py-2 md:py-3 rounded-full border border-purple-500/20 shadow-[0_0_30px_rgba(139,92,246,0.15)]"
          >
            <FaStar className="text-purple-400 animate-pulse text-sm md:text-base" />
            <span className="text-xs md:text-sm font-semibold bg-gradient-to-r from-purple-400 via-blue-400 to-pink-400 bg-clip-text text-transparent">
              Welcome to the Future of CRM
            </span>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            >
              <FaInfinity className="text-blue-400 text-xs" />
            </motion.div>
          </motion.div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 xl:gap-24 items-center">
          {/* Image Section - Dark Theme */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] }}
            className="relative"
            style={{
              transform: `perspective(1000px) rotateY(${mousePosition.x * 10}deg) rotateX(${mousePosition.y * -10}deg)`,
            }}
          >
            <div className="relative z-10">
              {/* Dark glow rings */}
              <motion.div
                animate={{ 
                  scale: [1, 1.1, 1],
                  opacity: [0.2, 0.3, 0.2],
                }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute inset-0 bg-gradient-to-r from-purple-600/20 via-blue-600/20 to-pink-600/20 rounded-3xl blur-3xl"
              />
              
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="relative overflow-hidden rounded-3xl shadow-2xl group"
              >
                {/* Dark overlays */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-blue-600/20 mix-blend-overlay z-10" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_transparent_30%,_rgba(0,0,0,0.5)_100%)] z-10" />
                
                <div className="relative aspect-[4/5] w-full">
                  <Image
                    src="/images/about.jpg"
                    alt="About our platform"
                    fill
                    className="object-cover transform group-hover:scale-110 transition-transform duration-1000"
                  />
                </div>
                
                {/* Light sweep effect */}
                <motion.div
                  animate={{ 
                    left: ['-100%', '200%'],
                  }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 z-20 w-full h-full bg-gradient-to-r from-transparent via-white/5 to-transparent"
                />
                
                {/* Dark 3D borders */}
                <div className="absolute inset-0 border border-white/5 rounded-3xl z-30" />
                <div className="absolute inset-0 border border-purple-500/10 rounded-3xl transform translate-x-1 translate-y-1 z-30" />
                <div className="absolute inset-0 border border-blue-500/10 rounded-3xl transform -translate-x-1 -translate-y-1 z-30" />
                
                {/* Corner accents */}
                <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-purple-500/30 rounded-tl-3xl z-30" />
                <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-blue-500/30 rounded-tr-3xl z-30" />
                <div className="absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 border-pink-500/30 rounded-bl-3xl z-30" />
                <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-indigo-500/30 rounded-br-3xl z-30" />
              </motion.div>
            </div>

            {/* Floating Cards - Dark Theme */}
            <motion.div
              animate={isClient ? { 
                y: [0, -15, 0],
                rotate: [0, 3, 0],
              } : {}}
              transition={{ 
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute -bottom-8 -left-4 md:-left-8 bg-black/40 backdrop-blur-xl shadow-2xl rounded-xl md:rounded-2xl p-4 md:p-6 z-20 border border-purple-500/20 hover:shadow-[0_0_30px_rgba(139,92,246,0.3)] transition-all duration-300"
              whileHover={{ scale: 1.1 }}
            >
              <div className="flex items-center gap-3 md:gap-4">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg md:rounded-xl flex items-center justify-center shadow-lg"
                >
                  <FaCheckCircle className="text-white text-base md:text-xl" />
                </motion.div>
                <div>
                  <motion.p 
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="text-xl md:text-2xl font-bold text-white"
                  >
                    98%
                  </motion.p>
                  <p className="text-xs md:text-sm text-gray-300">Satisfaction Rate</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              animate={isClient ? { 
                y: [0, 15, 0],
                rotate: [0, -3, 0],
              } : {}}
              transition={{ 
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1
              }}
              className="absolute -top-8 -right-4 md:-right-8 bg-black/40 backdrop-blur-xl shadow-2xl rounded-xl md:rounded-2xl p-4 md:p-6 z-20 border border-blue-500/20 hover:shadow-[0_0_30px_rgba(59,130,246,0.3)] transition-all duration-300"
              whileHover={{ scale: 1.1 }}
            >
              <div className="flex items-center gap-2 md:gap-3">
                <motion.div 
                  className="flex -space-x-2 md:-space-x-3"
                  animate={{ x: [0, 3, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  {[1,2,3].map((i) => (
                    <motion.div
                      key={i}
                      whileHover={{ scale: 1.2, zIndex: 10 }}
                      className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 border-2 border-white/20 shadow-lg"
                    />
                  ))}
                </motion.div>
                <div>
                  <p className="text-xs md:text-sm font-semibold text-blue-300">Active Users</p>
                  <p className="text-lg md:text-xl font-bold text-white">10.5K</p>
                </div>
              </div>
            </motion.div>

            {/* Achievement Timeline - Dark */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5 }}
              className="absolute -bottom-4 right-0 md:bottom-0 bg-black/40 backdrop-blur-xl rounded-lg md:rounded-xl p-2 md:p-3 z-20 border border-pink-500/20"
            >
              <div className="flex gap-2 md:gap-3">
                {achievements.map((item, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ y: -5 }}
                    className="text-center"
                  >
                    <div className="text-[10px] md:text-xs font-bold text-purple-300">{item.year}</div>
                    <item.icon className="text-blue-300 mx-auto my-1 text-xs md:text-sm" />
                    <div className="text-[8px] md:text-[10px] text-pink-300 hidden md:block">{item.event}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Content Section - Dark Theme */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6 md:space-y-8"
          >
            {/* Title with Dark Theme */}
            <div className="space-y-3 md:space-y-4">
              <motion.h2 
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight"
              >
                <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.3 }}
                  className="block text-white"
                >
                  Redefining
                </motion.span>
                <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.5 }}
                  className="bg-gradient-to-r from-purple-400 via-blue-400 to-pink-400 bg-clip-text text-transparent block"
                  style={{
                    textShadow: '0 0 30px rgba(139,92,246,0.3)'
                  }}
                >
                  What's Possible
                </motion.span>
              </motion.h2>

              {/* Description */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ delay: 0.7 }}
                className="prose prose-sm md:prose-lg relative"
              >
                <motion.div
                  animate={{ 
                    boxShadow: [
                      "0 0 0 0 rgba(139, 92, 246, 0)",
                      "0 0 20px 5px rgba(139, 92, 246, 0.2)",
                      "0 0 0 0 rgba(139, 92, 246, 0)",
                    ]
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute -left-4 top-0 w-1 h-full bg-gradient-to-b from-purple-400 to-blue-400 rounded-full hidden md:block"
                />
                <p className="text-sm md:text-base text-gray-300 leading-relaxed pl-0 md:pl-6">
                  Our next-generation CRM platform combines 
                  <motion.span
                    animate={{ 
                      color: ["#C084FC", "#60A5FA", "#F472B6", "#C084FC"],
                      textShadow: [
                        "0 0 10px #C084FC",
                        "0 0 10px #60A5FA",
                        "0 0 10px #F472B6",
                        "0 0 10px #C084FC"
                      ]
                    }}
                    transition={{ duration: 4, repeat: Infinity }}
                    className="font-semibold"
                  > cutting-edge AI </motion.span>
                  with 
                  <motion.span
                    animate={{ 
                      color: ["#60A5FA", "#F472B6", "#C084FC", "#60A5FA"],
                      textShadow: [
                        "0 0 10px #60A5FA",
                        "0 0 10px #F472B6",
                        "0 0 10px #C084FC",
                        "0 0 10px #60A5FA"
                      ]
                    }}
                    transition={{ duration: 4, repeat: Infinity, delay: 1 }}
                    className="font-semibold"
                  > intuitive design </motion.span>
                  to create an experience that transforms businesses.
                </p>
              </motion.div>
            </div>

            {/* Feature Grid - Dark */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-4 mt-4 md:mt-8">
              {features.slice(0, 6).map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.8 + index * 0.1 }}
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: "0 20px 30px -10px rgba(139,92,246,0.3)"
                  }}
                  onHoverStart={() => setHoveredFeature(index)}
                  onHoverEnd={() => setHoveredFeature(null)}
                  className="relative bg-white/5 backdrop-blur-md p-3 md:p-5 rounded-lg md:rounded-xl border border-white/5 hover:border-purple-500/30 transition-all duration-300 overflow-hidden group cursor-pointer"
                >
                  {/* Animated background on hover */}
                  <motion.div
                    animate={hoveredFeature === index ? { 
                      scale: 2,
                      opacity: 0.1
                    } : { scale: 1, opacity: 0 }}
                    className={`absolute inset-0 bg-gradient-to-r ${feature.color}`}
                  />
                  
                  <feature.icon className={`${feature.iconColor} text-lg md:text-2xl mb-1 md:mb-2 relative z-10 group-hover:scale-110 transition-transform`} />
                  <h3 className="font-semibold text-white text-xs md:text-sm relative z-10">{feature.title}</h3>
                  <p className="text-[10px] md:text-xs text-gray-400 mt-0.5 md:mt-1 relative z-10 hidden md:block">{feature.description}</p>
                  
                  {/* Pulse effect */}
                  <motion.div
                    animate={{ scale: [1, 1.5, 1], opacity: [0.2, 0, 0.2] }}
                    transition={{ duration: 2, repeat: Infinity, delay: index * 0.5 }}
                    className="absolute -bottom-2 -right-2 w-6 h-6 md:w-8 md:h-8 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-full blur-md"
                  />
                </motion.div>
              ))}
            </div>

            {/* Stats - Dark */}
            <div className="grid grid-cols-3 gap-4 md:gap-6 py-4 md:py-8 border-y border-white/5">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 1 + index * 0.1, type: "spring", stiffness: 100 }}
                  whileHover={{ y: -5 }}
                  className="text-center relative"
                >
                  <stat.icon className="mx-auto text-gray-500 mb-1 md:mb-2 text-lg md:text-xl group-hover:text-purple-400 transition-colors" />
                  <motion.div 
                    className="text-lg md:text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                  >
                    {isClient ? <Counter value={stat.value} suffix={stat.suffix} /> : stat.value + stat.suffix}
                  </motion.div>
                  <div className="text-[10px] md:text-xs text-gray-400 mt-0.5 md:mt-1">{stat.label}</div>
                </motion.div>
              ))}
            </div>

            {/* Testimonial Carousel - Dark */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 1.2 }}
              className="relative"
            >
              <div className="relative h-24 md:h-28 overflow-hidden">
                {testimonials.map((testimonial, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 100 }}
                    animate={activeTestimonial === i ? { opacity: 1, x: 0 } : { opacity: 0, x: -100 }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0 bg-white/5 backdrop-blur-md p-3 md:p-4 rounded-lg md:rounded-xl border border-white/5"
                  >
                    <div className="flex gap-0.5 md:gap-1 mb-1 md:mb-2">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <FaStar key={i} className="text-yellow-500/70 text-xs" />
                      ))}
                    </div>
                    <p className="text-xs md:text-sm text-gray-300 mb-1 md:mb-2 line-clamp-2">"{testimonial.text}"</p>
                    <p className="text-[10px] md:text-xs font-semibold text-white">{testimonial.author}</p>
                    <p className="text-[8px] md:text-[10px] text-gray-400">{testimonial.role}</p>
                  </motion.div>
                ))}
              </div>
              
              {/* Dots indicator */}
              <div className="flex justify-center gap-1 mt-2">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveTestimonial(i)}
                    className={`w-1.5 h-1.5 md:w-2 md:h-2 rounded-full transition-all ${
                      activeTestimonial === i 
                        ? 'bg-gradient-to-r from-purple-400 to-blue-400 w-4 md:w-6 shadow-[0_0_10px_rgba(139,92,246,0.3)]' 
                        : 'bg-gray-600'
                    }`}
                  />
                ))}
              </div>
            </motion.div>

            {/* CTA Button - Dark */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 1.4 }}
              className="pt-2 md:pt-4"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group relative inline-flex items-center gap-2 md:gap-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 md:px-8 lg:px-10 py-3 md:py-4 lg:py-5 rounded-full font-semibold overflow-hidden shadow-[0_0_30px_rgba(139,92,246,0.3)] hover:shadow-[0_0_50px_rgba(139,92,246,0.5)] transition-shadow text-sm md:text-base"
              >
                {/* Animated background */}
                <motion.div
                  animate={{ 
                    background: [
                      "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.2) 50%, transparent 100%)",
                      "linear-gradient(90deg, transparent 100%, rgba(255,255,255,0.2) 150%, transparent 200%)",
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0"
                />
                
                <span className="relative z-10">Start Your Journey</span>
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="relative z-10"
                >
                  <FaArrowRight className="text-sm md:text-base" />
                </motion.div>
                
                {/* Particle effects */}
                {isClient && [...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{ 
                      y: [-20, -60],
                      x: [0, (i - 2) * 10],
                      opacity: [1, 0],
                      scale: [0, 1, 0]
                    }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
                    className="absolute w-0.5 h-0.5 md:w-1 md:h-1 bg-white rounded-full"
                  />
                ))}
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <style jsx>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-1000 {
          animation-delay: 1s;
        }
        
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </section>
  );
}