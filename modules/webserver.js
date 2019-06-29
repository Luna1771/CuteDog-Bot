exports.start = () => {

  const main = require('../main.js')
  const express = require('express');
  const app = express();
  app.use(express.static('public'));

  app.get('/', function (req, res) {
    res.render('/app/web/index.pug')
  });

  app.listen(process.env.PORT);
}