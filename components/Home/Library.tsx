import { useContext } from 'react'
import { Fade } from 'react-awesome-reveal'
import { ThemeContext } from '../Theme'
import { Panel } from './Panel'
import Button from '../Button'

export const Library = () => {
  const theme = useContext(ThemeContext)

  return (
    <Panel floating={false} mode={'dark'}>
      <div className="flex flex-col w-full gap-4 px-8 pt-16 pb-32 mx-auto md:flex-row max-w-screen-lily-container">
        <div className="flex flex-col items-center justify-center w-full h-full md:items-start">
          <Fade
            cascade={true}
            duration={500}
            delay={200}
            damping={0.35}
            fraction={0}
          >
            <h2 className="text-6xl font-bold text-left">Lotus Library</h2>
            <p className="mt-12 text-3xl text-center md:text-left">
              The best crypto information and tools are hard to find. We are
              working with the community to index it in one place.
            </p>
          </Fade>
          <dl className="flex flex-wrap mt-10 text-3xl md:mt-24">
            <Fade
              cascade={true}
              duration={500}
              delay={400}
              damping={0.35}
              fraction={0}
            >
              <dd className="mr-1" style={{ color: theme.primaryColor }}>
                56
              </dd>
              <dt>Articles</dt>
              <dd className="ml-8 mr-1" style={{ color: theme.primaryColor }}>
                14
              </dd>
              <dt>Writers</dt>
              <dd className="ml-8 mr-1" style={{ color: theme.primaryColor }}>
                8
              </dd>
              <dt>Partnerships</dt>
            </Fade>
          </dl>
          <Fade duration={500} delay={1400} fraction={0}>
            <Button
              href="#"
              type="pill-outline"
              className="mx-auto my-10 md:mb-0 md:mt-8 md:ml-0"
            >
              Explore
            </Button>
          </Fade>
        </div>
        <div className="flex items-center w-full">
          <section className="flex flex-col gap-8 max-w-[380px] mx-auto md:mr-0 md:ml-auto">
            <Fade
              cascade={true}
              duration={500}
              delay={0.2}
              damping={0.35}
              fraction={0}
            >
              <article>
                <a href="">
                  <img
                    src="https://via.placeholder.com/380x135"
                    className="object-cover w-full rounded-t-xl"
                  />
                </a>
                <div
                  className="flex flex-col p-4 text-lily-black rounded-b-xl"
                  style={{ backgroundColor: theme.primaryColor }}
                >
                  <h2 className="font-bold">
                    <a href="">Web3 for Content Creators</a>
                  </h2>
                  <time>12/01/2022</time>
                  <a rel="author" href="https://twitter.com/notbunjil">
                    @kennyatta
                  </a>
                </div>
              </article>
              <article>
                <a href="">
                  <img
                    src="https://via.placeholder.com/380x135"
                    className="object-cover w-full rounded-t-xl"
                  />
                </a>
                <div
                  className="flex flex-col p-4 text-lily-black rounded-b-xl"
                  style={{ backgroundColor: theme.primaryColor }}
                >
                  <h2 className="font-bold">
                    <a href="">Web3 for Content Creators</a>
                  </h2>
                  <time>12/01/2022</time>
                  <a rel="author" href="https://twitter.com/notbunjil">
                    @kennyatta
                  </a>
                </div>
              </article>
              <article>
                <a href="">
                  <img
                    src="https://via.placeholder.com/380x135"
                    className="object-cover w-full rounded-t-xl"
                  />
                </a>
                <div
                  className="flex flex-col p-4 text-lily-black rounded-b-xl"
                  style={{ backgroundColor: theme.primaryColor }}
                >
                  <h2 className="font-bold">
                    <a href="">Web3 for Content Creators</a>
                  </h2>
                  <time>12/01/2022</time>
                  <a rel="author" href="https://twitter.com/notbunjil">
                    @kennyatta
                  </a>
                </div>
              </article>
            </Fade>
          </section>
        </div>
      </div>
    </Panel>
  )
}
