const Web3 = require("web3");
const https = require("https");
var CryptoJS = require("crypto-js");
var MersenneTwister = require("mersenne-twister");
var generator = new MersenneTwister();
require("dotenv").config();

const abi = [
  {
    inputs: [],
    name: "retrieve",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "dt",
        type: "string",
      },
    ],
    name: "store",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];
const web3 = new Web3("https://data-seed-prebsc-1-s1.binance.org:8545/");
const walletAddress = "0x41C806a5e3e81170c9144C9Ce0334e0297241Ce4";
const contractAddress = "0xD1B59E30Ce1Cea72A607EBf6141109bce89207E8";
var secretKey = "";
var data = "";

function generateSecretKey() {
  var secretKey = "";
  for (var x = 0; x < 32; x++) {
    secretKey += String.fromCharCode(generator.random() * (126 - 33) + 33);
  }
  return secretKey;
}

function encryptData(data) {
  secretKey = generateSecretKey();
  data = CryptoJS.AES.encrypt(data, secretKey);

  return [data.toString(), secretKey];
}

async function decryptData(data, keys) {
  output = "";
  for (var x = 0; x < keys.length; x++) {
    console.log(x);
    console.log(keys[keys.length - (1 + x)]);
    console.log(data[x]);
    console.log(
      CryptoJS.AES.decrypt(data[x], keys[keys.length - (1 + x)]).toString(
        CryptoJS.enc.Utf8
      )
    );
    output +=
      CryptoJS.AES.decrypt(data[x], keys[keys.length - (1 + x)]).toString(
        CryptoJS.enc.Utf8
      ) + "BREAK";
  }
  return output;
}

async function send(data, address) {
  var userContract = new web3.eth.Contract(abi, address);
  web3.eth.accounts.wallet.add(process.env.PRIVATE_KEY);
  return await userContract.methods
    .store(data)
    .send({ from: walletAddress, gas: 2000000 });
}

async function sendTriage(address) {
  const bpm = Math.ceil(generator.random() * (140 - 70) + 70);
  const temp =
    Math.floor(generator.random() * (38 - 36) + 36) +
    "." +
    Math.ceil(generator.random() * (9 - 1) + 1);
  const sp02 = Math.ceil(generator.random() * (100 - 95) + 95) + "%";
  return new Promise((resolve) => {
    let encrypted = encryptData(bpm + "^" + temp + "^" + sp02);
    let key = send(encrypted[0], address);
    key.then(function () {
      console.log(encrypted[1] + "safePublish.js");
      resolve(encrypted[1]);
    });
  });
}

async function getDeviceData() {
  const bpm = Math.ceil(generator.random() * (140 - 70) + 70);
  const temp =
    Math.floor(generator.random() * (38 - 36) + 36) +
    "." +
    Math.ceil(generator.random() * (9 - 1) + 1);
  const sp02 = Math.ceil(generator.random() * (100 - 95) + 95) + "%";
  return bpm + "^" + temp + "^" + sp02;
}

function removeTransactionHeaders(result) {
  var temp = "0x";
  for (var x = 138; x < result.length; x++) {
    temp += result[x];
  }

  return temp;
}

async function getTransactionHistory(wallet) {
  let url =
    "https://api-testnet.bscscan.com/api?module=account&action=txlist&address=" +
    wallet +
    "&startblock=0&endblock=99999999&page=1&offset=10&sort=asc&apikey=YourApiKeyToken";
  return new Promise((resolve) => {
    var temp = [];
    https
      .get(url, (res) => {
        let body = "";

        res.on("data", (chunk) => {
          body += chunk;
        });

        res.on("end", () => {
          try {
            let json = JSON.parse(body);
            for (var tx = json.result.length - 1; tx > 0; tx--) {
              temp.push(
                Web3.utils.toUtf8(
                  removeTransactionHeaders(json.result[tx].input)
                )
              );
            }
          } catch (error) {
            console.error(error.message);
          }

          resolve(temp);
        });
      })
      .on("error", (error) => {
        console.error(error.message);
      });
  });
}

module.exports = {
  send,
  encryptData,
  getTransactionHistory,
  removeTransactionHeaders,
  sendTriage,
  getDeviceData,
  decryptData,
};

//Encrypting + Decrypting Data
/*
data = encryptData("hey does this keep spaces?")
console.log(data);
console.log(secretKey);
console.log(CryptoJS.AES.decrypt(data,secretKey).toString(CryptoJS.enc.Utf8));
*/

// Editing user data
//send("testString4","0xD1B59E30Ce1Cea72A607EBf6141109bce89207E8");

//Getting data from user/contract
/*
str = getTransactionHistory(address);

str.then(function(result) {
    console.log(result);
});
*/
