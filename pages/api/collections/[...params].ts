/*
 * Filter NFTs from collection
 *
 * Examples
 * /api/collections/lotus-gang
 * /api/collections/lotus-gang?page=2
 * /api/collections/lotus-gang?traits=background:Orange,type:Undead,facial%20hair:Beard
 * /api/collections/lotus-gang?traits=background:Orange|Blue,type:Undead,facial%20hair:Beard
 * /api/collections/lotus-gag/FWDUvozZaQ8WNqYUHPrBDZNGDhwHMKQG8whnrFdoSqHq
 */

import type { NextApiRequest, NextApiResponse } from 'next'
import filter from 'lodash/filter'
import LotusGangNftsJson from '../../../data/lotus-gang.json'
import { Trait, Nft } from '../../../types'

const collections = async (req: NextApiRequest, res: NextApiResponse) => {
  if (!req.query.params || !req.query.params.length) {
    return res.json({
      error: 'Invalid collection',
    })
  }

  const lotusGangNfts = LotusGangNftsJson as { traits: Trait[]; nfts: Nft[] }
  const collection: string = req.query.params[0]
  const address: string = req.query.params[1] ? String(req.query.params[1]) : ''
  const traits: string = req.query.traits ? String(req.query.traits) : ''
  const page: number = req.query.page ? Number(req.query.page) : 0
  const perPage: number = 20

  let filteredNfts: Nft[] = lotusGangNfts.nfts

  if (collection !== 'lotus-gang') {
    return res.json({
      error: 'Invalid collection',
    })
  }

  if (address) {
    filteredNfts = filter(filteredNfts, { address }) as Nft[]
  }

  if (traits) {
    const attrs: string[][] = traits.split(',').map((trait) => trait.split(':'))
    console.log(attrs)

    attrs.map((attr) => {
      filteredNfts = filter(filteredNfts, (o) => {
        const values =
          attr[1].indexOf('|') > -1 ? attr[1].split('|') : [attr[1]]
        return (
          o.attributes.findIndex((item) => {
            return item.trait_type === attr[0] && values.includes(item.value)
          }) > -1
        )
      }) as Nft[]
    })
  }

  res.json({
    total: filteredNfts.length,
    page,
    perPage,
    nfts: filteredNfts.slice(page * perPage, page * perPage + perPage),
  })
}

export default collections
