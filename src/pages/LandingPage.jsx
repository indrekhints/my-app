
import "@fontsource/poppins"; // kaasaegne font

import { useState } from "react";
import { loginUser } from "../services/api";
import { toast, Toaster } from "react-hot-toast";

export default function LandingPage() {
    const [email, setEmail] = useState("");


    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-200 to-pink-200">
            <div class="min-h-screen flex items-center justify-center bg-gradient-to-b ...">


                <div className="absolute top-4 right-20 flex space-x-4 ml-6">
                    <a href="/login" className="text-gray-700 font-medium hover:text-pink-400 transition">
                        Login
                    </a>
                    <a href="/register" className="text-gray-700 font-medium hover:text-pink-400 transition">
                        Register
                    </a>
                </div>



                <div>
                    {/* Siia tulevad kuulutused ja otsing */}
                </div>

            </div>


        </div>
    );
}
