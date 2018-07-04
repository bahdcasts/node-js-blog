module.exports = (req, res, next) => {
  if(!req.files.image || !req.body.username || !req.body.title || !req.body.subtitle || !req.body.content) {
    return res.redirect('/posts/new')
  }

  next()
}
