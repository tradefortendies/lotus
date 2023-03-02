import clsx from 'clsx'
import { BsChevronDown } from 'react-icons/bs'
import { Fade } from 'react-awesome-reveal'

type ScrollArrow = {
  position?: 'fixed' | 'absolute'
  className?: string
}

function ScrollArrow({ position = 'fixed', className }: ScrollArrow) {
  return (
    <Fade duration={500} delay={2500} fraction={0}>
      <div
        data-scroll
        className={clsx(
          'hidden md:flex bottom-[40px] w-full z-[999999] flex-col items-center justify-center text-sm gap-2 transition duration-1000',
          position,
          className
        )}
      >
        Scroll
        <BsChevronDown className="text-lg text-black animate-bounce" />
      </div>
    </Fade>
  )
}

export default ScrollArrow
