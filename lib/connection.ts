import { Connection } from '@solana/web3.js'

if (!process.env.NEXT_PUBLIC_RPC_ENDPOINT) {
  throw new Error('Connectionn env var not set')
}

export const connection = new Connection(process.env.NEXT_PUBLIC_RPC_ENDPOINT)
