const Comment = require("../models/Comment");
const Forum = require("../models/Forum");
const User = require("../models/User");

module.exports = {
  newForum: async (req, res) => {
    try {
      let newForum = await Forum.create(req.body);
      res.status(200).send(newForum);
    } catch (error) {
      res.status(400).send(error);
    }
  },
  getForum: async (req, res) => {
    try {
      let forumInfo = await Forum.findOne({
        where: {
          id: req.params.id,
        },
        include: [
          {
            model: Comment,
            include: [
              {
                model: User,
                attributes: ["username"],
              },
            ],
          },
        ],
      });
      res.status(200).send(forumInfo);
    } catch (error) {
      res.status(400).send(error);
    }
  },
};
