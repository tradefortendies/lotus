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

const buildNftApiUrl = ({
  page,
  filters,
}: {
  page: number
  filters: {
    [key: string]: string[]
  }
}): string => {
  let apiUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/collections/lotus-gang?`

  if (filters) {
    apiUrl += 'traits='

    Object.keys(filters).map((key) => {
      apiUrl += `${key.toLowerCase()}:`

      filters[key].map((val) => {
        apiUrl += `${val}|`
      })

      apiUrl = apiUrl.substring(0, apiUrl.length - 1) + ','
    })

    apiUrl = apiUrl.substring(0, apiUrl.length - 1) + '&'
  }

  if (page) {
    apiUrl += `page=${page}`
  }

  return apiUrl
}

const LotusGang: NextPage<{
  collection: string
  collectionTitle: string
  traits: Trait[]
  totalOrig: number
  pageOrig: number
  perPage: number
  nftsOrig: Nft[]
  nft: Nft[]
  address: string | false
}> = ({
  collectionTitle,
  traits,
  totalOrig,
  pageOrig,
  perPage,
  nftsOrig,
  nft,
  address,
}) => {
  const router = useRouter()
  const [detailOpen, setDetailOpen] = useState<boolean>(false)
  const [filters, setFilters] = useState<{
    [key: string]: string[]
  }>({})
  const [total, setTotal] = useState<number>(totalOrig)
  const [page, setPage] = useState<number>(pageOrig)
  const [nfts, setNfts] = useState<Nft[]>(nftsOrig)

  const loadMore = async () => {
    const nftsReq = await fetch(
      buildNftApiUrl({
        page: page + 1,
        filters,
      })
    ).then((res) => res.json())

    if (!nftsReq.nfts) {
      return
    }

    setNfts(nfts.concat(nftsReq.nfts))
    setTotal(nftsReq.total)
    setPage(page + 1)
  }

  const filter = async (trait: string, value: string, state: boolean) => {
    const currentFilters = filters

    if (state) {
      if (!currentFilters[trait]) {
        currentFilters[trait] = []
      }

      if (currentFilters[trait].indexOf(value) < 0) {
        currentFilters[trait].push(value)
      }
    } else {
      if (currentFilters[trait].indexOf(value) > -1) {
        currentFilters[trait].splice(currentFilters[trait].indexOf(value), 1)

        if (!currentFilters[trait].length) {
          delete currentFilters[trait]
        }
      }
    }

    setFilters({ ...currentFilters })

    const nftsReq = await fetch(
      buildNftApiUrl({
        page: 0,
        filters,
      })
    ).then((res) => res.json())

    if (!nftsReq.nfts) {
      return
    }

    setNfts(nftsReq.nfts)
    setTotal(nftsReq.total)
    setPage(0)
  }

  const reset = async () => {
    const nftsReq = await fetch(
      buildNftApiUrl({
        page: 0,
        filters: {},
      })
    ).then((res) => res.json())

    if (!nftsReq.nfts) {
      return
    }

    const filters = document.querySelectorAll('[data-filter]')
    filters.forEach((filter) => {
      const f = filter as HTMLInputElement
      f.checked = false
    })

    setNfts(nftsReq.nfts)
    setFilters({})
    setTotal(nftsReq.total)
    setPage(0)
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
            router.push('/collections/lotus-gang')
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
                  showing={
                    (page + 1) * perPage < total ? (page + 1) * perPage : total
                  }
                  traits={traits}
                  nfts={nfts}
                  filters={filters}
                  loadMore={loadMore}
                  filter={filter}
                  reset={reset}
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
      totalOrig: nftsReq?.total,
      pageOrig: nftsReq?.page,
      perPage: nftsReq?.perPage,
      nftsOrig: nftsReq?.nfts || {},
      nft: nftReq?.nfts || {},
    },
  }
}
