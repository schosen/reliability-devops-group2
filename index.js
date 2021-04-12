const express = require("express");
const app = express();
const port = 80;
const fetch = require("node-fetch");
const TARGET_SERVER = "ec2-35-177-40-202.eu-west-2.compute.amazonaws.com";
const body = { a: 1 };
app.use(express.json());

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
      console.log(":: Successful GET!");
      return;
    }
  }
  console.log(`:: Failed GET ${request}`);
  res.status(upstreamResponse.status).send(await upstreamResponse.text());
});

app.post("/*", async (req, res) => {
  let request = req.originalUrl;
  console.log(`:: POST ${request}`);
  let attemptsLeft = 4;
  let upstreamResponse;
  while (attemptsLeft > 0) {
    let upstream = `http://${TARGET_SERVER}${request}`;
    console.log(`:: Attempt ${4 - attemptsLeft}: ${upstream}`);
    attemptsLeft = attemptsLeft - 1;
    upstreamResponse = await fetch(upstream, {
      method: "post",
      body: JSON.stringify(req.body),
      headers: {
        'Authorization': req.header('Authorization'),
        'Content-Type': req.header('Content-Type'),
      },
    })
    if (upstreamResponse.ok) {
      let text = await upstreamResponse.text();
      res
        .header("Content-Type", upstreamResponse.headers.get("content-type"))
        .status(upstreamResponse.status)
        .send(text);
      console.log(":: Successful POST!");
      return;
    }
  }
  console.log(`:: Failed POST ${request}`);
  res.status(upstreamResponse.status).send(await upstreamResponse.text());
});

//get.patch
app.patch("/*", async (req, res) => {
  let request = req.originalUrl;
  console.log(`:: PATCH ${request}`);
  let attemptsLeft = 4;
  let upstreamResponse;
  while (attemptsLeft > 0) {
    let upstream = `http://${TARGET_SERVER}${request}`;
    console.log(`:: Attempt ${4 - attemptsLeft}: ${upstream}`);
    attemptsLeft = attemptsLeft - 1;
    upstreamResponse = await fetch(upstream, {
      method: "patch",
      body: JSON.stringify(req.body),
      headers: {
        'Authorization': req.header('Authorization'),
        'Content-Type': req.header('Content-Type'),
      },
    })
    if (upstreamResponse.ok) {
      let text = await upstreamResponse.text();
      res
        .header("Content-Type", upstreamResponse.headers.get("content-type"))
        .status(upstreamResponse.status)
        .send(text);
      console.log(":: Successful PATCH!");
      return;
    }
  }
  console.log(`:: Failed Patch ${request}`);
  res.status(upstreamResponse.status).send(await upstreamResponse.text());
});
//get.delete
app.delete("/*", async (req, res) => {
  let request = req.originalUrl;
  console.log(`:: DELETE ${request}`);
  let attemptsLeft = 4;
  let upstreamResponse;
  while (attemptsLeft > 0) {
    let upstream = `http://${TARGET_SERVER}${request}`;
    console.log(`:: Attempt ${4 - attemptsLeft}: ${upstream}`);
    attemptsLeft = attemptsLeft - 1;
    upstreamResponse = await fetch(upstream, {
      method: "delete",
      body: JSON.stringify(req.body),
      headers: {
        'Authorization': req.header('Authorization'),
        'Content-Type': req.header('Content-Type'),
      },
    })
    if (upstreamResponse.ok) {
      let text = await upstreamResponse.text();
      res
        .header("Content-Type", upstreamResponse.headers.get("content-type"))
        .status(upstreamResponse.status)
        .send(text);
      console.log(":: Successful DELETE!");
      return;
    }
  }
  console.log(`:: Failed Delete ${request}`);
  res.status(upstreamResponse.status).send(await upstreamResponse.text());
});

app.listen(port, () => {
  console.log(`Relay listening at http://localhost:${port}`);
});
