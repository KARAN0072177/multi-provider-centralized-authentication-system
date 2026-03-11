import { useState, useEffect } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import API from "../api/auth";
import { 
  Mail,
  CheckCircle,
  Clock,
  ArrowRight,
  RefreshCw,
  Sparkles,
  Shield,
  Inbox,
  Send,
  AlertCircle,
  Copy,
  Check,
  XCircle,
  Loader2
} from "lucide-react";

export default function VerifyEmailNotice() {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  const [verificationStatus, setVerificationStatus] = useState("pending"); // pending, verifying, verified, expired, error
  const [email, setEmail] = useState(location.state?.email || searchParams.get("email") || "");
  const [timeLeft, setTimeLeft] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const [resendStatus, setResendStatus] = useState("idle"); // idle, loading, success
  const [copied, setCopied] = useState(false);
  const [message, setMessage] = useState("");

  const particlesInit = async (engine) => {
    await loadSlim(engine);
  };

  // Check if token exists in URL (user just clicked verification link)
  useEffect(() => {
    const token = searchParams.get("token");
    
    if (token) {
      verifyEmailWithToken(token);
    } else {
      // Check if email was already verified in this session
      const verifiedStatus = sessionStorage.getItem("emailVerified");
      if (verifiedStatus === "true" && email) {
        setVerificationStatus("verified");
      }
    }
  }, [searchParams]);

  const verifyEmailWithToken = async (token) => {
    setVerificationStatus("verifying");
    
    try {
      const res = await API.post("/auth/verify-email", { token });
      setMessage(res.data.message);
      setVerificationStatus("verified");
      
      // Store verification status in session storage
      sessionStorage.setItem("emailVerified", "true");
      
      // Clear any existing token parameter from URL
      window.history.replaceState({}, document.title, window.location.pathname);
      
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Verification failed";
      setMessage(errorMessage);
      
      if (errorMessage.toLowerCase().includes("expired")) {
        setVerificationStatus("expired");
      } else {
        setVerificationStatus("error");
      }
    }
  };

  // Countdown timer for resend
  useEffect(() => {
    if (timeLeft > 0 && !canResend && verificationStatus === "pending") {
      const timer = setTimeout(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && verificationStatus === "pending") {
      setCanResend(true);
    }
  }, [timeLeft, canResend, verificationStatus]);

  const handleResendEmail = async () => {
    if (!canResend || !email) return;
    
    setResendStatus("loading");
    
    try {
      await API.post("/auth/resend-verification", { email });
      setResendStatus("success");
      setCanResend(false);
      setTimeLeft(60);
      
      // Reset success status after 3 seconds
      setTimeout(() => {
        setResendStatus("idle");
      }, 3000);
    } catch (err) {
      setResendStatus("idle");
      setMessage(err.response?.data?.message || "Failed to resend email");
    }
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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

  // Render verified state
  if (verificationStatus === "verified") {
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
            className="absolute w-[800px] h-[800px] bg-green-600/15 rounded-full blur-[200px] -top-40 -left-40"
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
              Email Verified!
            </motion.h1>

            <motion.p 
              variants={itemVariants}
              className="text-gray-300 mb-6"
            >
              {message || "Your email has been successfully verified. You can now close this tab and return to login."}
            </motion.p>

            <motion.div 
              variants={itemVariants}
              className="p-4 rounded-xl bg-[#1A1A23] border border-green-500/20 mb-6"
            >
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-green-400" />
                <span className="text-sm text-gray-300">{email}</span>
              </div>
            </motion.div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/")}
              className="group relative px-6 py-3 rounded-lg overflow-hidden inline-flex items-center gap-2"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-emerald-600" />
              <div className="relative flex items-center gap-2">
                <span className="text-sm font-medium">Go to Login</span>
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-200" />
              </div>
            </motion.button>

            <motion.div 
              variants={itemVariants}
              className="flex items-center justify-center gap-1 mt-6 text-xs text-gray-700"
            >
              <Shield size={12} className="text-green-400" />
              <span>Email verified successfully</span>
              <Sparkles size={12} className="ml-2 text-green-500/50" />
            </motion.div>
          </div>
        </motion.div>
      </div>
    );
  }

  // Render verifying state
  if (verificationStatus === "verifying") {
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
              Verifying Your Email
            </motion.h1>

            <motion.p 
              variants={itemVariants}
              className="text-gray-400"
            >
              Please wait while we verify your email address...
            </motion.p>
          </div>
        </motion.div>
      </div>
    );
  }

  // Render expired or error state
  if (verificationStatus === "expired" || verificationStatus === "error") {
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
                  {verificationStatus === "expired" ? (
                    <Clock className="w-12 h-12 text-white" />
                  ) : (
                    <XCircle className="w-12 h-12 text-white" />
                  )}
                </div>
              </div>
            </motion.div>

            <motion.h1 
              variants={itemVariants}
              className="text-2xl font-semibold text-red-400 mb-4"
            >
              {verificationStatus === "expired" ? "Link Expired" : "Verification Failed"}
            </motion.h1>

            <motion.p 
              variants={itemVariants}
              className="text-gray-300 mb-6"
            >
              {message || (verificationStatus === "expired" 
                ? "This verification link has expired. Request a new one below." 
                : "Something went wrong. Please try again.")}
            </motion.p>

            {email && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleResendEmail}
                disabled={resendStatus === "loading"}
                className="group relative px-6 py-3 rounded-lg overflow-hidden inline-flex items-center gap-2"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600" />
                <div className="relative flex items-center gap-2">
                  {resendStatus === "loading" ? (
                    <RefreshCw className="w-4 h-4 animate-spin" />
                  ) : (
                    <RefreshCw className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" />
                  )}
                  <span className="text-sm font-medium">
                    {resendStatus === "loading" ? "Sending..." : "Resend Verification Email"}
                  </span>
                </div>
              </motion.button>
            )}

            <motion.div 
              variants={itemVariants}
              className="mt-6"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate("/")}
                className="group inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors duration-200"
              >
                <ArrowRight size={14} className="rotate-180 group-hover:-translate-x-1 transition-transform duration-200" />
                <span>Back to Login</span>
              </motion.button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    );
  }

  // Default pending state (original VerifyEmailNotice)
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
                <Inbox className="w-12 h-12 text-blue-400" />
              </div>
            </div>
          </motion.div>

          {/* Title */}
          <motion.h1 
            variants={itemVariants}
            className="text-3xl font-bold text-center mb-2 bg-gradient-to-r from-white via-blue-200 to-indigo-200 bg-clip-text text-transparent"
          >
            Check Your Email
          </motion.h1>
          
          <motion.p 
            variants={itemVariants}
            className="text-center text-gray-400 mb-8"
          >
            We've sent a verification link to your email address
          </motion.p>

          {/* Email Card */}
          <motion.div 
            variants={itemVariants}
            className="mb-8 p-6 rounded-xl bg-gradient-to-br from-blue-500/10 via-indigo-500/10 to-purple-500/10 border border-blue-500/20"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-blue-500/20">
                  <Mail className="w-5 h-5 text-blue-400" />
                </div>
                <span className="text-sm text-gray-400">Verification email sent to:</span>
              </div>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleCopyEmail}
                className="p-2 rounded-lg bg-[#1A1A23] border border-gray-800 hover:border-blue-500/30 transition-all duration-200 group"
              >
                {copied ? (
                  <Check size={14} className="text-green-400" />
                ) : (
                  <Copy size={14} className="text-gray-400 group-hover:text-blue-400 transition-colors duration-200" />
                )}
              </motion.button>
            </div>

            <div className="text-center">
              <p className="text-xl font-semibold text-white mb-2 break-all">{email}</p>
              <div className="flex items-center justify-center gap-2 text-sm">
                <Send size={12} className="text-blue-400" />
                <span className="text-gray-500">Check your inbox and spam folder</span>
              </div>
            </div>
          </motion.div>

          {/* Instructions */}
          <motion.div variants={itemVariants} className="space-y-4 mb-8">
            <div className="flex items-start gap-3 p-3 rounded-lg bg-[#1A1A23] border border-gray-800">
              <div className="w-5 h-5 rounded-full bg-blue-500/20 text-blue-400 text-xs flex items-center justify-center flex-shrink-0 mt-0.5">1</div>
              <p className="text-sm text-gray-300">Open the email we sent to <span className="text-blue-400">{email}</span></p>
            </div>
            
            <div className="flex items-start gap-3 p-3 rounded-lg bg-[#1A1A23] border border-gray-800">
              <div className="w-5 h-5 rounded-full bg-blue-500/20 text-blue-400 text-xs flex items-center justify-center flex-shrink-0 mt-0.5">2</div>
              <p className="text-sm text-gray-300">Click the verification link in the email</p>
            </div>
            
            <div className="flex items-start gap-3 p-3 rounded-lg bg-[#1A1A23] border border-gray-800">
              <div className="w-5 h-5 rounded-full bg-blue-500/20 text-blue-400 text-xs flex items-center justify-center flex-shrink-0 mt-0.5">3</div>
              <p className="text-sm text-gray-300">Return to login and access your account</p>
            </div>
          </motion.div>

          {/* Resend Section */}
          <motion.div variants={itemVariants} className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-gray-400">Didn't receive the email?</span>
              
              {!canResend && (
                <div className="flex items-center gap-1 text-sm text-gray-500">
                  <Clock size={14} />
                  <span>{timeLeft}s</span>
                </div>
              )}
            </div>

            <motion.button
              whileHover={canResend ? { scale: 1.02 } : {}}
              whileTap={canResend ? { scale: 0.98 } : {}}
              onClick={handleResendEmail}
              disabled={!canResend || resendStatus === "loading"}
              className={`w-full relative group overflow-hidden rounded-lg ${
                canResend && resendStatus !== "loading"
                  ? "cursor-pointer"
                  : "cursor-not-allowed opacity-50"
              }`}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600" />
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="relative flex items-center justify-center gap-2 py-3">
                {resendStatus === "loading" ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span className="text-sm font-medium">Sending...</span>
                  </>
                ) : resendStatus === "success" ? (
                  <>
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span className="text-sm font-medium">Verification email sent!</span>
                  </>
                ) : (
                  <>
                    <RefreshCw className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" />
                    <span className="text-sm font-medium">
                      {canResend ? "Resend Verification Email" : "Wait to resend"}
                    </span>
                  </>
                )}
              </div>
            </motion.button>
          </motion.div>

          {/* Help Section */}
          <motion.div 
            variants={itemVariants}
            className="p-4 rounded-xl bg-[#1A1A23] border border-gray-800"
          >
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="text-sm font-semibold text-white mb-1">Need help?</h3>
                <p className="text-xs text-gray-500 mb-2">
                  Check your spam folder. If you still don't see the email, try resending or contact support.
                </p>
                <motion.button
                  whileHover={{ x: 4 }}
                  onClick={() => navigate("/support")}
                  className="text-xs text-blue-400 hover:text-blue-300 transition-colors duration-200 flex items-center gap-1"
                >
                  Contact Support
                  <ArrowRight size={10} />
                </motion.button>
              </div>
            </div>
          </motion.div>

          {/* Return to Login */}
          <motion.div 
            variants={itemVariants}
            className="mt-6 text-center"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/")}
              className="group inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors duration-200"
            >
              <ArrowRight size={14} className="rotate-180 group-hover:-translate-x-1 transition-transform duration-200" />
              <span>Back to Login</span>
            </motion.button>
          </motion.div>

          {/* Security Note */}
          <motion.div 
            variants={itemVariants}
            className="flex items-center justify-center gap-1 mt-6 text-xs text-gray-700"
          >
            <Shield size={12} />
            <span>Secure verification process</span>
            <Sparkles size={12} className="ml-2 text-blue-500/50" />
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}