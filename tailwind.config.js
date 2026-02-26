/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                emerald: {
                    900: '#004D3F', // Deep Forest Emerald
                    800: '#006B57',
                },
                slate: {
                    900: '#0F172A',
                    800: '#1E293B', // Slate Navy
                },
                silver: '#E2E8F0', // Silk Silver
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                display: ['Outfit', 'sans-serif'],
            },
        },
    },
    plugins: [],
}
