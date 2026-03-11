import { motion } from "framer-motion";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import { 
  Target, 
  CheckCircle, 
  Server, 
  Lock, 
  Users, 
  GitBranch,
  Database,
  Key,
  Shield,
  Zap
} from "lucide-react";

export default function ProjectObjective() {
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

  const objectives = [
    {
      icon: Server,
      title: "Node.js Integration",
      description: "Demonstrate Node.js integration with MongoDB",
      color: "green"
    },
    {
      icon: Lock,
      title: "JWT Authentication",
      description: "Implement secure authentication using JWT",
      color: "blue"
    },
    {
      icon: GitBranch,
      title: "OAuth Integration",
      description: "Integrate OAuth authentication providers",
      color: "purple"
    },
    {
      icon: Users,
      title: "Multi-Provider Support",
      description: "Allow multiple login methods for a single user account",
      color: "yellow"
    },
    {
      icon: Database,
      title: "Centralized Architecture",
      description: "Build a centralized authentication architecture",
      color: "indigo"
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
        className="absolute inset-0 -z-10"
      />

      {/* Ambient Glow - Middle layer */}
      <div className="absolute inset-0 overflow-hidden -z-5">
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
          className="absolute w-[700px] h-[700px] bg-blue-600/15 rounded-full blur-[180px] -top-20 -left-20"
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
          className="absolute w-[700px] h-[700px] bg-indigo-600/15 rounded-full blur-[180px] -bottom-20 -right-20"
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
                <Target className="w-8 h-8 text-blue-400" />
              </div>
            </div>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-white via-blue-200 to-indigo-200 bg-clip-text text-transparent mb-4">
            Project Objective
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
          The objective of this project is to demonstrate how a modern
          authentication system can support multiple login providers while
          maintaining a centralized user identity in a database.
        </motion.p>

        {/* Objectives Grid */}
        <motion.div 
          variants={containerVariants}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16"
        >
          {objectives.map((objective, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -4, scale: 1.02 }}
              className="group relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="relative h-full bg-[#0F0F15]/80 backdrop-blur-sm border border-gray-800 rounded-2xl p-6 hover:border-blue-500/30 transition-all duration-300">
                {/* Icon */}
                <div className={`mb-4 p-3 rounded-xl bg-[#1A1A23] border border-${objective.color}-500/20 w-fit group-hover:scale-110 transition-transform duration-200`}>
                  <objective.icon className={`w-6 h-6 text-${objective.color}-400`} />
                </div>
                
                {/* Title */}
                <h3 className="text-lg font-semibold text-white mb-2">
                  {objective.title}
                </h3>
                
                {/* Description */}
                <p className="text-sm text-gray-400">
                  {objective.description}
                </p>

                {/* Checkmark */}
                <div className="absolute bottom-4 right-4">
                  <CheckCircle size={16} className="text-green-400/50 group-hover:text-green-400 transition-colors duration-200" />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Key Benefits */}
        <motion.div 
          variants={itemVariants}
          className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {[
            { label: "Single User Record", value: "01" },
            { label: "Multiple Providers", value: "02" },
            { label: "Secure JWT Tokens", value: "03" },
            { label: "Centralized Data", value: "04" }
          ].map((benefit, index) => (
            <motion.div 
              key={index} 
              whileHover={{ scale: 1.05, y: -2 }}
              className="text-center p-4 rounded-lg bg-[#1A1A23] border border-gray-800 hover:border-blue-500/30 transition-all duration-200"
            >
              <div className="text-2xl font-bold text-blue-400 mb-1">{benefit.value}</div>
              <div className="text-xs text-gray-500 uppercase tracking-wider">{benefit.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}