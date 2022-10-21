import type { NextPage } from 'next'
import Eligibility from '../components/Eligibility'
import Meta from '../components/Meta'
import Header from '../components/Header'
import Footer from '../components/Footer'

const EligibilityPage: NextPage = () => {
  return (
    <>
      <Meta title="LILY Eligibility" />
      <>
        <Header
          position="slide"
          linkColor="white"
          fadeInAnimation={false}
          colorChangeAnimation={false}
          iconHoverColorAnimations={false}
        />
        <div className="w-screen min-h-screen text-neutral-900">
          <Eligibility />
        </div>
        <Footer />
      </>
    </>
  )
}

export default EligibilityPage
