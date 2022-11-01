export type Trait = {
  trait_type: string
  values: string[]
}

export type Nft = {
  address: string
  name: string
  image: string
  attributes: {
    trait_type: string
    value: string
  }[]
}

export type NftApiResponse = {
  total: number
  page: number
  perPage: number
  nfts: Nft[]
}
