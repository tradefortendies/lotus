import React, { useMemo, createContext } from 'react'
import type { AppProps } from 'next/app'
import Theme from '../components/Theme'

import '../styles/globals.css'
import '../styles/fonts.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Theme>
      <Component {...pageProps} />
    </Theme>
  )
}

export default MyApp
