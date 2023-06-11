import pkg from 'casper-js-sdk';
const {CLPublicKey, Keys} = pkg;
import fs from 'fs';

export default class KeyManager{
    constructor (path){
      this.path = path;
    }
    updateKeyPath(path){
      this.path = path;
    }
    newKeys(){
      const k = Keys.Ed25519.new();
      let public_key = k.exportPublicKeyInPem();
      let private_key = k.exportPrivateKeyInPem();
      fs.writeFile(this.path + 'public.pem', public_key, err => {
        if (err) {
          console.error(err);
        }
      });
      fs.writeFile(this.path + 'secret_key.pem', private_key, err => {
        if (err) {
          console.error(err);
        }
      });
    }
    asymmetricKeyPair(){
      return Keys.Ed25519.parseKeyFiles(this.path + 'public.pem', this.path + 'secret_key.pem');
    }
    publicKeyHex(){
      return CLPublicKey.fromEd25519(Keys.Ed25519.parsePublicKeyFile(this.path + 'public.pem')).toHex();
    }
}
