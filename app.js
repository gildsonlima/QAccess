var express = require ('express');
var { engine } = require ('express-handlebars');
var pb = require ('body-parser');
const crypto = require('crypto');
var mysql = require('mysql2');
const { response } = require('express');
var helpers = require('handlebars-helpers')();
const session = require('express-session');
const path = require('path');

var app = express();

// Configuração para indentificar framework que fara redenrização
app.engine('handlebars',engine());
app.set('view engine', 'handlebars');
app.set('views','./views');

app.use(express.static('public'));

// Configurações para login
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'static')));


// Configuração do body-parse
app.use(pb.urlencoded({extended: false}))
app.use(pb.json());

// Configuração banco de dados
var mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'ubiq2022',
    database: 'qaccess'
});

// Variaveis do usuario
var ocorrencias = [];
var correspondencias = [];
var usuario = [];
var numeroCorrespondencia = correspondencias.length;
var rota = '/';

// Rotas
app.get('/', function(req, res) {
    rota = '/'
    res.render('home',{
        title: 'QAccess',
        pageHome: 'active',
        numeroCorrespondencia,
        logado : req.session.loggedin,
        nome : req.session.username
    });
});
app.get('/correspondencia', function(req, res)  {
    if (req.session.loggedin){
        getCorrespondencia();
        res.render('correspondencia',{
            title: 'Correspondência',
            pageCorrespondencia: 'active',
            correspondencias,
            logado : req.session.loggedin,
            nome : req.session.username
        });
    }else{
        rota = '/correspondencia'
        res.render('login',{
            title: 'Login',
            pageLogin: 'active'
        })
    }
});

app.get('/ocorrencia', function(req, res){
    if (req.session.loggedin){
    getOcorrencias();
    res.render('ocorrencia',{
        title: 'Ocorrência',
        pageOcorrencia: 'active',
        ocorrencias,
        logado : req.session.loggedin,
            nome : req.session.username
    })}else{
        rota = '/ocorrencia'
        res.render('login',{
            title: 'Login',
            pageLogin: 'active'
        })
    }
})

app.get('/login', function(req, res){
    res.render('login',{
        title: 'Login',
        pageLogin: 'active'
    });
})

app.get('/esqueceusenha', function(req, res){
    res.render('esqueceuSenha',{
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
        let values = [idOcorrencia, local, descricao,status, nome, data];
        let sql = "INSERT INTO ocorrencias (idOcorrencia,local,descricao,status,idCondomino,data) VALUES (?)";
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
app.post('/correspondencia', function(req, res){
    let unidade = req.body.unidade;
    let remetente = req.body.remetente;
    let nomeDestinatario = req.body.nomeDestinatario;
    let indentificacaoEncomenda = req.body.indentificacaoEncomenda
    let tipoEncomenda = req.body.tipoEncomenda;
    let idCorrespondencia = crypto.randomUUID();
    let data = new Date;
    data.toUTCString();
    let status = "Pendente";
    mysqlConnection.connect(function(err){
        if(err){ throw err;}else{
        console.log('Conectado');}
        let values = [idCorrespondencia, remetente, unidade,status,'jose', data, tipoEncomenda, indentificacaoEncomenda, nomeDestinatario];
        let sql = "INSERT INTO correspondencias (idCorrespondencia, remetente, idUnidade, status, idFuncionarioRecepcao, dataRecepcaoCondominio, tipoDeEncomenda, indentificacaoEncomenda, destinatario) VALUES (?)";
        mysqlConnection.query(sql, [values], function(err, result){
            if(err)throw err;
            console.log("Linhas modificadas no banco: ", result.affectedRows);
    })
    })
    getCorrespondencia();
    res.render('correspondencia',{
        title: 'Correspondêcia',
        pageCorrespondencia: 'active',
        numeroCorrespondencia,
        correspondencias
    });
});

app.post('/auth', function(req, res) {
	let username = req.body.login;
	let password = req.body.senha;
	if (username && password) {
		mysqlConnection.query('SELECT * FROM usuarios WHERE login = ? AND senha = ?', [username, password], function(error, results, fields) {
			if (error) throw error;
			if (results.length > 0) {
                console.log('login efetuado');
				req.session.loggedin = true;
				req.session.username = username;
				res.redirect(rota);
			} else {
				res.send('Incorrect Username and/or Password!');
			}			
			res.end();
		});
	} else {
		res.send('Please enter Username and Password!');
		res.end();
	}
});

app.get('/logout', function (req, res) {
    req.session.user = null
    req.session.save(function (err) {
    if (err) next(err)
    req.session.regenerate(function (err) {
        if (err) throw(err)
        res.redirect('/')
    })
    })
})

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
};

function getCorrespondencia(){
    let sql = 'SELECT * FROM correspondencias';
    mysqlConnection.query(sql, function(err, resultSet, fields){
        if(err){
            console.log('Erro ao busca dados no banco',err);
        }else{
            correspondencias = resultSet;
        }
    })
    return correspondencias;
};


app.listen(3000);

