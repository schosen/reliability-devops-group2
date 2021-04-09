const express = require("express");
const app = express();
const port = 80;

//endpoint for tracking
// app.get('/', function(req, res) {
//   console.log(req)
//   req.get({url: `http://ec2-35-177-40-202.eu-west-2.compute.amazonaws.com/${req}`, headers: req.headers});
//   //sendRequestToOtherEndPoint(req);
//   processRequest(req);
//   res.setHeader('Content-Type', 'application/json');
//   res.send('Req OK');
// });

// function sendRequestToOtherEndPoint(req) {
//   //magic here :)
// }

// app.get("/", (req, res) => {
// res.redirect("http://ec2-35-177-40-202.eu-west-2.compute.amazonaws.com");
//   });

app.get("/:url", function (req, res) {
  url = req.params.url;
  console.log(url);
  res.send("url stored");
});

app.listen(port, () => {
  console.log(`Relay listening at http://localhost:${port}`);
});
