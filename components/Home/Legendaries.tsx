import type { LegendaryType, LegendaryWithOwnerType } from '../../types'
import { useContext, useState, useEffect } from 'react'
import { Connection, PublicKey, ParsedAccountData } from '@solana/web3.js'
import { Fade } from 'react-awesome-reveal'
import { formatAddress } from '../../lib/helpers'
import { Panel } from './Panel'
import { ThemeContext } from '../Theme'
import legendariesData from '../../data/legendaries.json'

const connection = new Connection(String(process.env.NEXT_PUBLIC_RPC_ENDPOINT))

const legendaries: LegendaryType[] = legendariesData.legendaries

export const Legendaries = () => {
  const theme = useContext(ThemeContext)
  const [legendariesData, setLegendariesData] = useState<
    LegendaryWithOwnerType[]
  >([])

  const getLegendariesData = async () => {
    const legendariesDataWithOwners = await Promise.all(
      legendaries.map(async (item: LegendaryType) => {
        const updatedItem: LegendaryWithOwnerType = { ...item }
        const largestAccounts = await connection.getTokenLargestAccounts(
          new PublicKey(item.address)
        )
        const largestAccountInfo = await connection.getParsedAccountInfo(
          largestAccounts.value[0].address
        )
        const data = largestAccountInfo?.value?.data as ParsedAccountData

        return {
          ...updatedItem,
          owner: data.parsed.info.owner,
        }
      })
    )

    setLegendariesData(legendariesDataWithOwners)
  }

  useEffect(() => {
    setLegendariesData(legendaries)
    getLegendariesData()
  }, [])

  return (
    <Panel floating={true}>
      <div className="w-full h-full px-8 py-4 mx-auto max-w-screen-lily-container">
        <Fade duration={500} delay={200} fraction={0}>
          <h2 className="mt-8 text-4xl font-medium lg:mt-16 lg:text-5xl">
            The Legendaries
          </h2>
        </Fade>
        <div className="flex items-center justify-between h-full my-16">
          <div className="grid grid-cols-2 gap-8 xl:gap-16 md:grid-cols-3 lg:grid-cols-5">
            <Fade
              cascade={true}
              duration={500}
              delay={400}
              damping={0.35}
              fraction={0}
            >
              {legendariesData.map((item, index) => (
                <div key={index} className="flex flex-col items-center gap-1">
                  <h3 className="text-lg font-bold">{item.name}</h3>
                  <a href={item.url} target="_blank" rel="noreferrer">
                    <img
                      className="transition-transform rounded-lg hover:scale-105"
                      src={item.image}
                    />
                  </a>
                  <div className="mt-2">
                    {item.owner && (
                      <p className="text-sm font-semibold">
                        <a
                          href={`https://solscan.io/account/${item.owner}`}
                          target="_blank"
                          rel="noreferrer"
                        >
                          {formatAddress(item.owner)}
                        </a>
                      </p>
                    )}
                    {item.domainName && (
                      <p className="text-sm font-semibold">{item.domainName}</p>
                    )}
                    {!item.owner && (
                      <svg
                        width="25"
                        viewBox="0 0 120 30"
                        xmlns="http://www.w3.org/2000/svg"
                        fill={theme.primaryColor}
                      >
                        <circle cx="15" cy="15" r="15">
                          <animate
                            attributeName="r"
                            from="15"
                            to="15"
                            begin="0s"
                            dur="0.8s"
                            values="15;9;15"
                            calcMode="linear"
                            repeatCount="indefinite"
                          />
                          <animate
                            attributeName="fill-opacity"
                            from="1"
                            to="1"
                            begin="0s"
                            dur="0.8s"
                            values="1;.5;1"
                            calcMode="linear"
                            repeatCount="indefinite"
                          />
                        </circle>
                        <circle cx="60" cy="15" r="9" fillOpacity="0.3">
                          <animate
                            attributeName="r"
                            from="9"
                            to="9"
                            begin="0s"
                            dur="0.8s"
                            values="9;15;9"
                            calcMode="linear"
                            repeatCount="indefinite"
                          />
                          <animate
                            attributeName="fill-opacity"
                            from="0.5"
                            to="0.5"
                            begin="0s"
                            dur="0.8s"
                            values=".5;1;.5"
                            calcMode="linear"
                            repeatCount="indefinite"
                          />
                        </circle>
                        <circle cx="105" cy="15" r="15">
                          <animate
                            attributeName="r"
                            from="15"
                            to="15"
                            begin="0s"
                            dur="0.8s"
                            values="15;9;15"
                            calcMode="linear"
                            repeatCount="indefinite"
                          />
                          <animate
                            attributeName="fill-opacity"
                            from="1"
                            to="1"
                            begin="0s"
                            dur="0.8s"
                            values="1;.5;1"
                            calcMode="linear"
                            repeatCount="indefinite"
                          />
                        </circle>
                      </svg>
                    )}
                  </div>
                </div>
              ))}
            </Fade>
          </div>
        </div>
      </div>
    </Panel>
  )
}
