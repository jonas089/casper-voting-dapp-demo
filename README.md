# Voting Dapp built on Casper - a reusable React template
This React application is a simple voting app build on Casper. The Casper Wallet plugin is used to sign a transaction where the choice is either Option "A" or Option "B".
The main objective was to successfully integrate with the Casper Wallet Chrome extension and to respond to its event-stream in real time. This voting app does not involve any Identity verification (other than Signatures).

## Live Demo
![demo](https://github.com/jonas089/casper-voting-dapp-and-template/blob/master/demo.gif)

## High-level Mindmap
![Mindmap](https://github.com/jonas089/casper-voting-dapp-and-template/blob/master/mindmap.png)

## Setup
The `server` folder contains a node.js backend to deploy and query a Casper network and the `service` folder houses a component to interact with and monitor the state of the Casper Wallet plugin. The `controller` constructs and forwards deploys and queries to the backend `server`.

**Prerequisite: Casper Wallet chrome plugin & funded Casper account**

## Host this Dapp locally
```
npm install 
cd server && npm install
./start_local.sh
```
-> starts the app on localhost:3000


