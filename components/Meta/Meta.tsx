import React from 'react'
import Head from 'next/head'

type Props = {
  title: string
  desc?: string
}

function Meta({ title, desc }: Props) {
  return (
    <Head>
      <title>{title}</title>
      <meta property="og:title" content={title} />
      <meta name="twitter:title" content={title} />
      {desc && (
        <>
          <meta name="description" content={desc} />
          <meta name="og:description" content={desc} />
          <meta name="twitter:description" content={desc} />
        </>
      )}
    </Head>
  )
}

export default Meta
