import express, { json } from 'express';
import cors from 'cors';
import http from 'http';
import pkg from 'casper-js-sdk';
import path from 'path';
const {Contracts, CasperClient, DeployUtil} = pkg;
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import { nodeAddress } from '../src/service/constants/constants.js';

async function Server(){
    const app = express();
    app.use(cors());
    app.use(express.json());
    app.use(express.static(__dirname + 'public/static'));
    var httpServer = http.createServer(app);
    httpServer.listen(3002, () => {console.log("Running HTTP on: ", 3002);});
    app.post('/send', async(req, res) => {
        try{
            const signedJson = req.body.signedJson;
            let signedDeploy = DeployUtil.deployFromJson(signedJson).unwrap();
            await signedDeploy.send(nodeAddress).then((response) => {
                console.log("Signed Deploy: ", signedDeploy);
                console.log("Node response: ", response);
                res.send(response);
            })
            .catch((error) => {
                console.log("Error in send: ", error);
                res.send(error);
            })
        }
        catch(error){
            console.log("Server Error: ", error);
            res.send(error);
        }
    });
}

Server();