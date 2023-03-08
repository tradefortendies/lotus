module.exports = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ["garet"],
                mono: ["Space Mono", "monospace"],
            },
            colors: {
                "lily-blue": "#61FEFF",
                "lily-blue-dark": "#91B9FF",
                "lily-green": "#7FFFB9",
                "lily-yellow": "#FFD462",
                "lily-tan": "#E9E1D1",
                "lily-black": "#222222",
                "lily-red": "#FF9596",
                "lily-white": "#FFFFFF",
                "lily-beige": "#FFFCF8",
            },
            animation: {
                "spin-slow": "spin 5s linear infinite",
                "spin-extra-slow": "spin 10s linear infinite",
            },
            screens: {
                smLaptop: { raw: "(max-height: 900px) and (min-width: 768px)" },
                xsLaptop: { raw: "(max-height: 800px) and (min-width: 768px)" },
                smPhone: { raw: "(max-height: 720px)" },
                "lily-container": "1340px",
            },
            transitionProperty: {
                widthHeight: "width, height",
            },
        },
    },
    plugins: [],
};
