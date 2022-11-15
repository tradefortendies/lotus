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
  colorChangeAnimation?: boolean
  iconHoverColorAnimations?: boolean
  position?: 'fixed' | 'absolute' | 'slide'
}

function Header({
  active,
  button = 'colored',
  linkColor = 'black',
  fadeInAnimation = true,
  colorChangeAnimation = true,
  position = 'absolute',
}: Props) {
  const router = useRouter()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [reverseColors, setReverseColors] = useState(false)
  const [mintLink] = useState(
    router.pathname === '/' ? '/#eligibility' : '/eligibility'
  )
  const theme = useContext(ThemeContext)

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
        if (!fadeInAnimation) {
          return
        }
        requestAnimationFrame(() => {
          gsap.to('#header', {
            opacity: 1,
            duration: 1,
            ease: 'power2.out',
          })
        })
      },
      router.pathname === '/' ? 3000 : 500
    )
  }, [])

  return (
    <>
      <header
        id="header"
        className={clsx(
          `top-0 z-[9999] flex items-center w-full px-4 lg:px-8 py-4`,
          linkColor === 'black' && 'text-neutral-900',
          linkColor === 'white' && 'text-white',
          fadeInAnimation && 'opacity-0',
          position !== 'slide' && position,
          position === 'slide' && 'slide',
          `scroll-${scrollDirection}`
        )}
      >
        <Link href="/" passHref>
          <a>
            <svg
              id="logo"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 41.05 40.98"
              className={clsx(
                'w-14 transition-transform duration-1000 hover:rotate-[360deg] -translate-y-1',
                linkColor !== 'white' && 'fill-black',
                linkColor === 'white' && 'fill-white'
              )}
            >
              <g>
                <path d="M18.71,29.04c-1.52-.68-2.59-2.19-2.63-3.95h0V13.07h-4.39v11.91c0,.65,.07,1.28,.2,1.89,.43,1.97,1.52,3.7,3.02,4.94,.36,.3,.75,.57,1.16,.81,1.09,.64,2.34,1.05,3.66,1.17v-4.42c-.36-.06-.7-.17-1.03-.32h.01Zm22.06-12.06c-1.56,.02-3.08,.21-4.54,.57-1.87,.45-3.64,1.16-5.27,2.08v5.52c1.58-1.3,3.42-2.29,5.42-2.9-.46,4.08-2.47,7.7-5.42,10.24v5.6c5.74-3.39,9.68-9.49,10.06-16.54,.02-.38,.03-.76,.03-1.14,0-1.17-.1-2.31-.29-3.43h.01Zm-30.67,2.64c-1.63-.92-3.4-1.63-5.27-2.08-1.46-.35-2.98-.55-4.54-.57-.19,1.11-.29,2.26-.29,3.43,0,.38,0,.76,.03,1.14,.39,7.05,4.33,13.15,10.06,16.54v-5.6c-2.95-2.55-4.96-6.16-5.42-10.24,2,.61,3.84,1.61,5.42,2.9v-5.52h0Z" />
                <g>
                  <path d="M20.54,5.85l4.46,5.63v4.07c1.81,.86,3.33,2.22,4.39,3.91v-7.97l-5.05-6.56L20.54,0l-3.79,4.92-5.05,6.56h4.39l4.46-5.63h-.01Z" />
                  <path d="M24.92,17.3c-.11-.07-.23-.13-.35-.19-.04-.02-.08-.04-.13-.06-.15-.08-.31-.15-.47-.22h-.02c-.15-.07-.31-.13-.46-.19-.05-.02-.1-.03-.15-.05-.12-.04-.24-.08-.36-.11-.05-.01-.1-.03-.16-.04-.17-.04-.34-.09-.51-.12h-.02c-.16-.04-.33-.07-.5-.09-.05,0-.11-.01-.16-.02-.13-.02-.26-.03-.39-.04-.05,0-.11,0-.16-.01-.18-.01-.36-.02-.54-.02-1,0-1.97,.17-2.87,.48v4.96c.58-.49,1.29-.84,2.08-.98,.26-.05,.52-.07,.79-.07s.54,.03,.79,.07c1.44,.26,2.64,1.21,3.24,2.49,.24,.51,.39,1.08,.42,1.68h0v.35h0c-.04,1.76-1.11,3.27-2.63,3.95-.33,.15-.67,.26-1.03,.32v4.42c1.33-.12,2.57-.53,3.66-1.17v3.14l-.12,.03c-1.13,.32-2.32,.52-3.54,.58-.25,0-.51,.02-.76,.02h-.06c-.26,0-.51,0-.76-.02-1.22-.06-2.41-.26-3.54-.58l-.12-.03c-.07-.02-.14-.04-.22-.06-1.43-.44-2.78-1.07-4-1.87-.06-.03-.11-.07-.17-.11v5.24c1.27,.61,2.62,1.09,4.02,1.43,1.46,.35,2.98,.55,4.54,.57h.57c1.56-.02,3.08-.21,4.54-.57,1.4-.34,2.75-.82,4.02-1.43v-13.97c0-3.29-1.8-6.16-4.46-7.68v-.03Z" />
                </g>
              </g>
            </svg>
          </a>
        </Link>
        <ul className="hidden ml-auto font-mono uppercase xl:flex">
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
                <Link href="/quantum-calculator">
                  <a className="block p-4 cursor-pointer">Quantum Calculator</a>
                </Link>
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
                <Link href="/eligibility" passHref>
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
                <a
                  href="https://magiceden.io/marketplace/lotus_gang_nft"
                  target="_blank"
                  rel="noreferrer"
                  className="block p-4 cursor-pointer"
                >
                  Lotus Gang
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
                  <a className="block p-4 cursor-pointer">Our Vision</a>
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
        <Link href={mintLink} passHref>
          <a
            className={clsx(
              'hidden xl:flex items-center justify-center gap-1 rounded-full uppercase text-neutral-900 w-[130px] h-[130px] ml-12  transition duration-1000 hover:rotate-[360deg]'
            )}
            style={{
              backgroundColor:
                button === 'white' ? '#ffffff' : theme.primaryColor,
            }}
          >
            Mint Now
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
        <Dialog as="div" className="relative z-50" onClose={setMobileMenuOpen}>
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
                              <a
                                href="https://lotusgang.notion.site/Lotus-Library-e7df20a3dc4f45869e8adb24aa75fda2"
                                target="_blank"
                                rel="noreferrer"
                              >
                                Library
                              </a>
                            </li>
                            <li className="py-2 transition duration-300">
                              <a
                                href="https://magiceden.io/marketplace/lotus_gang_nft"
                                target="_blank"
                                rel="noreferrer"
                              >
                                Lotus Gang
                              </a>
                            </li>
                            <li className="py-2 transition duration-300">
                              <Link href="/#eligibility" passHref>
                                <a>LILY</a>
                              </Link>
                            </li>
                            <li className="py-2 transition duration-300">
                              <Link href="/#eligibility" passHref>
                                <a>Our Vision</a>
                              </Link>
                            </li>
                            <li className="py-2 transition duration-300">
                              <Link href="/#eligibility" passHref>
                                <a>Our Team</a>
                              </Link>
                            </li>
                            <li className="py-2 transition duration-300">
                              <Link href="/#eligibility" passHref>
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
                          <Button href={mintLink} className="mt-8">
                            Mint Now
                          </Button>
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
