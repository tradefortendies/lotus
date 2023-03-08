import { gsap } from "gsap";
import type { NextPage } from "next";
import { useEffect } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Meta from "../components/Meta";
import TeamMember from "../components/TeamMember";
import teamMembers from "../data/team.json";
import { Member } from "../types";

const Team: NextPage = () => {
    useEffect(() => {
        setTimeout(() => {
            gsap.to("#masthead > h1, #masthead > h2", {
                opacity: 1,
                duration: 0.75,
                stagger: 0.25,
            });

            gsap.to("#team-members > div", {
                opacity: 1,
                duration: 0.75,
                stagger: 0.25,
                delay: 1,
            });
        }, 1000);
    }, []);

    return (
        <>
            <Meta title="The Lotus Team" />
            <>
                <Header
                    position="slide"
                    active="team"
                    linkColor="white"
                    fadeInAnimation={false}
                    colorChangeAnimation={false}
                />
                <div className="w-screen min-h-screen text-neutral-900 bg-lily-blue">
                    <div className="relative">
                        <div className="relative z-10">
                            <div className="text-white bg-neutral-900">
                                <div className="relative flex flex-col w-full min-h-screen px-4 pt-32 mx-auto lg:px-8 lg:pt-56 max-w-7xl">
                                    <div
                                        id="masthead"
                                        className="flex flex-col justify-between gap-4 lg:items-center lg:flex-row"
                                    >
                                        <h1 className="w-full font-mono text-6xl opacity-0 lg:text-7xl">
                                            Our team
                                        </h1>
                                        <h2 className="font-sans text-xl lg:text-[29px] leading-normal opacity-0">
                                            The Lotus is steered by a global
                                            team united in their goal of making
                                            the most exciting project possible.
                                        </h2>
                                    </div>
                                    <div
                                        id="team-members"
                                        className="grid grid-cols-2 my-16 lg:grid-cols-3 lg:my-36 gap-x-6 lg:gap-x-10 gap-y-16"
                                    >
                                        {teamMembers.team.map(
                                            (member: Member, index) => (
                                                <TeamMember
                                                    key={index}
                                                    {...member}
                                                />
                                            )
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <Footer />
                    </div>
                </div>
            </>
        </>
    );
};

export default Team;
