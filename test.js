const mongoose = require('mongoose')
const Post = require('./database/models/Post')

mongoose.connect('mongodb://localhost/node-js-test-blog')

Post.create({
  title: 'My first blog post',
  description: 'Blog post description',
  content: 'Lorem ipsum content.'
}, (error, post) => {
  console.log(error, post)
})
