import { Nft } from '../../types'
import { Dialog } from '@headlessui/react'

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
      className="relative z-[99999]">
      {nft && (
        <div className="fixed inset-0 flex items-center justify-center p-4 bg-white bg-opacity-80">
          <Dialog.Panel className="w-full max-w-lg p-8 bg-white rounded">
            <img src={nft.image} />
            <div className="pt-6">
              <h1 className="text-xl font-bold">{nft.name}</h1>
              <dl className="grid grid-cols-4 mt-6 text-xs md:text-sm">
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
            </div>
          </Dialog.Panel>
        </div>
      )}
    </Dialog>
  )
}

export default CollectionDetail
