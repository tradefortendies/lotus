import { BrandingCard } from "../components/Branding/BrandingColorCard";
import { ColorCards } from "../components/Branding/ColorCard";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Meta from "../components/Meta";

const branding = () => {
    return (
        <>
            <Meta title="Branding" />
            <>
                <Header
                    position="slide"
                    active="team"
                    linkColor="black"
                    fadeInAnimation={false}
                    colorChangeAnimation={false}
                />
                <div className="w-screen min-h-screen text-neutral-900 bg-lily-white pt-8">
                    <div className="relative">
                        <div className="relative z-10"></div>
                        <div className="font-sans xl:w-1/2 mx-6 md:mx-12 lg:ml-24 text-lily-black mt-32">
                            <div className="divide-y divide-black">
                                <h1 className=" text-6xl font-medium py-8">
                                    Branding
                                </h1>
                                <BrandingCard
                                    title="Wordmark"
                                    svgLink="/img/lotus_wordmark.svg"
                                    pngLink="/img/lotus_wordmark.png"
                                    img="/img/lotus_wordmark.png"
                                />
                                <BrandingCard
                                    title="Logo (pack)"
                                    svgLink="/img/logo_pack.svg"
                                    pngLink="/img/logo_pack.png"
                                    img="/img/logo_pack.png"
                                />
                                <BrandingCard
                                    title="Logotype (pack)"
                                    svgLink="/img/logotype_pack.svg"
                                    pngLink="/img/logotype_pack.png"
                                    img="/img/logotype_pack.png"
                                />
                                <BrandingCard
                                    title="Workmark (Pack)"
                                    svgLink="/img/wordmark_pack.svg"
                                    pngLink="/img/wordmark_pack.png"
                                    img="/img/wordmark_pack.png"
                                />
                                <div className="py-24 ">
                                    <ColorCards />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </>
        </>
    );
};

export default branding;
