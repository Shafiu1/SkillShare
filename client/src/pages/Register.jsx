import { useState } from "react";
import axios from "axios";

export default function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("student");

    const handleRegister = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post("http://localhost:4000/api/auth/register", {
                name,
                email,
                password,
                role,
            });

            alert("Registration successful!");
            window.location.href = "/login";

        } catch (error) {
            alert(error.response?.data?.message || "Registration failed");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold text-center mb-6">
                    Register
                </h2>

                <form onSubmit={handleRegister} className="space-y-4">

                    <input
                        type="text"
                        placeholder="Name"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                        onChange={(e) => setName(e.target.value)}
                    />

                    <input
                        type="email"
                        placeholder="Email"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <select
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                        onChange={(e) => setRole(e.target.value)}
                    >
                        <option value="student">Student</option>
                        <option value="teacher">Teacher</option>
                    </select>

                    <button
                        type="submit"
                        className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition duration-200"
                    >
                        Register
                    </button>
                </form>
            </div>
        </div>
    );
}
