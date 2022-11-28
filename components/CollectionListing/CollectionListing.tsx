import { Trait, Nft } from '../../types'
import { useEffect, useState, useContext } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'
import clsx from 'clsx'
import { Disclosure } from '@headlessui/react'
import BeatLoader from 'react-spinners/BeatLoader'
import { FiCheck } from 'react-icons/fi'
import { BsFillArrowUpCircleFill } from 'react-icons/bs'
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai'
import { GrPowerReset } from 'react-icons/gr'
import { IoMdClose } from 'react-icons/io'
import { FaFilter } from 'react-icons/fa'
import { BiSearch } from 'react-icons/bi'
import { useInView } from 'react-intersection-observer'
import { cdnAsset, splitNftName } from '../../lib/helpers'
import { ThemeContext } from '../Theme'
import Button from '../Button'

const Checkbox = require('react-custom-checkbox')

function CollectionListing({
  collection,
  total,
  showing,
  traits,
  nfts,
  filters,
  loadMore,
  filter,
  reset,
}: {
  collection: string
  total: number
  showing: number
  traits: Trait[]
  nfts: Nft[]
  filters: {
    [key: string]: string[]
  }
  loadMore: () => void
  filter: (trait: string, value: string, state: boolean) => void
  reset: () => void
}) {
  const router = useRouter()
  const theme = useContext(ThemeContext)

  const [showFilters, setShowFilters] = useState<boolean>(false)
  const [showTopBtn, setShowTopBtn] = useState<boolean>(false)
  const [toggleActive, setToggleActive] = useState<boolean>(
    collection === 'lily'
  )
  const [filterTags, setFilterTags] = useState<JSX.Element[]>([])
  const [traitFilters, setTraitFilters] = useState<{ [key: string]: any }>([])

  const [loadMoreRef, loadMoreInView] = useInView()
  const [listingRef, listingInView] = useInView()

  useEffect(() => {
    const newFilterTags: JSX.Element[] = []
    Object.keys(filters).map((trait) => {
      filters[trait].map((value) => {
        newFilterTags.push(
          <button
            className="flex items-center gap-1 p-2 text-xs transition rounded-md bg-slate-100 hover:bg-slate-200"
            data-trait={trait}
            data-value={value}
            onClick={(e) => filter(trait, value, false)}
          >
            <IoMdClose />
            <span>
              {trait}: {value}
            </span>
          </button>
        )
      })
    })

    setFilterTags(newFilterTags)
  }, [filters])

  useEffect(() => {
    if (!loadMoreInView) {
      return
    }

    loadMore()
  }, [loadMoreInView])

  useEffect(() => {
    setShowTopBtn(!listingInView)
  }, [listingInView])

  useEffect(() => {
    setToggleActive(collection === 'lily')
    console.log(filters)
  }, [router.asPath])

  return (
    <div className="grid-cols-9 lg:grid" key={router.asPath}>
      <div className="flex items-center justify-start w-full mb-2 lg:mb-4 lg:hidden">
        <button
          className="flex items-center gap-2 mr-4"
          onClick={() => setShowFilters(!showFilters)}
        >
          <FaFilter /> Filter
        </button>
        <button
          className="flex items-center gap-2 p-2 group"
          onClick={() => reset()}
        >
          {filterTags.length ? (
            <IoMdClose className="transition duration-1000 group-hover:rotate-[180deg]" />
          ) : (
            <GrPowerReset className="transition duration-1000 group-hover:rotate-[360deg]" />
          )}

          {filterTags.length ? 'Clear' : 'Shuffle'}
        </button>
      </div>
      <div
        className={clsx(
          showFilters && 'block',
          !showFilters && 'hidden lg:block col-span-2'
        )}
      >
        <div className="overflow-auto lg:sticky lg:mt-8 filter-listing lg:top-24 xl:top-44 lg:mb-60">
          <div className="flex items-center justify-between pb-4 pr-6">
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={toggleActive}
                className="sr-only peer"
                onChange={(e) => {
                  setToggleActive(!toggleActive)
                  router.push(
                    `/collections/${
                      e.currentTarget.checked ? 'lily' : 'lotus-gang'
                    }`
                  )
                }}
              />
              <div className="flex items-center justify-between w-[101px] h-[54px] rounded-full bg-lily-black">
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 40 40"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="ml-[6px]"
                >
                  <path
                    d="M28.2753 20C28.2753 19.5908 28.2455 19.1861 28.1879 18.7883L39.9986 17.0411L35.8656 7.47159L31.4856 8.51277L32.5268 4.1327L22.9579 0L21.2108 11.811C20.813 11.7534 20.4088 11.7236 19.9991 11.7236C19.5894 11.7236 19.1852 11.7534 18.7874 11.811L17.0407 0L7.47188 4.13315L8.51303 8.51322L4.13306 7.47205L0 17.0411L11.8102 18.7974C11.7526 19.1925 11.7234 19.5935 11.7234 19.9995C11.7234 20.4056 11.7526 20.8066 11.8102 21.2017L0 22.9585L4.13306 32.5279L8.51303 31.4868L7.47188 35.8668L17.0412 40L18.7883 28.189C19.1861 28.2466 19.5903 28.2764 20 28.2764C20.4097 28.2764 20.8139 28.2466 21.2117 28.189L22.9588 40L32.5281 35.8668L31.487 31.4868L35.8669 32.5279L40 22.9585L28.1893 21.2113C28.2469 20.8135 28.2766 20.4092 28.2766 19.9995L28.2753 20ZM22.5542 22.5552C21.9835 23.1263 21.2698 23.466 20.5281 23.5753C20.3525 23.6009 20.1756 23.6137 19.9991 23.6137C19.8226 23.6137 19.6456 23.6004 19.4701 23.5753C18.7284 23.466 18.0146 23.1267 17.444 22.5552C16.8701 21.9813 16.5295 21.262 16.4225 20.5167C16.3731 20.1742 16.3731 19.8262 16.4225 19.4838C16.5295 18.7384 16.8697 18.0196 17.444 17.4453C18.0146 16.8742 18.7284 16.5344 19.4701 16.4252C19.6456 16.3995 19.8226 16.3867 19.9991 16.3867C20.1756 16.3867 20.3525 16.4 20.5281 16.4252C21.2698 16.5344 21.9835 16.8737 22.5542 17.4453C23.1253 18.0164 23.465 18.7306 23.5743 19.4714C23.6255 19.8217 23.6255 20.1788 23.5743 20.529C23.465 21.2698 23.1257 21.984 22.5542 22.5552Z"
                    fill="white"
                  />
                </svg>
                <svg
                  width="39"
                  height="38"
                  viewBox="0 0 39 38"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="ml-auto mr-[6px]"
                >
                  <path
                    d="M17.3766 26.9543C15.9625 26.3237 14.972 24.9227 14.9342 23.2876H14.9304V12.1289H10.8547V23.1819C10.8547 23.7861 10.9189 24.3714 11.0437 24.9378C11.4407 26.7693 12.4502 28.3666 13.8491 29.5184C14.1893 29.7978 14.5485 30.0508 14.9304 30.2698C15.9474 30.8627 17.1006 31.2441 18.3331 31.3536V27.2489C18.0004 27.1884 17.679 27.0865 17.3766 26.9543V26.9543ZM37.8761 15.7729C36.4242 15.7918 35.014 15.9693 33.6605 16.2978C31.9213 16.7132 30.2766 17.3703 28.7643 18.2313V23.3518C30.2351 22.1472 31.9402 21.2258 33.8004 20.6556C33.3693 24.4431 31.5054 27.7964 28.7643 30.1641V35.3602C34.0953 32.2146 37.7551 26.554 38.1142 20.0099C38.1331 19.6587 38.1445 19.3075 38.1445 18.9525C38.1445 17.8687 38.0537 16.8076 37.8798 15.7729H37.8761ZM9.37638 18.2275C7.86028 17.3703 6.21563 16.717 4.48025 16.3016C3.12672 15.9731 1.71648 15.7918 0.264656 15.7767C0.0907392 16.8114 0 17.8725 0 18.9563C0 19.3113 0.0113424 19.6624 0.0302464 20.0136C0.389422 26.554 4.04924 32.2183 9.38016 35.3639V30.1679C6.63908 27.804 4.77137 24.4469 4.34414 20.6594C6.20429 21.2258 7.90943 22.151 9.38016 23.3556V18.2313L9.37638 18.2275Z"
                    fill="white"
                  />
                  <path
                    d="M19.0711 5.42641L23.2111 10.6527V14.4289C24.8898 15.2257 26.3076 16.4907 27.2868 18.0541V10.6527L22.5911 4.56544L19.0711 0L15.5512 4.56544L10.8555 10.6527H14.9312L19.0711 5.42641V5.42641Z"
                    fill="white"
                  />
                  <path
                    d="M23.1428 16.0525C23.037 15.9921 22.9273 15.9317 22.8177 15.875C22.7799 15.8562 22.7421 15.8335 22.7005 15.8146C22.5568 15.7429 22.4131 15.6749 22.2619 15.6145C22.2543 15.6145 22.2505 15.6107 22.243 15.6069C22.1031 15.5465 21.9594 15.4936 21.812 15.4408C21.7666 15.4257 21.7175 15.4106 21.6721 15.3917C21.5624 15.3539 21.449 15.3199 21.3356 15.2897C21.2864 15.2746 21.2411 15.2633 21.1919 15.2482C21.0369 15.2067 20.8781 15.1689 20.7193 15.1349C20.7118 15.1349 20.7042 15.1349 20.6966 15.1311C20.5454 15.1009 20.3904 15.0745 20.2316 15.0518C20.1825 15.0443 20.1333 15.0405 20.0804 15.0329C19.9594 15.0178 19.8384 15.0065 19.7174 14.9952C19.6683 14.9914 19.6191 14.9876 19.5662 14.9839C19.3998 14.9725 19.2297 14.9688 19.0596 14.9688C18.1257 14.9688 17.2296 15.1236 16.3941 15.4106V20.0138C16.9347 19.5568 17.5964 19.2359 18.3223 19.1075C18.5605 19.0659 18.8062 19.0433 19.0596 19.0433C19.3129 19.0433 19.5586 19.0659 19.7968 19.1075C21.1314 19.3492 22.2468 20.2252 22.8063 21.4185C23.0332 21.8943 23.1693 22.4192 23.1957 22.9743C23.1957 22.9705 23.1957 22.9668 23.2033 22.9668V23.2877C23.1617 24.9228 22.1712 26.32 20.7609 26.9544C20.4584 27.0904 20.1371 27.1923 19.8006 27.2528V31.3575C21.0331 31.248 22.1901 30.8666 23.2033 30.2737V33.1852C23.1655 33.1965 23.1277 33.2078 23.0899 33.2154C22.035 33.5099 20.9348 33.695 19.8006 33.7478C19.5662 33.7592 19.328 33.7667 19.0936 33.7667H19.0369C18.7987 33.7667 18.5605 33.7592 18.3261 33.7478C17.1918 33.6912 16.0878 33.5099 15.0368 33.2154C14.999 33.2041 14.9612 33.1927 14.9234 33.1852C14.8591 33.1663 14.791 33.1437 14.723 33.1248C13.3921 32.7169 12.1445 32.1316 11.0027 31.3877C10.9497 31.3575 10.8968 31.3235 10.8477 31.2858V36.1457C12.031 36.7122 13.2787 37.1578 14.5831 37.4712C15.9366 37.7997 17.3506 37.981 18.8025 37.9961C18.8894 37.9999 18.9802 37.9999 19.0671 37.9999C19.1541 37.9999 19.2448 37.9999 19.3318 37.9961C20.7836 37.9772 22.1938 37.7997 23.5474 37.4712C24.8517 37.1578 26.1032 36.7122 27.2828 36.1457V23.1782C27.2828 20.1271 25.6117 17.4648 23.139 16.0525H23.1428Z"
                    fill="white"
                  />
                </svg>
              </div>
              <div className="w-[46px] h-[46px] peer-checked:translate-x-[46px] absolute top-[4px] left-[4px] transition-all">
                <svg
                  width="46"
                  height="46"
                  viewBox="0 0 46 46"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-full h-full animate-spin"
                >
                  <circle cx="23" cy="23" r="22.5" fill="white" />
                  <path
                    d="M23.0565 23.0067L4.51562 16.9824C7.17725 8.79058 14.4432 3.51172 23.0565 3.51172V23.0067Z"
                    fill="#FFD462"
                  />
                  <path
                    d="M23.0567 23.0067L11.5979 38.7781C4.62941 33.7154 1.85421 25.1743 4.51584 16.9824L23.0567 23.0067V23.0067Z"
                    fill="#FF9596"
                  />
                  <path
                    d="M23.0564 23.0068L34.5152 38.7783C27.5467 43.841 18.5662 43.841 11.5977 38.7783L23.0564 23.0068Z"
                    fill="#91B9FF"
                  />
                  <path
                    d="M23.0566 23.0067L41.5975 16.9824C44.2591 25.1743 41.4839 33.7154 34.5154 38.7781L23.0566 23.0067Z"
                    fill="#A6F7F8"
                  />
                  <path
                    d="M23.0566 23.0067V3.51172C31.6699 3.51172 38.9359 8.79058 41.5975 16.9824L23.0566 23.0067V23.0067Z"
                    fill="#A9F9CD"
                  />
                  <path
                    d="M23.0564 29.9673C26.8802 29.9673 29.98 26.8675 29.98 23.0437C29.98 19.2199 26.8802 16.1201 23.0564 16.1201C19.2326 16.1201 16.1328 19.2199 16.1328 23.0437C16.1328 26.8675 19.2326 29.9673 23.0564 29.9673Z"
                    fill="white"
                  />
                </svg>
              </div>
            </label>
            <button
              className="items-center hidden gap-2 p-2 ml-auto text-sm select-none lg:flex group"
              onClick={() => reset()}
            >
              Shuffle
              <GrPowerReset className="transition duration-1000 group-hover:rotate-[360deg] text-base" />
            </button>
          </div>
          <ul className="w-full">
            {traits.map((trait, traitIndex) => {
              return (
                <li
                  className="w-full pr-8 font-bold first:mt-0"
                  key={traitIndex}
                >
                  <Disclosure>
                    {({ open }) => (
                      <>
                        <Disclosure.Button className="flex items-center justify-between w-full py-5 font-light uppercase border-t border-lily-black">
                          {trait.trait_type}
                          {open ? <AiOutlineMinus /> : <AiOutlinePlus />}
                        </Disclosure.Button>
                        <Disclosure.Panel>
                          <div className="relative mb-4">
                            <BiSearch className="absolute left-[12px] top-[12px] text-sm" />
                            <input
                              className="w-full pt-[9px] pb-2 pl-[32px] pr-4 text-sm font-normal bg-gray-100 rounded-full outline-none text-neutral-600"
                              type="search"
                              placeholder="Search..."
                              onChange={(e) => {
                                const prevTraitFilters: { [key: string]: any } =
                                  [...(traitFilters as any)]
                                prevTraitFilters[trait.trait_type] =
                                  e.currentTarget.value

                                setTraitFilters(prevTraitFilters)
                              }}
                            />
                          </div>
                          <ul className={clsx('mt-2 mb-4 text-sm font-normal')}>
                            {trait.values.map((value, valueIndex) => {
                              const traitFilter = traitFilters[trait.trait_type]
                              if (
                                traitFilter &&
                                !value
                                  .toLowerCase()
                                  .includes(traitFilter.toLowerCase())
                              ) {
                                return
                              }
                              console.log(filters[trait.trait_type])
                              return (
                                <li className="w-full" key={valueIndex}>
                                  <label
                                    className="checkbox-label flex items-center w-full gap-2 py-[6px] font-sans"
                                    htmlFor={`${trait.trait_type}-${value}`}
                                  >
                                    <Checkbox
                                      icon={
                                        <FiCheck color="#1F1F1F" size={15} />
                                      }
                                      checked={
                                        filters[trait.trait_type] &&
                                        filters[trait.trait_type].includes(
                                          value
                                        )
                                      }
                                      name="my-input"
                                      onChange={(val: boolean, e: any) => {
                                        filter(trait.trait_type, value, val)
                                        e.currentTarget.querySelector(
                                          'span > div'
                                        ).style.opacity = val ? 1 : 0.5
                                      }}
                                      borderRadius={24}
                                      borderColor={theme.primaryColor}
                                      size={24}
                                      style={{
                                        cursor: 'pointer',
                                        backgroundColor: theme.primaryColor,
                                        opacity:
                                          filters[trait.trait_type] &&
                                          filters[trait.trait_type].includes(
                                            value
                                          )
                                            ? 1
                                            : 0.5,
                                      }}
                                      labelStyle={{
                                        marginLeft: 8,
                                        cursor: 'pointer',
                                      }}
                                      label={value}
                                    />
                                  </label>
                                </li>
                              )
                            })}
                          </ul>
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
      <div className="flex flex-col items-center col-span-7 lg:mt-[29px]">
        {filterTags.length > 0 && (
          <div className="flex flex-wrap items-center justify-start w-full gap-4 pb-3">
            <button
              className="items-center hidden gap-2 p-2 lg:flex group"
              onClick={() => reset()}
            >
              <IoMdClose className="transition duration-1000 group-hover:rotate-[180deg]" />
              clear
            </button>
            {filterTags}
          </div>
        )}
        <div
          className={clsx(
            'grid w-full grid-cols-2 gap-4 mb-16 sm:grid-cols-3 xl:grid-cols-4',
            filterTags.length > 0 && 'mt-2 lg:mt-0'
          )}
        >
          {nfts.map((nft, nftIndex) => {
            const nftName = splitNftName(nft.name)
            return (
              <div
                className="p-4 transition rounded-lg bg-gray-50 hover:scale-105"
                key={nftIndex}
                ref={nftIndex === 0 ? listingRef : null}
              >
                <Link
                  href={`/collections/${collection}/${nft.address}`}
                  passHref
                >
                  <a>
                    <div className="relative w-full h-[160px] md:h-[200px] lg:h-[240px] bg-slate-50 flex items-center justify-center">
                      <BeatLoader color="#aaa" size={10} />
                      <div className="absolute top-0 left-0 w-full h-full">
                        <Image
                          src={cdnAsset(collection, nft.address, 'large')}
                          layout="fill"
                          className="object-cover rounded-lg"
                          quality={100}
                        />
                      </div>
                    </div>
                    <div className="flex items-center justify-between mt-4 font-sans">
                      <h3 className="text-xl">{nftName[0]}</h3>
                      <h4 className="font-semibold">{nftName[1]}</h4>
                    </div>
                  </a>
                </Link>
              </div>
            )
          })}
        </div>
        <div
          ref={loadMoreRef}
          className="opacity-0 pointer-events-none relative -translate-y-[200vh]"
        >
          <Button onClick={() => loadMore()}>Load More</Button>
        </div>
        <button
          className={clsx(
            'fixed items-center gap-2 bottom-5 left-5 group hidden transition duration-300 opacity-0 lg:flex',
            showTopBtn && 'opacity-100'
          )}
          onClick={() => window.scrollTo(0, 0)}
        >
          <BsFillArrowUpCircleFill className="transition duration-500 group-hover:rotate-[360deg]" />
          back to top
        </button>
      </div>
    </div>
  )
}

export default CollectionListing
