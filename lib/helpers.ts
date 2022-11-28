export const randomColor = (): string => {
  const colors: string[] = [
    '#61FEFF',
    '#91B9FF',
    '#FF9596',
    '#FFD462',
    '#7FFFB9',
  ]

  return colors[Math.floor(Math.random() * colors.length)]
}

export const formatAddress = (address: string): string =>
  `${address.substring(0, 4)}...${address.substring(
    address.length - 4,
    address.length
  )}`

export const titleCase = (str: string): string => {
  const title: string[] = str.toLowerCase().split(' ')

  const formattedTitle: string = title
    .map((word) => {
      return word[0].toUpperCase() + word.slice(1)
    })
    .join(' ')

  return formattedTitle
}

export const cdnAsset = (col: string, add: string, size: 'large' | 'thumb') => {
  return `https://lotusgang-assets.sfo3.cdn.digitaloceanspaces.com/collections/${col}/${size}/${add}.jpg`
}

export const splitNftName = (name: string): string[] => {
  const nameParts: string[] = name.split(' ')
  return [
    nameParts.slice(0, nameParts.length - 1).join(' '),
    nameParts[nameParts.length - 1],
  ]
}
