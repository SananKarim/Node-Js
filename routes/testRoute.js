const express = require("express");
const blogController = require("../controllers/blogcontroller");
const testController = require("../controllers/test");
const router = express.Router();

router.get("/", testController.testIndex);

module.exports = router;
