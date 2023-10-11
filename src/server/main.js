const express = require("express");
const ViteExpress = require("vite-express");
const db = require("./util/database");
const app = express();
const User = require("./models/User");
const Comment = require("./models/Comment");
const Forum = require("./models/Forum");
const { newForum, getForum, getAllForums, addComment } = require("./controllers/forumCtrl");
const { register, login } = require("./controllers/authCtrl");

app.use(express.json());

User.hasMany(Forum);
Forum.belongsTo(User);

Forum.hasMany(Comment);
Comment.belongsTo(Forum);

User.hasMany(Comment);
Comment.belongsTo(User);

//! endpoints
app.post('/api/newForum', newForum)
app.get('/api/getforum/:id', getForum)
app.get('/api/getForums', getAllForums)

app.post('/api/newComment', addComment)

app.post('/api/register', register)
app.post('/api/login', login)

// db.sync()
ViteExpress.listen(app, 3000, () => {
  // creates one single user
  // User.create({username: 'bradybott', password: "supersecret"})
  console.log("Server is listening on port 3000...");
});
