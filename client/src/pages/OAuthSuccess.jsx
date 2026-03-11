import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

export default function OAuthSuccess() {

  const [params] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {

    const token = params.get("token");

    if (token) {
      localStorage.setItem("token", token);
      navigate("/profile");
    } else {
      navigate("/");
    }

  }, []);

  return <h2>Logging you in...</h2>;
}