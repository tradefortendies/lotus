import { Fade } from 'react-awesome-reveal'
import { Panel } from './Panel'

export const LilyPad = () => {
  return (
    <Panel floating={false}>
      <div
        id="lilypad"
        className="flex flex-col items-center justify-center w-full gap-24 px-4 pt-16 mx-auto lg:pb-32 lg:pt-16 lg:flex-row max-w-screen-lily-container"
      >
        <Fade duration={500} delay={200} fraction={0}>
          <img
            src="/img/rubix.svg"
            className="w-1/2 mx-auto lg:mx-0 lg:w-[360px] animate-spin-extra-slow"
          />
        </Fade>
        <div className="space-y-4 text-center lg:text-left">
          <Fade
            cascade={true}
            duration={500}
            delay={400}
            damping={0.35}
            fraction={0}
          >
            <h2 className="text-6xl font-medium">The LILYPad</h2>
            <p className="text-2xl">A new peer-to-peer onboarding solution.</p>
            <p className="text-lg italic">Now in development.</p>
          </Fade>
        </div>
      </div>
    </Panel>
  )
}
