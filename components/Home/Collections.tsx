import type { Trait, Nft } from '../../types'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Fade } from 'react-awesome-reveal'
import { sampleSize } from 'lodash'
import { Panel } from './Panel'
import { CollectionStatType, CollectionStats } from './CollectionStats'
import Button from '../Button'
import LotusGangNftsJson from '../../data/lotus-gang.json'
import lilyNftsJson from '../../data/lily.json'

const nftsJson = {
  'lotus-gang': LotusGangNftsJson as { traits: Trait[]; nfts: Nft[] },
  lily: lilyNftsJson as { traits: Trait[]; nfts: Nft[] },
}

export const Collections = () => {
  const [collectionData, setCollectionData] = useState<{
    lily: CollectionStatType
    lotus: CollectionStatType
  }>()

  const fetchCollectionData = async () => {
    const lilyDataReq = await fetch('/api/collectionStats?symbol=lily').then(
      (res) => res.json()
    )

    const lotusDataReq = await fetch(
      '/api/collectionStats?symbol=lotus_gang_nft'
    ).then((res) => res.json())

    setCollectionData({
      lily: {
        ...lilyDataReq,
        supply: 10000,
      },
      lotus: {
        ...lotusDataReq,
        supply: 4000,
      },
    })
  }

  useEffect(() => {
    if (!collectionData?.lily) {
      fetchCollectionData()
    }
  }, [])

  return (
    <Panel floating={true}>
      <div className="flex flex-col justify-center w-full px-8 py-4 mx-auto max-w-screen-lily-container">
        <Fade duration={500} delay={200} fraction={0}>
          <h2 className="mb-[10vh] text-4xl text-center">
            <strong>The Lotus</strong> is made up of 2 collections.
          </h2>
        </Fade>
        <div className="flex flex-col items-center justify-center gap-8 lg:gap-32 md:flex-row">
          <div className="mt-16 md:mt-0 w-full md:w-[40%] space-y-8">
            <Fade duration={500} delay={400} fraction={0}>
              <h3 className="text-5xl font-bold text-center md:text-left">
                LILY
              </h3>
            </Fade>
            <div className="grid grid-cols-2 gap-2 font-mono">
              <CollectionStats
                collectionData={collectionData?.lily}
                delay={800}
              />
            </div>

            <div className="grid grid-cols-3 gap-6">
              <Fade
                cascade={true}
                duration={500}
                delay={1200}
                damping={0.35}
                fraction={0}
              >
                {sampleSize(nftsJson.lily.nfts, 3).map((item, index) => (
                  <Link
                    key={index}
                    href={`/collections/lily/${item.address}`}
                    passHref
                  >
                    <a>
                      <img
                        className="transition-transform rounded-lg hover:scale-110"
                        src={`https://lotusgang-assets.sfo3.cdn.digitaloceanspaces.com/collections%2Flily%2Fwebp%2F${item.address}.webp`}
                      />
                    </a>
                  </Link>
                ))}
              </Fade>
            </div>
            <div className="flex justify-center md:justify-start">
              <Fade duration={500} delay={1600} fraction={0}>
                <Button
                  href="/collections/lily"
                  type="pill-outline"
                  className="!border-black !text-black hover:!bg-lily-black hover:!text-white"
                >
                  Explore
                </Button>
              </Fade>
            </div>
          </div>
          <div className="mt-16 md:mt-0 w-full md:w-[40%] space-y-8 pb-16 md:pb-0">
            <Fade duration={500} delay={600} fraction={0}>
              <h3 className="text-5xl font-bold text-center md:text-left">
                Lotus Gang
              </h3>
            </Fade>
            <div className="grid grid-cols-2 gap-2 font-mono">
              <CollectionStats
                collectionData={collectionData?.lotus}
                delay={1000}
              />
            </div>
            <div className="grid grid-cols-3 gap-6">
              <Fade
                cascade={true}
                duration={500}
                delay={1400}
                damping={0.35}
                fraction={0}
              >
                {sampleSize(nftsJson['lotus-gang'].nfts, 3).map(
                  (item, index) => (
                    <Link
                      key={index}
                      href={`/collections/lotus-gang/${item.address}`}
                      passHref
                    >
                      <a>
                        <img
                          className="transition-transform rounded-lg hover:scale-110"
                          src={`https://lotusgang-assets.sfo3.cdn.digitaloceanspaces.com/collections%2Flotus-gang%2Fwebp%2F${item.address}.webp`}
                        />
                      </a>
                    </Link>
                  )
                )}
              </Fade>
            </div>
            <div className="flex justify-center md:justify-start">
              <Fade duration={500} delay={1800} fraction={0}>
                <Button
                  href="/collections/lotus-gang"
                  type="pill-outline"
                  className="!border-black !text-black hover:!bg-lily-black hover:!text-white"
                >
                  Explore
                </Button>
              </Fade>
            </div>
          </div>
        </div>
      </div>
    </Panel>
  )
}
