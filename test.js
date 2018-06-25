const mongoose = require('mongoose')
const Post = require('./database/models/Post')

mongoose.connect('mongodb://localhost/node-js-test-blog')

Post.find({
  title: 'My first blog post'
}, (error, posts) => {
  console.log(error, posts)
})

// Post.create({
//   title: 'My second blog post',
//   description: 'Second Blog post description',
//   content: 'Second Lorem ipsum content.'
// }, (error, post) => {
//   console.log(error, post)
// })
