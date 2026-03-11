import { motion } from "framer-motion";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import { AlertTriangle, Users, Database, XCircle, CheckCircle, GitMerge } from "lucide-react";

export default function ProblemStatement() {
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

  return (
    <section className="relative min-h-screen bg-[#0F0F15] flex items-center justify-center overflow-hidden">
      {/* Background Particles - Lower z-index */}
      <Particles
        init={particlesInit}
        options={{
          background: { color: "transparent" },
          fpsLimit: 60,
          particles: {
            color: { value: "#ef4444" },
            links: {
              enable: true,
              distance: 150,
              color: "#dc2626",
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
        className="absolute inset-0 -z-10" // Changed to -z-10
      />

      {/* Ambient Glow - Lower z-index */}
      <div className="absolute inset-0 overflow-hidden -z-5"> {/* Added -z-5 */}
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
          className="absolute w-[600px] h-[600px] bg-red-600/10 rounded-full blur-[150px] -top-20 -right-20"
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
          className="absolute w-[600px] h-[600px] bg-orange-600/10 rounded-full blur-[150px] -bottom-20 -left-20"
        />
      </div>

      {/* Main Content - Higher z-index */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible" // Changed from "animate" to "visible"
        viewport={{ once: true, amount: 0.3 }}
        className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20"
      >
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Left Side - Visual Representation */}
          <motion.div variants={itemVariants} className="relative">
            <div className="relative p-8">
              {/* Central Problem Icon */}
              <div className="relative w-72 h-72 mx-auto">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
                >
                  <div className="p-6 rounded-full bg-gradient-to-br from-red-500/20 to-orange-500/20 border border-red-500/30">
                    <Database className="w-16 h-16 text-red-400" />
                  </div>
                </motion.div>

                {/* Provider Icons - Properly positioned without overlap */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0"
                >
                  {[0, 120, 240].map((angle, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.5 + index * 0.2 }}
                      className="absolute top-1/2 left-1/2"
                      style={{
                        transform: `rotate(${angle}deg) translateX(100px) rotate(-${angle}deg)`,
                        transformOrigin: '0 0'
                      }}
                    >
                      <div className="p-3 rounded-full bg-[#1A1A23] border border-gray-700 shadow-lg">
                        <Users className={`w-6 h-6 ${index === 0 ? 'text-blue-400' : index === 1 ? 'text-green-400' : 'text-purple-400'}`} />
                      </div>
                    </motion.div>
                  ))}
                </motion.div>

                {/* X Marks */}
                <motion.div
                  animate={{ scale: [0.8, 1.2, 0.8], opacity: [0.2, 0.5, 0.2] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -top-4 -right-4"
                >
                  <XCircle className="w-8 h-8 text-red-500/40" />
                </motion.div>
                <motion.div
                  animate={{ scale: [0.8, 1.2, 0.8], opacity: [0.2, 0.5, 0.2] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  className="absolute -bottom-4 -left-4"
                >
                  <XCircle className="w-8 h-8 text-red-500/40" />
                </motion.div>
              </div>

              {/* Problem Points */}
              <div className="mt-12 space-y-3">
                {[
                  "Duplicate user accounts",
                  "Inconsistent user data",
                  "Fragmented identity management"
                ].map((point, index) => (
                  <motion.div 
                    key={index}
                    variants={itemVariants}
                    className="flex items-center gap-3 p-3 rounded-lg bg-[#1A1A23] border border-gray-800"
                  >
                    <XCircle size={16} className="text-red-400 flex-shrink-0" />
                    <span className="text-sm text-gray-300">{point}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Side - Problem Statement */}
          <motion.div variants={itemVariants}>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-lg bg-[#1A1A23] border border-red-500/20">
                <AlertTriangle className="w-6 h-6 text-red-400" />
              </div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
                Problem Statement
              </h2>
            </div>

            <div className="space-y-6">
              <p className="text-gray-300 leading-relaxed">
                Many applications allow users to login using multiple
                authentication providers such as Google or GitHub.
                Managing these identities separately can lead to
                <span className="text-red-400 font-medium"> duplicate accounts</span> and
                <span className="text-red-400 font-medium"> inconsistent user data</span>.
              </p>

              <p className="text-gray-300 leading-relaxed">
                This project solves this problem by storing all
                authentication providers inside one centralized
                user record in MongoDB.
              </p>

              {/* Solution Card */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="mt-8 p-6 rounded-xl bg-gradient-to-br from-blue-500/10 to-indigo-500/10 border border-blue-500/20"
              >
                <div className="flex items-start gap-4">
                  <div className="p-2 rounded-lg bg-[#1A1A23]">
                    <GitMerge className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-blue-400 mb-1">The Solution:</h3>
                    <p className="text-sm text-gray-300">
                      Centralized identity management with a single user record 
                      linking all authentication providers.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}