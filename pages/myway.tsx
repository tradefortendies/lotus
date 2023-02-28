import type { NextPage } from 'next'
import Meta from '../components/Meta'
import Header from '../components/Header'

const MyWay: NextPage = () => {
  return (
    <>
      <Meta title="The Blueprint" />
      <>
        <Header
          position="slide"
          linkColor="black"
          fadeInAnimation={false}
          colorChangeAnimation={false}
          iconHoverColorAnimations={false}
        />
        <div className="w-screen h-screen overflow-hidden text-neutral-900 bg-lily-blue">
          <div className="relative">
            <div className="relative w-full h-screen bg-white text-lily-black pb-28">
              <h1>My Way</h1>
            </div>
          </div>
        </div>
      </>
    </>
  )
}

export default MyWay
