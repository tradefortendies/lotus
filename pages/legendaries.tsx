import type { NextPage } from 'next'
import { useEffect } from 'react'
import { gsap } from 'gsap'
import Meta from '../components/Meta'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Button from '../components/Button'

const legendaries = [
  {
    name: 'The Bride',
    image: '/img/legendary-grid.gif',
    url: '',
  },
  {
    name: 'The Phoenix',
    image: '/img/legendaries/The-Phoenix.png',
    url: 'https://vxvoblf6pigo2iyizr3sjbkpa7nl5ecbmcst2677ondydacf6u2a.arweave.net/rergrL56DO0jCMx3JIVPB9q-kEFgpT17_3NHgYBF9TQ?ext=png',
  },
  {
    name: 'The Destroyer',
    image: '/img/legendary-grid.gif',
    url: '',
  },
  {
    name: 'The Summoner',
    image: '/img/legendary-grid.gif',
    url: '',
  },
  {
    name: 'The Timeless',
    image: '/img/legendary-grid.gif',
    url: '',
  },
  {
    name: 'The Master',
    image: '/img/legendary-grid.gif',
    url: '',
  },
  {
    name: 'The Warrior',
    image: '/img/legendary-grid.gif',
    url: '',
  },
  {
    name: 'The Petal',
    image: '/img/legendary-grid.gif',
    url: '',
  },
  {
    name: 'The Hollowed',
    image: '/img/legendaries/The-Hollowed.png',
    url: 'https://nsix5547u7wgwohbmjz5r7abqpu3uu466t4gug6keph2bkn6x2za.arweave.net/bJF-95-n7Gs44WJz2PwBg-m6U570-GobyiPPoKm-vrI?ext=png',
  },
  {
    name: 'The Scientist',
    image: '/img/legendaries/The-Scientist.png',
    url: '',
  },
]

const Legendaries: NextPage = () => {
  useEffect(() => {
    setTimeout(() => {
      gsap.to('#masthead h1, #masthead h2, #masthead a', {
        opacity: 1,
        duration: 0.75,
        stagger: 0.25,
      })

      gsap.to('#legendaries > div > div', {
        opacity: 1,
        duration: 0.75,
        delay: 0.5,
        stagger: 0.25,
      })
    }, 1000)
  }, [])

  return (
    <>
      <Meta title="Legendaries" />
      <>
        <Header
          position="slide"
          linkColor="white"
          fadeInAnimation={false}
          colorChangeAnimation={false}
          iconHoverColorAnimations={false}
        />
        <div className="w-screen min-h-screen text-neutral-900 bg-lily-blue">
          <div className="relative">
            <div className="relative w-full text-white bg-neutral-900 pb-28">
              <div className="relative flex flex-col w-full px-4 pt-32 mx-auto lg:px-8 lg:pt-48 max-w-7xl">
                <div
                  id="masthead"
                  className="flex flex-col justify-between gap-4 lg:items-start lg:flex-row"
                >
                  <div className="w-full">
                    <h1 className="font-mono text-6xl opacity-0 lg:text-7xl">
                      Legendaries
                    </h1>
                    <Button
                      href="https://legendary.thelotus.io"
                      target="_blank"
                      rel="noreferrer"
                      className="mt-8 opacity-0"
                    >
                      Go to Planting
                    </Button>
                  </div>
                  <div className="mt-8 ml-auto lg:mt-0">
                    <h2 className="font-sans text-xl leading-normal opacity-0 lg:text-xl">
                      Plant a Lotus and LILY to gain Legendary Points (LP). The
                      higher your LP, the higher the chance of winning a
                      Legendary LILY.
                    </h2>
                  </div>
                </div>
                <div
                  id="legendaries"
                  className="flex flex-col items-center justify-center w-full my-16"
                >
                  <div className="grid grid-cols-2 gap-6 lg:gap-y-12 lg:gap-x-12 xl:gap-x-[52px] md:grid-cols-3 lg:grid-cols-5">
                    {legendaries.map((leg, index) => (
                      <div className="text-center opacity-0" key={index}>
                        <h2 className="mb-2 font-sans text-lg md:text-xl">
                          {leg.name}
                        </h2>
                        {!leg.url && <img src={leg.image} />}
                        {leg.url && (
                          <a href={leg.url} target="_blank" rel="noreferrer">
                            <img src={leg.image} />
                          </a>
                        )}
                      </div>
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

export default Legendaries
