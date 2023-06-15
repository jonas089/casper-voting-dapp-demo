import http from 'http';
import cors from 'cors';
import express from 'express';
import path from 'path';
import {fileURLToPath} from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
let port = 3001;
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname + 'public/static'));
var httpServer = http.createServer(app);
httpServer.listen(port, () => {console.log("Casper server running on: ", port);});


app.post('/callWasm', async(req, res) => {
  console.log(req.body);
  await res.send("Ok.");
})

// standard template to invoke a contract
async function call_contract(args, runtime_args){
    const client = new CasperClient(args.nodeHost);
    let contract = new Contracts.Contract(client);
    contract.setContractHash(args.contractHash);
    let keymanager = new KeyManager(args.binPath);
    const req = contract.callEntrypoint(args.entryPoint, runtime_args,  public_key_bytes(args.pubHex), args.chainName, args.paymentAmount, [], 10000000);
    const signedDeploy = DeployUtil.signDeploy(req, keymanager.asymmetricKeyPair());
    const result = signedDeploy.send(args.nodeHost).then((res) => {
      console.log("Deploy Result: ", res);
      return res;
    }).catch((error) => {
      console.log("Error: ", error);
      return error;
    });
    return result;
}


/* Casper Wallet integration


const CasperWalletProvider = window.CasperWalletProvider;
const provider = CasperWalletProvider();
provider
  .sign(JSON.stringify(deployJson), accountPublicKey)
  .then(res => {
    if (res.cancelled) {
      alert('Sign cancelled');
    } else {
      const signedDeploy = DeployUtil.setSignature(
        deploy,
        res.signature,
        CLPublicKey.fromHex(accountPublicKey)
      );
      alert('Sign successful: ' + JSON.stringify(signedDeploy, null, 2));
    }
  })
  .catch(err => {
    alert('Error: ' + err);
  });
  
*/