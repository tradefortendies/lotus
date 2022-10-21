import React, { useMemo, createContext } from 'react'
import type { AppProps } from 'next/app'
import {
  ConnectionProvider,
  WalletProvider,
} from '@solana/wallet-adapter-react'
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base'
import {
  SolflareWalletAdapter,
  PhantomWalletAdapter,
  LedgerWalletAdapter,
  SolletWalletAdapter,
  TorusWalletAdapter,
  GlowWalletAdapter,
} from '@solana/wallet-adapter-wallets'
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui'
import { clusterApiUrl } from '@solana/web3.js'
import Theme from '../components/Theme'

import '@solana/wallet-adapter-react-ui/styles.css'
import '../styles/globals.css'
import '../styles/fonts.css'

function MyApp({ Component, pageProps }: AppProps) {
  // The network can be set to 'devnet', 'testnet', or 'mainnet-beta'.
  const network = WalletAdapterNetwork.Devnet

  // You can also provide a custom RPC endpoint.
  const endpoint = useMemo(() => clusterApiUrl(network), [network])

  const wallets = useMemo(
    () => [
      /**
       * Select the wallets you wish to support, by instantiating wallet adapters here.
       *
       * Common adapters can be found in the npm package `@solana/wallet-adapter-wallets`.
       * That package supports tree shaking and lazy loading -- only the wallets you import
       * will be compiled into your application, and only the dependencies of wallets that
       * your users connect to will be loaded.
       */
      new SolflareWalletAdapter(),
      new PhantomWalletAdapter(),
      new LedgerWalletAdapter(),
      new SolletWalletAdapter(),
      new TorusWalletAdapter(),
      new GlowWalletAdapter(),
    ],
    []
  )

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          <Theme>
            <Component {...pageProps} />
          </Theme>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  )
}

export default MyApp
