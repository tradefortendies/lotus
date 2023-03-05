import { useState } from 'react'
import clsx from 'clsx'
import { Panel } from './Panel'

const experiments = [
  {
    id: 1,
    title: 'Silk Road',
    color: 'green',
    body: 'A single-player browser trading game which teaches basic trading ideas using items from the Lotus universe.',
    video: '/img/experiments/silkroad.mp4',
    button: {
      url: 'https://silkroad.thelotus.io/',
      text: 'Play Now',
    },
  },
  {
    id: 2,
    title: 'Metaverse Models',
    color: 'yellow',
    body: 'Development of 3D/2D Models for Metaverse integration.',
    video: '/img/experiments/metaversepromo.mp4',
  },
  {
    id: 3,
    title: 'Floor Calculator',
    color: 'red',
    body: 'What if you could compare floor prices of NFT collections by market cap? Well, you can.',
    img: '/img/experiments/calculator.png',
    button: {
      url: 'https://floor.lotusgang.com/',
      text: 'Calculate',
    },
  },
  {
    id: 4,
    title: 'Planting',
    color: 'blue-dark',
    body: 'A fresh new way to distribute Legendary LILIES to our holders after mint.',
    img: '/img/experiments/planting.gif',
    button: {
      url: 'https://legendary.thelotus.io',
      text: 'Planting',
    },
  },
]

export const Experiments = () => {
  const [activeExperiment, setActiveExperiment] = useState(0)
  return (
    <Panel floating={false} fixedHeight={false} className="!pb-0">
      <div className="flex flex-col-reverse items-center justify-center w-full gap-4 lg:flex-row">
        <div className="relative w-full h-full lg:w-1/2">
          <div className="absolute h-[80%] md:h-[60%] left-0 flex flex-col justify-center w-full -translate-y-[50%] md:-translate-y-[70%] lg:-translate-y-1/2 top-1/2">
            {experiments.map((item) => (
              <button
                key={item.id}
                className={clsx(
                  'px-4 lg:px-16 py-3 font-medium flex flex-col justify-start text-left rounded-r-xl transition-widthHeight',
                  item.color === 'green' && 'bg-lily-green',
                  item.color === 'yellow' && 'bg-lily-yellow',
                  item.color === 'blue-dark' && 'bg-lily-blue-dark',
                  item.color === 'red' && 'bg-lily-red',
                  item.id !== activeExperiment &&
                    activeExperiment !== 0 &&
                    'w-[90%] lg:w-[75%] h-16 overflow-hidden duration-0',
                  item.id !== activeExperiment &&
                    activeExperiment === 0 &&
                    'w-[90%] lg:w-[75%] lg:hover:w-[85%] h-14 overflow-hidden duration-0',
                  item.id === activeExperiment &&
                    'w-[90%] h-full duration-1000 pt-8 pb-12'
                )}
                onClick={() =>
                  setActiveExperiment(
                    activeExperiment === item.id ? 0 : item.id
                  )
                }
              >
                <h3
                  className={clsx(
                    item.id !== activeExperiment && 'text-xl lg:text-2xl',
                    item.id === activeExperiment &&
                      'text-3xl lg:text-4xl transition delay-200'
                  )}
                >
                  {item.title}
                </h3>

                <div
                  className={clsx(
                    'mt-8 mb-4 lg:mb-0 text-xl font-light transition-opacity',
                    item.id !== activeExperiment &&
                      'opacity-0 duration-[0] delay-0',
                    item.id === activeExperiment &&
                      'opacity-100 duration-500 delay-500'
                  )}
                >
                  <div className="flex gap-12">
                    <div className="w-full">
                      <p className="w-full">{item.body}</p>
                      {item.button && (
                        <a
                          className="inline-block mt-8 text-xl font-bold transition-colors border-b-2 border-transparent cursor-pointer hover:border-lily-black"
                          href={item.button.url}
                        >
                          {item.button.text}
                        </a>
                      )}
                    </div>
                    {item.img && (
                      <img
                        className="hidden lg:block w-[40%] rounded-lg"
                        src={item.img}
                      />
                    )}
                    {item.video && (
                      <video
                        autoPlay
                        playsInline
                        loop
                        muted
                        className="hidden lg:block w-[40%] rounded-lg"
                      >
                        <source src={item.video} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
        <div className="w-full px-4 pt-16 lg:p-0 lg:w-1/2">
          <h2 className="text-6xl font-medium xl:text-7xl">
            E<strong className="font-bold">xp</strong>eriment
            <br className="hidden lg:block" /> with{' '}
            <strong className="font-bold">u</strong>s
          </h2>
        </div>
      </div>
    </Panel>
  )
}
