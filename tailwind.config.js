/** @type {import('tailwindcss').Config} */
module.exports = {
    // NOTE: Update this to include the paths to all files that contain Nativewind classes.
    content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
    presets: [require("nativewind/preset")],
    theme: {
        extend: {
            colors: {
                primary: '#F5F5F5',
                accent: '#FFFFFF',
                green: '#57e77a',
                tertiary: '#005d9e',
                alert: '#D50A0A',
                secondary: '#FF7900',
                light: {
                    100: '#b1babf',
                    200: '#ffffff',
                    300: '#696158',
                },
                dark: {
                    100: '#000000',
                    200: '#34302B',
                    300: '#0A0A08',
                }
            }
        },
    },
    plugins: [],
}