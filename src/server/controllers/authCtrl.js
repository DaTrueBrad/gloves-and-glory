const User = require("../models/User");
const bcrypt = require("bcryptjs");

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
        res.status(200).send(newUser);
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
      console.log(checkUser)
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
        return res.status(200).send(checkUser);
      } else {
        return res.status(401).send("Password is incorrect.");
      }
    } catch (error) {
      res.status(200).send(error);
    }
  },
};
