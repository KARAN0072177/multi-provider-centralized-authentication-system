import { motion } from "framer-motion";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import { Shield, Lock, Users, Server, Sparkles } from "lucide-react";

export default function ProjectTitle() {
  const particlesInit = async (engine) => {
    await loadSlim(engine);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
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

  return (
    <section className="relative min-h-screen bg-[#0A0A0F] flex items-center justify-center overflow-hidden">
      {/* Background Particles */}
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
              speed: 0.8,
              direction: "none",
              random: true,
              straight: false,
              outModes: "out"
            },
            number: {
              value: 40,
              density: { enable: true, area: 800 }
            },
            opacity: {
              value: 0.2,
              random: true,
              animation: { enable: true, speed: 0.5, minimumValue: 0.1 }
            },
            size: {
              value: { min: 1, max: 3 },
              random: true
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
        className="absolute inset-0"
      />

      {/* Ambient Glow */}
      <div className="absolute inset-0 overflow-hidden">
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
          className="absolute w-[800px] h-[800px] bg-blue-600/15 rounded-full blur-[200px] -top-40 -left-40"
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
          className="absolute w-[800px] h-[800px] bg-indigo-600/15 rounded-full blur-[200px] -bottom-40 -right-40"
        />
      </div>

      {/* Main Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
      >
        {/* Icon Grid */}
        <motion.div variants={itemVariants} className="flex justify-center gap-4 mb-8">
          {[Shield, Lock, Users, Server].map((Icon, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.1, rotate: 5 }}
              className="p-3 rounded-xl bg-[#1A1A23] border border-blue-500/20 hover:border-blue-500/40 transition-all duration-200"
            >
              <Icon className="w-6 h-6 text-blue-400" />
            </motion.div>
          ))}
        </motion.div>

        {/* Title */}
        <motion.h1 variants={itemVariants} className="mb-6">
          <span className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-white via-blue-200 to-indigo-200 bg-clip-text text-transparent block">
            Multi-Provider Centralized
          </span>
          <span className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent block">
            Authentication System
          </span>
        </motion.h1>

        {/* Decorative Line */}
        <motion.div variants={itemVariants} className="flex justify-center gap-2 mb-8">
          <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full" />
          <div className="w-4 h-1 bg-blue-500/50 rounded-full" />
          <div className="w-4 h-1 bg-indigo-500/50 rounded-full" />
        </motion.div>

        {/* Description */}
        <motion.p 
          variants={itemVariants}
          className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto"
        >
          This project demonstrates how Node.js integrates with MongoDB
          to build a centralized authentication system that supports
          multiple login providers such as Email/Password, Google,
          GitHub, and Microsoft.
        </motion.p>

        {/* Tech Badges */}
        <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-3 mt-10">
          {["Node.js", "MongoDB", "JWT", "OAuth 2.0", "Passport.js", "Express"].map((tech) => (
            <motion.span
              key={tech}
              whileHover={{ scale: 1.05, y: -2 }}
              className="px-4 py-2 rounded-full bg-[#1A1A23] border border-blue-500/20 text-sm text-gray-300 hover:text-white hover:border-blue-500/40 transition-all duration-200"
            >
              {tech}
            </motion.span>
          ))}
        </motion.div>

        {/* Sparkle Icon */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute top-10 right-10 text-yellow-400/20"
        >
          <Sparkles size={40} />
        </motion.div>
      </motion.div>
    </section>
  );
}