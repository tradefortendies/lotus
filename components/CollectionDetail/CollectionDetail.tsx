import { Nft } from '../../types'
import { Dialog } from '@headlessui/react'
import Button from '../Button'

function CollectionDetail({
  isOpen,
  onClose,
  nft,
}: {
  isOpen: boolean
  onClose: () => void
  nft: Nft
}) {
  return (
    <Dialog
      open={isOpen}
      onClose={() => onClose()}
      className="relative z-[99999]"
    >
      {nft && (
        <div className="fixed inset-0 flex items-center justify-center p-4 bg-white bg-opacity-80">
          <Dialog.Panel className="flex w-full p-8 bg-white rounded max-w-7xl">
            <img className="mr-8" src={nft.image} />
            <div className="w-full pt-6 bg-white">
              <h1 className="text-5xl font-bold">{nft.name}</h1>
              <dl className="grid grid-cols-4 my-8 text-sm md:text-base">
                {nft.attributes.map((attr, index) => {
                  return (
                    <>
                      <dt className="my-1 font-bold">
                        {attr.trait_type.slice(0, 1).toUpperCase() +
                          attr.trait_type.slice(1)}
                      </dt>
                      <dd className="my-1">
                        {attr.value.indexOf('No ') > -1 ? 'None' : attr.value}
                      </dd>
                    </>
                  )
                })}
              </dl>
              <Button
                href={`https://magiceden.io/item-details/${nft.address}`}
                target="_blank"
                rel="noreferrer"
                size="sm"
                className="mt-8"
              >
                Buy on MagicEden
              </Button>
            </div>
          </Dialog.Panel>
        </div>
      )}
    </Dialog>
  )
}

export default CollectionDetail
