import { useContext, useEffect } from 'react'
import { Fade } from 'react-awesome-reveal'
import { Connection, PublicKey, LAMPORTS_PER_SOL } from '@solana/web3.js'
import { programs } from '@metaplex/js'
import { ThemeContext } from '../Theme'
import { Panel } from './Panel'

const connection = new Connection(String(process.env.NEXT_PUBLIC_RPC_ENDPOINT))
const lilyPubKey = new PublicKey('3NoPerEGS1JpPA6FGYpPfKJ8QUkBjYPngST2pwpQt7ED')
const {
  metadata: { Metadata },
} = programs

export const Community = () => {
  const theme = useContext(ThemeContext)

  const timer = (ms: number) => new Promise((res) => setTimeout(res, ms))

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
    const signatures = await connection.getSignaturesForAddress(lilyPubKey, {})
    const recentSales: {
      date: string
      price: number
      signature: string
      name: string
      image: string
    }[] = []

    if (!signatures.length) {
      return
    }

    while (recentSales.length < 5) {
      await timer(200 * index)
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
        return false
      }

      const dateString = new Date(txn?.blockTime * 1000).toLocaleString()
      const price =
        Math.abs(txn?.meta?.preBalances[0] - txn.meta.postBalances[0]) /
        LAMPORTS_PER_SOL
      const accounts = txn.transaction.message.staticAccountKeys
      if (!accounts) {
        return
      }
      const account = accounts[accounts.length - 1]
      const marketplaceAccount = account?.toString() || ''

      if (
        marketplaceAccount === '1BWutmTvYPwDtmw9abTkS4Ssr8no61spGAvW1X6NDix'
      ) {
        const metadata = await getMetadata(txn.meta.postTokenBalances[0].mint)
        if (!metadata) {
          console.log("couldn't get metadata")
          return
        }

        recentSales.push({
          date: dateString,
          price,
          signature,
          name: metadata.name,
          image: metadata.image,
        })
      }

      index++
    }

    console.log(recentSales)
  }

  useEffect(() => {
    fetchRecentSales()
  }, [])

  return (
    <Panel floating={true}>
      <div className="flex flex-col items-center w-full gap-8 px-8 py-16 mx-auto md:flex-row max-w-screen-lily-container">
        <div className="w-1/2">
          <Fade
            cascade={true}
            duration={500}
            delay={200}
            damping={0.35}
            fraction={0}
          >
            <h2 className="text-6xl font-bold text-left">Community</h2>
            <p className="pr-16 mt-12 text-3xl text-center md:text-left">
              We have holders in 65 countries and we are growing every day.
            </p>
          </Fade>

          <Fade cascade={true} duration={500} delay={400} fraction={0}>
            <h3 className="mt-16 mb-4 text-3xl font-bold">Recent Sales</h3>
          </Fade>
          <section className="flex flex-col gap-2">
            <Fade
              cascade={true}
              duration={500}
              delay={600}
              damping={0.35}
              fraction={0}
            >
              <article>
                <a
                  className="max-w-[450px] flex items-center justify-start p-4 text-white rounded-xl bg-lily-black"
                  href="#"
                >
                  <img
                    className="w-20 rounded-xl"
                    src="https://lotusgang-assets.sfo3.cdn.digitaloceanspaces.com/collections%2Flotus-gang%2Fwebp%2F13QK2paaxsZJCmWGX7wctZ81dsquywTkD62b3T8FpPtP.webp"
                  />
                  <div className="ml-4">
                    <h3 className="text-xl font-bold">Lotus Lady #644</h3>
                    <p>8.39 SOL</p>
                  </div>
                  <img className="ml-auto" src="/img/arrow-icon.svg" />
                </a>
              </article>
              <article>
                <a
                  className="max-w-[450px] flex items-center justify-start p-4 text-white rounded-xl bg-lily-black"
                  href="#"
                >
                  <img
                    className="w-20 rounded-xl"
                    src="https://lotusgang-assets.sfo3.cdn.digitaloceanspaces.com/collections%2Flotus-gang%2Fwebp%2F13QK2paaxsZJCmWGX7wctZ81dsquywTkD62b3T8FpPtP.webp"
                  />
                  <div className="ml-4">
                    <h3 className="text-xl font-bold">Lotus Lady #644</h3>
                    <p>8.39 SOL</p>
                  </div>
                  <img className="ml-auto" src="/img/arrow-icon.svg" />
                </a>
              </article>
              <article>
                <a
                  className="max-w-[450px] flex items-center justify-start p-4 text-white rounded-xl bg-lily-black"
                  href="#"
                >
                  <img
                    className="w-20 rounded-xl"
                    src="https://lotusgang-assets.sfo3.cdn.digitaloceanspaces.com/collections%2Flotus-gang%2Fwebp%2F13QK2paaxsZJCmWGX7wctZ81dsquywTkD62b3T8FpPtP.webp"
                  />
                  <div className="ml-4">
                    <h3 className="text-xl font-bold">Lotus Lady #644</h3>
                    <p>8.39 SOL</p>
                  </div>
                  <img className="ml-auto" src="/img/arrow-icon.svg" />
                </a>
              </article>
            </Fade>
          </section>
        </div>
        <div className="w-1/2">
          <Fade duration={500} delay={1200} fraction={0}>
            <div
              className="gap-4 px-4 py-8 mx-auto text-center max-w-[512px] rounded-xl"
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
