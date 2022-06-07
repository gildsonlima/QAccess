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

//rotas
app.get('/', function(req, res) {
    res.render('home',{
        title: 'QAccess'
    });

});
app.get('/correspondencias', function(req, res)  {
    res.render('correspondencias',{
        title: 'Correspondências'
    });
});
app.get('/ocorrencias', function(req, res){
    res.render('ocorrencias',{
        title: 'Ocorrências'
    });
})
app.post('/cadastro',function(req , res){
    
})


app.listen(3000);

