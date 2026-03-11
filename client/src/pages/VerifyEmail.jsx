import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import API from "../api/auth";

import {
  Mail,
  CheckCircle,
  XCircle,
  Loader2,
  Clock,
  ArrowRight,
  AlertCircle,
  RefreshCw,
  Sparkles,
  Shield,
  Lock
} from "lucide-react";

export default function VerifyEmail() {
  const [message, setMessage] = useState("Verifying your email...");
  const [status, setStatus] = useState("loading"); // loading, success, error
  const [countdown, setCountdown] = useState(5);
  const [params] = useSearchParams();
  const navigate = useNavigate();

  const particlesInit = async (engine) => {
    await loadSlim(engine);
  };

  useEffect(() => {
    const verify = async () => {
      const token = params.get("token");

      if (!token) {
        setMessage("Invalid verification link");
        setStatus("error");
        return;
      }

      try {
        const res = await API.post("/auth/verify-email", { token });
        setMessage(res.data.message);
        setStatus("success");
      } catch (err) {
        setMessage(err.response?.data?.message || "Verification failed");
        setStatus("error");
      }
    };

    verify();
  }, [params]);

  // Countdown timer for redirect
  useEffect(() => {
    if (status === "success" && countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(prev => prev - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (status === "success" && countdown === 0) {
      navigate("/");
    }
  }, [status, countdown, navigate]);

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
                <Mail className="w-12 h-12 text-blue-400" />
              </div>
            </div>
          </motion.div>

          {/* Title */}
          <motion.h1 
            variants={itemVariants}
            className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-white via-blue-200 to-indigo-200 bg-clip-text text-transparent"
          >
            Email Verification
          </motion.h1>

          {/* Status Card */}
          <motion.div variants={itemVariants} className="mb-8">
            <AnimatePresence mode="wait">
              {status === "loading" && (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center"
                >
                  <div className="flex justify-center mb-4">
                    <div className="relative">
                      <div className="absolute inset-0 bg-blue-500 rounded-full blur-xl animate-pulse" />
                      <Loader2 className="w-16 h-16 text-blue-400 animate-spin relative" />
                    </div>
                  </div>
                  <p className="text-gray-300 mb-2">{message}</p>
                  <p className="text-sm text-gray-500">Please wait while we verify your email</p>
                </motion.div>
              )}

              {status === "success" && (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center"
                >
                  <div className="flex justify-center mb-4">
                    <div className="relative">
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="absolute inset-0 bg-green-500 rounded-full blur-xl opacity-50"
                      />
                      <div className="relative p-4 rounded-full bg-gradient-to-r from-green-500 to-emerald-500">
                        <CheckCircle className="w-12 h-12 text-white" />
                      </div>
                    </div>
                  </div>
                  
                  <h2 className="text-2xl font-semibold text-green-400 mb-2">Success!</h2>
                  <p className="text-gray-300 mb-4">{message}</p>
                  
                  {/* Countdown Timer */}
                  <div className="mb-4">
                    <div className="flex items-center justify-center gap-2 text-sm text-gray-400">
                      <Clock size={16} className="text-blue-400" />
                      <span>Redirecting to login in</span>
                    </div>
                    <div className="mt-2 flex justify-center">
                      <div className="relative w-16 h-16">
                        {/* Circular Progress */}
                        <svg className="w-16 h-16 transform -rotate-90">
                          <circle
                            cx="32"
                            cy="32"
                            r="28"
                            stroke="currentColor"
                            strokeWidth="4"
                            fill="transparent"
                            className="text-gray-800"
                          />
                          <motion.circle
                            cx="32"
                            cy="32"
                            r="28"
                            stroke="currentColor"
                            strokeWidth="4"
                            fill="transparent"
                            className="text-blue-400"
                            initial={{ pathLength: 1 }}
                            animate={{ pathLength: countdown / 5 }}
                            transition={{ duration: 1, ease: "linear" }}
                            style={{
                              strokeDasharray: "175.9",
                              strokeDashoffset: "175.9"
                            }}
                          />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-2xl font-bold text-white">{countdown}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Manual redirect option */}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => navigate("/")}
                    className="group relative px-6 py-2 rounded-lg overflow-hidden inline-flex items-center gap-2"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600" />
                    <div className="relative flex items-center gap-2">
                      <span className="text-sm font-medium">Go to Login Now</span>
                      <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-200" />
                    </div>
                  </motion.button>
                </motion.div>
              )}

              {status === "error" && (
                <motion.div
                  key="error"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center"
                >
                  <div className="flex justify-center mb-4">
                    <div className="relative">
                      <div className="absolute inset-0 bg-red-500 rounded-full blur-xl opacity-50" />
                      <div className="relative p-4 rounded-full bg-gradient-to-r from-red-500 to-pink-500">
                        <XCircle className="w-12 h-12 text-white" />
                      </div>
                    </div>
                  </div>
                  
                  <h2 className="text-2xl font-semibold text-red-400 mb-2">Verification Failed</h2>
                  <p className="text-gray-300 mb-6">{message}</p>
                  
                  <div className="space-y-3">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => window.location.reload()}
                      className="group relative px-6 py-2 rounded-lg overflow-hidden inline-flex items-center gap-2 mr-3"
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
                      className="group relative px-6 py-2 rounded-lg overflow-hidden inline-flex items-center gap-2 bg-[#1A1A23] border border-gray-800"
                    >
                      <div className="relative flex items-center gap-2">
                        <span className="text-sm font-medium text-gray-300">Go to Login</span>
                        <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-200" />
                      </div>
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Security Note */}
          <motion.div 
            variants={itemVariants}
            className="p-4 rounded-xl bg-[#1A1A23] border border-gray-800"
          >
            <div className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="text-sm font-semibold text-white mb-1">Secure Verification</h3>
                <p className="text-xs text-gray-500">
                  Your email verification is protected with industry-standard encryption and secure tokens.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Decorative Elements */}
          <motion.div 
            variants={itemVariants}
            className="flex justify-center gap-1 mt-6 text-xs text-gray-700"
          >
            <Lock size={12} />
            <span>Secure Connection</span>
            <Sparkles size={12} className="ml-2 text-blue-500/50" />
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}