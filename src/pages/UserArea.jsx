import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function UserArea() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const [collapseOpen, setCollapseOpen] = useState(false);
    const [burgerOpen, setBurgerOpen] = useState(false);

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        location: "",
        price: "",
        city: "",
        images: []
    });

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    const handleInputChange = (e) => {
        const { name, value, files } = e.target;

        if (name === "images") {                                              //piltide laadimine avutist

            const files = Array.from(e.target.files).slice(0, 6); // kuni 6 pilti korraga
            setFormData((prev) => {
                // lisa uued failid olemasolevatele, kuid kokku max 6
                const updatedImages = [...(prev.images || []), ...files].slice(0, 6);
                return { ...prev, images: updatedImages };
            });


        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        console.log("Form data submitted:", formData);
        // Here you can send the data to your backend API
    };
    console.log(formData)

    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-200 to-pink-200">

            {/* NAVBAR */}
            <div className="fixed top-0 left-0 w-full flex items-center justify-between px-6 py-4 bg-black bg-opacity-40 border-b border-white border-opacity-20 z-30">
                <div className="flex-1">
                    <span className="text-xl sm:text-lg font-bold text-white font-poppins">MyApp</span>
                </div>

                {/* Desktop links */}
                <div className="hidden md:flex space-x-4 items-center text-sm sm:text-xs">
                    <button onClick={() => setCollapseOpen(!collapseOpen)} className="text-white hover:text-pink-500 font-medium">Lisa kuulutus!</button>
                    <a href="#" className="text-white hover:text-pink-500 font-medium">Profiil</a>
                    <a href="#" className="text-white hover:text-pink-500 font-medium">Seaded</a>
                    <span className="text-white font-medium truncate max-w-[120px]">{user.email}</span>
                    <button onClick={handleLogout} className="text-white hover:text-pink-500 font-medium">Logi välja</button>
                </div>

                {/* Mobile burger */}
                <div className="flex md:hidden items-center">
                    <button onClick={() => setBurgerOpen(!burgerOpen)} className="text-white focus:outline-none text-2xl">
                        {burgerOpen ? "×" : "☰"}
                    </button>
                </div>
            </div>

            {/* Mobile menu */}
            {burgerOpen && (
                <div className="md:hidden bg-black bg-opacity-80 w-full text-white flex flex-col space-y-2 p-4 mt-16 z-20">
                    <button onClick={() => setCollapseOpen(!collapseOpen)} className="hover:text-pink-500 font-medium text-left">Lisa kuulutus!</button>
                    <a href="#" className="hover:text-pink-500 font-medium">Profiil</a>
                    <a href="#" className="hover:text-pink-500 font-medium">Seaded</a>
                    <span className="truncate max-w-[150px]">{user.email}</span>
                    <button onClick={handleLogout} className="hover:text-pink-500 font-medium text-left">Logi välja</button>
                </div>
            )}

            {/* CONTENT */}
            <div className="pt-24 p-4">
                <div className="bg-white rounded-md shadow p-4 max-w-full sm:max-w-2xl mx-auto">
                    <button
                        onClick={() => setCollapseOpen(!collapseOpen)}
                        className="w-full flex justify-between items-center p-4 bg-pink-500 text-white rounded-md text-lg sm:text-base"
                    >
                        <span className="font-semibold">Lisa kuulutus!</span>
                        <span className="text-2xl leading-none">{collapseOpen ? "−" : "+"}</span>
                    </button>

                    <div className={`overflow-hidden transition-all duration-300 ${collapseOpen ? "max-h-[1000px] mt-4" : "max-h-0"}`}>
                        {collapseOpen && (
                            <form onSubmit={handleFormSubmit} className="p-4 bg-gray-50 rounded-lg border flex flex-col space-y-3">

                                <label className="block font-medium text-sm sm:text-xs">Pealkiri</label>
                                <input
                                    name="title"
                                    type="text"
                                    value={formData.title}           // <-- controlled
                                    onChange={handleInputChange}
                                    className="w-full p-2 border rounded text-sm sm:text-xs"
                                    placeholder="Kuulutuse pealkiri"
                                />

                                <label className="block font-medium text-sm sm:text-xs">Kirjeldus</label>
                                <textarea
                                    name="description"
                                    value={formData.description}     // <-- controlled
                                    onChange={handleInputChange}
                                    className="w-full p-2 border rounded text-sm sm:text-xs"
                                    placeholder="Kirjeldus"
                                    rows={4}
                                />

                                <label className="block font-medium text-sm sm:text-xs">Asukoht</label>
                                <input
                                    name="location"
                                    type="text"
                                    value={formData.location}        // <-- controlled
                                    onChange={handleInputChange}
                                    className="w-full p-2 border rounded text-sm sm:text-xs"
                                    placeholder="Maakond / linn"
                                />

                                <label className="block font-medium text-sm sm:text-xs">Hind</label>
                                <input
                                    name="price"
                                    type="number"
                                    value={formData.price}           // <-- controlled
                                    onChange={handleInputChange}
                                    className="w-full p-2 border rounded text-sm sm:text-xs"
                                    placeholder="Hind"
                                />
                                <label className="block font-medium text-sm sm:text-xs">Upload images (max 6)</label>
                                <input
                                    type="file"
                                    name="images"
                                    multiple
                                    accept="image/*"
                                    onChange={handleInputChange}
                                    className="w-full p-2 border rounded text-sm sm:text-xs"
                                />


                                <button
                                    type="submit"
                                    className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition text-sm sm:text-xs"
                                >
                                    Salvesta kuulutus
                                </button>
                                <div className="flex flex-wrap gap-2 mt-2">
                                    {formData.images && formData.images.map((file, idx) => (
                                        <div key={idx} className="w-1/3 p-1">
                                            <img
                                                src={URL.createObjectURL(file)}
                                                alt={`preview-${idx}`}
                                                className="w-full h-24 object-cover rounded"
                                            />
                                        </div>
                                    ))}
                                </div>

                            </form>
                        )}
                    </div>
                </div>
            </div>

        </div>
    );
}
