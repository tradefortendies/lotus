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
          'hidden lg:flex uppercase bottom-[40px] w-full z-[999999] text-zinc-700 font-mono flex-col items-center justify-center gap-2 transition duration-1000',
          position,
          className
        )}
      >
        Scroll
        <BsChevronDown className="text-lg text-zinc-700 animate-bounce" />
      </div>
    </Fade>
  )
}

export default ScrollArrow
