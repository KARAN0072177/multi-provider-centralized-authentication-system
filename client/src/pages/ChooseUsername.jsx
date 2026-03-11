import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import API from "../api/auth";

import {
  User,
  CheckCircle,
  XCircle,
  Loader2,
  ArrowRight,
  Sparkles,
  Shield,
  Lock,
  AlertCircle,
  AtSign,
  Eye,
  EyeOff,
  RefreshCw,
  Github,
  Chrome,
  Mail
} from "lucide-react";

export default function ChooseUsername() {
  const [username, setUsername] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isChecking, setIsChecking] = useState(false);
  const [usernameAvailable, setUsernameAvailable] = useState(null);
  const [params] = useSearchParams();
  const navigate = useNavigate();

  const userId = params.get("userId");
  const provider = params.get("provider") || "oauth";

  const particlesInit = async (engine) => {
    await loadSlim(engine);
  };

  // Debounced username availability check
  useEffect(() => {
    if (username.length < 3) {
      setUsernameAvailable(null);
      return;
    }

    const checkAvailability = async () => {
      setIsChecking(true);
      try {
        // Simulate API call - replace with actual endpoint
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Mock check - in production, call your API
        const isAvailable = !["admin", "root", "user"].includes(username.toLowerCase());
        setUsernameAvailable(isAvailable);
      } catch (error) {
        setUsernameAvailable(false);
      } finally {
        setIsChecking(false);
      }
    };

    const timer = setTimeout(checkAvailability, 500);
    return () => clearTimeout(timer);
  }, [username]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!usernameAvailable) {
      return;
    }

    setIsLoading(true);

    try {
      await API.post("/auth/set-username", {
        userId,
        username
      });

      // Show success and redirect
      setTimeout(() => {
        navigate("/");
      }, 2000);

    } catch (error) {
      alert(error.response?.data?.message);
      setIsLoading(false);
    }
  };

  const getProviderIcon = () => {
    switch(provider) {
      case "google": return <Chrome className="w-5 h-5 text-red-400" />;
      case "github": return <Github className="w-5 h-5 text-gray-400" />;
      case "microsoft": return <Lock className="w-5 h-5 text-green-400" />;
      default: return <Mail className="w-5 h-5 text-blue-400" />;
    }
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

  return (
    <div className="min-h-screen bg-[#0A0A0F] flex items-center justify-center relative overflow-hidden">
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
        className="absolute inset-0 pointer-events-none"
        style={{ zIndex: 0 }}
      />

      {/* Ambient Glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 1 }}>
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
        className="relative z-10 w-full max-w-md px-4"
        style={{ zIndex: 10 }}
      >
        <div className="bg-[#0F0F15]/80 backdrop-blur-xl border border-blue-500/15 rounded-2xl shadow-2xl p-8">
          {/* Header Icon */}
          <motion.div variants={itemVariants} className="flex justify-center mb-6">
            <div className="relative">
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full blur-2xl opacity-40"
              />
              <div className="relative p-4 rounded-full bg-gradient-to-r from-blue-500/20 to-indigo-500/20 border border-blue-500/30">
                <User className="w-12 h-12 text-blue-400" />
              </div>
            </div>
          </motion.div>

          {/* Title */}
          <motion.h1 
            variants={itemVariants}
            className="text-3xl font-bold text-center mb-2 bg-gradient-to-r from-white via-blue-200 to-indigo-200 bg-clip-text text-transparent"
          >
            Choose Your Username
          </motion.h1>

          {/* Provider Info */}
          <motion.div 
            variants={itemVariants}
            className="flex items-center justify-center gap-2 mb-8 p-3 rounded-lg bg-[#1A1A23] border border-gray-800"
          >
            {getProviderIcon()}
            <span className="text-sm text-gray-400">
              Complete your {provider !== "oauth" ? provider : ""} account setup
            </span>
          </motion.div>

          {/* Info Message */}
          <motion.div 
            variants={itemVariants}
            className="mb-6 p-4 rounded-xl bg-blue-500/10 border border-blue-500/20"
          >
            <p className="text-sm text-blue-300 text-center">
              Choose a unique username that will identify you across the platform
            </p>
          </motion.div>

          {/* Username Form */}
          <form onSubmit={handleSubmit}>
            <motion.div variants={itemVariants} className="mb-6">
              <label className="block text-sm text-gray-400 mb-2">
                Username
              </label>
              <div className="relative">
                <AtSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, ''))}
                  placeholder="Enter username"
                  className="w-full bg-[#1A1A23] border border-gray-800 rounded-lg pl-10 pr-10 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all duration-200"
                  minLength={3}
                  maxLength={20}
                  pattern="[a-z0-9_]+"
                  title="Only lowercase letters, numbers, and underscores"
                  required
                />
                
                {/* Availability Indicator */}
                {username.length >= 3 && (
                  <div className="absolute right-3 top-1/2 -translate-y-1/2">
                    {isChecking ? (
                      <Loader2 className="w-5 h-5 text-gray-500 animate-spin" />
                    ) : usernameAvailable ? (
                      <CheckCircle className="w-5 h-5 text-green-400" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-400" />
                    )}
                  </div>
                )}
              </div>

              {/* Username Requirements */}
              <div className="mt-3 space-y-2">
                <p className="text-xs text-gray-500 flex items-center gap-2">
                  <CheckCircle size={12} className={username.length >= 3 ? "text-green-400" : "text-gray-600"} />
                  <span className={username.length >= 3 ? "text-green-400" : "text-gray-500"}>
                    At least 3 characters
                  </span>
                </p>
                <p className="text-xs text-gray-500 flex items-center gap-2">
                  <CheckCircle size={12} className={username.length <= 20 ? "text-green-400" : "text-gray-600"} />
                  <span className={username.length <= 20 ? "text-green-400" : "text-gray-500"}>
                    Maximum 20 characters
                  </span>
                </p>
                <p className="text-xs text-gray-500 flex items-center gap-2">
                  <CheckCircle size={12} className={/^[a-z0-9_]+$/.test(username) ? "text-green-400" : "text-gray-600"} />
                  <span className={/^[a-z0-9_]+$/.test(username) ? "text-green-400" : "text-gray-500"}>
                    Only lowercase letters, numbers, and underscores
                  </span>
                </p>
                {usernameAvailable === false && (
                  <p className="text-xs text-red-400 flex items-center gap-1 mt-2">
                    <AlertCircle size={12} />
                    This username is already taken
                  </p>
                )}
              </div>
            </motion.div>

            {/* Submit Button */}
            <motion.button
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isLoading || !usernameAvailable || username.length < 3}
              className={`w-full relative group overflow-hidden rounded-lg ${
                isLoading || !usernameAvailable || username.length < 3
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600" />
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="relative flex items-center justify-center gap-2 py-3">
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span className="font-medium">Saving...</span>
                  </>
                ) : (
                  <>
                    <User className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
                    <span className="font-medium">Save Username</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
                  </>
                )}
              </div>
            </motion.button>
          </form>

          {/* Tips Section */}
          <motion.div 
            variants={itemVariants}
            className="mt-6 p-4 rounded-xl bg-[#1A1A23] border border-gray-800"
          >
            <h3 className="text-sm font-semibold text-white mb-2 flex items-center gap-2">
              <Sparkles size={14} className="text-yellow-400" />
              Tips for choosing a username
            </h3>
            <ul className="space-y-1 text-xs text-gray-500">
              <li>• Use your real name or a professional handle</li>
              <li>• Keep it simple and easy to remember</li>
              <li>• Avoid personal information like birth year</li>
              <li>• You can change it later in settings</li>
            </ul>
          </motion.div>

          {/* Security Note */}
          <motion.div 
            variants={itemVariants}
            className="flex items-center justify-center gap-1 mt-6 text-xs text-gray-700"
          >
            <Shield size={12} />
            <span>Your username is unique across the platform</span>
            <Sparkles size={12} className="ml-2 text-blue-500/50" />
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}