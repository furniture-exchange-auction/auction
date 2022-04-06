import { useState } from 'react'
import { StarIcon } from '@heroicons/react/solid'
import { RadioGroup } from '@headlessui/react'

const product = {
  name: 'Lucious Leather Beauty',
  price: '$250',
  href: '#',
  images: [
    {
      src: 'https://i.ibb.co/yXfbTBS/Screen-Shot-2022-04-06-at-5-29-38-PM.png',
      alt: 'Two each of gray, white, and black shirts laying flat.',
    },
  ],
  description:
    "Oh, buddy. This is the couch of a lifetime. A Lifetime of couch. Only getting rid of it because it reminds me of my ex-wife. She left me for my brother 4 months ago and I haven't been the same since. Don't miss out on this opportunity like I missed out on mine ",
  seller:
    'A stupid, stupid man',
}
function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Details() {

  return (
    <div className="bg-white w-full">
      <div className="pt-6">
        <nav aria-label="Breadcrumb">
          <ol role="list" className="max-w-2xl mx-auto px-4 flex items-center space-x-2 sm:px-6 lg:max-w-7xl lg:px-8">
            <h1 className="mr-2 text-sm font-medium text-gray-900">{product.name}
            </h1>
          </ol>
        </nav>

        {/* Image gallery */}
        <div className="mt-6 max-w-2xl mx-auto sm:px-6 lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-3 lg:gap-x-8">
          <div className="hidden aspect-w-3 aspect-h-4 rounded-lg overflow-hidden lg:block">
            <img
              src={product.images[0].src}
              alt={product.images[0].alt}
              className="w-full h-full object-center object-cover"
            />
          </div>
          
        </div>

        {/* Product info */}
        <div className="max-w-2xl mx-auto pt-10 pb-16 px-4 sm:px-6 lg:max-w-7xl lg:pt-16 lg:pb-24 lg:px-8 lg:grid lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8">
          <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
            <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">{product.name}</h1>
          </div>

          {/* Options */}
          <div className="mt-4 lg:mt-0 lg:row-span-3">
            <h2 className="sr-only">Product information</h2>
            <p className="text-3xl text-gray-900">{product.price}</p>

            

            <form className="mt-10">
              <div className="form-control">
                <label className="label">
                    <span className="label-text">Your Bid:</span>
                </label>
                <label className="input-group">
                    <input type="text" placeholder="260" className="input input-bordered"/>
                </label>
              </div>
              <button
                type="submit"
                className="mt-10 w-full bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Bid
              </button>
            </form>
          </div>

          <div className="py-10 lg:pt-6 lg:pb-16 lg:col-start-1 lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
            {/* Description and details */}
            <div>
              <h3 className="sr-only">Description</h3>
              <div className="space-y-6">
                <p className="text-base text-gray-900">{product.description}</p>
              </div>
            </div>
            <div className="mt-10">
              <h2 className="text-sm font-medium text-gray-900">Sold by</h2>

              <div className="mt-4 space-y-6">
                <p className="text-sm text-gray-600">{product.seller}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
