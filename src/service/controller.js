import axios from 'axios';
import {RuntimeArgs, CLValueBuilder, Contracts, CasperClient, DeployUtil, CLPublicKey} from 'casper-js-sdk';

async function vote(activePublicKey, provider){
    const args = RuntimeArgs.fromMap({
        'choice': CLValueBuilder.string("choice_a")
    });
    const clPublicKey = CLPublicKey.fromHex(activePublicKey);
    const client = await new CasperClient("http://");
    const contract = new Contracts.Contract(client);
    contract.setContractHash("hash-");
    const deploy = contract.callEntryPoint("vote", args, clPublicKey, "casper-test", "100000000000", [], 10000000);
    const deployJson = DeployUtil.deployToJson(deploy);
    provider
    .sign(JSON.stringify(deployJson), activePublicKey)
    .then(res => {
      if (res.cancelled) {
        alert('Sign cancelled');
      } else {
        const signedDeploy = DeployUtil.setSignature(
          deploy,
          res.signature,
          clPublicKey
        );
        //alert('Sign successful: ' + JSON.stringify(signedDeploy, null, 2));
        sendSignedDeploy(signedDeploy).then((result) => {
            console.log("Deploy result: ", result);
        })
        .catch((error) => {
            console.log("Deploy Error: ", error);
        });
      }
    })
    .catch(err => {
      alert('Error: ' + err);
    });
}

async function sendSignedDeploy(signedJson){
    try{
      const data = {
        "signedJson": signedJson,
      }
      let res = await axios.post(
        "http://" + "/send",
        data,
        {headers: {'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'}})
        .then((response) => {
            const hash = response.data;
            console.log("Deploy response:", response.data);
            console.log("Parsed Hash: ", hash);
            return hash;
        })
        .catch((error) => {
            console.log("Deploy Error: ", error);
            return error;
        });
        return res;
    }
    catch(error){
      console.log("Axios Error: ", error);
      return error;
    }
}

export{vote};