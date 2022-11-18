import { useState, useContext } from 'react'
import clsx from 'clsx'
import { gsap } from 'gsap'
import { formatAddress } from '../../lib/helpers'
import { ThemeContext } from '../Theme'
import Button, { arrowIcon } from '../Button'

function Eligibility() {
  const theme = useContext(ThemeContext)
  const [publicKey, setPublicKey] = useState('')
  const [calculatedWhitelist, setCalculatedWhitelist] = useState(false)
  const [eligible, setEligible] = useState(false)
  const [mintNumber, setMintNumber] = useState(0)
  const [connectedAtLeastOnce, setConnectedAtLeastOnce] = useState(false)
  const [checkingEligibility, setCheckingEligibility] = useState(false)
  const mintDate = new Date('November 18, 2022 16:00:00 GMT+00:00')

  const checkNfts = async () => {
    setConnectedAtLeastOnce(true)
    setCheckingEligibility(true)

    const eligibilityReq = await fetch(
      `/api/getEligibility?address=${publicKey.toString()}`
    )

    const eligibilityData = await eligibilityReq.json()

    setCalculatedWhitelist(true)
    setMintNumber(eligibilityData.mintCount)
    setEligible(eligibilityData.eligible)
    setCheckingEligibility(false)
  }

  const reset = () => {
    setCalculatedWhitelist(false)
    setMintNumber(0)
    setEligible(false)
  }

  setTimeout(() => {
    gsap.to('#eligibility-content div', {
      scrollTrigger: {
        trigger: '#eligibility',
        start: 'top 130%',
        toggleActions: 'restart none none reverse',
      },
      opacity: 1,
      stagger: 0.25,
    })
  }, 1000)

  return (
    <div
      id="eligibility"
      className="pt-20 text-white pb-28 bg-lily-black lg:py-0"
    >
      <div className="relative flex flex-col w-full px-8 mx-auto text-center lg:min-h-screen lg:justify-center lg:text-left max-w-7xl">
        <div
          className="w-full grid-cols-6 gap-4 lg:grid"
          id="eligibility-content"
        >
          {!calculatedWhitelist && (
            <>
              <div
                className={clsx(
                  'col-span-4',
                  !connectedAtLeastOnce && 'lg:opacity-0'
                )}
              >
                <h2 className="text-5xl md:text-7xl lg:text-[90px] font-mono leading-none">
                  Check LILY Eligibility
                </h2>
              </div>
              <div
                className={clsx(
                  'flex flex-col justify-center col-span-2 mt-16 lg:mt-0',
                  !connectedAtLeastOnce && 'lg:opacity-0'
                )}
              >
                <p className="mx-auto lg:mx-0 max-w-[26rem] mb-4 font-sans text-xl lg:text-3xl">
                  Enter your wallet address to see if you can mint.
                </p>
                <form
                  onSubmit={(e) => {
                    e.preventDefault()
                    checkNfts()
                  }}
                >
                  <input
                    type="text"
                    required
                    className="w-full px-5 py-2 my-4 text-lg rounded-xl text-lily-black"
                    placeholder="Enter wallet address..."
                    onChange={(e) => setPublicKey(e.target.value)}
                  />
                  <Button className="mr-auto" size="sm">
                    <>
                      {checkingEligibility
                        ? 'Checking...'
                        : 'Check Eligibility'}{' '}
                      {arrowIcon}
                    </>
                  </Button>
                </form>
              </div>
            </>
          )}
          {calculatedWhitelist && (
            <>
              <div
                className={clsx(
                  'flex flex-col justify-center col-span-3 space-y-6 pt-16 xl:pt-0',
                  !connectedAtLeastOnce && 'lg:opacity-0'
                )}
              >
                {eligible && (
                  <>
                    <h2 className="font-sans text-5xl lg:text-7xl">
                      Yes! You&apos;re eligible for the whitelist mint.
                    </h2>
                    <p className="font-sans text-2xl lg:text-4xl">
                      You&apos;ll be able to mint{' '}
                      <span style={{ color: theme.primaryColor }}>
                        {mintNumber} {mintNumber === 1 ? 'LILY' : 'LILIES'}
                      </span>
                      .
                    </p>
                  </>
                )}
                {!eligible && (
                  <>
                    <h2 className="font-sans text-4xl lg:pr-16 lg:text-6xl">
                      Unfortunately you&apos;re not eligible for the whitelist
                      mint.
                    </h2>
                    <p className="font-sans text-xl lg:text-3xl">
                      You can{' '}
                      <span style={{ color: theme.primaryColor }}>
                        gain access
                      </span>{' '}
                      through the following options{' '}
                      <svg
                        width="32"
                        height="22"
                        viewBox="0 0 32 22"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="inline ml-2"
                      >
                        <path
                          d="M30.4675 11.0049H1.53418"
                          stroke="white"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M21.1338 1.67139L30.4671 11.0047L21.1338 20.3381"
                          stroke="white"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </p>
                    <p className="font-sans text-xl lg:text-3xl">
                      Or join the public mint.
                    </p>
                  </>
                )}
              </div>
              <div
                className={clsx(
                  'flex flex-col justify-center col-span-3 space-y-6 mt-16 lg:mt-0',
                  !connectedAtLeastOnce && 'lg:opacity-0'
                )}
              >
                {eligible && (
                  <>
                    <div
                      className="flex gap-6 p-8 rounded-lg text-neutral-800"
                      style={{ backgroundColor: theme.primaryColor }}
                    >
                      <div className="space-y-3">
                        <h3 className="text-2xl uppercase">Mint for 1 SOL</h3>
                        <p className="font-sans xl:pr-10">
                          Those on the LILY List will be able to mint for 1 SOL.
                          It is reserved for you for a window of time.
                        </p>
                        <Button
                          href="https://magiceden.io/launchpad/lily"
                          target="_blank"
                          rel="noreferrer"
                          className="!bg-white !text-neutral-800 text-base xl:text-lg"
                        >
                          Mint on MagicEden
                        </Button>
                      </div>
                    </div>
                  </>
                )}
                {!eligible && (
                  <>
                    <div
                      className="flex gap-6 p-8 rounded-lg text-neutral-800"
                      style={{ backgroundColor: theme.primaryColor }}
                    >
                      <div className="mx-auto space-y-3">
                        <h3 className="text-2xl uppercase">
                          Buy a Lotus before{' '}
                          {mintDate.toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </h3>
                        <ul className="text-sm xl:text-base">
                          <li>
                            <strong>Local</strong>:
                            {` ${mintDate.toLocaleDateString([], {
                              year: 'numeric',
                              month: 'numeric',
                              day: 'numeric',
                            })} ${mintDate.toLocaleString([], {
                              hour: '2-digit',
                              minute: '2-digit',
                            })}`}
                          </li>
                          <li>
                            <strong>UTC</strong>: 18/11/2022 16:00
                          </li>
                        </ul>
                        <p className="font-sans xl:pr-16">
                          The <strong>only</strong> way to guarantee a spot is
                          by buying before{' '}
                          {mintDate.toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit',
                          })}{' '}
                          (16:00 UTC) and holding during mint.
                        </p>
                        <Button
                          href="https://magiceden.io/marketplace/lotus_gang_nft"
                          target="_blank"
                          rel="noreferrer"
                          className="!bg-white !text-neutral-800 text-base xl:text-lg"
                        >
                          Buy on Magic Eden
                        </Button>
                      </div>
                    </div>
                    <div
                      className="flex gap-6 p-8 rounded-lg text-neutral-800"
                      style={{ backgroundColor: theme.primaryColor }}
                    >
                      <div className="space-y-3">
                        <h3 className="text-2xl uppercase">
                          Mint in the public phase
                        </h3>
                        <p className="font-sans xl:pr-10">
                          The public phase will open 1 hour after the WL phase.
                        </p>
                        <Button
                          href="https://magiceden.io/launchpad/lily"
                          target="_blank"
                          rel="noreferrer"
                          className="!bg-white !text-neutral-800 text-base xl:text-lg"
                        >
                          Mint on Magic Eden
                        </Button>
                      </div>
                    </div>
                  </>
                )}
              </div>
              <div>
                <p className="mt-8 mb-4">
                  <strong>Wallet</strong>: {formatAddress(publicKey)}
                </p>
                <Button className="mr-auto" size="sm" onClick={() => reset()}>
                  <>Change wallet {arrowIcon}</>
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default Eligibility
