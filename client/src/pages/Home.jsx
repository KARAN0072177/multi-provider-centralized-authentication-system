import { motion, AnimatePresence } from "framer-motion";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import { useNavigate } from "react-router-dom";
import { useTypewriter, Cursor } from "react-simple-typewriter";
import { 
  Shield,
  Lock,
  Users,
  Server,
  Zap,
  Github,
  Chrome,
  Mail,
  Key,
  ArrowRight,
  CheckCircle,
  Sparkles,
  Rocket,
  Globe,
  Database,
  Code,
  ArrowUpRight,
  ShieldCheck,
  GitMerge,
  UserPlus,
  LogIn,
  Star,
  Award,
  Clock,
  Activity,
  TrendingUp,
  Layers,
  Workflow,
  Cpu,
  Box,
  Fingerprint,
  KeyRound,
  Linkedin,
  Twitter,
  Instagram,
  Facebook,
  Youtube,
  Twitch,
  Figma,
  Slack,
  Trello,
  Github as GithubIcon,
  Chrome as ChromeIcon,
  Mail as MailIcon,
  Shield as ShieldIcon
} from "lucide-react";
import { FaDiscord } from "react-icons/fa";
import { useEffect, useState, useCallback, useMemo } from "react";

export default function Home() {
  const navigate = useNavigate();

  const [typewriterText] = useTypewriter({
    words: ['Secure', 'Scalable', 'Modern', 'Centralized', 'Reliable'],
    loop: true,
    delaySpeed: 2000,
  });

  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  // Memoize floating icons positions to prevent re-renders
  const floatingIcons = useMemo(() => 
    [Shield, Lock, Users, Server, Code, Zap, Database, Globe].map((Icon, i) => ({
      Icon,
      id: i,
      top: `${Math.random() * 80 + 10}%`,
      left: `${Math.random() * 80 + 10}%`,
      delay: i * 2,
      size: 60 + i * 10
    })), []
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  const features = [
    {
      icon: MailIcon,
      title: "Email & Password",
      description: "Traditional authentication with bcrypt encryption and email verification",
      color: "blue",
      stats: "256-bit encryption",
      gradient: "from-blue-500 to-indigo-500"
    },
    {
      icon: ChromeIcon,
      title: "Google OAuth",
      description: "One-click login with Google accounts using OAuth 2.0 protocol",
      color: "red",
      stats: "2.5B+ users",
      gradient: "from-red-500 to-orange-500"
    },
    {
      icon: GithubIcon,
      title: "GitHub OAuth",
      description: "Authenticate with GitHub for developer-friendly integration",
      color: "gray",
      stats: "100M+ repos",
      gradient: "from-gray-500 to-gray-600"
    },
    {
      icon: ShieldIcon,
      title: "Microsoft OAuth",
      description: "Enterprise-ready authentication with Azure Active Directory",
      color: "green",
      stats: "15M+ organizations",
      gradient: "from-green-500 to-emerald-500"
    }
  ];

  const benefits = [
    {
      icon: GitMerge,
      title: "Centralized Identity",
      description: "Single user record across all authentication providers with automatic account linking",
      color: "blue",
      gradient: "from-blue-500 to-indigo-500"
    },
    {
      icon: Database,
      title: "MongoDB Backend",
      description: "Flexible document schema for user profiles and provider data with Mongoose ODM",
      color: "green",
      gradient: "from-green-500 to-emerald-500"
    },
    {
      icon: Lock,
      title: "JWT Tokens",
      description: "Stateless authentication with secure JSON Web Tokens and automatic refresh",
      color: "yellow",
      gradient: "from-yellow-500 to-orange-500"
    },
    {
      icon: Users,
      title: "Account Linking",
      description: "Automatically link multiple providers to the same account based on email",
      color: "purple",
      gradient: "from-purple-500 to-pink-500"
    }
  ];

  const stats = [
    { value: "4+", label: "Auth Providers", icon: Shield, color: "blue" },
    { value: "JWT", label: "Token Based", icon: Key, color: "yellow" },
    { value: "MERN", label: "Full Stack", icon: Server, color: "green" },
    { value: "OAuth 2.0", label: "Industry Standard", icon: Globe, color: "purple" }
  ];

  const integrations = [
    { icon: Google, name: "Google", color: "red" },
    { icon: GithubIcon, name: "GitHub", color: "gray" },
    { icon: ShieldIcon, name: "Microsoft", color: "green" },
    { icon: MailIcon, name: "Email", color: "blue" },
    { icon: Linkedin, name: "LinkedIn", color: "blue" },
    { icon: Twitter, name: "Twitter", color: "sky" },
    { icon: Instagram, name: "Instagram", color: "pink" },
    { icon: Facebook, name: "Facebook", color: "blue" },
    { icon: Youtube, name: "YouTube", color: "red" },
    { icon: Twitch, name: "Twitch", color: "purple" },
    { icon: Figma, name: "Figma", color: "purple" },
    { icon: Slack, name: "Slack", color: "purple" },
    { icon: FaDiscord, name: "Discord", color: "indigo" },
    { icon: Trello, name: "Trello", color: "blue" }
  ];

  const testimonials = [
    {
      name: "Alex Johnson",
      role: "Lead Developer",
      company: "TechCorp",
      content: "This authentication system saved us months of development time. The account linking feature is a game-changer.",
      rating: 5,
      avatar: "AJ"
    },
    {
      name: "Sarah Chen",
      role: "Product Manager",
      company: "StartupX",
      content: "Support for multiple OAuth providers out of the box. Our users love the flexibility.",
      rating: 5,
      avatar: "SC"
    },
    {
      name: "Michael Rodriguez",
      role: "CTO",
      company: "DevFlow",
      content: "The centralized user identity model is brilliant. No more duplicate accounts across providers.",
      rating: 5,
      avatar: "MR"
    }
  ];

  return (
    <div className="min-h-screen bg-[#0A0A0F] text-white relative overflow-hidden">
      {/* Background Particles - Enhanced with bright particles */}
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          background: { color: "transparent" },
          fpsLimit: 60,
          particles: {
            color: { value: "#3b82f6" },
            links: {
              enable: true,
              distance: 150,
              color: "#2563eb",
              opacity: 0.15,
              width: 1
            },
            move: {
              enable: true,
              speed: 1.2,
              direction: "none",
              random: true,
              straight: false,
              outModes: "out"
            },
            number: {
              value: 80,
              density: { enable: true, area: 800 }
            },
            opacity: {
              value: 0.3,
              random: true,
              animation: { 
                enable: true, 
                speed: 1, 
                minimumValue: 0.1,
                sync: false
              }
            },
            size: {
              value: { min: 1, max: 5 },
              random: true,
              animation: {
                enable: true,
                speed: 2,
                minimumValue: 0.5,
                sync: false
              }
            },
            twinkle: {
              particles: {
                enable: true,
                frequency: 0.05,
                opacity: 0.8
              }
            }
          },
          interactivity: {
            events: {
              onHover: {
                enable: true,
                mode: "repulse"
              }
            },
            modes: {
              repulse: { distance: 100, duration: 0.4 }
            }
          },
          detectRetina: true
        }}
        className="absolute inset-0 pointer-events-none"
        style={{ zIndex: 0 }}
      />

      {/* Enhanced Ambient Glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 1 }}>
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.15, 0.25, 0.15],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute w-[900px] h-[900px] bg-blue-600/15 rounded-full blur-[200px] -top-40 -left-40"
        />
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.15, 0.25, 0.15],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
          className="absolute w-[900px] h-[900px] bg-purple-600/15 rounded-full blur-[200px] -bottom-40 -right-40"
        />
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
          className="absolute w-[700px] h-[700px] bg-indigo-600/15 rounded-full blur-[150px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        />
      </div>

      {/* Floating Icons - Decorative with smooth animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 2 }}>
        {floatingIcons.map(({ Icon, id, top, left, delay, size }) => (
          <motion.div
            key={id}
            className="absolute text-blue-500/10"
            style={{
              top,
              left,
            }}
            animate={{
              y: [0, -30, 30, -30, 0],
              x: [0, 20, -20, 20, 0],
              rotate: [0, 180, 360],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "easeInOut",
              delay: delay * 2,
              times: [0, 0.25, 0.5, 0.75, 1]
            }}
          >
            <Icon size={size} />
          </motion.div>
        ))}
      </div>

      {/* Bright sparkles overlay */}
      <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 3 }}>
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [0, 1, 0],
              opacity: [0, 0.8, 0],
            }}
            transition={{
              duration: 2 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Main Content - Transparent backgrounds */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
        style={{ zIndex: 10 }}
      >
        {/* Hero Section */}
        <motion.div variants={itemVariants} className="text-center mb-24">
          {/* Animated Badge */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 backdrop-blur-sm border border-blue-500/20 mb-8 cursor-pointer hover:bg-blue-500/20 transition-colors duration-200"
          >
            <Sparkles className="w-4 h-4 text-yellow-400" />
            <span className="text-sm text-blue-300">Multi-Provider Authentication System</span>
          </motion.div>

          {/* Main Title with Typewriter */}
          <motion.h1 
            variants={itemVariants}
            className="text-6xl md:text-8xl font-bold mb-6"
          >
            <span className="bg-gradient-to-r from-white via-blue-200 to-indigo-200 bg-clip-text text-transparent block">
              The Most
            </span>
            <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent block">
              {typewriterText}
              <Cursor cursorColor="#3b82f6" />
            </span>
            <span className="bg-gradient-to-r from-white via-blue-200 to-indigo-200 bg-clip-text text-transparent block">
              Auth Solution
            </span>
          </motion.h1>

          <motion.p 
            variants={itemVariants}
            className="text-xl text-gray-400 max-w-3xl mx-auto mb-12 leading-relaxed backdrop-blur-sm bg-[#0A0A0F]/30 p-6 rounded-2xl"
          >
            A modern, secure, and scalable authentication solution that unifies 
            multiple login providers into a single user identity. Built with the MERN stack 
            and industry-standard security practices.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/register")}
              className="group relative px-8 py-4 rounded-xl overflow-hidden cursor-pointer"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600" />
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute inset-0 shadow-[0_0_30px_rgba(59,130,246,0.5)] group-hover:shadow-[0_0_40px_rgba(59,130,246,0.7)] transition-shadow duration-300" />
              <div className="relative flex items-center gap-2">
                <UserPlus className="w-5 h-5 group-hover:rotate-12 transition-transform duration-200" />
                <span className="font-semibold">Get Started</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
              </div>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/login")}
              className="group relative px-8 py-4 rounded-xl overflow-hidden bg-[#1A1A23]/30 backdrop-blur-sm border border-gray-800 hover:border-blue-500/30 transition-all duration-200 cursor-pointer"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative flex items-center gap-2">
                <LogIn className="w-5 h-5 text-blue-400 group-hover:scale-110 transition-transform duration-200" />
                <span className="font-semibold text-gray-300 group-hover:text-white transition-colors duration-200">Sign In</span>
              </div>
            </motion.button>
          </motion.div>

          {/* Stats Grid - Transparent cards */}
          <motion.div 
            variants={itemVariants}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -4 }}
                className="group relative cursor-pointer"
              >
                <div className={`absolute inset-0 bg-gradient-to-r from-${stat.color}-500/20 to-${stat.color}-600/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                <div className="relative bg-[#0F0F15]/30 backdrop-blur-sm border border-gray-800 rounded-2xl p-6 hover:border-blue-500/30 transition-all duration-300">
                  <stat.icon className={`w-6 h-6 text-${stat.color}-400 mx-auto mb-3 group-hover:scale-110 transition-transform duration-200`} />
                  <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-xs text-gray-500 uppercase tracking-wider">{stat.label}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Features Section - Transparent cards */}
        <motion.div variants={itemVariants} className="mb-32">
          <div className="text-center mb-16">
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 backdrop-blur-sm border border-purple-500/20 mb-4 cursor-pointer hover:bg-purple-500/20 transition-colors duration-200"
            >
              <Award className="w-4 h-4 text-purple-400" />
              <span className="text-sm text-purple-300">Authentication Providers</span>
            </motion.div>
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white via-blue-200 to-indigo-200 bg-clip-text text-transparent mb-4">
              Multiple Ways to Sign In
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg backdrop-blur-sm bg-[#0A0A0F]/30 p-4 rounded-xl">
              Support for all major authentication providers, all connected to a single user identity
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group relative cursor-pointer"
              >
                <div className={`absolute inset-0 bg-gradient-to-r ${feature.gradient} rounded-2xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300`} />
                
                <div className="relative bg-[#0F0F15]/30 backdrop-blur-sm border border-gray-800 rounded-2xl p-6 hover:border-blue-500/30 transition-all duration-300 h-full overflow-hidden">
                  {/* Background shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  <div className={`p-3 rounded-xl bg-[#1A1A23]/50 border border-${feature.color}-500/30 w-fit mb-4 group-hover:scale-110 transition-transform duration-200`}>
                    <feature.icon className={`w-6 h-6 text-${feature.color}-400`} />
                  </div>
                  
                  <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                  <p className="text-sm text-gray-400 mb-4">{feature.description}</p>
                  
                  <div className="flex items-center gap-2">
                    <span className={`text-xs px-2 py-1 rounded-full bg-${feature.color}-500/10 text-${feature.color}-400 border border-${feature.color}-500/20 backdrop-blur-sm`}>
                      {feature.stats}
                    </span>
                  </div>

                  <div className="absolute top-4 right-4">
                    <ArrowUpRight className="w-4 h-4 text-gray-600 group-hover:text-blue-400 transition-colors duration-200" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Rest of the sections remain the same but with transparent backgrounds */}
        {/* Benefits Section */}
        <motion.div variants={itemVariants} className="mb-32">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 backdrop-blur-sm border border-green-500/20 mb-4 cursor-pointer hover:bg-green-500/20 transition-colors duration-200"
              >
                <TrendingUp className="w-4 h-4 text-green-400" />
                <span className="text-sm text-green-300">Why Choose Us</span>
              </motion.div>
              
              <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white via-blue-200 to-indigo-200 bg-clip-text text-transparent mb-6">
                Built for Modern Applications
              </h2>
              
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    whileHover={{ x: 4 }}
                    className="group relative cursor-pointer"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="relative flex items-start gap-4 p-4 rounded-xl bg-[#0F0F15]/30 backdrop-blur-sm border border-gray-800 hover:border-blue-500/30 transition-all duration-200">
                      <div className={`p-2 rounded-lg bg-gradient-to-r ${benefit.gradient} p-[1px]`}>
                        <div className="p-2 rounded-lg bg-[#1A1A23]/50">
                          <benefit.icon className={`w-5 h-5 text-${benefit.color}-400`} />
                        </div>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-white mb-1">{benefit.title}</h3>
                        <p className="text-sm text-gray-400">{benefit.description}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Visual Representation */}
            <div className="relative">
              <motion.div
                animate={{
                  scale: [1, 1.05, 1],
                  rotate: [0, 2, -2, 0],
                }}
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute inset-0 bg-gradient-to-r from-blue-500/30 to-indigo-500/30 rounded-3xl blur-3xl"
              />
              <div className="relative bg-[#0F0F15]/30 backdrop-blur-sm border border-blue-500/20 rounded-3xl p-8">
                {/* Central Hub */}
                <div className="flex justify-center mb-8">
                  <div className="relative">
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                      className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full blur-2xl opacity-40"
                    />
                    <div className="relative p-4 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600">
                      <Users className="w-12 h-12 text-white" />
                    </div>
                  </div>
                </div>

                {/* Provider Connections */}
                <div className="grid grid-cols-2 gap-4">
                  {["local", "google", "github", "microsoft"].map((provider, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ scale: 1.05 }}
                      className="flex items-center gap-2 p-3 rounded-lg bg-[#1A1A23]/30 border border-gray-800 hover:border-blue-500/30 transition-all duration-200 cursor-pointer backdrop-blur-sm"
                    >
                      <CheckCircle size={14} className="text-green-400" />
                      <span className="text-sm text-gray-300 capitalize">{provider}</span>
                      <ArrowRight size={12} className="ml-auto text-gray-600 group-hover:text-blue-400" />
                    </motion.div>
                  ))}
                </div>

                {/* Stats */}
                <div className="mt-6 p-4 rounded-lg bg-gradient-to-r from-blue-500/10 to-indigo-500/10 backdrop-blur-sm border border-blue-500/20">
                  <p className="text-sm text-blue-300 text-center">
                    One user. Multiple providers. Centralized identity.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Integrations Grid */}
        <motion.div variants={itemVariants} className="mb-32">
          <div className="text-center mb-16">
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 backdrop-blur-sm border border-blue-500/20 mb-4 cursor-pointer hover:bg-blue-500/20 transition-colors duration-200"
            >
              <Layers className="w-4 h-4 text-blue-400" />
              <span className="text-sm text-blue-300">Integrations</span>
            </motion.div>
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white via-blue-200 to-indigo-200 bg-clip-text text-transparent mb-4">
              Connect with Everything
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg backdrop-blur-sm bg-[#0A0A0F]/30 p-4 rounded-xl">
              Support for 15+ OAuth providers and growing
            </p>
          </div>

          <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-7 gap-4">
            {integrations.map((integration, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -4, scale: 1.05 }}
                className="group relative cursor-pointer"
              >
                <div className={`absolute inset-0 bg-gradient-to-r from-${integration.color}-500/20 to-${integration.color}-600/20 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                <div className="relative bg-[#0F0F15]/30 backdrop-blur-sm border border-gray-800 rounded-xl p-4 text-center hover:border-blue-500/30 transition-all duration-200">
                  <integration.icon className={`w-6 h-6 text-${integration.color}-400 mx-auto mb-2 group-hover:scale-110 transition-transform duration-200`} />
                  <span className="text-xs text-gray-400">{integration.name}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Testimonials */}
        <motion.div variants={itemVariants} className="mb-32">
          <div className="text-center mb-16">
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-500/10 backdrop-blur-sm border border-yellow-500/20 mb-4 cursor-pointer hover:bg-yellow-500/20 transition-colors duration-200"
            >
              <Star className="w-4 h-4 text-yellow-400" />
              <span className="text-sm text-yellow-300">Testimonials</span>
            </motion.div>
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white via-blue-200 to-indigo-200 bg-clip-text text-transparent mb-4">
              Loved by Developers
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg backdrop-blur-sm bg-[#0A0A0F]/30 p-4 rounded-xl">
              Join thousands of satisfied users
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -8 }}
                className="group relative cursor-pointer"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative bg-[#0F0F15]/30 backdrop-blur-sm border border-gray-800 rounded-2xl p-6 hover:border-blue-500/30 transition-all duration-300">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center text-white font-semibold">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <h4 className="text-white font-semibold">{testimonial.name}</h4>
                      <p className="text-xs text-gray-500">{testimonial.role} at {testimonial.company}</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-400 mb-4">"{testimonial.content}"</p>
                  <div className="flex gap-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Tech Stack Showcase */}
        <motion.div variants={itemVariants} className="mb-32">
          <div className="bg-[#0F0F15]/30 backdrop-blur-sm border border-blue-500/20 rounded-3xl p-12">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-white via-blue-200 to-indigo-200 bg-clip-text text-transparent mb-4">
                Built With Modern Tech
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Leveraging industry-standard technologies for security and scalability
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { icon: Server, name: "Node.js", desc: "Runtime Environment", color: "green", gradient: "from-green-500 to-emerald-500" },
                { icon: Database, name: "MongoDB", desc: "Database", color: "green", gradient: "from-green-500 to-emerald-500" },
                { icon: Code, name: "React", desc: "Frontend Library", color: "blue", gradient: "from-blue-500 to-cyan-500" },
                { icon: Lock, name: "JWT", desc: "Authentication", color: "yellow", gradient: "from-yellow-500 to-orange-500" }
              ].map((tech, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -8 }}
                  className="group relative cursor-pointer text-center"
                >
                  <div className={`absolute inset-0 bg-gradient-to-r ${tech.gradient} rounded-2xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300`} />
                  <div className="relative bg-[#1A1A23]/30 border border-gray-800 rounded-2xl p-6 hover:border-blue-500/30 transition-all duration-300 backdrop-blur-sm">
                    <div className={`p-3 rounded-xl bg-gradient-to-r ${tech.gradient} p-[1px] w-fit mx-auto mb-4`}>
                      <div className="p-2 rounded-xl bg-[#1A1A23]/50">
                        <tech.icon className={`w-8 h-8 text-${tech.color}-400`} />
                      </div>
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-1">{tech.name}</h3>
                    <p className="text-xs text-gray-500">{tech.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Final CTA */}
        <motion.div variants={itemVariants}>
          <div className="relative p-16 rounded-3xl overflow-hidden text-center">
            <div className="absolute inset-0" />
            <div 
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: `url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%239C92AC" fill-opacity="0.05"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')`
              }}
            />
            
            <motion.div
              animate={{
                scale: [1, 1.05, 1],
                rotate: [0, 2, -2, 0],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 rounded-3xl blur-3xl"
            />
            
            <div className="relative">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2"
              >
                <Sparkles className="w-12 h-12 text-yellow-400/30" />
              </motion.div>
              
              <Rocket className="w-16 h-16 text-blue-400 mx-auto mb-6" />
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Ready to Get Started?
              </h2>
              <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto backdrop-blur-sm bg-[#0A0A0F]/30 p-6 rounded-2xl">
                Join thousands of developers using centralized authentication for their applications
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate("/register")}
                className="group relative px-10 py-5 rounded-xl overflow-hidden inline-flex cursor-pointer"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600" />
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute inset-0 shadow-[0_0_40px_rgba(59,130,246,0.5)] group-hover:shadow-[0_0_60px_rgba(59,130,246,0.7)] transition-shadow duration-300" />
                <div className="relative flex items-center gap-3 text-lg">
                  <UserPlus className="w-6 h-6 group-hover:rotate-12 transition-transform duration-200" />
                  <span className="font-semibold">Create Your Account</span>
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-200" />
                </div>
              </motion.button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

// Google Icon Component (since it's not in lucide-react)
function Google(props) {
  return (
    <svg
      {...props}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="3.5" />
      <path d="M21 12a9 9 0 1 1-9-9" />
    </svg>
  );
}