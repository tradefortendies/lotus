import { BrandingCard } from "../components/Branding/BrandingCard";
import { ColorCards } from "../components/Branding/BrandingColorCard";
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
                <div className="w-screen min-h-screen pt-8 text-neutral-900 bg-lily-white">
                    <div className="relative">
                        <div className="relative z-10"></div>
                        <div className="mx-6 mt-32 font-sans xl:w-7/12  md:mx-12 lg:ml-24 text-lily-black">
                            <div className="divide-y divide-black">
                                <h1 className="py-8 text-6xl font-medium ">
                                    Branding
                                </h1>
                                <BrandingCard
                                    title="Wordmark"
                                    svgLink="/img/lotus_wordmark.svg"
                                    pngLink="/img/lotus_wordmark.png"
                                    img="/img/lotus_wordmark.svg"
                                />
                                <BrandingCard
                                    title="Logo (pack)"
                                    svgLink="/img/logo_pack.svg"
                                    pngLink="/img/logo_pack.png"
                                    img="/img/logo_pack.svg"
                                />
                                <BrandingCard
                                    title="Logotype (pack)"
                                    svgLink="/img/logotype_pack.svg"
                                    pngLink="/img/logotype_pack.png"
                                    img="/img/logotype_pack.svg"
                                />
                                <BrandingCard
                                    title="Workmark (Pack)"
                                    svgLink="/img/wordmark_pack.svg"
                                    pngLink="/img/wordmark_pack.png"
                                    img="/img/wordmark_pack.svg"
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
