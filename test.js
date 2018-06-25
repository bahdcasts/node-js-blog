const mongoose = require('mongoose')
const Post = require('./database/models/Post')

mongoose.connect('mongodb://localhost/node-js-test-blog')

Post.find({}, (error, posts) => {
  console.log(error, posts)
})

// Post.findById("5b309ceca84e99bbb6601904", (error, post) => {
//   console.log(error, post)
// })

// Post.findByIdAndUpdate("5b309b35bd7950bab178d912", {
//   title: 'My first blog post title lorem ipsum'
// }, (error, post) => {
//   console.log(error, post)
// })

// Post.findByIdAndRemove("5b309ceca84e99bbb6601904", (error) => {
//   console.log(error)
// })

// Post.create({
//   title: 'My second blog post',
//   description: 'Second Blog post description',
//   content: 'Second Lorem ipsum content.'
// }, (error, post) => {
//   console.log(error, post)
// })
