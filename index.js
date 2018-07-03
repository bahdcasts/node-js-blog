const path = require("path");
const bcrypt = require('bcrypt');
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const session = require("express-session");
const connectMongo = require('connect-mongo');
const expressEdge = require("express-edge");
const fileUpload = require("express-fileupload");

const Post = require("./database/models/Post");
const User = require("./database/models/User");

const app = new express();

mongoose.connect("mongodb://localhost/node-js-blog");
const mongoStore = connectMongo(session);

app.use(
  session({
    secret: 'secret',
    store: new mongoStore({
      mongooseConnection: mongoose.connection,
    }),
  })
);

app.use(fileUpload());
app.use(express.static("public"));
app.use(expressEdge);
app.set("views", `${__dirname}/views`);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('*', (req, res, next) => {
  console.log(req.session)
  next()
})

app.get("/", async (req, res) => {
  const posts = await Post.find({});
  res.render("index", {
    posts
  });
});


app.get('/login', (req, res) => {
  res.render('login')
})

app.post('/users/login', (req, res) => {
  const { email, password } = req.body

  User.findOne({ email }, (error, user) => {
    if (user) {
      bcrypt.compare(password, user.password, (error, result) => {
        console.log(error, result)
        if (result) {
          req.session.userId = user._id
          return res.redirect('/')
        } else {
          return res.redirect('/login')
        }
      })
    } else {
      return res.redirect('/login')
    }
  })
})

app.get("/register", (req, res) => {
  res.render("register");
});

app.post("/users/store", (req, res) => {
  console.log(req.body)
  User.create(req.body, (error, user) => {
    console.log(error)
    res.redirect("/");
  });
});

app.get("/posts/new", (req, res) => {
  res.render("create");
});

app.post("/posts/store", (req, res) => {
  const { image } = req.files;

  image.mv(path.resolve(__dirname, "public/posts", image.name), error => {
    Post.create(
      {
        ...req.body,
        image: `/posts/${image.name}`
      },
      (error, post) => {
        res.redirect("/");
      }
    );
  });
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.get("/post/:id", async (req, res) => {
  const post = await Post.findById(req.params.id);
  res.render("post", {
    post
  });
});

app.get("/contact", (req, res) => {
  res.render("contact");
});

app.listen(4000, () => {
  console.log("App listening on port 4000");
});
