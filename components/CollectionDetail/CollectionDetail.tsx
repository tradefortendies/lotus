const { ColorExtractor } = require('react-color-extractor')
import { useEffect, useState } from 'react'
import { Dialog } from '@headlessui/react'
import { formatAddress } from '../../lib/helpers'
import { Nft } from '../../types'
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
  const [bgColors, setBgColors] = useState<string[]>([])
  const [windowDimensions, setWindowDimensions] = useState<{
    width: number
    height: number
  }>({
    width: 0,
    height: 0,
  })

  useEffect(() => {
    setWindowDimensions({
      width: window.innerWidth,
      height: window.innerHeight,
    })
  }, [])

  return (
    <Dialog
      open={isOpen}
      onClose={() => onClose()}
      className="relative z-[99999]"
    >
      {nft && (
        <>
          <ColorExtractor
            maxColors={5}
            getColors={(colors: string[]) => setBgColors(colors)}
          >
            <img src={nft.image} />
          </ColorExtractor>
          <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-80">
            <Dialog.Panel className="w-full bg-white rounded shadow-2xl max-w-7xl">
              {bgColors && (
                <svg
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-full h-6"
                >
                  {bgColors.slice(0, 5).map((color, index) => {
                    return (
                      <rect
                        x={20 * index + '%'}
                        width="20%"
                        height="100%"
                        fill={color}
                      />
                    )
                  })}
                </svg>
              )}
              <div className="flex p-8">
                <img className="max-w-lg mr-8" src={nft.image} />
                <div className="w-full py-12 bg-white">
                  <h1 className="text-5xl font-bold">{nft.name}</h1>
                  <h2 className="my-3 text-lg font-light text-neutral-500">
                    {formatAddress(nft.address)}
                  </h2>
                  <ul className="flex items-center gap-3 mt-2">
                    <li>
                      <a
                        href={`https://explorer.solana.com/address/${nft.address}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <svg
                          viewBox="0 0 176 138"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-5"
                        >
                          <g clipPath="url(#clip0_1_43)">
                            <path
                              d="M28.5884 105.326C29.6505 104.264 31.1109 103.644 32.6598 103.644H173.123C175.69 103.644 176.974 106.743 175.159 108.558L147.412 136.318C146.35 137.38 144.889 138 143.34 138H2.87653C0.309776 138 -0.973604 134.901 0.840829 133.086L28.5884 105.326Z"
                              fill="url(#paint0_linear_1_43)"
                            />
                            <path
                              d="M28.5882 1.68239C29.6945 0.619827 31.1549 0 32.6596 0H173.123C175.69 0 176.973 3.09913 175.159 4.91434L147.411 32.6737C146.349 33.7363 144.889 34.3561 143.34 34.3561H2.87634C0.309577 34.3561 -0.973802 31.257 0.840631 29.4418L28.5882 1.68239Z"
                              fill="url(#paint1_linear_1_43)"
                            />
                            <path
                              d="M147.412 53.1723C146.35 52.1097 144.889 51.4899 143.34 51.4899H2.87653C0.309776 51.4899 -0.973604 54.589 0.840829 56.4042L28.5884 84.1636C29.6505 85.2262 31.1109 85.846 32.6598 85.846H173.123C175.69 85.846 176.974 82.7468 175.159 80.9316L147.412 53.1723Z"
                              fill="url(#paint2_linear_1_43)"
                            />
                          </g>
                          <defs>
                            <linearGradient
                              id="paint0_linear_1_43"
                              x1="159.705"
                              y1="-16.5827"
                              x2="62.4278"
                              y2="169.663"
                              gradientUnits="userSpaceOnUse"
                            >
                              <stop stopColor="#1E1E1E" />
                            </linearGradient>
                            <linearGradient
                              id="paint1_linear_1_43"
                              x1="117.198"
                              y1="-38.7841"
                              x2="19.9213"
                              y2="147.461"
                              gradientUnits="userSpaceOnUse"
                            >
                              <stop stopColor="#1E1E1E" />
                            </linearGradient>
                            <linearGradient
                              id="paint2_linear_1_43"
                              x1="138.317"
                              y1="-27.7541"
                              x2="41.0393"
                              y2="158.491"
                              gradientUnits="userSpaceOnUse"
                            >
                              <stop stopColor="#1E1E1E" />
                            </linearGradient>
                            <clipPath id="clip0_1_43">
                              <rect width="176" height="138" fill="white" />
                            </clipPath>
                          </defs>
                        </svg>
                      </a>
                    </li>
                    <li>
                      <a
                        href={`https://solscan.io/token/${nft.address}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <svg
                          viewBox="0 0 158 156"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-5"
                        >
                          <g clipPath="url(#clip0_1_40)">
                            <path
                              d="M79.1819 47.1814C96.405 47.3374 109.998 61.2147 109.754 78.3804C109.51 95.5523 95.472 109.099 78.3174 108.718C61.3574 108.344 48.0577 94.7661 48.1017 77.8749C48.1458 60.7155 62.0019 47.0255 79.1819 47.1814Z"
                              fill="#303030"
                            />
                            <path
                              d="M119.241 143.636C92.3358 165.238 44.2585 157.507 19.3559 128.436C-8.0375 96.4568 -4.83873 48.479 26.5788 20.0692C57.6139 -7.99114 105.629 -6.44368 134.9 23.5635C163.313 52.6908 164.572 101.018 137.979 128.292C131.77 121.809 125.556 115.313 119.041 108.512C129.123 94.4601 132.247 78.3801 126.22 61.1146C117.22 35.338 88.7127 21.7353 62.7148 30.5209C37.0239 39.2004 22.9615 66.7741 30.9843 92.7316C39.0951 118.976 66.6078 133.883 93.0126 125.796C98.2689 124.187 101.186 125.129 104.584 129.029C109.078 134.195 114.278 138.75 119.241 143.636Z"
                              fill="#303030"
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0_1_40">
                              <rect width="158" height="156" fill="white" />
                            </clipPath>
                          </defs>
                        </svg>
                      </a>
                    </li>
                    <li>
                      <a
                        href={`https://solana.fm/address/${nft.address}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <svg
                          viewBox="0 0 98 140"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-4"
                        >
                          <path
                            d="M0.478821 69.5997C0.608026 51.1159 8.03664 33.4316 21.1474 20.3963C34.2583 7.36106 51.9899 0.0303045 70.482 0H75.6077V11.1257H70.5596C55.0055 11.1334 40.0839 17.2822 29.0431 28.2337C18.0024 39.1852 11.7365 54.0527 11.6093 69.5997H0.478821Z"
                            fill="#303030"
                          />
                          <path
                            d="M21.829 140V128.874H26.9547C42.5061 128.856 57.4213 122.7 68.4545 111.744C79.4874 100.789 85.7452 85.9215 85.8663 70.377H97.0044C96.8751 88.8676 89.441 106.558 76.3221 119.594C63.2028 132.631 45.4613 139.957 26.9625 139.977L21.829 140Z"
                            fill="#303030"
                          />
                          <path
                            d="M21.829 118.658V107.533H26.9547C36.8456 107.521 46.3338 103.615 53.3641 96.6603C60.3944 89.7059 64.4006 80.2631 64.5152 70.377H75.6458C75.5229 83.2092 70.3405 95.4745 61.2238 104.51C52.1074 113.545 39.793 118.621 26.9547 118.635L21.829 118.658Z"
                            fill="#303030"
                          />
                          <path
                            d="M21.829 69.5997C21.9479 56.7578 27.1336 44.4813 36.2587 35.4403C45.3838 26.3992 57.7104 21.3241 70.5589 21.3185H75.6846V32.4443H70.5589C60.6613 32.4456 51.1631 36.3472 44.1245 43.3027C37.0859 50.2582 33.0741 59.7071 32.9594 69.5997H21.829Z"
                            fill="#303030"
                          />
                          <path
                            d="M21.829 97.317V86.1915H26.9547C31.1853 86.1887 35.2473 84.5336 38.274 81.5789C41.3011 78.6246 43.0531 74.6051 43.1566 70.3774V69.9656C43.1709 62.7132 46.0655 55.7637 51.2037 50.6435C56.342 45.5236 63.3037 42.6522 70.5589 42.6605H75.6846V53.7863H70.5589C66.3222 53.7809 62.2513 55.432 59.2167 58.3871C56.1818 61.3421 54.4236 65.3666 54.3181 69.6001V70.0123C54.3098 77.2589 51.4257 84.2062 46.2986 89.3297C41.1714 94.4531 34.2202 97.3342 26.9703 97.3403L21.829 97.317Z"
                            fill="#303030"
                          />
                        </svg>
                      </a>
                    </li>
                  </ul>
                  <dl className="grid grid-cols-4 my-12 text-sm md:text-base">
                    {nft.attributes.map((attr, index) => {
                      return (
                        <>
                          <dt className="my-1 font-bold">
                            {attr.trait_type.slice(0, 1).toUpperCase() +
                              attr.trait_type.slice(1)}
                          </dt>
                          <dd className="my-1">
                            {attr.value.indexOf('No ') > -1
                              ? 'None'
                              : attr.value}
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
                    className="mt-4"
                  >
                    View on MagicEden
                  </Button>
                </div>
              </div>
            </Dialog.Panel>
          </div>
        </>
      )}
    </Dialog>
  )
}

export default CollectionDetail
