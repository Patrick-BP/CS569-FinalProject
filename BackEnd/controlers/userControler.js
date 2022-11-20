const userModele = require("../models/usersModel");
const bcrypt = require("bcrypt");
const saltRounds = 3;
const jwt = require("jsonwebtoken");

const { PRIVATE_KEY } = require("../config.json");

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await userModele.findOne({ email });
    if (!user) throw new Error("user not found");
    const match = bcrypt.compare(password, user.password);
    if (!match) throw new Error("wrong password");
    const token = { user_id:user._id, fullname:user.fullname, email: user.email };
    const tokenHah = jwt.sign(token, PRIVATE_KEY);
    res.json({ success: true, data: tokenHah });
  } catch (e) {
    next(e);
  }
};

exports.signup = async (req, res, next) => {
  try {
    console.log(req.file);
    const { email, fullname, password } = req.body;
    const hash = await bcrypt.hash(password, saltRounds);
    const result = await userModele.create({ ...req.body, password: hash });

    res.json({ success: true, data: result });
  } catch (e) {
    // next(e)
    res.json({ success: false, error: "fail to signup" });
  }
};
