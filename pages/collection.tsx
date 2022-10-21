import { Fragment, useState } from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'
import { Dialog, Disclosure, Transition } from '@headlessui/react'
import { MdClose } from 'react-icons/md'
import { FaFilter } from 'react-icons/fa'
import { HiMinusSm, HiPlusSm } from 'react-icons/hi'
import Header from '../components/Header'

const filters = [
  {
    id: 'color',
    name: 'Color',
    options: [
      { value: 'white', label: 'White', checked: false },
      { value: 'beige', label: 'Beige', checked: false },
      { value: 'blue', label: 'Blue', checked: true },
      { value: 'brown', label: 'Brown', checked: false },
      { value: 'green', label: 'Green', checked: false },
      { value: 'purple', label: 'Purple', checked: false },
    ],
  },
  {
    id: 'category',
    name: 'Category',
    options: [
      { value: 'new-arrivals', label: 'New Arrivals', checked: false },
      { value: 'sale', label: 'Sale', checked: false },
      { value: 'travel', label: 'Travel', checked: true },
      { value: 'organization', label: 'Organization', checked: false },
      { value: 'accessories', label: 'Accessories', checked: false },
    ],
  },
  {
    id: 'size',
    name: 'Size',
    options: [
      { value: '2l', label: '2L', checked: false },
      { value: '6l', label: '6L', checked: false },
      { value: '12l', label: '12L', checked: false },
      { value: '18l', label: '18L', checked: false },
      { value: '20l', label: '20L', checked: false },
      { value: '40l', label: '40L', checked: true },
    ],
  },
]

