import type { NextPage, GetServerSideProps } from 'next'
import Link from 'next/link'
import clsx from 'clsx'
import { Nft, Trait } from '../../types'
import { titleCase } from '../../lib/helpers'
import LotusGangNftsJson from '../../data/lotus-gang.json'
import Meta from '../../components/Meta'
import Header from '../../components/Header'
import Footer from '../../components/Footer'

const lotusGangNfts = LotusGangNftsJson as { traits: Trait[]; nfts: Nft[] }

const LotusGang: NextPage<{
  collection: string
  collectionTitle: string
  traits: Trait[]
  nfts: Nft[]
  address: string | false
}> = ({ collectionTitle, traits, nfts, address }) => {
  // NFT detail view
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
          <div className="w-screen min-h-screen bg-white text-neutral-900">
            <div className="relative">
              <div className="relative w-full pb-28">
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

  // Collection filter view
  return (
    <>
      <Meta title={collectionTitle} />
      <>
        <Header
          position="slide"
          fadeInAnimation={false}
          colorChangeAnimation={false}
          iconHoverColorAnimations={false}
        />
        <div className="w-screen min-h-screen bg-white text-neutral-900">
          <div className="relative">
            <div className="relative w-full pb-28">
              <div className="relative flex flex-col w-full px-4 pt-32 mx-auto lg:px-8 lg:pt-56 max-w-7xl">
                <div className="flex items-center justify-between gap-4">
                  <h1 className="w-full mb-20 font-mono text-6xl lg:text-7xl">
                    Lotus Gang
                  </h1>
                </div>
                <div className="grid grid-cols-6">
                  <div>
                    <ul>
                      {traits.map((trait, index) => {
                        return (
                          <li className="my-4 font-bold first:mt-0" key={index}>
                            {trait.trait_type}
                            <ul
                              className={clsx(
                                'mt-2 text-sm font-normal',
                                index > 0 && 'hidden'
                              )}>
                              {trait.values.map((value) => {
                                return (
                                  <li className="flex items-center gap-2 py-1">
                                    <input type="checkbox" />
                                    {value}
                                  </li>
                                )
                              })}
                            </ul>
                          </li>
                        )
                      })}
                    </ul>
                  </div>
                  <div className="grid w-full grid-cols-4 col-span-5 gap-4">
                    {nfts.map((nft) => {
                      return (
                        <div className="p-4 bg-gray-100">
                          <Link
                            href={`/collections/lotus-gang/${nft.address}`}
                            passHref>
                            <a>
                              <img src={nft.image} />
                              <div className="mt-4">
                                <h3 className="font-bold">{nft.name}</h3>
                              </div>
                            </a>
                          </Link>
                        </div>
                      )
                    })}
                  </div>
                </div>
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

  const nftsReq = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/collections/lotus-gang`
  )
  const nfts = await nftsReq.json()

  return {
    props: {
      collection: query.params[0],
      collectionTitle: titleCase(query.params[0].replace(/-/gi, ' ')),
      traits: lotusGangNfts.traits,
      address: query.params[1] || false,
      nfts: nfts.nfts,
    },
  }
}
