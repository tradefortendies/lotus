import Link from 'next/link'

const faqs = [
  {
    question: 'What is The Lotus?',
    answer: (
      <div className="space-y-8">
        <p>
          <strong>The Lotus</strong> is a blockchain collective. It is the
          umbrella brand that houses the NFT collections of Lotus Gang and LILY.
        </p>
        <p>
          This is our{' '}
          <Link href="/vision" passHref>
            <a className="font-bold transition border-b-2 border-lily-black hover:border-transparent">
              Vision
            </a>
          </Link>
          .
        </p>
      </div>
    ),
  },
  {
    question: 'What is Lotus Gang?',
    answer: (
      <div className="space-y-8">
        <p>
          The <strong>Lotus Gang</strong> collection contains 2,000 Lads and
          2,000 Ladies in 32x32 pixel art which give you access to our ongoing
          projects and closed community.
        </p>

        <p>
          <strong>Lotus Gang</strong> launched on Solana during October 2021. We
          donated $52,000 USD to United Sikhs to assist with the Farmer&apos;s
          Protest.
        </p>
      </div>
    ),
  },
  {
    question: 'What is LILY?',
    answer: (
      <div className="space-y-8">
        <p>
          LILY is the second collection released by <strong>The Lotus</strong>.
          The entire collection was hand-drawn by{' '}
          <a
            href="https://twitter.com/notbunjil"
            target="_blank"
            rel="noreferrer"
            className="font-bold transition border-b-2 border-lily-black hover:border-transparent"
          >
            Bunjil
          </a>{' '}
          who is the founder and artist behind <strong>The Lotus</strong>.
        </p>

        <p>
          The collection acts as a raise for The Lotus to fund a full team to
          manage our community and build our flagship products:{' '}
          <strong>The LILYPAD</strong> and{' '}
          <a
            href="https://lotusgang.notion.site/Lotus-Library-e7df20a3dc4f45869e8adb24aa75fda2"
            target="_blank"
            rel="noreferrer"
            className="font-bold transition border-b-2 border-lily-black hover:border-transparent"
          >
            The Lotus Library
          </a>
          .
        </p>
      </div>
    ),
  },
  {
    question: 'Why a second collection?',
    answer: (
      <div className="space-y-8">
        <p>
          <strong>The Lotus</strong> began as <strong>Lotus Gang</strong> and
          had a very short roadmap which we completed, iterated on and grew out
          of.
        </p>
        <p>
          We have developed new, ambitious ideas which were not in scope a year
          ago. To make these plans a reality we need additional resources.
        </p>
        <p>
          Over the year, Our community has grown into one of the most vibrant
          and active groups. <strong>LILY</strong> also acts as a reward for
          holders of <strong>Lotus Gang</strong> and{' '}
          <strong>The Rap Pack</strong> who enjoyed the only guaranteed
          whitelisting for mint.
        </p>
      </div>
    ),
  },
  {
    question: 'What is Rap Pack?',
    answer: (
      <div className="space-y-8">
        <p>
          25 pieces depicting artists and musicians in the{' '}
          <strong>Lotus Gang</strong> art style. It is a separate collection of
          customs that were auctioned and available for sale on{' '}
          <a
            href="https://exchange.art/series/The%20Rap%20Pack/nfts"
            target="_blank"
            rel="noreferrer"
            className="font-bold transition border-b-2 border-lily-black hover:border-transparent"
          >
            Exchange Art
          </a>
          .
        </p>

        <p>
          Each Rap Pack acts as a free mint pass for <strong>8x LILIES</strong>{' '}
          which will be airdropped to whichever wallet you hold your{' '}
          <strong>Rap Pack</strong> in.{' '}
        </p>
      </div>
    ),
  },
  {
    question: 'Why should I mint and hold LILY?',
    answer: (
      <div className="space-y-8">
        <p>
          <strong>The Lotus</strong> will be the landing page of Web 3. We
          create experiences, products and services to enrich holders,
          accelerate the industry and delight everyone involved.
        </p>
        <p>
          Minting and holding will give you access to our products and
          experiences, along with time-based holding rewards.
        </p>
        <p>
          We are building the <strong>LILYPAD</strong> and upgrading the{' '}
          <a
            href="https://lotusgang.notion.site/Lotus-Library-e7df20a3dc4f45869e8adb24aa75fda2"
            target="_blank"
            rel="noreferrer"
            className="font-bold transition border-b-2 border-lily-black hover:border-transparent"
          >
            The Lotus Library
          </a>
          .
        </p>
        <p>
          We are developing the agile capability required to leverage the latest
          innovations (such as xNFT&apos;s) to constantly adapt, iterate and
          grow the brand in this industry. We want to drive the value generated
          from this back to our holders.
        </p>
      </div>
    ),
  },
  {
    question: 'Why would I hold Lotus Gang?',
    answer: (
      <div className="space-y-8">
        <p>
          <strong>Lotus Gang</strong> is the genesis collection of 4,000. They
          will always receive access to our experiences, products and services.
          Holding both <strong>Lotus</strong> and <strong>LILY</strong> will
          yield the highest tiers of rewards.
        </p>
      </div>
    ),
  },
  {
    question: 'What did Lotus Gang do since launching?',
    answer: (
      <div className="space-y-8">
        <p>
          The goal of <strong>Lotus Gang</strong> was to build a knowledge
          sharing PFP community, give back to charity and grow together. In line
          with that we:
        </p>
        <ul className="ml-4 space-y-4 list-disc lg:w-4/5">
          <li>
            Built the{' '}
            <a
              href="https://lotusgang.notion.site/Lotus-Library-e7df20a3dc4f45869e8adb24aa75fda2"
              target="_blank"
              rel="noreferrer"
              className="font-bold transition border-b-2 border-lily-black hover:border-transparent"
            >
              The Lotus Library
            </a>
            <ul className="mt-4 ml-4 space-y-4 list-disc lg:w-4/5">
              <li>Free resources and tools</li>
              <li>Glossaries</li>
              <li>Marketing Strategies</li>
              <li>NFT Tracking Tools</li>
              <li>Trading Tracking Tools</li>
            </ul>
          </li>
          <li>
            Built a Robust Alpha and Whitelist opportunity system - one of the
            earliest models (inspired by MonkeDAO) delivering 15k+ SOL in value
            to our small holder base for a fraction of the cost of entry
          </li>
        </ul>
        <p>With our short roadmap essentially fulfilled, we expanded scope:</p>
        <ul className="ml-4 space-y-4 list-disc lg:w-4/5">
          <li>
            Further development of the Gang Discord into a{' '}
            <strong>Hub World</strong> with a full team running multiple alpha
            channels and WL opportunities coming through daily.
          </li>
          <li>Development of 3D/2D Models for Metaverse integration</li>
          <li>
            Partnerships with HoneyDeFi - unlocking liquidity for holders.
          </li>
          <li>
            Development of Silk Road V1 - a competitive single-player browser
            trading game which teaches basic trading ideas.
          </li>
          <li>
            Development of Gang Wars - a dynamic, gamified staking platform
            which was almost fully developed before a strategic pause as market
            conditions were not ideal for launching a token. This is still on
            hold and under review.
          </li>
        </ul>
        <p>
          Ultimately, we built and maintained a robust community which we want
          to take to the next level.
        </p>
      </div>
    ),
  },
  {
    question: 'What is the Lotus Library?',
    answer: (
      <div className="space-y-8">
        <p>
          An incentive-driven catalog for content creators in various
          disciplines to contribute to. Through curated experiences and
          easy-to-digest guides - the{' '}
          <a
            href="https://lotusgang.notion.site/Lotus-Library-e7df20a3dc4f45869e8adb24aa75fda2"
            target="_blank"
            rel="noreferrer"
            className="font-bold transition border-b-2 border-lily-black hover:border-transparent"
          >
            Library
          </a>{' '}
          is positioned to benefit the beginner and the seasoned vet alike.
        </p>
      </div>
    ),
  },
  {
    question: 'What is the LILY Pad?',
    answer: (
      <div className="space-y-8">
        <p>
          A peer-to-peer onboarding solution. With an innovative incentive
          structure for <strong>Lotus Gang</strong> and <strong>LILY</strong>{' '}
          Holders, combined with the{' '}
          <a
            href="https://lotusgang.notion.site/Lotus-Library-e7df20a3dc4f45869e8adb24aa75fda2"
            target="_blank"
            rel="noreferrer"
            className="font-bold transition border-b-2 border-lily-black hover:border-transparent"
          >
            Lotus Library
          </a>
          , we are creating a pathway for users and industry leaders. Our goal
          is to become cashflow positive through these initiatives while
          promoting our community and IP.
        </p>
      </div>
    ),
  },
]

export default faqs
