const Web3 = require("web3");
const https = require("https");
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
const contractAddress = "0xD1B59E30Ce1Cea72A607EBf6141109bce89207E8";

async function send (data,address) {
    var userContract = new web3.eth.Contract(abi,address);
    web3.eth.accounts.wallet.add(process.env.PRIVATE_KEY);
    return await userContract.methods.store(data).send({from: walletAddress, gas: 1000000})
}

async function retrieve(address) {
    var userContract =  new web3.eth.Contract(abi,address);
    return await userContract.methods.retrieve().call()
}

function removeTransactionHeaders(result) {
	var temp = "0x";
	for (var x = 138; x<result.length; x++){
		temp += result[x]
	}	
		
	return temp
}



function getTransactionHistory(wallet) {
	let url = "https://api-testnet.bscscan.com/api?module=account&action=txlist&address=0xD1B59E30Ce1Cea72A607EBf6141109bce89207E8&startblock=0&endblock=99999999&page=1&offset=10&sort=asc&apikey=YourApiKeyToken";
	https.get(url,(res) => {
		let body = "";
	
		res.on("data", (chunk) => {
			body += chunk;
		});
	
		res.on("end", () => {
			try {
				let json = JSON.parse(body);
				for (var tx = json.result.length - 1; tx > 0; tx--) {
					console.log(Web3.utils.toUtf8(removeTransactionHeaders(json.result[tx].input)));
				}
			} catch (error) {
				console.error(error.message);
			};
		});
	
	}).on("error", (error) => {
		console.error(error.message);
	});

}

module.exports = {
    send,
    retrieve,
};

getTransactionHistory();
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