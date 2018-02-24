module.exports = (app) => {
  app.get('/api/healthcheck',  (req, res) => {
    res.status(200).send('OK')
  })
}