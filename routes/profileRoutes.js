const express = require('express');
const router = express.Router();

const {getProfile } = require("../controllers/uploadController");
router.get("/", getProfile)

module.exports = router;