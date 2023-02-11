import type { ReactNode } from 'react'
import clsx from 'clsx'
import Parallax from '../Parallax'

type PanelPropsType = {
  children: ReactNode
  floating: boolean
  first?: boolean
  last?: boolean
}

const Panel = ({
  children,
  floating,
  first = false,
  last = false,
}: PanelPropsType) => {
  return (
    <div className="relative">
      <div
        className={clsx(
          'flex flex-col relative w-full z-20 items-center min-h-[100vh]',
          floating && 'justify-center'
        )}
      >
        {floating && (
          <Parallax offset={100}>
            <div className="flex bg-white text-black min-h-[90vh] w-[95vw] rounded-3xl">
              {children}
            </div>
          </Parallax>
        )}

        {!floating && (
          <div
            className={clsx(
              'flex bg-white text-black w-screen',
              !last && !first && 'h-screen rounded-3xl',
              last && 'min-h-screen rounded-t-3xl',
              first && 'min-h-[95vh] rounded-b-3xl'
            )}
          >
            {children}
          </div>
        )}
      </div>

      <div
        className={clsx(
          'absolute inset-0 flex w-screen h-full',
          floating && 'flex-col',
          !floating && 'flex-col-reverse'
        )}
      >
        <div className="w-screen h-1/5 bg-lily-green"></div>
        <div className="w-screen h-1/5 bg-lily-yellow"></div>
        <div className="w-screen h-1/5 bg-lily-red"></div>
        <div className="w-screen h-1/5 bg-lily-blue-dark"></div>
        <div className="w-screen h-1/5 bg-lily-blue"></div>
      </div>
    </div>
  )
}

export default Panel
