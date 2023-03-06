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

export type Member = {
  name: string
  position: string
  avatar: string
  bio: string
  twitter: string
}

export interface LegendaryType {
  name: string
  image: string
  address: string
  url: string
}

export interface LegendaryWithOwnerType extends LegendaryType {
  owner?: string
  domainName?: string
}

export type Sale = {
  date: string
  price: number
  signature: string
  name: string
  image: string
  address: string
  collection: 'lily' | 'lotus-gang'
}
