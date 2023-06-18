import { useEffect, useState } from 'react';
import { CloudArrowUpIcon, LockClosedIcon, ServerIcon } from '@heroicons/react/20/solid'
import { useWallet } from '../service/CasperWallet';
import { vote } from '../service/controller';
const features = [
  {
    name: 'Push to deploy.',
    description:
      'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.',
    icon: CloudArrowUpIcon,
  },
  {
    name: 'SSL certificates.',
    description: 'Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo.',
    icon: LockClosedIcon,
  },
  {
    name: 'Database backups.',
    description: 'Ac tincidunt sapien vehicula erat auctor pellentesque rhoncus. Et magna sit morbi lobortis.',
    icon: ServerIcon,
  },
]


export default function Example() {
  const { isConnected, provider, activePublicKey, isLocked, fnConnect } = useWallet();
  return (
    <div>
        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-red-500 sm:text-6xl pb-5">
              C A S P E R
            </h1>

            <div className="mb-8 whitespace-normal break-all">
                <div className="relative rounded-full px-3 py-1 text-sm sm:text-base lg:text-lg leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
                  Account: {activePublicKey === undefined ? "Not connected!" : activePublicKey}
                </div>
            </div>

            <p className="mt-6 text-lg leading-8 text-gray-600">
              {isLocked && <h1>Your Casper Wallet is locked! <br/> <button onClick={fnConnect} className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">Unlock</button></h1>}
              <br />
            </p>

            <div className="mt-10 flex items-center justify-center gap-x-6">
            <button onClick={fnConnect} className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">Connect Wallet</button>
              <a href="#" className="text-sm font-semibold leading-6 text-gray-900">
                Learn more <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>

        <div className="relative bg-gray-800 px-6 py-16 sm:px-12 sm:py-20 lg:px-16">
          <div className="absolute inset-0 overflow-hidden">
            <img
              src="https://blockworks.co/_next/image?url=https%3A%2F%2Fblockworks-co.imgix.net%2Fwp-content%2Fuploads%2F2023%2F02%2Fblockchain-scaling.jpg&w=1920&q=75"
              alt=""
              className="h-full w-full object-cover object-center"
            />
          </div>
          <div aria-hidden="true" className="absolute inset-0 bg-gray-900 bg-opacity-50" />
          <div className="relative bg-gray-800 px-6 py-16 sm:px-12 sm:py-20 lg:px-16">
          
          <div className="absolute inset-0 overflow-hidden">
            <img
              src="https://blockworks.co/_next/image?url=https%3A%2F%2Fblockworks-co.imgix.net%2Fwp-content%2Fuploads%2F2023%2F02%2Fblockchain-scaling.jpg&w=1920&q=75"
              alt=""
              className="h-full w-full object-cover object-center"
            />
          </div>
          <div aria-hidden="true" className="absolute inset-0 bg-gray-900 bg-opacity-50" />
            <div className="relative mx-auto flex max-w-3xl flex-col items-center text-center">
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Blockchain Voting</h2>
              <p className="mt-3 py-5 text-xl text-white">
                Please choose an option
              </p>

              <div className="flex justify-center space-x-10">
                <button
                  onClick={() => {vote(activePublicKey, provider)}}
                  className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  Option 1
                </button>
                <button
                  onClick={fnConnect}
                  className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  Option 1
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
)}
//onClick={() => vote(activePublicKey, provider)}