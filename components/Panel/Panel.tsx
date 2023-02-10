import type { ReactNode } from 'react'

type PanelPropsType = {
  children: ReactNode
}

const Panel = ({ children }: PanelPropsType) => {
  return (
    <div className="flex flex-col relative w-full items-center justify-center lg:min-h-[900px] h-[100vh] bg-white text-neutral-900">
      <div className="w-full mx-auto font-sans max-w-7xl">{children}</div>
    </div>
  )
}

export default Panel
