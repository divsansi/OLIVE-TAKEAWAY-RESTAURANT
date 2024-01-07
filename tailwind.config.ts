import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "gradient-conic":
                    "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
            },
        },
    },
    plugins: [require("daisyui")],
    daisyui: {
        themes: [
            {
                mytheme: {
                    primary: "#854d0e",

                    secondary: "#f59e0b",

                    accent: "#fde68a",

                    neutral: "#713f12",

                    "base-100": "#f5f5f4",

                    info: "#78716c",

                    success: "#bbf7d0",

                    warning: "#fca5a5",

                    error: "#dc2626",
                },
            },
        ],
    },
};
export default config;
