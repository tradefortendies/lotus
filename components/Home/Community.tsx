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
    if (recentSalesAnimating) {
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
        <div className="w-full mt-8 lg:mt-0 lg:w-1/2">
          <Fade duration={500} delay={1200} fraction={0}>
            <div
              className="gap-4 px-4 py-12 mx-auto text-center max-w-[512px] rounded-xl"
              style={{ background: theme.primaryColor }}
            >
              <h3 className="text-2xl font-bold">Spotlight</h3>
              <p className="text-lg">Coming soon...</p>
            </div>
          </Fade>
        </div>
      </div>
    </Panel>
  )
}
