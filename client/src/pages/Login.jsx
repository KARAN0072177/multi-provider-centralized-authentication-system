import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import API from "../api/auth";

import {
  Mail,
  Lock,
  LogIn,
  Github,
  Chrome,
  Shield,
  Eye,
  EyeOff,
  Loader2,
  Sparkles
} from "lucide-react";

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    identifier: "",
    password: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
    // Clear error for this field when user starts typing
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: ""
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!form.identifier.trim()) {
      newErrors.identifier = "Email or username is required";
    }
    if (!form.password) {
      newErrors.password = "Password is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);

    try {
      const res = await API.post("/auth/login", form);
      localStorage.setItem("token", res.data.token);
      navigate("/home"); // Redirect to home on success
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Login failed. Please try again.";
      setErrors({ general: errorMessage });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:5000/api/auth/google";
  };

  const handleGithubLogin = () => {
    window.location.href = "http://localhost:5000/api/auth/github";
  };

  const handleMicrosoftLogin = () => {
    window.location.href = "http://localhost:5000/api/auth/microsoft";
  };

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
        className="relative w-full max-w-md px-4 z-10"
      >
        <div className="bg-[#0F0F15]/80 backdrop-blur-xl border border-blue-500/15 rounded-2xl shadow-2xl p-8">
          
          {/* Header */}
          <motion.div variants={itemVariants} className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="relative">
                <motion.div
                  animate={{
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full blur-2xl opacity-40"
                />
                <div className="relative p-3 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600">
                  <LogIn className="w-8 h-8 text-white" />
                </div>
              </div>
            </div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-white via-blue-200 to-indigo-200 bg-clip-text text-transparent">
              Welcome Back
            </h2>
            <p className="text-gray-500 text-sm mt-2">
              Sign in to continue to your account
            </p>
          </motion.div>

          {/* Error Message */}
          {errors.general && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg"
            >
              <p className="text-red-400 text-sm text-center">{errors.general}</p>
            </motion.div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Identifier Input */}
            <motion.div variants={itemVariants}>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  name="identifier"
                  type="text"
                  placeholder="Email or Username"
                  value={form.identifier}
                  onChange={handleChange}
                  className={`w-full bg-[#1A1A23] border ${
                    errors.identifier ? 'border-red-500/50' : 'border-gray-800'
                  } rounded-lg pl-10 pr-3 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all duration-200`}
                />
              </div>
              {errors.identifier && (
                <p className="text-red-400 text-xs mt-1 ml-1">{errors.identifier}</p>
              )}
            </motion.div>

            {/* Password Input */}
            <motion.div variants={itemVariants}>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={form.password}
                  onChange={handleChange}
                  className={`w-full bg-[#1A1A23] border ${
                    errors.password ? 'border-red-500/50' : 'border-gray-800'
                  } rounded-lg pl-10 pr-10 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all duration-200`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors duration-200"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-400 text-xs mt-1 ml-1">{errors.password}</p>
              )}
            </motion.div>

            {/* Forgot Password */}
            <motion.div variants={itemVariants} className="flex justify-end">
              <a 
                href="/forgot-password" 
                className="text-sm text-blue-400 hover:text-blue-300 transition-colors duration-200"
              >
                Forgot password?
              </a>
            </motion.div>

            {/* Submit Button */}
            <motion.button
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isLoading}
              className="w-full relative group overflow-hidden rounded-lg"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600" />
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative flex items-center justify-center gap-2 py-3">
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span className="font-medium">Logging in...</span>
                  </>
                ) : (
                  <>
                    <LogIn className="w-5 h-5 group-hover:rotate-12 transition-transform duration-200" />
                    <span className="font-medium">Sign In</span>
                  </>
                )}
              </div>
            </motion.button>
          </form>

          {/* Divider */}
          <motion.div variants={itemVariants} className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-800"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-[#0F0F15] text-gray-500">Or continue with</span>
            </div>
          </motion.div>

          {/* Social Login Buttons */}
          <motion.div variants={itemVariants} className="space-y-3">
            {/* Google */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleGoogleLogin}
              className="w-full relative group overflow-hidden rounded-lg bg-[#1A1A23] border border-gray-800 hover:border-red-500/30 transition-all duration-200"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-red-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative flex items-center justify-center gap-2 py-3">
                <Chrome className="w-5 h-5 text-red-400" />
                <span className="font-medium text-gray-300 group-hover:text-white transition-colors duration-200">
                  Continue with Google
                </span>
              </div>
            </motion.button>

            {/* GitHub */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleGithubLogin}
              className="w-full relative group overflow-hidden rounded-lg bg-[#1A1A23] border border-gray-800 hover:border-gray-600/30 transition-all duration-200"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-gray-500/10 to-gray-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative flex items-center justify-center gap-2 py-3">
                <Github className="w-5 h-5 text-gray-400" />
                <span className="font-medium text-gray-300 group-hover:text-white transition-colors duration-200">
                  Continue with GitHub
                </span>
              </div>
            </motion.button>

            {/* Microsoft */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleMicrosoftLogin}
              className="w-full relative group overflow-hidden rounded-lg bg-[#1A1A23] border border-gray-800 hover:border-green-500/30 transition-all duration-200"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-green-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative flex items-center justify-center gap-2 py-3">
                <Shield className="w-5 h-5 text-green-400" />
                <span className="font-medium text-gray-300 group-hover:text-white transition-colors duration-200">
                  Continue with Microsoft
                </span>
              </div>
            </motion.button>
          </motion.div>

          {/* Register Link */}
          <motion.p variants={itemVariants} className="text-sm text-center mt-6 text-gray-500">
            Don't have an account?{' '}
            <a 
              href="/register" 
              className="text-blue-400 hover:text-blue-300 font-medium transition-colors duration-200"
            >
              Create one now
            </a>
          </motion.p>

          {/* Security Badge */}
          <motion.div 
            variants={itemVariants}
            className="flex items-center justify-center gap-1 mt-4 text-xs text-gray-600"
          >
            <Sparkles className="w-3 h-3" />
            <span>Secure login powered by industry-standard encryption</span>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}