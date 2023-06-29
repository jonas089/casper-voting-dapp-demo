import axios from 'axios';
import { RuntimeArgs, CLValueBuilder, Contracts, CasperClient, DeployUtil, CLPublicKey } from 'casper-js-sdk';
import { nodeAddress, contractAddress } from './constants/constants';

async function vote(activePublicKey, provider, choice_value){
    const args = RuntimeArgs.fromMap({
        'choice': CLValueBuilder.string(choice_value)
    });
    const clPublicKey = CLPublicKey.fromHex(activePublicKey);
    const client = await new CasperClient(nodeAddress);
    const contract = new Contracts.Contract(client);
    contract.setContractHash(contractAddress);
    const deploy = contract.callEntrypoint("vote", args, clPublicKey, "casper-test", "10000000000", [], 10000000);
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
        sendSignedDeploy(DeployUtil.deployToJson(signedDeploy)).then((result) => {
            console.log("Deploy result: ", result);
            alert('Deploy hash: ' + result);
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

async function getVotes(setVotesA, setVotesB){
  try{
    await console.log("Getting votes...");
    let res = await axios.get("http://127.0.0.1:3002/votes");
    await console.log("Votes: ", res.data[0].hex, res.data[1].hex);
    setVotesA(res.data[0].hex);
    setVotesB(res.data[1].hex);
    return res;
  }
  catch(error){
    console.log("Axios Error: ", error);
    return error;
  }
}

async function sendSignedDeploy(signedJson){
    try{
      const data = {
        "signedJson": signedJson,
      }
      let res = await axios.post(
        "http://127.0.0.1:3002/send",
        data,
        {headers: {'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'}})
        .then((response) => {
            const hash = response.data;
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

export{vote, getVotes};