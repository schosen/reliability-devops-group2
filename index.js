const express = require("express");
const app = express();
const port = 80;

var proxy = require("http-proxy").createProxyServer({
  host: "http://ec2-35-177-40-202.eu-west-2.compute.amazonaws.com",
  // port: 80
});
app.use("/", function (req, res, next) {
  proxy.web(
    req,
    res,
    {
      target: "http://ec2-35-177-40-202.eu-west-2.compute.amazonaws.com",
    },
    next
  );
});


// app.get("/", (req, res) => {
// res.redirect("http://ec2-35-177-40-202.eu-west-2.compute.amazonaws.com");
//   });

app.listen(port, () => {
  console.log(`Relay listening at http://localhost:${port}`);
});
