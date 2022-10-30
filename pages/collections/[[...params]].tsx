import type { NextPage, GetServerSideProps } from 'next'
import { titleCase } from '../../lib/helpers'
import Meta from '../../components/Meta'
import Header from '../../components/Header'
import Footer from '../../components/Footer'

const LotusGang: NextPage<{
  collection: string
  collectionTitle: string
  address: string | false
}> = ({ collection, collectionTitle, address }) => {
  if (address) {
    return (
      <>
        <Meta title={`${collectionTitle} - ${address}`} />
        <>
          <Header
            position="slide"
            linkColor="white"
            fadeInAnimation={false}
            colorChangeAnimation={false}
            iconHoverColorAnimations={false}
          />
          <div className="w-screen min-h-screen text-neutral-900 bg-lily-blue">
            <div className="relative">
              <div className="relative w-full text-white bg-neutral-900 pb-28">
                <div className="relative flex flex-col w-full px-4 pt-32 mx-auto lg:px-8 lg:pt-56 max-w-7xl">
                  <div className="flex items-center justify-between gap-4">
                    <h1 className="w-full mb-20 font-mono text-6xl lg:text-7xl">
                      {address}
                    </h1>
                  </div>
                  <div></div>
                </div>
              </div>
              <Footer />
            </div>
          </div>
        </>
      </>
    )
  }

  return (
    <>
      <Meta title={collectionTitle} />
      <>
        <Header
          position="slide"
          linkColor="white"
          fadeInAnimation={false}
          colorChangeAnimation={false}
          iconHoverColorAnimations={false}
        />
        <div className="w-screen min-h-screen text-neutral-900 bg-lily-blue">
          <div className="relative">
            <div className="relative w-full text-white bg-neutral-900 pb-28">
              <div className="relative flex flex-col w-full px-4 pt-32 mx-auto lg:px-8 lg:pt-56 max-w-7xl">
                <div className="flex items-center justify-between gap-4">
                  <h1 className="w-full mb-20 font-mono text-6xl lg:text-7xl">
                    Lotus Gang
                  </h1>
                </div>
                <div></div>
              </div>
            </div>
            <Footer />
          </div>
        </div>
      </>
    </>
  )
}

export default LotusGang

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  if (
    !query.params ||
    !query.params.length ||
    query.params[0] !== 'lotus-gang'
  ) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      collection: query.params[0],
      collectionTitle: titleCase(query.params[0].replace(/-/gi, ' ')),
      address: query.params[1] || false,
    },
  }
}
