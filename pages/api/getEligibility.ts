import type { NextApiRequest, NextApiResponse } from 'next'
import { PublicKey } from '@solana/web3.js'
import { Metaplex } from '@metaplex-foundation/js'
import { connection } from '../../lib/connection'
import WalletWhitelist from '../../data/whitelist.json'

const getEligibility = async (req: NextApiRequest, res: NextApiResponse) => {
  if (!req.query.address) {
    return res.json({
      error: 'Please specify a public key',
    })
  }

  const address = String(req.query.address)

  try {
    const metaplex = new Metaplex(connection)

    const ownedNfts: any = await metaplex.nfts().findAllByOwner({
      owner: new PublicKey(address),
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

    const walletWhitelist = WalletWhitelist.wallets.includes(address)

    res.json({
      whitelist: walletWhitelist,
      lotusGang: lotusNfts.length,
      rapPack: rapPackNfts.length,
      eligible: walletWhitelist || lotusNfts.length + rapPackNfts.length > 0,
      mintCount:
        (walletWhitelist ? 1 : 0) + (lotusNfts.length + rapPackNfts.length * 8),
    })
  } catch (e: any) {
    res.json({
      error: e.toString(),
    })
  }
}

export default getEligibility
