const express = require("express");
const app = express();
const cors = require("cors");
const {send, getTransactionHistory} = require("./safePublish");

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    res.sendStatus(200).end();
});

app.post("/safePublish/getTransactions", async (req, res) => {
    const userAddress = req.body.userAddress;
    res.setHeader("Content-Type", "application/json");
    if (userAddress === undefined) {
      res.sendStatus(400).end();
    }
    try {
      let transactions = getTransactionHistory(userAddress);
      transactions.then(function(result){
        res.end(JSON.stringify({ transactions: transactions }));
      })
    } catch {
      res.sendStatus(400).end();
    }
});


const port = 5000;
app.listen(port, () => {
    console.debug(`Express is running on port ${port}.`);
});

