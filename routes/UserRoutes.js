require('dotenv').config()
const router = require('express').Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../Models/User')
const checkToken = require('../Security/ValidateToken')

router.post('/auth/register', async(req, res) =>{
    
    const {name, email, password, confirmpassword} = req.body

    if( !name       || 
        !email      ||
        !password   ||
        !confirmpassword
        ){
        res.status(400).json({error: 'Todos os campos são obrigatórios'})
        return
    }

    if(password !== confirmpassword){
        res.status(400).json({error: 'As senhas devem ser iguais'})
        return
    }

    const userExists = await User.findOne({email: email})

    if(userExists){
        res.status(409).json({error: 'Este email já está em uso, utilize outro'})
        return
    }

    const salt = await bcrypt.genSalt(12)
    const passwordHash = await bcrypt.hash(password, salt)

    const user = new User({
        name,
        email,
        password: passwordHash
    })
    
    try{

        await User.create(user)

        res.status(201).json({message: 'Usuario cadastrado com sucesso!'})
        
    }catch(error){        

        console.log(error)
        
        res.status(500).json({error: 'Aconteceu um erro no servidor, tente novamente mais tarde'})
        return
    }
})

router.post("/auth/login", async(req,res) =>{

    const {email, password} = req.body

    if( !email      ||
        !password   ){
            res.status(400).json({error: `Todos os campos são obrigatórios, campo: ${!email? 'email' : 'senha'}`})
            return
        }
    
    const user = await User.findOne({email: email})
    const checkPassword = await bcrypt.compare(password, user.password)

    if(!user){
        res.status(404).json({error: `Não existe usuario para o email ${email}`})
        return
    }
      
    if(!checkPassword){
        res.status(422).json({error: `Senha inválida!`})
        return
    }

    try{

        const secret = process.env.SECRET

        const token = jwt.sign({
            id: user._id,
        },
        secret,)

        res.status(200).json({message: 'Login efetuado com sucesso!', token})
        return
        
    }catch(error){

        res.status(500).json({error: 'Aconteceu um erro no servidor, tente novamente mais tarde'})
        return
        
    }
})

router.get('/:id', checkToken ,async(req, res) => {
    
    const id = req.params.id

    const user = await User.findById(id, '-password')

    if(!user){
        res.status(404).json({error: `Usuario não encontrado`})
        return
    }

    res.status(200).json({user})
    
})

module.exports = router