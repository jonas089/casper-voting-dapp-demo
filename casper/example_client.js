import axios from 'axios';
import pkg from 'casper-js-sdk';
const {CasperClient, RuntimeArgs, CLValueBuilder} = pkg;
import KeyManager from './keymanager.js';

async function call(){
  const client = await new CasperClient("http://78.46.32.13:7777/rpc");
  //const data = {

  //}

  /*
  const runtime_args = RuntimeArgs.fromMap({
    // dummy data
    "sender": CLValueBuilder.string("alice")


      real example -> serialisation happens on backend (express server)
      'from': serialize_any_hash(install_args.senderKey),
      'to': serialize_any_hash(install_args.recipientKey),
      'ids': CLValueBuilder.list([CLValueBuilder.string("0"), CLValueBuilder.string("1")]),
      'amounts': CLValueBuilder.list([CLValueBuilder.u256(5), CLValueBuilder.u256(5)])

  });
  */

  const data = {
    "entry_point": "transfer",
    "sender": "bob",
    "recipient": "alice",
    "amount": 100
  };
  const result = await axios.post("http://127.0.0.1:3001" + "/callWasm",
    data,
    {headers: {'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'}})
    .then((response) => {
        const result = response.data;
        console.log(result);
    })
    .catch((error) => {
        console.log(error);
    });
}

async function await_call(){
  await call();
}

await_call();
