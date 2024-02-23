const express = require("express");
const cors = require("cors");
const User = require("./models/User");
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const app = express();
const saltRounds = 10; // Number of salt rounds for bcrypt
const secret = "dsaofijsadfgsdfg2354fg123s1465sd4gf4dfgsdfg313sd4gf";
mongoose.connect(
  "mongodb+srv://ranjeet843507:ranjeetadmin@mern-blog.gfjegnj.mongodb.net/"
);

app.use(cors({credentials:true, origin:"http://localhost:3000"}));
app.use(express.json());

app.post("/register", async (req, res) => {
  const { username, password } = req.body;

  try {
    const salt = bcrypt.genSaltSync(saltRounds);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const userDoc = await User.create({
      username,
      password: hashedPassword,
    });

    res.json(userDoc);
  } catch (error) {
    res.status(400).json(error);
  }
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  
  try {
    const userDoc = await User.findOne({ username });

    if (!userDoc) {
      return res.status(400).json("User not found");
    }

    const passOk = bcrypt.compareSync(password, userDoc.password);

    if (passOk) {
      jwt.sign({ username, id: userDoc.id }, secret, {}, (err, token) => {
        if (err) throw err;
        res.cookie("token", token).json("ok");
      });
    } else {
      res.status(400).json("Wrong credentials");
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
});

app.listen(4000, () => {
  console.log("Server is running on port 4000");
});
