const express = require('express')
const app = express()
const port = 3000
const helmet = require('helmet')
const cors = require('cors')
require('dotenv').config()
require('./config/db')

const authRoute = require('./routes/authRoutes')
const projectRoute = require('./routes/projectRoutes')
const userRoutes = require('./routes/userRoutes')
const taskRoutes = require('./routes/taskRoutes')
app.use(
    helmet({
        contentSecurityPolicy: false,
        crossOriginRessourcePolicy: { policy: "cross-origin"}
    })
)
const rateLimit = require('express-rate-limit')
const limiter = rateLimit({
    windowMs: 15*60*1000,
    limit: 100,
    message: {status: 429, error: "Too many queryes, try later"}
})
app.use(limiter)
app.use(express.json())
const corsOption = {
    origin: 'http://localhost:3000'
}
app.use(cors(corsOption))

app.use('/api/v1/auth', authRoute)
app.use('/api/v1/projects', projectRoute)
app.use('/api/v1/user', userRoutes)
app.use('/api/v1/task', taskRoutes)
app.get('/', (req, res) =>{
    res.send('Bienvenue sur mon API RESTful !')
})

app.listen(port, () => {
    console.log(`Serveur démarré sur http://localhost:${port}`)
})
