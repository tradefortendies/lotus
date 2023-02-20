import { Fragment, useState, useEffect, useContext } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import clsx from 'clsx'
import { gsap } from 'gsap'
import { HiMenuAlt1 } from 'react-icons/hi'
import { MdClose } from 'react-icons/md'
import { FaTwitter, FaDiscord } from 'react-icons/fa'
import { ThemeContext } from '../Theme'
import Button from '../Button'

type Props = {
  active?: string
  linkColor?: 'black' | 'white'
  button?: 'colored' | 'white'
  fadeInAnimation?: boolean
  slideDownAnimation?: boolean
  colorChangeAnimation?: boolean
  iconHoverColorAnimations?: boolean
  position?: 'fixed' | 'absolute' | 'slide'
}

function Header({
  active,
  button = 'colored',
  linkColor = 'black',
  fadeInAnimation = false,
  slideDownAnimation = false,
  colorChangeAnimation = true,
  position = 'absolute',
}: Props) {
  const router = useRouter()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [reverseColors, setReverseColors] = useState(false)
  const [logoSpinning, setLogoSpinning] = useState(false)
  const theme = useContext(ThemeContext)

  const spinLogo = () => {
    if (logoSpinning) {
      return false
    }

    setLogoSpinning(true)
    setTimeout(() => setLogoSpinning(false), 300)
    document.querySelector('#logo')?.classList.toggle('rotate-[360deg]')
  }

  const useScrollDirection = () => {
    const [scrollDirection, setScrollDirection] = useState('')
    const [prevOffset, setPrevOffset] = useState(0)

    const toggleScrollDirection = () => {
      let scrollY = window.scrollY
      if (scrollY > prevOffset && scrollY > 50) {
        setScrollDirection('down')
      } else if (scrollY < prevOffset && scrollY > 50) {
        setScrollDirection('up')
      } else {
        setScrollDirection('')
      }
      setPrevOffset(scrollY)
    }

    useEffect(() => {
      window.addEventListener('scroll', toggleScrollDirection)
      return () => {
        window.removeEventListener('scroll', toggleScrollDirection)
      }
    })
    return scrollDirection
  }

  const scrollDirection = useScrollDirection()

  useEffect(() => {
    document.addEventListener('scroll', (e) => {
      if (!colorChangeAnimation) {
        return
      }

      const scrollTop = document.documentElement.scrollTop

      if (scrollTop < window.innerHeight) {
        setReverseColors(false)
      } else if (scrollTop > window.innerHeight) {
        setReverseColors(true)
      }
    })

    setTimeout(
      () => {
        if (fadeInAnimation) {
          requestAnimationFrame(() => {
            gsap.to('#header', {
              opacity: 1,
              duration: 1,
              ease: 'power2.out',
            })
          })
        } else if (slideDownAnimation) {
          requestAnimationFrame(() => {
            gsap.to('#header', {
              y: 0,
              duration: 1,
              ease: 'linear',
            })
          })
        }
      },
      router.pathname === '/' ? 3000 : 500
    )
  }, [])

  return (
    <>
      <header
        id="header"
        className={clsx(
          `top-0 z-[9999] bg-white flex items-center w-full px-4 lg:px-8 py-4`,
          linkColor === 'black' && 'text-neutral-900',
          linkColor === 'white' && 'text-white',
          fadeInAnimation && 'opacity-0',
          slideDownAnimation && '-translate-y-[180px]',
          position !== 'slide' && position,
          position === 'slide' && 'slide',
          position === 'fixed' && 'bg-opacity-75',
          `scroll-${scrollDirection}`
        )}
      >
        <Link href="/" passHref>
          <a className="flex items-center">
            <svg
              viewBox="0 0 730 183"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              id="logo"
              onMouseOver={spinLogo}
              onMouseOut={spinLogo}
              className={clsx(
                'w-32 transition-transform duration-1000',
                linkColor !== 'white' && 'fill-black',
                linkColor === 'white' && 'fill-white'
              )}
            >
              <path d="M1.57952e-06 3.99999H39.75V158.75L22.75 141.75H116.25V179H1.57952e-06V3.99999ZM196.789 182.5C178.789 182.5 162.706 178.667 148.539 171C134.372 163.167 123.289 152.333 115.289 138.5C107.456 124.667 103.539 109 103.539 91.5C103.539 73.8333 107.456 58.1667 115.289 44.5C123.289 30.6667 134.372 19.9167 148.539 12.25C162.706 4.41665 178.789 0.499988 196.789 0.499988C214.956 0.499988 231.039 4.41665 245.039 12.25C259.206 19.9167 270.289 30.6667 278.289 44.5C286.289 58.3333 290.289 74 290.289 91.5C290.289 109.167 286.289 124.917 278.289 138.75C270.289 152.417 259.206 163.167 245.039 171C230.872 178.667 214.789 182.5 196.789 182.5ZM196.789 144.75C207.122 144.75 216.289 142.5 224.289 138C232.289 133.5 238.456 127.25 242.789 119.25C247.289 111.083 249.539 101.833 249.539 91.5C249.539 81.1667 247.289 72 242.789 64C238.456 55.8333 232.289 49.5 224.289 45C216.289 40.5 207.122 38.25 196.789 38.25C186.622 38.25 177.539 40.5 169.539 45C161.539 49.5 155.289 55.8333 150.789 64C146.289 72 144.039 81.1667 144.039 91.5C144.039 101.833 146.289 111.083 150.789 119.25C155.289 127.25 161.539 133.5 169.539 138C177.539 142.5 186.622 144.75 196.789 144.75ZM334.275 18.75H374.025V179H334.275V18.75ZM278.775 3.99999H429.525V41.25H278.775V3.99999ZM509.547 182.5C494.547 182.5 481.464 179.5 470.297 173.5C459.297 167.333 450.88 158.583 445.047 147.25C439.214 135.917 436.297 122.5 436.297 107V3.99999H476.047V104.25C476.047 117.75 478.88 127.917 484.547 134.75C490.214 141.417 498.547 144.75 509.547 144.75C520.714 144.75 529.047 141.417 534.547 134.75C540.214 127.917 543.047 117.75 543.047 104.25V3.99999H582.797V107C582.797 122.5 579.797 135.917 573.797 147.25C567.964 158.583 559.547 167.333 548.547 173.5C537.547 179.5 524.547 182.5 509.547 182.5ZM662.396 182.5C647.896 182.5 635.23 180.083 624.396 175.25C613.73 170.417 605.563 163.583 599.896 154.75C594.23 145.75 591.396 135.25 591.396 123.25H630.396C630.396 131.417 633.23 137.917 638.896 142.75C644.563 147.417 652.313 149.75 662.146 149.75C670.48 149.75 677.063 148.167 681.896 145C686.73 141.667 689.146 137.083 689.146 131.25C689.146 125.25 686.23 120.333 680.396 116.5C674.73 112.5 665.646 109.167 653.146 106.5C639.313 103.5 627.98 99.5833 619.146 94.75C610.313 89.9167 603.73 84 599.396 77C595.063 70 592.896 61.75 592.896 52.25C592.896 41.5833 595.48 32.4167 600.646 24.75C605.98 16.9167 613.563 10.9167 623.396 6.75C633.23 2.58332 644.813 0.499988 658.146 0.499988C671.813 0.499988 683.73 2.91665 693.896 7.74998C704.23 12.4167 712.146 19.0833 717.646 27.75C723.313 36.4167 726.146 46.5833 726.146 58.25H687.896C687.896 50.4167 685.313 44.25 680.146 39.75C674.98 35.25 667.813 33 658.646 33C653.146 33 648.313 33.75 644.146 35.25C640.146 36.5833 637.063 38.6667 634.896 41.5C632.73 44.3333 631.646 47.6667 631.646 51.5C631.646 57 634.313 61.5833 639.646 65.25C644.98 68.9167 654.313 72.25 667.646 75.25C689.48 80.4167 705.23 87.3333 714.896 96C724.563 104.5 729.396 115.75 729.396 129.75C729.396 146.25 723.396 159.167 711.396 168.5C699.563 177.833 683.23 182.5 662.396 182.5Z" />
            </svg>
          </a>
        </Link>
        <ul className="hidden ml-auto font-mono uppercase xl:flex">
          <li
            className={clsx(
              'relative mr-12 cursor-pointer group border-b-2 transition-[border] duration-300 border-transparent',
              linkColor !== 'white' && !reverseColors && 'hover:border-black',
              linkColor === 'white' && 'hover:border-white'
            )}
          >
            Legendaries
            <ul className="absolute top-0 pt-10 text-center -translate-x-1/2 left-1/2 w-[200px] pointer-events-none group-hover:pointer-events-auto">
              <li
                className={clsx(
                  'bg-opacity-90 block transition-opacity duration-300 border-b-2 border-transparent opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto',
                  linkColor !== 'white' && 'bg-white hover:bg-slate-50',
                  linkColor === 'white' && 'bg-lily-black hover:bg-zinc-800'
                )}
              >
                <Link href="/legendaries">
                  <a className="block p-4 cursor-pointer">Gallery</a>
                </Link>
              </li>
              <li
                className={clsx(
                  'bg-opacity-90 block transition-opacity duration-300 border-b-2 border-transparent opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto',
                  linkColor !== 'white' && 'bg-white hover:bg-slate-50',
                  linkColor === 'white' && 'bg-lily-black hover:bg-zinc-800'
                )}
              >
                <a
                  href="https://legendary.thelotus.io"
                  target="_blank"
                  rel="noreferrer"
                  className="block p-4 cursor-pointer"
                >
                  🌱 Planting
                </a>
              </li>
            </ul>
          </li>
          <li
            className={clsx(
              'border-b-2 mr-12 transition-[border] duration-300 border-transparent',
              reverseColors && 'hover:border-white',
              linkColor !== 'white' && !reverseColors && 'hover:border-black',
              linkColor === 'white' && 'hover:border-white'
            )}
          >
            <a
              href="https://lotusgang.notion.site/Lotus-Library-e7df20a3dc4f45869e8adb24aa75fda2"
              target="_blank"
              rel="noreferrer"
            >
              Library
            </a>
          </li>
          <li
            className={clsx(
              'relative mr-12 cursor-pointer group border-b-2 transition-[border] duration-300 border-transparent',
              linkColor !== 'white' && !reverseColors && 'hover:border-black',
              linkColor === 'white' && 'hover:border-white'
            )}
          >
            Tools
            <ul className="absolute top-0 pt-10 text-center -translate-x-1/2 left-1/2 w-[200px] pointer-events-none group-hover:pointer-events-auto">
              <li
                className={clsx(
                  'bg-opacity-90 block transition-opacity duration-300 border-b-2 border-transparent opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto',
                  linkColor !== 'white' && 'bg-white hover:bg-slate-50',
                  linkColor === 'white' && 'bg-lily-black hover:bg-zinc-800'
                )}
              >
                <a
                  href="https://floor.lotusgang.com"
                  target="_blank"
                  rel="noreferrer"
                  className="block p-4 cursor-pointer"
                >
                  Floor Calculator
                </a>
              </li>
              <li
                className={clsx(
                  'bg-opacity-90 block transition-opacity duration-300 border-b-2 border-transparent opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto',
                  linkColor !== 'white' && 'bg-white hover:bg-slate-50',
                  linkColor === 'white' && 'bg-lily-black hover:bg-zinc-800'
                )}
              >
                <Link href="/vibeometer">
                  <a className="block p-4 cursor-pointer">Vibeometer</a>
                </Link>
              </li>
            </ul>
          </li>
          <li
            className={clsx(
              'relative mr-12 cursor-pointer group border-b-2 transition-[border] duration-300 border-transparent',
              linkColor !== 'white' && !reverseColors && 'hover:border-black',
              linkColor === 'white' && 'hover:border-white'
            )}
          >
            Collections
            <ul className="absolute top-0 pt-10 text-center -translate-x-1/2 left-1/2 w-[200px] pointer-events-none group-hover:pointer-events-auto">
              <li
                className={clsx(
                  'bg-opacity-90 block transition-opacity duration-300 border-b-2 border-transparent opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto',
                  linkColor !== 'white' && 'bg-white hover:bg-slate-50',
                  linkColor === 'white' && 'bg-lily-black hover:bg-zinc-800'
                )}
              >
                <Link href="/collections/lily" passHref>
                  <a className="block p-4 cursor-pointer">LILY</a>
                </Link>
              </li>
              <li
                className={clsx(
                  'bg-opacity-90 block transition-opacity duration-300 border-b-2 border-transparent opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto',
                  linkColor !== 'white' && 'bg-white hover:bg-slate-50',
                  linkColor === 'white' && 'bg-lily-black hover:bg-zinc-800'
                )}
              >
                <Link href="/collections/lotus-gang" passHref>
                  <a className="block p-4 cursor-pointer">Lotus Gang</a>
                </Link>
              </li>
              <li
                className={clsx(
                  'bg-opacity-90 block transition-opacity duration-300 border-b-2 border-transparent opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto',
                  linkColor !== 'white' && 'bg-white hover:bg-slate-50',
                  linkColor === 'white' && 'bg-lily-black hover:bg-zinc-800'
                )}
              >
                <a
                  href="https://shop.thelotus.io"
                  target="_blank"
                  rel="noreferrer"
                  className="block p-4 cursor-pointer"
                >
                  Shop
                </a>
              </li>
            </ul>
          </li>
          <li
            className={clsx(
              'relative mr-12 cursor-pointer group border-b-2 transition-[border] duration-300 border-transparent',
              linkColor !== 'white' && !reverseColors && 'hover:border-black',
              linkColor === 'white' && 'hover:border-white'
            )}
          >
            About
            <ul className="absolute top-0 pt-10 text-center -translate-x-1/2 left-1/2 w-[200px] pointer-events-none group-hover:pointer-events-auto">
              <li
                className={clsx(
                  'bg-opacity-90 block transition-opacity duration-300 border-b-2 border-transparent opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto',
                  linkColor !== 'white' && 'bg-white hover:bg-slate-50',
                  linkColor === 'white' && 'bg-lily-black hover:bg-zinc-800'
                )}
              >
                <Link href="/vision" passHref>
                  <a className="block p-4 cursor-pointer">Vision</a>
                </Link>
              </li>
              <li
                className={clsx(
                  'bg-opacity-90 block transition-opacity duration-300 border-b-2 border-transparent opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto',
                  linkColor !== 'white' && 'bg-white hover:bg-slate-50',
                  linkColor === 'white' && 'bg-lily-black hover:bg-zinc-800'
                )}
              >
                <Link href="/blueprint" passHref>
                  <a className="block p-4 cursor-pointer">Blueprint</a>
                </Link>
              </li>
              <li
                className={clsx(
                  'bg-opacity-90 block transition-opacity duration-300 border-b-2 border-transparent opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto',
                  linkColor !== 'white' && 'bg-white hover:bg-slate-50',
                  linkColor === 'white' && 'bg-lily-black hover:bg-zinc-800'
                )}
              >
                <Link href="/team" passHref>
                  <a className="block p-4 cursor-pointer">Our Team</a>
                </Link>
              </li>
              <li
                className={clsx(
                  'bg-opacity-90 block transition-opacity duration-300 border-b-2 border-transparent opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto',
                  linkColor !== 'white' && 'bg-white hover:bg-slate-50',
                  linkColor === 'white' && 'bg-lily-black hover:bg-zinc-800'
                )}
              >
                <Link href="/faq" passHref>
                  <a className="block p-4 cursor-pointer">FAQs</a>
                </Link>
              </li>
            </ul>
          </li>
          <li
            className={clsx(
              'relative cursor-pointer group border-b-2 transition-[border] duration-300 border-transparent',
              linkColor !== 'white' && !reverseColors && 'hover:border-black',
              linkColor === 'white' && 'hover:border-white'
            )}
          >
            Socials
            <ul className="absolute top-0 pt-10 space-y-4 text-xl -translate-x-1/2 left-1/2">
              <li className="transition-opacity duration-300 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto">
                <a
                  href="https://twitter.com/THELILYNFT"
                  target="_blank"
                  rel="noreferrer"
                >
                  <FaTwitter />
                </a>
              </li>
              <li className="transition-opacity duration-300 delay-200 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto">
                <a
                  href="https://discord.gg/vs8VvHb35k"
                  target="_blank"
                  rel="noreferrer"
                >
                  <FaDiscord />
                </a>
              </li>
            </ul>
          </li>
        </ul>
        <Link href="/vision" passHref>
          <a
            className={clsx(
              'hidden xl:flex items-center justify-center gap-1 rounded-full uppercase text-neutral-900 w-[130px] h-[130px] ml-12  transition duration-1000 hover:rotate-[360deg]'
            )}
            style={{
              backgroundColor:
                button === 'white' ? '#ffffff' : theme.primaryColor,
            }}
          >
            Vision
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5.46702 14.583L14.3059 5.74412"
                stroke="#222222"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M14.3059 14.0762V5.74284H5.97257"
                stroke="#222222"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </Link>
        <HiMenuAlt1
          onClick={() => setMobileMenuOpen(true)}
          className={clsx(
            'ml-auto text-4xl cursor-pointer xl:hidden',
            mobileMenuOpen && 'hidden'
          )}
        />
      </header>
      <Transition.Root show={mobileMenuOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-[999999]"
          onClose={setMobileMenuOpen}
        >
          <div className="fixed inset-0" />

          <div className="fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="fixed inset-y-0 right-0 flex max-w-full pl-10 pointer-events-none">
                <Transition.Child
                  as={Fragment}
                  enter="transform transition ease-in-out duration-500 sm:duration-700"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transform transition ease-in-out duration-500 sm:duration-700"
                  leaveFrom="translate-x-0"
                  leaveTo="translate-x-full"
                >
                  <Dialog.Panel className="w-screen max-w-md pointer-events-auto">
                    <div className="flex flex-col h-full py-6 overflow-y-scroll bg-white shadow-xl">
                      <div className="px-4 sm:px-6">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center ml-auto h-7">
                            <button
                              type="button"
                              className="text-gray-400 bg-white rounded-md hover:text-gray-500 focus:outline-none"
                              onClick={() => setMobileMenuOpen(false)}
                            >
                              <span className="sr-only">Close panel</span>
                              <MdClose className="w-6 h-6" aria-hidden="true" />
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="relative flex-1 px-4 mt-6 sm:px-6">
                        <div className="absolute inset-0 flex flex-col items-center px-4 text-center sm:px-6">
                          <ul className="font-mono uppercase">
                            <li className="py-2 transition duration-300">
                              <Link href="/legendaries" passHref>
                                <a>Legendaries</a>
                              </Link>
                            </li>
                            <li className="py-2 transition duration-300">
                              <a
                                href="https://lotusgang.notion.site/Lotus-Library-e7df20a3dc4f45869e8adb24aa75fda2"
                                target="_blank"
                                rel="noreferrer"
                              >
                                Library
                              </a>
                            </li>
                            <li className="py-2 transition duration-300">
                              <Link href="/collections/lily" passHref>
                                <a>LILY</a>
                              </Link>
                            </li>
                            <li className="py-2 transition duration-300">
                              <Link href="/collections/lotus-gang" passHref>
                                <a>Lotus Gang</a>
                              </Link>
                            </li>
                            <li className="py-2 transition duration-300">
                              <a
                                href="https://shop.thelotus.io"
                                target="_blank"
                                rel="noreferrer"
                              >
                                Shop
                              </a>
                            </li>
                            <li className="py-2 transition duration-300">
                              <Link href="/vision" passHref>
                                <a>Vision</a>
                              </Link>
                            </li>
                            <li className="py-2 transition duration-300">
                              <Link href="/blueprint" passHref>
                                <a>Blueprint</a>
                              </Link>
                            </li>
                            <li className="py-2 transition duration-300">
                              <Link href="/team" passHref>
                                <a>Our Team</a>
                              </Link>
                            </li>
                            <li className="py-2 transition duration-300">
                              <Link href="/faq" passHref>
                                <a>FAQs</a>
                              </Link>
                            </li>
                          </ul>
                          <ul className="flex gap-4 mt-6">
                            <li>
                              <a
                                href="https://discord.gg/vs8VvHb35k"
                                target="_blank"
                                rel="noreferrer"
                                className="flex items-center transition duration-300 cursor-pointer hover:text-lily-blue"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 23.28 17.74"
                                  width="20px"
                                  height="20px"
                                >
                                  <path
                                    fill="currentColor"
                                    d="M19.71,1.47C18.22,.79,16.63,.29,14.97,0c-.03,0-.06,0-.08,.04-.2,.36-.43,.84-.59,1.21-1.79-.27-3.57-.27-5.32,0-.16-.38-.39-.85-.6-1.21-.02-.03-.05-.04-.08-.04-1.66,.29-3.25,.79-4.74,1.47-.01,0-.02,.01-.03,.03C.52,6.01-.31,10.4,.1,14.75c0,.02,.01,.04,.03,.05,1.99,1.46,3.92,2.35,5.81,2.94,.03,0,.06,0,.08-.03,.45-.61,.85-1.26,1.19-1.93,.02-.04,0-.09-.04-.1-.63-.24-1.24-.53-1.82-.87-.05-.03-.05-.09,0-.12,.12-.09,.24-.19,.36-.28,.02-.02,.05-.02,.08-.01,3.81,1.74,7.93,1.74,11.7,0,.02-.01,.05,0,.08,0,.12,.1,.24,.19,.36,.28,.04,.03,.04,.1,0,.12-.58,.34-1.18,.63-1.82,.86-.04,.02-.06,.06-.04,.1,.35,.68,.75,1.32,1.19,1.93,.02,.03,.05,.04,.08,.03,1.9-.59,3.83-1.48,5.82-2.94,.02-.01,.03-.03,.03-.05,.49-5.02-.81-9.38-3.44-13.25,0-.01-.02-.02-.03-.03ZM7.78,12.1c-1.15,0-2.09-1.05-2.09-2.35s.93-2.35,2.09-2.35,2.11,1.06,2.09,2.35c0,1.29-.93,2.35-2.09,2.35Zm7.74,0c-1.15,0-2.09-1.05-2.09-2.35s.93-2.35,2.09-2.35,2.11,1.06,2.09,2.35c0,1.29-.92,2.35-2.09,2.35Z"
                                  />
                                </svg>
                              </a>
                            </li>
                            <li>
                              <a
                                href="https://twitter.com/THELILYNFT"
                                target="_blank"
                                rel="noreferrer"
                                className="flex items-center transition duration-300 cursor-pointer hover:text-lily-blue"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 22.27 18.23"
                                  width="20px"
                                  height="20px"
                                >
                                  <path
                                    fill="currentColor"
                                    d="M21.76,2.1c-.35,.16-.71,.29-1.08,.39,.44-.49,.77-1.07,.97-1.7,.05-.14,0-.3-.12-.39-.12-.09-.28-.1-.41-.03-.78,.46-1.62,.8-2.51,.99-.89-.87-2.1-1.36-3.35-1.36-2.64,0-4.78,2.14-4.78,4.78,0,.21,.01,.41,.04,.62-3.27-.29-6.31-1.89-8.4-4.46-.07-.09-.19-.14-.31-.13-.12,0-.22,.08-.28,.18-.42,.73-.65,1.56-.65,2.4,0,1.15,.41,2.24,1.14,3.1-.22-.08-.44-.17-.64-.29-.11-.06-.24-.06-.35,0-.11,.06-.18,.18-.18,.3,0,.02,0,.04,0,.06,0,1.72,.93,3.27,2.34,4.11-.12-.01-.24-.03-.36-.05-.12-.02-.25,.02-.34,.11-.08,.09-.11,.23-.07,.35,.52,1.63,1.87,2.84,3.5,3.2-1.35,.85-2.9,1.29-4.52,1.29-.34,0-.68-.02-1.01-.06-.17-.02-.32,.08-.38,.24-.06,.16,0,.33,.14,.42,2.08,1.34,4.5,2.04,6.97,2.04,4.87,0,7.91-2.29,9.61-4.22,2.12-2.4,3.33-5.58,3.33-8.72,0-.13,0-.26,0-.4,.83-.63,1.55-1.39,2.14-2.27,.09-.13,.08-.31-.02-.43-.1-.12-.27-.16-.42-.1Z"
                                  />
                                </svg>
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  )
}

export default Header
