import { Trait, Nft } from '../../types'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import clsx from 'clsx'
import { Disclosure } from '@headlessui/react'
import BeatLoader from 'react-spinners/BeatLoader'
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai'
import { GrPowerReset } from 'react-icons/gr'
import { IoMdClose } from 'react-icons/io'
import { FaFilter } from 'react-icons/fa'
import Button from '../Button'

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
  const [filterTags, setFilterTags] = useState<JSX.Element[]>([])
  const [traitFilters, setTraitFilters] = useState<{ [key: string]: any }>([])

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
    console.log(traitFilters)
  }, [traitFilters])

  return (
    <div className="grid-cols-6 lg:grid">
      <div className="flex items-center justify-start w-full mb-4 lg:hidden">
        <button className="flex items-center gap-2 mr-4">
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
      <div className="hidden">
        <ul className="mt-8 lg:mt-20">
          {traits.map((trait, traitIndex) => {
            return (
              <li className="pr-8 my-8 font-bold first:mt-0" key={traitIndex}>
                <Disclosure>
                  {({ open }) => (
                    <>
                      <Disclosure.Button className="flex items-center justify-between w-full">
                        {trait.trait_type}
                        {open ? <AiOutlineMinus /> : <AiOutlinePlus />}
                      </Disclosure.Button>
                      <Disclosure.Panel>
                        <input
                          className="w-full px-2 py-1 my-2 font-mono font-normal border-2 outline-none border-neutral-200 text-neutral-600"
                          type="search"
                          placeholder="Search..."
                          onChange={(e) => {
                            const prevTraitFilters: { [key: string]: any } = [
                              ...(traitFilters as any),
                            ]
                            prevTraitFilters[trait.trait_type] =
                              e.currentTarget.value

                            setTraitFilters(prevTraitFilters)
                          }}
                        />
                        <ul className={clsx('mt-2 text-sm font-normal')}>
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
                                  className={clsx(
                                    'flex cursor-pointer items-center w-full gap-2 py-1 text-gray-800 hover:font-bold hover:text-black',
                                    filters[trait.trait_type]?.includes(
                                      value
                                    ) && '!text-black !font-bold'
                                  )}
                                  htmlFor={`${trait.trait_type}-${value}`}
                                >
                                  <input
                                    type="checkbox"
                                    id={`${trait.trait_type}-${value}`}
                                    data-filter
                                    checked={filters[
                                      trait.trait_type
                                    ]?.includes(value)}
                                    onChange={(e) =>
                                      filter(
                                        trait.trait_type,
                                        value,
                                        e.target.checked
                                      )
                                    }
                                  />
                                  {value}
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
      <div className="flex flex-col items-center col-span-5">
        <div className="flex flex-wrap items-center justify-start w-full gap-4 lg:py-4">
          <button
            className="items-center hidden gap-2 p-2 lg:flex group"
            onClick={() => reset()}
          >
            {filterTags.length ? (
              <IoMdClose className="transition duration-1000 group-hover:rotate-[180deg]" />
            ) : (
              <GrPowerReset className="transition duration-1000 group-hover:rotate-[360deg]" />
            )}

            {filterTags.length ? 'Clear' : 'Shuffle'}
          </button>
          {filterTags}
        </div>
        <div
          className={clsx(
            'grid w-full grid-cols-2 gap-4 mb-16 sm:grid-cols-3 md:grid-cols-4',
            filterTags.length > 0 && 'mt-8 lg:mt-0'
          )}
        >
          {nfts.map((nft, nftIndex) => {
            return (
              <div
                className="p-4 transition bg-gray-100 rounded-md hover:scale-105"
                key={nftIndex}
              >
                <Link
                  href={`/collections/${collection}/${nft.address}`}
                  passHref
                >
                  <a>
                    <div className="relative w-full h-[200px] bg-slate-100 flex items-center justify-center">
                      <BeatLoader color="#aaa" size={10} />
                      <div className="absolute top-0 left-0 w-full h-full">
                        <Image
                          src={`https://lotusgang-assets.sfo3.cdn.digitaloceanspaces.com/collections/${collection}/${nft.address}.png`}
                          layout="fill"
                          className="object-cover"
                        />
                      </div>
                    </div>
                    <div className="mt-4">
                      <h3 className="font-bold">{nft.name}</h3>
                    </div>
                  </a>
                </Link>
              </div>
            )
          })}
        </div>
        <Button onClick={() => loadMore()}>Load More</Button>
      </div>
    </div>
  )
}

export default CollectionListing
