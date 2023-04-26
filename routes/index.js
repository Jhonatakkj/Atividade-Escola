var express = require('express');
var fs = require('fs');
const path = require('path');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index');

});
router.get('/add', function (req, res, next) {
  res.render('newProduct');
});

router.post('/register', function (req, res, next) {

  let newVenda = {
    product: req.body.product,
    image: req.body.image,
    description: req.body.description,
    link: req.body.link
  }

  fetch(path.join(__dirname, '..', 'views', 'data.json')).then(response => response.json()).then(data => {
    data.vendas.push(newVenda);
    fs.writeFile(path.join(__dirname, '..', 'views', 'data.json'), JSON.stringify(data), err => {
      if (err) throw err;
      console.log('Os novos itens foram adicionados ao arquivo JSON.');
    });
  })
  res.redirect('/')
});

module.exports = router;
