import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import API from "../api/auth";

export default function ChooseUsername() {

  const [username, setUsername] = useState("");
  const [params] = useSearchParams();
  const navigate = useNavigate();

  const userId = params.get("userId");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      await API.post("/auth/set-username", {
        userId,
        username
      });

      alert("Username saved");

      navigate("/login");

    } catch (error) {

      alert(error.response?.data?.message);

    }
  };

  return (
    <div>

      <h2>Choose Username</h2>

      <form onSubmit={handleSubmit}>

        <input
          placeholder="Enter username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <button type="submit">
          Save Username
        </button>

      </form>

    </div>
  );
}