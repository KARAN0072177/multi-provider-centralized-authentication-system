import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import API from "../api/auth";

import {
  AlertCircle,
  CheckCircle,
  XCircle,
  Loader2,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Shield,
  Link2,
  Users,
  Github,
  Chrome,
  Mail,
  Lock,
  ExternalLink,
  HelpCircle
} from "lucide-react";

export default function LinkAccount() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  
  const [isLoading, setIsLoading] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(true);
  const [linkStatus, setLinkStatus] = useState(null); // null, success, error

  const email = params.get("email");
  const provider = params.get("provider");
  const providerId = params.get("providerId");

  const particlesInit = async (engine) => {
    await loadSlim(engine);
  };

  const getProviderIcon = () => {
    switch(provider?.toLowerCase()) {
      case "google": return <Chrome className="w-8 h-8 text-red-400" />;
      case "github": return <Github className="w-8 h-8 text-gray-400" />;
      case "microsoft": return <Lock className="w-8 h-8 text-green-400" />;
      default: return <Mail className="w-8 h-8 text-blue-400" />;
    }
  };

  const getProviderColor = () => {
    switch(provider?.toLowerCase()) {
      case "google": return "red";
      case "github": return "gray";
      case "microsoft": return "green";
      default: return "blue";
    }
  };

  const handleLink = async () => {
    setIsLoading(true);
    setShowConfirmation(false);

    try {
      await API.post("/auth/link-oauth", {
        email,
        provider,
        providerId
      });

      setLinkStatus("success");
      
      // Auto redirect after success
      setTimeout(() => {
        navigate("/");
      }, 3000);

    } catch (error) {
      setLinkStatus("error");
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    navigate("/");
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

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0A0A0F] flex items-center justify-center relative overflow-hidden">
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
          className="absolute inset-0 pointer-events-none"
          style={{ zIndex: 0 }}
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="relative z-10 w-full max-w-md px-4"
          style={{ zIndex: 10 }}
        >
          <div className="bg-[#0F0F15]/80 backdrop-blur-xl border border-blue-500/15 rounded-2xl shadow-2xl p-8 text-center">
            <motion.div variants={itemVariants} className="flex justify-center mb-6">
              <div className="relative">
                <div className="absolute inset-0 bg-blue-500 rounded-full blur-xl animate-pulse" />
                <Loader2 className="w-16 h-16 text-blue-400 animate-spin relative" />
              </div>
            </motion.div>

            <motion.h1 
              variants={itemVariants}
              className="text-2xl font-semibold text-white mb-4"
            >
              Linking Your Account
            </motion.h1>

            <motion.p 
              variants={itemVariants}
              className="text-gray-400"
            >
              Please wait while we link your {provider} account...
            </motion.p>
          </div>
        </motion.div>
      </div>
    );
  }

  // Success state
  if (linkStatus === "success") {
    return (
      <div className="min-h-screen bg-[#0A0A0F] flex items-center justify-center relative overflow-hidden">
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
          className="absolute inset-0 pointer-events-none"
          style={{ zIndex: 0 }}
        />

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
            className="absolute w-[600px] h-[600px] bg-green-600/15 rounded-full blur-[150px] -top-20 -left-20"
          />
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="relative z-10 w-full max-w-md px-4"
          style={{ zIndex: 10 }}
        >
          <div className="bg-[#0F0F15]/80 backdrop-blur-xl border border-green-500/15 rounded-2xl shadow-2xl p-8 text-center">
            <motion.div variants={itemVariants} className="flex justify-center mb-6">
              <div className="relative">
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute inset-0 bg-green-500 rounded-full blur-2xl opacity-40"
                />
                <div className="relative p-4 rounded-full bg-gradient-to-r from-green-500 to-emerald-500">
                  <CheckCircle className="w-12 h-12 text-white" />
                </div>
              </div>
            </motion.div>

            <motion.h1 
              variants={itemVariants}
              className="text-3xl font-bold mb-4 bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent"
            >
              Account Linked!
            </motion.h1>

            <motion.p 
              variants={itemVariants}
              className="text-gray-300 mb-6"
            >
              Your {provider} account has been successfully linked. You can now log in using either method.
            </motion.p>

            <motion.div 
              variants={itemVariants}
              className="p-4 rounded-xl bg-[#1A1A23] border border-green-500/20 mb-6"
            >
              <div className="flex items-center gap-3">
                {getProviderIcon()}
                <div className="flex-1 text-left">
                  <p className="text-sm text-gray-400">Linked to</p>
                  <p className="text-sm font-medium text-white">{email}</p>
                </div>
                <CheckCircle size={16} className="text-green-400" />
              </div>
            </motion.div>

            <motion.p 
              variants={itemVariants}
              className="text-sm text-gray-500 mb-4"
            >
              Redirecting to login in 3 seconds...
            </motion.p>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/")}
              className="group relative px-6 py-2 rounded-lg overflow-hidden inline-flex items-center gap-2"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-emerald-600" />
              <div className="relative flex items-center gap-2">
                <span className="text-sm font-medium">Go to Login Now</span>
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-200" />
              </div>
            </motion.button>
          </div>
        </motion.div>
      </div>
    );
  }

  // Error state
  if (linkStatus === "error") {
    return (
      <div className="min-h-screen bg-[#0A0A0F] flex items-center justify-center relative overflow-hidden">
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
          className="absolute inset-0 pointer-events-none"
          style={{ zIndex: 0 }}
        />

        <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 1 }}>
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
            className="absolute w-[600px] h-[600px] bg-red-600/10 rounded-full blur-[150px] -top-20 -left-20"
          />
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="relative z-10 w-full max-w-md px-4"
          style={{ zIndex: 10 }}
        >
          <div className="bg-[#0F0F15]/80 backdrop-blur-xl border border-red-500/15 rounded-2xl shadow-2xl p-8 text-center">
            <motion.div variants={itemVariants} className="flex justify-center mb-6">
              <div className="relative">
                <div className="absolute inset-0 bg-red-500 rounded-full blur-xl opacity-50" />
                <div className="relative p-4 rounded-full bg-gradient-to-r from-red-500 to-pink-500">
                  <XCircle className="w-12 h-12 text-white" />
                </div>
              </div>
            </motion.div>

            <motion.h1 
              variants={itemVariants}
              className="text-2xl font-semibold text-red-400 mb-4"
            >
              Link Failed
            </motion.h1>

            <motion.p 
              variants={itemVariants}
              className="text-gray-300 mb-6"
            >
              There was an error linking your {provider} account. Please try again or contact support.
            </motion.p>

            <div className="flex gap-3 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.location.reload()}
                className="group relative px-4 py-2 rounded-lg overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600" />
                <div className="relative flex items-center gap-2">
                  <RefreshCw size={14} className="group-hover:rotate-180 transition-transform duration-500" />
                  <span className="text-sm font-medium">Try Again</span>
                </div>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate("/")}
                className="px-4 py-2 rounded-lg bg-[#1A1A23] border border-gray-800 text-sm font-medium text-gray-300 hover:text-white transition-colors duration-200"
              >
                Back to Login
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  // Main confirmation state
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
                <Users className="w-12 h-12 text-blue-400" />
              </div>
            </div>
          </motion.div>

          {/* Title */}
          <motion.h1 
            variants={itemVariants}
            className="text-3xl font-bold text-center mb-2 bg-gradient-to-r from-white via-blue-200 to-indigo-200 bg-clip-text text-transparent"
          >
            Account Already Exists
          </motion.h1>

          {/* Provider Card */}
          <motion.div 
            variants={itemVariants}
            className="mb-8 p-6 rounded-xl bg-gradient-to-br from-blue-500/10 via-indigo-500/10 to-purple-500/10 border border-blue-500/20"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className={`p-3 rounded-xl bg-${getProviderColor()}-500/10 border border-${getProviderColor()}-500/30`}>
                {getProviderIcon()}
              </div>
              <div>
                <p className="text-sm text-gray-400">Account email</p>
                <p className="text-lg font-semibold text-white">{email}</p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-400">
              <AlertCircle size={14} className="text-yellow-400" />
              <span>An account with this email already exists</span>
            </div>
          </motion.div>

          {/* Question */}
          <motion.div 
            variants={itemVariants}
            className="text-center mb-8"
          >
            <h2 className="text-xl font-semibold text-white mb-2">
              Link your {provider} account?
            </h2>
            <p className="text-sm text-gray-400">
              Linking will allow you to log in using either your existing credentials or {provider}
            </p>
          </motion.div>

          {/* Benefits */}
          <motion.div 
            variants={itemVariants}
            className="mb-8 space-y-3"
          >
            <div className="flex items-start gap-3 p-3 rounded-lg bg-[#1A1A23] border border-gray-800">
              <Link2 className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="text-sm font-semibold text-white mb-1">Single Account</h3>
                <p className="text-xs text-gray-500">Both login methods will access the same account</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 rounded-lg bg-[#1A1A23] border border-gray-800">
              <Users className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="text-sm font-semibold text-white mb-1">Seamless Access</h3>
                <p className="text-xs text-gray-500">Choose any provider to log in</p>
              </div>
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div variants={itemVariants} className="flex gap-3">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleCancel}
              className="flex-1 px-4 py-3 rounded-lg bg-[#1A1A23] border border-gray-800 text-gray-300 hover:text-white hover:border-gray-700 transition-all duration-200 font-medium"
            >
              Cancel
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleLink}
              className="flex-1 relative group overflow-hidden rounded-lg"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600" />
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative flex items-center justify-center gap-2 py-3">
                <Link2 className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
                <span className="font-medium">Link Account</span>
              </div>
            </motion.button>
          </motion.div>

          {/* Help Link */}
          <motion.div 
            variants={itemVariants}
            className="mt-6 text-center"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              onClick={() => navigate("/support")}
              className="inline-flex items-center gap-1 text-xs text-gray-500 hover:text-blue-400 transition-colors duration-200"
            >
              <HelpCircle size={12} />
              <span>Need help? Contact support</span>
              <ExternalLink size={10} />
            </motion.button>
          </motion.div>

          {/* Security Note */}
          <motion.div 
            variants={itemVariants}
            className="flex items-center justify-center gap-1 mt-6 text-xs text-gray-700"
          >
            <Shield size={12} />
            <span>Secure account linking</span>
            <Sparkles size={12} className="ml-2 text-blue-500/50" />
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}