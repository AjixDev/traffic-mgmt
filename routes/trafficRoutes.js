const express = require("express");
const { handleTrafficRequest } = require("../controllers/trafficController");

const router = express.Router();

router.get("/", handleTrafficRequest);

module.exports = router;
