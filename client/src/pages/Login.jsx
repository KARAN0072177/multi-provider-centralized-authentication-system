import { useState } from "react";
import API from "../api/auth";

export default function Login() {
    const [form, setForm] = useState({
        identifier: "",
        password: ""
    });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await API.post("/auth/login", form);

            localStorage.setItem("token", res.data.token);

            alert("Login successful");

        } catch (err) {
            alert(err.response?.data?.message);
        }
    };

    // Google OAuth login handler

    const handleGoogleLogin = () => {
        window.location.href = "http://localhost:5000/api/auth/google";
    };

    // GitHub OAuth login handler

    const handleGithubLogin = () => {
        window.location.href = "http://localhost:5000/api/auth/github";
    };

    // Microsoft OAuth login handler

    const handleMicrosoftLogin = () => {
        window.location.href = "http://localhost:5000/api/auth/microsoft";
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">

            <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">

                <h2 className="text-2xl font-semibold text-center mb-6">
                    Login
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">

                    <input
                        name="identifier"
                        placeholder="Email or Username"
                        onChange={handleChange}
                        className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <input
                        name="password"
                        type="password"
                        placeholder="Password"
                        onChange={handleChange}
                        className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <p className="text-sm text-right">
                        <a href="/forgot-password" className="text-blue-600 hover:underline">
                            Forgot password?
                        </a>
                    </p>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                    >
                        Login
                    </button>

                    <button
                        type="button"
                        onClick={handleGoogleLogin}
                        className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition mt-2 flex items-center justify-center space-x-2"
                    >
                        Login with Google
                    </button>

                    <button
                        type="button"
                        onClick={handleGithubLogin}
                        className="w-full bg-gray-800 text-white py-2 rounded-lg hover:bg-gray-900 transition mt-2 flex items-center justify-center space-x-2"
                    >
                        Login with GitHub
                    </button>

                    <button
                        type="button"
                        onClick={handleMicrosoftLogin}
                        className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition mt-2 flex items-center justify-center space-x-2"
                    >
                        Login with Microsoft
                    </button>

                </form>

                <p className="text-sm text-center mt-4">
                    Don't have an account?
                    <a href="/register" className="text-blue-600 hover:underline ml-1">
                        Register
                    </a>
                </p>

            </div>

        </div>
    );
}