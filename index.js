const express = require("express");
const app = express();
const port = 80;
const fetch = require("node-fetch");
const TARGET_SERVER = 'ec2-35-177-40-202.eu-west-2.compute.amazonaws.com'

app.get("/*", async (req, res) => {
  let request = req.originalUrl;
  console.log(`:: GET ${request}`);
  let attemptsLeft = 2;
  let upstreamResponse;
  while (attemptsLeft > 0) {
    let upstream = `http://${TARGET_SERVER}${request}`;
    console.log(`:: Attempt ${2 - attemptsLeft}: ${upstream}`);
    attemptsLeft = attemptsLeft - 1;
    upstreamResponse = await fetch(upstream, {
      headers: { Authorization: req.header("Authorization") },
    });
    if (upstreamResponse.ok) {
      let text = await upstreamResponse.text();
      res
        .header("Content-Type", upstreamResponse.headers.get("content-type"))
        .status(upstreamResponse.status)
        .send(text);
      console.log(":: Successful!");
      return;
    }
  }
  console.log(`:: Failed GET ${request}`);
  res.status(upstreamResponse.status).send(await upstreamResponse.text());
});



app.listen(port, () => {
  console.log(`Relay listening at http://localhost:${port}`);
});
