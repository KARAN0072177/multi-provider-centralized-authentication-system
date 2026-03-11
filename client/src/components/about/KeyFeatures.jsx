import { motion } from "framer-motion";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import { 
  Mail,
  Lock,
  Chrome,
  Github,
  Shield,
  Users,
  Link2,
  User,
  Eye,
  Image,
  CheckCircle,
  Sparkles,
  GitMerge,
  Layout,
  Key
} from "lucide-react";

export default function KeyFeatures() {
  const particlesInit = async (engine) => {
    await loadSlim(engine);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
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
      icon: Mail,
      title: "Email Registration & Verification",
      description: "Complete email registration with verification system",
      color: "blue",
      category: "core"
    },
    {
      icon: Lock,
      title: "JWT-based Authentication",
      description: "Secure JSON Web Token implementation for stateless auth",
      color: "yellow",
      category: "security"
    },
    {
      icon: Chrome,
      title: "Google OAuth Integration",
      description: "Seamless login with Google accounts",
      color: "red",
      category: "oauth"
    },
    {
      icon: Github,
      title: "GitHub OAuth Integration",
      description: "Authenticate using GitHub developer accounts",
      color: "gray",
      category: "oauth"
    },
    {
      icon: Shield,
      title: "Microsoft OAuth Integration",
      description: "Enterprise-ready Microsoft account login",
      color: "green",
      category: "oauth"
    },
    {
      icon: Users,
      title: "Centralized User Identity",
      description: "Single user record with multiple provider links",
      color: "purple",
      category: "core"
    },
    {
      icon: User,
      title: "Username Onboarding",
      description: "Username collection for OAuth users",
      color: "indigo",
      category: "ux"
    },
    {
      icon: Link2,
      title: "Multi-Provider Account Linking",
      description: "Connect multiple auth methods to one account",
      color: "red",
      category: "core"
    },
    {
      icon: Layout,
      title: "Protected Routes",
      description: "Route guards for authenticated users only",
      color: "purple",
      category: "security"
    },
    {
      icon: Eye,
      title: "User Profile Dashboard",
      description: "Personal dashboard for user information",
      color: "yellow",
      category: "ux"
    },
    {
      icon: GitMerge,
      title: "Linked Account Visibility",
      description: "View all connected authentication providers",
      color: "blue",
      category: "ux"
    },
    {
      icon: Image,
      title: "OAuth Avatar Support",
      description: "Profile pictures from connected providers",
      color: "green",
      category: "ux"
    }
  ];

  const categories = [
    { name: "Core Features", color: "blue", filter: "core" },
    { name: "OAuth Integration", color: "green", filter: "oauth" },
    { name: "Security", color: "yellow", filter: "security" },
    { name: "User Experience", color: "purple", filter: "ux" }
  ];

  return (
    <section className="relative min-h-screen bg-[#0A0A0F] flex items-center justify-center overflow-hidden">
      {/* Background Particles - Lowest layer */}
      <Particles
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
              speed: 0.7,
              direction: "none",
              random: true,
              straight: false,
              outModes: "out"
            },
            number: {
              value: 35,
              density: { enable: true, area: 800 }
            },
            opacity: {
              value: 0.2,
              random: true
            },
            size: {
              value: { min: 1, max: 3 },
              random: true
            }
          },
          detectRetina: true
        }}
        className="absolute inset-0 -z-10 pointer-events-none"
      />

      {/* Ambient Glow - Middle layer */}
      <div className="absolute inset-0 overflow-hidden -z-5 pointer-events-none">
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
          className="absolute w-[700px] h-[700px] bg-blue-600/15 rounded-full blur-[180px] -top-20 -left-40"
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
          className="absolute w-[700px] h-[700px] bg-indigo-600/15 rounded-full blur-[180px] -bottom-20 -right-40"
        />
      </div>

      {/* Main Content - Highest layer */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="text-center mb-16">
          <div className="flex justify-center mb-4">
            <div className="relative">
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full blur-xl opacity-40"
              />
              <div className="relative p-4 rounded-full bg-[#1A1A23] border border-blue-500/20">
                <Sparkles className="w-8 h-8 text-blue-400" />
              </div>
            </div>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-white via-blue-200 to-indigo-200 bg-clip-text text-transparent mb-4">
            Key Features
          </h2>
          <div className="flex justify-center gap-2">
            <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full" />
          </div>
        </motion.div>

        {/* Description */}
        <motion.p 
          variants={itemVariants}
          className="text-lg text-gray-300 text-center max-w-3xl mx-auto mb-12 leading-relaxed"
        >
          A comprehensive set of authentication features designed for security,
          flexibility, and seamless user experience.
        </motion.p>

        {/* Category Stats */}
        <motion.div variants={itemVariants} className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {categories.map((category, index) => {
            const count = features.filter(f => f.category === category.filter).length;
            return (
              <motion.div 
                key={index} 
                whileHover={{ y: -2, scale: 1.02 }}
                className="text-center p-4 rounded-lg bg-[#1A1A23] border border-gray-800 hover:border-blue-500/30 transition-all duration-200"
              >
                <div className={`text-2xl font-bold text-${category.color}-400 mb-1`}>{count}</div>
                <div className="text-xs text-gray-500 uppercase tracking-wider">{category.name}</div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Features Grid */}
        <motion.div 
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -4, scale: 1.02 }}
              className="group relative"
            >
              <div className={`absolute inset-0 bg-gradient-to-r from-${feature.color}-500/20 to-${feature.color}-600/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
              
              <div className="relative h-full bg-[#0F0F15]/80 backdrop-blur-sm border border-gray-800 rounded-2xl p-6 hover:border-blue-500/30 transition-all duration-300">
                <div className="flex items-start gap-4">
                  {/* Icon */}
                  <div className={`p-3 rounded-xl bg-[#1A1A23] border border-${feature.color}-500/30 group-hover:scale-110 transition-transform duration-200`}>
                    <feature.icon className={`w-6 h-6 text-${feature.color}-400`} />
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-gray-400">
                      {feature.description}
                    </p>
                  </div>
                </div>

                {/* Category Badge */}
                <div className="absolute top-4 right-4">
                  <span className={`text-xs px-2 py-1 rounded-full bg-${feature.color}-500/10 text-${feature.color}-400 border border-${feature.color}-500/20`}>
                    {feature.category}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Feature Summary */}
        <motion.div 
          variants={itemVariants}
          className="mt-16 p-8 rounded-2xl bg-gradient-to-br from-blue-500/5 via-indigo-500/5 to-purple-500/5 border border-blue-500/20 hover:border-blue-500/40 transition-all duration-300"
        >
          <h3 className="text-xl font-semibold text-center text-white mb-6 flex items-center justify-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-400" />
            Complete Authentication Solution
          </h3>
          
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center">
            {["Email/Password", "Google OAuth", "GitHub OAuth", "Microsoft OAuth", "JWT Tokens"].map((item, index) => (
              <div key={index} className="text-sm text-gray-400 flex items-center justify-center gap-1">
                <CheckCircle className="w-3 h-3 text-green-400" />
                {item}
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}