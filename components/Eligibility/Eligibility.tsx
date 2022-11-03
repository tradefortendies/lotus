import { useEffect, useState, useContext } from 'react'
import { useWallet } from '@solana/wallet-adapter-react'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import clsx from 'clsx'
import { formatAddress } from '../../lib/helpers'
import { ThemeContext } from '../Theme'
import Button, { arrowIcon } from '../Button'

function Eligibility() {
  const { publicKey } = useWallet()
  const theme = useContext(ThemeContext)
  const [calculatedWhitelist, setCalculatedWhitelist] = useState(false)
  const [eligible, setEligible] = useState(false)
  const [mintNumber, setMintNumber] = useState(0)
  const [connectedAtLeastOnce, setConnectedAtLeastOnce] = useState(false)
  const [checkingEligibility, setCheckingEligibility] = useState(false)

  const checkNfts = async () => {
    if (!publicKey) {
      setCalculatedWhitelist(false)
      setMintNumber(0)
      setEligible(false)
      return
    }

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

  useEffect(() => {
    setConnectedAtLeastOnce(true)
    checkNfts()
  }, [publicKey])

  return (
    <div
      id="eligibility"
      className="pt-20 text-white pb-28 bg-lily-black lg:py-0">
      <div className="relative flex flex-col w-full px-8 mx-auto text-center lg:min-h-screen lg:justify-center lg:text-left max-w-7xl">
        <div
          className="w-full grid-cols-6 gap-4 lg:grid"
          id="eligibility-content">
          {!calculatedWhitelist && (
            <>
              <div
                className={clsx(
                  'col-span-4',
                  !connectedAtLeastOnce && 'lg:opacity-0'
                )}>
                <h2 className="text-5xl md:text-7xl lg:text-[90px] font-mono leading-none">
                  Check LILY Eligibility
                </h2>
              </div>
              <div
                className={clsx(
                  'flex flex-col justify-center col-span-2 mt-16 lg:mt-0',
                  !connectedAtLeastOnce && 'lg:opacity-0'
                )}>
                <p className="mx-auto lg:mx-0 max-w-[18rem] mb-4 font-sans text-xl lg:text-2xl">
                  Connect your wallet to see if you can mint.
                </p>
                <div
                  className="flex mx-auto mt-2 border rounded-full lg:mt-0 lg:ml-0 lg:mr-auto grow-0"
                  style={{
                    borderColor: theme.primaryColor,
                  }}>
                  <div
                    onMouseOver={(e) => {
                      const el: HTMLDivElement =
                        e.currentTarget as HTMLDivElement
                      const btn = el.querySelector('button')

                      if (!btn) {
                        return
                      }

                      btn.classList.remove('!bg-transparent')
                      btn.style.backgroundColor = theme.primaryColor
                    }}
                    onMouseOut={(e) => {
                      const el: HTMLDivElement =
                        e.currentTarget as HTMLDivElement
                      const btn = el.querySelector('button')

                      if (!btn) {
                        return
                      }

                      btn.classList.add('!bg-transparent')
                      btn.removeAttribute('style')
                    }}>
                    <WalletMultiButton className="!bg-transparent !rounded-full !font-normal !text-xl !font-sans !text-white !mr-auto !gap-1 !px-7 !py-6 !transition">
                      {checkingEligibility ? (
                        'Checking...'
                      ) : (
                        <>Connect {arrowIcon}</>
                      )}
                    </WalletMultiButton>
                  </div>
                </div>
              </div>
            </>
          )}
          {calculatedWhitelist && (
            <>
              <div
                className={clsx(
                  'flex flex-col justify-center col-span-3 space-y-6',
                  !connectedAtLeastOnce && 'lg:opacity-0'
                )}>
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
                    <WalletMultiButton className="!bg-transparent !border !border-solid !rounded-full !font-normal !text-xl !font-sans !text-white !mx-auto lg:!ml-0 lg:!mr-auto !gap-1 !px-7 !py-6 !transition">
                      {formatAddress(String(publicKey?.toString()))}
                    </WalletMultiButton>
                  </>
                )}
                {!eligible && (
                  <>
                    <h2 className="font-sans text-4xl lg:pr-16 lg:text-6xl">
                      Unfortunately you’re not eligible for the whitelist mint.
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
                        className="inline ml-2">
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
                    <WalletMultiButton className="!bg-transparent !border !border-solid !rounded-full !font-normal !text-xl !font-sans !text-white !mx-auto lg:!ml-0 lg:!mr-auto !gap-1 !px-7 !py-6 !transition">
                      {formatAddress(String(publicKey?.toString()))}
                    </WalletMultiButton>
                  </>
                )}
              </div>
              <div
                className={clsx(
                  'flex flex-col justify-center col-span-3 space-y-6 mt-16 lg:mt-0',
                  !connectedAtLeastOnce && 'lg:opacity-0'
                )}>
                {eligible && (
                  <>
                    <div
                      className="flex gap-6 p-8 rounded-lg text-neutral-800"
                      style={{ backgroundColor: theme.primaryColor }}>
                      <div className="space-y-3">
                        <h3 className="text-2xl uppercase">
                          Mint for
                          <span className="mx-4 rounded-md px-14 bg-lily-black"></span>
                        </h3>
                        <p className="pr-10 font-sans">
                          Gang Members who{' '}
                          <span className="inline-block w-1/2 px-12 py-3 mx-1 translate-y-[7px] rounded-md bg-lily-black"></span>
                          <span className="inline-block w-3/4 px-12 py-3 mx-1 translate-y-[7px] rounded-md bg-lily-black"></span>
                          .
                        </p>
                        <Button className="!bg-white !text-neutral-800 cursor-help">
                          <span className="px-12 py-3 mx-1 rounded-md bg-lily-black"></span>
                        </Button>
                      </div>
                    </div>
                    <div
                      className="flex gap-6 p-8 rounded-lg text-neutral-800"
                      style={{ backgroundColor: theme.primaryColor }}>
                      <div className="space-y-3">
                        <h3 className="text-2xl uppercase">
                          Mint for
                          <span className="px-5 mx-4 rounded-md bg-lily-black"></span>
                          SOL
                        </h3>
                        <p className="pr-10 font-sans">
                          If you do not{' '}
                          <span className="px-6 mx-1 rounded-md bg-lily-black"></span>{' '}
                          your LOTUS, you are able to mint for{' '}
                          <span className="px-2 mx-1 rounded-md bg-lily-black"></span>
                          SOL. It is reserved for you for a window of time.
                        </p>
                        <Button className="!bg-white !text-neutral-800 cursor-help">
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
                      style={{ backgroundColor: theme.primaryColor }}>
                      <div className="space-y-3">
                        <h3 className="text-2xl uppercase">Buy a Lotus</h3>
                        <p className="pr-10 font-sans">
                          The original collection. All LOTUS holders are
                          eligible for whitelist for every LOTUS they hold.
                        </p>
                        <Button
                          href="https://magiceden.io/marketplace/lotus_gang_nft"
                          target="_blank"
                          rel="noreferrer"
                          className="!bg-white !text-neutral-800">
                          Buy on Magic Eden
                        </Button>
                      </div>
                    </div>
                    <div
                      className="flex gap-6 p-8 rounded-lg text-neutral-800"
                      style={{ backgroundColor: theme.primaryColor }}>
                      <div className="space-y-3">
                        <h3 className="text-2xl uppercase">Buy a Rap Pack</h3>
                        <p className="pr-10 font-sans">
                          Each piece in the RAP PACK enables you to mint
                          <span className="px-2 mx-1 rounded-md bg-lily-black"></span>
                          LILIES.
                        </p>
                        <Button
                          href="https://exchange.art/series/The%20Rap%20Pack/nfts"
                          target="_blank"
                          rel="noreferrer"
                          className="!bg-white !text-neutral-800">
                          Buy on Exchange Art
                        </Button>
                      </div>
                    </div>
                    <div
                      className="flex gap-6 p-6 rounded-lg text-neutral-800"
                      style={{ backgroundColor: theme.primaryColor }}>
                      <div className="space-y-3">
                        <h3 className="text-2xl uppercase">
                          Join Us On Discord
                        </h3>
                        <p className="pr-10 font-sans">
                          Keep up to date with the latest methods of gaining
                          access to the LILY Whitelist. There are not that many.
                        </p>
                        <Button
                          href="https://discord.gg/vs8VvHb35k"
                          target="_blank"
                          rel="noreferrer"
                          className="!bg-white !text-neutral-800">
                          Join the Gang
                        </Button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default Eligibility
