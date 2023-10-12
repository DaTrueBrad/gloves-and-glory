const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { SECRET } = process.env;

const createToken = (username, id) => {
  return jwt.sign({ username, id }, SECRET, {});
};

module.exports = {
  register: async (req, res) => {
    try {
      // two things: first, check if username is taken. if it is, we need to tell the user it is taken. if it is not take, we can register the user.
      let checkUser = await User.findAll({
        where: { username: req.body.username },
      });
      if (checkUser.length !== 0) {
        res.status(401).send("That username is taken!");
      } else {
        let salt = bcrypt.genSaltSync(10);
        let passHash = bcrypt.hashSync(req.body.password, salt);
        let newUser = await User.create({
          username: req.body.username,
          password: passHash,
        });
        let token = createToken(newUser.username, newUser.id);
        let secureUser = {
          username: newUser.username,
          id: newUser.id,
          token: token,
        };
        res.status(200).send(secureUser);
      }
    } catch (error) {
      res.status(200).send(error);
    }
  },
  login: async (req, res) => {
    try {
      //if usrename doesnt exist, tell the user. Username doesnt exist.
      //if Password is incorrect, tell the user.
      //if everything matches, send them credentials.
      let checkUser = await User.findOne({
        where: { username: req.body.username },
      });
      console.log(checkUser);
      if (!checkUser) {
        return res
          .status(401)
          .send("User does not exist. Check your username.");
      }
      let comparePass = bcrypt.compareSync(
        req.body.password,
        checkUser.password
      );
      if (comparePass) {
        let token = createToken(checkUser.username, checkUser.id);
        let secureUser = {
          username: checkUser.username,
          id: checkUser.id,
          token: token,
        };
        return res.status(200).send(secureUser);
      } else {
        return res.status(401).send("Password is incorrect.");
      }
    } catch (error) {
      res.status(200).send(error);
    }
  },
};
