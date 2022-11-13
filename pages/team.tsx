import type { NextPage } from 'next'
import { useEffect } from 'react'
import { gsap } from 'gsap'
import Meta from '../components/Meta'
import Header from '../components/Header'
import Footer from '../components/Footer'
import TeamMember from '../components/TeamMember'

const teamMembers = [
  {
    name: 'Bunjil',
    position: 'Founder',
    avatar: '/img/team/bunjil.jpg',
    bio: 'Founder. Bunjil is an artist. He left the banking and finance industry to research Web3 and create The Lotus. He wants to share his passion for illustration, entertainment and optimalism.',
    twitter: 'notbunjil',
  },
  {
    name: 'CY',
    position: 'Head of Community',
    avatar: '/img/team/cy.jpg',
    bio: "CY is an award-winning photographer and filmmaker who spent the last 10 years working for NBCUniversal's USA Network & Blumhouse Productions.  After scaling and selling an online fitness brand during the pandemic, CY transitioned to web3 full time.  He aims to bring his experience in chaos management to effeciently create and scale teams to tackle complex issues.",
    twitter: 'not_CY_',
  },
  {
    name: 'Kylie',
    position: 'Head of Moderation',
    avatar: '/img/team/kylie.jpg',
    bio: 'Kylie is Community and Moderation Manager for several established NFT projects on Solana. With over 5 years of experience leading software development teams, Kylie seeks to bring her Web2 knowledge and expertise to Web3, and ultimately disrupt conventional processes through unconventional means.',
    twitter: '0xkyliegender',
  },
  {
    name: 'Chambaz',
    position: 'Head of Technology',
    avatar: '/img/team/chambaz.jpg',
    bio: 'Chambaz is a Senior Software Engineer at Metaplex. With 15 years experience in full stack web2 development, Chambaz went full time crypto and NFTs in 2022. He has been building web3 apps and experiences across multiple chains since 2020 and now focuses predominantly on the Solana ecosystem.',
    twitter: 'chambaz',
  },
  {
    name: 'Kenny',
    position: 'Head of Research',
    avatar: '/img/team/kenny.jpg',
    bio: 'Kennyatta is a career photographer and strategist. Over the years, his experience in brand development, market strategy and field market research has lead him be called upon as a frequent writer for publications such as Adweek. Kennyatta seeks to bring the collection of his experiences to Web3 in the hopes of creating a thriving ecosystem for the advancement of knowledge, understanding, and the arts.',
    twitter: 'ItsKennyatta',
  },
  {
    name: 'Luk3ark',
    position: 'Senior Engineer',
    avatar: '/img/team/luk3ark.jpg',
    bio: 'Luk3ark is a DevOps engineer with experience in the financial industry. He has been building Web3 smart contracts and programs since 2020. He loves meeting new people, listening to drum and bass and teaching others.',
    twitter: 'luk3ark',
  },
]

const Team: NextPage = () => {
  useEffect(() => {
    setTimeout(() => {
      gsap.to('#masthead > h1, #masthead > h2', {
        opacity: 1,
        duration: 0.75,
        stagger: 0.25,
      })

      gsap.to('#team-members > div', {
        opacity: 1,
        duration: 0.75,
        stagger: 0.25,
        delay: 1,
      })
    }, 1000)
  }, [])

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
                      The Lotus is steered by a global team united in their goal
                      of making the most exciting project possible.
                    </h2>
                  </div>
                  <div
                    id="team-members"
                    className="grid grid-cols-2 my-16 lg:grid-cols-3 lg:my-36 gap-x-6 lg:gap-x-10 gap-y-16"
                  >
                    {teamMembers.map((member, index) => (
                      <TeamMember key={index} {...member} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <Footer />
          </div>
        </div>
      </>
    </>
  )
}

export default Team
