/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                poppins: ['Poppins', 'sans-serif'],
            },
            colors: {
                gradientStart: '#3b82f6', // hele sinine
                gradientEnd: '#f472b6',   // hele roosa
                brandPink: '#9A85A6', //buttoni taust, Login button jms
            },

        },
    },
    plugins: [],
};
