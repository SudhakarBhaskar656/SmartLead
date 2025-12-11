const express = require("express");
const router = express.Router();
const { processNames, getAllLeads } = require("../controller/leadController");

router.post("/process", processNames);
router.get("/leads", getAllLeads);

module.exports = router;
