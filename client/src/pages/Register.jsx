import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import API from "../api/auth";

import {
  User,
  Mail,
  Lock,
  UserPlus,
  Github,
  Chrome,
  Shield,
  Eye,
  EyeOff,
  Loader2,
  Sparkles,
  CheckCircle,
  XCircle
} from "lucide-react";

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [passwordStrength, setPasswordStrength] = useState({
    score: 0,
    hasMinLength: false,
    hasUpperCase: false,
    hasLowerCase: false,
    hasNumber: false,
    hasSpecialChar: false
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value
    });

    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ""
      });
    }

    // Check password strength when password field changes
    if (name === "password") {
      checkPasswordStrength(value);
    }
  };

  const checkPasswordStrength = (password) => {
    setPasswordStrength({
      score: calculatePasswordScore(password),
      hasMinLength: password.length >= 8,
      hasUpperCase: /[A-Z]/.test(password),
      hasLowerCase: /[a-z]/.test(password),
      hasNumber: /[0-9]/.test(password),
      hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password)
    });
  };

  const calculatePasswordScore = (password) => {
    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) score++;
    return score;
  };

  const getPasswordStrengthText = () => {
    const score = passwordStrength.score;
    if (score === 0) return { text: "Very Weak", color: "text-red-500" };
    if (score <= 2) return { text: "Weak", color: "text-orange-500" };
    if (score <= 3) return { text: "Medium", color: "text-yellow-500" };
    if (score <= 4) return { text: "Strong", color: "text-green-500" };
    return { text: "Very Strong", color: "text-green-400" };
  };

  const validateForm = () => {
    const newErrors = {};

    // Username validation
    if (!form.username.trim()) {
      newErrors.username = "Username is required";
    } else if (form.username.length < 3) {
      newErrors.username = "Username must be at least 3 characters";
    } else if (form.username.length > 20) {
      newErrors.username = "Username must be less than 20 characters";
    }

    // Email validation
    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Password validation
    if (!form.password) {
      newErrors.password = "Password is required";
    } else if (form.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    } else if (passwordStrength.score < 3) {
      newErrors.password = "Password is too weak. Please include uppercase, lowercase, numbers, and special characters";
    }

    // Confirm password validation
    if (!form.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const res = await API.post("/auth/register", {
        username: form.username,
        email: form.email,
        password: form.password,
        confirmPassword: form.confirmPassword
      });

      // Show success message and redirect to login
      navigate("/verify-email-notice", {
        state: {
          email: form.email
        }
      });
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Registration failed. Please try again.";
      setErrors({ general: errorMessage });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleRegister = () => {
    window.location.href = "http://localhost:5000/api/auth/google";
  };

  const handleGithubRegister = () => {
    window.location.href = "http://localhost:5000/api/auth/github";
  };

  const handleMicrosoftRegister = () => {
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
        <div className="bg-[#0F0F15]/80 backdrop-blur-xl border border-blue-500/15 rounded-2xl shadow-2xl p-8 max-h-[90vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent no-scrollbar">

          {/* Header */}
          <motion.div variants={itemVariants} className="text-center mb-6">
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
                  <UserPlus className="w-8 h-8 text-white" />
                </div>
              </div>
            </div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-white via-blue-200 to-indigo-200 bg-clip-text text-transparent">
              Create Account
            </h2>
            <p className="text-gray-500 text-sm mt-2">
              Join us to get started with your journey
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

          {/* Registration Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Username Input */}
            <motion.div variants={itemVariants}>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  name="username"
                  type="text"
                  placeholder="Username"
                  value={form.username}
                  onChange={handleChange}
                  className={`w-full bg-[#1A1A23] border ${errors.username ? 'border-red-500/50' : 'border-gray-800'
                    } rounded-lg pl-10 pr-3 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all duration-200`}
                />
              </div>
              {errors.username && (
                <p className="text-red-400 text-xs mt-1 ml-1">{errors.username}</p>
              )}
            </motion.div>

            {/* Email Input */}
            <motion.div variants={itemVariants}>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  name="email"
                  type="email"
                  placeholder="Email Address"
                  value={form.email}
                  onChange={handleChange}
                  className={`w-full bg-[#1A1A23] border ${errors.email ? 'border-red-500/50' : 'border-gray-800'
                    } rounded-lg pl-10 pr-3 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all duration-200`}
                />
              </div>
              {errors.email && (
                <p className="text-red-400 text-xs mt-1 ml-1">{errors.email}</p>
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
                  className={`w-full bg-[#1A1A23] border ${errors.password ? 'border-red-500/50' : 'border-gray-800'
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

              {/* Password Strength Indicator */}
              {form.password && (
                <div className="mt-2 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex gap-1 flex-1">
                      {[1, 2, 3, 4, 5].map((level) => (
                        <div
                          key={level}
                          className={`h-1 flex-1 rounded-full transition-colors duration-300 ${level <= passwordStrength.score
                              ? level <= 2
                                ? 'bg-red-500'
                                : level <= 3
                                  ? 'bg-yellow-500'
                                  : 'bg-green-500'
                              : 'bg-gray-700'
                            }`}
                        />
                      ))}
                    </div>
                    <span className={`text-xs ml-2 ${getPasswordStrengthText().color}`}>
                      {getPasswordStrengthText().text}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <PasswordRequirement
                      met={passwordStrength.hasMinLength}
                      text="Min 8 characters"
                    />
                    <PasswordRequirement
                      met={passwordStrength.hasUpperCase}
                      text="Uppercase letter"
                    />
                    <PasswordRequirement
                      met={passwordStrength.hasLowerCase}
                      text="Lowercase letter"
                    />
                    <PasswordRequirement
                      met={passwordStrength.hasNumber}
                      text="Number"
                    />
                    <PasswordRequirement
                      met={passwordStrength.hasSpecialChar}
                      text="Special character"
                      className="col-span-2"
                    />
                  </div>
                </div>
              )}

              {errors.password && (
                <p className="text-red-400 text-xs mt-1 ml-1">{errors.password}</p>
              )}
            </motion.div>

            {/* Confirm Password Input */}
            <motion.div variants={itemVariants}>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm Password"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  className={`w-full bg-[#1A1A23] border ${errors.confirmPassword ? 'border-red-500/50' : 'border-gray-800'
                    } rounded-lg pl-10 pr-10 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all duration-200`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors duration-200"
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-red-400 text-xs mt-1 ml-1">{errors.confirmPassword}</p>
              )}
              {form.password && form.confirmPassword && form.password === form.confirmPassword && (
                <p className="text-green-400 text-xs mt-1 ml-1 flex items-center gap-1">
                  <CheckCircle size={12} />
                  Passwords match
                </p>
              )}
            </motion.div>

            {/* Submit Button */}
            <motion.button
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isLoading}
              className="w-full relative group overflow-hidden rounded-lg mt-6"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600" />
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative flex items-center justify-center gap-2 py-3">
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span className="font-medium">Creating account...</span>
                  </>
                ) : (
                  <>
                    <UserPlus className="w-5 h-5 group-hover:rotate-12 transition-transform duration-200" />
                    <span className="font-medium">Create Account</span>
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
              <span className="px-2 bg-[#0F0F15] text-gray-500">Or register with</span>
            </div>
          </motion.div>

          {/* Social Register Buttons */}
          <motion.div variants={itemVariants} className="space-y-3">
            {/* Google */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleGoogleRegister}
              className="w-full relative group overflow-hidden rounded-lg bg-[#1A1A23] border border-gray-800 hover:border-red-500/30 transition-all duration-200"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-red-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative flex items-center justify-center gap-2 py-3">
                <Chrome className="w-5 h-5 text-red-400" />
                <span className="font-medium text-gray-300 group-hover:text-white transition-colors duration-200">
                  Register with Google
                </span>
              </div>
            </motion.button>

            {/* GitHub */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleGithubRegister}
              className="w-full relative group overflow-hidden rounded-lg bg-[#1A1A23] border border-gray-800 hover:border-gray-600/30 transition-all duration-200"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-gray-500/10 to-gray-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative flex items-center justify-center gap-2 py-3">
                <Github className="w-5 h-5 text-gray-400" />
                <span className="font-medium text-gray-300 group-hover:text-white transition-colors duration-200">
                  Register with GitHub
                </span>
              </div>
            </motion.button>

            {/* Microsoft */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleMicrosoftRegister}
              className="w-full relative group overflow-hidden rounded-lg bg-[#1A1A23] border border-gray-800 hover:border-green-500/30 transition-all duration-200"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-green-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative flex items-center justify-center gap-2 py-3">
                <Shield className="w-5 h-5 text-green-400" />
                <span className="font-medium text-gray-300 group-hover:text-white transition-colors duration-200">
                  Register with Microsoft
                </span>
              </div>
            </motion.button>
          </motion.div>

          {/* Login Link */}
          <motion.p variants={itemVariants} className="text-sm text-center mt-6 text-gray-500">
            Already have an account?{' '}
            <a
              href="/"
              className="text-blue-400 hover:text-blue-300 font-medium transition-colors duration-200"
            >
              Sign in here
            </a>
          </motion.p>

          {/* Security Badge */}
          <motion.div
            variants={itemVariants}
            className="flex items-center justify-center gap-1 mt-4 text-xs text-gray-600"
          >
            <Sparkles className="w-3 h-3" />
            <span>Your data is encrypted and secure</span>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

// Password Requirement Component
function PasswordRequirement({ met, text, className = "" }) {
  return (
    <div className={`flex items-center gap-1 ${className}`}>
      {met ? (
        <CheckCircle size={12} className="text-green-400" />
      ) : (
        <XCircle size={12} className="text-gray-600" />
      )}
      <span className={met ? "text-gray-300" : "text-gray-600"}>{text}</span>
    </div>
  );
}