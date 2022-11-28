import type { NextPage, GetServerSideProps } from 'next'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { Nft, Trait, NftApiResponse } from '../../types'
import LotusGangNftsJson from '../../data/lotus-gang.json'
import lilyNftsJson from '../../data/lily.json'
import Meta from '../../components/Meta'
import Header from '../../components/Header'
import CollectionDetail from '../../components/CollectionDetail'
import CollectionListing from '../../components/CollectionListing'

const nftsJson = {
  'lotus-gang': LotusGangNftsJson as { traits: Trait[]; nfts: Nft[] },
  lily: lilyNftsJson as { traits: Trait[]; nfts: Nft[] },
}

const buildNftApiUrl = ({
  collection,
  page,
  filters,
  reset = false,
}: {
  collection: string
  page: number
  filters: {
    [key: string]: string[]
  }
  reset?: boolean
}): string => {
  let apiUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/collections/${collection}?`

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

  apiUrl += `reset=${reset}&`

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
  collection,
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
  const [routerPath, setRouterPath] = useState<string>(router.asPath)
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
        collection,
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
        collection,
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
        collection,
        page: 0,
        filters: {},
        reset: true,
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

  useEffect(() => {
    const routerPathSplit = router.asPath.split('/')
    if (routerPathSplit[2] !== routerPath) {
      reset()
      setRouterPath(routerPathSplit[2])
    }
  }, [router.asPath])

  // Collection filter view
  return (
    <>
      <Meta title={collectionTitle} />
      <>
        <CollectionDetail
          isOpen={detailOpen}
          onClose={() => {
            router.push(`/collections/${collection}`)
          }}
          collection={collection}
          nft={nft[0]}
        />
        <Header
          position="fixed"
          fadeInAnimation={false}
          colorChangeAnimation={false}
          iconHoverColorAnimations={false}
        />
        <div className="w-screen min-h-screen text-neutral-900 bg-lily-blue">
          <div className="relative">
            <div className="relative w-full bg-white text-lily-black pb-28">
              <div className="relative flex flex-col w-full px-4 py-32 mx-auto lg:px-8 lg:pt-48 max-w-[1600px]">
                <div
                  id="masthead"
                  className="flex items-center justify-between gap-4"
                >
                  <div className="block w-full mb-4">
                    {collection === 'lotus-gang' && (
                      <>
                        <h1 className="w-full mb-10 font-sans text-6xl font-bold lg:text-8xl">
                          <svg
                            viewBox="0 0 599 80"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-[90%] lg:w-full lg:max-w-[700px]"
                          >
                            <path
                              d="M46.5432 78.5334H0.765625V1.53908H18.4691V60.83H46.5432V78.5334Z"
                              fill="#222222"
                            />
                            <path
                              d="M86.9636 1.53908C92.2712 1.53908 97.2644 2.55171 101.943 4.57695C106.622 6.6022 110.708 9.36073 114.2 12.8525C117.692 16.2745 120.45 20.325 122.475 25.004C124.501 29.6831 125.513 34.6763 125.513 39.9839C125.513 45.2914 124.501 50.2847 122.475 54.9637C120.45 59.6428 117.692 63.7282 114.2 67.22C110.708 70.642 106.622 73.3656 101.943 75.3908C97.2644 77.4161 92.2712 78.4287 86.9636 78.4287C81.6561 78.4287 76.6628 77.4161 71.9838 75.3908C67.3047 73.3656 63.2193 70.642 59.7275 67.22C56.3056 63.7282 53.5819 59.6428 51.5567 54.9637C49.5314 50.2847 48.5188 45.2914 48.5188 39.9839C48.5188 34.6763 49.5314 29.6831 51.5567 25.004C53.5819 20.325 56.3056 16.2745 59.7275 12.8525C63.2193 9.36073 67.3047 6.6022 71.9838 4.57695C76.6628 2.55171 81.6561 1.53908 86.9636 1.53908ZM86.9636 60.7252C89.8269 60.7252 92.5156 60.2014 95.0297 59.1539C97.5438 58.0365 99.7436 56.5351 101.629 54.6495C103.515 52.7639 104.981 50.5641 106.029 48.05C107.146 45.5359 107.705 42.8472 107.705 39.9839C107.705 37.1206 107.146 34.4319 106.029 31.9178C104.981 29.4037 103.515 27.2039 101.629 25.3183C99.7436 23.4327 97.5438 21.9662 95.0297 20.9186C92.5156 19.8012 89.8269 19.2425 86.9636 19.2425C84.1003 19.2425 81.4117 19.8012 78.8975 20.9186C76.3834 21.9662 74.1836 23.4327 72.298 25.3183C70.4125 27.2039 68.911 29.4037 67.7936 31.9178C66.7461 34.4319 66.2223 37.1206 66.2223 39.9839C66.2223 42.8472 66.7461 45.5359 67.7936 48.05C68.911 50.5641 70.4125 52.7639 72.298 54.6495C74.1836 56.5351 76.3834 58.0365 78.8975 59.1539C81.4117 60.2014 84.1003 60.7252 86.9636 60.7252Z"
                              fill="#222222"
                            />
                            <path
                              d="M174.889 1.32957V19.1378H160.119V78.5334H142.415V19.1378H127.75V1.32957H174.889Z"
                              fill="#222222"
                            />
                            <path
                              d="M211.675 78.5334C207.764 78.5334 204.063 77.8351 200.571 76.4384C197.079 74.9718 193.972 72.9116 191.248 70.2579C188.455 67.4644 186.29 64.3218 184.753 60.83C183.287 57.3382 182.519 53.6019 182.449 49.6213V1.53908H200.152V49.5165C200.152 52.5893 201.304 55.278 203.609 57.5826C205.914 59.7475 208.637 60.83 211.78 60.83C213.316 60.83 214.783 60.5157 216.18 59.8872C217.576 59.2587 218.798 58.4206 219.846 57.3731C220.894 56.3255 221.697 55.1034 222.255 53.7067C222.814 52.31 223.093 50.8085 223.093 49.2023V1.53908H240.797V49.0975C240.867 53.0782 240.133 56.8493 238.597 60.411C237.13 63.9726 235.07 67.0803 232.417 69.7341C229.833 72.3879 226.76 74.5179 223.198 76.1241C219.706 77.6605 215.97 78.4636 211.989 78.5334H211.675Z"
                              fill="#222222"
                            />
                            <path
                              d="M274.235 80C271.79 80 269.346 79.6508 266.902 78.9525C264.527 78.3239 262.258 77.3113 260.093 75.9146C256.322 73.4703 253.389 70.3277 251.294 66.4867C249.198 62.5759 248.151 58.3159 248.151 53.7067H265.854C265.854 55.8018 266.308 57.4429 267.216 58.6301C268.124 59.7475 268.927 60.5157 269.626 60.9347C270.883 61.7728 272.244 62.2267 273.711 62.2965C275.177 62.3664 276.609 62.087 278.006 61.4585C278.984 61.0395 279.752 60.5157 280.31 59.8872C280.939 59.2587 281.393 58.6651 281.672 58.1064C282.021 57.4778 282.231 56.8842 282.301 56.3255C282.371 55.7668 282.406 55.3129 282.406 54.9637C282.406 54.6146 282.371 54.1606 282.301 53.6019C282.231 53.0432 282.021 52.4496 281.672 51.8211C281.393 51.1926 280.939 50.599 280.31 50.0403C279.752 49.4118 278.984 48.8531 278.006 48.3642C277.238 48.015 276.4 47.7008 275.492 47.4214C274.654 47.1421 273.746 46.8278 272.768 46.4786C271.022 45.92 269.207 45.2914 267.321 44.5931C265.435 43.8947 263.55 42.9519 261.664 41.7647C259.22 40.2283 257.16 38.3078 255.484 36.0032C253.808 33.6986 252.585 31.2194 251.817 28.5657C251.119 25.9119 250.874 23.1883 251.084 20.3948C251.363 17.5316 252.166 14.808 253.493 12.224C254.75 9.84958 256.322 7.78941 258.207 6.04351C260.093 4.29761 262.188 2.93581 264.493 1.9581C266.797 0.910555 269.276 0.282029 271.93 0.0725231C274.584 -0.136987 277.273 0.107439 279.996 0.8058C282.65 1.43433 285.059 2.44695 287.224 3.84367C289.389 5.17056 291.24 6.81171 292.776 8.76713C294.382 10.6527 295.605 12.7827 296.443 15.1571C297.281 17.5316 297.7 20.0107 297.7 22.5947H279.996C279.996 20.9884 279.472 19.8711 278.425 19.2425C277.447 18.614 276.574 18.195 275.806 17.9855C275.666 17.9855 275.317 17.9506 274.758 17.8807C274.27 17.7411 273.676 17.7411 272.978 17.8807C272.349 17.9506 271.686 18.195 270.987 18.614C270.289 18.9632 269.73 19.5568 269.311 20.3948C268.753 21.5122 268.648 22.6994 268.997 23.9565C269.346 25.1437 270.045 26.0865 271.092 26.7849C272.07 27.3435 273.152 27.8673 274.339 28.3562C275.527 28.7752 276.784 29.1942 278.111 29.6132C279.298 29.9624 280.485 30.3465 281.672 30.7655C282.929 31.1845 284.186 31.6734 285.443 32.2321C290.053 34.3272 293.649 37.3999 296.233 41.4504C298.887 45.5009 300.214 50.0054 300.214 54.9637C300.214 59.8523 298.887 64.3218 296.233 68.3723C293.649 72.4228 290.053 75.4956 285.443 77.5907C283.628 78.4287 281.777 79.0223 279.891 79.3715C278.006 79.7905 276.12 80 274.235 80Z"
                              fill="#222222"
                            />
                            <path
                              d="M388.001 35.4795V78.5334H370.193V76.6479C368.237 77.3462 366.212 77.87 364.117 78.2192C362.092 78.4985 360.067 78.6382 358.041 78.6382C353.083 78.6382 348.229 77.6954 343.481 75.8098C338.732 73.9243 334.472 71.0959 330.701 67.3247C326.929 63.5536 324.101 59.3285 322.215 54.6495C320.4 49.9006 319.492 45.047 319.492 40.0886C319.492 35.1303 320.4 30.2767 322.215 25.5278C324.101 20.7789 326.929 16.5189 330.701 12.7478C334.472 8.97663 338.732 6.14827 343.481 4.26269C348.229 2.37711 353.083 1.43432 358.041 1.43432C363 1.43432 367.853 2.37711 372.602 4.26269C377.351 6.14827 381.611 8.97663 385.382 12.7478L372.812 25.3183C370.786 23.293 368.482 21.7916 365.898 20.8139C363.314 19.7663 360.695 19.2425 358.041 19.2425C355.388 19.2425 352.769 19.7663 350.185 20.8139C347.601 21.7916 345.296 23.293 343.271 25.3183C341.246 27.3435 339.709 29.6481 338.662 32.2321C337.614 34.816 337.09 37.4349 337.09 40.0886C337.09 42.7424 337.614 45.3613 338.662 47.9452C339.709 50.5291 341.246 52.8337 343.271 54.859C345.087 56.6747 347.112 58.1064 349.347 59.1539C351.651 60.1316 353.991 60.7252 356.365 60.9347C358.81 61.0744 361.219 60.83 363.593 60.2015C365.968 59.5729 368.168 58.5254 370.193 57.0588V53.1829H354.794V35.4795H388.001Z"
                              fill="#222222"
                            />
                            <path
                              d="M440.353 78.5334L437.315 69.2103H413.117L409.974 78.5334H391.223L417.412 1.64384H434.172L458.999 78.5334H440.353ZM419.192 51.5069H431.658L425.582 32.8606L419.192 51.5069Z"
                              fill="#222222"
                            />
                            <path
                              d="M508.594 1.64384H526.297V78.5334H507.127L481.986 33.6986V78.5334H464.283V1.85334H483.557L508.594 46.5834V1.64384Z"
                              fill="#222222"
                            />
                            <path
                              d="M598.532 35.4795V78.5334H580.724V76.6479C578.769 77.3462 576.744 77.87 574.649 78.2192C572.623 78.4985 570.598 78.6382 568.573 78.6382C563.614 78.6382 558.761 77.6954 554.012 75.8098C549.263 73.9243 545.003 71.0959 541.232 67.3247C537.461 63.5536 534.632 59.3285 532.747 54.6495C530.931 49.9006 530.023 45.047 530.023 40.0886C530.023 35.1303 530.931 30.2767 532.747 25.5278C534.632 20.7789 537.461 16.5189 541.232 12.7478C545.003 8.97663 549.263 6.14827 554.012 4.26269C558.761 2.37711 563.614 1.43432 568.573 1.43432C573.531 1.43432 578.385 2.37711 583.134 4.26269C587.883 6.14827 592.143 8.97663 595.914 12.7478L583.343 25.3183C581.318 23.293 579.013 21.7916 576.429 20.8139C573.845 19.7663 571.227 19.2425 568.573 19.2425C565.919 19.2425 563.3 19.7663 560.716 20.8139C558.132 21.7916 555.828 23.293 553.802 25.3183C551.777 27.3435 550.241 29.6481 549.193 32.2321C548.146 34.816 547.622 37.4349 547.622 40.0886C547.622 42.7424 548.146 45.3613 549.193 47.9452C550.241 50.5291 551.777 52.8337 553.802 54.859C555.618 56.6747 557.643 58.1064 559.878 59.1539C562.183 60.1316 564.522 60.7252 566.897 60.9347C569.341 61.0744 571.75 60.83 574.125 60.2015C576.499 59.5729 578.699 58.5254 580.724 57.0588V53.1829H565.325V35.4795H598.532Z"
                              fill="#222222"
                            />
                          </svg>
                        </h1>
                      </>
                    )}

                    {collection === 'lily' && (
                      <>
                        <h1 className="w-full mb-10 font-sans text-6xl font-bold lg:text-8xl">
                          <svg
                            viewBox="0 0 200 80"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-full max-w-[136px] lg:max-w-[235px]"
                          >
                            <path
                              d="M0.333984 0H18.5054V70.7429L10.734 62.9714H53.4768V80H0.333984V0Z"
                              fill="#222222"
                            />
                            <path
                              d="M62.4902 0H80.6617V80H62.4902V0Z"
                              fill="#222222"
                            />
                            <path
                              d="M89.6777 0H107.849V70.7429L100.078 62.9714H142.821V80H89.6777V0Z"
                              fill="#222222"
                            />
                            <path
                              d="M122.641 0H143.326L153.269 18.5143L162.412 35.2H160.012L169.155 18.5143L178.983 0H199.669L168.469 54.9714H153.841L122.641 0ZM152.126 46.5143H170.298V80H152.126V46.5143Z"
                              fill="#222222"
                            />
                          </svg>
                        </h1>
                      </>
                    )}
                  </div>
                </div>
                <CollectionListing
                  collection={collection}
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
    (query.params[0] !== 'lotus-gang' && query.params[0] !== 'lily')
  ) {
    return {
      notFound: true,
    }
  }

  const collectionJson = nftsJson[query.params[0]]
  let collectionTitle: string = ''
  let nftsReq: NftApiResponse | null = null
  let nftReq: NftApiResponse | null = null

  nftsReq = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/collections/${query.params[0]}?reset=true`
  ).then((res) => res.json())

  if (query.params[1]) {
    nftReq = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/collections/${query.params[0]}/${query.params[1]}`
    ).then((res) => res.json())

    if (!nftReq?.nfts?.length) {
      return {
        notFound: true,
      }
    }
  }

  if (query.params[0] === 'lotus-gang') {
    collectionTitle = 'Lotus Gang'
  } else if (query.params[0] === 'lily') {
    collectionTitle = 'LILY'
  }

  return {
    props: {
      collection: query.params[0],
      collectionTitle,
      traits: collectionJson.traits,
      address: query.params[1] || false,
      totalOrig: nftsReq?.total,
      pageOrig: nftsReq?.page,
      perPage: nftsReq?.perPage,
      nftsOrig: nftsReq?.nfts || {},
      nft: nftReq?.nfts || {},
    },
  }
}
