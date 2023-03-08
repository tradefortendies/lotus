import { ColorCards } from "../components/Branding/colorCard";
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
                    linkColor="white"
                    fadeInAnimation={false}
                    colorChangeAnimation={false}
                />
                <div className="w-screen min-h-screen text-neutral-900 bg-lily-white">
                    <div className="relative">
                        <div className="relative z-10"></div>
                        <div className="font-sans lg:w-7/12 mx-6 md:mx-12 lg:ml-24 text-lily-black mt-32">
                            <div className="divide-y divide-black">
                                <h1 className=" text-6xl font-medium py-8">
                                    Branding
                                </h1>
                                <div className="flex flex-col sm:flex-row md:flex-row lg:flex-row py-8 lg:gap-72 gap-6">
                                    <div className="flex flex-col sm:gap-6 gap-3">
                                        <h2 className="font-mono text-2xl">
                                            Wordmark
                                        </h2>
                                        <div className="flex gap-4">
                                            <button className=" rounded-full bg-transparent border-black text-neutral-800 py-1 px-8 border-2">
                                                <a
                                                    href="/img/lotus_wordmark.svg"
                                                    download
                                                >
                                                    SVG
                                                </a>
                                            </button>
                                            <button className=" rounded-full bg-transparent  border-black text-neutral-800 py-1 px-8 border-2">
                                                <a
                                                    href="/img/lotus_wordmark.png"
                                                    download
                                                >
                                                    PNG
                                                </a>
                                            </button>
                                        </div>
                                    </div>
                                    <div className="my-auto">
                                        <img src="/img/lotus_wordmark.png" />
                                    </div>
                                </div>
                                <div className="flex flex-col sm:flex-row md:flex-row py-8 lg:gap-72 gap-6">
                                    <div className="flex flex-col gap-3">
                                        <h2 className="font-mono text-2xl">
                                            Logo (pack)
                                        </h2>
                                        <div className="flex gap-4">
                                            <button className=" rounded-full bg-transparent border-black text-neutral-800 py-1 px-8 border-2">
                                                <a
                                                    href="/img/logo_pack.svg"
                                                    download
                                                >
                                                    SVG
                                                </a>
                                            </button>
                                            <button className=" rounded-full bg-transparent border-black text-neutral-800 py-1 px-8 border-2">
                                                <a
                                                    href="/img/logo_pack.png"
                                                    download
                                                >
                                                    PNG
                                                </a>
                                            </button>
                                        </div>
                                    </div>
                                    <img
                                        src="/img/logo_pack.png"
                                        className="h-1/2 my-auto"
                                    />
                                </div>
                                <div className="flex flex-col sm:flex-row md:flex-row  py-8 lg:gap-72 gap-6">
                                    <div className="flex flex-col gap-3">
                                        <h2 className="font-mono text-2xl">
                                            Logotype (pack)
                                        </h2>
                                        <div className="flex gap-4">
                                            <button className=" rounded-full bg-transparent border-black text-neutral-800 py-1 px-8 border-2">
                                                <a
                                                    href="/img/logotype_pack.svg"
                                                    download
                                                >
                                                    SVG
                                                </a>
                                            </button>
                                            <button className=" rounded-full bg-transparent border-black text-neutral-800 py-1 px-8 border-2">
                                                <a
                                                    href="/img/logotype_pack.png"
                                                    download
                                                >
                                                    PNG
                                                </a>
                                            </button>
                                        </div>
                                    </div>
                                    <img
                                        src="/img/logotype_pack.png"
                                        className="h-1/2 my-auto"
                                    />
                                </div>
                                <div className="flex flex-col sm:flex-row md:flex-row py-8 lg:gap-72 gap-6">
                                    <div className="flex flex-col gap-3">
                                        <h2 className="font-mono text-2xl">
                                            Workmark (Pack)
                                        </h2>
                                        <div className="flex gap-4">
                                            <button className=" rounded-full bg-transparent border-black text-neutral-800 py-1 px-8 border-2">
                                                <a
                                                    href="/img/wordmark_pack.svg"
                                                    download
                                                >
                                                    SVG
                                                </a>
                                            </button>
                                            <button className=" rounded-full bg-transparent border-black text-neutral-800 py-1 px-8 border-2">
                                                <a
                                                    href="/img/wordmark_pack.png"
                                                    download
                                                >
                                                    PNG
                                                </a>
                                            </button>
                                        </div>
                                    </div>
                                    <img
                                        src="/img/wordmark_pack.png"
                                        className="h-1/2 my-auto"
                                    />
                                </div>
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
