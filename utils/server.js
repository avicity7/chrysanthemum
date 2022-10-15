const express = require("express");
const app = express();
const cors = require("cors");
const {
  sendTriage,
  getTransactionHistory,
  getDeviceData,
  decryptData,
} = require("./safePublish");

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.sendStatus(200).end();
});

app.get("/getDeviceData", (req, res) => {
  console.log("getDeviceData received");
  res.setHeader("Content-Type", "application/json");
  let key = getDeviceData();
  key.then(function (result) {
    console.log(result);
    res.end(JSON.stringify({ stats: result }));
  });
});

app.post("/safePublish/sendTriage", (req, res) => {
  console.log("sendTriage received");
  const userAddress = req.body.userAddress;
  res.setHeader("Content-Type", "application/json");
  let key = sendTriage(userAddress);
  key.then(function (result) {
    console.log(result);
    res.end(JSON.stringify({ key: result }));
  });
});

app.post("/safePublish/decryptData", (req, res) => {
  decrypted = []
  console.log("decryptData received!");
  const data = req.body.data;
  const keys = req.body.secretKey;
  res.setHeader("Content-Type", "application/json");
  for (var x = 0;x > keys.length;x++){
    let output = decryptData(data[0+x], keys[keys.length-x]);
    output.then(function (result) {
      decrypted += result;
    });
  }
  res.end(JSON.stringify({ decrypted: decrypted }));
});

app.post("/safePublish/getTransactions", async (req, res) => {
  const userAddress = req.body.userAddress;
  res.setHeader("Content-Type", "application/json");
  if (userAddress === undefined) {
    res.sendStatus(400).end();
  }
  try {
    let transactions = getTransactionHistory(userAddress);
    transactions.then(function (result) {
      res.end(JSON.stringify({ transactions: result }));
    });
  } catch {
    res.sendStatus(400).end();
  }
});

const port = 5000;
app.listen(port, () => {
  console.debug(`Express is running on port ${port}.`);
});
