import { motion } from "framer-motion";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import { 
  Mail,
  Chrome,
  Github,
  Shield,
  Send,
  CheckCircle,
  LogIn,
  Key,
  UserPlus,
  ArrowRight,
  Link2,
  Database,
  Hash,
  Clock
} from "lucide-react";

export default function AuthenticationFlow() {
  const particlesInit = async (engine) => {
    await loadSlim(engine);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.15
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

  const emailSteps = [
    { icon: UserPlus, text: "User registers using email and password", color: "blue" },
    { icon: Send, text: "A verification email is sent", color: "yellow" },
    { icon: CheckCircle, text: "User verifies their email", color: "green" },
    { icon: LogIn, text: "User logs in and receives a JWT token", color: "purple" }
  ];

  const oauthSteps = [
    { icon: Chrome, text: "User selects an OAuth provider (Google, GitHub, Microsoft)", color: "red" },
    { icon: Shield, text: "User authenticates with the provider", color: "blue" },
    { icon: Database, text: "The provider returns user information", color: "green" },
    { icon: Hash, text: "The backend checks if the email already exists", color: "yellow" },
    { icon: Link2, text: "The account is created or linked to an existing user", color: "purple" }
  ];

  const providers = [
    { icon: Chrome, name: "Google", color: "red", bg: "from-red-500/20 to-red-600/20" },
    { icon: Github, name: "GitHub", color: "gray", bg: "from-gray-500/20 to-gray-600/20" },
    { icon: Shield, name: "Microsoft", color: "green", bg: "from-green-500/20 to-green-600/20" }
  ];

  return (
    <section className="relative min-h-screen bg-[#0A0A0F] py-20 overflow-hidden">
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
              opacity: 0.1,
              width: 1
            },
            move: {
              enable: true,
              speed: 0.5,
              direction: "none",
              random: true,
              straight: false,
              outModes: "out"
            },
            number: {
              value: 30,
              density: { enable: true, area: 800 }
            },
            opacity: {
              value: 0.15,
              random: true
            },
            size: {
              value: { min: 1, max: 2 },
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
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[150px] -top-20 -left-20"
        />
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
          className="absolute w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[150px] -bottom-20 -right-20"
        />
      </div>

      {/* Main Content - Highest layer */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"
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
            Authentication Flow
          </h2>
          <div className="flex justify-center gap-2">
            <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full" />
          </div>
        </motion.div>

        {/* Email Authentication Flow */}
        <motion.div variants={itemVariants} className="mb-16">
          <motion.div 
            whileHover={{ scale: 1.01 }}
            className="bg-[#0F0F15]/80 backdrop-blur-sm border border-blue-500/20 rounded-2xl p-8 hover:border-blue-500/40 transition-all duration-300"
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 rounded-xl bg-[#1A1A23] border border-blue-500/30">
                <Mail className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="text-2xl font-semibold text-white">Email Authentication</h3>
            </div>

            <div className="grid md:grid-cols-4 gap-4">
              {emailSteps.map((step, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ y: -4 }}
                  className="relative group"
                >
                  <div className={`absolute inset-0 bg-gradient-to-r from-${step.color}-500/20 to-${step.color}-600/20 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                  <div className="relative bg-[#1A1A23] border border-gray-800 rounded-xl p-5 h-full hover:border-blue-500/30 transition-all duration-300">
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-lg bg-${step.color}-500/10 border border-${step.color}-500/30 group-hover:scale-110 transition-transform duration-200`}>
                        <step.icon className={`w-5 h-5 text-${step.color}-400`} />
                      </div>
                      <div className="flex-1">
                        <span className="text-xs text-gray-500 block mb-1">Step {index + 1}</span>
                        <p className="text-sm text-gray-300">{step.text}</p>
                      </div>
                    </div>
                    
                    {/* Connector line (except last) */}
                    {index < emailSteps.length - 1 && (
                      <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                        <ArrowRight className="w-4 h-4 text-gray-600" />
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Email Flow Summary */}
            <motion.div 
              whileHover={{ x: 4 }}
              className="mt-6 p-4 rounded-lg bg-[#1A1A23]/50 border border-gray-800 hover:border-blue-500/30 transition-all duration-300"
            >
              <p className="text-sm text-gray-400 flex items-center gap-2">
                <Clock className="w-4 h-4 text-blue-400" />
                Complete flow: Registration → Verification → Login → JWT Token
              </p>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* OAuth Authentication Flow */}
        <motion.div variants={itemVariants} className="mb-12">
          <motion.div 
            whileHover={{ scale: 1.01 }}
            className="bg-[#0F0F15]/80 backdrop-blur-sm border border-purple-500/20 rounded-2xl p-8 hover:border-purple-500/40 transition-all duration-300"
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="flex gap-2">
                {providers.map((provider, idx) => (
                  <motion.div 
                    key={idx} 
                    whileHover={{ scale: 1.1 }}
                    className={`p-2 rounded-lg bg-${provider.color}-500/10 border border-${provider.color}-500/30`}
                  >
                    <provider.icon className={`w-5 h-5 text-${provider.color}-400`} />
                  </motion.div>
                ))}
              </div>
              <h3 className="text-2xl font-semibold text-white">OAuth Authentication</h3>
            </div>

            <div className="grid md:grid-cols-5 gap-4">
              {oauthSteps.map((step, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ y: -4 }}
                  className="relative group"
                >
                  <div className={`absolute inset-0 bg-gradient-to-r from-${step.color}-500/20 to-${step.color}-600/20 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                  <div className="relative bg-[#1A1A23] border border-gray-800 rounded-xl p-4 h-full hover:border-purple-500/30 transition-all duration-300">
                    <div className="flex flex-col items-center text-center">
                      <div className={`p-2 rounded-lg bg-${step.color}-500/10 border border-${step.color}-500/30 mb-3 group-hover:scale-110 transition-transform duration-200`}>
                        <step.icon className={`w-5 h-5 text-${step.color}-400`} />
                      </div>
                      <span className="text-xs text-gray-500 block mb-1">Step {index + 1}</span>
                      <p className="text-xs text-gray-300">{step.text}</p>
                    </div>
                    
                    {/* Connector line (except last) */}
                    {index < oauthSteps.length - 1 && (
                      <div className="hidden md:block absolute top-1/2 -right-3 transform -translate-y-1/2">
                        <ArrowRight className="w-4 h-4 text-gray-600" />
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Provider Grid */}
            <div className="mt-8 grid grid-cols-3 gap-4">
              {providers.map((provider, index) => (
                <motion.div 
                  key={index} 
                  whileHover={{ y: -2, scale: 1.02 }}
                  className="p-4 rounded-lg bg-[#1A1A23] border border-gray-800 hover:border-purple-500/30 transition-all duration-200"
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg bg-${provider.color}-500/10`}>
                      <provider.icon className={`w-5 h-5 text-${provider.color}-400`} />
                    </div>
                    <div>
                      <span className="text-sm font-medium text-white">{provider.name}</span>
                      <p className="text-xs text-gray-500">OAuth 2.0</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Flow Summary */}
        <motion.div variants={itemVariants} className="grid md:grid-cols-2 gap-6">
          <motion.div 
            whileHover={{ y: -4, scale: 1.02 }}
            className="p-6 rounded-xl bg-gradient-to-br from-blue-500/10 to-indigo-500/10 border border-blue-500/20 hover:border-blue-500/40 transition-all duration-300"
          >
            <h4 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-400" />
              Email Flow Result
            </h4>
            <p className="text-sm text-gray-400">
              User gains access via JWT token stored in localStorage.
              Token includes user ID and expiration time.
            </p>
          </motion.div>

          <motion.div 
            whileHover={{ y: -4, scale: 1.02 }}
            className="p-6 rounded-xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300"
          >
            <h4 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
              <Link2 className="w-5 h-5 text-purple-400" />
              OAuth Flow Result
            </h4>
            <p className="text-sm text-gray-400">
              Provider linked to user account. If email exists, providers are merged.
              New users are created with provider data.
            </p>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}