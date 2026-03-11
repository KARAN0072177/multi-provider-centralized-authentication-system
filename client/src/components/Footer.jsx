import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  Shield,
  Github,
  Chrome,
  Mail,
  Heart,
  ArrowUp,
  Sparkles,
  Github as GithubIcon,
  Twitter,
  Linkedin,
  Youtube,
  Instagram,
  Facebook,
  Globe,
  Mail as MailIcon,
  Phone,
  MapPin,
  Clock,
  Award,
  Lock,
  Server,
  Database,
  Code,
  Zap,
  Users,
  Key,
  ExternalLink
} from "lucide-react";
import { useState, useEffect } from "react";

export default function Footer() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  const currentYear = new Date().getFullYear();

  const footerLinks = {
    product: [
      { name: "Features", href: "/features" },
      { name: "Authentication", href: "/authentication" },
      { name: "Pricing", href: "/pricing" },
      { name: "Documentation", href: "/docs" },
      { name: "API Reference", href: "/api" }
    ],
    resources: [
      { name: "Blog", href: "/blog" },
      { name: "Tutorials", href: "/tutorials" },
      { name: "Support", href: "/support" },
      { name: "Community", href: "/community" },
      { name: "Status", href: "/status" }
    ],
    company: [
      { name: "About Us", href: "/about" },
      { name: "Careers", href: "/careers" },
      { name: "Press", href: "/press" },
      { name: "Partners", href: "/partners" },
      { name: "Contact", href: "/contact" }
    ],
    legal: [
      { name: "Privacy Policy", href: "/privacy" },
      { name: "Terms of Service", href: "/terms" },
      { name: "Cookie Policy", href: "/cookies" },
      { name: "GDPR", href: "/gdpr" },
      { name: "Security", href: "/security" }
    ]
  };

  const socialLinks = [
    { icon: GithubIcon, name: "GitHub", href: "https://github.com", color: "gray" },
    { icon: Twitter, name: "Twitter", href: "https://twitter.com", color: "sky" },
    { icon: Linkedin, name: "LinkedIn", href: "https://linkedin.com", color: "blue" },
    { icon: Youtube, name: "YouTube", href: "https://youtube.com", color: "red" },
    { icon: Instagram, name: "Instagram", href: "https://instagram.com", color: "pink" },
    { icon: Facebook, name: "Facebook", href: "https://facebook.com", color: "blue" }
  ];

  const contactInfo = [
    { icon: MailIcon, text: "support@authsystem.com", href: "mailto:support@authsystem.com" },
    { icon: Phone, text: "+1 (555) 123-4567", href: "tel:+15551234567" },
    { icon: MapPin, text: "San Francisco, CA", href: "#" },
    { icon: Clock, text: "24/7 Support", href: "#" }
  ];

  const technologies = [
    { icon: Server, name: "Node.js", color: "green" },
    { icon: Database, name: "MongoDB", color: "green" },
    { icon: Code, name: "React", color: "blue" },
    { icon: Lock, name: "JWT", color: "yellow" },
    { icon: Key, name: "OAuth 2.0", color: "purple" },
    { icon: Shield, name: "Passport.js", color: "gray" }
  ];

  return (
    <>
      {/* Scroll to Top Button */}
      <motion.button
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: showScrollTop ? 1 : 0, scale: showScrollTop ? 1 : 0 }}
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 z-50 p-3 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg hover:shadow-xl transition-shadow duration-200 group"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <ArrowUp className="w-5 h-5 group-hover:-translate-y-1 transition-transform duration-200" />
      </motion.button>

      {/* Main Footer */}
      <footer className="relative bg-[#0A0A0F] border-t border-gray-800/50 overflow-hidden">
        {/* Background Gradient */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/5 to-transparent" />
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.15, 0.1],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[150px] -top-20 -right-20"
          />
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.15, 0.1],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
            className="absolute w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[150px] -bottom-20 -left-20"
          />
        </div>

        {/* Floating Icons */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[Shield, Lock, Users, Server, Code, Zap].map((Icon, i) => (
            <motion.div
              key={i}
              className="absolute text-blue-500/5"
              style={{
                top: `${Math.random() * 80 + 10}%`,
                left: `${Math.random() * 80 + 10}%`,
              }}
              animate={{
                y: [0, 20, 0],
                rotate: [0, 360],
              }}
              transition={{
                duration: 20 + i * 2,
                repeat: Infinity,
                ease: "linear",
                delay: i * 2,
              }}
            >
              <Icon size={40 + i * 10} />
            </motion.div>
          ))}
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Main Footer Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12 mb-12">
            {/* Brand Column */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <Link to="/" className="flex items-center gap-2 mb-4 group">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg blur-lg opacity-50 group-hover:opacity-75 transition-opacity duration-300" />
                    <div className="relative p-2 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600">
                      <Shield className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <span className="text-xl font-bold bg-gradient-to-r from-white via-blue-200 to-indigo-200 bg-clip-text text-transparent">
                    M-P CAS
                  </span>
                </Link>

                <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                  A modern, secure, and scalable centralized authentication system supporting multiple OAuth providers with a unified user identity.
                </p>

                {/* Contact Info */}
                <div className="space-y-3 mb-6">
                  {contactInfo.map((item, index) => (
                    <motion.a
                      key={index}
                      href={item.href}
                      whileHover={{ x: 4 }}
                      className="flex items-center gap-3 text-sm text-gray-400 hover:text-blue-400 transition-colors duration-200 group"
                    >
                      <item.icon size={14} className="text-gray-600 group-hover:text-blue-400 transition-colors duration-200" />
                      <span>{item.text}</span>
                    </motion.a>
                  ))}
                </div>

                {/* Trust Badge */}
                <div className="flex items-center gap-2 p-3 rounded-lg bg-[#1A1A23] border border-gray-800">
                  <Award className="w-5 h-5 text-yellow-400" />
                  <div>
                    <p className="text-xs text-gray-300">Trusted by</p>
                    <p className="text-sm font-semibold text-white">1,000+ Companies</p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Links Columns */}
            {Object.entries(footerLinks).map(([category, links], idx) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <h3 className="text-white font-semibold uppercase tracking-wider text-sm mb-4">
                  {category}
                </h3>
                <ul className="space-y-2">
                  {links.map((link) => (
                    <li key={link.name}>
                      <Link
                        to={link.href}
                        className="text-sm text-gray-400 hover:text-blue-400 transition-colors duration-200 flex items-center gap-1 group"
                      >
                        <span>{link.name}</span>
                        <ExternalLink size={12} className="opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          {/* Middle Section */}
          <div className="grid lg:grid-cols-2 gap-8 py-8 border-t border-gray-800/50">
            {/* Technologies */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                <Server className="w-4 h-4 text-blue-400" />
                Powered By
              </h3>
              <div className="flex flex-wrap gap-3">
                {technologies.map((tech, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.05, y: -2 }}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#1A1A23] border border-gray-800 hover:border-blue-500/30 transition-all duration-200"
                  >
                    <tech.icon className={`w-4 h-4 text-${tech.color}-400`} />
                    <span className="text-xs text-gray-300">{tech.name}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="lg:text-right"
            >
              <h3 className="text-white font-semibold mb-4 flex items-center lg:justify-end gap-2">
                <Globe className="w-4 h-4 text-blue-400" />
                Follow Us
              </h3>
              <div className="flex flex-wrap gap-3 lg:justify-end">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -2 }}
                    className={`p-2 rounded-lg bg-[#1A1A23] border border-gray-800 hover:border-${social.color}-500/30 transition-all duration-200 group`}
                  >
                    <social.icon className={`w-4 h-4 text-gray-400 group-hover:text-${social.color}-400 transition-colors duration-200`} />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Bottom Bar */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="pt-8 border-t border-gray-800/50 flex flex-col md:flex-row justify-between items-center gap-4"
          >
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span>© {currentYear} AuthSystem.</span>
              <span className="flex items-center gap-1">
                Made with <Heart size={12} className="text-red-400 fill-red-400" /> by
                <span className="text-blue-400 hover:text-blue-300 transition-colors duration-200">Team Auth</span>
              </span>
            </div>

            <div className="flex items-center gap-4">
              <Link to="/privacy" className="text-xs text-gray-500 hover:text-blue-400 transition-colors duration-200">
                Privacy
              </Link>
              <span className="text-gray-700">•</span>
              <Link to="/terms" className="text-xs text-gray-500 hover:text-blue-400 transition-colors duration-200">
                Terms
              </Link>
              <span className="text-gray-700">•</span>
              <Link to="/cookies" className="text-xs text-gray-500 hover:text-blue-400 transition-colors duration-200">
                Cookies
              </Link>
              <span className="text-gray-700">•</span>
              <Link to="/sitemap" className="text-xs text-gray-500 hover:text-blue-400 transition-colors duration-200">
                Sitemap
              </Link>
            </div>

            {/* Security Badge */}
            <div className="flex items-center gap-2 text-xs text-gray-600">
              <Shield size={12} className="text-green-400" />
              <span>SSL Secure</span>
              <span className="w-1 h-1 bg-gray-700 rounded-full" />
              <Lock size={12} className="text-green-400" />
              <span>256-bit Encryption</span>
            </div>
          </motion.div>

          {/* Newsletter Signup (Optional) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-8 p-6 rounded-2xl bg-gradient-to-r from-blue-500/10 via-indigo-500/10 to-purple-500/10 border border-blue-500/20"
          >
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-blue-500/20">
                  <Mail className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <h4 className="text-white font-semibold">Stay Updated</h4>
                  <p className="text-xs text-gray-400">Get the latest updates about new features and security improvements</p>
                </div>
              </div>
              
              <div className="flex gap-2 w-full md:w-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 md:w-64 px-4 py-2 bg-[#1A1A23] border border-gray-800 rounded-lg text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all duration-200"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg text-sm font-medium text-white hover:shadow-lg transition-shadow duration-200"
                >
                  Subscribe
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Copyright Watermark */}
        <div className="relative z-10 text-center py-4 border-t border-gray-800/50">
          <p className="text-xs text-gray-700 flex items-center justify-center gap-1">
            <Sparkles size={12} className="text-blue-500/50" />
            Centralized Authentication System • Multi-Provider OAuth • JWT Secure • MongoDB Backend
            <Sparkles size={12} className="text-blue-500/50" />
          </p>
        </div>
      </footer>
    </>
  );
}