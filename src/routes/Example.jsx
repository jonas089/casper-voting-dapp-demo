import { CloudArrowUpIcon, LockClosedIcon, ServerIcon } from '@heroicons/react/20/solid'
import useWallet from './CasperWallet';

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
    <div className="overflow-hidden bg-white py-24 sm:py-32">
      <button onClick={fnConnect}>Connect</button>
      <h1>Active Public Key: {activePublicKey}</h1>
      <h1>Connected: {isConnected !== undefined ? isConnected.toString() : "undefined"}</h1>
      <h1>Lock: {isLocked !== undefined ? isLocked.toString() : "undefined"}</h1>
    </div>
  )
}
