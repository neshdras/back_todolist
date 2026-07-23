const express = require('express')
const app = express()
const port = 3000
require('dotenv').config()
require('./config/db')

const authRoute = require('./routes/authRoutes')
const projectRoute = require('./routes/projectRoutes')

app.use(express.json())

app.use('/api/v1/auth', authRoute)
app.use('/api/v1/projects', projectRoute)
app.get('/', (req, res) =>{
    res.send('Bienvenue sur mon API RESTful !')
})

app.listen(port, () => {
    console.log(`Serveur démarré sur http://localhost:${port}`)
})
