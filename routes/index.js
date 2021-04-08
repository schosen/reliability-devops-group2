var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.redirect("http://ec2-35-177-40-202.eu-west-2.compute.amazonaws.com");
});

module.exports = router;
