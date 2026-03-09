import { useSearchParams, useNavigate } from "react-router-dom";
import API from "../api/auth";

export default function LinkAccount() {

  const [params] = useSearchParams();
  const navigate = useNavigate();

  const email = params.get("email");
  const provider = params.get("provider");
  const providerId = params.get("providerId");

  const handleLink = async () => {

    try {

      await API.post("/auth/link-oauth", {
        email,
        provider,
        providerId
      });

      alert(`${provider} account linked successfully`);

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
        Do you want to link your <strong>{provider}</strong> account?
      </p>

      <button onClick={handleLink}>
        Yes, link account
      </button>

    </div>
  );
}