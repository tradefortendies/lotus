import { Fade } from 'react-awesome-reveal'
import { Panel } from './Panel'

export const Hero = () => {
  return (
    <Panel floating={false} first={true}>
      <div className="px-8 h-[98vh] flex lg:items-center mx-auto relative z-20 pt-32 md:pt-[15vh] lg:pt-0">
        <div className="space-y-4 lg:w-1/2">
          <Fade duration={500} delay={200} fraction={0}>
            <h2 className="text-[26px] md:text-4xl">
              We are working on the <strong>LILY Pad</strong>, the{' '}
              <strong>Lotus Library</strong> and <strong>The Blueprint</strong>:
            </h2>
            <h3 className="text-[26px] md:text-4xl">
              To become the very best like no one ever was.
            </h3>
          </Fade>
        </div>
      </div>

      <div className="lg:hidden w-screen h-[98vh] absolute top-0 left-0 bg-gradient-to-b to-transparent from-white z-10"></div>

      <video
        autoPlay
        playsInline
        loop
        muted
        className="absolute bottom-[20px] right-0 object-cover w-auto h-[80vh] z-0"
      >
        <source src="/video/lotus-splash.webm" type="video/webm" />
        Your browser does not support the video tag.
      </video>
    </Panel>
  )
}
