/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                sidebar: '#001529',
                sidebarSelected: '#1890ff',
            },
        },
    },
    plugins: [],
}
