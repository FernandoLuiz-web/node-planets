require('dotenv').config()
const express   = require('express')
const mongoose  = require('mongoose')
const planetsRoutes = require('./routes/planetsRoutes')

const app = express();

app.use(
    express.urlencoded({
        extended: true,
    }),
)

app.use(
    express.json()
)

//Url de teste
app.get('/', (req, res) => {

    res.json({
        message: 'Api está funcionando'
    })
    
})


app.use('/planet', planetsRoutes)


const DB_USER       = process.env.DB_USER
const DB_PASSWORD   = process.env.DB_PASSWORD

mongoose.connect(
    `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.hmcbxxd.mongodb.net/?retryWrites=true&w=majority`,
).then(() => {
    app.listen(3000, () => {
        console.log(`Server Started at ${3000}`)
    })
})
.catch((err) => {
    throw new Error(`Error in the process connection database. ${err.message}`)
})

