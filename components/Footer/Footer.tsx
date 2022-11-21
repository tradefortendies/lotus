import { useEffect, useContext } from 'react'
import Link from 'next/link'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import { ThemeContext } from '../Theme'

const navLinks = [
  {
    text: 'Library',
    href: 'https://lotusgang.notion.site/Lotus-Library-e7df20a3dc4f45869e8adb24aa75fda2',
  },
  {
    text: 'Lotus Gang',
    href: 'https://magiceden.io/marketplace/lotus_gang_nft',
  },
  {
    text: 'LILY',
    href: 'https://magiceden.io/marketplace/lily',
  },
  {
    text: 'Our Vision',
    href: '/vision',
  },
  {
    text: 'Our Team',
    href: '/team',
  },
  {
    text: 'FAQs',
    href: '/faq',
  },
  {
    text: 'Twitter',
    href: 'https://twitter.com/THELILYNFT',
  },
  {
    text: 'Discord',
    href: 'https://discord.gg/vs8VvHb35k',
  },
]

function Footer({ isLoading = false }: { isLoading?: boolean }) {
  const theme = useContext(ThemeContext)

  useEffect(() => {
    if (isLoading) {
      return
    }

    gsap.registerPlugin(ScrollTrigger)

    setTimeout(() => {
      gsap.to('#footer-lily path', {
        scrollTrigger: {
          trigger: '#footer',
          start: 'top 100%',
          toggleActions: 'restart none none reverse',
        },
        duration: 0.75,
        y: 0,
        stagger: 0.1,
      })

      gsap.to('#footer-list li', {
        scrollTrigger: {
          trigger: '#footer',
          start: 'top 100%',
          toggleActions: 'restart none none reverse',
        },
        duration: 0.75,
        opacity: 1,
        stagger: 0.1,
      })
    }, 1000)
  }, [isLoading])

  return (
    <footer
      id="footer"
      className="w-full px-8 py-8 z-[9999] relative"
      style={{ backgroundColor: theme.primaryColor }}
    >
      <nav className="hidden w-full mb-8 lg:block">
        <ul id="footer-list" className="flex justify-between w-full">
          {navLinks.map((navLink, index) => {
            return (
              <li key={index} className="opacity-0">
                <Link href={navLink.href} passHref>
                  <a>{navLink.text}</a>
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>
      <div className="flex justify-center">
        <svg
          id="footer-lily"
          viewBox="0 0 1619 220"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full"
        >
          <path
            d="M66.6 215H114.3V49.6998H180.9V4.9998H0V49.6998H66.6V215Z"
            fill="#222222"
            className="translate-y-[600px]"
          />
          <path
            d="M339.026 215H386.726V4.9998H339.026V85.6998H256.826V4.9998H209.126V215H256.826V130.4H339.026V215Z"
            fill="#222222"
            className="translate-y-[600px]"
          />
          <path
            d="M431.055 215H572.355V174.5H478.455V128.6H560.955V88.6998H478.455V45.1998H569.055V4.9998H431.055V215Z"
            fill="#222222"
            className="translate-y-[600px]"
          />
          <path
            d="M671.595 215H811.095V170.3H719.295V4.9998H671.595V215Z"
            fill="#222222"
            className="translate-y-[600px]"
          />
          <path
            d="M925.741 219.2C991.441 219.2 1037.94 174.2 1037.94 110C1037.94 45.7998 991.441 0.799805 925.741 0.799805C860.041 0.799805 813.841 45.7998 813.841 110C813.841 174.2 860.041 219.2 925.741 219.2ZM862.441 110C862.441 72.1998 888.541 46.0998 925.741 46.0998C963.241 46.0998 989.041 72.1998 989.041 110C989.041 147.8 963.241 173.9 925.741 173.9C888.541 173.9 862.441 147.8 862.441 110Z"
            fill="#222222"
            className="translate-y-[600px]"
          />
          <path
            d="M1108.72 215H1156.43V49.6998H1223.03V4.9998H1042.12V49.6998H1108.72V215Z"
            fill="#222222"
            className="translate-y-[600px]"
          />
          <path
            d="M1337.05 219.2C1391.65 219.2 1424.95 185 1424.95 128.6V4.9998H1377.25V125.3C1377.25 157.4 1363.75 173.9 1337.05 173.9C1310.35 173.9 1296.85 157.4 1296.85 125.3V4.9998H1249.15V128.6C1249.15 185 1282.45 219.2 1337.05 219.2Z"
            fill="#222222"
            className="translate-y-[600px]"
          />
          <path
            d="M1538.47 219.2C1588.27 219.2 1618.87 195.5 1618.87 155.9C1618.87 122.6 1596.97 102.8 1544.77 90.4998C1512.67 82.9998 1501.57 74.8998 1501.57 61.9998C1501.57 48.1998 1513.87 39.7998 1533.97 39.7998C1555.87 39.7998 1569.07 51.1998 1569.07 70.0998H1614.97C1614.97 27.7998 1583.17 0.799805 1533.37 0.799805C1485.07 0.799805 1455.07 24.4998 1455.07 62.8998C1455.07 97.0998 1478.17 117.5 1527.37 128C1557.07 134.3 1570.57 143 1570.57 157.7C1570.57 171.8 1557.97 179.9 1538.17 179.9C1515.07 179.9 1500.07 168.2 1500.07 148.1H1453.27C1453.27 191.6 1485.67 219.2 1538.47 219.2Z"
            fill="#222222"
            className="translate-y-[600px]"
          />
        </svg>
      </div>
    </footer>
  )
}

export default Footer
