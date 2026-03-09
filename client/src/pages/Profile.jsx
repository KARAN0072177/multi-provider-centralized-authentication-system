import { useEffect, useState } from "react";
import API from "../api/auth";

export default function Profile() {

  const [user, setUser] = useState(null);

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

  if (!user) {
    return <h2>Loading...</h2>;
  }

  return (
    <div>

      <h2>User Profile</h2>

      <p>
        <strong>Username:</strong> {user.username}
      </p>

      <p>
        <strong>Email:</strong> {user.email}
      </p>

      <p>
        <strong>Login Method:</strong> {user.loginMethod}
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

    </div>
  );
}