import { useEffect, useState } from "react";
import API from "../api/auth";
import { useNavigate } from "react-router-dom";

export default function Profile() {

  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {

    const fetchProfile = async () => {

      try {

        const res = await API.get("/user/profile");
        setUser(res.data);

      } catch (error) {

        alert("Unauthorized");

      }

    };

    fetchProfile();

  }, []);

  const handleLogout = () => {

    localStorage.removeItem("token");
    navigate("/");

  };

  const generateInitialAvatar = (username) => {
    const initials = username
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();

    return `https://ui-avatars.com/api/?name=${initials}&background=random`;
  };

  if (!user) {
    return <h2>Loading...</h2>;
  }

  const avatar = user.avatar || generateInitialAvatar(user.username);

  return (
    <div>

      <h2>User Profile</h2>

      <img
        src={avatar}
        alt="profile"
        width="100"
        style={{ borderRadius: "50%" }}
      />

      <p>
        <strong>Username:</strong> {user.username}
      </p>

      <p>
        <strong>Email:</strong> {user.email}
      </p>

      <p>
        <strong>Current Login Method:</strong> {user.loginMethod}
      </p>

      <p>
        <strong>Account Created:</strong>{" "}
        {new Date(user.createdAt).toLocaleString()}
      </p>

      <h3>Linked Accounts</h3>

      <ul>

        <li>
          Email / Password:
          {user.linkedAccounts.emailPassword ? " ✅" : " ❌"}
        </li>

        <li>
          Google:
          {user.linkedAccounts.google ? " ✅" : " ❌"}
        </li>

        <li>
          GitHub:
          {user.linkedAccounts.github ? " ✅" : " ❌"}
        </li>

        <li>
          Microsoft:
          {user.linkedAccounts.microsoft ? " ✅" : " ❌"}
        </li>

      </ul>

      <button onClick={handleLogout}>
        Logout
      </button>

    </div>
  );
}