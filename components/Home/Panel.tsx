import type { ReactNode } from 'react'
import clsx from 'clsx'
import Parallax from '../Parallax'

type PanelPropsType = {
  children: ReactNode
  floating: boolean
  mode?: 'light' | 'dark'
  first?: boolean
  last?: boolean
  fixedHeight?: boolean
}

export const Panel = ({
  children,
  floating,
  mode = 'light',
  first = false,
  last = false,
  fixedHeight = false,
}: PanelPropsType) => {
  return (
    <div className="relative">
      <div
        className={clsx(
          'flex flex-col relative w-full z-20 items-center min-h-[100vh]',
          floating && 'justify-center',
          !first && !last && mode !== 'dark' && 'pb-8 lg:pb-0',
          !last && 'pb-16 lg:pb-0'
        )}
      >
        {floating && (
          <Parallax offset={100} clampInitial={-100}>
            <div
              className={clsx(
                'flex min-h-[90vh] w-[95vw] max-w-[1728px] rounded-3xl',
                mode === 'light' && 'bg-white text-black',
                mode === 'dark' && 'bg-lily-black text-white'
              )}
            >
              {children}
            </div>
          </Parallax>
        )}

        {!floating && (
          <div
            className={clsx(
              'flex w-screen relative',
              mode === 'light' && 'bg-white text-black',
              mode === 'dark' &&
                'bg-lily-black text-white rounded-t-3xl translate-y-4',
              !last && !first && mode !== 'dark' && 'rounded-3xl',
              !last && !first && !fixedHeight && 'min-h-screen',
              !last && !first && fixedHeight && 'h-screen',
              last && 'min-h-screen rounded-t-3xl',
              first && 'min-h-[90vh] rounded-b-3xl'
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
