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
    image: '/img/legendaries/The-Destroyer.png',
    url: 'https://5i6k4p5hx2dhkcvvdu5hub3a3ltahzaq7k3e2q2zjabel55pv7dq.arweave.net/6jyuP6e-hnUKtR06egdg2uYD5BD6tk1DWUgCRfevr8c?ext=png',
  },
  {
    name: 'The Summoner',
    image: '/img/legendaries/The-Summoner.png',
    url: 'https://arweave.net/Qz488E_Zon7qS7YsHTN8QSi186e-1Y8IE8DtGezJKMk?ext=png',
  },
  {
    name: 'The Timeless',
    image: '/img/legendaries/The-Timeless.png',
    url: 'https://z6qzomgadhmhkzkozkrifaphiulwxhyxbphi35jowzvythf322tq.arweave.net/z6GXMMAZ2HVlTsqigoHnRRdrnxcLzo31LrZriZy71qc?ext=png',
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
    image: '/img/legendaries/The-Petal.png',
    url: 'https://2rfglijyhtjrvi7no5ex4tbsd4xfmefbwpmjymfgz6tupqra6f5a.arweave.net/1EploTg80xqj7XdJfkwyHy5WEKGz2Jwwps-nR8Ig8Xo?ext=png',
  },
  {
    name: 'The Hollowed',
    image: '/img/legendaries/The-Hollowed.png',
    url: 'https://nsix5547u7wgwohbmjz5r7abqpu3uu466t4gug6keph2bkn6x2za.arweave.net/bJF-95-n7Gs44WJz2PwBg-m6U570-GobyiPPoKm-vrI?ext=png',
  },
  {
    name: 'The Scientist',
    image: '/img/legendaries/The-Scientist.png',
    url: 'https://arweave.net/S1eU3N-n__hjaMxGUamBmgvlnVEt_ZsJwi9Y_tRMXZQ?ext=png',
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
                    <h1 className="font-mono text-5xl opacity-0 md:text-6xl lg:text-7xl">
                      Legendaries
                    </h1>
                    <div className="flex flex-col gap-4 mt-8 md:flex-row">
                      <Button
                        href="https://www.thelotus.io/img/planting.png"
                        target="_blank"
                        rel="noreferrer"
                        className="mr-auto opacity-0 md:mr-0"
                      >
                        How it Works
                      </Button>
                      <Button
                        href="https://legendary.thelotus.io"
                        target="_blank"
                        rel="noreferrer"
                        className="mr-auto opacity-0 md:mr-0"
                      >
                        Plant Collectibles
                      </Button>
                    </div>
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
