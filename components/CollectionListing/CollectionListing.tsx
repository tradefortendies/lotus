import { Trait, Nft } from '../../types'
import Link from 'next/link'
import Image from 'next/image'
import clsx from 'clsx'
import { Disclosure } from '@headlessui/react'
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai'
import { GrPowerReset } from 'react-icons/gr'
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
  return (
    <div className="grid grid-cols-6">
      <div className="sticky top-0">
        <div className="w-full pr-8 mt-[35px]">
          <button
            onClick={() => reset()}
            className="flex items-center justify-start w-full gap-4 px-4 py-3 transition bg-slate-50 hover:bg-slate-100"
          >
            <GrPowerReset />
            Reset
          </button>
        </div>
        <ul className="mt-10">
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
                          className="w-full px-2 py-1 my-2 font-mono font-normal border-2 border-neutral-200 text-neutral-600"
                          type="text"
                          placeholder="Search..."
                        />
                        <ul
                          className={clsx(
                            'mt-2 text-sm font-normal'
                            // traitIndex > 0 && 'hidden'
                          )}
                        >
                          {trait.values.map((value, valueIndex) => {
                            return (
                              <li className="w-full" key={valueIndex}>
                                <label
                                  className="flex items-center w-full gap-2 py-1"
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
        <p className="w-full pb-4 text-sm italic text-left">
          Showing {showing} of {total}
        </p>
        <div className="grid w-full grid-cols-4 gap-4 mb-16">
          {nfts.map((nft, nftIndex) => {
            return (
              <div className="p-4 bg-gray-100" key={nftIndex}>
                <Link
                  href={`/collections/${collection}/${nft.address}`}
                  passHref
                >
                  <a>
                    <Image src={nft.image} width={260} height={260} />
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
