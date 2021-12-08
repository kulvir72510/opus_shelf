const express = require("express");
const jwt = require("jsonwebtoken");

const router = express.Router();
require("../db/conn");
const bcrypt = require("bcrypt");
const User = require("../model/userSchema");
const PUBLIC_CLASS = require("../model/public_classSchema");
router.get("/", (req, res) => {
  res.send("<h1>Home from server<h1>");
});

router.post("/register", async (req, res) => {
  const date = Date(Date.now());
  const { name, email, phone, branch, year, password, cpassword } = req.body;
  if (
    !name ||
    !email ||
    !phone ||
    !branch ||
    !year ||
    !password ||
    !cpassword
  ) {
    return res
      .status(422)
      .json({ error: "Enter all the fields all are mandatory" });
  }

  try {
    const userExist = await User.findOne({ email: email });
    if (userExist) {
      return res
        .status(422)
        .json({ error: "This Email is already registered" });
    } else if (password != cpassword) {
      return res.status(422).json({ error: "Password is not matching" });
    } else {
      const user = new User({
        name,
        email,
        phone,
        branch,
        year,
        password,
        cpassword,
        date,
      });

      const userRegister = await user.save();
      // console.log(userRegister);
      res.status(201).json({ error: "User regeisterd successfully" });
    }
  } catch (err) {
    console.log(err);
  }
});

router.post("/signin", async (req, res) => {
  // res.send("Home from sign in server");
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Please Fill The Data" });
    }
    const userLogin = await User.findOne({ email: email });
    // console.log(userLogin);
    if (userLogin) {
      const isMatch = await bcrypt.compare(password, userLogin.password);
      const token = await userLogin.generateAuthToken();
      console.log(token);
      res.cookie("jwtoken", token, {
        expires: new Date(Date.now() + 25892000000),
        httpOnly: true,
      });
      if (!isMatch) {
        res.status(400).json({ error: "User not find" });
      } else {
        res.json({ message: "User Signed In Successfully" });
      }
    } else {
      res.status(400).json({ error: "User not find" });
    }
  } catch (err) {
    console.log(err);
  }
});

router.post("/publicClass", async (req, res) => {
  const {
    public_classYear,
    public_classBranch,
    public_classSubject,
    public_classFileType,
    public_classDesc,
  } = req.body;

  if (!public_classSubject || !public_classFileType) {
    return res
      .status(422)
      .json({ error: "Enter the fields which are mandatory" });
  }

  try {
    const public_classExist = await PUBLIC_CLASS.findOne({
      public_classSubject: public_classSubject,
    });
    if (public_classExist) {
      return res
        .status(422)
        .json({ error: "This Subject Name is already registered" });
    } else {
      const private_class = new PUBLIC_CLASS({
        public_classYear,
        public_classBranch,
        public_classSubject,
        public_classFileType,
        public_classDesc,
      });

      const private_classRegister = await private_class.save();
      // console.log(userRegister);
      res.status(201).json({ error: "Class created successfully" });
    }
  } catch (err) {
    console.log(err);
  }
});
module.exports = router;
