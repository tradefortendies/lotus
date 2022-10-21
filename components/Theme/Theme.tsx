import { createContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { randomColor } from '../../lib/helpers'

export const ThemeContext = createContext({ primaryColor: '#303030' })

function Theme({ children }: { children: JSX.Element }) {
  const router = useRouter()
  const [primaryColor, setPrimaryColor] = useState('')

  useEffect(() => {
    setPrimaryColor(randomColor())
  }, [router.asPath])

  return (
    <ThemeContext.Provider value={{ primaryColor }}>
      {children}
    </ThemeContext.Provider>
  )
}

export default Theme
