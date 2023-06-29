# Voting Dapp built on Casper - a reusable React template
This template is a great starting point for Dapp development on Casper using the React framework with functional components.

## Info
The `server` folder contains a node.js backend to deploy and query a Casper network and the `service` folder houses a component to interact with and monitor the state of the Casper Wallet plugin. The `controller` constructs and forwards deploys and queries to the backend `server`.

Additionally, Tailwind is imported and components can be used out of the box. A Tailwind Navbar can be found in `components` and routes can easily be added.

```
 ██████╗ █████╗ ███████╗██████╗ ███████╗██████╗     ██╗  ██╗    ██████╗ ███████╗ █████╗  ██████╗████████╗ 
██╔════╝██╔══██╗██╔════╝██╔══██╗██╔════╝██╔══██╗    ╚██╗██╔╝    ██╔══██╗██╔════╝██╔══██╗██╔════╝╚══██╔══╝   
██║     ███████║███████╗██████╔╝█████╗  ██████╔╝     ╚███╔╝     ██████╔╝█████╗  ███████║██║        ██║ 
██║     ██╔══██║╚════██║██╔═══╝ ██╔══╝  ██╔══██╗     ██╔██╗     ██╔══██╗██╔══╝  ██╔══██║██║        ██║  
╚██████╗██║  ██║███████║██║     ███████╗██║  ██║    ██╔╝ ██╗    ██║  ██║███████╗██║  ██║╚██████╗   ██║
 ╚═════╝╚═╝  ╚═╝╚══════╝╚═╝     ╚══════╝╚═╝  ╚═╝    ╚═╝  ╚═╝    ╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝ ╚═════╝   ╚═╝
```

## Host this Dapp locally
```
npm install 
cd server && npm install
./start_local.sh
```

-> navigate to localhost:3000

## Preview
1. Casper Wallet
![Casper Wallet](https://github.com/jonas089/casper-voting-dapp-and-template/blob/master/github-resources/desktop-full-1.png)

2. Voting
![Voting Dapp](https://github.com/jonas089/casper-voting-dapp-and-template/blob/master/github-resources/desktop-full-2.png)

3. Tailwind & Navbar
![NavBar](https://github.com/jonas089/casper-voting-dapp-and-template/blob/master/github-resources/desktop-sm.png)


