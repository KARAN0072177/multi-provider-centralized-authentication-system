import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { 
  Home, 
  User, 
  Info, 
  LogOut, 
  LogIn, 
  Menu, 
  X,
  Sparkles,
  ChevronDown,
  Settings,
  HelpCircle,
  Bell
} from "lucide-react";

export default function Navbar() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/");
  };

  const navLinks = [
    { to: "/home", label: "Home", icon: Home },
    { to: "/profile", label: "Profile", icon: User },
    { to: "/about", label: "About", icon: Info },
  ];

  const notificationCount = 3; // Example notification count

  return (
    <>
      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        isScrolled 
          ? "bg-gray-900/95 backdrop-blur-lg border-b border-gray-800/50 shadow-2xl" 
          : "bg-gradient-to-b from-gray-900 to-gray-900/95"
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo with animated sparkle */}
            <Link 
              to="/home" 
              className="flex items-center space-x-2 group"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-blue-500 rounded-lg blur-lg opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
                <Sparkles className="h-8 w-8 text-blue-400 group-hover:text-blue-300 transition-all duration-300 group-hover:rotate-12" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                M-P CAS
              </span>
            </Link>

            {/* Desktop Navigation - Center */}
            <div className="hidden md:flex items-center space-x-1">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="relative group px-4 py-2 rounded-xl overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative flex items-center space-x-2 text-gray-300 group-hover:text-white transition-colors duration-200">
                    <link.icon className="h-4 w-4 group-hover:scale-110 transition-transform duration-200" />
                    <span className="font-medium">{link.label}</span>
                  </div>
                  {/* Animated underline */}
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 group-hover:w-full h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 transition-all duration-300"></div>
                </Link>
              ))}
            </div>

            {/* Desktop Right Section */}
            <div className="hidden md:flex items-center space-x-3">
              {isLoggedIn ? (
                <>
                  {/* Notifications */}
                  <button
                    onClick={() => setShowNotifications(!showNotifications)}
                    className="relative p-2 text-gray-300 hover:text-white rounded-lg hover:bg-gray-800/50 transition-all duration-200 group"
                  >
                    <Bell className="h-5 w-5 group-hover:scale-110 transition-transform duration-200" />
                    {notificationCount > 0 && (
                      <span className="absolute -top-1 -right-1 h-5 w-5 bg-gradient-to-r from-red-500 to-pink-500 rounded-full text-xs flex items-center justify-center text-white font-bold animate-pulse">
                        {notificationCount}
                      </span>
                    )}
                  </button>

                  {/* User Menu */}
                  <div className="relative">
                    <button
                      onClick={() => setShowUserMenu(!showUserMenu)}
                      className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-800/50 transition-all duration-200 group"
                    >
                      <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full blur-sm opacity-0 group-hover:opacity-75 transition-opacity duration-300"></div>
                        <img
                          src="https://ui-avatars.com/api/?name=John+Doe&background=linear-gradient(135deg,%236b73ff%2C%235b63e6)&color=fff&size=128"
                          alt="Profile"
                          className="relative h-8 w-8 rounded-full border-2 border-transparent group-hover:border-blue-400 transition-all duration-300"
                        />
                      </div>
                      <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform duration-200 ${
                        showUserMenu ? 'rotate-180' : ''
                      }`} />
                    </button>

                    {/* Dropdown Menu */}
                    {showUserMenu && (
                      <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-xl shadow-2xl border border-gray-700 py-2 animate-fadeIn">
                        <Link
                          to="/profile"
                          className="flex items-center space-x-2 px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-700/50 transition-colors duration-200"
                          onClick={() => setShowUserMenu(false)}
                        >
                          <User className="h-4 w-4" />
                          <span>Profile</span>
                        </Link>
                        <Link
                          to="/settings"
                          className="flex items-center space-x-2 px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-700/50 transition-colors duration-200"
                          onClick={() => setShowUserMenu(false)}
                        >
                          <Settings className="h-4 w-4" />
                          <span>Settings</span>
                        </Link>
                        <Link
                          to="/help"
                          className="flex items-center space-x-2 px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-700/50 transition-colors duration-200"
                          onClick={() => setShowUserMenu(false)}
                        >
                          <HelpCircle className="h-4 w-4" />
                          <span>Help</span>
                        </Link>
                        <div className="border-t border-gray-700 my-2"></div>
                        <button
                          onClick={() => {
                            handleLogout();
                            setShowUserMenu(false);
                          }}
                          className="w-full flex items-center space-x-2 px-4 py-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors duration-200"
                        >
                          <LogOut className="h-4 w-4" />
                          <span>Logout</span>
                        </button>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <Link
                  to="/"
                  className="relative group px-6 py-2 rounded-lg overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300 group-hover:scale-105"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative flex items-center space-x-2 text-white font-medium">
                    <LogIn className="h-4 w-4 group-hover:rotate-12 transition-transform duration-200" />
                    <span>Login</span>
                  </div>
                </Link>
              )}
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden relative p-2 text-gray-300 hover:text-white rounded-lg hover:bg-gray-800/50 transition-all duration-200 group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              {isMenuOpen ? (
                <X className="h-6 w-6 relative" />
              ) : (
                <Menu className="h-6 w-6 relative" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className={`md:hidden transition-all duration-300 overflow-hidden ${
          isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="px-4 pt-2 pb-3 space-y-2 bg-gray-900/95 backdrop-blur-lg border-t border-gray-800">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="flex items-center space-x-3 px-4 py-3 text-gray-300 hover:text-white rounded-xl hover:bg-gray-800/50 transition-all duration-200 group"
                onClick={() => setIsMenuOpen(false)}
              >
                <link.icon className="h-5 w-5 group-hover:scale-110 transition-transform duration-200" />
                <span className="font-medium">{link.label}</span>
              </Link>
            ))}
            
            {isLoggedIn ? (
              <>
                <Link
                  to="/settings"
                  className="flex items-center space-x-3 px-4 py-3 text-gray-300 hover:text-white rounded-xl hover:bg-gray-800/50 transition-all duration-200 group"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Settings className="h-5 w-5 group-hover:scale-110 transition-transform duration-200" />
                  <span className="font-medium">Settings</span>
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                  className="w-full flex items-center space-x-3 px-4 py-3 text-red-400 hover:text-red-300 rounded-xl hover:bg-red-500/10 transition-all duration-200 group"
                >
                  <LogOut className="h-5 w-5 group-hover:scale-110 transition-transform duration-200" />
                  <span className="font-medium">Logout</span>
                </button>
              </>
            ) : (
              <Link
                to="/"
                className="flex items-center space-x-3 px-4 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl hover:from-blue-600 hover:to-purple-600 transition-all duration-200 group"
                onClick={() => setIsMenuOpen(false)}
              >
                <LogIn className="h-5 w-5 group-hover:rotate-12 transition-transform duration-200" />
                <span className="font-medium">Login</span>
              </Link>
            )}
          </div>
        </div>
      </nav>

      {/* Notifications Panel */}
      {showNotifications && (
        <div className="fixed top-20 right-4 w-80 bg-gray-800 rounded-xl shadow-2xl border border-gray-700 p-4 z-50 animate-slideDown">
          <h3 className="text-white font-semibold mb-3">Notifications</h3>
          <div className="space-y-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="p-3 bg-gray-700/50 rounded-lg hover:bg-gray-700 transition-colors duration-200 cursor-pointer">
                <p className="text-sm text-gray-300">New notification {i}</p>
                <p className="text-xs text-gray-500 mt-1">2 minutes ago</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Spacer for fixed navbar */}
      <div className="h-16"></div>

      {/* Add custom animations */}
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
        
        .animate-slideDown {
          animation: slideDown 0.3s ease-out;
        }
      `}</style>
    </>
  );
}