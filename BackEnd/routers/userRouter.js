const express = require("express");

const userControler = require("../controlers/userControler");

const router = express.Router();

router.post("/login", userControler.login);
router.post("/signup", userControler.signup);

module.exports = router;
