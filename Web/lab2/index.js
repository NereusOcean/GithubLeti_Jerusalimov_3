const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
const route = require("./route/routes");
express()
      .use(express.static(path.join(__dirname, 'public')))
      .set('views', path.join(__dirname, 'views'))
      .set('view engine', 'pug')
      .use(express.urlencoded({ extended: true }))
      .use(express.json())
      .use(route)
      .get('/', (req, res) => res.render('pages/index'))
      .listen(PORT, () => console.log(`Listening on ${ PORT }`))
