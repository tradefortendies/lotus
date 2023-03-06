import type { NextApiRequest, NextApiResponse } from 'next'

const collectionStats = async (req: NextApiRequest, res: NextApiResponse) => {
  if (!req.query.symbol) {
    return res.json({
      error: 'Please specify a collection symbol',
    })
  }

  const collectionStatsReq = await fetch(
    `https://api-mainnet.magiceden.dev/v2/collections/${req.query.symbol}/stats`
  ).then((res) => res.json())

  res.json(collectionStatsReq)
}

export default collectionStats
