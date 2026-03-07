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