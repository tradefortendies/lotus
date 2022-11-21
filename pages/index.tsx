import type { NextPage } from 'next'
import { useEffect, useRef, useState, useContext } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock'
import Meta from '../components/Meta'
import Header from '../components/Header'
import Button from '../components/Button'
import Footer from '../components/Footer'
import Eligibility from '../components/Eligibility'
import ScrollArrow from '../components/ScrollArrow'
import LoadingCursor from '../components/LoadingCursor'
import Parallax from '../components/Parallax'
import { ThemeContext } from '../components/Theme'

const Home: NextPage = () => {
  const bgRef = useRef<HTMLDivElement>(null)
  const theme = useContext(ThemeContext)
  const [isLoading, setIsLoading] = useState(false)
  const [windowDimensions, setWindowDimensions] = useState({
    width: 0,
    height: 0,
  })

  useEffect(() => {
    if (!bgRef.current) {
      return
    }

    gsap.registerPlugin(ScrollTrigger)
    document.documentElement.scrollTo(0, 0)
    disableBodyScroll(bgRef.current)

    setIsLoading(true)

    setWindowDimensions({
      width: window.innerWidth,
      height: window.innerHeight,
    })

    setTimeout(() => {
      requestAnimationFrame(() => {
        if (!bgRef.current) {
          return
        }

        bgRef.current.style.zIndex = '1'
        document.documentElement.scrollTo(0, 0)

        const introTl = gsap.timeline({ repeat: 0 })
        introTl.to('#main', { y: 0, duration: 0.75, ease: 'power2.out' })
        introTl.to(
          '#content h1, #content h2',
          {
            opacity: 1,
            y: 0,
            duration: 1,
            delay: 1,
            ease: 'power2.out',
            stagger: 0.2,
          },
          '-=50%'
        )
        introTl.to(
          '#content .masthead-btns',
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power2.out',
          },
          '-=75%'
        )
        introTl.to(
          '#char',
          {
            opacity: 1,
            duration: 1,
            ease: 'power2.out',
          },
          '-=50%'
        )
        introTl.to(
          '[data-scroll]',
          {
            opacity: 1,
            duration: 1,
            ease: 'power2.out',
          },
          '-=100%'
        )
      })

      setTimeout(() => {
        if (!bgRef.current) {
          return
        }

        setIsLoading(false)
        enableBodyScroll(bgRef.current)

        if (window.innerWidth < 500) {
          return
        }

        document.documentElement.style.scrollBehavior = 'smooth'

        if (window.location.hash === '#eligibility') {
          const eligbilityRect = document
            .querySelector('#eligibility')
            ?.getBoundingClientRect()

          if (!eligbilityRect) {
            return
          }

          window.scrollTo(0, eligbilityRect.top)
        }
      }, 3000)
    }, 2000)

    setTimeout(() => {
      if (window.innerWidth < 500) {
        return
      }

      gsap.to('#collections div', {
        scrollTrigger: {
          trigger: '#collections div',
          start: 'top 140%',
          toggleActions: 'restart none none reverse',
        },
        opacity: 1,
        stagger: 0.25,
      })

      gsap.to('#eligibility-content div', {
        scrollTrigger: {
          trigger: '#eligibility',
          start: 'top 130%',
          toggleActions: 'restart none none reverse',
        },
        opacity: 1,
        stagger: 0.25,
      })

      gsap.to('.merch', {
        scrollTrigger: {
          trigger: '#merch',
          start: 'top 130%',
          toggleActions: 'restart none none reverse',
        },
        opacity: 1,
        stagger: 0.25,
      })
    }, 1000)
  }, [])

  return (
    <>
      <Meta
        title={
          isLoading ? 'Loading Lotus...' : 'Lotus - a community of optimalists'
        }
        desc="The landing page of Web3."
      />

      {isLoading && <LoadingCursor />}
      <>
        <div
          ref={bgRef}
          className="fixed top-0 z-50 w-screen h-screen bg-neutral-800"
        >
          <svg
            viewBox={`0 0 ${windowDimensions.width} ${windowDimensions.height}`}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="object-cover w-full h-full"
          >
            <g>
              <rect
                width={windowDimensions.width}
                height={
                  windowDimensions.height - (windowDimensions.height / 100) * 10
                }
                fill="white"
              />
              <rect width="16.666666667%" height="90%" fill="#F9F7EF" />
              <rect y="90%" width="16.666666667%" height="10%" fill="#422F2E" />
              <rect
                x="16.666666667%"
                width="16.666666667%"
                height="90%"
                fill="#7FFFB9"
              />
              <rect
                x="16.666666667%"
                y="90%"
                width="16.666666667%"
                height="10%"
                fill="#91B9FF"
              />
              <rect
                x="33.333333334%"
                width="16.666666667%"
                height="90%"
                fill="#FFD462"
              />
              <rect
                x="33.333333334%"
                y="90%"
                width="16.666666667%"
                height="10%"
                fill="#422F2E"
              />
              <rect
                x="50.000000001%"
                width="16.666666667%"
                height="90%"
                fill="#FF9596"
              />
              <rect
                x="50.000000001%"
                y="90%"
                width="16.666666667%"
                height="10%"
                fill="#00CCCC"
              />
              <rect
                x="66.666666668%"
                width="16.666666667%"
                height="90%"
                fill="#91B9FF"
              />
              <rect
                x="66.666666668%"
                y="90%"
                width="16.666666667%"
                height="10%"
                fill="#422F2E"
              />
              <rect
                x="83.333333335%"
                width="16.666666667%"
                height="90%"
                fill="#61FEFF"
              />
              <rect
                x="83.333333335%"
                y="90%"
                width="16.666666667%"
                height="10%"
                fill="#F9F7EF"
              />
            </g>
          </svg>
        </div>
        <Header
          position="slide"
          fadeInAnimation={true}
          colorChangeAnimation={true}
        />
        <div
          id="main"
          className="w-screen min-h-screen text-neutral-900 translate-y-[100vh] relative z-20"
        >
          <div className="relative bg-lily-black">
            <div className="relative z-10">
              <div
                id="content"
                className="relative w-full lg:min-h-[900px] h-[95vh] bg-white text-neutral-900 rounded-b-3xl"
              >
                <div className="relative flex flex-col w-full h-full px-8 mx-auto text-center pt-28 md:pt-16 md:justify-center xl:text-left max-w-7xl">
                  <Parallax offset={50} clampInitial={-50}>
                    <h1 className="max-w-[400px] md:max-w-none md:w-[60%] smLaptop:w-[50%] mx-auto md:mx-0 translate-y-8 opacity-0">
                      <span className="sr-only">Lotus</span>
                      <svg
                        viewBox="0 0 730 183"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-full"
                      >
                        <path
                          d="M1.57952e-06 3.99999H39.75V158.75L22.75 141.75H116.25V179H1.57952e-06V3.99999ZM196.789 182.5C178.789 182.5 162.706 178.667 148.539 171C134.372 163.167 123.289 152.333 115.289 138.5C107.456 124.667 103.539 109 103.539 91.5C103.539 73.8333 107.456 58.1667 115.289 44.5C123.289 30.6667 134.372 19.9167 148.539 12.25C162.706 4.41665 178.789 0.499988 196.789 0.499988C214.956 0.499988 231.039 4.41665 245.039 12.25C259.206 19.9167 270.289 30.6667 278.289 44.5C286.289 58.3333 290.289 74 290.289 91.5C290.289 109.167 286.289 124.917 278.289 138.75C270.289 152.417 259.206 163.167 245.039 171C230.872 178.667 214.789 182.5 196.789 182.5ZM196.789 144.75C207.122 144.75 216.289 142.5 224.289 138C232.289 133.5 238.456 127.25 242.789 119.25C247.289 111.083 249.539 101.833 249.539 91.5C249.539 81.1667 247.289 72 242.789 64C238.456 55.8333 232.289 49.5 224.289 45C216.289 40.5 207.122 38.25 196.789 38.25C186.622 38.25 177.539 40.5 169.539 45C161.539 49.5 155.289 55.8333 150.789 64C146.289 72 144.039 81.1667 144.039 91.5C144.039 101.833 146.289 111.083 150.789 119.25C155.289 127.25 161.539 133.5 169.539 138C177.539 142.5 186.622 144.75 196.789 144.75ZM334.275 18.75H374.025V179H334.275V18.75ZM278.775 3.99999H429.525V41.25H278.775V3.99999ZM509.547 182.5C494.547 182.5 481.464 179.5 470.297 173.5C459.297 167.333 450.88 158.583 445.047 147.25C439.214 135.917 436.297 122.5 436.297 107V3.99999H476.047V104.25C476.047 117.75 478.88 127.917 484.547 134.75C490.214 141.417 498.547 144.75 509.547 144.75C520.714 144.75 529.047 141.417 534.547 134.75C540.214 127.917 543.047 117.75 543.047 104.25V3.99999H582.797V107C582.797 122.5 579.797 135.917 573.797 147.25C567.964 158.583 559.547 167.333 548.547 173.5C537.547 179.5 524.547 182.5 509.547 182.5ZM662.396 182.5C647.896 182.5 635.23 180.083 624.396 175.25C613.73 170.417 605.563 163.583 599.896 154.75C594.23 145.75 591.396 135.25 591.396 123.25H630.396C630.396 131.417 633.23 137.917 638.896 142.75C644.563 147.417 652.313 149.75 662.146 149.75C670.48 149.75 677.063 148.167 681.896 145C686.73 141.667 689.146 137.083 689.146 131.25C689.146 125.25 686.23 120.333 680.396 116.5C674.73 112.5 665.646 109.167 653.146 106.5C639.313 103.5 627.98 99.5833 619.146 94.75C610.313 89.9167 603.73 84 599.396 77C595.063 70 592.896 61.75 592.896 52.25C592.896 41.5833 595.48 32.4167 600.646 24.75C605.98 16.9167 613.563 10.9167 623.396 6.75C633.23 2.58332 644.813 0.499988 658.146 0.499988C671.813 0.499988 683.73 2.91665 693.896 7.74998C704.23 12.4167 712.146 19.0833 717.646 27.75C723.313 36.4167 726.146 46.5833 726.146 58.25H687.896C687.896 50.4167 685.313 44.25 680.146 39.75C674.98 35.25 667.813 33 658.646 33C653.146 33 648.313 33.75 644.146 35.25C640.146 36.5833 637.063 38.6667 634.896 41.5C632.73 44.3333 631.646 47.6667 631.646 51.5C631.646 57 634.313 61.5833 639.646 65.25C644.98 68.9167 654.313 72.25 667.646 75.25C689.48 80.4167 705.23 87.3333 714.896 96C724.563 104.5 729.396 115.75 729.396 129.75C729.396 146.25 723.396 159.167 711.396 168.5C699.563 177.833 683.23 182.5 662.396 182.5Z"
                          fill="#222222"
                        />
                      </svg>
                    </h1>
                  </Parallax>
                  <div className="relative z-20 mt-6 text-xl font-medium leading-relaxed text-center xl:mt-12 md:mt-16 md:text-left md:w-[70%] lg:w-[60%]">
                    <Parallax offset={80} clampInitial={-80}>
                      <h2 className="font-sans text-4xl lg:text-[50px] md:text-[40px] xl:text-[80px] smLaptop:text-[65px] leading-none translate-y-8 opacity-0">
                        A community of optimalists.
                      </h2>
                    </Parallax>
                    <div className="flex flex-col items-center mt-6 text-center opacity-0 masthead-btns xl:mt-8 md:hidden">
                      <Button
                        arrow={true}
                        type="transparent"
                        href="/vision"
                        underlineSpeed={150}
                        underlineReverse={true}
                      >
                        Our Vision
                      </Button>
                      <Button
                        arrow={true}
                        type="transparent"
                        href="https://magiceden.io/marketplace/lotus_gang_nft"
                        target="_blank"
                        rel="noreferrer"
                        underlineSpeed={150}
                      >
                        Lotus Gang
                      </Button>
                      <Button
                        arrow={true}
                        type="transparent"
                        href="https://magiceden.io/marketplace/lily"
                        target="_blank"
                        rel="noreferrer"
                        underlineSpeed={150}
                      >
                        LILY
                      </Button>
                    </div>
                    <Parallax offset={100} clampInitial={-100}>
                      <div className="masthead-btns hidden md:flex flex-col items-start mt-12 w-[300px] opacity-0">
                        <Button
                          arrow={true}
                          type="transparent"
                          href="/vision"
                          width={120}
                          underlineSpeed={150}
                          underlineReverse={true}
                        >
                          Our Vision
                        </Button>
                        <Button
                          arrow={true}
                          type="transparent"
                          href="https://magiceden.io/marketplace/lotus_gang_nft"
                          target="_blank"
                          rel="noreferrer"
                          width={120}
                          underlineSpeed={150}
                        >
                          Lotus Gang
                        </Button>
                        <Button
                          arrow={true}
                          type="transparent"
                          href="https://magiceden.io/marketplace/lily"
                          target="_blank"
                          rel="noreferrer"
                          width={60}
                          underlineSpeed={150}
                        >
                          LILY
                        </Button>
                      </div>
                    </Parallax>
                  </div>
                </div>
                <ScrollArrow
                  position="absolute"
                  className="opacity-0 smLaptop:bottom-auto smLaptop:top-[90vh]"
                />
                <img
                  id="char"
                  src="/img/lily-char-crop.png"
                  className="opacity-0 absolute bottom-0 rounded-br-3xl left-1/2 -translate-x-1/2 md:-translate-x-0 z-10 pointer-events-none h-[35vh] md:h-[65vh] xl:h-[90vh] smLaptop:h-[100vh] md:left-auto md:right-0"
                />
              </div>
              <div
                id="collections"
                className="flex flex-col lg:flex-row lg:min-h-screen my-[5vh] gap-8 px-4 lg:px-8"
              >
                <div className="flex flex-col justify-center p-8 space-y-8 text-center bg-white lg:opacity-0 lg:p-16 lg:min-h-screen lg:w-1/2 rounded-2xl">
                  <svg
                    viewBox="0 0 90 90"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-[64px] mx-auto fill-lily-black"
                  >
                    <path d="M40.7038 63.14C37.3916 61.6628 35.0712 58.3811 34.9826 54.5509H34.9738V28.4122H25.4266V54.3033C25.4266 55.7186 25.5772 57.0896 25.8694 58.4165C26.7993 62.7066 29.164 66.4483 32.4408 69.1462C33.2379 69.8008 34.0793 70.3934 34.9738 70.9065C37.3561 72.2952 40.0573 73.1886 42.9445 73.4452V63.83C42.1651 63.6885 41.4123 63.4496 40.7038 63.14ZM88.723 36.9482C85.3222 36.9924 82.0187 37.4082 78.8482 38.1777C74.7742 39.1507 70.9217 40.6899 67.3792 42.7067V54.7013C70.8243 51.8796 74.8185 49.7212 79.1759 48.3856C78.1662 57.2577 73.8 65.1126 67.3792 70.6588V82.8304C79.8666 75.462 88.4396 62.2024 89.281 46.873C89.3252 46.0503 89.3518 45.2277 89.3518 44.3962C89.3518 41.8575 89.1393 39.3719 88.7319 36.9482H88.723ZM21.9638 42.6978C18.4124 40.6899 14.5599 39.1596 10.4948 38.1866C7.32421 37.417 4.02079 36.9924 0.619945 36.957C0.212553 39.3807 0 41.8663 0 44.405C0 45.2365 0.0265691 46.0592 0.0708509 46.8818C0.912205 62.2024 9.48516 75.4708 21.9726 82.8392V70.6676C15.5518 65.1303 11.1767 57.2665 10.176 48.3944C14.5333 49.7212 18.5275 51.8884 21.9726 54.7102V42.7067L21.9638 42.6978Z" />
                    <path d="M44.6721 12.7111L54.3698 24.9535V33.7991C58.3021 35.6655 61.6232 38.6288 63.917 42.2909V24.9535L52.9174 10.6943L44.6721 0L36.4268 10.6943L25.4272 24.9535H34.9744L44.6721 12.7111Z" />
                    <path d="M54.2096 37.6027C53.9616 37.4612 53.7048 37.3197 53.4479 37.187C53.3594 37.1427 53.2708 37.0897 53.1734 37.0454C52.8368 36.8774 52.5003 36.7182 52.146 36.5766C52.1283 36.5766 52.1195 36.5678 52.1018 36.5589C51.7741 36.4174 51.4375 36.2936 51.0921 36.1697C50.9859 36.1343 50.8707 36.099 50.7645 36.0547C50.5076 35.9663 50.2419 35.8867 49.9762 35.8159C49.8611 35.7805 49.7548 35.754 49.6397 35.7186C49.2766 35.6213 48.9046 35.5328 48.5326 35.4532C48.5149 35.4532 48.4972 35.4532 48.4795 35.4444C48.1253 35.3736 47.7621 35.3117 47.3902 35.2586C47.275 35.2409 47.1599 35.2321 47.0359 35.2144C46.7525 35.179 46.4691 35.1525 46.1857 35.1259C46.0706 35.1171 45.9554 35.1083 45.8315 35.0994C45.4418 35.0729 45.0432 35.064 44.6447 35.064C42.4572 35.064 40.3582 35.4267 38.401 36.099V46.8818C39.6674 45.8114 41.2173 45.0596 42.9177 44.7588C43.4757 44.6615 44.0513 44.6084 44.6447 44.6084C45.2381 44.6084 45.8137 44.6615 46.3717 44.7588C49.498 45.3249 52.1106 47.3771 53.4214 50.1723C53.9527 51.2869 54.2716 52.5164 54.3336 53.8167C54.3336 53.8079 54.3336 53.799 54.3513 53.799V54.5509C54.2539 58.3811 51.9335 61.6539 48.6301 63.14C47.9216 63.4584 47.1688 63.6973 46.3806 63.8388V73.454C49.2677 73.1974 51.9778 72.304 54.3513 70.9153V77.7352C54.2627 77.7618 54.1742 77.7883 54.0856 77.806C51.6147 78.496 49.0375 78.9294 46.3806 79.0532C45.8315 79.0798 45.2735 79.0975 44.7244 79.0975H44.5916C44.0336 79.0975 43.4757 79.0798 42.9266 79.0532C40.2697 78.9206 37.6836 78.496 35.2215 77.806C35.133 77.7795 35.0444 77.7529 34.9558 77.7352C34.8053 77.691 34.6459 77.6379 34.4865 77.5937C31.369 76.6384 28.4464 75.2673 25.7718 73.5247C25.6478 73.454 25.5238 73.3744 25.4087 73.2859V84.6702C28.1807 85.997 31.1033 87.0408 34.1588 87.775C37.3294 88.5446 40.6416 88.9692 44.0425 89.0046C44.2462 89.0134 44.4587 89.0134 44.6624 89.0134C44.8661 89.0134 45.0787 89.0134 45.2824 89.0046C48.6832 88.9603 51.9866 88.5446 55.1572 87.775C58.2127 87.0408 61.1441 85.997 63.9073 84.6702V54.2944C63.9073 47.1471 59.9928 40.911 54.2007 37.6027H54.2096Z" />
                  </svg>

                  <h2 className="mx-auto font-sans font-bold text-7xl xl:w-[440px]">
                    <svg
                      viewBox="0 0 383 52"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-full fill-lily-black md:block"
                    >
                      <path d="M30.1991 50.8142H0.96875V1.65108H12.2729V39.5101H30.1991V50.8142Z" />
                      <path d="M56.0087 1.65108C59.3977 1.65108 62.5861 2.29767 65.5738 3.59085C68.5615 4.88403 71.1701 6.64543 73.3997 8.87506C75.6294 11.0601 77.3908 13.6464 78.6839 16.6341C79.9771 19.6218 80.6237 22.8102 80.6237 26.1992C80.6237 29.5882 79.9771 32.7766 78.6839 35.7643C77.3908 38.752 75.6294 41.3606 73.3997 43.5903C71.1701 45.7753 68.5615 47.5144 65.5738 48.8076C62.5861 50.1008 59.3977 50.7473 56.0087 50.7473C52.6197 50.7473 49.4313 50.1008 46.4436 48.8076C43.4559 47.5144 40.8473 45.7753 38.6177 43.5903C36.4326 41.3606 34.6935 38.752 33.4003 35.7643C32.1072 32.7766 31.4606 29.5882 31.4606 26.1992C31.4606 22.8102 32.1072 19.6218 33.4003 16.6341C34.6935 13.6464 36.4326 11.0601 38.6177 8.87506C40.8473 6.64543 43.4559 4.88403 46.4436 3.59085C49.4313 2.29767 52.6197 1.65108 56.0087 1.65108ZM56.0087 39.4432C57.837 39.4432 59.5538 39.1087 61.1591 38.4398C62.7645 37.7264 64.1691 36.7676 65.3731 35.5636C66.5771 34.3596 67.5135 32.955 68.1824 31.3496C68.8959 29.7443 69.2526 28.0275 69.2526 26.1992C69.2526 24.3709 68.8959 22.6541 68.1824 21.0488C67.5135 19.4435 66.5771 18.0388 65.3731 16.8348C64.1691 15.6308 62.7645 14.6944 61.1591 14.0255C59.5538 13.312 57.837 12.9553 56.0087 12.9553C54.1804 12.9553 52.4636 13.312 50.8583 14.0255C49.2529 14.6944 47.8483 15.6308 46.6443 16.8348C45.4403 18.0388 44.4816 19.4435 43.7681 21.0488C43.0992 22.6541 42.7647 24.3709 42.7647 26.1992C42.7647 28.0275 43.0992 29.7443 43.7681 31.3496C44.4816 32.955 45.4403 34.3596 46.6443 35.5636C47.8483 36.7676 49.2529 37.7264 50.8583 38.4398C52.4636 39.1087 54.1804 39.4432 56.0087 39.4432Z" />
                      <path d="M112.152 1.5173V12.8884H102.72V50.8142H91.4163V12.8884H82.0519V1.5173H112.152Z" />
                      <path d="M135.641 50.8142C133.143 50.8142 130.78 50.3683 128.55 49.4765C126.321 48.54 124.336 47.2245 122.597 45.53C120.814 43.7463 119.431 41.7397 118.45 39.5101C117.514 37.2804 117.023 34.8947 116.979 32.353V1.65108H128.283V32.2861C128.283 34.2481 129.019 35.965 130.49 37.4365C131.962 38.8189 133.701 39.5101 135.708 39.5101C136.689 39.5101 137.625 39.3094 138.517 38.9081C139.409 38.5067 140.189 37.9716 140.858 37.3027C141.527 36.6338 142.04 35.8535 142.396 34.9616C142.753 34.0698 142.932 33.111 142.932 32.0854V1.65108H154.236V32.0185C154.28 34.5603 153.812 36.9683 152.831 39.2425C151.895 41.5167 150.579 43.5011 148.885 45.1956C147.235 46.8901 145.273 48.2502 142.998 49.2758C140.769 50.2568 138.383 50.7696 135.841 50.8142H135.641Z" />
                      <path d="M175.587 51.7507C174.026 51.7507 172.465 51.5277 170.905 51.0818C169.388 50.6805 167.939 50.0339 166.557 49.142C164.149 47.5813 162.276 45.5746 160.938 43.122C159.6 40.6249 158.932 37.9047 158.932 34.9616H170.236C170.236 36.2994 170.526 37.3473 171.105 38.1054C171.685 38.8189 172.198 39.3094 172.644 39.5769C173.446 40.1121 174.316 40.4019 175.252 40.4465C176.189 40.4911 177.103 40.3127 177.995 39.9114C178.619 39.6438 179.11 39.3094 179.466 38.9081C179.868 38.5067 180.158 38.1277 180.336 37.771C180.559 37.3696 180.693 36.9906 180.737 36.6338C180.782 36.2771 180.804 35.9873 180.804 35.7643C180.804 35.5413 180.782 35.2515 180.737 34.8947C180.693 34.538 180.559 34.159 180.336 33.7576C180.158 33.3563 179.868 32.9773 179.466 32.6205C179.11 32.2192 178.619 31.8625 177.995 31.5503C177.504 31.3273 176.969 31.1267 176.389 30.9483C175.854 30.7699 175.275 30.5693 174.65 30.3463C173.536 29.9896 172.376 29.5882 171.172 29.1423C169.968 28.6964 168.764 28.0944 167.56 27.3363C165.999 26.3553 164.684 25.129 163.614 23.6574C162.544 22.1859 161.763 20.6029 161.273 18.9084C160.827 17.2138 160.671 15.4747 160.804 13.691C160.983 11.8628 161.496 10.1236 162.343 8.47373C163.145 6.95758 164.149 5.6421 165.353 4.52729C166.557 3.41249 167.895 2.54293 169.366 1.91864C170.838 1.24975 172.421 0.848419 174.115 0.714643C175.81 0.580865 177.527 0.736938 179.266 1.18286C180.96 1.58419 182.499 2.23078 183.881 3.12263C185.263 3.96989 186.445 5.01781 187.426 6.2664C188.452 7.47039 189.232 8.83046 189.767 10.3466C190.302 11.8628 190.57 13.4458 190.57 15.0957H179.266C179.266 14.0701 178.931 13.3566 178.262 12.9553C177.638 12.5539 177.081 12.2864 176.59 12.1526C176.501 12.1526 176.278 12.1303 175.921 12.0857C175.609 11.9965 175.23 11.9965 174.784 12.0857C174.383 12.1303 173.959 12.2864 173.513 12.5539C173.067 12.7769 172.711 13.1559 172.443 13.691C172.086 14.4045 172.019 15.1626 172.242 15.9653C172.465 16.7233 172.911 17.3253 173.58 17.7712C174.204 18.128 174.896 18.4624 175.654 18.7746C176.412 19.0421 177.214 19.3097 178.062 19.5772C178.82 19.8002 179.578 20.0455 180.336 20.313C181.139 20.5806 181.941 20.8927 182.744 21.2495C185.687 22.5872 187.983 24.5493 189.633 27.1357C191.328 29.722 192.175 32.5982 192.175 35.7643C192.175 38.8858 191.328 41.7397 189.633 44.326C187.983 46.9124 185.687 48.8745 182.744 50.2122C181.584 50.7473 180.403 51.1264 179.199 51.3493C177.995 51.6169 176.791 51.7507 175.587 51.7507Z" />
                      <path d="M248.23 23.323V50.8142H236.859V49.6102C235.61 50.0562 234.317 50.3906 232.979 50.6136C231.686 50.7919 230.393 50.8811 229.1 50.8811C225.934 50.8811 222.835 50.2791 219.802 49.0751C216.77 47.8711 214.05 46.0651 211.642 43.6572C209.234 41.2492 207.428 38.5513 206.224 35.5636C205.064 32.5313 204.485 29.4322 204.485 26.2661C204.485 23.1 205.064 20.0009 206.224 16.9686C207.428 13.9363 209.234 11.2162 211.642 8.80817C214.05 6.40018 216.77 4.59418 219.802 3.39019C222.835 2.18619 225.934 1.58419 229.1 1.58419C232.266 1.58419 235.365 2.18619 238.397 3.39019C241.43 4.59418 244.15 6.40018 246.558 8.80817L238.531 16.8348C237.238 15.5416 235.766 14.5829 234.116 13.9586C232.467 13.2897 230.794 12.9553 229.1 12.9553C227.405 12.9553 225.733 13.2897 224.083 13.9586C222.433 14.5829 220.962 15.5416 219.668 16.8348C218.375 18.128 217.394 19.5995 216.725 21.2495C216.057 22.8994 215.722 24.5716 215.722 26.2661C215.722 27.9606 216.057 29.6328 216.725 31.2828C217.394 32.9327 218.375 34.4042 219.668 35.6974C220.828 36.8568 222.121 37.771 223.548 38.4398C225.02 39.0641 226.513 39.4432 228.03 39.5769C229.59 39.6661 231.129 39.5101 232.645 39.1087C234.161 38.7074 235.566 38.0385 236.859 37.1021V34.6272H227.026V23.323H248.23Z" />
                      <path d="M281.658 50.8142L279.718 44.8611H264.267L262.26 50.8142H250.287L267.009 1.71797H277.712L293.564 50.8142H281.658ZM268.147 33.557H276.106L272.227 21.6508L268.147 33.557Z" />
                      <path d="M325.232 1.71797H336.536V50.8142H324.295L308.242 22.1859V50.8142H296.938V1.85175H309.245L325.232 30.4132V1.71797Z" />
                      <path d="M382.66 23.323V50.8142H371.289V49.6102C370.041 50.0562 368.748 50.3906 367.41 50.6136C366.117 50.7919 364.823 50.8811 363.53 50.8811C360.364 50.8811 357.265 50.2791 354.233 49.0751C351.2 47.8711 348.48 46.0651 346.072 43.6572C343.664 41.2492 341.858 38.5513 340.654 35.5636C339.495 32.5313 338.915 29.4322 338.915 26.2661C338.915 23.1 339.495 20.0009 340.654 16.9686C341.858 13.9363 343.664 11.2162 346.072 8.80817C348.48 6.40018 351.2 4.59418 354.233 3.39019C357.265 2.18619 360.364 1.58419 363.53 1.58419C366.696 1.58419 369.796 2.18619 372.828 3.39019C375.86 4.59418 378.58 6.40018 380.988 8.80817L372.962 16.8348C371.668 15.5416 370.197 14.5829 368.547 13.9586C366.897 13.2897 365.225 12.9553 363.53 12.9553C361.836 12.9553 360.164 13.2897 358.514 13.9586C356.864 14.5829 355.392 15.5416 354.099 16.8348C352.806 18.128 351.825 19.5995 351.156 21.2495C350.487 22.8994 350.153 24.5716 350.153 26.2661C350.153 27.9606 350.487 29.6328 351.156 31.2828C351.825 32.9327 352.806 34.4042 354.099 35.6974C355.258 36.8568 356.552 37.771 357.979 38.4398C359.45 39.0641 360.944 39.4432 362.46 39.5769C364.021 39.6661 365.559 39.5101 367.075 39.1087C368.592 38.7074 369.996 38.0385 371.289 37.1021V34.6272H361.457V23.323H382.66Z" />
                    </svg>
                  </h2>
                  <p className="max-w-xl mx-auto lg:text-lg">
                    The Lotus Gang collection contains 2,000 Lads and 2,000
                    Ladies in 32x32 pixel art which give you access to our
                    ongoing projects and closed community.
                  </p>
                  <Button
                    href="https://magiceden.io/marketplace/lotus_gang_nft"
                    target="_blank"
                    rel="noreferrer"
                    className="mx-auto"
                    onMouseOver={(e) => {
                      e.target.style.backgroundColor = 'white'
                      e.target.classList.remove('!border-transparent')
                      e.target.classList.add('!border-lily-black')
                    }}
                    onMouseOut={(e) => {
                      e.target.style.backgroundColor = theme.primaryColor
                      e.target.classList.remove('!bg-transparent')
                      e.target.classList.remove('!border-lily-black')
                      e.target.classList.add('!border-transparent')
                    }}
                  >
                    View Project
                  </Button>
                </div>
                <div
                  className="flex flex-col items-center justify-center p-8 space-y-8 text-center lg:opacity-0 lg:p-16 lg:min-h-screen lg:w-1/2 rounded-2xl"
                  style={{ backgroundColor: theme.primaryColor }}
                >
                  <svg
                    viewBox="0 0 439 439"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-[60px] mx-auto fill-lily-black"
                  >
                    <path d="M310.321 219.5C310.321 215.009 309.995 210.567 309.362 206.201L438.985 187.026L393.625 82.0007L345.554 93.4276L356.981 45.3563L251.963 0L232.788 129.625C228.423 128.993 223.986 128.667 219.49 128.667C214.994 128.667 210.557 128.993 206.191 129.625L187.022 0L82.0039 45.3614L93.4305 93.4327L45.3603 82.0058L0 187.026L129.617 206.302C128.985 210.637 128.664 215.039 128.664 219.495C128.664 223.951 128.985 228.352 129.617 232.688L0 251.969L45.3603 356.994L93.4305 345.567L82.0039 393.639L187.027 439L206.202 309.375C210.567 310.007 215.004 310.333 219.5 310.333C223.996 310.333 228.433 310.007 232.798 309.375L251.973 439L356.996 393.639L345.569 345.567L393.64 356.994L439 251.969L309.378 232.794C310.01 228.428 310.336 223.991 310.336 219.495L310.321 219.5ZM247.532 247.543C241.269 253.811 233.436 257.54 225.296 258.739C223.369 259.02 221.427 259.16 219.49 259.16C217.553 259.16 215.611 259.015 213.684 258.739C205.544 257.54 197.711 253.816 191.448 247.543C185.15 241.245 181.411 233.351 180.237 225.171C179.695 221.412 179.695 217.593 180.237 213.834C181.411 205.654 185.145 197.765 191.448 191.462C197.711 185.194 205.544 181.466 213.684 180.266C215.611 179.985 217.553 179.845 219.49 179.845C221.427 179.845 223.369 179.99 225.296 180.266C233.436 181.466 241.269 185.189 247.532 191.462C253.8 197.73 257.529 205.569 258.728 213.699C259.29 217.543 259.29 221.462 258.728 225.306C257.529 233.436 253.805 241.275 247.532 247.543Z" />
                  </svg>

                  <h2 className="mx-auto font-sans font-bold text-7xl w-[155px]">
                    <svg
                      viewBox="0 0 1088 439"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-full fill-lily-black"
                    >
                      <path d="M0 0H99.6855V388.084L57.0527 345.451H291.533V438.867H0V0Z" />
                      <path d="M311.076 0H410.762V438.867H311.076V0Z" />
                      <path d="M466.026 0H565.712V388.084L523.079 345.451H757.559V438.867H466.026V0Z" />
                      <path d="M665.182 0H778.66L833.205 101.566L883.361 193.101H870.195L920.351 101.566L974.269 0H1087.75L916.59 301.564H836.34L665.182 0ZM826.936 255.17H926.621V438.867H826.936V255.17Z" />
                    </svg>
                  </h2>
                  <p className="max-w-xl mx-auto lg:text-lg">
                    LILY is the second collection released by The Lotus. The
                    entire collection was hand-drawn by Bunjil who is the
                    founder and artist behind The Lotus.
                  </p>
                  <Button
                    href="https://magiceden.io/marketplace/lily"
                    target="_blank"
                    rel="noreferrer"
                    className="mx-auto !border !border-transparent !bg-white"
                    onMouseOver={(e) => {
                      e.target.classList.remove('!bg-white')
                      e.target.classList.add('!bg-transparent')
                      e.target.classList.remove('!border-transparent')
                      e.target.classList.add('!border-lily-black')
                    }}
                    onMouseOut={(e) => {
                      e.target.classList.add('!bg-white')
                      e.target.classList.remove('!bg-transparent')
                      e.target.classList.add('!border-transparent')
                      e.target.classList.remove('!border-lily-black')
                    }}
                  >
                    View Project
                  </Button>
                </div>
              </div>
              <div id="merch" className="px-4 py-16 bg-white lg:px-8">
                <div className="flex flex-col items-center mx-auto text-center lg:text-left lg:flex-row max-w-7xl">
                  <div>
                    <h2 className="font-sans text-5xl font-bold lg:opacity-0 lg:text-6xl merch">
                      Lotus Gang Merch
                    </h2>
                    <p className="mx-auto my-6 lg:opacity-0 lg:w-3/4 lg:mx-0 merch lg:text-lg">
                      <span className="italic">Sources</span> say this is the
                      best merch in Web3. Each purchase comes with a bag of
                      goodies.
                    </p>
                    <Button
                      href="https://shop.thelotus.io"
                      target="_blank"
                      rel="noreferrer"
                      onMouseOver={(e) => {
                        e.target.style.backgroundColor = 'transparent'
                        e.target.style.border = 'solid 1px #303030'
                      }}
                      onMouseOut={(e) => {
                        e.target.style.backgroundColor = theme.primaryColor
                        e.target.style.border = 'solid 1px transparent'
                      }}
                      className="opacity-0 merch"
                    >
                      Shop Now
                    </Button>
                  </div>
                  <div>
                    <img
                      className="mt-16 lg:opacity-0 lg:mt-0 merch"
                      src="/img/lotus-gang-hoody.webp"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Footer isLoading={isLoading} />
        </div>
      </>
    </>
  )
}

export default Home
