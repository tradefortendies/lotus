import type { NextApiRequest, NextApiResponse } from 'next'
import { connection } from '../../lib/connection'
import { Metaplex } from '@metaplex-foundation/js'
import { PublicKey } from '@solana/web3.js'
import bs58 from 'bs58'

const MAX_NAME_LENGTH = 32
const MAX_URI_LENGTH = 200
const MAX_SYMBOL_LENGTH = 10
const MAX_CREATOR_LEN = 32 + 1 + 1
const MAX_CREATOR_LIMIT = 5
const MAX_DATA_SIZE =
  4 +
  MAX_NAME_LENGTH +
  4 +
  MAX_SYMBOL_LENGTH +
  4 +
  MAX_URI_LENGTH +
  2 +
  1 +
  4 +
  MAX_CREATOR_LIMIT * MAX_CREATOR_LEN
const MAX_METADATA_LEN = 1 + 32 + 32 + MAX_DATA_SIZE + 1 + 1 + 9 + 172
const CREATOR_ARRAY_START =
  1 +
  32 +
  32 +
  4 +
  MAX_NAME_LENGTH +
  4 +
  MAX_URI_LENGTH +
  4 +
  MAX_SYMBOL_LENGTH +
  2 +
  1 +
  4

const TOKEN_METADATA_PROGRAM = new PublicKey(
  'metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s'
)

const metaplex = new Metaplex(connection)

const getMintAddresses = async (firstCreatorAddress: PublicKey) => {
  const metadataAccounts = await connection.getProgramAccounts(
    TOKEN_METADATA_PROGRAM,
    {
      // The mint address is located at byte 33 and lasts for 32 bytes.
      dataSlice: { offset: 33, length: 32 },

      filters: [
        // Only get Metadata accounts.
        { dataSize: MAX_METADATA_LEN },

        // Filter using the first creator.
        {
          memcmp: {
            offset: CREATOR_ARRAY_START,
            bytes: firstCreatorAddress.toBase58(),
          },
        },
      ],
    }
  )

  return metadataAccounts.map((metadataAccountInfo) =>
    bs58.encode(metadataAccountInfo.account.data)
  )
}

const timeOut = (ms: number) => {
  return new Promise((fulfill) => {
    setTimeout(fulfill, ms)
  })
}

const getCollection = async (req: NextApiRequest, res: NextApiResponse) => {
  if (!req.query.candyMachineId) {
    return res.json({
      error: 'No Candy Machine ID specified',
    })
  }
  const candyMachineId = new PublicKey(String(req.query.candyMachineId))
  const mintAddresses = await getMintAddresses(candyMachineId)

  console.log(mintAddresses)

  const nfts = await Promise.all(
    mintAddresses.map(async (mintAddress, index) => {
      await timeOut(50 * index)
      console.log(index, mintAddress)
      const nft = await metaplex
        .nfts()
        .findByMint({ mintAddress: new PublicKey(mintAddress) })
      return nft
    })
  )

  const formatted = nfts.map((item) => {
    return {
      address: item.address,
      name: item?.json?.name,
      attributes: item?.json?.attributes,
      image: item?.json?.image,
    }
  })

  formatted.sort((a, b) => {
    const aId = Number(a?.name?.split('#')[1])
    const bId = Number(b?.name?.split('#')[1])
    return aId > bId ? 1 : -1
  })

  return {
    nfts: formatted,
  }
}

export default getCollection
