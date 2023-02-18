import { useContext } from 'react'
import { Fade } from 'react-awesome-reveal'
import { formatAddress } from '../../lib/helpers'
import { Panel } from './Panel'
import Theme, { ThemeContext } from '../Theme'
import legendariesData from '../../data/legendaries.json'

const legendaries = legendariesData.legendaries

export const Legendaries = () => {
  const theme = useContext(ThemeContext)
  return (
    <Panel floating={true}>
      <div className="w-full h-full px-8 py-4 mx-auto max-w-screen-lily-container">
        <Fade duration={500} delay={200} fraction={0}>
          <h2 className="mt-16 text-5xl font-bold text-center">
            The Legendaries
          </h2>
        </Fade>
        <div className="flex items-center justify-between h-full my-16">
          <div className="grid grid-cols-2 gap-8 xl:gap-16 md:grid-cols-3 lg:grid-cols-5">
            <Fade
              cascade={true}
              duration={500}
              delay={400}
              damping={0.35}
              fraction={0}
            >
              {legendaries.map((item, index) => (
                <div key={index} className="flex flex-col items-center gap-1">
                  <h3 className="text-lg font-bold">{item.name}</h3>
                  <a href={item.url} target="_blank" rel="noreferrer">
                    <img src={item.image} />
                  </a>
                  <p className="mt-2 text-sm">
                    {formatAddress(item.owner.wallet)}
                  </p>
                  <a
                    href={item.owner.twitterUrl}
                    style={{ color: theme.primaryColor }}
                    className="font-bold"
                    target="_blank"
                    rel="noreferrer"
                  >
                    {item.owner.twitterHandle}
                  </a>
                </div>
              ))}
            </Fade>
          </div>
        </div>
      </div>
    </Panel>
  )
}
