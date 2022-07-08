const router = require('express').Router();
const Planet = require('../Database/Planet')

//Create
router.post('/', async (req,res) => {

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

//Read
router.get('/', async(req, res) => {
    try{

        const planets = await Planet.find()

        res.status(200).json(planets)
        
    }catch(error){
        res.status(500).json({error: error})
    }
})

module.exports = router