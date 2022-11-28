import { Trait, Nft } from '../../types'
import { useEffect, useState } from 'react'
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

  return (
    <div className="grid-cols-6 lg:grid" key={router.asPath}>
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
          !showFilters && 'hidden lg:block'
        )}
      >
        <div className="overflow-auto lg:sticky lg:mt-8 filter-listing lg:top-44 lg:mb-60">
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
              <div className="w-[101px] h-[54px] rounded-full bg-lily-black"></div>
              <svg
                width="46"
                height="46"
                viewBox="0 0 46 46"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-[46px] h-[46px] peer-checked:translate-x-[46px] absolute top-[4px] left-[4px] transition-all"
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
                                      name="my-input"
                                      onChange={(val: boolean, e: any) => {
                                        filter(trait.trait_type, value, val)
                                        e.currentTarget.querySelector(
                                          'span > div'
                                        ).style.opacity = val ? 1 : 0.5
                                      }}
                                      borderRadius={24}
                                      borderColor="#91AEFA"
                                      size={24}
                                      style={{
                                        cursor: 'pointer',
                                        backgroundColor: '#91AEFA',
                                        opacity: 0.5,
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
      <div className="flex flex-col items-center col-span-5 lg:mt-[29px]">
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
            'grid w-full grid-cols-2 gap-4 mb-16 sm:grid-cols-3 md:grid-cols-4',
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
                    <div className="relative w-full h-[200px] bg-slate-50 flex items-center justify-center">
                      <BeatLoader color="#aaa" size={10} />
                      <div className="absolute top-0 left-0 w-full h-full">
                        <Image
                          src={cdnAsset(collection, nft.address, 'thumb')}
                          layout="fill"
                          className="object-cover rounded-lg"
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
          className="opacity-0 pointer-events-none -translate-y-[50%]"
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
