import { Trait, Nft } from '../../types'
import Link from 'next/link'
import clsx from 'clsx'
import Button from '../Button'

function CollectionListing({
  total,
  page,
  perPage,
  traits,
  nfts,
  loadMore,
  filter,
}: {
  total: number
  page: number
  perPage: number
  traits: Trait[]
  nfts: Nft[]
  loadMore: () => void
  filter: (trait: string, value: string, state: boolean) => void
}) {
  return (
    <div className="grid grid-cols-6">
      <div>
        <ul>
          {traits.map((trait, traitIndex) => {
            return (
              <li className="my-4 font-bold first:mt-0" key={traitIndex}>
                {trait.trait_type}
                <ul
                  className={clsx(
                    'mt-2 text-sm font-normal'
                    // traitIndex > 0 && 'hidden'
                  )}>
                  {trait.values.map((value, valueIndex) => {
                    return (
                      <li className="w-full" key={valueIndex}>
                        <label
                          className="flex items-center w-full gap-2 py-1"
                          htmlFor={`${traitIndex} + ${valueIndex}`}>
                          <input
                            type="checkbox"
                            id={`${traitIndex} + ${valueIndex}`}
                            onChange={(e) =>
                              filter(trait.trait_type, value, e.target.checked)
                            }
                          />
                          {value}
                        </label>
                      </li>
                    )
                  })}
                </ul>
              </li>
            )
          })}
        </ul>
      </div>
      <div className="flex flex-col items-center col-span-5">
        <p className="w-full pb-4 text-sm italic text-left">
          Showing {(page + 1) * perPage} of {total}
        </p>
        <div className="grid w-full grid-cols-4 gap-4 mb-16">
          {nfts.map((nft, nftIndex) => {
            return (
              <div className="p-4 bg-gray-100" key={nftIndex}>
                <Link href={`/collections/lotus-gang/${nft.address}`} passHref>
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
        <Button onClick={() => loadMore()}>Load More</Button>
      </div>
    </div>
  )
}

export default CollectionListing
