var express = require ('express');
var { engine } = require ('express-handlebars');
var pb = require ('body-parser');
const { path } = require('express/lib/application');

var app = express();

//configuração para indentificar framework que fara redenrização
app.engine('handlebars',engine());
app.set('view engine', 'handlebars');
app.set('views','./views');

app.use(express.static('public'));

// configuração do body-parse
app.use(pb.urlencoded({extended: false}))
app.use(pb.json());

//variaveis do usuario
var numeroCorrespondencia = 5

//rotas
app.get('/', function(req, res) {
    res.render('home',{
        title: 'QAccess',
        pageHome: 'active',
        numeroCorrespondencia
    });

});
app.get('/correspondencia', function(req, res)  {
    res.render('correspondencia',{
        title: 'Correspondência',
        pageCorrespondencia: 'active',
        numeroCorrespondencia
    });
});
app.get('/ocorrencia', function(req, res){
    res.render('ocorrencia',{
        title: 'Ocorrência',
        pageOcorrencia: 'active',
        numeroCorrespondencia
    });
})
app.get('/login', function(req, res){
    res.render('login',{
        title: 'Login',
        pageLogin: 'active',
    });
})
app.get('/encomendapesquisa', function(req, res)  {
    res.render('encomendaPesquisa',{
        pageCorrespondencia: 'active',
        numeroCorrespondencia
    });
});

app.listen(3000);

