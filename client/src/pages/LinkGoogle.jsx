import { useSearchParams } from "react-router-dom";
import API from "../api/auth";
import { useNavigate } from "react-router-dom";

export default function LinkGoogle() {

  const [params] = useSearchParams();
  const navigate = useNavigate();

  const email = params.get("email");
  const googleId = params.get("googleId");

  const handleLink = async () => {

    try {

      await API.post("/auth/link-google", {
        email,
        googleId
      });

      alert("Google account linked");

      navigate("/login");

    } catch (error) {

      alert(error.response?.data?.message);

    }
  };

  return (
    <div>

      <h2>Account already exists</h2>

      <p>
        An account with email <strong>{email}</strong> already exists.
      </p>

      <p>
        Do you want to link your Google account?
      </p>

      <button onClick={handleLink}>
        Yes, link Google
      </button>

    </div>
  );
}