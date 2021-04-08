const express = require("express");
const app = express();
const port = 80;
app.get("/", (req, res) => {
  res.redirect("http://ec2-35-177-40-202.eu-west-2.compute.amazonaws.com");
});
app.listen(port, () => {
  console.log(`Relay listening at http://localhost:${port}`);
});
