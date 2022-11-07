import { useState, useContext } from 'react'
import Link from 'next/link'
import clsx from 'clsx'
import Marquee from 'react-fast-marquee'
import { ThemeContext } from '../Theme'

type Props = {
  children: JSX.Element | string
  className?: string
  href?: string
  target?: string
  rel?: string
  disabled?: boolean
  onClick?: () => void
  onMouseOver?: (e: any) => void
  onMouseOut?: (e: any) => void
  type?: 'pill' | 'pill-outline' | 'transparent'
  arrow?: boolean
  size?: 'lg' | 'sm'
  underlineSpeed?: number
  underlineReverse?: boolean
  width?: number
  style?: {
    [key: string]: string
  }
}

export const arrowIcon = (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M6.56033 6.5L17.167 17.1067"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M17.167 7.10742L17.167 17.1074H7.16699"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

function Button({
  children,
  onClick,
  onMouseOver,
  onMouseOut,
  className,
  href,
  target,
  rel,
  disabled = false,
  type = 'pill',
  arrow = false,
  size = 'lg',
  underlineSpeed = 140,
  underlineReverse = false,
  width,
}: Props) {
  const [isHovering, setIsHovering] = useState(false)
  const theme = useContext(ThemeContext)
  const title = disabled ? 'Coming soon...' : ''

  let btnClassNames = 'inline-flex items-center transition duration-300 gap-1 '
  let style = {}

  if (type === 'transparent') {
    btnClassNames += `font-mono text-base uppercase text-neutral-900 py-3 `
  } else {
    if (type === 'pill-outline') {
      btnClassNames +=
        'font-sans rounded-full bg-transparent border border-black text-neutral-800 '
      style = {
        color: theme.primaryColor,
        borderColor: theme.primaryColor,
      }
    } else {
      btnClassNames += 'font-sans rounded-full border text-neutral-900 '
      style = {
        backgroundColor: theme.primaryColor,
        borderColor: theme.primaryColor,
      }
    }

    if (size === 'lg') {
      btnClassNames += 'text-xl px-7 py-3'
    } else {
      btnClassNames += 'px-5 py-2'
    }
  }

  const dashedHoverState = (
    <>
      <div className="flex justify-between">
        {children}
        {arrow && arrowIcon}
      </div>
      <div className="hidden md:block">
        <Marquee
          gradient={false}
          speed={underlineSpeed}
          style={{
            width: width ? width : '100%',
            transition: '.3s',
            opacity: underlineReverse
              ? Number(!isHovering)
              : Number(isHovering),
          }}
        >
          <div className="px-4 py-[2px] bg-[#7FFFB9]"></div>
          <div className="px-4 py-[2px] bg-[#FFD462]"></div>
          <div className="px-4 py-[2px] bg-[#FF9596]"></div>
          <div className="px-4 py-[2px] bg-[#91B9FF]"></div>
          <div className="px-4 py-[2px] bg-[#61FEFF]"></div>
          <div className="px-4 py-[2px] bg-[#7FFFB9]"></div>
          <div className="px-4 py-[2px] bg-[#FFD462]"></div>
          <div className="px-4 py-[2px] bg-[#FF9596]"></div>
          <div className="px-4 py-[2px] bg-[#91B9FF]"></div>
          <div className="px-4 py-[2px] bg-[#61FEFF]"></div>
        </Marquee>
      </div>
    </>
  )

  const link =
    href?.substring(0, 1) === '/' ? (
      <Link href={href} passHref>
        <a
          className={clsx(
            btnClassNames,
            className,
            disabled && 'cursor-help',
            width && `w-[${width}px]`,
            '!flex-col !items-start group'
          )}
          style={style}
          href={href}
          title={title}
          onMouseOver={(e) => {
            if (onMouseOver) {
              onMouseOver(e)
            } else {
              setIsHovering(true)
            }
          }}
          onMouseOut={(e) => {
            if (onMouseOut) {
              onMouseOut(e)
            } else {
              setIsHovering(false)
            }
          }}
        >
          {type === 'transparent' ? dashedHoverState : children}
        </a>
      </Link>
    ) : (
      <a
        className={clsx(
          btnClassNames,
          className,
          disabled && 'cursor-help',
          '!flex-col !items-start group'
        )}
        style={style}
        href={href}
        target={target}
        rel={rel}
        onClick={onClick}
        title={title}
        onMouseOver={(e) => {
          if (onMouseOver) {
            onMouseOver(e)
          } else {
            setIsHovering(true)
          }
        }}
        onMouseOut={(e) => {
          if (onMouseOut) {
            onMouseOut(e)
          } else {
            setIsHovering(false)
          }
        }}
      >
        {type === 'transparent' ? dashedHoverState : children}
      </a>
    )
  const button = (
    <button
      className={clsx(btnClassNames, className, disabled && 'cursor-help')}
      style={style}
      onClick={onClick}
      onMouseOver={(e) => {
        if (onMouseOver) {
          onMouseOver(e)
        }
      }}
      onMouseOut={(e) => {
        if (onMouseOut) {
          onMouseOut(e)
        }
      }}
      title={title}
    >
      {children}
      {arrow && arrowIcon}
    </button>
  )

  return href ? link : button
}

export default Button
