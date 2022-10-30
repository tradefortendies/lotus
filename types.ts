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
