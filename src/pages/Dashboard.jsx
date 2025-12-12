import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";


export default function Dashboard() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    console.log(user)


    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-200 to-pink-200">


            {/* HERO SECTION */}
            <div
                className="relative w-full h-96 sm:h-[32rem] md:h-[40rem] bg-cover bg-center"

            /*     style={{ backgroundImage: "url('/images/heroLayout.jpg')" }} */
            >

                {/* Overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-40  " style={{ backgroundImage: "url('/images/heroLayout.jpg')" }} ></div>

                {/* NAVBAR üle hero */}
                <div className="absolute top-0 left-0 w-full flex items-center justify-between px-6 py-4 
                bg-black bg-opacity-40 border-b border-white border-opacity-20 z-20">
                    {/* Vasak logo */}
                    <div className="flex-1">
                        <a className="text-xl font-bold text-white font-poppins">MyApp</a>
                    </div>

                    {/* Parempoolsed lingid */}
                    <div className="flex-none space-x-4">
                        <a href="#" className="text-white hover:text-pink-500 font-medium">Lisa kuulutus!</a>
                        <a href="#" className="text-white hover:text-pink-500 font-medium">Seaded</a>

                        {/* User area protected */}
                        <a
                            href="#"
                            className="text-white hover:text-pink-500 font-medium"
                            onClick={(e) => {
                                e.preventDefault();
                                navigate("/user-area");
                            }}
                        >
                            {user.email}
                        </a>

                        <a href="#" onClick={handleLogout} className="text-white hover:text-pink-500 font-medium">Logi välja </a>

                    </div>
                </div>




                {/* HERO SISESISU */}
                <div className="relative z-10 flex flex-col items-center justify-center h-full text-white px-4">
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center">Tere tulemast kinnisvara portaali</h1>
                    <p className="mt-2 text-sm sm:text-base md:text-lg text-center">Leia oma unistuste kodu kiiresti ja mugavalt</p>
                </div>
            </div>

            {/* DASHBOARD SISU */}
            <div className="max-w-4xl mx-auto p-6 bg-white bg-opacity-80 backdrop-blur-md rounded-xl shadow-lg -mt-16 relative z-10">
                <h2 className="text-xl font-semibold mb-4 font-poppins">
                    Sinu andmed ja kuulutused
                </h2>
                <p className="text-gray-700 font-poppins">
                    Siia tulevad kasutaja andmed, kuulutuste nimekiri ja muud dashboardi elemendid.
                </p>
            </div>
        </div >
    );
}


