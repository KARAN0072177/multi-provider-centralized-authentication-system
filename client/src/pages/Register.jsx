import { useState } from "react";
import API from "../api/auth";

export default function Register() {
    const [form, setForm] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
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
            const res = await API.post("/auth/register", form);
            alert(res.data.message);
        } catch (err) {
            alert(err.response?.data?.message || "Error");
        }
    };

    // Google OAuth registration handler

    const handleGoogleRegister = () => {
        window.location.href = "http://localhost:5000/api/auth/google";
    };

    // GitHub OAuth registration handler

    const handleGithubRegister = () => {
        window.location.href = "http://localhost:5000/api/auth/github";
    };

    // Microsoft OAuth registration handler

    const handleMicrosoftRegister = () => {
        window.location.href = "http://localhost:5000/api/auth/microsoft";
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">

            <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">

                <h2 className="text-2xl font-semibold text-center mb-6">
                    Register
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">

                    <input
                        name="username"
                        placeholder="Username"
                        onChange={handleChange}
                        className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <input
                        name="email"
                        placeholder="Email"
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

                    <input
                        name="confirmPassword"
                        type="password"
                        placeholder="Confirm Password"
                        onChange={handleChange}
                        className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                    >
                        Register
                    </button>

                    <button
                        type="button"
                        onClick={handleGoogleRegister}
                        className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition mt-2 flex items-center justify-center space-x-2"
                    >
                        Register with Google
                    </button>

                    <button
                        type="button"
                        onClick={handleGithubRegister}
                        className="w-full bg-gray-800 text-white py-2 rounded-lg hover:bg-gray-900 transition mt-2 flex items-center justify-center space-x-2"
                    >
                        Register with GitHub
                    </button>

                    <button
                        type="button"
                        onClick={handleMicrosoftRegister}
                        className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition mt-2 flex items-center justify-center space-x-2"
                    >
                        Register with Microsoft
                    </button>

                </form>

            </div>

        </div>
    );
}