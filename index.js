const express = require('express') 
const app = express()
const bodyParser = require('body-parser')

const path = require('path')

const sqlite3 = require('sqlite3').verbose();
const sqlite = require('sqlite');
const { allowedNodeEnvironmentFlags } = require('process');
const dbConnection = sqlite.open({
    filename:'banco.sqlite',
    driver: sqlite3.Database}
    
)
const reso = async() => {
    db = await dbConnection
    path.resolve(__dirname,'banco.sqlite')
}
reso()

const port = process.env.PORT || 3000 

app.set('viwes', path.join(__dirname, 'views'))
app.set('view engine', 'ejs') 
app.use(express.static(path.join(__dirname,'public'))) 
app.use(bodyParser.urlencoded({ extended: true})) 


app.get('/',async(request, response) => {     
    const db = await dbConnection           
    response.render('home')   
    
})
app.post('/', async(req, res) => {
    const {numero} = req.body
    const db = await dbConnection
    await db.run(`insert into number(number) values('${numero}')`)
    res.redirect('/result')   
})

app.get('/result',async(request, response) => {     
    const db = await dbConnection           
    const numbersDb = await db.get('SELECT * FROM number where id =' + 1)
    const numberRest = numbersDb.number % 2
    response.render('result')  



})

const init = async () => {   
    const db = await dbConnection 
    await db.run('create table if not exists number (id INTEGER PRIMARY KEY , number INTEGER);')
    
    
    
}
init()

app.listen(port, (err) => {
    if(err){
        console.log('Não foi possivel inciar o servidor')
    }else{
        console.log('Servidor rodando...')
    }
})

