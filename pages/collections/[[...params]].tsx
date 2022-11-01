import type { NextPage, GetServerSideProps } from 'next'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { Nft, Trait, NftApiResponse } from '../../types'
import { titleCase } from '../../lib/helpers'
import LotusGangNftsJson from '../../data/lotus-gang.json'
import Meta from '../../components/Meta'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import CollectionDetail from '../../components/CollectionDetail'
import CollectionListing from '../../components/CollectionListing'

const lotusGangNfts = LotusGangNftsJson as { traits: Trait[]; nfts: Nft[] }

const buildNftApiUrl = ({ page }: { page: number }): string => {
  let apiUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/collections/lotus-gang?`

  if (page) {
    apiUrl += `page=${page}`
  }

  return apiUrl
}

const LotusGang: NextPage<{
  collection: string
  collectionTitle: string
  traits: Trait[]
  total: number
  pageOrig: number
  perPage: number
  nftsOrig: Nft[]
  nft: Nft[]
  address: string | false
}> = ({
  collectionTitle,
  traits,
  total,
  pageOrig,
  perPage,
  nftsOrig,
  nft,
  address,
}) => {
  const router = useRouter()
  const [detailOpen, setDetailOpen] = useState<boolean>(false)
  const [page, setPage] = useState<number>(pageOrig)
  const [nfts, setNfts] = useState<Nft[]>(nftsOrig)

  const loadMore = async () => {
    const nftsReq = await fetch(
      buildNftApiUrl({
        page: page + 1,
      })
    ).then((res) => res.json())

    if (!nftsReq.nfts) {
      return
    }

    setNfts(nfts.concat(nftsReq.nfts))
    setPage(page + 1)
  }

  useEffect(() => {
    setDetailOpen(Boolean(address))
  }, [address])

  // Collection filter view
  return (
    <>
      <Meta title={collectionTitle} />
      <>
        <CollectionDetail
          isOpen={detailOpen}
          onClose={() => {
            router.back()
          }}
          nft={nft[0]}
        />
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
                <CollectionListing
                  total={total}
                  page={page}
                  perPage={perPage}
                  traits={traits}
                  nfts={nfts}
                  loadMore={loadMore}
                />
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

  let nftsReq: NftApiResponse | null = null
  let nftReq: NftApiResponse | null = null

  nftsReq = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/collections/lotus-gang`
  ).then((res) => res.json())

  if (query.params[1]) {
    nftReq = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/collections/lotus-gang/${query.params[1]}`
    ).then((res) => res.json())

    if (!nftReq?.nfts?.length) {
      return {
        notFound: true,
      }
    }
  }

  return {
    props: {
      collection: query.params[0],
      collectionTitle: titleCase(query.params[0].replace(/-/gi, ' ')),
      traits: lotusGangNfts.traits,
      address: query.params[1] || false,
      total: nftsReq?.total,
      pageOrig: nftsReq?.page,
      perPage: nftsReq?.perPage,
      nftsOrig: nftsReq?.nfts || {},
      nft: nftReq?.nfts || {},
    },
  }
}
