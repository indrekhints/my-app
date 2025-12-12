
import "@fontsource/poppins"; // kaasaegne font

import { useState } from "react";
import { loginUser } from "../services/api";
import { toast, Toaster } from "react-hot-toast";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await loginUser({ email, password });

            if (res.token) {
                localStorage.setItem("token", res.token);
                toast.success("Login successful!", {
                    duration: 2000,
                    position: "top-center",
                });
                setTimeout(() => {
                    window.location.href = "/dashboard";
                }, 1000);
            } else {
                toast.error(res.error || "Login failed", {
                    duration: 3000,
                    position: "top-center",
                });
            }
        } catch (err) {
            toast.error("Something went wrong", { duration: 3000, position: "top-center" });
            console.error(err);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-200 to-pink-200">
            <Toaster />
            <div className="bg-white w-full max-w-sm sm:max-w-md p-8 sm:p-10 rounded-xl shadow-lg relative">

                <a
                    href="/"
                    className="absolute top-4 right-6 text-[40px] font-light leading-none tracking-tight 
                   text-gray-400 hover:text-pink-500 transition cursor-pointer"
                >
                    ×
                </a>
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-formLabelText mb-1 font-medium font-poppins">
                            Email
                        </label>
                        <input
                            name="email"
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 font-poppins"
                        />
                    </div>

                    <div>
                        <label className="block text-formLabelText mb-1 font-medium font-poppins">
                            Parool
                        </label>
                        <input
                            name="password"
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-400 font-poppins"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-brandPink text-buttonText py-3 rounded-md font-semibold hover:bg-brandPink-hover transition-colors duration-200 font-poppins"
                    >
                        Logi sisse
                    </button>
                </form>

                <p className="text-center text-gray-500 mt-4 text-sm font-poppins">
                    Ei ole veel kasutaja?{" "}
                    <a href="/register" className="text-pink-400 font-medium">
                        Registreeru
                    </a>
                </p>
            </div>
        </div>
    );
}
