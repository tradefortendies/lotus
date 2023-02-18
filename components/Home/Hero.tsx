import { Fade } from 'react-awesome-reveal'
import { Panel } from './Panel'

export const Hero = () => {
  return (
    <Panel floating={false} first={true}>
      <div className="px-8 md:px-0 md:w-[80vw] h-[98vh] flex items-center mx-auto">
        <div className="space-y-4 md:w-1/2">
          <Fade duration={500} delay={200} fraction={0}>
            <h2 className="text-3xl">
              To become the best bunch in the open web:
            </h2>
            <h3 className="text-3xl">
              We are working on the <strong>LILY Pad</strong>, the{' '}
              <strong>Lotus Library</strong> and <strong>The Blueprint</strong>.
            </h3>
          </Fade>
        </div>
      </div>
    </Panel>
  )
}
