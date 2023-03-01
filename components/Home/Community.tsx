import type { Sale } from '../../types'
import { useContext, useEffect, useState } from 'react'
import { Fade } from 'react-awesome-reveal'
import { Connection, PublicKey, LAMPORTS_PER_SOL } from '@solana/web3.js'
import { programs } from '@metaplex/js'
import { ThemeContext } from '../Theme'
import { Panel } from './Panel'

const connection = new Connection(String(process.env.NEXT_PUBLIC_RPC_ENDPOINT))
const lilyPubKey = new PublicKey('3NoPerEGS1JpPA6FGYpPfKJ8QUkBjYPngST2pwpQt7ED')
const lotusPubKey = new PublicKey(
  '3n1mz8MyqpQwgX9E8CNPPZtAdJa3aLpuCSMbPumM9wzZ'
)
const {
  metadata: { Metadata },
} = programs

export const Community = () => {
  const theme = useContext(ThemeContext)
  const [recentSalesAnimating, setRecentSalesAnimating] = useState(false)
  const [recentSales, setRecentSales] = useState<Sale[]>([])

  const timer = (ms: number) => new Promise((res) => setTimeout(res, ms))
  let salesInterval = setInterval(() => {}, 0)

  const getMetadata = async (tokenPubKey: string) => {
    try {
      const addr = await Metadata.getPDA(tokenPubKey)
      const resp = await Metadata.load(connection, addr)
      const dataReq = await fetch(resp.data.data.uri).then((res) => res.json())

      return dataReq
    } catch (error) {
      console.log('error fetching metadata: ', error)
    }
  }

  const fetchRecentSales = async () => {
    let index = 0
    const lilySigs = await connection.getConfirmedSignaturesForAddress2(
      lilyPubKey,
      {},
      'confirmed'
    )
    const lotusSigs = await connection.getConfirmedSignaturesForAddress2(
      lotusPubKey,
      {},
      'confirmed'
    )
    const signatures = [...lilySigs, ...lotusSigs]

    signatures.sort((a, b) =>
      Number(a.blockTime) < Number(b.blockTime) ? 1 : -1
    )

    const sales: Sale[] = []

    if (!signatures.length) {
      return
    }

    while (sales.length < 3) {
      console.log('fetching', index)
      await timer(100)
      const { signature } = signatures[index]
      const txn = await connection.getTransaction(signature, {
        maxSupportedTransactionVersion: 0,
      })
      if (
        !txn ||
        !txn.meta ||
        !txn.meta.postTokenBalances?.length ||
        !txn.blockTime
      ) {
        console.log('disallowed')
        index++
        continue
      }

      const dateString = new Date(txn?.blockTime * 1000).toLocaleString()
      const price =
        Math.abs(txn?.meta?.preBalances[0] - txn.meta.postBalances[0]) /
        LAMPORTS_PER_SOL
      const accounts = txn.transaction.message.staticAccountKeys
      if (!accounts || price < 1) {
        index++
        continue
      }
      const account = accounts[accounts.length - 1]
      const marketplaceAccount = account?.toString() || ''

      if (
        marketplaceAccount === '1BWutmTvYPwDtmw9abTkS4Ssr8no61spGAvW1X6NDix' ||
        marketplaceAccount === 'MEisE1HzehtrDpAAT8PnLHjpSSkRYakotTuJRPjTpo8'
      ) {
        const metadata = await getMetadata(txn.meta.postTokenBalances[0].mint)
        if (!metadata) {
          console.log("couldn't get metadata")
          index++
          continue
        }

        sales.push({
          date: dateString,
          price,
          signature,
          collection:
            metadata.collection.name === 'Lotus Gang' ? 'lotus-gang' : 'lily',
          name: metadata.name,
          image: metadata.image,
          address: txn.meta.postTokenBalances[0].mint,
        })
      }

      index++
    }

    setRecentSales(sales)
  }

  const animateSales = (inView: boolean) => {
    if (recentSalesAnimating || !inView) {
      return
    }

    setRecentSalesAnimating(true)

    const salesList = document.querySelectorAll('#sales > article')

    if (!salesList.length) {
      return
    }

    const timerIteration = () => {
      const sale = salesList[counter] as HTMLDivElement
      const inner = sale.querySelector('a')

      if (!sale || !inner) {
        return
      }

      salesList.forEach((sale, index) => {
        const sl = sale as HTMLDivElement
        const inner = sale.querySelector('a')

        if (!inner) {
          return
        }

        if (inner.style.opacity === '1') {
          inner.style.opacity = String(0.25 / index)
        }
      })

      sale.style.display = 'block'
      setTimeout(() => (inner.style.opacity = '1'), 200)

      if (counter === 0) {
        clearInterval(salesInterval)
        return
      }

      counter--
    }

    let counter = salesList.length - 1

    salesInterval = setInterval(timerIteration, 5000)
    timerIteration()
  }

  useEffect(() => {
    fetchRecentSales()
  }, [])

  return (
    <Panel floating={true}>
      <div className="flex flex-col items-center w-full gap-8 px-8 py-16 mx-auto lg:flex-row max-w-screen-lily-container">
        <div className="lg:w-1/2">
          <Fade
            cascade={true}
            duration={500}
            delay={200}
            damping={0.35}
            fraction={0}
          >
            <h2 className="text-5xl font-medium text-center lg:text-left lg:text-6xl">
              Community
            </h2>
            <p className="mt-12 text-2xl text-center lg:pr-16 lg:text-3xl lg:text-left">
              We have holders in 65 countries and we are growing every day.
            </p>
          </Fade>

          {recentSales.length > 0 && (
            <>
              <Fade
                cascade={true}
                duration={500}
                delay={400}
                fraction={0}
                onVisibilityChange={(inView) => animateSales(inView)}
              >
                <h3 className="mt-16 mb-4 text-3xl font-bold text-center lg:text-left">
                  Recent Sales
                </h3>
              </Fade>
              <section className="flex flex-col items-center gap-2" id="sales">
                {recentSales.map((item, index) => (
                  <article key={index} className="hidden w-full">
                    <a
                      className="w-full mx-auto lg:mx-0 max-w-[450px] transition-opacity duration-500 flex items-center opacity-0 hover:!opacity-100 justify-start p-4 text-white rounded-xl bg-lily-black"
                      href={`https://solscan.io/tx/${item.signature}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <img
                        className="w-20 rounded-xl"
                        src={`https://lotusgang-assets.sfo3.cdn.digitaloceanspaces.com/collections%2F${item.collection}%2Fwebp%2F${item.address}.webp`}
                      />
                      <div className="ml-4">
                        <h3 className="text-xl font-bold">{item.name}</h3>
                        <p>{item.price.toFixed(2)} SOL</p>
                      </div>
                      <img className="ml-auto" src="/img/arrow-icon.svg" />
                    </a>
                  </article>
                ))}
              </section>
            </>
          )}
        </div>
        <div className="w-full h-full mt-8 lg:mt-0 lg:w-1/2">
          <Fade duration={500} delay={1200} fraction={0} className="h-full">
            <div
              className="group relative gap-4 px-4 h-full flex flex-col items-center justify-center mx-auto text-center max-w-[512px] rounded-xl"
              style={{ background: theme.primaryColor }}
            >
              <h3 className="z-20 text-4xl font-bold text-white transition-opacity duration-700 opacity-100 translate-y-14 lg:translate-y-8 group-hover:opacity-0">
                Spotlight
              </h3>
              <div className="z-20 flex flex-col items-center justify-center gap-4 transition-opacity duration-700 opacity-0 -translate-y-7 lg:-translate-y-16 group-hover:opacity-100">
                <svg
                  width="50"
                  height="50"
                  viewBox="0 0 70 70"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_1968_3493)">
                    <path
                      d="M56.2499 27.4038H54.0864V19.4712C54.0864 14.3071 52.035 9.35452 48.3835 5.70297C44.7319 2.05142 39.7793 0 34.6153 0C29.4512 0 24.4986 2.05142 20.8471 5.70297C17.1955 9.35452 15.1441 14.3071 15.1441 19.4712V27.4038H12.9807C11.4506 27.4038 9.98313 28.0117 8.90119 29.0936C7.81925 30.1756 7.21143 31.643 7.21143 33.1731V63.4615C7.21143 64.9916 7.81925 66.4591 8.90119 67.541C9.98313 68.6229 11.4506 69.2308 12.9807 69.2308H56.2499C57.78 69.2308 59.2474 68.6229 60.3293 67.541C61.4113 66.4591 62.0191 64.9916 62.0191 63.4615V33.1731C62.0191 31.643 61.4113 30.1756 60.3293 29.0936C59.2474 28.0117 57.78 27.4038 56.2499 27.4038ZM28.846 44.7115C28.846 43.1814 29.4539 41.714 30.5358 40.6321C31.6178 39.5501 33.0852 38.9423 34.6153 38.9423C36.1454 38.9423 37.6128 39.5501 38.6947 40.6321C39.7767 41.714 40.3845 43.1814 40.3845 44.7115C40.3784 45.7183 40.109 46.706 39.6029 47.5764C39.0969 48.4469 38.3718 49.1697 37.4999 49.6731V56.25C37.4999 57.015 37.196 57.7488 36.655 58.2897C36.114 58.8307 35.3803 59.1346 34.6153 59.1346C33.8502 59.1346 33.1165 58.8307 32.5755 58.2897C32.0346 57.7488 31.7307 57.015 31.7307 56.25V49.6731C30.8587 49.1697 30.1337 48.4469 29.6276 47.5764C29.1216 46.706 28.8521 45.7183 28.846 44.7115ZM22.3557 19.4712C22.3557 16.2197 23.6473 13.1014 25.9464 10.8023C28.2455 8.50317 31.3638 7.21154 34.6153 7.21154C37.8667 7.21154 40.985 8.50317 43.2841 10.8023C45.5833 13.1014 46.8749 16.2197 46.8749 19.4712V25.9615C46.8749 26.3441 46.7229 26.7109 46.4524 26.9814C46.182 27.2519 45.8151 27.4038 45.4326 27.4038H23.798C23.4154 27.4038 23.0486 27.2519 22.7781 26.9814C22.5076 26.7109 22.3557 26.3441 22.3557 25.9615V19.4712Z"
                      fill="white"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_1968_3493">
                      <rect width="69.2308" height="69.2308" fill="white" />
                    </clipPath>
                  </defs>
                </svg>

                <h3 className="text-3xl text-white font-base">Coming Soon.</h3>
              </div>
              <div className="absolute top-0 left-0 z-10 w-full h-full transition-opacity duration-700 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 rounded-xl" />
            </div>
          </Fade>
        </div>
      </div>
    </Panel>
  )
}
