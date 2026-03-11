import { motion } from "framer-motion";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import { 
  Server,
  Database,
  Globe,
  ArrowRight,
  Cpu,
  Layout,
  Code,
  Workflow,
  Box,
  GitBranch
} from "lucide-react";

export default function SystemArchitecture() {
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

  const architectureSteps = [
    {
      icon: Globe,
      title: "1. User Interaction",
      description: "User interacts with the React frontend",
      color: "blue"
    },
    {
      icon: ArrowRight,
      title: "2. API Request",
      description: "Frontend sends requests to the Node.js API server",
      color: "green"
    },
    {
      icon: Server,
      title: "3. Server Processing",
      description: "The server processes authentication and business logic",
      color: "purple"
    },
    {
      icon: Database,
      title: "4. Database Operations",
      description: "MongoDB stores user data and authentication providers",
      color: "yellow"
    },
    {
      icon: ArrowRight,
      title: "5. Response",
      description: "The backend returns responses back to the frontend",
      color: "green",
      flip: true
    }
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
              speed: 0.6,
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
          className="absolute w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[150px] -bottom-20 -right-20"
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
        <motion.div variants={itemVariants} className="text-center mb-16">
          <div className="flex justify-center mb-4">
            <div className="relative">
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-full blur-xl opacity-40"
              />
              <div className="relative p-4 rounded-full bg-[#1A1A23] border border-purple-500/20">
                <Workflow className="w-8 h-8 text-purple-400" />
              </div>
            </div>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-white via-purple-200 to-indigo-200 bg-clip-text text-transparent mb-4">
            System Architecture
          </h2>
          <div className="flex justify-center gap-2">
            <div className="w-20 h-1 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full" />
          </div>
        </motion.div>

        {/* Description */}
        <motion.p 
          variants={itemVariants}
          className="text-lg text-gray-300 text-center max-w-3xl mx-auto mb-12 leading-relaxed"
        >
          This project follows a client-server architecture using the MERN stack.
          The frontend is built with React, which communicates with a Node.js
          backend through REST APIs.
        </motion.p>

        {/* Architecture Flow Diagram */}
        <motion.div variants={itemVariants} className="relative mb-16">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-start">
            {architectureSteps.map((step, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -4 }}
                className="relative"
              >
                <div className={`bg-[#0F0F15]/80 backdrop-blur-sm border border-${step.color}-500/20 rounded-xl p-5 text-center h-full hover:border-${step.color}-500/40 transition-all duration-300`}>
                  <div className={`flex justify-center mb-3`}>
                    <div className={`p-3 rounded-lg bg-[#1A1A23] border border-${step.color}-500/30 group-hover:scale-110 transition-transform duration-200`}>
                      <step.icon className={`w-6 h-6 text-${step.color}-400 ${step.flip ? 'rotate-180' : ''}`} />
                    </div>
                  </div>
                  <h3 className="text-sm font-semibold text-white mb-2">{step.title}</h3>
                  <p className="text-xs text-gray-400">{step.description}</p>
                </div>
                
                {/* Arrow between steps (except last) */}
                {index < architectureSteps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-3 transform -translate-y-1/2 z-20">
                    <ArrowRight className="w-5 h-5 text-gray-600" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Detailed Architecture Card */}
        <motion.div variants={itemVariants} className="grid md:grid-cols-3 gap-6 mb-12">
          {/* Frontend Card */}
          <motion.div 
            whileHover={{ y: -4, scale: 1.02 }}
            className="bg-[#0F0F15]/80 backdrop-blur-sm border border-blue-500/20 rounded-xl p-6 hover:border-blue-500/40 transition-all duration-300"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-[#1A1A23] border border-blue-500/30">
                <Layout className="w-5 h-5 text-blue-400" />
              </div>
              <h3 className="text-lg font-semibold text-white">Frontend Layer</h3>
            </div>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-sm text-gray-400">
                <div className="w-1 h-1 bg-blue-400 rounded-full" />
                React.js for UI components
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-400">
                <div className="w-1 h-1 bg-blue-400 rounded-full" />
                React Router for navigation
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-400">
                <div className="w-1 h-1 bg-blue-400 rounded-full" />
                Axios for API calls
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-400">
                <div className="w-1 h-1 bg-blue-400 rounded-full" />
                Framer Motion for animations
              </li>
            </ul>
          </motion.div>

          {/* Backend Card */}
          <motion.div 
            whileHover={{ y: -4, scale: 1.02 }}
            className="bg-[#0F0F15]/80 backdrop-blur-sm border border-green-500/20 rounded-xl p-6 hover:border-green-500/40 transition-all duration-300"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-[#1A1A23] border border-green-500/30">
                <Server className="w-5 h-5 text-green-400" />
              </div>
              <h3 className="text-lg font-semibold text-white">Backend Layer</h3>
            </div>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-sm text-gray-400">
                <div className="w-1 h-1 bg-green-400 rounded-full" />
                Node.js runtime environment
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-400">
                <div className="w-1 h-1 bg-green-400 rounded-full" />
                Express.js web framework
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-400">
                <div className="w-1 h-1 bg-green-400 rounded-full" />
                JWT for authentication
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-400">
                <div className="w-1 h-1 bg-green-400 rounded-full" />
                OAuth 2.0 using provider APIs
              </li>
            </ul>
          </motion.div>

          {/* Database Card */}
          <motion.div 
            whileHover={{ y: -4, scale: 1.02 }}
            className="bg-[#0F0F15]/80 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6 hover:border-purple-500/40 transition-all duration-300"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-[#1A1A23] border border-purple-500/30">
                <Database className="w-5 h-5 text-purple-400" />
              </div>
              <h3 className="text-lg font-semibold text-white">Database Layer</h3>
            </div>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-sm text-gray-400">
                <div className="w-1 h-1 bg-purple-400 rounded-full" />
                MongoDB for data storage
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-400">
                <div className="w-1 h-1 bg-purple-400 rounded-full" />
                Mongoose ODM
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-400">
                <div className="w-1 h-1 bg-purple-400 rounded-full" />
                Centralized user records
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-400">
                <div className="w-1 h-1 bg-purple-400 rounded-full" />
                Provider linking schema
              </li>
            </ul>
          </motion.div>
        </motion.div>

        {/* Summary */}
        <motion.p 
          variants={itemVariants}
          className="text-gray-300 text-center max-w-2xl mx-auto p-6 rounded-xl bg-[#0F0F15]/50 border border-gray-800 hover:border-purple-500/30 transition-all duration-300"
        >
          This architecture ensures separation of concerns between the frontend,
          backend, and database layers.
        </motion.p>
      </motion.div>
    </section>
  );
}