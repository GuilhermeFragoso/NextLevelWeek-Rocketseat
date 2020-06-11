const express = require('express');
const nunjucks = require('nunjucks');
const server = express();


nunjucks.configure('src/views' , {
        express: server,
        noCache: true
})
//Config pasta pública
server.use(express.static('public'));

//Configurar caminhos
server.get('/', (req , res) => {
        return res.render('index.html' , {title: 'Um título'})
})

server.get('/create-point', (req , res) => {
        return res.render('create-point.html')
})

server.get('/search', (req , res) => {
        return res.render('search-results.html')
})

//Ligar o servidor
server.listen(3000)
