import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import API from "../api/auth";

export default function VerifyEmail() {
  const [message, setMessage] = useState("Verifying...");
  const [params] = useSearchParams();

useEffect(() => {

  const verify = async () => {

    const token = params.get("token");

    if (!token) {
      setMessage("Invalid verification link");
      return;
    }

    try {

      const res = await API.post("/auth/verify-email", { token });

      setMessage(res.data.message);

    } catch (err) {

      setMessage(err.response?.data?.message || "Verification failed");

    }

  };

  verify();

}, [params]);

  return (
    <div>
      <h2>{message}</h2>
    </div>
  );
}