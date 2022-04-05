import { Fragment, useState } from 'react'
import { Dialog, Disclosure, Menu, Transition } from '@headlessui/react'
import ProductList from '../components/ProductList'

const subCategories = [
  { name: 'Newest', href: '#' },
  { name: 'Expiring', href: '#' },
  { name: 'Price: Low to High', href: '#' },
  { name: 'Price: High to Low', href: '#' },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Sidebar() {
  return (
    <div className="bg-white">
      <div>
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative z-10 flex items-baseline justify-between pt-6 pb-6 border-b border-gray-200">
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">Most Popular</h1>
            <div className="flex items-center">
              <Menu as="div" className="relative inline-block text-left">
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="origin-top-right absolute right-0 mt-2 w-40 rounded-md shadow-2xl bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>
          </div>

          <section aria-labelledby="products-heading" className="pt-6 pb-24">
            <h2 id="products-heading" className="sr-only">
              Products
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-x-8 gap-y-10">
              {/* Filters */}
              <form className="hidden lg:block">
                <h3 className="sr-only">Categories</h3>
                <ul role="list" className="text-sm font-medium text-gray-900 space-y-4 pb-6 border-b border-gray-200">
                  {subCategories.map((category) => (
                    <li key={category.name}>
                      <a href={category.href}>{category.name}</a>
                    </li>
                  ))}
                </ul>
              </form>
              {/* Product grid */}
              <div className="lg:col-span-3">
                <ProductList />
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}
