"use client";

import Image from "next/image";
import { motion, useScroll, useTransform, useSpring, useMotionValue, useAnimationFrame } from "framer-motion";
import { 
  FaUsers, 
  FaSearch,
  FaChartLine,
  FaClock,
  FaBrain,
  FaShieldAlt,
  FaCrown,
  FaStar,
  FaArrowRight,
  FaCode,
  FaCloud,
  FaDatabase,
  FaLock,
  FaBolt
} from "react-icons/fa";
import { useRef, useEffect, useState, useCallback } from "react";

const featuresList = [
  {
    icon: FaChartLine,
    title: "Advanced Analytics Tools",
    desc: "Deep insights with predictive modeling",
    color: "from-purple-500 to-pink-500",
    glow: "rgba(168, 85, 247, 0.5)"
  },
  {
    icon: FaClock,
    title: "Real-time Data",
    desc: "Instant updates and live tracking",
    color: "from-blue-500 to-cyan-500",
    glow: "rgba(59, 130, 246, 0.5)"
  },
  {
    icon: FaBrain,
    title: "Accurate Predictions",
    desc: "AI-powered forecasting",
    color: "from-amber-500 to-orange-500",
    glow: "rgba(245, 158, 11, 0.5)"
  }
];

const stats = [
  { value: "10K+", label: "Active Users", icon: FaUsers },
  { value: "99.9%", label: "Uptime", icon: FaShieldAlt },
  { value: "4.9/5", label: "User Rating", icon: FaStar },
];

const floatingIcons = [
  { Icon: FaCode, color: "text-purple-400", size: 24, delay: 0 },
  { Icon: FaCloud, color: "text-blue-400", size: 32, delay: 1 },
  { Icon: FaDatabase, color: "text-green-400", size: 28, delay: 2 },
  { Icon: FaLock, color: "text-red-400", size: 20, delay: 3 },
  { Icon: FaBolt, color: "text-yellow-400", size: 26, delay: 4 },
];

const particleCount = 50;

