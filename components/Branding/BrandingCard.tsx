type BrandingCardProps = {
    title: string;
    svgLink: string;
    pngLink: string;
    img: string;
};

export function BrandingCard({
    title,
    svgLink,
    pngLink,
    img,
}: BrandingCardProps) {
    return (
        <div className="flex flex-col sm:flex-row md:flex-row lg:flex-row py-8 md:justify-between">
            <div className="flex flex-col sm:gap-6 gap-3">
                <h2 className="font-mono text-2xl">{title}</h2>
                <div className="flex gap-4">
                    <button className=" rounded-full bg-transparent border-black text-neutral-800 py-1 px-8 border-2 hover:bg-lily-black hover:text-white">
                        <a href={svgLink} download>
                            SVG
                        </a>
                    </button>
                    <button className=" rounded-full bg-transparent  border-black text-neutral-800 py-1 px-8 border-2 hover:bg-lily-black hover:text-white">
                        <a href={pngLink} download>
                            PNG
                        </a>
                    </button>
                </div>
            </div>
            <div className="my-auto shrink-0 mt-4 md:mt-8  ">
                <img src={img} />
            </div>
        </div>
    );
}
