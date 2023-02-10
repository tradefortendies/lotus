import type { ReactNode } from 'react'
import clsx from 'clsx'

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
        <div
          className={clsx(
            'flex items-center justify-center bg-white text-black',
            floating && 'h-[90vh] w-[90vw] rounded-lg',
            !floating && 'h-screen w-screen',
            !floating && !last && 'h-[95vh] rounded-b-3xl'
          )}
        >
          <div className="mx-auto max-w-7xl">{children}</div>
        </div>
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
