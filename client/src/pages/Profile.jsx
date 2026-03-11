import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import API from "../api/auth";

import {
  Mail,
  User,
  Calendar,
  LogOut,
  Github,
  Chrome,
  KeyRound,
  ShieldCheck,
  Loader2,
  Sparkles,
  Award,
  Clock,
  Globe,
  Link as LinkIcon,
  Twitter,
  Facebook,
  Instagram,
  CheckCircle,
  XCircle,
  MoreVertical,
  Settings,
  Bell,
  Shield,
  Activity,
  Fingerprint,
  Eye,
  EyeOff,
  Smartphone,
  Laptop,
  MapPin,
  Lock,
  AlertTriangle,
  Moon,
  Sun,
  Volume2,
  VolumeX,
  MessageCircle,
  Mail as MailIcon,
  Phone,
  Monitor,
  Cloud,
  Download,
  Upload,
  RefreshCw,
  History,
  FileText,
  CreditCard,
  Gift,
  LogIn,
  Zap,
  Thermometer
} from "lucide-react";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  const [showSettings, setShowSettings] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await API.get("/user/profile");
        setUser(res.data);
      } catch (error) {
        navigate("/");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  const particlesInit = async (engine) => {
    await loadSlim(engine);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const generateInitialAvatar = (username) => {
    if (!username) return "";

    const initials = username
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);

    return `https://ui-avatars.com/api/?name=${initials}&background=linear-gradient(135deg%2C%233b82f6%2C%238b5cf6)&color=fff&size=200&font-size=0.5&bold=true`;
  };

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
          className="absolute inset-0"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="relative z-10 flex flex-col items-center gap-4"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-blue-500 rounded-full blur-xl animate-pulse"></div>
            <Loader2 className="w-12 h-12 text-blue-400 animate-spin relative" />
          </div>
          <motion.p
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-blue-300/80 text-lg font-light"
          >
            Loading your profile...
          </motion.p>
        </motion.div>
      </div>
    );
  }

  if (!user) return null;

  const avatar = user.loginMethod !== "Email" && user.avatar
    ? user.avatar
    : generateInitialAvatar(user.username);

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

  const tabs = [
    { id: "overview", label: "Overview", icon: User },
    { id: "activity", label: "Activity", icon: Activity },
    { id: "security", label: "Security", icon: Shield },
    { id: "notifications", label: "Notifications", icon: Bell }
  ];

  // Mock activity data
  const activityData = [
    {
      id: 1,
      type: "login",
      device: "Chrome on Windows",
      location: "New York, USA",
      ip: "192.168.1.1",
      time: "2 minutes ago",
      status: "success",
      icon: Laptop
    },
    {
      id: 2,
      type: "login",
      device: "Safari on iPhone",
      location: "London, UK",
      ip: "192.168.1.2",
      time: "3 hours ago",
      status: "success",
      icon: Smartphone
    },
    {
      id: 3,
      type: "settings_change",
      device: "Firefox on MacOS",
      location: "Toronto, Canada",
      ip: "192.168.1.3",
      time: "1 day ago",
      status: "warning",
      icon: Settings,
      change: "Password updated"
    },
    {
      id: 4,
      type: "login",
      device: "Edge on Windows",
      location: "Sydney, Australia",
      ip: "192.168.1.4",
      time: "2 days ago",
      status: "failed",
      icon: Laptop,
      reason: "Invalid password"
    },
    {
      id: 5,
      type: "provider_linked",
      device: "Chrome on Linux",
      location: "Berlin, Germany",
      ip: "192.168.1.5",
      time: "3 days ago",
      status: "success",
      icon: Github,
      provider: "GitHub"
    },
    {
      id: 6,
      type: "profile_update",
      device: "Chrome on Windows",
      location: "Mumbai, India",
      ip: "192.168.1.6",
      time: "5 days ago",
      status: "success",
      icon: User,
      change: "Profile picture updated"
    }
  ];

  // Mock security data
  const securityData = {
    twoFactor: false,
    trustedDevices: [
      { id: 1, name: "Windows Workstation", lastUsed: "2 minutes ago", icon: Monitor, current: true },
      { id: 2, name: "iPhone 14 Pro", lastUsed: "3 hours ago", icon: Smartphone },
      { id: 3, name: "MacBook Pro", lastUsed: "1 day ago", icon: Laptop }
    ],
    recentAlerts: [
      { id: 1, type: "New device login", time: "2 minutes ago", severity: "info", device: "Windows Workstation" },
      { id: 2, type: "Failed login attempt", time: "2 days ago", severity: "warning", location: "Unknown location" },
      { id: 3, type: "Password changed", time: "1 week ago", severity: "success" },
      { id: 4, type: "New provider linked", time: "3 days ago", severity: "info", provider: "GitHub" }
    ],
    passwordLastChanged: "2 weeks ago",
    securityScore: 85
  };

  // Mock notification preferences
  const notificationPrefs = {
    email: {
      marketing: true,
      security: true,
      updates: false,
      newsletter: true
    },
    push: {
      loginAlerts: true,
      securityAlerts: true,
      mentions: true,
      comments: false
    },
    sms: {
      twoFactor: true,
      alerts: false,
      promotions: false
    },
    inApp: {
      messages: true,
      friendRequests: true,
      systemUpdates: true
    }
  };

  const notificationHistory = [
    { id: 1, type: "security", title: "New login from Windows", time: "2 minutes ago", read: false, icon: Shield },
    { id: 2, type: "social", title: "John Doe started following you", time: "1 hour ago", read: false, icon: User },
    { id: 3, type: "system", title: "Your profile is 80% complete", time: "3 hours ago", read: true, icon: Award },
    { id: 4, type: "security", title: "Two-factor authentication reminder", time: "1 day ago", read: true, icon: Lock },
    { id: 5, type: "social", title: "Your post received 5 likes", time: "2 days ago", read: true, icon: Activity }
  ];

  return (
    <div className="min-h-screen bg-[#0A0A0F] text-white relative overflow-hidden">
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
              value: 50,
              density: { enable: true, area: 800 }
            },
            opacity: {
              value: 0.2,
              random: true,
              animation: { enable: true, speed: 0.5, minimumValue: 0.1 }
            },
            size: {
              value: { min: 1, max: 4 },
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
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
          className="absolute w-[600px] h-[600px] bg-purple-600/15 rounded-full blur-[150px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        />
      </div>

      {/* Main Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
      >
        {/* Profile Header Card */}
        <motion.div variants={itemVariants} className="mb-8">
          <div className="bg-[#0F0F15]/80 backdrop-blur-xl border border-blue-500/15 rounded-2xl p-8 relative overflow-hidden group">
            {/* Animated gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="relative flex flex-col md:flex-row items-center gap-8">
              {/* Avatar with enhanced effects */}
              <div className="relative">
                <motion.div
                  animate={{
                    scale: [1, 1.05, 1],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full blur-2xl opacity-40"
                />
                <div className="relative p-[3px] rounded-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500">
                  <div className="relative">
                    <img
                      src={avatar}
                      alt={user.username}
                      className="w-32 h-32 rounded-full border-4 border-[#0F0F15]"
                    />
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.5, type: "spring" }}
                      className="absolute -bottom-2 -right-2 bg-green-500 rounded-full p-1.5 border-4 border-[#0F0F15]"
                    >
                      <div className="w-2 h-2 bg-white rounded-full" />
                    </motion.div>
                  </div>
                </div>
              </div>

              {/* User info */}
              <div className="flex-1 text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                  <h1 className="text-4xl font-bold bg-gradient-to-r from-white via-blue-200 to-indigo-200 bg-clip-text text-transparent">
                    {user.username}
                  </h1>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  >
                    <Sparkles className="w-6 h-6 text-yellow-400" />
                  </motion.div>
                </div>

                <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 mb-4">
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20">
                    <Mail size={14} className="text-blue-400" />
                    <span className="text-sm text-blue-300">{user.email}</span>
                  </div>

                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20">
                    <Award size={14} className="text-purple-400" />
                    <span className="text-sm text-purple-300">Pro Member</span>
                  </div>

                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20">
                    <Clock size={14} className="text-indigo-400" />
                    <span className="text-sm text-indigo-300">
                      Joined {new Date(user.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                    </span>
                  </div>
                </div>

                {/* Stats */}
                <div className="flex items-center justify-center md:justify-start gap-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">47</div>
                    <div className="text-xs text-gray-500">Projects</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">12</div>
                    <div className="text-xs text-gray-500">Followers</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">89</div>
                    <div className="text-xs text-gray-500">Contributions</div>
                  </div>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex gap-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowSettings(!showSettings)}
                  className="p-2 rounded-lg bg-[#1A1A23]/50 hover:bg-[#1A1A23] transition-colors duration-200 border border-gray-800/50 cursor-pointer"
                >
                  <Settings size={20} className="text-gray-400" />
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Tabs Navigation */}
        <motion.div variants={itemVariants} className="mb-8">
          <div className="flex items-center gap-2 p-1 bg-[#0F0F15]/80 backdrop-blur-sm rounded-2xl border border-gray-800/50 w-fit">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative px-5 py-2.5 rounded-xl flex items-center gap-2 transition-all duration-200 cursor-pointer ${
                  activeTab === tab.id
                    ? "text-white"
                    : "text-gray-500 hover:text-gray-300"
                }`}
              >
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <tab.icon size={16} className="relative z-10" />
                <span className="relative z-10 text-sm font-medium">{tab.label}</span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          {activeTab === "overview" && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="w-full"
            >
              <div className="grid lg:grid-cols-3 gap-8">
                {/* Left Column */}
                <div className="lg:col-span-2 space-y-8">
                  {/* Info Grid */}
                  <div className="grid sm:grid-cols-2 gap-6">
                    <InfoCard
                      icon={<User size={18} />}
                      label="Login Method"
                      value={user.loginMethod}
                      gradient="from-blue-500 to-indigo-500"
                    />
                    <InfoCard
                      icon={<Calendar size={18} />}
                      label="Member Since"
                      value={new Date(user.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                      gradient="from-purple-500 to-pink-500"
                    />
                    <InfoCard
                      icon={<Globe size={18} />}
                      label="Timezone"
                      value="UTC+5:30 (IST)"
                      gradient="from-green-500 to-emerald-500"
                    />
                    <InfoCard
                      icon={<LinkIcon size={18} />}
                      label="Last Active"
                      value="2 minutes ago"
                      gradient="from-orange-500 to-red-500"
                    />
                  </div>

                  {/* Connected Providers */}
                  <div>
                    <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                      <span className="w-1 h-6 bg-gradient-to-b from-blue-500 to-indigo-500 rounded-full" />
                      Connected Providers
                    </h2>

                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                      <Provider
                        icon={<KeyRound size={20} />}
                        name="Email"
                        active={user.linkedAccounts?.emailPassword}
                        color="blue"
                      />
                      <Provider
                        icon={<Chrome size={20} />}
                        name="Google"
                        active={user.linkedAccounts?.google}
                        color="yellow"
                      />
                      <Provider
                        icon={<Github size={20} />}
                        name="GitHub"
                        active={user.linkedAccounts?.github}
                        color="gray"
                      />
                      <Provider
                        icon={<ShieldCheck size={20} />}
                        name="Microsoft"
                        active={user.linkedAccounts?.microsoft}
                        color="purple"
                      />
                    </div>
                  </div>
                </div>

                {/* Right Column - Activity & Social */}
                <div className="space-y-8">
                  {/* Recent Activity */}
                  <div>
                    <div className="bg-[#0F0F15]/80 backdrop-blur-sm border border-blue-500/15 rounded-2xl p-6">
                      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                        <Activity size={18} className="text-blue-400" />
                        Recent Activity
                      </h3>
                      <div className="space-y-4">
                        {activityData.slice(0, 4).map((activity) => (
                          <div key={activity.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-[#1A1A23]/50 transition-colors duration-200 cursor-pointer">
                            <div className={`p-1.5 rounded-lg ${
                              activity.status === 'success' ? 'bg-green-500/20' :
                              activity.status === 'warning' ? 'bg-yellow-500/20' :
                              'bg-red-500/20'
                            }`}>
                              <activity.icon size={14} className={
                                activity.status === 'success' ? 'text-green-400' :
                                activity.status === 'warning' ? 'text-yellow-400' :
                                'text-red-400'
                              } />
                            </div>
                            <div className="flex-1">
                              <p className="text-sm text-gray-300">
                                {activity.type === 'login' && `Logged in from ${activity.device}`}
                                {activity.type === 'settings_change' && activity.change}
                                {activity.type === 'provider_linked' && `Linked ${activity.provider} account`}
                                {activity.type === 'profile_update' && activity.change}
                              </p>
                              <p className="text-xs text-gray-600">{activity.time}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Social Links */}
                  <div>
                    <div className="bg-[#0F0F15]/80 backdrop-blur-sm border border-blue-500/15 rounded-2xl p-6">
                      <h3 className="text-lg font-semibold mb-4">Social Profiles</h3>
                      <div className="space-y-3">
                        <SocialLink icon={<Twitter />} name="Twitter" handle="@johndoe" connected={false} />
                        <SocialLink icon={<Github />} name="GitHub" handle="@johndoe" connected={true} />
                        <SocialLink icon={<Instagram />} name="Instagram" handle="@johndoe" connected={false} />
                        <SocialLink icon={<Facebook />} name="Facebook" handle="john.doe" connected={false} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "activity" && (
            <motion.div
              key="activity"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="w-full"
            >
              <div className="bg-[#0F0F15]/80 backdrop-blur-sm border border-blue-500/15 rounded-2xl p-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-semibold flex items-center gap-2">
                    <Activity className="text-blue-400" />
                    Activity History
                  </h2>
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-yellow-500/10 border border-yellow-500/20">
                    <Zap size={14} className="text-yellow-400" />
                    <span className="text-xs text-yellow-300">Future Scope: Advanced Analytics</span>
                  </div>
                </div>

                {/* Activity Stats */}
                <div className="grid grid-cols-4 gap-4 mb-8">
                  {[
                    { label: "Total Logins", value: "156", icon: LogIn, color: "blue" },
                    { label: "Active Days", value: "45", icon: Calendar, color: "green" },
                    { label: "Devices", value: "3", icon: Smartphone, color: "purple" },
                    { label: "Locations", value: "7", icon: MapPin, color: "orange" }
                  ].map((stat, index) => (
                    <div key={index} className="bg-[#1A1A23]/50 rounded-xl p-4 border border-gray-800">
                      <stat.icon className={`w-5 h-5 text-${stat.color}-400 mb-2`} />
                      <div className="text-2xl font-bold text-white">{stat.value}</div>
                      <div className="text-xs text-gray-500">{stat.label}</div>
                    </div>
                  ))}
                </div>

                {/* Activity Timeline */}
                <div className="space-y-4">
                  {activityData.map((activity) => (
                    <motion.div
                      key={activity.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="flex items-start gap-4 p-4 rounded-xl bg-[#1A1A23]/30 border border-gray-800 hover:border-blue-500/30 transition-all duration-200 cursor-pointer"
                    >
                      <div className={`p-2 rounded-lg ${
                        activity.status === 'success' ? 'bg-green-500/20' :
                        activity.status === 'warning' ? 'bg-yellow-500/20' :
                        'bg-red-500/20'
                      }`}>
                        <activity.icon size={18} className={
                          activity.status === 'success' ? 'text-green-400' :
                          activity.status === 'warning' ? 'text-yellow-400' :
                          'text-red-400'
                        } />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <p className="text-sm font-medium text-white">
                            {activity.type.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                          </p>
                          <span className="text-xs text-gray-500">{activity.time}</span>
                        </div>
                        <p className="text-xs text-gray-400 mb-1">
                          {activity.device} • {activity.location}
                        </p>
                        <p className="text-xs text-gray-500">
                          IP: {activity.ip}
                          {activity.reason && ` • Reason: ${activity.reason}`}
                          {activity.change && ` • ${activity.change}`}
                          {activity.provider && ` • Provider: ${activity.provider}`}
                        </p>
                      </div>
                      {activity.status === 'failed' && (
                        <div className="px-2 py-1 rounded-full bg-red-500/10 border border-red-500/20">
                          <span className="text-xs text-red-400">Failed</span>
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>

                {/* Future Scope Features */}
                <div className="mt-8 p-6 rounded-xl bg-gradient-to-r from-blue-500/5 to-indigo-500/5 border border-blue-500/20">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-yellow-400" />
                    Coming Soon to Activity
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                      { icon: History, label: "Activity Export" },
                      { icon: Download, label: "Download Logs" },
                      { icon: RefreshCw, label: "Real-time Sync" },
                      { icon: FileText, label: "Detailed Reports" }
                    ].map((item, index) => (
                      <div key={index} className="flex items-center gap-2 p-3 rounded-lg bg-[#1A1A23]/50 border border-gray-800">
                        <item.icon size={16} className="text-blue-400" />
                        <span className="text-xs text-gray-300">{item.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "security" && (
            <motion.div
              key="security"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="w-full"
            >
              <div className="bg-[#0F0F15]/80 backdrop-blur-sm border border-blue-500/15 rounded-2xl p-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-semibold flex items-center gap-2">
                    <Shield className="text-blue-400" />
                    Security Settings
                  </h2>
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-yellow-500/10 border border-yellow-500/20">
                    <Zap size={14} className="text-yellow-400" />
                    <span className="text-xs text-yellow-300">Future Scope: Advanced Security</span>
                  </div>
                </div>

                {/* Security Score */}
                <div className="mb-8 p-6 rounded-xl bg-gradient-to-r from-blue-500/5 to-indigo-500/5 border border-blue-500/20">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-white">Security Score</h3>
                      <p className="text-sm text-gray-400">Based on your current security settings</p>
                    </div>
                    <div className="relative">
                      <svg className="w-24 h-24 transform -rotate-90">
                        <circle
                          className="text-gray-800"
                          strokeWidth="8"
                          stroke="currentColor"
                          fill="transparent"
                          r="38"
                          cx="48"
                          cy="48"
                        />
                        <circle
                          className="text-green-400"
                          strokeWidth="8"
                          strokeDasharray={2 * Math.PI * 38}
                          strokeDashoffset={2 * Math.PI * 38 * (1 - securityData.securityScore / 100)}
                          strokeLinecap="round"
                          stroke="currentColor"
                          fill="transparent"
                          r="38"
                          cx="48"
                          cy="48"
                        />
                      </svg>
                      <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-2xl font-bold text-white">
                        {securityData.securityScore}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="grid lg:grid-cols-2 gap-8">
                  {/* Left Column */}
                  <div className="space-y-6">
                    {/* Two Factor Authentication */}
                    <div className="p-6 rounded-xl bg-[#1A1A23]/30 border border-gray-800">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <Fingerprint className="w-5 h-5 text-blue-400" />
                          <h3 className="font-semibold text-white">Two-Factor Authentication</h3>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          securityData.twoFactor ? 'bg-green-500/20 text-green-300' : 'bg-gray-800/50 text-gray-400'
                        }`}>
                          {securityData.twoFactor ? 'Enabled' : 'Disabled'}
                        </span>
                      </div>
                      <p className="text-sm text-gray-400 mb-4">
                        Add an extra layer of security to your account by requiring a verification code in addition to your password.
                      </p>
                      <button className="text-sm text-blue-400 hover:text-blue-300 transition-colors duration-200 cursor-pointer">
                        {securityData.twoFactor ? 'Configure' : 'Enable'} 2FA →
                      </button>
                    </div>

                    {/* Password Section */}
                    <div className="p-6 rounded-xl bg-[#1A1A23]/30 border border-gray-800">
                      <div className="flex items-center gap-3 mb-4">
                        <Lock className="w-5 h-5 text-blue-400" />
                        <h3 className="font-semibold text-white">Password</h3>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-400">Last changed: {securityData.passwordLastChanged}</p>
                        </div>
                        <button className="px-4 py-2 rounded-lg bg-blue-500/10 text-blue-300 hover:bg-blue-500/20 transition-colors duration-200 text-sm cursor-pointer">
                          Change Password
                        </button>
                      </div>
                    </div>

                    {/* Recent Security Alerts */}
                    <div className="p-6 rounded-xl bg-[#1A1A23]/30 border border-gray-800">
                      <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4 text-yellow-400" />
                        Recent Security Alerts
                      </h3>
                      <div className="space-y-3">
                        {securityData.recentAlerts.map((alert) => (
                          <div key={alert.id} className="flex items-start gap-3 p-2 rounded-lg hover:bg-[#1A1A23]/50 transition-colors duration-200">
                            <div className={`p-1 rounded-full ${
                              alert.severity === 'info' ? 'bg-blue-500/20' :
                              alert.severity === 'warning' ? 'bg-yellow-500/20' :
                              'bg-green-500/20'
                            }`}>
                              <div className={`w-1.5 h-1.5 rounded-full ${
                                alert.severity === 'info' ? 'bg-blue-400' :
                                alert.severity === 'warning' ? 'bg-yellow-400' :
                                'bg-green-400'
                              }`} />
                            </div>
                            <div className="flex-1">
                              <p className="text-sm text-gray-300">{alert.type}</p>
                              <p className="text-xs text-gray-500">{alert.time}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right Column */}
                  <div className="space-y-6">
                    {/* Trusted Devices */}
                    <div className="p-6 rounded-xl bg-[#1A1A23]/30 border border-gray-800">
                      <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
                        <Monitor className="w-4 h-4 text-blue-400" />
                        Trusted Devices
                      </h3>
                      <div className="space-y-3">
                        {securityData.trustedDevices.map((device) => (
                          <div key={device.id} className="flex items-center justify-between p-3 rounded-lg bg-[#1A1A23]/50 hover:bg-[#1A1A23] transition-colors duration-200 cursor-pointer">
                            <div className="flex items-center gap-3">
                              <device.icon size={18} className="text-gray-400" />
                              <div>
                                <p className="text-sm text-white">{device.name}</p>
                                <p className="text-xs text-gray-500">Last used: {device.lastUsed}</p>
                              </div>
                            </div>
                            {device.current && (
                              <span className="text-xs px-2 py-1 rounded-full bg-green-500/10 text-green-400">
                                Current
                              </span>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Active Sessions */}
                    <div className="p-6 rounded-xl bg-[#1A1A23]/30 border border-gray-800">
                      <h3 className="font-semibold text-white mb-4">Active Sessions</h3>
                      <div className="space-y-3">
                        {activityData.slice(0, 2).map((session) => (
                          <div key={session.id} className="flex items-center justify-between p-3 rounded-lg bg-[#1A1A23]/50">
                            <div className="flex items-center gap-3">
                              <session.icon size={18} className="text-gray-400" />
                              <div>
                                <p className="text-sm text-white">{session.device}</p>
                                <p className="text-xs text-gray-500">{session.location}</p>
                              </div>
                            </div>
                            <button className="text-xs text-red-400 hover:text-red-300 transition-colors duration-200 cursor-pointer">
                              Revoke
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Future Scope Features */}
                <div className="mt-8 p-6 rounded-xl bg-gradient-to-r from-blue-500/5 to-indigo-500/5 border border-blue-500/20">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-yellow-400" />
                    Coming Soon to Security
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                      { icon: Fingerprint, label: "Biometric Auth" },
                      { icon: Eye, label: "Privacy Controls" },
                      { icon: Shield, label: "Advanced Protection" },
                      { icon: KeyRound, label: "Passkeys" }
                    ].map((item, index) => (
                      <div key={index} className="flex items-center gap-2 p-3 rounded-lg bg-[#1A1A23]/50 border border-gray-800">
                        <item.icon size={16} className="text-blue-400" />
                        <span className="text-xs text-gray-300">{item.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "notifications" && (
            <motion.div
              key="notifications"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="w-full"
            >
              <div className="bg-[#0F0F15]/80 backdrop-blur-sm border border-blue-500/15 rounded-2xl p-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-semibold flex items-center gap-2">
                    <Bell className="text-blue-400" />
                    Notification Preferences
                  </h2>
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-yellow-500/10 border border-yellow-500/20">
                    <Zap size={14} className="text-yellow-400" />
                    <span className="text-xs text-yellow-300">Future Scope: Advanced Notifications</span>
                  </div>
                </div>

                {/* Recent Notifications */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold mb-4">Recent Notifications</h3>
                  <div className="space-y-3">
                    {notificationHistory.map((notification) => (
                      <div
                        key={notification.id}
                        className={`flex items-start gap-4 p-4 rounded-xl border transition-all duration-200 cursor-pointer ${
                          notification.read
                            ? 'bg-[#1A1A23]/30 border-gray-800 hover:border-blue-500/30'
                            : 'bg-blue-500/5 border-blue-500/20 hover:border-blue-500/40'
                        }`}
                      >
                        <div className={`p-2 rounded-lg ${
                          notification.type === 'security' ? 'bg-red-500/20' :
                          notification.type === 'social' ? 'bg-green-500/20' :
                          'bg-blue-500/20'
                        }`}>
                          <notification.icon size={16} className={
                            notification.type === 'security' ? 'text-red-400' :
                            notification.type === 'social' ? 'text-green-400' :
                            'text-blue-400'
                          } />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <p className="text-sm font-medium text-white">{notification.title}</p>
                            {!notification.read && (
                              <span className="text-xs px-2 py-1 rounded-full bg-blue-500/20 text-blue-300">
                                New
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Notification Settings Grid */}
                <div className="grid lg:grid-cols-2 gap-8">
                  {/* Email Notifications */}
                  <div className="space-y-4">
                    <h3 className="font-semibold text-white flex items-center gap-2">
                      <MailIcon size={18} className="text-blue-400" />
                      Email Notifications
                    </h3>
                    <div className="space-y-3">
                      <NotificationToggle
                        label="Marketing emails"
                        description="Receive updates about new features and promotions"
                        enabled={notificationPrefs.email.marketing}
                      />
                      <NotificationToggle
                        label="Security alerts"
                        description="Get notified about important security events"
                        enabled={notificationPrefs.email.security}
                      />
                      <NotificationToggle
                        label="Product updates"
                        description="Stay informed about new releases"
                        enabled={notificationPrefs.email.updates}
                      />
                      <NotificationToggle
                        label="Newsletter"
                        description="Weekly digest of platform news"
                        enabled={notificationPrefs.email.newsletter}
                      />
                    </div>
                  </div>

                  {/* Push Notifications */}
                  <div className="space-y-4">
                    <h3 className="font-semibold text-white flex items-center gap-2">
                      <Smartphone size={18} className="text-blue-400" />
                      Push Notifications
                    </h3>
                    <div className="space-y-3">
                      <NotificationToggle
                        label="Login alerts"
                        description="Get notified of new logins to your account"
                        enabled={notificationPrefs.push.loginAlerts}
                      />
                      <NotificationToggle
                        label="Security notifications"
                        description="Important security updates"
                        enabled={notificationPrefs.push.securityAlerts}
                      />
                      <NotificationToggle
                        label="Mentions"
                        description="When someone mentions you"
                        enabled={notificationPrefs.push.mentions}
                      />
                      <NotificationToggle
                        label="Comments"
                        description="Replies to your comments"
                        enabled={notificationPrefs.push.comments}
                      />
                    </div>
                  </div>

                  {/* SMS Notifications */}
                  <div className="space-y-4">
                    <h3 className="font-semibold text-white flex items-center gap-2">
                      <Phone size={18} className="text-blue-400" />
                      SMS Notifications
                    </h3>
                    <div className="space-y-3">
                      <NotificationToggle
                        label="2FA codes"
                        description="Receive two-factor authentication codes via SMS"
                        enabled={notificationPrefs.sms.twoFactor}
                      />
                      <NotificationToggle
                        label="Security alerts"
                        description="Critical security notifications via SMS"
                        enabled={notificationPrefs.sms.alerts}
                      />
                      <NotificationToggle
                        label="Promotions"
                        description="Special offers and promotions"
                        enabled={notificationPrefs.sms.promotions}
                      />
                    </div>
                  </div>

                  {/* In-App Notifications */}
                  <div className="space-y-4">
                    <h3 className="font-semibold text-white flex items-center gap-2">
                      <MessageCircle size={18} className="text-blue-400" />
                      In-App Notifications
                    </h3>
                    <div className="space-y-3">
                      <NotificationToggle
                        label="Messages"
                        description="Direct messages from other users"
                        enabled={notificationPrefs.inApp.messages}
                      />
                      <NotificationToggle
                        label="Friend requests"
                        description="When someone sends you a friend request"
                        enabled={notificationPrefs.inApp.friendRequests}
                      />
                      <NotificationToggle
                        label="System updates"
                        description="Important system announcements"
                        enabled={notificationPrefs.inApp.systemUpdates}
                      />
                    </div>
                  </div>
                </div>

                {/* Notification Schedule */}
                <div className="mt-8 p-6 rounded-xl bg-[#1A1A23]/30 border border-gray-800">
                  <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
                    <Clock size={18} className="text-blue-400" />
                    Quiet Hours
                  </h3>
                  <div className="flex items-center gap-4">
                    <div className="flex-1">
                      <label className="text-sm text-gray-400 block mb-2">Start time</label>
                      <select className="w-full p-2 rounded-lg bg-[#1A1A23] border border-gray-800 text-white text-sm cursor-pointer">
                        <option>9:00 PM</option>
                        <option>10:00 PM</option>
                        <option>11:00 PM</option>
                      </select>
                    </div>
                    <div className="flex-1">
                      <label className="text-sm text-gray-400 block mb-2">End time</label>
                      <select className="w-full p-2 rounded-lg bg-[#1A1A23] border border-gray-800 text-white text-sm cursor-pointer">
                        <option>7:00 AM</option>
                        <option>8:00 AM</option>
                        <option>9:00 AM</option>
                      </select>
                    </div>
                    <div className="flex items-end">
                      <button className="px-4 py-2 rounded-lg bg-blue-500/10 text-blue-300 hover:bg-blue-500/20 transition-colors duration-200 text-sm cursor-pointer">
                        Save Schedule
                      </button>
                    </div>
                  </div>
                </div>

                {/* Future Scope Features */}
                <div className="mt-8 p-6 rounded-xl bg-gradient-to-r from-blue-500/5 to-indigo-500/5 border border-blue-500/20">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-yellow-400" />
                    Coming Soon to Notifications
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                      { icon: Bell, label: "Smart Digest" },
                      { icon: Volume2, label: "Sound Settings" },
                      { icon: Moon, label: "Do Not Disturb" },
                      { icon: Gift, label: "Birthday Alerts" }
                    ].map((item, index) => (
                      <div key={index} className="flex items-center gap-2 p-3 rounded-lg bg-[#1A1A23]/50 border border-gray-800">
                        <item.icon size={16} className="text-blue-400" />
                        <span className="text-xs text-gray-300">{item.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Logout Button */}
        <motion.div variants={itemVariants} className="flex justify-center mt-12">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleLogout}
            className="group relative px-8 py-3 rounded-xl overflow-hidden cursor-pointer"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-pink-600" />
            <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute inset-0 shadow-[0_0_30px_rgba(239,68,68,0.3)] group-hover:shadow-[0_0_40px_rgba(239,68,68,0.5)] transition-shadow duration-300" />
            <div className="relative flex items-center gap-2">
              <LogOut size={18} className="group-hover:rotate-180 transition-transform duration-300" />
              <span className="font-medium">Sign Out</span>
            </div>
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
}

// Enhanced InfoCard subcomponent
function InfoCard({ icon, label, value, gradient = "from-blue-500 to-indigo-500" }) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="group relative cursor-pointer"
    >
      <div className={`absolute inset-0 bg-gradient-to-r ${gradient} rounded-2xl blur-xl opacity-0 group-hover:opacity-15 transition-opacity duration-300`} />
      <div className="relative bg-[#0F0F15]/80 backdrop-blur-sm border border-blue-500/15 rounded-2xl p-6 hover:border-blue-500/30 transition-all duration-300 overflow-hidden">
        <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-white/5 to-transparent rounded-bl-full" />
        <div className="flex items-center gap-2 text-blue-300/70 text-sm mb-2">
          <span className="text-blue-400">{icon}</span>
          {label}
        </div>
        <p className="text-lg font-medium text-white">
          {value}
        </p>
      </div>
    </motion.div>
  );
}

// Enhanced Provider subcomponent
function Provider({ icon, name, active, color = "blue" }) {
  const colorClasses = {
    blue: "from-blue-500 to-indigo-500",
    yellow: "from-yellow-500 to-orange-500",
    gray: "from-gray-500 to-gray-600",
    purple: "from-purple-500 to-pink-500"
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className={`group relative ${!active && 'opacity-60'} cursor-pointer`}
    >
      <div className={`absolute inset-0 bg-gradient-to-r ${colorClasses[color]} rounded-2xl blur-xl opacity-0 group-hover:opacity-15 transition-opacity`} />
      <div className={`relative bg-[#0F0F15]/80 backdrop-blur-sm border ${active ? 'border-blue-500/25' : 'border-gray-800/50'} rounded-2xl p-5 flex flex-col items-center hover:border-blue-500/40 transition-all duration-300`}>
        <div className={`mb-3 ${active ? 'text-blue-400' : 'text-gray-600'} group-hover:scale-110 transition-transform duration-200`}>
          {icon}
        </div>
        <p className={`text-sm font-medium ${active ? 'text-blue-200' : 'text-gray-500'}`}>
          {name}
        </p>
        <div className="mt-3 flex items-center gap-1">
          {active ? (
            <CheckCircle size={12} className="text-green-400" />
          ) : (
            <XCircle size={12} className="text-gray-600" />
          )}
          <span
            className={`text-xs px-2 py-0.5 rounded-full ${
              active
                ? "bg-green-500/20 text-green-300"
                : "bg-gray-800/50 text-gray-500"
            }`}
          >
            {active ? "Connected" : "Not Linked"}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

// SocialLink subcomponent
function SocialLink({ icon, name, handle, connected }) {
  return (
    <motion.div
      whileHover={{ x: 4 }}
      className="flex items-center justify-between p-2 rounded-lg hover:bg-[#1A1A23]/50 transition-colors duration-200 cursor-pointer"
    >
      <div className="flex items-center gap-3">
        <div className={`${connected ? 'text-blue-400' : 'text-gray-600'}`}>
          {icon}
        </div>
        <div>
          <p className="text-sm font-medium text-gray-300">{name}</p>
          <p className="text-xs text-gray-600">{handle}</p>
        </div>
      </div>
      {connected ? (
        <CheckCircle size={16} className="text-green-400" />
      ) : (
        <button className="text-xs px-3 py-1 rounded-full bg-blue-500/10 text-blue-300 hover:bg-blue-500/20 transition-colors duration-200 cursor-pointer">
          Connect
        </button>
      )}
    </motion.div>
  );
}

// Notification Toggle Component
function NotificationToggle({ label, description, enabled }) {
  const [isEnabled, setIsEnabled] = useState(enabled);

  return (
    <div className="flex items-center justify-between p-3 rounded-lg bg-[#1A1A23]/30 hover:bg-[#1A1A23]/50 transition-colors duration-200">
      <div>
        <p className="text-sm text-white">{label}</p>
        <p className="text-xs text-gray-500">{description}</p>
      </div>
      <button
        onClick={() => setIsEnabled(!isEnabled)}
        className={`relative w-12 h-6 rounded-full transition-colors duration-200 focus:outline-none cursor-pointer ${
          isEnabled ? 'bg-blue-500' : 'bg-gray-700'
        }`}
      >
        <span
          className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform duration-200 ${
            isEnabled ? 'translate-x-6' : 'translate-x-0'
          }`}
        />
      </button>
    </div>
  );
}