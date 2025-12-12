import { useState } from "react";
import { registerUser } from "../services/api";
import { Toaster, toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("")

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const res = await registerUser({ email, password, phone });

        console.log(res);

        if (res.message) {

            toast.custom((t) => (
                <div
                    className={`max-w-sm w-full bg-black bg-opacity-70 text-center p-6 rounded-xl shadow-lg mx-auto 
                        flex justify-center items-center text-brandPink text-xl font-poppins font-semibold`}
                    style={{
                        animation: t.visible ? 'fadeIn 0.3s ease-out' : 'fadeOut 0.3s ease-in'
                    }}
                >
                    Kasutaja lisatud!
                </div>
            ), {
                position: 'top-center',
                duration: 1000,
            });

            // Navigeeri pärast väikest viivitust (et toast jõuaks ilmuda)
            setTimeout(() => {
                window.location.href = "/dashboard";
            }, 1000);

        } else {
            toast.error(res.error || "Midagi läks valesti");
        }
    };


    return (
        <>
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-200 to-pink-200">

                <Toaster position="top-right" toastOptions={{
                    duration: 2500,
                    style: {
                        background: '#DFCCEB',
                        color: '#333',
                        fontFamily: 'Poppins, sans-serif',
                        fontSize: '14px',
                        padding: '12px 24px',
                        borderRadius: '8px',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                    }
                }} />

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
                        <label className="block text-formLabelText mb-1 font-medium font-poppins">
                            Phone
                        </label>
                        <input
                            name="phone"
                            type="text"
                            placeholder="Phone"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-400 font-poppins"
                        />



                        <button
                            type="submit"
                            className="w-full bg-brandPink text-buttonText py-3 rounded-md font-semibold hover:bg-brandPink-hover transition-colors duration-200 font-poppins"
                        >
                            Registreeru
                        </button>
                    </form>

                    <p className="text-center text-gray-500 mt-4 text-sm font-poppins">
                        Juba kasutaja?{" "}
                        <a href="/login" className="text-pink-400 font-medium">
                            Logi sisse
                        </a>
                    </p>

                </div >
            </div >
        </>
    );
}
