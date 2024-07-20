import defaultTheme from "tailwindcss/defaultTheme";
import forms from "@tailwindcss/forms";

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php",
        "./storage/framework/views/*.php",
        "./resources/views/**/*.blade.php",
        "./resources/js/**/*.jsx",
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ["Figtree", ...defaultTheme.fontFamily.sans],
            },
            colors: {
                primary: "#012d40",
                primaryDark: "#011b26",
                secondary: "#036873",
                light: "#d2d8d8",
                lightgray: "#e5e7eb",
                lightergray: "#e5e7eb",
                success: "#10b981",
                gray: "#e5e5e5",
                danger: "#ff0000",
                white: "#ffffff",
                pColor: "#9ca3af",
                warning: "#fbbf24",
            },
        },
    },

    plugins: [forms],
};
