const express   = require('express')
const mongoose  = require('mongoose')

const Planet = require('./Database/Planet')

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

app.post('/planet', async (req,res) => {

    const {name, orderFromSun, hasRings, mainAtmosphere, surfaceTemperatureC} = req.body

    if(!name){
        res.status(422).json({error: 'O nome é obrigatório!'})
    }
    
    const planet = {
        name,
        orderFromSun,
        hasRings,
        mainAtmosphere,
        surfaceTemperatureC
    }
    
    try{

        await Planet.create(planet)

        res.status(201).json({message: 'planeta cadastrado com sucesso!'})

    }catch (error){
        res.status(500).json({error: error})
    }
    
})

const DB_USER       = 'UserAdmin01Luiz'
const DB_PASSWORD   = encodeURIComponent('UserADMINacessServer')

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

