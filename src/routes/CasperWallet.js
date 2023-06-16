import { useEffect, useState } from 'react';

const useWallet = () => {
  const [isConnected, setIsConnected] = useState(undefined);
  const [isLocked, setIsLocked] = useState(undefined);
  const [activePublicKey, setActivePublicKey] = useState(undefined);
  const [provider, setProvider] = useState(undefined);

  // check connection on provider change
  useEffect(() => {
    if (window.CasperWalletProvider) {
      const provider = window.CasperWalletProvider();
      setProvider(provider);
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
          setIsConnected(false);
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

  return { isConnected, activePublicKey, isLocked, provider };
};

export default useWallet;