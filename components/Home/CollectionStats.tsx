import { useContext } from 'react'
import { LAMPORTS_PER_SOL } from '@solana/web3.js'
import millify from 'millify'
import { Fade } from 'react-awesome-reveal'
import { ThemeContext } from '../Theme'

export type CollectionStatType = {
  symbol: string
  floorPrice: number
  listedCount: number
  avgPrice24hr: number
  volumeAll: number
  supply: number
}

type CollectionStatsPropsType = {
  collectionData: CollectionStatType | undefined
  duration?: number
  delay?: number
  damping?: number
  fraction?: number
}

export const CollectionStats = ({
  collectionData,
  duration = 500,
  delay = 0,
  damping = 0.25,
  fraction = 0,
}: CollectionStatsPropsType) => {
  const theme = useContext(ThemeContext)
  return (
    <Fade
      cascade={true}
      duration={duration}
      delay={delay}
      damping={damping}
      fraction={fraction}
    >
      <div
        className="p-2 rounded-md"
        style={{ backgroundColor: theme.primaryColor }}
      >
        <dl className="flex items-center justify-between w-full">
          <dt className="font-medium uppercase">Floor</dt>
          <dd>
            {collectionData?.floorPrice &&
              collectionData?.floorPrice / LAMPORTS_PER_SOL}
            {!collectionData?.floorPrice && (
              <img src="/img/loading-dots.svg" width={30} />
            )}
          </dd>
        </dl>
      </div>
      <div
        className="p-2 rounded-md"
        style={{ backgroundColor: theme.primaryColor }}
      >
        <dl className="flex items-center justify-between w-full">
          <dt className="font-medium uppercase">Supply</dt>
          <dd>
            {collectionData?.supply &&
              new Intl.NumberFormat('en-US').format(collectionData?.supply)}
            {!collectionData?.supply && (
              <img src="/img/loading-dots.svg" width={30} />
            )}
          </dd>
        </dl>
      </div>
      <div
        className="p-2 rounded-md"
        style={{ backgroundColor: theme.primaryColor }}
      >
        <dl className="flex items-center justify-between w-full">
          <dt className="font-medium uppercase">Vol</dt>
          <dd>
            {collectionData?.volumeAll &&
              millify(collectionData?.volumeAll / LAMPORTS_PER_SOL)}
            {!collectionData?.volumeAll && (
              <img src="/img/loading-dots.svg" width={30} />
            )}
          </dd>
        </dl>
      </div>
      <div
        className="p-2 rounded-md"
        style={{ backgroundColor: theme.primaryColor }}
      >
        <dl className="flex items-center justify-between w-full">
          <dt className="font-medium uppercase">Listed</dt>
          <dd>
            {collectionData?.listedCount && collectionData?.listedCount}
            {!collectionData?.listedCount && (
              <img src="/img/loading-dots.svg" width={30} />
            )}
          </dd>
        </dl>
      </div>
    </Fade>
  )
}
