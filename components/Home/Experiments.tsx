import { Panel } from './Panel'

export const Experiments = () => {
  return (
    <Panel floating={false} fixedHeight={false}>
      <div className="flex flex-col-reverse items-center justify-end w-full gap-4 lg:justify-center lg:flex-row">
        <div className="relative w-full h-full lg:w-1/2">
          <div className="absolute left-0 flex flex-col w-[90%] lg:w-3/5 -translate-y-[90%] lg:-translate-y-1/2 top-1/2">
            <button className="w-full px-16 py-2 text-2xl font-semibold text-left rounded-r-xl bg-lily-blue">
              Silk Road
            </button>
            <button className="w-full px-16 py-2 text-2xl font-semibold text-left rounded-r-xl bg-lily-yellow">
              Metaverse Models
            </button>
            <button className="w-full px-16 py-2 text-2xl font-semibold text-left rounded-r-xl bg-lily-red">
              Floor Calculator
            </button>
            <button className="w-full px-16 py-2 text-2xl font-semibold text-left rounded-r-xl bg-lily-blue-dark">
              Planting
            </button>
          </div>
        </div>
        <div className="w-full px-4 pt-16 lg:p-0 lg:w-1/2">
          <h2 className="text-5xl font-bold lg:text-7xl">
            Experiments
            <br className="hidden lg:block" /> and Fun
          </h2>
        </div>
      </div>
    </Panel>
  )
}
