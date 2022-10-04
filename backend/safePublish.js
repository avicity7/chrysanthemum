const Web3 = require("web3");
require('dotenv').config();
const abi = [
	{
		"inputs": [],
		"name": "retrieve",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "dt",
				"type": "string"
			}
		],
		"name": "store",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
]

const web3 = new Web3("https://data-seed-prebsc-1-s1.binance.org:8545/");
const walletAddress = '0x41C806a5e3e81170c9144C9Ce0334e0297241Ce4';

async function send (data,address) {
    var userContract = new web3.eth.Contract(abi,address);
    web3.eth.accounts.wallet.add(process.env.PRIVATE_KEY);
    return await userContract.methods.store(data).send({from: walletAddress, gas: 1000000})
}

async function retrieve(address) {
    var userContract =  new web3.eth.Contract(abi,address);
    return await userContract.methods.retrieve().call()
}

module.exports = {
    send,
    retrieve,
};
// Editing user data 
//send("testString3","0xD1B59E30Ce1Cea72A607EBf6141109bce89207E8");

// Retrieving user data 
/*
let userData = retrieve("0xD1B59E30Ce1Cea72A607EBf6141109bce89207E8");

userData.then(function(result) {
    console.log(result)
})
*/

//Getting data from this file
/*
import { send, retrieve } from './backend/safePublish';
import {useState} from 'react';

const [userDataRetrieved, setUserData] = useState("");
  let userData = retrieve("0xD1B59E30Ce1Cea72A607EBf6141109bce89207E8");

  userData.then(function(result) {
      setUserData(result);
  })

  return (
    <View style = {styles.container}>
      <Text>{userDataRetrieved}</Text>
    </View>
  );
*/