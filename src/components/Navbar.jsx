"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { 
  FiMenu, FiX, FiArrowRight, FiStar, FiZap, 
  FiGlobe, FiCpu, FiShield, FiTrendingUp, FiChevronDown,
  FiPieChart, FiUsers, FiMail,
} from "react-icons/fi";
import { 
  IoMdRocket, IoMdAnalytics
} from "react-icons/io";
import { 
  BsGem, BsLightningCharge, BsGraphUp, BsPeople, 
  BsClockHistory,
} from "react-icons/bs";
import { 
  HiOutlineSparkles, HiOutlineCube, 
  HiOutlineChartBar, HiOutlineUsers, HiOutlineDocumentText,
} from "react-icons/hi";
import { FaRobot, FaMagic, FaCrown, FaRegGem, FaBolt, FaUserTie, FaRocket } from "react-icons/fa";
import { GiCrystalShine } from "react-icons/gi";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isMounted, setIsMounted] = useState(false);
  
  const navbarRef = useRef(null);
  const dropdownTimeoutRef = useRef(null);
  
  const { scrollY } = useScroll();
  
  // Transform values for navbar size decrease from all sides
  const navbarHeight = useTransform(scrollY, [0, 100], [100, 70]);
  const navbarWidth = useTransform(scrollY, [0, 100], ["100%", "calc(100% - 40px)"]);
  const navbarTop = useTransform(scrollY, [0, 100], [0, 10]);
  const navbarLeft = useTransform(scrollY, [0, 100], [0, 20]);
  const navbarRight = useTransform(scrollY, [0, 100], [0, 20]);
  
  const navbarPadding = useTransform(scrollY, [0, 100], [24, 16]);
  const logoScale = useTransform(scrollY, [0, 100], [1, 0.9]);
  const buttonScale = useTransform(scrollY, [0, 100], [1, 0.95]);
  const headerBlur = useTransform(scrollY, [0, 100], [0, 20]);
  const headerOpacity = useTransform(scrollY, [0, 50], [0.95, 1]);
  
  // Border transforms
  const borderScaleX = useTransform(scrollY, [0, 50], [0, 1]);
  const borderOpacity = useTransform(scrollY, [0, 50], [0, 1]);
  
  // Border radius transform
  const navbarRadius = useTransform(scrollY, [0, 100], [0, 24]);
  
  // Mount effect
  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  // Mouse move effect
  useEffect(() => {
    if (!isMounted) return;
    
    const handleMouseMove = (e) => {
      if (navbarRef.current) {
        const rect = navbarRef.current.getBoundingClientRect();
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top
        });
      }
    };
    
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isMounted]);

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on escape
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        setMenuOpen(false);
      }
    };
    
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [menuOpen]);

  // Dropdown management with delay for better UX
  const handleDropdownHover = (index) => {
    if (window.innerWidth >= 768) {
      if (dropdownTimeoutRef.current) {
        clearTimeout(dropdownTimeoutRef.current);
      }
      setActiveDropdown(index);
    }
  };

  const handleDropdownLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 150);
  };

  const handleDropdownEnter = (index) => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }
    setActiveDropdown(index);
  };

  // Close mobile menu when window resizes to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && menuOpen) {
        setMenuOpen(false);
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [menuOpen]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (dropdownTimeoutRef.current) {
        clearTimeout(dropdownTimeoutRef.current);
      }
    };
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  // Nav items data
  const navItems = [
    { 
      name: "Home", 
      icon: <FiStar />, 
      gradient: "from-amber-400 to-orange-400",
      href: "#",
      dropdown: [
        { title: "Dashboard", icon: <FiPieChart />, desc: "Overview & analytics", badge: "Live", href: "#" },
        { title: "Activity", icon: <BsClockHistory />, desc: "Recent updates", badge: "3 new", href: "#" },
        { title: "Insights", icon: <HiOutlineChartBar />, desc: "Deep analytics", badge: "Pro", href: "#" },
      ]
    },
    { 
      name: "Features", 
      icon: <FiZap />, 
      gradient: "from-blue-400 to-cyan-400",
      href: "#",
      dropdown: [
        { title: "AI Analytics", icon: <FaRobot />, desc: "Predictive insights", badge: "New", href: "#" },
        { title: "Smart Automation", icon: <FaBolt />, desc: "Workflow optimization", badge: "Beta", href: "#" },
        { title: "Real-time Reports", icon: <BsGraphUp />, desc: "Live data visualization", badge: "Pro", href: "#" },
        { title: "Team Collaboration", icon: <BsPeople />, desc: "Work together", badge: "", href: "#" },
      ]
    },
    { 
      name: "Solutions", 
      icon: <FiGlobe />, 
      gradient: "from-emerald-400 to-teal-400",
      href: "#",
      dropdown: [
        { title: "Enterprise", icon: <FaCrown />, desc: "For large organizations", badge: "Premium", href: "#" },
        { title: "Startups", icon: <IoMdRocket />, desc: "Scale your business", badge: "Popular", href: "#" },
        { title: "Agencies", icon: <HiOutlineUsers />, desc: "Client management", badge: "", href: "#" },
        { title: "Freelancers", icon: <FaUserTie />, desc: "Individual professionals", badge: "Free", href: "#" },
      ]
    },
    { 
      name: "Products", 
      icon: <FiCpu />, 
      gradient: "from-purple-400 to-pink-400",
      href: "#",
      dropdown: [
        { title: "CRM Pro", icon: <BsGem />, desc: "Advanced customer management", badge: "v2.0", href: "#" },
        { title: "Analytics Suite", icon: <IoMdAnalytics />, desc: "Comprehensive data tools", badge: "New", href: "#" },
        { title: "Marketing Hub", icon: <FiTrendingUp />, desc: "Campaign automation", badge: "Hot", href: "#" },
        { title: "Security Shield", icon: <FiShield />, desc: "Enterprise protection", badge: "", href: "#" },
      ]
    },
    { 
      name: "Resources", 
      icon: <HiOutlineCube />, 
      gradient: "from-indigo-400 to-purple-400",
      href: "#",
      dropdown: [
        { title: "Documentation", icon: <HiOutlineDocumentText />, desc: "Guides & API reference", badge: "", href: "#" },
        { title: "Blog", icon: <HiOutlineSparkles />, desc: "Latest updates", badge: "3 new", href: "#" },
        { title: "Community", icon: <BsPeople />, desc: "Join discussions", badge: "Active", href: "#" },
        { title: "Support", icon: <FiMail />, desc: "24/7 assistance", badge: "Live", href: "#" },
      ]
    },
  ];

  // Static particles
  const floatingParticles = [
    { id: 1, x: 10, y: 20, delay: 0.15, duration: 4, size: 1 },
    { id: 2, x: 30, y: 50, delay: 0.3, duration: 5, size: 2 },
    { id: 3, x: 50, y: 30, delay: 0.45, duration: 6, size: 1 },
    { id: 4, x: 70, y: 70, delay: 0.6, duration: 4, size: 3 },
    { id: 5, x: 85, y: 40, delay: 0.75, duration: 5, size: 2 },
    { id: 6, x: 25, y: 80, delay: 0.9, duration: 6, size: 1 },
    { id: 7, x: 45, y: 15, delay: 1.05, duration: 4, size: 2 },
    { id: 8, x: 65, y: 60, delay: 1.2, duration: 5, size: 1 },
    { id: 9, x: 80, y: 85, delay: 1.35, duration: 6, size: 2 },
    { id: 10, x: 15, y: 45, delay: 1.5, duration: 4, size: 3 },
    { id: 11, x: 55, y: 25, delay: 1.65, duration: 5, size: 1 },
    { id: 12, x: 75, y: 55, delay: 1.8, duration: 6, size: 2 },
  ];

  // Server-side fallback
  if (!isMounted) {
    return (
      <header className="w-full fixed top-0 left-0 z-50 bg-gradient-to-r from-[#0a061f] via-[#1a1446] to-[#0f0a2a] h-[100px]">
        <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-purple-500/20 rounded-full"></div>
            <div className="h-8 w-20 bg-purple-500/20 rounded"></div>
          </div>
        </div>
      </header>
    );
  }

  return (
    <>
      <motion.header
        ref={navbarRef}
        style={{ 
          height: navbarHeight,
          width: navbarWidth,
          top: navbarTop,
          left: navbarLeft,
          right: navbarRight,
          borderRadius: navbarRadius,
          marginLeft: "auto",
          marginRight: "auto",
        }}
        className="w-full fixed z-50 transition-shadow duration-300 shadow-2xl shadow-purple-900/20"
      >
        {/* Background with blur and opacity */}
        <motion.div 
          className="absolute inset-0 rounded-[inherit]"
          style={{
            background: "linear-gradient(to right, #0a061f, #1a1446, #0f0a2a)",
            opacity: headerOpacity,
            backdropFilter: `blur(${headerBlur}px)`,
          }}
        />

        {/* Animated background overlay */}
        <motion.div 
          className="absolute inset-0 opacity-40 rounded-[inherit]"
          animate={{
            background: [
              "radial-gradient(circle at 0% 50%, rgba(139,92,246,0.2) 0%, transparent 50%)",
              "radial-gradient(circle at 100% 50%, rgba(236,72,153,0.2) 0%, transparent 50%)",
              "radial-gradient(circle at 50% 0%, rgba(139,92,246,0.2) 0%, transparent 50%)",
              "radial-gradient(circle at 0% 50%, rgba(139,92,246,0.2) 0%, transparent 50%)",
            ]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        />

        {/* Grid overlay */}
        <div className="absolute inset-0 opacity-10 rounded-[inherit]" 
          style={{
            backgroundImage: `
              linear-gradient(rgba(139, 92, 246, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(139, 92, 246, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}
        />

        {/* Floating particles */}
        {floatingParticles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full bg-purple-400/30 blur-sm"
            style={{ 
              width: particle.size, 
              height: particle.size,
              left: `${particle.x}%`, 
              top: `${particle.y}%` 
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.1, 0.3, 0.1],
              scale: [1, 1.2, 1]
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay,
              ease: "easeInOut"
            }}
          />
        ))}

        {/* Mouse glow effect */}
        {isMounted && (
          <motion.div
            className="absolute inset-0 pointer-events-none rounded-[inherit]"
            animate={{
              background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(168,85,247,0.2) 0%, transparent 60%)`
            }}
            transition={{ type: "spring", stiffness: 50, damping: 20 }}
          />
        )}

        {/* Animated border */}
        <motion.div 
          className="absolute bottom-0 left-0 right-0 h-[2px]"
          style={{
            background: "linear-gradient(90deg, transparent, rgba(168,85,247,0.8), rgba(236,72,153,0.8), rgba(139,92,246,0.8), transparent)",
            scaleX: borderScaleX,
            opacity: borderOpacity
          }}
        />

        <motion.div 
          className="h-full flex items-center justify-between relative z-10"
          style={{ paddingLeft: navbarPadding, paddingRight: navbarPadding }}
        >
          {/* Logo with scale animation */}
          <motion.div
            style={{ scale: logoScale }}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
            className="flex items-center gap-3 group cursor-pointer"
            whileHover={{ scale: 1.05 }}
          >
            <div className="relative">
              {/* Rotating rings */}
              <motion.div 
                className="absolute inset-[-8px] rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              >
                <div className="absolute inset-0 rounded-full border-2 border-purple-500/30 border-t-purple-500 border-r-transparent border-b-transparent border-l-transparent"></div>
              </motion.div>
              
              <motion.div 
                className="absolute inset-[-4px] rounded-full"
                animate={{ rotate: -360 }}
                transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
              >
                <div className="absolute inset-0 rounded-full border border-pink-500/30 border-b-pink-500 border-l-transparent border-t-transparent border-r-transparent"></div>
              </motion.div>
              
              {/* Pulsing background */}
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full blur-xl opacity-50"
                animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.7, 0.3] }}
                transition={{ duration: 3, repeat: Infinity }}
              />
              
              {/* Main icon */}
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              >
                <GiCrystalShine className="relative text-5xl text-purple-300 filter drop-shadow-2xl" />
              </motion.div>
              
              {/* Sparkles */}
              <motion.div
                className="absolute -top-2 -right-2"
                animate={{ scale: [1, 1.3, 1], rotate: [0, 180, 360], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <FaMagic className="text-yellow-300 text-sm" />
              </motion.div>
              
              <motion.div
                className="absolute -bottom-1 -left-1"
                animate={{ scale: [1, 1.2, 1], rotate: [0, -180, -360] }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                <HiOutlineSparkles className="text-blue-300 text-xs" />
              </motion.div>
            </div>

            {/* Text */}
            <div className="relative">
              <motion.h1 
                className="text-5xl font-black tracking-tight"
                animate={{ 
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                  textShadow: [
                    "0 0 20px rgba(168,85,247,0.5)",
                    "0 0 40px rgba(236,72,153,0.5)",
                    "0 0 20px rgba(168,85,247,0.5)"
                  ]
                }}
                transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                style={{
                  backgroundImage: "linear-gradient(90deg, #fff, #c084fc, #f9a8d4, #818cf8, #fff)",
                  backgroundSize: "300% 100%",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent"
                }}
              >
                CRM
              </motion.h1>
              
              {/* Underline */}
              <motion.div 
                className="absolute -bottom-2 left-0 right-0 h-[3px] bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 rounded-full"
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              />
            </div>

            {/* Badge */}
            <motion.div 
              className="hidden sm:flex items-center gap-2 ml-2 px-4 py-1.5 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full border border-purple-400/30 backdrop-blur-sm"
              whileHover={{ scale: 1.1, rotate: [0, -2, 2, 0] }}
              animate={{ boxShadow: ["0 0 0px rgba(168,85,247,0.3)", "0 0 20px rgba(168,85,247,0.6)", "0 0 0px rgba(168,85,247,0.3)"] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <FaRegGem className="text-purple-300 animate-pulse" />
              <span className="text-xs font-bold text-purple-200">ELITE</span>
              <motion.span 
                className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-purple-400 to-pink-400"
                animate={{ scale: [1, 1.5, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
              <motion.span 
                className="absolute -top-1 -right-1 w-2 h-2 bg-green-400 rounded-full"
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              />
            </motion.div>
          </motion.div>

          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item, i) => (
              <div
                key={item.name}
                className="relative"
                onMouseEnter={() => handleDropdownHover(i)}
                onMouseLeave={handleDropdownLeave}
              >
                <motion.button
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 + 0.3, type: "spring" }}
                  className="relative px-4 py-2 flex items-center gap-2 text-gray-200 hover:text-white font-medium transition-colors overflow-hidden group"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.span
                    animate={hoveredItem === i ? { rotate: [0, 15, -15, 0], scale: [1, 1.2, 1] } : {}}
                    transition={{ duration: 0.5 }}
                    className={`text-lg bg-gradient-to-r ${item.gradient} bg-clip-text text-transparent`}
                  >
                    {item.icon}
                  </motion.span>
                  
                  <span>{item.name}</span>
                  
                  <motion.div
                    animate={{ rotate: activeDropdown === i ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <FiChevronDown className="text-sm opacity-60" />
                  </motion.div>
                  
                  <motion.span 
                    className="absolute inset-x-2 bottom-1 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"
                    initial={{ scaleX: 0, opacity: 0 }}
                    animate={activeDropdown === i ? { scaleX: 1, opacity: 1 } : {}}
                    whileHover={{ scaleX: 1, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                  
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-lg -z-10"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.button>

                {/* Dropdown Menu */}
                <AnimatePresence>
                  {activeDropdown === i && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.2, type: "spring", bounce: 0.2 }}
                      className="absolute top-full left-0 mt-2 w-72 bg-gradient-to-b from-[#1a1446] to-[#0f0a2a] rounded-2xl border border-purple-500/30 shadow-2xl overflow-hidden"
                      style={{ backdropFilter: "blur(20px)" }}
                      onMouseEnter={() => handleDropdownEnter(i)}
                      onMouseLeave={handleDropdownLeave}
                    >
                      {/* Decorative elements */}
                      <div className="absolute inset-0 overflow-hidden">
                        <motion.div 
                          className="absolute -top-20 -left-20 w-40 h-40 bg-purple-600 rounded-full blur-3xl opacity-20"
                          animate={{ x: [0, 20, 0], y: [0, 20, 0] }}
                          transition={{ duration: 5, repeat: Infinity }}
                        />
                        <motion.div 
                          className="absolute -bottom-20 -right-20 w-40 h-40 bg-pink-600 rounded-full blur-3xl opacity-20"
                          animate={{ x: [0, -20, 0], y: [0, -20, 0] }}
                          transition={{ duration: 5, repeat: Infinity }}
                        />
                      </div>

                      {/* Dropdown header */}
                      <div className="relative px-4 py-3 border-b border-purple-500/20 bg-gradient-to-r from-purple-500/10 to-pink-500/10">
                        <div className="flex items-center gap-2">
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                          >
                            <BsLightningCharge className="text-purple-400" />
                          </motion.div>
                          <span className="text-sm font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                            {item.name} Menu
                          </span>
                        </div>
                      </div>

                      {/* Dropdown items */}
                      <div className="relative p-2">
                        {item.dropdown.map((dropItem, dropIndex) => (
                          <motion.a
                            key={dropIndex}
                            href={dropItem.href}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: dropIndex * 0.05 }}
                            whileHover={{ x: 5, backgroundColor: "rgba(168,85,247,0.1)" }}
                            className="flex items-start gap-3 p-3 rounded-xl transition-all cursor-pointer group/item"
                          >
                            <div className={`p-2 rounded-lg bg-gradient-to-br ${item.gradient} bg-opacity-20`}>
                              <motion.div
                                whileHover={{ rotate: 360 }}
                                transition={{ duration: 0.5 }}
                                className="text-white"
                              >
                                {dropItem.icon}
                              </motion.div>
                            </div>
                            
                            <div className="flex-1">
                              <div className="flex items-center gap-2">
                                <span className="font-medium text-white">{dropItem.title}</span>
                                {dropItem.badge && (
                                  <motion.span 
                                    className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                                      dropItem.badge === 'New' || dropItem.badge === 'Hot' 
                                        ? 'bg-gradient-to-r from-red-500 to-pink-500' 
                                        : dropItem.badge === 'Pro' || dropItem.badge === 'Premium'
                                        ? 'bg-gradient-to-r from-purple-500 to-blue-500'
                                        : 'bg-gradient-to-r from-green-500 to-emerald-500'
                                    } text-white font-bold`}
                                    animate={{ scale: [1, 1.1, 1] }}
                                    transition={{ duration: 1, repeat: Infinity }}
                                  >
                                    {dropItem.badge}
                                  </motion.span>
                                )}
                              </div>
                              <p className="text-xs text-gray-400">{dropItem.desc}</p>
                            </div>

                            <motion.div
                              initial={{ opacity: 0, x: -5 }}
                              whileHover={{ opacity: 1, x: 0 }}
                              className="text-purple-400"
                            >
                              <FiArrowRight className="text-sm" />
                            </motion.div>
                          </motion.a>
                        ))}
                      </div>

                      {/* Dropdown footer */}
                      <div className="relative px-4 py-3 border-t border-purple-500/20 bg-gradient-to-r from-purple-500/5 to-pink-500/5">
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="w-full flex items-center justify-between text-sm text-purple-300 hover:text-white transition-colors"
                        >
                          <span>View all {item.name.toLowerCase()}</span>
                          <FiArrowRight />
                        </motion.button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </nav>

          {/* Right Side Actions - Only CTA Button */}
          <motion.div 
            className="hidden md:flex items-center"
            style={{ scale: buttonScale }}
          >
            {/* CTA Button */}
            <motion.button
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.9, type: "spring" }}
              className="group relative overflow-hidden bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 text-white px-8 py-3 rounded-full font-semibold shadow-2xl"
              whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(168,85,247,0.8)" }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div 
                className="absolute inset-0"
                animate={{
                  background: [
                    "radial-gradient(circle at 20% 50%, rgba(255,255,255,0.3) 0%, transparent 50%)",
                    "radial-gradient(circle at 80% 50%, rgba(255,255,255,0.3) 0%, transparent 50%)",
                    "radial-gradient(circle at 20% 50%, rgba(255,255,255,0.3) 0%, transparent 50%)",
                  ]
                }}
                transition={{ duration: 3, repeat: Infinity }}
              />
              
              <span className="relative flex items-center gap-3">
                <motion.span
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                >
                  <FaBolt />
                </motion.span>
                Get Started
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <FiArrowRight />
                </motion.span>
              </span>
              
              <motion.div 
                className="absolute inset-[-2px] rounded-full border-2 border-transparent border-t-white/30 border-r-white/30"
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              />
            </motion.button>
          </motion.div>

          {/* Mobile Menu Button */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="md:hidden text-3xl text-white relative z-50"
            onClick={toggleMenu}
            whileTap={{ scale: 0.9 }}
            aria-label="Toggle menu"
          >
            <motion.div
              animate={menuOpen ? { rotate: 180 } : { rotate: 0 }}
              transition={{ duration: 0.3 }}
            >
              {menuOpen ? <FiX /> : <FiMenu />}
            </motion.div>
          </motion.button>
        </motion.div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {menuOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="fixed inset-0 bg-black/60 backdrop-blur-sm md:hidden z-40"
                onClick={closeMenu}
              />
              
              {/* Menu Panel */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, type: "spring", bounce: 0.1 }}
                className="absolute top-full left-0 right-0 md:hidden z-50"
              >
                <motion.div 
                  className="bg-gradient-to-b from-[#1a1446] to-[#0f0a2a] border-t border-purple-500/30 shadow-2xl rounded-b-2xl"
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: 1 }}
                  exit={{ scaleY: 0 }}
                  transition={{ duration: 0.3 }}
                  style={{ originY: 0 }}
                >
                  <div className="absolute inset-0 overflow-hidden rounded-b-2xl">
                    <motion.div 
                      className="absolute -top-20 -left-20 w-40 h-40 bg-purple-600 rounded-full blur-3xl opacity-20"
                      animate={{ x: [0, 30, 0], y: [0, 20, 0] }}
                      transition={{ duration: 8, repeat: Infinity }}
                    />
                    <motion.div 
                      className="absolute -bottom-20 -right-20 w-40 h-40 bg-pink-600 rounded-full blur-3xl opacity-20"
                      animate={{ x: [0, -30, 0], y: [0, -20, 0] }}
                      transition={{ duration: 8, repeat: Infinity }}
                    />
                  </div>

                  <div className="relative max-h-[calc(100vh-100px)] overflow-y-auto py-6 px-4">
                    {/* Mobile nav items */}
                    {navItems.map((item, i) => (
                      <MobileDropdown 
                        key={item.name} 
                        item={item} 
                        index={i} 
                        onItemClick={closeMenu}
                      />
                    ))}

                    {/* Mobile CTA - Replaced FiSparkles with FaRocket */}
                    <motion.button
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      transition={{ delay: 0.5 }}
                      onClick={closeMenu}
                      className="mt-8 w-full group relative overflow-hidden bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-2xl font-semibold shadow-2xl"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span className="relative flex items-center justify-center gap-3 text-lg">
                        <FaRocket className="text-yellow-300" />
                        Get Started Now
                        <motion.span
                          animate={{ x: [0, 5, 0] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        >
                          <FiArrowRight />
                        </motion.span>
                      </span>
                    </motion.button>

                    {/* Stats grid */}
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.7 }}
                      className="grid grid-cols-3 gap-3 mt-4"
                    >
                      {[
                        { label: "Projects", value: "24", icon: <HiOutlineCube /> },
                        { label: "Tasks", value: "156", icon: <FiZap /> },
                        { label: "Team", value: "12", icon: <BsPeople /> },
                      ].map((stat, i) => (
                        <motion.div
                          key={stat.label}
                          whileHover={{ scale: 1.05 }}
                          className="text-center p-3 bg-white/5 rounded-xl border border-purple-500/20"
                        >
                          <div className="text-purple-400 text-xl mb-1">{stat.icon}</div>
                          <div className="text-lg font-bold text-white">{stat.value}</div>
                          <div className="text-xs text-gray-400">{stat.label}</div>
                        </motion.div>
                      ))}
                    </motion.div>
                  </div>
                </motion.div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Floating ambient elements */}
      <div className="fixed top-0 left-0 w-full pointer-events-none z-40">
        {[1, 2, 3, 4, 5].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-gradient-to-r from-purple-400 to-pink-400 blur-xl"
            style={{
              width: 2 + i * 2,
              height: 2 + i * 2,
              left: `${20 + i * 15}%`,
              top: `${30 + i * 10}px`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.5, 0.2],
              scale: [1, 1.5, 1]
            }}
            transition={{
              duration: 3 + i,
              repeat: Infinity,
              delay: i * 0.5
            }}
          />
        ))}
      </div>
    </>
  );
}

// Mobile Dropdown Component
function MobileDropdown({ item, index, onItemClick }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
      className="mb-2"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 text-gray-200 hover:text-white hover:bg-white/5 rounded-xl transition-all"
      >
        <div className="flex items-center gap-3">
          <span className={`text-xl bg-gradient-to-r ${item.gradient} bg-clip-text text-transparent`}>
            {item.icon}
          </span>
          <span className="font-medium">{item.name}</span>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <FiChevronDown />
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden pl-12 pr-4"
          >
            {item.dropdown.map((dropItem, dropIndex) => (
              <motion.a
                key={dropIndex}
                href={dropItem.href}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: dropIndex * 0.05 }}
                onClick={onItemClick}
                className="flex items-center gap-3 py-3 text-gray-300 hover:text-white border-b border-purple-500/10 last:border-0"
              >
                <span className="text-purple-400">{dropItem.icon}</span>
                <span className="flex-1">{dropItem.title}</span>
                {dropItem.badge && (
                  <span className="text-[10px] px-1.5 py-0.5 bg-purple-500/20 text-purple-300 rounded-full">
                    {dropItem.badge}
                  </span>
                )}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}