const Collection: NextPage = () => {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)

  return (
    <>
      <Head>
        <title>LILY - Collection</title>
        <meta name="description" content="Coming soon from Lotus Gang" />
        <meta property="og:url" content="https://www.thelilynft.com/" />
        <meta name="og:title" content="LILY" />
        <meta name="og:description" content="Coming soon from Lotus Gang" />
        <meta
          name="og:image"
          content={process.env.NEXT_PUBLIC_BASE_URL + '/img/share.jpg'}
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@thelilynft" />
        <meta name="twitter:creator" content="@lotusgang" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.webmanifest" />
      </Head>
      <div className="w-screen h-screen wrap">
        <div className="h-screen overflow-auto">
          <div className="relative z-50">
            <Header active="collection" />
            <div className="relative flex flex-col w-full min-h-screen px-4 pt-12 mx-auto text-center lg:pt-24 pb-28 lg:text-left max-w-7xl">
              <h1 className="px-8 font-sans text-6xl font-bold uppercase lg:px-0 lg:w-3/4 lg:text-8xl text-lily-blue">
                Explore Lily
              </h1>
              <div>
                {/* Mobile filter dialog */}
                <Transition.Root show={mobileFiltersOpen} as={Fragment}>
                  <Dialog
                    as="div"
                    className="relative z-40 lg:hidden"
                    onClose={setMobileFiltersOpen}>
                    <Transition.Child
                      as={Fragment}
                      enter="transition-opacity ease-linear duration-300"
                      enterFrom="opacity-0"
                      enterTo="opacity-100"
                      leave="transition-opacity ease-linear duration-300"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0">
                      <div className="fixed inset-0 bg-opacity-25 bg-neutral-800" />
                    </Transition.Child>

                    <div className="fixed inset-0 z-40 flex">
                      <Transition.Child
                        as={Fragment}
                        enter="transition ease-in-out duration-300 transform"
                        enterFrom="translate-x-full"
                        enterTo="translate-x-0"
                        leave="transition ease-in-out duration-300 transform"
                        leaveFrom="translate-x-0"
                        leaveTo="translate-x-full">
                        <Dialog.Panel className="relative flex flex-col w-full h-full max-w-xs py-4 pb-12 ml-auto overflow-y-auto bg-white shadow-xl">
                          <div className="flex items-center justify-between px-4">
                            <div className="flex items-center ml-auto h-7">
                              <button
                                type="button"
                                className="text-gray-400 bg-white rounded-md hover:text-gray-500 focus:outline-none"
                                onClick={() => setMobileFiltersOpen(false)}>
                                <MdClose
                                  className="w-6 h-6"
                                  aria-hidden="true"
                                />
                              </button>
                            </div>
                          </div>

                          {/* Filters */}
                          <form className="mt-8">
                            {filters.map((section) => (
                              <Disclosure
                                as="div"
                                key={section.id}
                                className="px-4 py-6">
                                {({ open }) => (
                                  <>
                                    <h3 className="flow-root -mx-2 -my-3">
                                      <Disclosure.Button className="flex items-center justify-between w-full px-2 py-3 text-gray-400 bg-white hover:text-gray-500">
                                        <span className="font-medium text-gray-900">
                                          {section.name}
                                        </span>
                                        <span className="flex items-center ml-6">
                                          {open ? (
                                            <HiMinusSm
                                              className="w-5 h-5"
                                              aria-hidden="true"
                                            />
                                          ) : (
                                            <HiPlusSm
                                              className="w-5 h-5"
                                              aria-hidden="true"
                                            />
                                          )}
                                        </span>
                                      </Disclosure.Button>
                                    </h3>
                                    <Disclosure.Panel className="pt-6">
                                      <div className="space-y-6">
                                        {section.options.map(
                                          (option, optionIdx) => (
                                            <div
                                              key={option.value}
                                              className="flex items-center">
                                              <input
                                                id={`filter-mobile-${section.id}-${optionIdx}`}
                                                name={`${section.id}[]`}
                                                defaultValue={option.value}
                                                type="checkbox"
                                                defaultChecked={option.checked}
                                                className="w-4 h-4 text-indigo-600 rounded focus:ring-indigo-500"
                                              />
                                              <label
                                                htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                                className="flex-1 min-w-0 ml-3 text-gray-500">
                                                {option.label}
                                              </label>
                                            </div>
                                          )
                                        )}
                                      </div>
                                    </Disclosure.Panel>
                                  </>
                                )}
                              </Disclosure>
                            ))}
                          </form>
                        </Dialog.Panel>
                      </Transition.Child>
                    </div>
                  </Dialog>
                </Transition.Root>

                <main className="px-2 mx-auto max-w-7xl">
                  <div className="relative z-10 flex items-baseline justify-between pt-12 pb-6 lg:hidden">
                    <button
                      type="button"
                      className="flex items-center py-2 ml-1 "
                      onClick={() => setMobileFiltersOpen(true)}>
                      <FaFilter className="w-5 h-5 mr-2" aria-hidden="true" />
                      <span className="font-sans font-bold">Filter</span>
                    </button>
                  </div>

                  <section
                    aria-labelledby="products-heading"
                    className="pb-24 lg:pt-16">
                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-x-8 gap-y-10">
                      {/* Filters */}
                      <form className="hidden lg:block">
                        <div className="sticky top-36">
                          {filters.map((section, index) => (
                            <Disclosure
                              as="div"
                              key={section.id}
                              defaultOpen={index === 0}
                              className="pb-6">
                              {({ open }) => (
                                <>
                                  <h3 className="flow-root -my-3">
                                    <Disclosure.Button className="flex items-center justify-between w-full py-3 font-sans text-xl font-bold uppercase">
                                      <span>{section.name}</span>
                                      <span className="flex items-center ml-6">
                                        {open ? (
                                          <HiMinusSm
                                            className="w-5 h-5"
                                            aria-hidden="true"
                                          />
                                        ) : (
                                          <HiPlusSm
                                            className="w-5 h-5"
                                            aria-hidden="true"
                                          />
                                        )}
                                      </span>
                                    </Disclosure.Button>
                                  </h3>
                                  <Disclosure.Panel className="pt-6">
                                    <div className="space-y-4">
                                      {section.options.map(
                                        (option, optionIdx) => (
                                          <div
                                            key={option.value}
                                            className="flex items-center">
                                            <input
                                              id={`filter-${section.id}-${optionIdx}`}
                                              name={`${section.id}[]`}
                                              defaultValue={option.value}
                                              type="checkbox"
                                              defaultChecked={option.checked}
                                              className="w-4 h-4 text-indigo-600 rounded focus:ring-indigo-500"
                                            />
                                            <label
                                              htmlFor={`filter-${section.id}-${optionIdx}`}
                                              className="ml-3">
                                              {option.label}
                                            </label>
                                          </div>
                                        )
                                      )}
                                    </div>
                                  </Disclosure.Panel>
                                </>
                              )}
                            </Disclosure>
                          ))}
                        </div>
                      </form>

                      {/* Product grid */}
                      <div className="pt-2 lg:col-span-4">
                        <div className="grid grid-cols-2 gap-6 md:grid-cols-3 xl:grid-cols-4 ">
                          {[...new Array(100)].map((item, index) => {
                            return (
                              <a
                                href="#"
                                key={index}
                                className="text-center transition bg-white hover:scale-105">
                                <img src="https://via.placeholder.com/300X300" />
                                <div className="pt-2 text-left">
                                  <h3 className="font-sans font-bold uppercase text-neutral-800">
                                    #358
                                  </h3>
                                </div>
                              </a>
                            )
                          })}
                        </div>
                      </div>
                    </div>
                  </section>
                </main>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Collection
