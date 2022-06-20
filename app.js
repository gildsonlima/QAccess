var express = require ('express');
var { engine } = require ('express-handlebars');
var pb = require ('body-parser');
const crypto = require('crypto');
const { path } = require('express/lib/application');
var mysql = require('mysql2');
const { response } = require('express');
var helpers = require('handlebars-helpers')();

var app = express();

//configuração para indentificar framework que fara redenrização
app.engine('handlebars',engine());
app.set('view engine', 'handlebars');
app.set('views','./views');


app.use(express.static('public'));

// configuração do body-parse
app.use(pb.urlencoded({extended: false}))
app.use(pb.json());

//configuração banco de dados
var mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'qaccess'
});

//variaveis do usuario
var numeroCorrespondencia = 5
var ocorrencias = [];

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

function getOcorrencias(){
    let sql = 'SELECT * FROM ocorrencias';
    mysqlConnection.query(sql, function(err, resultSet, fields){
        if(err){
            console.log('Erro ao busca dados no banco',err);
        }else{
            ocorrencias = resultSet;
        }
    })
    return ocorrencias;
}

app.get('/ocorrencia', function(req, res){
    getOcorrencias();
    res.render('ocorrencia',{
        title: 'Ocorrência',
        pageOcorrencia: 'active',
        numeroCorrespondencia,
        ocorrencias
    });
})

app.get('/login', function(req, res){
    res.render('login',{
        title: 'Login',
        pageLogin: 'active'
    });
})

app.post('/ocorrencia', function(req, res){
    let nome = req.body.nome;
    let local = req.body.local;
    let descricao = req.body.descricao;
    let idOcorrencia = crypto.randomUUID();
    let data = new Date;
    data.toUTCString();
    let status = "Pendente";
    mysqlConnection.connect(function(err){
        if(err){ throw err;}else{
        console.log('Conectado');}
        let values = [idOcorrencia, local, descricao,status, data];
        let sql = "INSERT INTO ocorrencias (idOcorrencia,local,descricao,status,data) VALUES (?)";
        mysqlConnection.query(sql, [values], function(err, result){
            if(err)throw err;
            console.log("Linhas modificadas no banco: ", result.affectedRows);
    })
    })
    getOcorrencias();
    res.render('ocorrencia',{
        title: 'Ocorrência',
        pageOcorrencia: 'active',
        numeroCorrespondencia,
        ocorrencias
    });
});
app.get('/encomendapesquisa', function(req, res)  {
    res.render('encomendaPesquisa',{
        pageCorrespondencia: 'active',
        numeroCorrespondencia
    });
});


app.listen(3000);

