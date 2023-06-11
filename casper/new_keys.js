import KeyManager from './keymanager.js';
function createKeys(){
  let keymanager = new KeyManager('./');
  keymanager.newKeys();
}
createKeys();
