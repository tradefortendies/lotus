import { useState } from 'react'
import clsx from 'clsx'
import { Panel } from './Panel'

const experiments = [
  {
    id: 1,
    title: 'Silk Road',
    color: 'blue',
  },
  {
    id: 2,
    title: 'Metaverse Models',
    color: 'yellow',
  },
  {
    id: 3,
    title: 'Floor Calculator',
    color: 'red',
  },
  {
    id: 4,
    title: 'Planting',
    color: 'blue-dark',
  },
]

export const Experiments = () => {
  const [activeExperiment, setActiveExperiment] = useState(0)
  return (
    <Panel floating={false} fixedHeight={false}>
      <div className="flex flex-col-reverse items-center justify-center w-full gap-4 lg:flex-row">
        <div className="relative w-full h-full lg:w-1/2">
          <div className="absolute h-1/2 left-0 flex flex-col justify-center w-full -translate-y-[70%] lg:-translate-y-1/2 top-1/2">
            {experiments.map((item) => (
              <button
                key={item.id}
                className={clsx(
                  'px-4 lg:px-16 py-2 text-2xl font-semibold flex flex-col justify-start text-left rounded-r-xl transition-widthHeight',
                  item.color === 'blue' && 'bg-lily-blue',
                  item.color === 'yellow' && 'bg-lily-yellow',
                  item.color === 'blue-dark' && 'bg-lily-blue-dark',
                  item.color === 'red' && 'bg-lily-red',
                  item.id !== activeExperiment &&
                    'w-[90%] lg:w-1/2 h-12 duration-100',
                  item.id === activeExperiment && 'w-[90%] h-full duration-500'
                )}
                onClick={() => setActiveExperiment(item.id)}
              >
                {item.title}

                <div
                  className={clsx(
                    'mt-8 mb-4 lg:mb-0 text-base font-light transition-opacity',
                    item.id !== activeExperiment &&
                      'opacity-0 duration-[0] delay-0',
                    item.id === activeExperiment &&
                      'opacity-100 duration-500 delay-200'
                  )}
                >
                  <p>
                    Enim est eu laborum ea reprehenderit velit tempor labore
                    consectetur nisi dolore. Ex mollit id qui sunt voluptate
                    esse velit cillum aute aliquip laboris deserunt. Eiusmod
                    velit incididunt fugiat voluptate. Adipisicing anim non
                    dolore cupidatat incididunt ipsum in velit Lorem ea sint
                    nisi sit velit. Non do sunt cupidatat commodo consectetur id
                    ut exercitation. Nostrud fugiat culpa nisi ut quis ullamco
                    nisi cillum. Adipisicing tempor enim tempor adipisicing elit
                    ex quis.
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>
        <div className="w-full px-4 pt-16 lg:p-0 lg:w-1/2">
          <h2 className="text-6xl font-bold xl:text-7xl">
            Experiments
            <br className="hidden lg:block" /> and Fun
          </h2>
        </div>
      </div>
    </Panel>
  )
}
