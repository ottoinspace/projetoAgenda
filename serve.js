require('dotenv').config();// referente as minhas variaveis de ambiente(senhas, email e afins)

const express = require('express');
const app = express();
const mongoose = require('mongoose'); // modelar nossa base de dados
mongoose.connect(process.env.CONNECTIONSTRING ,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })// o mongoose retorna uma promise
    .then(() => app.emit('pronto'))
    .catch(e => console.log(e));

const session = require('express-session'); 
const MongoStore = require('connect-mongo'); // para dizer que as session vao para a base de dados
const flash = require('connect-flash'); //mensagens autodestrutivas
const routes = require('./routes'); // rotas da nossa aplicacao
const path = require('path');
const helmet = require('helmet');
const csrf = require('csurf'); //tokens para nossos formularios(seguranca)
const { middlewareGlobal, checkCsrfError, csrfMiddleware } = require('./src/middlewares/middleware'); // funcoes que sao executadas nas rotas 

app.use(helmet());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.resolve(__dirname, 'public'))); //todos q devem ser acessados diretamentes

const sessionOptions = session({
    secret: 'asiahuhaiu audsiuhaushdia asudhaihdas',
    store: MongoStore.create({ mongoUrl: process.env.CONNECTIONSTRING }),
    resave: false,
    saveUninitialize: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true
    }
});
app.use(sessionOptions);
app.use(flash());

app.set('views', path.resolve(__dirname, 'src', 'views'));
app.set('view engine', 'ejs'); // renderizar o nosso html

app.use(csrf());
//nossos proprios middlewares
app.use(middlewareGlobal);
app.use(checkCsrfError);
app.use(csrfMiddleware);
app.use(routes);

app.on('pronto', () =>{
    app.listen(3000, () => {
        console.log('Acessar http://localhost:3000');
        console.log('Servidor executando na porta 3000');
    });
});
