const express = require("express");
const {
  retrieveOriginal,
  refreshMapping,
} = require("../controllers/mappingController");

const router = express.Router();

router.get("/retrieve_original", retrieveOriginal);
router.post("/refresh", refreshMapping);

module.exports = router;
