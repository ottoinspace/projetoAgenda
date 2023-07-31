const express = require('express');
const route = express.Router();

const homeController = require('./src/controllers/homeController');
const loginController = require('./src/controllers/loginController');
const contatoController = require('./scr/controllers/contatoController');

// rotas da home
route.get('/',homeController.index);

// rotas de login
route.get('/login/index', loginController.index);
route.post('/login/register', loginController.register);
route.post('/login/login', loginController.login);
route.get('/login/logout', loginController.logout);

//rotas de contatos
route.get('/contato/index', contatoController.index);
 
module.exports = route;