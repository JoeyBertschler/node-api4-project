require('dotenv').config()
const path = require('path')

// import user from './users.js' --- why not work

const user = {
    user1:'john',
    user2:'alsoJohn',
    user3:'johnathanFormerlyKnownAsJohn',
    user4:'Bobby Brown'
}

console.log('web 404 reigns supreme')

const express = require('express')
const server = express() //app

server.use(express.json()) //teaches express to
//parse req bodies as json
server.use(express.static(path.join(__dirname, 'client/build')))

console.log(process.env.NODE_ENV)

if (process.env.NODE_ENV === 'development') { 
    // on heroku machines,
    //an env variable is called "NODE_ENV"
    //-> "production" (has value of string prod.)
    const cors = require('cors')
    server.use(cors())
}

//our API comes earlier in the pipeline
server.get('/api/users', (req, res)=>{
    res.send(user)
})

server.get('/api/hello', (req, res)=>{
    res.json({message: 'i love you all'})
})
// catch-all that just sends back index.html (and the port)
server.get('*', (req, res)=>{ //get/use doesn't matter here, either
    res.send(`Running on port ${process.env.PORT}`, 
              res.sendFile(path.join(__dirname, 'client/build', 'index.html')))
})

const PORT = process.env.PORT || 4000 //4000 = fallback

server.listen(PORT, ()=> {
    console.log(`listening on ${PORT}`)
})
