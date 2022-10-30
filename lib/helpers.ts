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
