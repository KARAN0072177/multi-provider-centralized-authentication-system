import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Navbar() {

  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <nav style={{ padding: "10px", borderBottom: "1px solid #ccc" }}>

      <Link to="/home" style={{ marginRight: "15px" }}>
        Home
      </Link>

      <Link to="/profile" style={{ marginRight: "15px" }}>
        Profile
      </Link>

      <Link to="/about" style={{ marginRight: "15px" }}>
        About
      </Link>

      {isLoggedIn ? (
        <button onClick={handleLogout}>
          Logout
        </button>
      ) : (
        <Link to="/">
          Login
        </Link>
      )}

    </nav>
  );
}