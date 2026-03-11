import { motion } from "framer-motion";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import { 
  CheckCircle,
  Server,
  Database,
  Lock,
  Users,
  GitBranch,
  Shield,
  Sparkles,
  Rocket,
  Zap,
  Globe,
  Code
} from "lucide-react";

export default function Conclusion() {
  const particlesInit = async (engine) => {
    await loadSlim(engine);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2
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

  const achievements = [
    { icon: Lock, text: "Secure JWT Authentication", color: "yellow" },
    { icon: Users, text: "Multi-Provider OAuth Support", color: "blue" },
    { icon: Database, text: "Centralized User Identity", color: "green" },
    { icon: GitBranch, text: "Account Linking System", color: "purple" },
    { icon: Shield, text: "Password Encryption", color: "red" },
    { icon: Globe, text: "Cross-Platform Compatibility", color: "indigo" }
  ];

  const techStack = [
    { icon: Server, name: "Node.js", color: "green" },
    { icon: Database, name: "MongoDB", color: "green" },
    { icon: Code, name: "React", color: "blue" },
    { icon: Zap, name: "Express", color: "gray" }
  ];

  return (
    <section className="relative min-h-screen bg-[#0F0F15] flex items-center justify-center overflow-hidden">
      {/* Background Particles - Lowest layer */}
      <Particles
        init={particlesInit}
        options={{
          background: { color: "transparent" },
          fpsLimit: 60,
          particles: {
            color: { value: "#8b5cf6" },
            links: {
              enable: true,
              distance: 150,
              color: "#7c3aed",
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
          className="absolute w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[150px] -top-20 -left-20"
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
          className="absolute w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[150px] -bottom-20 -right-20"
        />
      </div>

      {/* Main Content - Highest layer */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="relative">
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-600 rounded-full blur-xl opacity-40"
              />
              <div className="relative p-4 rounded-full bg-[#1A1A23] border border-purple-500/20">
                <Rocket className="w-8 h-8 text-purple-400" />
              </div>
            </div>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent mb-4">
            Conclusion
          </h2>
          <div className="flex justify-center gap-2">
            <div className="w-20 h-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full" />
          </div>
        </motion.div>

        {/* Main Content Card */}
        <motion.div 
          variants={itemVariants}
          whileHover={{ scale: 1.01 }}
          className="bg-[#0F0F15]/80 backdrop-blur-sm border border-purple-500/20 rounded-2xl p-8 md:p-10 mb-10 hover:border-purple-500/40 transition-all duration-300"
        >
          {/* Key Points */}
          <div className="space-y-6 mb-10">
            <motion.p 
              variants={itemVariants}
              className="text-lg text-gray-300 leading-relaxed"
            >
              This project demonstrates how modern applications can support multiple
              authentication providers while maintaining a centralized user identity.
            </motion.p>

            <motion.p 
              variants={itemVariants}
              className="text-lg text-gray-300 leading-relaxed"
            >
              Using the MERN stack, this system integrates secure authentication,
              OAuth providers, and database design to ensure scalability and
              flexibility in user authentication workflows.
            </motion.p>

            <motion.p 
              variants={itemVariants}
              className="text-lg text-gray-300 leading-relaxed"
            >
              The project highlights how Node.js interacts with MongoDB to manage
              user accounts, authentication providers, and secure login sessions.
            </motion.p>
          </div>

          {/* Achievements Grid */}
          <motion.div variants={itemVariants} className="mb-10">
            <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-yellow-400" />
              Key Achievements
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {achievements.map((item, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05, y: -4 }}
                  className="p-4 rounded-lg bg-[#1A1A23] border border-gray-800 hover:border-purple-500/30 transition-all duration-200"
                >
                  <div className={`flex items-center gap-2 mb-2 text-${item.color}-400`}>
                    <item.icon className="w-4 h-4" />
                    <span className="text-xs font-medium uppercase tracking-wider">
                      {item.text.split(' ')[0]}
                    </span>
                  </div>
                  <p className="text-sm text-gray-300">{item.text}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Tech Stack Summary */}
          <motion.div variants={itemVariants} className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {techStack.map((tech, index) => (
              <motion.div 
                key={index} 
                whileHover={{ y: -4, scale: 1.05 }}
                className="text-center p-4 rounded-lg bg-[#1A1A23] border border-gray-800 hover:border-purple-500/30 transition-all duration-200"
              >
                <tech.icon className={`w-6 h-6 text-${tech.color}-400 mx-auto mb-2 group-hover:scale-110 transition-transform duration-200`} />
                <span className="text-sm text-gray-300">{tech.name}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Final Message */}
        <motion.div 
          variants={itemVariants}
          whileHover={{ scale: 1.02 }}
          className="text-center p-8 rounded-2xl bg-gradient-to-br from-purple-500/10 via-blue-500/10 to-indigo-500/10 border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300"
        >
          <motion.p 
            animate={{ scale: [1, 1.02, 1] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="text-xl text-white font-light italic"
          >
            "A robust, scalable authentication system ready for production use"
          </motion.p>
          <div className="flex justify-center gap-1 mt-4 text-sm text-gray-500">
            <span>Built with</span>
            <motion.span 
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="text-red-400 inline-block"
            >
              ❤️
            </motion.span>
            <span>using MERN Stack</span>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}