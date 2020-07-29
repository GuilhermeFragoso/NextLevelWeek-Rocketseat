const express = require('express')
const server = express()

//Pegar o DB
const db = require('./database/db.js')

server.use(express.static('public'))

//Habilitar o uso do req.body no nosso app
server.use(express.urlencoded({ extended: true }))

const nunjucks = require('nunjucks')
nunjucks.configure('src/views', {
        express: server,
        noCache: true
})

server.get('/', (req, res) => {
        return res.render('index.html', { title: 'Um título' })
})

server.get('/create-point', (req, res) => {
        //req.query: Query strings da nossa URL
        console.log(req.query)

        return res.render('create-point.html')
})

server.post('/savepoint', (req, res) => {

        // req.body: O corpo do nosso formulário
        //console.log(req.body)

        //Inserir dados no Db
        const query = `
                  INSERT INTO places (
                          image,
                          name,
                          address,
                          address2,
                          state,
                          city,
                          items
                  ) VALUES (?, ?, ?, ?, ?, ?, ?);
          `

        const values = [
                req.body.image,
                req.body.name,
                req.body.address,
                req.body.address2,
                req.body.state,
                req.body.city,
                req.body.items
        ]

        function afterInsertData(err) {
                if (err) {
                        console.log(err)
                        return res.send('Erro no cadastro!')
                }

                console.log('Cadastrado com sucesso!')
                console.log(this)

                return res.render('create-point.html', { saved: true })

        }

        db.run(query, values, afterInsertData)

})

server.get('/search', (req, res) => {

        const search = req.query.search

        if (search == "") {
                //Pesquisa vazia
                return res.render('search-results.html', { total: 0 })
        }

        //Pegar os dados do DB
        db.all(`SELECT * FROM places WHERE city LIKE   '%${search}%'`, function (err, rows) {
                if (err) {
                        return console.log(err)
                }

                const total = rows.length

                //Mostrar a página com os dados do db
                return res.render('search-results.html', { places: rows, total: total })
        })

})

server.listen(3000)