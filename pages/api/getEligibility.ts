import type { NextApiRequest, NextApiResponse } from 'next'
import { PublicKey } from '@solana/web3.js'
import { Metaplex } from '@metaplex-foundation/js'
import { connection } from '../../lib/connection'

const getEligibility = async (req: NextApiRequest, res: NextApiResponse) => {
  if (!req.query.address) {
    return res.json({
      error: 'Please specify a public key',
    })
  }

  try {
    const metaplex = new Metaplex(connection)

    const ownedNfts: any = await metaplex.nfts().findAllByOwner({
      owner: new PublicKey(req.query.address),
    })

    const lotusNfts = ownedNfts.filter(
      (nft: any) =>
        nft.updateAuthorityAddress.toString() ===
        '3n1mz8MyqpQwgX9E8CNPPZtAdJa3aLpuCSMbPumM9wzZ'
    )

    const rapPackNfts = ownedNfts.filter(
      (nft: any) =>
        nft.updateAuthorityAddress.toString() ===
        '4SR9PtoA4vmzT3GpYEPHsuvcD8KQXqdMQ7AHuaBzmfDt'
    )

    res.json({
      lotusGang: lotusNfts.length,
      rapPack: rapPackNfts.length,
      hasWhitelist: lotusNfts.length + rapPackNfts.length > 0,
      mintCount: lotusNfts.length + rapPackNfts.length * 8,
    })
  } catch (e: any) {
    res.json({
      error: e.toString(),
    })
  }
}

export default getEligibility
