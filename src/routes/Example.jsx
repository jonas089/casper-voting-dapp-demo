import { CloudArrowUpIcon, LockClosedIcon, ServerIcon } from '@heroicons/react/20/solid'
import { useEffect, useState } from 'react';

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
  // use hooks to connect plugin and check state
  const [isConnected, setIsConnected] = useState(undefined);
  const [isLocked, setIsLocked] = useState(undefined);
  const [activePublicKey, setActivePublicKey] = useState(undefined);

  // check connection on provider change
  useEffect(() => {
    if (window.CasperWalletProvider) {
      const provider = window.CasperWalletProvider();
      const checkConnection = async () => {
        try {
          const isConnected = await provider.isConnected();
          setIsConnected(isConnected);
        } catch (error) {
          setIsLocked(true);
        }
      };
      checkConnection();
    }
  }, [window.CasperWalletProvider]);

  // monitor and handle events
  useEffect(() => {
    if (window.CasperWalletEventTypes){
      const handleConnected = (event) => {
        try {
          const state = JSON.parse(event.detail);
          if (state.activeKey) {
            setActivePublicKey(state.activeKey);
          }
        } catch (err) {
          console.log(err);
        }
      }
      const handleDisconnected = (event) => {
        try{
          setActivePublicKey('');
        } catch (err) {
          console.log(err);
        }
      }
      const handleLocked = (event) => {
        try {
          const state = JSON.parse(event.detail);
          setIsLocked(true);
        } catch (err) {
          console.log(err);
        }
      }
      const handleUnlocked = (event) => {
        try {
          const state = JSON.parse(event.detail);
          setIsConnected(state.isConnected);
          setIsLocked(false);
          console.log("Connection as per Unlock event: ", state.isConnected);
        } catch (err) {
          console.log(err);
        } 
      }
      window.addEventListener(window.CasperWalletEventTypes.Connected, handleConnected);
      window.addEventListener(window.CasperWalletEventTypes.Disconnected, handleDisconnected);
      window.addEventListener(window.CasperWalletEventTypes.Locked, handleLocked);
      window.addEventListener(window.CasperWalletEventTypes.Unlocked, handleUnlocked);
      return () => {
        window.removeEventListener(
          window.CasperWalletEventTypes.Connected,
          handleConnected
        );
        window.removeEventListener(
          window.CasperWalletEventTypes.Locked,
          handleLocked
        );
      };
    }
  }, [window.CasperWalletEventTypes])

  useEffect(() => {
    console.log("Active key: ", activePublicKey);
  }, [activePublicKey])

  useEffect(() => {
    if (window.CasperWalletProvider){
      const provider = window.CasperWalletProvider();
      if (isConnected == false){
        provider.requestConnection();
      }
      else if (isConnected == true && isLocked != true){
        async function getPublicKey(){
          const publicKey = await provider.getActivePublicKey();
          setActivePublicKey(publicKey);
        }
        getPublicKey();
      }
    }
    console.log("Connection status: ", isConnected);
  }, [isConnected])

  useEffect(() => {
    if (window.CasperWalletProvider && isLocked == false){
      const provider = window.CasperWalletProvider();
      if (isConnected == false){
        provider.requestConnection();
      }
      else{
        // wallet is connected and just got unlocked => when the page was visited the wallet was locked
        async function getPublicKey(){
          const publicKey = await provider.getActivePublicKey();
          setActivePublicKey(publicKey);
        }
        getPublicKey();
      }
    }
    console.log("Is Locked: ", isLocked);
  }, [isLocked])

  return (
    <div className="overflow-hidden bg-white py-24 sm:py-32">
      <h1>Active Public Key: {activePublicKey}</h1>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          <div className="lg:pr-8 lg:pt-4">
            <div className="lg:max-w-lg">
              <h2 className="text-base font-semibold leading-7 text-indigo-600">Deploy faster</h2>
              <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Functional Component Example 1</p>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque,
                iste dolor cupiditate blanditiis ratione.
              </p>
              <dl className="mt-10 max-w-xl space-y-8 text-base leading-7 text-gray-600 lg:max-w-none">
                {features.map((feature) => (
                  <div key={feature.name} className="relative pl-9">
                    <dt className="inline font-semibold text-gray-900">
                      <feature.icon className="absolute left-1 top-1 h-5 w-5 text-indigo-600" aria-hidden="true" />
                      {feature.name}
                    </dt>{' '}
                    <dd className="inline">{feature.description}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
          <img
            src="https://tailwindui.com/img/component-images/dark-project-app-screenshot.png"
            alt="Product screenshot"
            className="w-[48rem] max-w-none rounded-xl shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem] md:-ml-4 lg:-ml-0"
            width={2432}
            height={1442}
          />
        </div>
      </div>
    </div>
  )
}
