const { CasperClient, Contracts, DeployUtil } = require("casper-js-sdk");
const { public_key_bytes } = require('./types');
const { KeyManager } = require('./keymanager');

// React frontend constructs args and sends a post request to the node.js backend
// example:


/*
1. Node.js:


async function Server(){
  const app = express();
  app.use(cors());
  app.use(express.json());
  app.use(express.static(__dirname + 'public/static'));
  var httpServer = http.createServer(app);
  httpServer.listen(server_port, () => {console.log("Running HTTP on ", server_port);});


  app.post('/ids', async (req, res) => {
    try{
      writeAnalytics();
    }
    catch(e){
      writeLog(`[E2]->${e}`);
    }
    try{
      const peer = req.body.peer;
      const node_addr = `http://${peer}:${node_rpc_port.toString()}/rpc/`;
      const account_hash = req.body.account_hash;
      const client = await new CasperClient(node_addr);
      let owned = [];
      var cep78_contract_instance = new Contracts.Contract(client);
      cep78_contract_instance.setContractHash(cep78_contract_hash);
      const result = await cep78_contract_instance.queryContractDictionary(
        "owned_tokens", // hardcoded as part of NFT standard.
        account_hash
      )
      .then(response => {
        for (let i = 0; i < response.data.length; i++){
          owned.push(response.data[i].data);
        };
        return owned;
      })
      .catch(error => {
        const e = "Failed to find base key at path"
        if (error.toString().includes(e.toString())) {
          //console.log("Account does not own any tokens");
        }
        else{
          console.log("Connection Error.");
          writeLog(`[E1]->${error}`);
        }
        return []
      })
      await res.send(owned);
    }
    catch(e){
      writeLog(`[E2]->${e}`);
      await res.send(e);
    }
  });


2. Frontend:

import axios from 'axios';
async function getOwnedIds(account_hash, peer){
    const client = await new CasperClient(peer);
    const data = {
      "account_hash": account_hash,
      "peer": peer
    }
    const owned = await axios.post(base_url + "/ids",
    data,
    {headers: {'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'}})
    .then((response) => {
        const owned = response.data;
        return owned
    })
    .catch((error) => {
        return null
    });
    return owned;
}


*/

// call any contract entry point
export default async function call_contract(args: any, runtime_args: any){
    const client = new CasperClient(args.nodeHost);
    let contract = new Contracts.Contract(client);
    contract.setContractHash(args.contractHash);
    let keymanager = new KeyManager(args.binPath);
    const req = contract.callEntrypoint(args.entryPoint, runtime_args,  public_key_bytes(args.pubHex), args.chainName, args.paymentAmount, [], 10000000);
    const signedDeploy = DeployUtil.signDeploy(req, keymanager.asymmetricKeyPair());
    const result = signedDeploy.send(args.nodeHost).then((res: any) => {
      console.log("Deploy Result: ", res);
      return res;
    }).catch((error: any) => {
      console.log("Error: ", error);
      return error;
    });
    return result;
}

// runtime args
const runtime_args = RuntimeArgs.fromMap({
    'id': CLValueBuilder.string(install_args.tokenId),
    'amount': CLValueBuilder.u256(install_args.mintAmount),
    'to': serialize_any_hash(install_args.recipientKey)
});

// runtime args & list
const runtime_args = RuntimeArgs.fromMap({
    'from': serialize_any_hash(install_args.senderKey),
    'to': serialize_any_hash(install_args.recipientKey),
    'ids': CLValueBuilder.list([CLValueBuilder.string("0"), CLValueBuilder.string("1")]),
    'amounts': CLValueBuilder.list([CLValueBuilder.u256(5), CLValueBuilder.u256(5)])
});

// custom KeyManager
const { Keys, CLPublicKey } = require("casper-js-sdk");
const fs = require("fs");

export class KeyManager{
    public path: string;
    constructor (path: string){
      this.path = path;
    }
    updateKeyPath(path: string){
      this.path = path;
    }
    newKeys(){
      const k = Keys.Ed25519.new();
      let public_key = k.exportPublicKeyInPem();
      let private_key = k.exportPrivateKeyInPem();
      fs.writeFile(this.path + 'public.pem', public_key, (err: NodeJS.ErrnoException | null) => {
        if (err) {
          console.error(err);
        }
      });
      fs.writeFile(this.path + 'secret_key.pem', private_key, (err: NodeJS.ErrnoException | null) => {
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


// alternative to using KeyManager -> using just the secret_key.pem file
const {Keys} = require("casper-js-sdk");
const keypair = Keys.Ed25519.loadKeyPairFromPrivateFile(args.secretKey);
// const public_key = keypair.publicKey
