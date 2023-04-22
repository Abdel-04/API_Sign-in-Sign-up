const express = require('express')
const app = express()
const port = 3000
const db = new Map()
let count = 0

app.use(express.json());

app.post('/user/sign-in', (req, res) => {
    const body = {
        userName: req.body.userName,
        password: req.body.password
    }
    const user = db.get(body.userName)
    if (user) { 
    return res.status(400).send({
        message:"Nom d'utilisateur déja utilisé"
        })
    }
    db.set(body.userName, body)
    return res.send({
        message: 'vous êtes maintenant inscrit'
    }).status(200)
})

app.post('/user/sign-up', (req, res) => {
    const body = {
        userName: req.body.userName,
        password: req.body.password,
    } 

    const user = db.get(body.userName)
   
    if (count === 3){
       count++ 
       return res.status(400).send({
            message: "Tentatives de connection ne peut aboutir" 
       })}
    if (count > 3){
       return res.status(400).send({
           message: "Toute nouvelle tentative se soldera par la peine capitale" 
       })}   
    if (!user){
  
        count ++
        console.log (count)
        return res.status(400).send({
            message: "Aucun compte n'est associé à cet utilisateur"    
    })}

    if (user.password !== body.password){
        count ++
        return res.status(400).send({
            message: "saisie du compte érroné"    
    })}

    return res.send({
    message:`Bienvenue ${body.userName}`    
    })

})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
