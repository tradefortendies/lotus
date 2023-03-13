export function ColorCards() {
    const colorCards: ColorCardProps[] = [
        {
            rgb: "34, 34, 34, 1",
            hex: "#222222",
            colorName: "Charcoal",
            bgStyle: "bg-lily-black",
        },
        {
            rgb: "145, 185, 255, 1",
            hex: "#91B9FF",
            colorName: "Purple",
            bgStyle: "bg-lily-blue-dark",
        },
        {
            rgb: "97, 254, 255, 1",
            hex: "#61FEFF",
            colorName: "Teal",
            bgStyle: "bg-lily-blue",
        },
        {
            rgb: "97, 254, 255, 1",
            hex: "#FFFCF8",
            colorName: "Beige",
            bgStyle: "bg-lily-beige",
        },
        {
            rgb: "255, 212, 98, 1",
            hex: "#FFD462",
            colorName: "Gold",
            bgStyle: "bg-lily-yellow",
        },
        {
            rgb: "97, 254, 255, 1",
            hex: "#7FFFB9",
            colorName: "Green",
            bgStyle: "bg-lily-green",
        },
        {
            rgb: "255, 149, 150, 1",
            hex: "#FF9596",
            colorName: "Peach",
            bgStyle: "bg-lily-red",
        },
        {
            rgb: "255, 255, 255, 1",
            hex: "#FFFFFF",
            colorName: "White",
            bgStyle: "bg-lily-white",
        },
    ];
    return (
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-2 md:gap-8">
            {colorCards.map((colorCard, index) => (
                <ColorCard key={index} {...colorCard} />
            ))}
        </div>
    );
}

type ColorCardProps = {
    rgb: string;
    hex: string;
    colorName: string;
    bgStyle: string;
};

export function ColorCard({ rgb, hex, colorName, bgStyle }: ColorCardProps) {
    const isWhiteText = bgStyle === "bg-lily-black";

    return (
        <div className="border-2 border-black rounded-lg overflow-hidden">
            <div
                className={`${bgStyle} px-3 pb-2 pt-16 border-b-2 border-black `}
            >
                <div
                    className={`text-${
                        isWhiteText ? "white" : "black"
                    } min-w-52`}
                >
                    <p className="font-mono text-xs pb-1">Colour</p>
                    <h2>{colorName}</h2>
                </div>
            </div>
            <div className="flex justify-between py-2 px-3">
                <div>
                    <p className="font-mono text-xs">HEX</p>
                    <p className="text-xs">{hex}</p>
                </div>
                <div>
                    <p className="font-mono text-xs">RGB</p>
                    <p className="text-xs">{rgb}</p>
                </div>
            </div>
        </div>
    );
}
