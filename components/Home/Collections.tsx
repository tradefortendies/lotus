import type { Trait, Nft, NftApiResponse } from '../../types'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { Fade } from 'react-awesome-reveal'
import { sampleSize } from 'lodash'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper'
import CollectionDetail from '../CollectionDetail'
import { Panel } from './Panel'
import { CollectionStatType, CollectionStats } from './CollectionStats'
import Button from '../Button'
import LotusGangNftsJson from '../../data/lotus-gang.json'
import lilyNftsJson from '../../data/lily.json'

import 'swiper/css'

const nftsJson = {
  'lotus-gang': LotusGangNftsJson as { traits: Trait[]; nfts: Nft[] },
  lily: lilyNftsJson as { traits: Trait[]; nfts: Nft[] },
}

export const Collections = () => {
  const router = useRouter()
  const [nft, setNft] = useState<Nft | null>()
  const [collectionData, setCollectionData] = useState<{
    lily: CollectionStatType
    lotus: CollectionStatType
  }>()

  const samplesNfts = {
    lily: sampleSize(nftsJson.lily.nfts, 20),
    lotus: sampleSize(nftsJson['lotus-gang'].nfts, 20),
  }

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

  const fetchNft = async () => {
    let nftReq: NftApiResponse | null = null

    nftReq = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/collections/${router.query.collection}/${router.query.address}`
    ).then((res) => res.json())

    if (!nftReq || !nftReq?.nfts[0]) {
      return
    }

    setNft(nftReq.nfts[0])
  }

  useEffect(() => {
    if (!collectionData?.lily) {
      fetchCollectionData()
    }
  }, [])

  useEffect(() => {
    if (router.query.collection && router.query.address) {
      fetchNft()
    }
  }, [router.query])

  return (
    <>
      <Panel floating={true}>
        <div
          id="collections"
          className="flex flex-col justify-center w-full px-8 py-16 mx-auto lg:py-4 max-w-screen-lily-container"
        >
          <Fade duration={500} delay={200} fraction={0}>
            <h2 className="lg:mb-[10vh] text-3xl md:text-4xl text-center">
              <strong>The Lotus</strong> is made up of 2 collections.
            </h2>
          </Fade>
          <div className="flex flex-col items-center justify-center gap-8 lg:gap-32 lg:flex-row">
            <div className="mt-16 lg:mt-0 w-full lg:w-[40%] space-y-8">
              <Fade duration={500} delay={400} fraction={0}>
                <h3 className="text-5xl font-bold text-center lg:text-left">
                  LILY
                </h3>
              </Fade>
              <div className="grid grid-cols-2 gap-2 font-mono">
                <CollectionStats
                  collectionData={collectionData?.lily}
                  delay={800}
                />
              </div>

              <div>
                <Fade duration={800} delay={1400} fraction={0}>
                  <Swiper
                    spaceBetween={20}
                    slidesPerView={3}
                    loop={true}
                    modules={[Autoplay]}
                    autoplay={{
                      delay: 2000,
                      disableOnInteraction: false,
                    }}
                  >
                    {samplesNfts.lily.map((item, index) => (
                      <SwiperSlide key={index}>
                        <img
                          className="rounded-lg cursor-pointer"
                          src={`https://lotusgang-assets.sfo3.cdn.digitaloceanspaces.com/collections%2Flily%2Fwebp%2F${item.address}.webp`}
                          onClick={() => {
                            router.push(
                              `/?collection=lily&address=${item.address}`,
                              undefined,
                              { scroll: false, shallow: true }
                            )
                          }}
                        />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </Fade>
              </div>
              <div className="flex justify-center lg:justify-start">
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
            <div className="mt-16 lg:mt-0 w-full lg:w-[40%] space-y-8 pb-16 md:pb-0">
              <Fade duration={500} delay={600} fraction={0}>
                <h3 className="text-5xl font-bold text-center lg:text-left">
                  Lotus Gang
                </h3>
              </Fade>
              <div className="grid grid-cols-2 gap-2 font-mono">
                <CollectionStats
                  collectionData={collectionData?.lotus}
                  delay={1000}
                />
              </div>
              <div>
                <Fade duration={800} delay={1600} fraction={0}>
                  <Swiper
                    spaceBetween={20}
                    slidesPerView={3}
                    loop={true}
                    modules={[Autoplay]}
                    autoplay={{
                      delay: 2000,
                      disableOnInteraction: false,
                    }}
                  >
                    {samplesNfts.lotus.map((item, index) => (
                      <SwiperSlide key={index}>
                        <img
                          className="rounded-lg cursor-pointer"
                          src={`https://lotusgang-assets.sfo3.cdn.digitaloceanspaces.com/collections%2Flotus-gang%2Fwebp%2F${item.address}.webp`}
                          onClick={() => {
                            router.push(
                              `/?collection=lotus-gang&address=${item.address}`,
                              undefined,
                              { scroll: false, shallow: true }
                            )
                          }}
                        />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </Fade>
              </div>
              <div className="flex justify-center lg:justify-start">
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
      {nft && (
        <CollectionDetail
          isOpen={true}
          onClose={() => {
            router.push(`/`, undefined, { scroll: false })
            setNft(null)
            setTimeout(() => {
              window.scrollTo({
                top: document
                  .querySelector('#collections')
                  ?.getBoundingClientRect().top,
                left: 0,
              })
            }, 100)
          }}
          nft={nft}
          collection={String(router.query.collection) || ''}
        />
      )}
    </>
  )
}
