const express = require("express");
const cors = require("cors");
const User = require("./models/User");
const Post = require("./models/Post");
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const multer = require("multer");
const uploadMiddleware = multer({ dest: "upload/" });
const fs = require("fs");
const app = express();
const saltRounds = 10; // Number of salt rounds for bcrypt
const secret = "dsaofijsadfgsdfg2354fg123s1465sd4gf4dfgsdfg313sd4gf";

mongoose.connect(
  "mongodb+srv://ranjeet843507:ranjeetadmin@mern-blog.gfjegnj.mongodb.net/"
);

app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(express.json());
app.use(cookieParser());

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
        res.cookie("token", token).json({
          id: userDoc._id,
          username,
        });
      });
    } else {
      res.status(400).json("Wrong credentials");
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
});
app.get("/profile", (req, res) => {
  const { token } = req.cookies;
  jwt.verify(token, secret, {}, (e, info) => {
    if (e) throw err;
    res.json(info);
  });
});

app.post("/logout", (req, res) => {
  res.cookie("token", "").json("ok");
});

app.post("/post", uploadMiddleware.single("file"), async (req, res) => {
  const { originalname, path } = req.file;
  const parts = originalname.split(".");
  const ext = parts[parts.length - 1];
  const newPath = path + "." + ext;
  fs.renameSync(path, newPath);
  const { title, summary, content } = req.body;
  const postDoc = await Post.create({
    title,
    summary,
    content,
    cover: newPath,
  });
  res.json(postDoc);
});

app.listen(4000, () => {
  console.log("Server is running on port 4000");
});
