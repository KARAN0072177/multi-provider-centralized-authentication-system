import { motion } from "framer-motion";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import { 
  Database,
  FileJson,
  Users,
  Mail,
  Key,
  Link2,
  Clock,
  Shield,
  Box,
  Code,
  GitBranch,
  CheckCircle
} from "lucide-react";

export default function DatabaseDesign() {
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
      {/* Background Particles - Lowest layer */}
      <Particles
        init={particlesInit}
        options={{
          background: { color: "transparent" },
          fpsLimit: 60,
          particles: {
            color: { value: "#10b981" },
            links: {
              enable: true,
              distance: 150,
              color: "#059669",
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
          className="absolute w-[600px] h-[600px] bg-emerald-600/10 rounded-full blur-[150px] -top-20 -left-20"
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
          className="absolute w-[600px] h-[600px] bg-green-600/10 rounded-full blur-[150px] -bottom-20 -right-20"
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
                className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-green-600 rounded-full blur-xl opacity-40"
              />
              <div className="relative p-4 rounded-full bg-[#1A1A23] border border-emerald-500/20">
                <Database className="w-8 h-8 text-emerald-400" />
              </div>
            </div>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-white via-emerald-200 to-green-200 bg-clip-text text-transparent mb-4">
            Database Design
          </h2>
          <div className="flex justify-center gap-2">
            <div className="w-20 h-1 bg-gradient-to-r from-emerald-500 to-green-500 rounded-full" />
          </div>
        </motion.div>

        {/* Description */}
        <motion.p 
          variants={itemVariants}
          className="text-lg text-gray-300 text-center max-w-3xl mx-auto mb-12 leading-relaxed"
        >
          The application uses MongoDB to store user data. Each user is stored
          as a single document containing information about all linked
          authentication providers.
        </motion.p>

        {/* Database Schema Visualization */}
        <motion.div variants={itemVariants} className="mb-16">
          <motion.div 
            whileHover={{ scale: 1.01 }}
            className="bg-[#0F0F15]/80 backdrop-blur-sm border border-emerald-500/20 rounded-2xl p-8 overflow-x-auto hover:border-emerald-500/40 transition-all duration-300"
          >
            <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
              <FileJson className="w-5 h-5 text-emerald-400" />
              User Document Structure
            </h3>
            
            <div className="font-mono text-sm">
              <pre className="text-gray-300 bg-[#1A1A23] p-6 rounded-xl border border-gray-800 overflow-x-auto">
{`{
  "_id": "ObjectId('...')",
  "username": "johndoe",
  "email": "john@example.com",
  "providers": {
    "local": {
      "password": "bcrypt_hash",
      "verified": true
    },
    "google": {
      "id": "google_user_id",
      "email": "john@gmail.com",
      "avatar": "url_to_avatar"
    },
    "github": {
      "id": "github_user_id",
      "username": "johndoe",
      "avatar": "url_to_avatar"
    },
    "microsoft": {
      "id": "microsoft_user_id",
      "email": "john@outlook.com"
    }
  },
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}`}
              </pre>
            </div>
          </motion.div>
        </motion.div>

        {/* Schema Explanation Grid */}
        <motion.div variants={itemVariants} className="grid md:grid-cols-2 gap-6 mb-12">
          {/* Left Column - Fields */}
          <motion.div 
            whileHover={{ y: -4 }}
            className="bg-[#0F0F15]/80 backdrop-blur-sm border border-gray-800 rounded-xl p-6 hover:border-emerald-500/30 transition-all duration-300"
          >
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Box className="w-4 h-4 text-emerald-400" />
              Document Fields
            </h3>
            <ul className="space-y-3">
              {[
                { icon: Users, field: "username", type: "String", desc: "Unique display name" },
                { icon: Mail, field: "email", type: "String", desc: "Primary email address" },
                { icon: Key, field: "providers", type: "Object", desc: "Linked auth providers" },
                { icon: Clock, field: "createdAt", type: "Date", desc: "Account creation timestamp" },
                { icon: Clock, field: "updatedAt", type: "Date", desc: "Last update timestamp" }
              ].map((item, index) => (
                <motion.li 
                  key={index} 
                  whileHover={{ x: 4 }}
                  className="flex items-start gap-3 p-2 rounded-lg hover:bg-[#1A1A23] transition-colors duration-200"
                >
                  <item.icon className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-white">{item.field}</span>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        {item.type}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">{item.desc}</p>
                  </div>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Right Column - Providers */}
          <motion.div 
            whileHover={{ y: -4 }}
            className="bg-[#0F0F15]/80 backdrop-blur-sm border border-gray-800 rounded-xl p-6 hover:border-emerald-500/30 transition-all duration-300"
          >
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <GitBranch className="w-4 h-4 text-emerald-400" />
              Provider Objects
            </h3>
            <ul className="space-y-3">
              {[
                { provider: "local", fields: ["password (hash)", "verified"], color: "blue" },
                { provider: "google", fields: ["id", "email", "avatar"], color: "red" },
                { provider: "github", fields: ["id", "username", "avatar"], color: "gray" },
                { provider: "microsoft", fields: ["id", "email"], color: "green" }
              ].map((item, index) => (
                <motion.li 
                  key={index} 
                  whileHover={{ scale: 1.02 }}
                  className="p-3 rounded-lg bg-[#1A1A23] border border-gray-800 hover:border-emerald-500/30 transition-all duration-200"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`text-sm font-medium text-${item.color}-400`}>{item.provider}</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {item.fields.map((field, idx) => (
                      <span key={idx} className="text-xs px-2 py-1 rounded-full bg-gray-800 text-gray-400">
                        {field}
                      </span>
                    ))}
                  </div>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </motion.div>

        {/* Key Benefits */}
        <motion.div variants={itemVariants} className="grid md:grid-cols-3 gap-4 mb-12">
          {[
            { icon: CheckCircle, title: "No Duplicates", desc: "Single document per user across all providers", color: "green" },
            { icon: CheckCircle, title: "Flexible Schema", desc: "Each provider can store different fields", color: "green" },
            { icon: CheckCircle, title: "Efficient Queries", desc: "All user data in one place for fast access", color: "green" }
          ].map((benefit, index) => (
            <motion.div 
              key={index}
              whileHover={{ y: -2, scale: 1.02 }}
              className="p-4 rounded-lg bg-[#1A1A23] border border-gray-800 hover:border-emerald-500/30 transition-all duration-200"
            >
              <div className="flex items-center gap-2 mb-2">
                <benefit.icon className={`w-4 h-4 text-${benefit.color}-400`} />
                <span className="text-sm font-medium text-white">{benefit.title}</span>
              </div>
              <p className="text-xs text-gray-500">{benefit.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Summary */}
        <motion.p 
          variants={itemVariants}
          whileHover={{ scale: 1.01 }}
          className="text-gray-300 text-center max-w-2xl mx-auto p-6 rounded-xl bg-[#0F0F15]/50 border border-gray-800 hover:border-emerald-500/30 transition-all duration-300"
        >
          This design ensures that one user account can support multiple login
          providers without creating duplicate accounts.
        </motion.p>
      </motion.div>
    </section>
  );
}