import { motion } from "framer-motion";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import { 
  Server,
  Database,
  Lock,
  Key,
  Shield,
  Users,
  Zap,
  Globe,
  Cpu,
  Code,
  Box,
  Workflow
} from "lucide-react";

export default function TechStack() {
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

  const frontendTech = [
    { icon: Code, name: "React", description: "UI Library", color: "blue" },
    { icon: Box, name: "React Router", description: "Navigation", color: "red" },
    { icon: Zap, name: "Framer Motion", description: "Animations", color: "purple" },
    { icon: Globe, name: "Axios", description: "HTTP Client", color: "green" }
  ];

  const backendTech = [
    { icon: Server, name: "Node.js", description: "Runtime Environment", color: "green" },
    { icon: Database, name: "MongoDB", description: "Database", color: "green" },
    { icon: Lock, name: "JWT", description: "Authentication", color: "yellow" },
    { icon: Shield, name: "Express", description: "Web Framework", color: "gray" },
    { icon: Users, name: "OAuth 2.0", description: "Social Login", color: "purple" }
  ];

  const devTools = [
    { icon: Cpu, name: "Postman", description: "API Testing", color: "red" },
    { icon: Workflow, name: "Git", description: "Version Control", color: "red" }
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
                <Cpu className="w-8 h-8 text-blue-400" />
              </div>
            </div>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-white via-blue-200 to-indigo-200 bg-clip-text text-transparent mb-4">
            Technology Stack
          </h2>
          <div className="flex justify-center gap-2">
            <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full" />
          </div>
        </motion.div>

        {/* Description */}
        <motion.p 
          variants={itemVariants}
          className="text-lg text-gray-300 text-center max-w-3xl mx-auto mb-16 leading-relaxed"
        >
          This project leverages modern technologies to build a secure, scalable, 
          and maintainable authentication system. Here's the complete technology stack:
        </motion.p>

        {/* Frontend Section */}
        <motion.div variants={itemVariants} className="mb-12">
          <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
            <span className="w-1 h-6 bg-gradient-to-b from-blue-500 to-indigo-500 rounded-full" />
            Frontend Technologies
          </h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {frontendTech.map((tech, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -4, scale: 1.02 }}
                className="group relative"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative bg-[#0F0F15]/80 backdrop-blur-sm border border-gray-800 rounded-xl p-5 hover:border-blue-500/30 transition-all duration-300">
                  <div className={`mb-3 p-2 rounded-lg bg-[#1A1A23] border border-${tech.color}-500/20 w-fit`}>
                    <tech.icon className={`w-5 h-5 text-${tech.color}-400`} />
                  </div>
                  <h4 className="text-white font-medium mb-1">{tech.name}</h4>
                  <p className="text-xs text-gray-500">{tech.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Backend Section */}
        <motion.div variants={itemVariants} className="mb-12">
          <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
            <span className="w-1 h-6 bg-gradient-to-b from-blue-500 to-indigo-500 rounded-full" />
            Backend Technologies
          </h3>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {backendTech.map((tech, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -4, scale: 1.02 }}
                className="group relative"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative bg-[#0F0F15]/80 backdrop-blur-sm border border-gray-800 rounded-xl p-4 hover:border-blue-500/30 transition-all duration-300">
                  <div className={`mb-2 p-2 rounded-lg bg-[#1A1A23] border border-${tech.color}-500/20 w-fit mx-auto`}>
                    <tech.icon className={`w-4 h-4 text-${tech.color}-400`} />
                  </div>
                  <h4 className="text-white text-sm font-medium text-center mb-1">{tech.name}</h4>
                  <p className="text-xs text-gray-500 text-center">{tech.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Development Tools */}
        <motion.div variants={itemVariants} className="mb-12">
          <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
            <span className="w-1 h-6 bg-gradient-to-b from-blue-500 to-indigo-500 rounded-full" />
            Development Tools
          </h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
            {devTools.map((tool, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -4, scale: 1.02 }}
                className="group relative"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative bg-[#0F0F15]/80 backdrop-blur-sm border border-gray-800 rounded-xl p-5 hover:border-blue-500/30 transition-all duration-300">
                  <div className={`mb-3 p-2 rounded-lg bg-[#1A1A23] border border-${tool.color}-500/20 w-fit`}>
                    <tool.icon className={`w-5 h-5 text-${tool.color}-400`} />
                  </div>
                  <h4 className="text-white font-medium mb-1">{tool.name}</h4>
                  <p className="text-xs text-gray-500">{tool.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Architecture Overview */}
        <motion.div 
          variants={itemVariants}
          className="p-6 rounded-2xl bg-gradient-to-br from-blue-500/5 via-indigo-500/5 to-purple-500/5 border border-blue-500/20"
        >
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <Workflow className="w-5 h-5 text-blue-400" />
            Architecture Overview
          </h3>
          <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#1A1A23] border border-gray-800">
              <Globe className="w-4 h-4 text-blue-400" />
              <span className="text-gray-300">React Frontend</span>
            </div>
            <div className="text-gray-600">→</div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#1A1A23] border border-gray-800">
              <Server className="w-4 h-4 text-green-400" />
              <span className="text-gray-300">Node.js API</span>
            </div>
            <div className="text-gray-600">→</div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#1A1A23] border border-gray-800">
              <Database className="w-4 h-4 text-green-400" />
              <span className="text-gray-300">MongoDB</span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}