const router = require('express').Router();
const Planet = require('../Models/Planet')

//Create
router.post('/', async (req,res) => {

    const {name, orderFromSun, hasRings, mainAtmosphere, surfaceTemperatureC} = req.body

    if(!name){
        res.status(400).json({error: 'O nome é obrigatório!'})
        return
    }
    
    const planet = new Planet({
        name,
        orderFromSun,
        hasRings,
        mainAtmosphere,
        surfaceTemperatureC
    })
    
    try{

        await Planet.create(planet)

        res.status(201).json({message: 'planeta cadastrado com sucesso!'})
        return
        
    }catch (error){
        res.status(500).json({error: 'Aconteceu um erro no servidor, tente novamente mais tarde'})
        return
    }
    
})

//Read
router.get('/', async(req, res) => {
    try{

        const planets = await Planet.find()

        res.status(200).json(planets)
        return
        
    }catch(error){
        res.status(500).json({error: 'Aconteceu um erro no servidor, tente novamente mais tarde'})
        return
    }
})

router.get('/:id', async (req, res) =>{

    const id = req.params.id

    try{
        const planet = await Planet.findOne({_id: id})

        if(!planet){
            res.status(404).json({message: 'Planeta desconhecido!'})
            return
        }
        
        res.status(200).json(planet)
        return

    }catch (error){
        res.status(500).json({error: 'Aconteceu um erro no servidor, tente novamente mais tarde'})
        return
    }
})

//Update
router.patch('/:id', async(req, res) =>{

    const id = req.params.id
    
    const {name, orderFromSun, hasRings, mainAtmosphere, surfaceTemperatureC} = req.body
    
    const planet = {
        name,
        orderFromSun,
        hasRings,
        mainAtmosphere,
        surfaceTemperatureC,
    }
    
    try{

        const updatePlanet = await Planet.updateOne({_id: id}, planet)

        if(updatePlanet.marchedCount === 0){
            res.status(404).json({message: 'Planeta desconhecido!'})
        }
        
        res.status(200).json(planet)
        
    }catch(error){
        res.status(500).json({error: 'Aconteceu um erro no servidor, tente novamente mais tarde'})
        return
    }
})

router.delete('/:id', async(req, res) => {
    
    const id = req.params.id

    try{

        const planet = await Planet.findOne({_id: id})

        if(!planet){
            res.status(404).json({message: 'Planeta desconhecido!'})
            return
        }

        await planet.deleteOne({_id: id})
        
        res.status(200).json({message:'Planeta deletado com sucesso!'})
        
    }catch(error){
        res.status(500).json({error: error})
        return
    }
    
})
module.exports = router