export default function FeaturesSection() {
  const containerRef = useRef(null);
  const [isClient, setIsClient] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hoveredFeature, setHoveredFeature] = useState(null);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Smooth spring animations
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Transform values with spring
  const y1 = useTransform(smoothProgress, [0, 1], [0, -100]);
  const y2 = useTransform(smoothProgress, [0, 1], [0, 100]);
  const rotate = useTransform(smoothProgress, [0, 1], [0, 30]);
  const scale = useTransform(smoothProgress, [0, 0.5, 1], [0.8, 1.2, 0.8]);
  const opacity = useTransform(smoothProgress, [0, 0.3, 0.7, 1], [0.3, 0.8, 0.8, 0.3]);
  const blur = useTransform(smoothProgress, [0, 0.5, 1], [0, 10, 0]);

  // Mouse parallax
  const handleMouseMove = useCallback((e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePosition({ x, y });
    mouseX.set(x);
    mouseY.set(y);
  }, [mouseX, mouseY]);

  useEffect(() => {
    setIsClient(true);
    
    const handleResize = () => {
      // Handle resize if needed
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Particle system
  const particles = useRef([]);
  if (isClient) {
    for (let i = 0; i < particleCount; i++) {
      particles.current[i] = {
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 1,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
        opacity: Math.random() * 0.5 + 0.2,
      };
    }
  }

  useAnimationFrame(() => {
    particles.current.forEach((particle) => {
      particle.x += particle.speedX;
      particle.y += particle.speedY;
      
      if (particle.x < 0 || particle.x > 100) particle.speedX *= -1;
      if (particle.y < 0 || particle.y > 100) particle.speedY *= -1;
    });
  });

  return (
    <section 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative py-32 bg-[#030312] overflow-hidden"
    >
      {/* Ultra Premium Dark Background */}
      <div className="absolute inset-0 overflow-hidden">
        
        {/* Deep Space Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#030312] via-[#0a0a2a] to-[#030312]" />
        
        {/* Animated Nebula Clouds with Parallax */}
        <motion.div 
          style={{ 
            y: y1,
            x: mousePosition.x * 50,
          }}
          className="absolute -top-40 -right-40 w-[800px] h-[800px] bg-gradient-to-br from-purple-600/20 via-pink-600/20 to-blue-600/20 rounded-full blur-3xl animate-pulse"
        />
        <motion.div 
          style={{ 
            y: y2,
            x: mousePosition.x * -50,
          }}
          className="absolute -bottom-40 -left-40 w-[800px] h-[800px] bg-gradient-to-tr from-blue-600/20 via-cyan-600/20 to-purple-600/20 rounded-full blur-3xl animate-pulse"
        />
        
        {/* Central Energy Core */}
        <motion.div 
          style={{ scale, opacity }}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px]"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 via-blue-600/10 to-purple-600/10 rounded-full blur-3xl animate-spin-slow" />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-400/5 to-transparent rounded-full blur-2xl animate-ping" />
        </motion.div>

        {/* Floating Geometric Shapes with Mouse Follow - FIXED: Combined styles */}
        {[...Array(6)].map((_, i) => {
          const shapeStyle = {
            top: `${20 + i * 15}%`,
            left: `${10 + i * 10}%`,
            x: mousePosition.x * 30 * (i + 1),
            y: mousePosition.y * 30 * (i + 1),
            rotate: useTransform(smoothProgress, [0, 1], [0, 45 * (i + 1)]),
          };
          
          return (
            <motion.div
              key={i}
              style={shapeStyle}
              className={`absolute w-64 h-64 border border-purple-500/10 ${
                i % 2 === 0 ? 'rounded-lg' : 'rounded-full'
              }`}
            />
          );
        })}

        {/* Advanced Grid Pattern with Animation */}
        <motion.div 
          animate={isClient ? {
            backgroundPosition: ['0% 0%', '100% 100%'],
          } : {}}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.2'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundRepeat: 'repeat',
            backgroundSize: '60px 60px'
          }}
        />

        {/* Dynamic Particle Field */}
        {isClient && particles.current.map((particle, i) => (
          <motion.div
            key={i}
            className="absolute bg-white rounded-full"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: particle.size,
              height: particle.size,
              opacity: particle.opacity,
              boxShadow: `0 0 ${particle.size * 2}px rgba(255,255,255,0.5)`,
            }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [particle.opacity, particle.opacity * 2, particle.opacity],
            }}
            transition={{
              duration: 2 + i,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* Floating Icons */}
        {floatingIcons.map((item, index) => (
          <motion.div
            key={index}
            className={`absolute ${item.color}`}
            style={{
              left: `${20 + index * 15}%`,
              top: `${30 + index * 10}%`,
            }}
            animate={isClient ? {
              y: [0, -30, 0],
              x: [0, 20, 0],
              rotate: [0, 360],
              scale: [1, 1.2, 1],
            } : {}}
            transition={{
              duration: 5 + index,
              repeat: Infinity,
              ease: "easeInOut",
              delay: item.delay,
            }}
          >
            <item.Icon size={item.size} />
          </motion.div>
        ))}

        {/* Energy Beams */}
        <motion.div
          animate={isClient ? {
            rotate: [0, 360],
          } : {}}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] border-2 border-purple-500/5 rounded-full"
        />
        
        <motion.div
          animate={isClient ? {
            rotate: [360, 0],
          } : {}}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] border border-blue-500/10 rounded-full"
        />

        {/* Light Streaks with Mouse Follow */}
        <motion.div
          style={{
            x: mousePosition.x * 100,
            y: mousePosition.y * 100,
          }}
          animate={isClient ? {
            x: ['-100%', '200%'],
          } : {}}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute top-1/3 left-0 w-60 h-60 bg-gradient-to-r from-transparent via-purple-400/20 to-transparent rotate-45 blur-3xl"
        />
        
        <motion.div
          style={{
            x: mousePosition.x * -100,
            y: mousePosition.y * -100,
          }}
          animate={isClient ? {
            x: ['200%', '-100%'],
          } : {}}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute bottom-1/3 right-0 w-60 h-60 bg-gradient-to-r from-transparent via-blue-400/20 to-transparent -rotate-45 blur-3xl"
        />

        {/* Vignette Effect with Pulse */}
        <motion.div 
          animate={isClient ? {
            opacity: [0.6, 0.8, 0.6],
          } : {}}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute inset-0 bg-gradient-to-t from-[#030312] via-transparent to-[#030312]"
        />
        <motion.div 
          animate={isClient ? {
            opacity: [0.6, 0.8, 0.6],
          } : {}}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1.5
          }}
          className="absolute inset-0 bg-gradient-to-r from-[#030312] via-transparent to-[#030312]"
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 1,
            type: "spring",
            stiffness: 100
          }}
          className="text-center mb-20"
        >
          {/* Premium Animated Badge */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            whileInView={{ scale: 1, rotate: 0 }}
            transition={{ 
              type: "spring",
              stiffness: 200,
              damping: 20
            }}
            whileHover={{ scale: 1.1 }}
            className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-600/20 via-blue-600/20 to-purple-600/20 backdrop-blur-xl px-6 py-3 rounded-full border border-purple-400/30 mb-8 shadow-[0_0_30px_rgba(168,85,247,0.3)]"
          >
            <motion.div
              animate={isClient ? {
                rotate: [0, 360],
              } : {}}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear"
              }}
            >
              <FaCrown className="text-purple-400 text-lg" />
            </motion.div>
            <span className="text-sm font-semibold bg-gradient-to-r from-purple-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
              Next-Generation Features
            </span>
            <motion.div
              animate={isClient ? {
                scale: [1, 1.2, 1],
              } : {}}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <FaStar className="text-yellow-400 text-lg" />
            </motion.div>
          </motion.div>

          <motion.h2 
            style={{ filter: `blur(${blur}px)` }}
            className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6"
          >
            Everything You Expect and
            <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent block mt-2">
              More Features Beyond
            </span>
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-xl text-gray-300 max-w-3xl mx-auto"
          >
            GoSaas delivers all the key features, offering a versatile
            platform to streamline your business operations with cutting-edge technology.
          </motion.p>

          {/* Quick Stats with Hover Effects */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex justify-center gap-6 mt-10 flex-wrap"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                whileHover={{ 
                  scale: 1.15,
                  y: -10,
                  boxShadow: "0 20px 40px rgba(168,85,247,0.3)"
                }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-3 bg-white/5 backdrop-blur-xl px-5 py-3 rounded-full border border-white/10 cursor-pointer"
              >
                <motion.div
                  animate={isClient ? {
                    rotate: [0, 360],
                  } : {}}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "linear",
                    delay: index * 0.5
                  }}
                >
                  <stat.icon className="text-purple-400 text-sm" />
                </motion.div>
                <span className="font-bold text-white">{stat.value}</span>
                <span className="text-gray-400 text-sm">{stat.label}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Main Grid */}
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left Image Section with Advanced Animations */}
          <motion.div
            initial={{ opacity: 0, x: -80, rotateY: 30 }}
            whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
            transition={{ 
              duration: 1.2,
              type: "spring",
              stiffness: 80
            }}
            style={{
              rotateY: useTransform(smoothProgress, [0, 1], [30, 0]),
              perspective: 1000
            }}
            className="relative flex justify-center"
          >
            {/* Image Container with 3D Effect */}
            <motion.div 
              className="relative"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {/* Animated Glow Rings */}
              <motion.div
                animate={isClient ? {
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.6, 0.3],
                } : {}}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl blur-3xl"
              />
              
              <motion.div
                animate={isClient ? {
                  rotate: [0, 360],
                } : {}}
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  ease: "linear"
                }}
                className="absolute -inset-1 bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 rounded-2xl blur opacity-50"
              />
              
              <div className="relative overflow-hidden rounded-2xl shadow-2xl border border-white/10">
                <Image
                  src="/images/dashboard.png"
                  width={600}
                  height={500}
                  alt="dashboard"
                  className="w-full h-auto object-cover"
                />
                
                {/* Scanning Line Effect */}
                <motion.div
                  animate={isClient ? {
                    y: ['-100%', '200%'],
                  } : {}}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                  className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-400/20 to-transparent"
                />
                
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-tr from-purple-600/30 via-transparent to-blue-600/30" />
                
                {/* Pixel Grid Overlay */}
                <div 
                  className="absolute inset-0 opacity-20"
                  style={{
                    backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                                    linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                    backgroundSize: '20px 20px'
                  }}
                />
              </div>
            </motion.div>

            {/* Floating Badges with Enhanced Animations */}
            <motion.div
              style={{
                y: useTransform(smoothProgress, [0, 1], [0, -30]),
                x: mousePosition.x * 20,
              }}
              animate={isClient ? { 
                y: [0, -20, 0],
                rotate: [0, 5, -5, 0],
              } : {}}
              transition={{ 
                duration: 4, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute top-6 right-6 md:top-10 md:right-10 bg-white/10 backdrop-blur-xl text-white px-5 py-3 rounded-full flex items-center gap-2 text-sm shadow-2xl border border-white/20 z-10"
            >
              <motion.div
                animate={isClient ? {
                  scale: [1, 1.2, 1],
                } : {}}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <FaUsers className="text-purple-400" />
              </motion.div>
              <span className="font-semibold">10K+ Active Users</span>
            </motion.div>

            <motion.div
              style={{
                y: useTransform(smoothProgress, [0, 1], [0, 30]),
                x: mousePosition.x * -20,
              }}
              animate={isClient ? { 
                y: [0, 20, 0],
                rotate: [0, -5, 5, 0],
              } : {}}
              transition={{ 
                duration: 4, 
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5
              }}
              className="absolute bottom-6 left-6 md:bottom-10 md:left-10 bg-white/10 backdrop-blur-xl text-white px-5 py-3 rounded-full flex items-center gap-2 text-sm shadow-2xl border border-white/20 z-10"
            >
              <motion.div
                animate={isClient ? {
                  rotate: [0, 360],
                } : {}}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear"
                }}
              >
                <FaSearch className="text-blue-400" />
              </motion.div>
              <span className="font-semibold">Advanced Search</span>
            </motion.div>

            {/* Additional Floating Elements */}
            {[1, 2, 3].map((i) => (
              <motion.div
                key={i}
                style={{
                  x: mousePosition.x * 30 * i,
                  y: mousePosition.y * 30 * i,
                  left: `${-i * 4}%`,
                  top: `${i * 20}%`,
                }}
                animate={isClient ? { 
                  scale: [1, 1.3, 1],
                  opacity: [0.3, 0.7, 0.3]
                } : {}}
                transition={{ 
                  duration: 3 + i, 
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.3
                }}
                className="absolute w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full blur-xl opacity-30"
              />
            ))}
          </motion.div>

          {/* Right Content Section with Advanced Animations */}
          <motion.div
            initial={{ opacity: 0, x: 80, rotateY: -30 }}
            whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
            transition={{ 
              duration: 1.2,
              type: "spring",
              stiffness: 80
            }}
            style={{
              rotateY: useTransform(smoothProgress, [0, 1], [-30, 0]),
              perspective: 1000
            }}
            className="space-y-8"
          >
            {/* Animated Title */}
            <motion.h3 
              className="text-4xl md:text-5xl font-bold text-white leading-tight"
              animate={isClient ? {
                textShadow: [
                  "0 0 20px rgba(168,85,247,0)",
                  "0 0 30px rgba(168,85,247,0.5)",
                  "0 0 20px rgba(168,85,247,0)",
                ]
              } : {}}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              Gain precise insights
              <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent block">
                for your business
              </span>
            </motion.h3>

            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-gray-300 text-lg leading-relaxed"
            >
              Our fast response system helps you tackle tasks efficiently,
              enabling you to focus on what truly matters and achieve
              your goals with ease using advanced AI-powered tools.
            </motion.p>

            {/* Enhanced Features List with 3D Hover */}
            <div className="mt-8 space-y-6">
              {featuresList.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.15 }}
                  onHoverStart={() => setHoveredFeature(index)}
                  onHoverEnd={() => setHoveredFeature(null)}
                  style={{
                    rotateX: hoveredFeature === index ? 5 : 0,
                    rotateY: hoveredFeature === index ? 5 : 0,
                    scale: hoveredFeature === index ? 1.05 : 1,
                  }}
                  whileHover={{ 
                    x: 15,
                    transition: { type: "spring", stiffness: 400 }
                  }}
                  className="flex items-start gap-4 group cursor-pointer"
                >
                  <motion.div 
                    animate={hoveredFeature === index ? {
                      scale: [1, 1.2, 1],
                      rotate: [0, 360],
                    } : {}}
                    transition={{ duration: 0.5 }}
                    className={`flex-shrink-0 w-12 h-12 bg-gradient-to-br ${feature.color} rounded-lg flex items-center justify-center shadow-lg group-hover:shadow-xl relative overflow-hidden`}
                  >
                    {/* Icon Glow Effect */}
                    <motion.div
                      animate={isClient ? {
                        boxShadow: [
                          `0 0 20px ${feature.glow}`,
                          `0 0 40px ${feature.glow}`,
                          `0 0 20px ${feature.glow}`,
                        ]
                      } : {}}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: index * 0.3
                      }}
                      className="absolute inset-0"
                    />
                    <feature.icon className="text-white text-xl relative z-10" />
                  </motion.div>
                  <div>
                    <motion.h4 
                      className="text-white font-semibold text-lg"
                      animate={hoveredFeature === index ? {
                        color: "#c084fc",
                      } : {}}
                    >
                      {feature.title}
                    </motion.h4>
                    <p className="text-gray-400 text-sm">{feature.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Advanced CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="pt-8"
            >
              <motion.button
                whileHover={{ 
                  scale: 1.1,
                  boxShadow: "0 30px 60px rgba(168,85,247,0.4)"
                }}
                whileTap={{ scale: 0.95 }}
                animate={isClient ? {
                  boxShadow: [
                    "0 10px 30px rgba(168,85,247,0.3)",
                    "0 20px 50px rgba(59,130,246,0.4)",
                    "0 10px 30px rgba(168,85,247,0.3)",
                  ]
                } : {}}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-10 py-5 rounded-full font-semibold overflow-hidden"
              >
                <motion.span 
                  animate={isClient ? {
                    x: ['-100%', '200%'],
                  } : {}}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"
                />
                <span className="relative z-10">Explore All Features</span>
                <motion.div
                  animate={isClient ? {
                    x: [0, 5, 0],
                  } : {}}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="relative z-10"
                >
                  <FaArrowRight />
                </motion.div>
              </motion.button>
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom Decorative Elements */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-4xl h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent"
        />
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
      `}</style>
    </section>
  );
}