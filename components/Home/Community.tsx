import { useContext } from 'react'
import { Fade } from 'react-awesome-reveal'
import { ThemeContext } from '../Theme'
import { Panel } from './Panel'

export const Community = () => {
  const theme = useContext(ThemeContext)
  return (
    <Panel floating={true}>
      <div className="flex flex-col items-center w-full gap-8 px-8 py-16 mx-auto md:flex-row max-w-screen-lily-container">
        <div className="w-1/2">
          <Fade
            cascade={true}
            duration={500}
            delay={200}
            damping={0.35}
            fraction={0}
          >
            <h2 className="text-6xl font-bold text-left">Community</h2>
            <p className="pr-16 mt-12 text-3xl text-center md:text-left">
              We have holders in 65 countries and we are growing every day.
            </p>
          </Fade>

          <Fade cascade={true} duration={500} delay={400} fraction={0}>
            <h3 className="mt-16 mb-4 text-3xl font-bold">Recent Sales</h3>
          </Fade>
          <section className="flex flex-col gap-2">
            <Fade
              cascade={true}
              duration={500}
              delay={600}
              damping={0.35}
              fraction={0}
            >
              <article>
                <a
                  className="max-w-[450px] flex items-center justify-start p-4 text-white rounded-xl bg-lily-black"
                  href="#"
                >
                  <img
                    className="w-20 rounded-xl"
                    src="https://lotusgang-assets.sfo3.cdn.digitaloceanspaces.com/collections%2Flotus-gang%2Fwebp%2F13QK2paaxsZJCmWGX7wctZ81dsquywTkD62b3T8FpPtP.webp"
                  />
                  <div className="ml-4">
                    <h3 className="text-xl font-bold">Lotus Lady #644</h3>
                    <p>8.39 SOL</p>
                  </div>
                  <img className="ml-auto" src="/img/arrow-icon.svg" />
                </a>
              </article>
              <article>
                <a
                  className="max-w-[450px] flex items-center justify-start p-4 text-white rounded-xl bg-lily-black"
                  href="#"
                >
                  <img
                    className="w-20 rounded-xl"
                    src="https://lotusgang-assets.sfo3.cdn.digitaloceanspaces.com/collections%2Flotus-gang%2Fwebp%2F13QK2paaxsZJCmWGX7wctZ81dsquywTkD62b3T8FpPtP.webp"
                  />
                  <div className="ml-4">
                    <h3 className="text-xl font-bold">Lotus Lady #644</h3>
                    <p>8.39 SOL</p>
                  </div>
                  <img className="ml-auto" src="/img/arrow-icon.svg" />
                </a>
              </article>
              <article>
                <a
                  className="max-w-[450px] flex items-center justify-start p-4 text-white rounded-xl bg-lily-black"
                  href="#"
                >
                  <img
                    className="w-20 rounded-xl"
                    src="https://lotusgang-assets.sfo3.cdn.digitaloceanspaces.com/collections%2Flotus-gang%2Fwebp%2F13QK2paaxsZJCmWGX7wctZ81dsquywTkD62b3T8FpPtP.webp"
                  />
                  <div className="ml-4">
                    <h3 className="text-xl font-bold">Lotus Lady #644</h3>
                    <p>8.39 SOL</p>
                  </div>
                  <img className="ml-auto" src="/img/arrow-icon.svg" />
                </a>
              </article>
            </Fade>
          </section>
        </div>
        <div className="w-1/2">
          <Fade duration={500} delay={1200} fraction={0}>
            <div
              className="gap-4 px-4 py-8 mx-auto text-center max-w-[512px] rounded-xl"
              style={{ background: theme.primaryColor }}
            >
              <h3 className="text-2xl font-bold">Spotlight</h3>
              <p className="text-lg">Coming soon...</p>
            </div>
          </Fade>
        </div>
      </div>
    </Panel>
  )
}
