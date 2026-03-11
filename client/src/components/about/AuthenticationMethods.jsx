import { motion } from "framer-motion";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import { 
  Mail,
  Chrome,
  Github,
  Shield,
  Key,
  Link2,
  CheckCircle,
  Users,
  GitMerge,
  Database
} from "lucide-react";

export default function AuthenticationMethods() {
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

  const providers = [
    {
      icon: Mail,
      name: "Email & Password",
      description: "Traditional authentication with secure password hashing",
      color: "blue",
      features: ["bcrypt encryption", "Password reset flow", "Email verification"]
    },
    {
      icon: Chrome,
      name: "Google OAuth",
      description: "Sign in with Google account using OAuth 2.0",
      color: "red",
      features: ["OAuth 2.0 protocol", "Profile data access", "Automatic account linking"]
    },
    {
      icon: Github,
      name: "GitHub OAuth",
      description: "Authenticate using GitHub developer account",
      color: "gray",
      features: ["OAuth apps", "Public profile access", "Repository scope optional"]
    },
    {
      icon: Shield,
      name: "Microsoft OAuth",
      description: "Login with Microsoft account (Azure AD)",
      color: "green",
      features: ["Azure AD integration", "Enterprise ready", "Multi-tenant support"]
    }
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
        className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20"
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
                <Key className="w-8 h-8 text-blue-400" />
              </div>
            </div>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-white via-blue-200 to-indigo-200 bg-clip-text text-transparent mb-4">
            Authentication Methods
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
          This system allows users to authenticate using multiple login methods.
          Each method is connected to the same centralized user account.
        </motion.p>

        {/* Provider Grid */}
        <motion.div 
          variants={containerVariants}
          className="grid md:grid-cols-2 gap-6 mb-12"
        >
          {providers.map((provider, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -4, scale: 1.02 }}
              className="group relative"
            >
              <div className={`absolute inset-0 bg-gradient-to-r from-${provider.color}-500/20 to-${provider.color}-600/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
              
              <div className="relative bg-[#0F0F15]/80 backdrop-blur-sm border border-gray-800 rounded-2xl p-6 hover:border-blue-500/30 transition-all duration-300">
                <div className="flex items-start gap-4">
                  {/* Icon */}
                  <div className={`p-3 rounded-xl bg-[#1A1A23] border border-${provider.color}-500/30 group-hover:scale-110 transition-transform duration-200`}>
                    <provider.icon className={`w-6 h-6 text-${provider.color}-400`} />
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white mb-1">
                      {provider.name}
                    </h3>
                    <p className="text-sm text-gray-400 mb-3">
                      {provider.description}
                    </p>
                    
                    {/* Features */}
                    <ul className="space-y-1">
                      {provider.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-xs text-gray-500">
                          <CheckCircle size={10} className="text-green-400 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* How it Works */}
        <motion.div variants={itemVariants} className="mb-12">
          <div className="bg-[#0F0F15]/80 backdrop-blur-sm border border-blue-500/20 rounded-2xl p-8 hover:border-blue-500/40 transition-all duration-300">
            <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
              <GitMerge className="w-5 h-5 text-blue-400" />
              How Provider Linking Works
            </h3>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-sm font-medium text-blue-400 mb-3">New User Flow</h4>
                <ol className="space-y-3">
                  <li className="flex items-start gap-2 text-sm text-gray-300">
                    <span className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-500/20 text-blue-400 text-xs flex items-center justify-center">1</span>
                    User signs up with any provider (Email, Google, GitHub, Microsoft)
                  </li>
                  <li className="flex items-start gap-2 text-sm text-gray-300">
                    <span className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-500/20 text-blue-400 text-xs flex items-center justify-center">2</span>
                    System creates a new user record with the provider information
                  </li>
                  <li className="flex items-start gap-2 text-sm text-gray-300">
                    <span className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-500/20 text-blue-400 text-xs flex items-center justify-center">3</span>
                    JWT token generated and sent to client
                  </li>
                </ol>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-green-400 mb-3">Returning User Flow</h4>
                <ol className="space-y-3">
                  <li className="flex items-start gap-2 text-sm text-gray-300">
                    <span className="flex-shrink-0 w-5 h-5 rounded-full bg-green-500/20 text-green-400 text-xs flex items-center justify-center">1</span>
                    User logs in with any supported provider
                  </li>
                  <li className="flex items-start gap-2 text-sm text-gray-300">
                    <span className="flex-shrink-0 w-5 h-5 rounded-full bg-green-500/20 text-green-400 text-xs flex items-center justify-center">2</span>
                    System checks if email exists in database
                  </li>
                  <li className="flex items-start gap-2 text-sm text-gray-300">
                    <span className="flex-shrink-0 w-5 h-5 rounded-full bg-green-500/20 text-green-400 text-xs flex items-center justify-center">3</span>
                    Links new provider to existing account if email matches
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Key Points */}
        <motion.div variants={itemVariants} className="grid md:grid-cols-3 gap-4">
          {[
            { icon: Users, title: "Single Identity", description: "One user account linked to multiple providers", color: "blue" },
            { icon: Link2, title: "Automatic Linking", description: "Providers auto-linked based on email address", color: "purple" },
            { icon: Database, title: "Central Storage", description: "All provider data in single MongoDB document", color: "green" }
          ].map((point, index) => (
            <motion.div 
              key={index}
              whileHover={{ y: -2, scale: 1.02 }}
              className="p-4 rounded-lg bg-[#1A1A23] border border-gray-800 hover:border-blue-500/30 transition-all duration-200"
            >
              <div className="flex items-center gap-2 mb-2">
                <point.icon className={`w-4 h-4 text-${point.color}-400`} />
                <span className="text-sm font-medium text-white">{point.title}</span>
              </div>
              <p className="text-xs text-gray-500">{point.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}