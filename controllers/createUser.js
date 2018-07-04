module.exports = (req, res) => {
  res.render('register', {
    errors: req.session.registrationErrors
  })
}
