import type { ReactNode } from 'react'
import clsx from 'clsx'
import Parallax from '../Parallax'

type PanelPropsType = {
  children: ReactNode
  floating: boolean
  last?: boolean
}

const Panel = ({ children, floating, last = false }: PanelPropsType) => {
  return (
    <div className="relative">
      <div
        className={clsx(
          'flex flex-col relative w-full z-20 items-center h-[100vh]',
          floating && 'justify-center'
        )}
      >
        {floating && (
          <Parallax offset={100}>
            <div className="flex items-center justify-center bg-white text-black h-[90vh] w-[90vw] rounded-lg">
              <div className="mx-auto max-w-7xl">{children}</div>
            </div>
          </Parallax>
        )}

        {!floating && (
          <div
            className={clsx(
              'flex items-center justify-center bg-white text-black w-screen',
              !last && 'h-[95vh] rounded-b-3xl',
              last && 'h-screen'
            )}
          >
            <div className="mx-auto max-w-7xl">{children}</div>
          </div>
        )}
      </div>

      <div
        className={clsx(
          'absolute inset-0 flex w-screen h-screen',
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
